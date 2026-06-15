import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { availability, images } from "@/data/site";

export function Hero() {
  const soldPct = (availability.soldCount / availability.total) * 100;

  return (
    <section className="relative isolate bg-pine-deep">
      <div className="absolute inset-0 -z-10">
        <Image
          src={images.hero}
          alt="Parklyckans fasad i Båstad"
          fill
          priority
          quality={60}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pine-deep via-pine-deep/55 to-pine-deep/25" />
      </div>

      <div className="mx-auto flex min-h-[82svh] max-w-6xl flex-col justify-end px-4 pb-12 pt-24 sm:px-6 sm:pb-16">
        <h1 className="font-display text-4xl font-light leading-[1.08] text-primary-foreground sm:text-6xl lg:text-7xl">
          Ett fåtal lägenheter kvar.
          <br />
          <span className="text-primary-foreground/85">Resten är hem.</span>
        </h1>

        <div className="mt-8 grid items-end gap-10 lg:mt-12 lg:grid-cols-2">
          {/* Left — copy + CTAs */}
          <div>
            <p className="max-w-xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
              100 topprustade lägenheter mellan hav och bokskog är färdigställda
              och inflyttningsklara. {availability.soldCount} har redan hittat
              sina ägare.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#lagenheter" className={buttonVariants({ variant: "accent", size: "lg" })}>
                Se de sista lägenheterna
              </a>
              <a
                href="#formular"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                )}
              >
                Anmäl intresse
              </a>
            </div>
          </div>

          {/* Right — Säljläge availability meter (light card for contrast) */}
          <div className="w-full lg:max-w-md lg:justify-self-end">
            <div className="glass-light rounded-lg border border-white/40 p-5 shadow-xl">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-secondary-foreground">
                  Säljläge
                </span>
                <span className="text-sm text-foreground">
                  <span className="font-display text-2xl text-primary">
                    {availability.remainingCount}
                  </span>{" "}
                  av {availability.total} kvar
                </span>
              </div>
              <Progress
                value={soldPct}
                label={`${availability.soldCount} av ${availability.total} lägenheter sålda`}
                className="mt-3 bg-secondary"
                barClassName="bg-primary"
              />
              <p className="mt-2 text-xs text-secondary-foreground/90">
                {availability.soldCount} sålda · uppdateras löpande
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
