import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/sections/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { buttonVariants } from "@/components/ui/button";
import { ArticleJsonLd } from "@/components/structured-data";
import { articles, getArticle } from "@/data/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Nyheter — Parklyckan" };
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/nyheter/${article.slug}` },
    openGraph: {
      title: `${article.title} — Parklyckan`,
      description: article.excerpt,
      url: `/nyheter/${article.slug}`,
      images: [article.hero],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} — Parklyckan`,
      description: article.excerpt,
      images: [article.hero],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const more = articles.filter((a) => a.slug !== article.slug);

  return (
    <>
      <ArticleJsonLd article={article} />
      <SiteHeader />
      <main>
        <article>
          {/* Hero */}
          <header className="relative isolate bg-navy-deep">
            <div className="absolute inset-0 -z-10">
              <Image
                src={article.hero}
                alt={article.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-navy-deep/20" />
            </div>
            <div className="mx-auto flex min-h-[52svh] max-w-3xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
                {article.category} · {article.eyebrow}
              </p>
              <h1 className="mt-3 font-display text-4xl font-light leading-[1.1] text-white sm:text-6xl">
                {article.title}
              </h1>
            </div>
          </header>

          {/* Body */}
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
            <Link
              href="/#nyheter"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-4" /> Tillbaka till nyheter
            </Link>

            <div className="mt-8 space-y-6">
              {article.body.map((block, i) => {
                if (block.type === "lead")
                  return (
                    <p
                      key={i}
                      className="font-display text-xl font-light leading-relaxed text-foreground sm:text-2xl"
                    >
                      {block.text}
                    </p>
                  );
                if (block.type === "quote")
                  return (
                    <blockquote
                      key={i}
                      className="border-l-2 border-accent pl-5 font-display text-xl font-light italic leading-relaxed text-primary sm:text-2xl"
                    >
                      {block.text}
                    </blockquote>
                  );
                if (block.type === "h2")
                  return (
                    <h2
                      key={i}
                      className="pt-2 font-display text-2xl font-light leading-snug text-foreground"
                    >
                      {block.text}
                    </h2>
                  );
                return (
                  <p key={i} className="leading-relaxed text-muted-foreground">
                    {block.text}
                  </p>
                );
              })}
            </div>

            {/* Gallery */}
            {article.gallery.length > 0 && (
              <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4">
                {article.gallery.map((src, i) => (
                  <div
                    key={src}
                    className={`relative overflow-hidden rounded-lg ${
                      i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`${article.title} — bild ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="mt-14 flex flex-col items-start gap-4 rounded-lg border border-accent/40 bg-accent/10 p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-sm sm:text-base">
                <span className="font-medium">Vill du bo granne med allt detta?</span>{" "}
                Endast ett fåtal lägenheter kvar i Parklyckan.
              </p>
              <Link href="/#formular" className={buttonVariants({ variant: "accent" })}>
                Anmäl intresse
              </Link>
            </div>
          </div>
        </article>

        {/* More articles */}
        <section className="border-t border-border bg-secondary/50">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="font-display text-2xl font-light">Fler nyheter</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {more.map((a) => (
                <Link key={a.slug} href={`/nyheter/${a.slug}`} className="group flex gap-4">
                  <div className="relative size-24 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={a.cover}
                      alt={a.title}
                      fill
                      sizes="96px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                      {a.category}
                    </p>
                    <h3 className="mt-1 font-display text-lg leading-snug">{a.title}</h3>
                    <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Läs mer <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
