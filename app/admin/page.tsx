import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  Inbox,
  LogOut,
  Mail,
  Phone,
  Search,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { requireAdmin } from "@/lib/admin-auth";
import { dbConfigured } from "@/lib/db";
import { missingEmailConfig, notificationRecipients } from "@/lib/lead-email";
import {
  HOUSING_LABELS,
  LEAD_STATUSES,
  ROOM_LABELS,
  STATUS_LABELS,
  isLeadStatus,
  leadStats,
  listLeads,
  type Lead,
  type LeadStatus,
} from "@/lib/leads";
import { cn } from "@/lib/utils";
import {
  logout,
  removeLead,
  resendAllUnnotified,
  resendNotification,
  saveLead,
} from "./actions";
import { SubmitButton } from "./submit-button";

export const dynamic = "force-dynamic";

const dateFormat = new Intl.DateTimeFormat("sv-SE", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Europe/Stockholm",
});

const STATUS_STYLES: Record<LeadStatus, string> = {
  new: "bg-primary text-primary-foreground border-transparent",
  contacted: "bg-accent/15 text-accent border-transparent",
  closed: "bg-muted text-muted-foreground border-transparent",
  spam: "border-border text-muted-foreground line-through",
};

const TAB_LABELS: Record<LeadStatus, string> = {
  new: "Nya",
  contacted: "Kontaktade",
  closed: "Klara",
  spam: "Skräp",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function AdminPage({ searchParams }: { searchParams: SearchParams }) {
  await requireAdmin();

  const params = await searchParams;
  const status = isLeadStatus(params.status) ? params.status : undefined;
  const q = typeof params.q === "string" ? params.q.slice(0, 100) : "";

  const missingEmail = missingEmailConfig();
  const recipients = notificationRecipients();
  const hasDb = dbConfigured();

  let leads: Lead[] = [];
  let stats = { total: 0, unnotified: 0, new: 0, contacted: 0, closed: 0, spam: 0 };
  let dbError: string | null = null;
  if (hasDb) {
    try {
      [leads, stats] = await Promise.all([listLeads({ status, q }), leadStats()]);
    } catch (error) {
      console.error("[admin] databasfel", error);
      dbError = error instanceof Error ? error.message : String(error);
    }
  }

  const tabHref = (s?: LeadStatus) => {
    const sp = new URLSearchParams();
    if (s) sp.set("status", s);
    if (q) sp.set("q", q);
    const qs = sp.toString();
    return qs ? `/admin?${qs}` : "/admin";
  };

  return (
    <>
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary-foreground/60">
              Parklyckan · Admin
            </p>
            <h1 className="mt-1 font-display text-2xl font-light">Intresseanmälningar</h1>
          </div>
          <div className="flex items-center gap-2">
            <a href="/admin/export" className={buttonVariants({ variant: "inverted", size: "sm" })}>
              <Download /> Exportera CSV
            </a>
            <form action={logout}>
              <button
                type="submit"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground",
                )}
              >
                <LogOut /> Logga ut
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="grid gap-3">
          {!hasDb ? (
            <Notice tone="warning" title="Databasen är inte kopplad">
              Anmälningar sparas inte förrän databasen finns. Lägg till Neon under Vercel → projektet
              parklyckan → Storage. Då sätts <code>DATABASE_URL</code> automatiskt och tabellen skapas
              vid första anmälan.
            </Notice>
          ) : null}
          {dbError ? (
            <Notice tone="warning" title="Kunde inte läsa databasen">
              {dbError}
            </Notice>
          ) : null}
          {missingEmail.length ? (
            <Notice tone="info" title="Mejlnotiser är avstängda">
              Saknas: {missingEmail.join(", ")}. Anmälningar sparas ändå här och kan mejlas ut i
              efterhand.
            </Notice>
          ) : null}
          {!missingEmail.length && stats.unnotified > 0 ? (
            <Notice tone="warning" title={stats.unnotified === 1 ? "1 anmälan har inte mejlats ut" : `${stats.unnotified} anmälningar har inte mejlats ut`}>
              <form action={resendAllUnnotified} className="mt-3">
                <SubmitButton size="sm" pendingText="Skickar…">
                  Mejla ut alla nu
                </SubmitButton>
              </form>
            </Notice>
          ) : null}
        </div>

        <nav aria-label="Filtrera på status" className="mt-6 flex flex-wrap gap-2">
          <Tab href={tabHref()} active={!status} label="Alla" count={stats.total} />
          {LEAD_STATUSES.map((s) => (
            <Tab key={s} href={tabHref(s)} active={status === s} label={TAB_LABELS[s]} count={stats[s]} />
          ))}
        </nav>

        <form action="/admin" method="get" role="search" className="mt-4 flex gap-2">
          {status ? <input type="hidden" name="status" value={status} /> : null}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Sök namn, e-post, telefon…"
              aria-label="Sök"
              className="pl-9"
            />
          </div>
          <button type="submit" className={buttonVariants({ variant: "outline" })}>
            Sök
          </button>
        </form>

        {leads.length === 0 ? (
          <div className="mt-8 flex flex-col items-center rounded-lg border border-dashed border-border bg-card px-6 py-16 text-center">
            <Inbox className="size-8 text-muted-foreground" />
            <p className="mt-3 font-medium">
              {q || status ? "Inga träffar" : "Inga anmälningar ännu"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {q || status
                ? "Prova ett annat filter eller en annan sökning."
                : "Nya intresseanmälningar från sajten dyker upp här."}
            </p>
          </div>
        ) : (
          <ul className="mt-6 grid gap-4">
            {leads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} canEmail={!missingEmail.length} />
            ))}
          </ul>
        )}

        <p className="mt-10 text-xs text-muted-foreground">
          {recipients
            ? `Mejlnotiser går till ${recipients.to.join(", ")}${recipients.cc.length ? `, kopia ${recipients.cc.join(", ")}` : ""}.`
            : "Inga mejlmottagare i den här miljön."}{" "}
          Visar högst 500 anmälningar. CSV-exporten innehåller alla.
        </p>
      </main>
    </>
  );
}

