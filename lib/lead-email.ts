import { SITE, siteUrl } from "@/lib/seo";
import { HOUSING_LABELS, ROOM_LABELS, type LeadInput } from "@/lib/leads";

export type NotifyResult = { ok: true } | { ok: false; error: string };

function addresses(value: string | undefined) {
  return (value ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
}

/**
 * Vem som får mejlnotisen.
 *
 * - INTEREST_NOTIFICATION_TO (kommaseparerad) ersätter standardmottagarna.
 *   Används lokalt och i preview så att tester inte når mäklaren.
 * - Annars, bara i produktion: mäklaren med kopia enligt SITE.interestForm.
 * - Preview/utveckling utan override: inget mejl, anmälan sparas ändå.
 */
export function notificationRecipients(): { to: string[]; cc: string[] } | null {
  const override = addresses(process.env.INTEREST_NOTIFICATION_TO);
  if (override.length) return { to: override, cc: [] };
  if (process.env.VERCEL_ENV === "production") {
    return { to: [SITE.interestForm.to], cc: [SITE.interestForm.cc] };
  }
  return null;
}

/** Saknade inställningar, för admin-sidans statusrad. Tom lista = allt klart. */
export function missingEmailConfig(): string[] {
  const missing: string[] = [];
  if (!process.env.RESEND_API_KEY) missing.push("RESEND_API_KEY");
  if (!process.env.INTEREST_FORM_FROM) missing.push("INTEREST_FORM_FROM");
  if (!notificationRecipients()) missing.push("INTEREST_NOTIFICATION_TO");
  return missing;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

function rows(lead: LeadInput): [string, string][] {
  return [
    ["Namn", lead.name],
    ["E-post", lead.email],
    ["Telefon", lead.phone ?? "–"],
    ["Antal rum", lead.rooms ? (ROOM_LABELS[lead.rooms] ?? lead.rooms) : "–"],
    ["Nuvarande ort", lead.city ?? "–"],
    ["Nuvarande bostadstyp", lead.housing ? (HOUSING_LABELS[lead.housing] ?? lead.housing) : "–"],
    ["Meddelande", lead.message ?? "–"],
  ];
}

export async function sendLeadNotification(lead: LeadInput, id: number | null): Promise<NotifyResult> {
  const missing = missingEmailConfig();
  if (missing.length) return { ok: false, error: `E-post ej konfigurerad: ${missing.join(", ")} saknas` };

  const recipients = notificationRecipients()!;
  const table = rows(lead);
  const adminUrl = `${siteUrl}/admin`;
  const ref = id === null ? "" : ` #${id}`;

  const text = [
    `Ny intresseanmälan${ref} via parklyckan-sajten`,
    "",
    ...table.map(([label, value]) => `${label}: ${value}`),
    "",
    "Personuppgiftsvillkoren har godkänts.",
    id === null ? "" : `Alla anmälningar: ${adminUrl}`,
  ].join("\n");

  const html = `<div style="font-family:-apple-system,Segoe UI,sans-serif;color:#213253;max-width:600px">
<h2 style="font-weight:400">Ny intresseanmälan – Brf Parklyckan</h2>
<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%">${table
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;vertical-align:top;color:#6b7280;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:6px 0;vertical-align:top;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join("")}</table>
<p style="color:#6b7280;font-size:13px;margin-top:20px">Personuppgiftsvillkoren har godkänts. Svara på det här mejlet för att svara direkt till ${escapeHtml(lead.name)}.</p>
${id === null ? "" : `<p style="color:#9ca3af;font-size:12px">Anmälan${ref} · <a href="${adminUrl}" style="color:#213253">Alla anmälningar</a></p>`}
</div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.INTEREST_FORM_FROM,
        to: recipients.to,
        cc: recipients.cc.length ? recipients.cc : undefined,
        reply_to: lead.email,
        subject: `Intresseanmälan Parklyckan – ${lead.name}`,
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      const detail = (await res.text()).slice(0, 300);
      return { ok: false, error: `Resend ${res.status}: ${detail}` };
    }
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}
