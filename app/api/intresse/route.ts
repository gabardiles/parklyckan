import { NextResponse } from "next/server";
import { dbConfigured } from "@/lib/db";
import { insertLead, parseLeadInput, recordNotification } from "@/lib/leads";
import { sendLeadNotification } from "@/lib/lead-email";
import { SITE } from "@/lib/seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Intresseanmälan: sparas först i databasen, mejlas sedan till mäklaren.
 *
 * En anmälan räknas som mottagen om minst en av kanalerna lyckas. Ett
 * misslyckat mejl syns i /admin och kan skickas om därifrån.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ogiltig förfrågan." }, { status: 400 });
  }

  // Honeypot: riktiga besökare ser aldrig fältet "website".
  const website = (body as Record<string, unknown> | null)?.website;
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const parsed = parseLeadInput(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  const lead = parsed.data;

  let id: number | null = null;
  if (dbConfigured()) {
    try {
      id = await insertLead(lead, {
        userAgent: request.headers.get("user-agent"),
        ip: request.headers.get("x-forwarded-for"),
      });
    } catch (error) {
      console.error("[intresse] kunde inte spara anmälan", error);
    }
  } else {
    console.error("[intresse] DATABASE_URL saknas, anmälan sparas inte");
  }

  const mail = await sendLeadNotification(lead, id);
  if (!mail.ok) console.error(`[intresse] mejl misslyckades (anmälan ${id ?? "ej sparad"}): ${mail.error}`);

  if (id !== null) {
    try {
      await recordNotification(id, mail);
    } catch (error) {
      console.error(`[intresse] kunde inte uppdatera notisstatus för #${id}`, error);
    }
  }

  if (id === null && !mail.ok) {
    return NextResponse.json(
      {
        error: `Det gick inte att skicka anmälan just nu. Försök igen eller mejla ${SITE.broker.officeEmail}.`,
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