function Tab({ href, active, label, count }: { href: string; active: boolean; label: string; count: number }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground hover:bg-background",
      )}
    >
      {label}
      <span className={cn("tabular-nums", active ? "text-primary-foreground/70" : "text-muted-foreground")}>
        {count}
      </span>
    </Link>
  );
}

function Notice({
  tone,
  title,
  children,
}: {
  tone: "warning" | "info";
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      role="status"
      className={cn(
        "rounded-lg border px-4 py-3 text-sm",
        tone === "warning"
          ? "border-destructive/30 bg-destructive/5"
          : "border-border bg-card",
      )}
    >
      <p className="flex items-center gap-2 font-medium">
        <AlertTriangle className={cn("size-4 shrink-0", tone === "warning" ? "text-destructive" : "text-accent")} />
        {title}
      </p>
      <div className="mt-1 text-muted-foreground">{children}</div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-0.5">{value}</dd>
    </div>
  );
}

function LeadCard({ lead, canEmail }: { lead: Lead; canEmail: boolean }) {
  return (
    <li className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-5 py-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-medium">{lead.name}</h2>
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                STATUS_STYLES[lead.status],
              )}
            >
              {STATUS_LABELS[lead.status]}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {dateFormat.format(lead.createdAt)} · #{lead.id}
          </p>
        </div>
        <div className="flex min-w-0 flex-wrap gap-2">
          <a
            href={`mailto:${lead.email}?subject=${encodeURIComponent("Parklyckan – din intresseanmälan")}`}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "max-w-full")}
          >
            <Mail /> <span className="truncate">{lead.email}</span>
          </a>
          {lead.phone ? (
            <a href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
              <Phone /> {lead.phone}
            </a>
          ) : null}
        </div>
      </div>

      <div className="grid gap-6 px-5 py-5 md:grid-cols-[1fr_17rem]">
        <div className="min-w-0 space-y-4 text-sm">
          <dl className="flex flex-wrap gap-x-8 gap-y-3">
            <Detail label="Antal rum" value={lead.rooms ? (ROOM_LABELS[lead.rooms] ?? lead.rooms) : null} />
            <Detail label="Nuvarande ort" value={lead.city} />
            <Detail
              label="Bostadstyp"
              value={lead.housing ? (HOUSING_LABELS[lead.housing] ?? lead.housing) : null}
            />
          </dl>
          {lead.message ? (
            <p className="whitespace-pre-wrap break-words rounded-md bg-muted px-4 py-3 leading-relaxed">
              {lead.message}
            </p>
          ) : (
            <p className="text-muted-foreground">Inget meddelande.</p>
          )}

          {lead.notified ? (
            <p className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="size-4 text-accent" /> Mejlad till mäklaren
            </p>
          ) : (
            <div className="flex flex-wrap items-center gap-3 rounded-md border border-destructive/25 bg-destructive/5 px-3 py-2">
              <p className="flex min-w-0 flex-1 items-start gap-2">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
                <span className="min-w-0 break-words">
                  Inte mejlad ut{lead.notifyError ? `: ${lead.notifyError}` : "."}
                </span>
              </p>
              {canEmail ? (
                <form action={resendNotification}>
                  <input type="hidden" name="id" value={lead.id} />
                  <SubmitButton size="sm" variant="outline" pendingText="Skickar…">
                    Skicka mejl igen
                  </SubmitButton>
                </form>
              ) : null}
            </div>
          )}
        </div>

        <div className="grid content-start gap-3">
          <form
            action={saveLead}
            key={lead.updatedAt?.toISOString() ?? "new"}
            className="grid gap-3"
          >
            <input type="hidden" name="id" value={lead.id} />
            <label className="grid gap-1.5 text-sm font-medium">
              Status
              <Select name="status" defaultValue={lead.status}>
                {LEAD_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </Select>
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Anteckningar
              <Textarea
                name="notes"
                defaultValue={lead.notes ?? ""}
                placeholder="T.ex. ringde 12/10, vill se en 3:a"
                className="min-h-[88px] font-normal"
              />
            </label>
            <SubmitButton size="sm" pendingText="Sparar…">
              Spara
            </SubmitButton>
          </form>

          <details className="group text-sm">
            <summary className="cursor-pointer list-none text-muted-foreground underline-offset-4 hover:underline">
              Radera anmälan…
            </summary>
            <form action={removeLead} className="mt-2 grid gap-2 rounded-md border border-border p-3">
              <input type="hidden" name="id" value={lead.id} />
              <label className="flex items-start gap-2 text-muted-foreground">
                <input type="checkbox" name="confirm" value="yes" required className="mt-0.5 size-4" />
                Radera permanent, t.ex. när personen återkallat sitt samtycke.
              </label>
              <SubmitButton
                size="sm"
                variant="outline"
                pendingText="Raderar…"
                className="border-destructive/40 text-destructive hover:bg-destructive/5 hover:text-destructive"
              >
                Radera
              </SubmitButton>
            </form>
          </details>
        </div>
      </div>
    </li>
  );
}
