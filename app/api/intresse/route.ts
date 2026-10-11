import { NextResponse } from "next/server";
import { SITE } from "@/lib/seo";

export const runtime = "nodejs";

type Submission = {
  name: string;
  email: string;
  phone: string;
  rooms: string;
  city: string;
  housing: string;
  message: string;
};

const FIELDS: { key: keyof Submission; label: string; max: number }[] = [
  { key: "name", label: "Namn", max: 200 },
  { key: "email", label: "E-post", max: 200 },
  { key: "phone", label: "Telefon", max: 50 },
  { key: "rooms", label: "Antal rum", max: 10 },
  { key: "city", label: "Nuvarande ort", max: 200 },
  { key: "housing", label: "Nuvarande bostadstyp", max: 50 },
  { key: "message", label: "Meddelande", max: 5000 },
];

const HOUSING_LABELS: Record<string, string> = {
  hyresratt: "Hyresrätt",
  bostadsratt: "Bostadsrätt",
  villa: "Villa",
  inneboende: "Inneboende",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ogiltig förfrågan." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill the "website" field.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const data = {} as Submission;
  for (const { key, max } of FIELDS) {
    const raw = body[key];
    data[key] = typeof raw === "string" ? raw.trim().slice(0, max) : "";
  }

  if (!data.name || !EMAIL_RE.test(data.email) || body.consent !== true) {
    return NextResponse.json(
      { error: "Fyll i namn, en giltig e-postadress och godkänn villkoren." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.INTEREST_FORM_FROM;
  if (!apiKey || !from) {
    console.error("Interest form: RESEND_API_KEY and/or INTEREST_FORM_FROM is not set");
    return NextResponse.json(
      { error: "Formuläret är inte konfigurerat ännu." },
      { status: 503 },
    );
  }

  const display: Submission = {
    ...data,
    rooms: data.rooms ? `${data.rooms} rum & kök` : "",
    housing: HOUSING_LABELS[data.housing] ?? data.housing,
  };
  const rows = FIELDS.map(({ key, label }) => ({ label, value: display[key] || "–" }));

  const text = [
    "Ny intresseanmälan via parklyckan-sajten",
    "",
    ...rows.map((r) => `${r.label}: ${r.value}`),
    "",
    "Personuppgiftsvillkoren har godkänts.",
  ].join("\n");

  const html = `<h2 style="font-family:sans-serif">Ny intresseanmälan – Brf Parklyckan</h2>
<table style="font-family:sans-serif;border-collapse:collapse">${rows
    .map(
      (r) =>
        `<tr><td style="padding:4px 12px 4px 0;vertical-align:top;color:#555">${escapeHtml(r.label)}</td><td style="padding:4px 0;white-space:pre-wrap">${escapeHtml(r.value)}</td></tr>`,
    )
    .join("")}</table>
<p style="font-family:sans-serif;color:#555">Personuppgiftsvillkoren har godkänts.</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [SITE.interestForm.to],
      cc: [SITE.interestForm.cc],
      reply_to: data.email,
      subject: `Intresseanmälan Parklyckan – ${data.name}`,
      text,
      html,
    }),
  });

  if (!res.ok) {
    console.error("Interest form: Resend error", res.status, await res.text());
    return NextResponse.json(
      { error: "Det gick inte att skicka anmälan just nu." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
