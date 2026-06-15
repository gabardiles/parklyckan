import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { SiteHeader } from "@/components/sections/site-header";
import { Hero } from "@/components/sections/hero";
import { KeyFacts } from "@/components/sections/key-facts";
import { RemainingApartments } from "@/components/sections/remaining-apartments";
import { ApartmentSelector } from "@/components/sections/apartment-selector";
import { Lifestyle } from "@/components/sections/lifestyle";
import { Slideshow } from "@/components/sections/slideshow";
import { Quality } from "@/components/sections/quality";
import { Articles } from "@/components/sections/articles";
import { Faq } from "@/components/sections/faq";
import { InterestForm } from "@/components/sections/interest-form";
import { Partners } from "@/components/sections/partners";
import { SiteFooter } from "@/components/sections/site-footer";
import { HomeJsonLd } from "@/components/structured-data";

export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <AnnouncementBar />
      <SiteHeader glass />
      <main>
        <Hero />
        <KeyFacts />
        <RemainingApartments />
        <ApartmentSelector />
        <Lifestyle />
        <Slideshow />
        <Quality />
        <Articles />
        <Faq />
        <InterestForm />
        <Partners />
      </main>
      <SiteFooter />
    </>
  );
}
