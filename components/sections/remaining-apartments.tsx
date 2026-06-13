import { BedDouble, Building2, Ruler } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { availability, formatPrice, remainingApartments } from "@/data/site";

export function RemainingApartments() {
  return (
    <section id="lagenheter" className="scroll-mt-20 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="max-w-2xl">
          <Badge variant="accent" className="mb-5">
            <span className="size-1.5 animate-pulse rounded-full bg-accent-foreground" />
            Endast {availability.remainingCount} kvar
          </Badge>
          <h2 className="font-display text-3xl font-light leading-tight sm:text-5xl">
            De sista lägenheterna i Parklyckan
          </h2>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            {availability.soldCount} av {availability.total} lägenheter är
            sålda. Det här är vad som finns kvar — när de är borta är
            Parklyckan slutsålt.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {remainingApartments.map((apt) => (
            <Card
              key={apt.id}
              className="group relative overflow-hidden transition-shadow hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Lägenhet {apt.id}
                    </p>
                    <p className="mt-1 font-display text-2xl">
                      {apt.rooms} rum & kök
                    </p>
                  </div>
                  <Badge variant={apt.status === "ledig" ? "accent" : "muted"}>
                    {apt.status === "ledig" ? "Ledig" : "Reserverad"}
                  </Badge>
                </div>

                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Ruler className="size-4 text-primary" /> {apt.sqm} m²
                  </li>
                  <li className="flex items-center gap-2">
                    <Building2 className="size-4 text-primary" /> Våning {apt.floor}
                  </li>
                  {apt.highlight && (
                    <li className="flex items-center gap-2">
                      <BedDouble className="size-4 text-primary" /> {apt.highlight}
                    </li>
                  )}
                </ul>

                <div className="mt-6 flex items-end justify-between border-t border-border pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Pris</p>
                    <p className="font-display text-xl">{formatPrice(apt.price)}</p>
                  </div>
                  <a
                    href="#formular"
                    className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Intresserad?
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-lg border border-accent/40 bg-accent/10 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm sm:text-base">
            <span className="font-medium">Hittar du inte rätt storlek?</span>{" "}
            Anmäl ditt intresse så hör vi av oss direkt om en reserverad
            lägenhet blir ledig igen.
          </p>
          <a href="#formular" className={buttonVariants({ variant: "accent" })}>
            Ställ dig i kö
          </a>
        </div>
      </div>
    </section>
  );
}
