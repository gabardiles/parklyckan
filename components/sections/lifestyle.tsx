import { FeatureSplit } from "./feature-split";
import { images } from "@/data/site";

export function Lifestyle() {
  return (
    <section id="omradet" className="scroll-mt-20 bg-secondary/50">
      <div className="mx-auto max-w-6xl space-y-20 px-4 py-20 sm:px-6 sm:py-28">
        <FeatureSplit
          eyebrow="Båstad"
          title="Bli en del av det växande Båstad"
          image={images.bastad}
          imageAlt="Natur och havsbris i Båstad"
        >
          <p>
            Njut av havsbrisen och vacker grönska i den omslutande naturen som
            omringar båstadslivet. Du som väljer att leva ditt liv i Båstad
            kommer få uppleva lugna naturmiljöer, sorlande innerstadsgator och
            livsnjutarstunder året runt.
          </p>
        </FeatureSplit>

        <FeatureSplit
          eyebrow="Utsikten"
          title="Spana ut över naturen från Parklyckans höjder"
          image={images.heights}
          imageAlt="Utsikt från Parklyckans övre våningar"
          reverse
        >
          <p>
            Från Parklyckans tio och åtta våningar har du utsikt över den
            välbevarade naturen, nära det gröna och sköna mellan både skogar
            och hav. Ta ditt morgonkaffe på balkongen och njut av solen tills
            den går ner i havet.
          </p>
        </FeatureSplit>

        <FeatureSplit
          eyebrow="Kommunikationer"
          title="Området där långt bort blir nära"
          image={images.entrance}
          imageAlt="Entré via Dressinvägen till Parklyckan"
        >
          <p>
            Med Båstads tågstation endast 100 meter bort förflyttar du dig
            enkelt både kort och långt. Öresundståget tar dig smidigt till
            städer mellan Köpenhamn och Göteborg, flera gånger om dagen.
          </p>
          <p>
            I området rör du dig bilfritt med föreningens solcellsladdade
            elcyklar — till affären, havet eller vännerna i centrum.
          </p>
        </FeatureSplit>
      </div>
    </section>
  );
}
