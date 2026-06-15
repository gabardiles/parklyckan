/**
 * All editable site content lives here.
 *
 * IMPORTANT: `availability` drives the "nästan slutsålt" messaging
 * across the whole page (announcement bar, hero meter, apartment
 * cards). Update soldCount + the remaining[] list as units sell.
 */

export const availability = {
  total: 100,
  soldCount: 91, // 9 lediga — verifieras löpande med mäklaren
  get remainingCount() {
    return this.total - this.soldCount;
  },
};

export type Apartment = {
  id: string; // Bostad
  rooms: number; // Rum
  sqm: number; // Storlek, m²
  floor: number; // Våning
  price: number; // Pris, kr
  fee: number; // Avgift, kr/mån
  status: "ledig" | "reserverad";
};

/** Lediga lägenheter — hämtade från lägenhetsväljaren (Nadjafi & Kristensen). */
export const remainingApartments: Apartment[] = [
  { id: "1-1603", rooms: 2, sqm: 55.3, floor: 7, price: 2669800, fee: 3249, status: "ledig" },
  { id: "1-1606", rooms: 2, sqm: 55.4, floor: 7, price: 2555150, fee: 3255, status: "ledig" },
  { id: "2-1603", rooms: 2, sqm: 51.5, floor: 7, price: 2453200, fee: 3026, status: "ledig" },
  { id: "2-1606", rooms: 2, sqm: 55.4, floor: 7, price: 2404700, fee: 3255, status: "ledig" },
  { id: "2-1706", rooms: 2, sqm: 55.4, floor: 8, price: 2628200, fee: 3255, status: "ledig" },
  { id: "2-1801", rooms: 3, sqm: 71.7, floor: 9, price: 3987750, fee: 4213, status: "ledig" },
  { id: "2-1803", rooms: 2, sqm: 51.5, floor: 9, price: 2996750, fee: 3026, status: "ledig" },
  { id: "2-1805", rooms: 3, sqm: 71.7, floor: 9, price: 3949900, fee: 4213, status: "ledig" },
  { id: "2-1806", rooms: 2, sqm: 55.4, floor: 9, price: 2946650, fee: 3255, status: "ledig" },
];

// Ranges derived from the available apartments — drive the key-facts block.
const ledigaApts = remainingApartments.filter((a) => a.status === "ledig");
const nfInt = new Intl.NumberFormat("sv-SE", { maximumFractionDigits: 0 });
const nfDec = new Intl.NumberFormat("sv-SE", { maximumFractionDigits: 1 });
const sqmVals = ledigaApts.map((a) => a.sqm);
const priceVals = ledigaApts.map((a) => a.price);

export const availablePriceMin = Math.min(...priceVals);
export const availablePriceMax = Math.max(...priceVals);
export const availableSizeRange = `${nfDec.format(Math.min(...sqmVals))}–${nfDec.format(Math.max(...sqmVals))} m²`;
export const availablePriceRange = `${nfInt.format(availablePriceMin)} – ${nfInt.format(availablePriceMax)} kr`;

export const facts = [
  { label: "Inflyttning", value: "Klart för inflytt" },
  { label: "Storlek", value: availableSizeRange },
  { label: "Pris", value: availablePriceRange },
  { label: "Tillträde", value: "Enligt överenskommelse" },
  { label: "Antal lägenheter", value: "100 st" },
  { label: "Mäklare", value: "Nadjafi & Kristensen" },
];

/**
 * All imagery is self-hosted under /public — no cross-linking to
 * parklyckan.com. Drop replacements into public/images / public/logos
 * with the same filename and they pick up automatically.
 */
const IMG = "/images";

export const images = {
  hero: `${IMG}/hero_startsidan_framsidaparklyckan.original.jpg`,
  bastad: `${IMG}/start_block1_b1.original.jpg`,
  heights: `${IMG}/start_block1_b3.original.jpg`,
  entrance: `${IMG}/entre_bild.original.jpg`,
  livingRoom: `${IMG}/vardagsrum_parklyckan.original.jpg`,
  kitchen: `${IMG}/kok1_parklyckan.original.jpg`,
  homeOffice: `${IMG}/hemmakontor_parklyckan.original.jpg`,
  dinner: `${IMG}/middag2.original.jpg`,
  bike: `${IMG}/cykel_3.original.jpg`,
  balcony: `${IMG}/balkong_parklyckan.original.jpg`,
  broker: `${IMG}/djavad.original.original.jpg`,
  wennerholms: `${IMG}/wennerholms.original.jpg`,
  logoWhite: "/logos/logo_white.svg",
  logoSilver: "/logos/logo_silver.svg",
  nkfastBlack: "/logos/nkf_black.svg",
  nkfastWhite: "/logos/nkf_white.svg",
  wennerholmsLogo: "/logos/wennerholms.svg",
};

/** Interior slideshow — the "se dig omkring" gallery. */
export type Slide = { src: string; caption: string };

export const slides: Slide[] = [
  { src: `${IMG}/vardagsrum_parklyckan.original.jpg`, caption: "Vardagsrum med generöst ljusinsläpp" },
  { src: `${IMG}/kok_slider1.original.jpg`, caption: "Kök med kvalitetsval" },
  { src: `${IMG}/kok_slider2.original.jpg`, caption: "Köksö och förvaring i genomtänkt design" },
  { src: `${IMG}/sang_bild.original.jpg`, caption: "Sovrum i lugna toner" },
  { src: `${IMG}/Badrum-18.original.jpg`, caption: "Helkaklat badrum" },
  { src: `${IMG}/balkong_parklyckan.original.jpg`, caption: "Balkong med utsikt över Båstad" },
  { src: `${IMG}/hemmakontor_parklyckan.original.jpg`, caption: "Plats för hemmakontoret" },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("sv-SE", { maximumFractionDigits: 0 }).format(n) + " kr";

export const formatSqm = (n: number) =>
  new Intl.NumberFormat("sv-SE", { maximumFractionDigits: 1 }).format(n) + " m²";

/** Common buyer questions — drives the FAQ section and FAQPage schema. */
export const faqs: { question: string; answer: string }[] = [
  {
    question: "Hur många lägenheter finns kvar i Parklyckan?",
    answer: `Projektet är nästan slutsålt. Av totalt ${availability.total} lägenheter finns just nu endast ${availability.remainingCount} kvar. Antalet uppdateras löpande i takt med att lägenheterna säljs.`,
  },
  {
    question: "Var ligger Parklyckan?",
    answer:
      "Parklyckan ligger i Båstad, endast cirka 100 meter från Båstads tågstation. Med Öresundståget tar du dig smidigt mellan Köpenhamn och Göteborg, och du har både hav och bokskog inom räckhåll.",
  },
  {
    question: "Vad kostar lägenheterna och hur stora är de?",
    answer: `Lägenheterna som finns kvar är ${availableSizeRange} (2–3 rum och kök) och priserna ligger i intervallet ${availablePriceRange}.`,
  },
  {
    question: "När är inflyttning?",
    answer:
      "Lägenheterna är färdigställda och inflyttningsklara. Tillträde sker enligt överenskommelse med mäklaren.",
  },
  {
    question: "Kan jag se ritningar till lägenheterna?",
    answer:
      "Ja. Ritningarna finns i lägenhetsväljaren — klicka dig in på en lägenhet så ser du planlösningen.",
  },
  {
    question: "Vem är mäklare för Parklyckan?",
    answer:
      "Nadjafi & Kristensen Fastighetsförmedling ansvarar för försäljningen. Kontakta Djavad Kristensson på 0735-29 39 00 eller djavad@nkfast.se.",
  },
];
