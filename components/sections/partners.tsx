import Image from "next/image";
import Link from "next/link";
import { images } from "@/data/site";

export function Partners() {
  return (
    <section className="bg-card">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2">
        {/* Mäklare */}
        <div className="flex flex-col">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-accent">
            Mäklare
          </p>
          <h2 className="font-display text-2xl font-light leading-tight sm:text-3xl">
            Nadjafi & Kristensen Fastighetsförmedling
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Dina lokala mäklare som lyfter kvalitet i varje detalj och strävar
            mot nöjda kunder och slutpriser som gynnar bägge parter — med
            personligt engagemang på Bjärehalvön, i Ängelholm och på Mallorca.
          </p>
          <div className="mt-8 flex items-center gap-5 rounded-lg border border-border p-5">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-full">
              <Image
                src={images.broker}
                alt="Djavad Kristensen"
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium">Djavad Kristensen</p>
              <p className="text-sm text-muted-foreground">Ansvarig mäklare</p>
              <p className="mt-1 text-sm">
                <a href="tel:0735293900" className="text-primary underline-offset-4 hover:underline">
                  0735‑29 39 00
                </a>{" "}
                ·{" "}
                <a href="mailto:djavad@nkfast.se" className="text-primary underline-offset-4 hover:underline">
                  djavad@nkfast.se
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Byggherre */}
        <div className="flex flex-col">
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
