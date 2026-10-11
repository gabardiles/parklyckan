import Image from "next/image";
import Link from "next/link";
import { images } from "@/data/site";
import { SITE } from "@/lib/seo";

export function Partners() {
  return (
    <section className="bg-card">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2">
        {/* Mäklare */}
        <div data-reveal className="flex flex-col">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-accent">
            Mäklare
          </p>
          <h2 className="font-display text-2xl font-light leading-tight sm:text-3xl">
            {SITE.broker.name}
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Notar Båstad har en lång erfarenhet och stor kännedom om
            Bjärehalvöns bostadsmarknad. För sjunde året i rad har Hemnet
            utsett Notar till Årets Mäklarkedja. Ett tydligt bevis på att vårt
            engagemang och vår arbetsinsats gör skillnad, både för våra kunder
            och för bostadsmarknaden.
          </p>
          <div className="mt-8 flex items-center gap-5 rounded-lg border border-border p-5">
            <div className="relative size-24 shrink-0 overflow-hidden rounded-full">
              <Image
                src={images.broker}
                alt={`${SITE.broker.agent}, ${SITE.broker.name}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="font-medium">{SITE.broker.agent}</p>
              <p className="text-sm text-muted-foreground">
                {SITE.broker.agentTitle}
              </p>
              <p className="mt-1 text-sm">
                <a
                  href={`tel:${SITE.broker.telephone}`}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {SITE.broker.telephoneDisplay}
                </a>{" "}
                ·{" "}
                <a
                  href={`mailto:${SITE.broker.email}`}
                  className="break-all text-primary underline-offset-4 hover:underline"
                >
                  {SITE.broker.email}
                </a>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {SITE.broker.address.streetAddress},{" "}
                {SITE.broker.address.postalCode}{" "}
                {SITE.broker.address.addressLocality} ·{" "}
                <Link
                  href={SITE.broker.url}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  notar.se
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Byggherre */}
        <div data-reveal style={{ transitionDelay: "100ms" }} className="flex flex-col">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-accent">
            Byggherre
          </p>
          <h2 className="font-display text-2xl font-light leading-tight sm:text-3xl">
            Byggveteranerna från andra sidan Laholmsbukten
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Bakom Parklyckan står familjeföretaget Wennerholms, etablerade
            inom nyproduktion och förvaltning sedan tidigt 30‑tal, med
            flertalet lyckade nyetableringar på Västkusten — senast Kronolund
            i Frösakull. Läs mer på{" "}
            <Link
              href="https://www.wennerholms.se/"
              className="text-primary underline underline-offset-4"
            >
              wennerholms.se
            </Link>
            .
          </p>
          <div className="relative mt-8 aspect-[3/2] overflow-hidden rounded-lg">
            <Image
              src={images.wennerholms}
              alt="Wennerholms vid Parklyckan"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
