import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { images } from "@/data/site";
import { SITE } from "@/lib/seo";

export function SiteFooter() {
  return (
    <footer className="brand-gradient text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-3">
        <div>
          <Image
            src={images.logoSilver}
            alt="Parklyckan"
            width={180}
            height={40}
            className="h-10 w-auto"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
            Brf Parklyckan är en nybyggnadsproduktion i Båstad initierad av
            Wennerholms Gruppen. Vi skapar hem med kvalitet och gemenskap.
          </p>
          <a
            href="https://www.instagram.com/brf_parklyckan/"
            className="mt-5 inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground"
          >
            <Instagram className="size-4" /> Följ oss på Instagram
          </a>
        </div>

        <div className="text-sm">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground/60">
            Mäklare
          </p>
          <p className="mt-3 font-medium">{SITE.broker.name}</p>
          <p className="mt-1 text-primary-foreground/80">
            {SITE.broker.agent}, {SITE.broker.agentTitle}
          </p>
          <p className="mt-1 text-primary-foreground/80">
            {SITE.broker.address.streetAddress}, {SITE.broker.address.postalCode}{" "}
            {SITE.broker.address.addressLocality}
          </p>
          <p className="mt-1 flex flex-col text-primary-foreground/80">
            <a
              href={`tel:${SITE.broker.telephone}`}
              className="inline-flex min-h-11 items-center hover:underline"
            >
              {SITE.broker.telephoneDisplay}
            </a>
            <a
              href={`mailto:${SITE.broker.email}`}
              className="inline-flex min-h-11 items-center hover:underline"
            >
              {SITE.broker.email}
            </a>
          </p>
        </div>

        <div className="text-sm">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground/60">
            Mer
          </p>
          <ul className="mt-3 space-y-2 text-primary-foreground/80">
            <li>
              <Link href="/#lagenhetsvaljaren" className="hover:underline">
                Lägenhetsväljaren
              </Link>
            </li>
            <li>
              <Link href="/#nyheter" className="hover:underline">
                Nyheter
              </Link>
            </li>
            <li>
              <Link href="https://www.wennerholms.se/" className="hover:underline">
                Wennerholms
              </Link>
            </li>
            <li>
              <Link href={SITE.broker.url} className="hover:underline">
                Notar Båstad
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-primary-foreground/50 sm:px-6">
          © {new Date().getFullYear()} Parklyckan | Nyproduktion Båstad
        </p>
      </div>
    </footer>
  );
}
