import { isAdmin } from "@/lib/admin-auth";
import { HOUSING_LABELS, ROOM_LABELS, STATUS_LABELS, listLeads } from "@/lib/leads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Skyddar mot formelinjektion i Excel och citerar enligt CSV. */
function cell(value: string | null | undefined) {
  let v = value ?? "";
  if (/^[=+\-@\t\r]/.test(v)) v = `'${v}`;
  return /[";\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

const stockholm = new Intl.DateTimeFormat("sv-SE", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "Europe/Stockholm",
});

export async function GET() {
  if (!(await isAdmin())) return new Response("Unauthorized", { status: 401 });

  const leads = await listLeads({ limit: 10_000 });
  const header = [
    "Id", "Datum", "Status", "Namn", "E-post", "Telefon", "Antal rum",
    "Nuvarande ort", "Bostadstyp", "Meddelande", "Anteckningar", "Mejlad",
  ];
  const lines = leads.map((l) =>
    [
      String(l.id),
      stockholm.format(l.createdAt),
      STATUS_LABELS[l.status],
      l.name,
      l.email,
      l.phone,
      l.rooms ? (ROOM_LABELS[l.rooms] ?? l.rooms) : "",
      l.city,
      l.housing ? (HOUSING_LABELS[l.housing] ?? l.housing) : "",
      l.message,
      l.notes,
      l.notified ? "Ja" : "Nej",
    ]
      .map(cell)
      .join(";"),
  );

  // Semikolon + BOM så att svensk Excel öppnar filen rätt direkt.
  const csv = "﻿" + [header.join(";"), ...lines].join("\r\n");
  const date = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="parklyckan-anmalningar-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
