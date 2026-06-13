import { SITE, siteUrl, abs } from "@/lib/seo";
import { availability, facts, faqs } from "@/data/site";
import type { Article } from "@/data/articles";

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: SITE.address.streetAddress,
  addressLocality: SITE.address.addressLocality,
  addressRegion: SITE.address.addressRegion,
  postalCode: SITE.address.postalCode,
  addressCountry: SITE.address.addressCountry,
};

/** Homepage: website + broker (local business) + the development + FAQ. */
export function HomeJsonLd() {
  const sizeFact = facts.find((f) => f.label === "Storlek")?.value ?? "44–141 m²";

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: SITE.name,
        inLanguage: "sv-SE",
        description: SITE.shortDescription,
        publisher: { "@id": `${siteUrl}/#broker` },
      },
      {
        "@type": "RealEstateAgent",
        "@id": `${siteUrl}/#broker`,
        name: SITE.broker.name,
        url: `${siteUrl}/`,
        image: abs(SITE.ogImage),
        telephone: SITE.broker.telephone,
        email: SITE.broker.email,
        areaServed: { "@type": "City", name: "Båstad" },
        priceRange: SITE.priceRange,
        address: postalAddress,
        sameAs: [...SITE.sameAs],
        makesOffer: {
          "@type": "Offer",
          name: "Lägenheter i Brf Parklyckan",
          category: "Bostadsrätt",
          availability: "https://schema.org/LimitedAvailability",
          priceCurrency: "SEK",
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "SEK",
            minPrice: 1150000,
            maxPrice: 8200000,
          },
          itemOffered: { "@id": `${siteUrl}/#residence` },
        },
      },
      {
        "@type": ["ApartmentComplex", "Residence"],
        "@id": `${siteUrl}/#residence`,
        name: SITE.legalName,
        description: `Nyproduktion i Båstad med ${availability.total} topprustade lägenheter (${sizeFact}). Inflyttningsklart och nästan slutsålt.`,
        url: `${siteUrl}/`,
        image: [abs(SITE.ogImage), abs("/images/start_block1_b3.original.jpg")],
        numberOfAccommodationUnits: availability.total,
        numberOfAvailableAccommodationUnits: availability.remainingCount,
        address: postalAddress,
        geo: {
          "@type": "GeoCoordinates",
          latitude: SITE.geo.latitude,
          longitude: SITE.geo.longitude,
        },
        containedInPlace: { "@type": "Place", name: "Båstad, Skåne" },
        provider: { "@type": "Organization", name: SITE.developer.name, url: SITE.developer.url },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  return <JsonLd data={graph} />;
}

/** Blog article: Article + breadcrumb. */
export function ArticleJsonLd({ article }: { article: Article }) {
  const url = `${siteUrl}/nyheter/${article.slug}`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.excerpt,
        image: [article.hero, ...article.gallery].map((p) => abs(p)),
        articleSection: article.category,
        inLanguage: "sv-SE",
        url,
        mainEntityOfPage: url,
        isPartOf: { "@id": `${siteUrl}/#website` },
        author: { "@type": "Organization", name: SITE.name, url: `${siteUrl}/` },
        publisher: {
          "@type": "Organization",
          name: SITE.name,
          logo: { "@type": "ImageObject", url: abs("/logos/logo_white.svg") },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Hem", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Nyheter", item: `${siteUrl}/#nyheter` },
          { "@type": "ListItem", position: 3, name: article.title, item: url },
        ],
      },
    ],
  };
  return <JsonLd data={graph} />;
}
