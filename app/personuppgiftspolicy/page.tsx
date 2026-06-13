import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/sections/site-header";
import { SiteFooter } from "@/components/sections/site-footer";

export const metadata: Metadata = {
  title: "Personuppgiftspolicy",
  description:
    "Så hanterar Brf Parklyckan och Nadjafi & Kristensen Fastighetsförmedling dina personuppgifter när du anmäler intresse.",
  alternates: { canonical: "/personuppgiftspolicy" },
  robots: { index: true, follow: true },
};

const sections: { heading: string; body: string[] }[] = [
  {
    heading: "Personuppgiftsansvarig",
    body: [
      "När du anmäler intresse för Parklyckan behandlas dina personuppgifter av Nadjafi & Kristensen Fastighetsförmedling tillsammans med byggherren Wennerholms Gruppen. Har du frågor om behandlingen når du oss på djavad@nkfast.se eller 0735‑29 39 00.",
    ],
  },
  {
    heading: "Vilka uppgifter vi samlar in",
    body: [
      "Vi samlar in de uppgifter du själv lämnar i intresseanmälan: namn, telefonnummer, e‑postadress, nuvarande ort och bostadstyp, önskad lägenhetsstorlek samt eventuellt meddelande.",
    ],
  },
  {
    heading: "Ändamål och laglig grund",
    body: [
      "Uppgifterna används för att kontakta dig med aktuella lägenheter, visningar och nyheter om projektet samt för att administrera din intresseanmälan. Den lagliga grunden är ditt samtycke, som du lämnar när du skickar anmälan, samt vårt berättigade intresse av att förmedla bostäderna.",
    ],
  },
  {
    heading: "Hur länge vi sparar uppgifterna",
    body: [
      "Vi sparar dina uppgifter så länge projektet är aktuellt och du önskar bli kontaktad. Du kan när som helst återkalla ditt samtycke, varpå vi raderar dina uppgifter.",
    ],
  },
  {
    heading: "Dina rättigheter",
    body: [
      "Du har rätt att begära ett registerutdrag, att få felaktiga uppgifter rättade, att få dina uppgifter raderade samt att invända mot behandlingen. Kontakta oss via uppgifterna ovan för att utöva dina rättigheter. Du har även rätt att lämna klagomål till Integritetsskyddsmyndigheten (IMY).",
    ],
  },
  {
    heading: "Delning av uppgifter",
    body: [
      "Dina uppgifter delas endast mellan mäklaren och byggherren för att hantera din intresseanmälan. Vi säljer aldrig dina personuppgifter vidare till tredje part.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-background">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" /> Till startsidan
          </Link>
          <h1 className="mt-8 font-display text-4xl font-light leading-tight sm:text-5xl">
            Personuppgiftspolicy
          </h1>
          <p className="mt-4 text-muted-foreground">
            Så hanterar vi dina personuppgifter när du anmäler intresse för
            Brf Parklyckan i Båstad.
          </p>

          <div className="mt-12 space-y-10">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-2xl font-light">
                  {section.heading}
                </h2>
                {section.body.map((p, i) => (
                  <p key={i} className="mt-3 leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
