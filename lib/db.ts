import { Pool } from "pg";

/**
 * Postgres (Neon i produktion, lokal Postgres i utveckling).
 *
 * Neon-integrationen i Vercel sätter DATABASE_URL automatiskt. Använd den
 * poolade connection stringen (-pooler i värdnamnet) i produktion.
 */
function connectionString() {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || "";
}

export function dbConfigured() {
  return connectionString() !== "";
}

/**
 * Tabellen skapas/uppdateras automatiskt vid första anropet i varje
 * lambda-instans, så en ny databas behöver ingen manuell migrering.
 * Alla satser är idempotenta.
 */
const SCHEMA = `
create table if not exists interest_submissions (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  phone       text,
  rooms       text,
  city        text,
  housing     text,
  message     text,
  notified    boolean not null default false,
  user_agent  text,
  ip          text
);
alter table interest_submissions add column if not exists notify_error text;
alter table interest_submissions add column if not exists status text not null default 'new';
alter table interest_submissions add column if not exists notes text;
alter table interest_submissions add column if not exists updated_at timestamptz;
create index if not exists interest_submissions_created_at_idx
  on interest_submissions (created_at desc);
`;

let pool: Pool | undefined;
let schemaReady: Promise<void> | undefined;

function getPool() {
  if (!pool) {
    const cs = connectionString();
    if (!cs) throw new Error("DATABASE_URL saknas");

    pool = new Pool({
      connectionString: cs,
      // Neon och andra hostade Postgres kräver TLS. Lokalt gör de inte det.
      ssl: /localhost|127\.0\.0\.1/.test(cs) ? undefined : { rejectUnauthorized: true },
      max: 3,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 10_000,
    });
  }
  return pool;
}

async function migrate(p: Pool) {
  try {
    await p.query(SCHEMA);
  } catch (error) {
    // Två kalla instanser kan köra "create table" samtidigt; förloraren får
    // 23505/42P07. Tabellen finns då redan, så kör om resten av satserna.
    const code = (error as { code?: string }).code;
    if (code !== "23505" && code !== "42P07") throw error;
    await p.query(SCHEMA);
  }
}

/** Poolen, med schemat garanterat på plats. */
export async function db() {
  const p = getPool();
  if (!schemaReady) {
    schemaReady = migrate(p).catch((error) => {
      schemaReady = undefined;
      throw error;
    });
  }
  await schemaReady;
  return p;
}
