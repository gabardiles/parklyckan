/**
 * Central SEO / GEO configuration. One source of truth for the canonical
 * URL, NAP (name/address/phone), geo coordinates and pricing — used by
 * metadata, sitemap, robots and the JSON-LD structured data.
 */

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL
    : process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://parklyckan.vercel.app"
).replace(/\/$/, "");

export const SITE = {
  name: "Parklyckan",
  legalName: "Brf Parklyckan",
  shortDescription:
    "Nyproduktion i Båstad — endast ett fåtal av 100 inflyttningsklara lägenheter kvar.",
  description:
    "Nästan slutsålt! Ett fåtal av 100 topprustade, inflyttningsklara lägenheter finns kvar i Brf Parklyckan, Båstad. 51,5–71,7 m², 2,4–4,0 Mkr. Anmäl ditt intresse idag.",
  locale: "sv_SE",
  ogImage: "/og-image.jpg",
  address: {
    streetAddress: "Dressinvägen",
    addressLocality: "Båstad",
    addressRegion: "Skåne",
    postalCode: "269 31",
    addressCountry: "SE",
  },
  geo: { latitude: 56.4256, longitude: 12.8517 },
  priceRange: "2 404 700–3 987 750 kr",
  broker: {
    name: "Notar Båstad",
    agent: "Johan Svahn",
    agentTitle: "Franchisetagare / Reg. Fastighetsmäklare",
    telephone: "+46735181470",
    telephoneDisplay: "0735‑18 14 70",
    email: "johan.svahn@notar.se",
    officeEmail: "bastad@notar.se",
    url: "https://www.notar.se/kontakta-oss/kontor/bastad",
    address: {
      streetAddress: "Köpmansgatan 91",
      postalCode: "269 32",
      addressLocality: "Båstad",
    },
  },
  /** Every interest form submission goes to the broker, with a copy to the client. */
  interestForm: {
    to: "bastad@notar.se",
    cc: "daniel@akselson.com",
  },
  developer: { name: "Wennerholms", url: "https://www.wennerholms.se/" },
  sameAs: ["https://www.instagram.com/brf_parklyckan/"],
  keywords: [
    "Parklyckan",
    "nyproduktion Båstad",
    "lägenheter Båstad",
    "bostadsrätt Båstad",
    "nyproducerade lägenheter",
    "Brf Parklyckan",
    "lägenhet till salu Båstad",
    "inflyttningsklara lägenheter",
    "Wennerholms",
    "Notar Båstad",
  ],
} as const;

export const abs = (path: string) =>
  path.startsWith("http") ? path : `${siteUrl}${path.startsWith("/") ? "" : "/"}${path}`;
