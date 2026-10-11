import { db } from "@/lib/db";

export type LeadInput = {
  name: string;
  email: string;
  phone: string | null;
  rooms: string | null;
  city: string | null;
  housing: string | null;
  message: string | null;
};

export const LEAD_STATUSES = ["new", "contacted", "closed", "spam"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "Ny",
  contacted: "Kontaktad",
  closed: "Klar",
  spam: "Skräp",
};

export function isLeadStatus(value: unknown): value is LeadStatus {
  return typeof value === "string" && (LEAD_STATUSES as readonly string[]).includes(value);
}

export type Lead = LeadInput & {
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  status: LeadStatus;
  notes: string | null;
  notified: boolean;
  notifyError: string | null;
};

export const ROOM_LABELS: Record<string, string> = {
  "2": "2 rum & kök",
  "3": "3 rum & kök",
  "4": "4 rum & kök",
  "5": "5 rum & kök",
};

export const HOUSING_LABELS: Record<string, string> = {
  hyresratt: "Hyresrätt",
  bostadsratt: "Bostadsrätt",
  villa: "Villa",
  inneboende: "Inneboende",
};

const MAX = { name: 200, email: 320, phone: 40, city: 120, message: 4000 };

function text(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : null;
}

function oneOf(value: unknown, allowed: Record<string, string>): string | null {
  return typeof value === "string" && value in allowed ? value : null;
}

/**
 * Speglar `required` i formuläret. Klientvalidering går att kringgå,
 * så samma regler måste gälla här.
 */
export function parseLeadInput(
  body: unknown,
): { ok: true; data: LeadInput } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Ogiltig förfrågan." };
  }
  const raw = body as Record<string, unknown>;

  const name = text(raw.name, MAX.name);
  if (!name) return { ok: false, error: "Namn är obligatoriskt." };

  const email = text(raw.email, MAX.email);
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Ange en giltig e-postadress." };
  }

  if (raw.consent !== true) {
    return { ok: false, error: "Du måste godkänna hanteringen av personuppgifter." };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      phone: text(raw.phone, MAX.phone),
      rooms: oneOf(raw.rooms, ROOM_LABELS),
      city: text(raw.city, MAX.city),
      housing: oneOf(raw.housing, HOUSING_LABELS),
      message: text(raw.message, MAX.message),
    },
  };
}

type Row = {
  id: string;
  created_at: Date;
  updated_at: Date | null;
  name: string;
  email: string;
  phone: string | null;
  rooms: string | null;
  city: string | null;
  housing: string | null;
  message: string | null;
  status: string;
  notes: string | null;
  notified: boolean;
  notify_error: string | null;
};

const COLUMNS = `id, created_at, updated_at, name, email, phone, rooms, city, housing,
  message, status, notes, notified, notify_error`;

function toLead(row: Row): Lead {
  return {
    // pg returnerar bigint som sträng för att inte tappa precision.
    id: Number(row.id),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    name: row.name,
    email: row.email,
    phone: row.phone,
    rooms: row.rooms,
    city: row.city,
    housing: row.housing,
    message: row.message,
    status: isLeadStatus(row.status) ? row.status : "new",
    notes: row.notes,
    notified: row.notified,
    notifyError: row.notify_error,
  };
}

export async function insertLead(
  data: LeadInput,
  meta: { userAgent: string | null; ip: string | null },
): Promise<number> {
  const { rows } = await (await db()).query<{ id: string }>(
    `insert into interest_submissions
       (name, email, phone, rooms, city, housing, message, user_agent, ip)
     values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     returning id`,
    [
      data.name,
      data.email,
      data.phone,
      data.rooms,
      data.city,
      data.housing,
      data.message,
      meta.userAgent?.slice(0, 500) ?? null,
      meta.ip?.split(",")[0]?.trim().slice(0, 64) ?? null,
    ],
  );
  return Number(rows[0].id);
}

export async function recordNotification(id: number, result: { ok: true } | { ok: false; error: string }) {
  await (await db()).query(
    `update interest_submissions
        set notified = notified or $2, notify_error = $3
      where id = $1`,
    [id, result.ok, result.ok ? null : result.error.slice(0, 500)],
  );
}

export async function listLeads(opts: { status?: LeadStatus; q?: string; limit?: number } = {}) {
  const where: string[] = [];
  const params: unknown[] = [];

  if (opts.status) {
    params.push(opts.status);
    where.push(`status = $${params.length}`);
  }
  const q = opts.q?.trim();
  if (q) {
    params.push(`%${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`);
    const p = `$${params.length}`;
    where.push(
      `(name ilike ${p} or email ilike ${p} or phone ilike ${p} or city ilike ${p} or message ilike ${p} or notes ilike ${p})`,
    );
  }
  params.push(opts.limit ?? 500);

  const { rows } = await (await db()).query<Row>(
    `select ${COLUMNS} from interest_submissions
      ${where.length ? `where ${where.join(" and ")}` : ""}
      order by created_at desc
      limit $${params.length}`,
    params,
  );
  return rows.map(toLead);
}

export async function getLead(id: number) {
  const { rows } = await (await db()).query<Row>(
    `select ${COLUMNS} from interest_submissions where id = $1`,
    [id],
  );
  return rows[0] ? toLead(rows[0]) : null;
}

export async function listUnnotifiedLeads() {
  const { rows } = await (await db()).query<Row>(
    `select ${COLUMNS} from interest_submissions
      where notified = false and status <> 'spam'
      order by created_at asc
      limit 100`,
  );
  return rows.map(toLead);
}

export type LeadStats = Record<LeadStatus, number> & { total: number; unnotified: number };

export async function leadStats(): Promise<LeadStats> {
  const { rows } = await (await db()).query<{ status: string; count: string; unnotified: string }>(
    `select status, count(*) as count,
            count(*) filter (where notified = false and status <> 'spam') as unnotified
       from interest_submissions
      group by status`,
  );
  const stats: LeadStats = { total: 0, unnotified: 0, new: 0, contacted: 0, closed: 0, spam: 0 };
  for (const row of rows) {
    const count = Number(row.count);
    stats.total += count;
    stats.unnotified += Number(row.unnotified);
    if (isLeadStatus(row.status)) stats[row.status] += count;
  }
  return stats;
}

export async function updateLead(id: number, patch: { status: LeadStatus; notes: string | null }) {
  await (await db()).query(
    `update interest_submissions
        set status = $2, notes = $3, updated_at = now()
      where id = $1`,
    [id, patch.status, patch.notes],
  );
}

export async function deleteLead(id: number) {
  await (await db()).query("delete from interest_submissions where id = $1", [id]);
}
