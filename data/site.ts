/**
 * All editable site content lives here.
 *
 * IMPORTANT: `availability` drives the "nästan slutsålt" messaging
 * across the whole page (announcement bar, hero meter, apartment
 * cards). Update soldCount + the remaining[] list as units sell.
 */

export const availability = {
  total: 100,
  soldCount: 93, // TODO: verify actual number with mäklaren
  get remainingCount() {
    return this.total - this.soldCount;
  },
};

export type Apartment = {
  id: string;
  rooms: number;
  sqm: number;
  floor: number;
  price: number;
  highlight?: string;
  status: "ledig" | "reserverad";
};

/** TODO: replace with the real remaining units from Nadjafi & Kristensen */
export const remainingApartments: Apartment[] = [
  { id: "A-1103", rooms: 2, sqm: 52, floor: 3, price: 1850000, highlight: "Balkong i väster", status: "ledig" },
  { id: "A-1404", rooms: 3, sqm: 71, floor: 4, price: 2950000, highlight: "Genomgående planlösning", status: "ledig" },
  { id: "B-1702", rooms: 3, sqm: 78, floor: 7, price: 3650000, highlight: "Havsglimt", status: "reserverad" },
  { id: "B-1801", rooms: 4, sqm: 96, floor: 8, price: 4900000, highlight: "Hörnläge med dubbla balkonger", status: "ledig" },
  { id: "A-1902", rooms: 4, sqm: 104, floor: 9, price: 5750000, highlight: "Utsikt över Laholmsbukten", status: "ledig" },
  { id: "A-2001", rooms: 5, sqm: 141, floor: 10, price: 8200000, highlight: "Toppvåning", status: "ledig" },
];

export const facts = [
  { label: "Inflyttning", value: "Klart för inflytt" },
  { label: "Storlek", value: "44–141 m²" },
  { label: "Pris", value: "1 150 000 – 8 200 000 kr" },
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
    answer:
      "Lägenheterna är mellan 44 och 141 m² (2–5 rum och kök) och priserna ligger mellan 1 150 000 kr och 8 200 000 kr.",
  },
  {
    question: "När är inflyttning?",
    answer:
      "Lägenheterna är färdigställda och inflyttningsklara. Tillträde sker enligt överenskommelse med mäklaren.",
  },
  {
    question: "Kan jag se lägenheterna i 3D och 360°?",
    answer:
      "Ja. Via lägenhetsväljaren på sidan kan du utforska huset i 3D, jämföra planlösningar och kliva in i 360°-vyer för varje lägenhet.",
  },
  {
    question: "Vem är mäklare för Parklyckan?",
    answer:
      "Nadjafi & Kristensen Fastighetsförmedling ansvarar för försäljningen. Kontakta Djavad Kristensson på 0735-29 39 00 eller djavad@nkfast.se.",
  },
];
