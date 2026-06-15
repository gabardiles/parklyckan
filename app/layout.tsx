import type { Metadata, Viewport } from "next";
import { SITE, siteUrl } from "@/lib/seo";
import { ScrollReveal } from "@/components/scroll-reveal";
import "./globals.css";

const title = "Parklyckan | Nyproduktion Båstad — endast ett fåtal lägenheter kvar";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Parklyckan Båstad",
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  applicationName: SITE.name,
  authors: [{ name: SITE.broker.name }],
  creator: SITE.developer.name,
  publisher: SITE.legalName,
  category: "real estate",
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, address: true, email: true },
  openGraph: {
    title,
    description: SITE.description,
    url: "/",
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: "Parklyckan — nyproduktion i Båstad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0f1a2e",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv">
      {/* Preload the brand fonts used above the fold (React 19 hoists to <head>) */}
      <link
        rel="preload"
        href="/fonts/GT-Walsheim-Light.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/GT-Walsheim-Regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <body className="font-sans">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
