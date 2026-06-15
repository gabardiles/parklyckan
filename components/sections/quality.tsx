import { FeatureSplit } from "./feature-split";
import { images } from "@/data/site";

export function Quality() {
  return (
    <section id="kvalitet" className="scroll-mt-20 bg-background">
      <div className="mx-auto max-w-6xl space-y-20 px-4 py-20 sm:px-6 sm:py-28">
        <div data-reveal className="max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-accent">
            Kvalitet
          </p>
          <h2 className="font-display text-3xl font-light leading-tight sm:text-5xl">
            Genomtänkta lägenheter utan kompromisser
          </h2>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            Parklyckan gör inga kompromisser med material och design. Vi har
            lagt extra tid på planering för att kunna erbjuda en helhet — ett
            hem med både hjärta och själ.
          </p>
        </div>

        <FeatureSplit
          eyebrow="Grunden"
          title="En bra grund att bygga ditt hem på"
          image={images.homeOffice}
          imageAlt="Hemmakontor i Parklyckan"
        >
          <p>
            Tillsammans med våra arkitekter har vi tagit fram en genomtänkt
            och välanpassad grund för ditt hem, där du dessutom kan välja
            bland olika tillval för att göra bostaden till din egen.
          </p>
        </FeatureSplit>

        <FeatureSplit
          eyebrow="Tillvalen"
          title="En lägenhet efter din vision"
          image={images.kitchen}
          imageAlt="Kök i Parklyckan"
          reverse
        >
          <p>
            Välj bland ett antal väl utvalda kvalitetstillval som Wennerholms
            tagit fram — så att hemmet behåller sin kvalitet samtidigt som det
            går i ton med det liv du ser dig leva.
          </p>
        </FeatureSplit>

        <FeatureSplit
          eyebrow="Gästerna"
          title="För välkomna besökare"
          image={images.dinner}
          imageAlt="Middag med vänner i Parklyckan"
        >
          <p>
            I båda husen finns välrustade övernattningslägenheter som boende
            kan hyra för familj och vänner — färdigmöblerade med kök, badrum,
            umgängesrum och sängar. Du bokar enkelt genom föreningen.
          </p>
        </FeatureSplit>
      </div>
    </section>
  );
}
