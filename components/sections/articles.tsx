import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { articles } from "@/data/articles";

export function Articles() {
  return (
    <section id="nyheter" className="scroll-mt-24 bg-secondary/50">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div data-reveal className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            Nyheter
          </p>
          <h2 className="mt-3 font-display text-3xl font-light leading-tight sm:text-5xl">
            Livet runt Parklyckan
          </h2>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            Padel, surdegsbröd och närproducerade delikatesser – upptäck
            grannskapet som väntar utanför din dörr i Båstad.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <Link
              key={article.slug}
              href={`/nyheter/${article.slug}`}
              data-reveal
              style={{ transitionDelay: `${i * 80}ms` }}
              className="group"
            >
              <Card className="h-full overflow-hidden border-border transition-shadow hover:shadow-md">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={article.cover}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                    {article.category}
                  </p>
                  <h3 className="mt-2 font-display text-xl leading-snug">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {article.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Läs mer
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
