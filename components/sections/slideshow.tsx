"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { slides } from "@/data/site";
import { cn } from "@/lib/utils";

export function Slideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count]
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 5000);
    return () => clearInterval(id);
  }, [paused, count]);

  return (
    <section id="interior" className="scroll-mt-24 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            Interiör
          </p>
          <h2 className="mt-3 font-display text-3xl font-light leading-tight sm:text-5xl">
            Se dig omkring i hemmet
          </h2>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            Ljusa ytor, kvalitetskök och genomtänkta detaljer – en känsla för
            standarden som väntar i din nya lägenhet.
          </p>
        </div>

        <div
          className="group relative mt-10 overflow-hidden rounded-lg border border-border bg-card shadow-sm"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative aspect-[16/9]">
            {slides.map((slide, i) => (
              <div
                key={slide.src}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700",
                  i === index ? "opacity-100" : "opacity-0"
                )}
                aria-hidden={i !== index}
              >
                <Image
                  src={slide.src}
                  alt={slide.caption}
                  fill
                  sizes="(max-width: 1152px) 100vw, 1152px"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}

            {/* caption */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/80 to-transparent p-5 pt-12">
              <p className="text-sm font-medium text-white sm:text-base">
                {slides[index].caption}
              </p>
            </div>
          </div>

          {/* arrows */}
          <button
            type="button"
            aria-label="Föregående bild"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-primary shadow-sm transition hover:bg-white"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Nästa bild"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-primary shadow-sm transition hover:bg-white"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        {/* dots — visual bar inside a ≥44px tap target */}
        <div className="mt-2 flex justify-center">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Gå till bild ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className="grid h-11 w-7 place-items-center"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all",
                  i === index ? "w-6 bg-primary" : "w-1.5 bg-border"
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
