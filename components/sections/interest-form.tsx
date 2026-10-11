"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { availability } from "@/data/site";
import { SITE } from "@/lib/seo";

export function InterestForm() {
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      ...Object.fromEntries(
        ["name", "email", "phone", "rooms", "city", "housing", "message", "website"].map(
          (key) => [key, String(form.get(key) ?? "")],
        ),
      ),
      consent: form.get("consent") === "on",
    };

    setStatus("sending");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/intresse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("sent");
        return;
      }
      const data = await res.json().catch(() => null);
      setErrorMessage(typeof data?.error === "string" ? data.error : null);
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="formular" className="brand-gradient scroll-mt-20 text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1fr_1.1fr]">
        <div data-reveal>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-accent">
            Intresseanmälan
          </p>
          <h2 className="font-display text-3xl font-light leading-tight sm:text-5xl">
            Säkra en av de sista {availability.remainingCount} lägenheterna
          </h2>
          <p className="mt-4 leading-relaxed text-primary-foreground/80">
            Anmäl ditt intresse så kontaktar mäklaren dig med aktuella
            lägenheter, visningar och nyheter om projektet. Anmälan är inte
            bindande.
          </p>
          <div className="mt-8 border-l-2 border-accent pl-4 text-sm text-primary-foreground/70">
            Frågor? Ring {SITE.broker.agent}, {SITE.broker.name}, på{" "}
            <a
              href={`tel:${SITE.broker.telephone}`}
              className="font-medium text-primary-foreground underline underline-offset-4"
            >
              {SITE.broker.telephoneDisplay}
            </a>
            .
          </div>
        </div>

        {status === "sent" ? (
          <div className="flex flex-col items-start justify-center rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 p-8">
            <h3 className="font-display text-2xl">Tack för din anmälan!</h3>
            <p className="mt-3 text-primary-foreground/80">
              Vi hör av oss inom kort med information om de lägenheter som
              finns kvar.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            data-reveal
            style={{ transitionDelay: "120ms" }}
            className="grid gap-5 rounded-lg border border-primary-foreground/15 bg-background p-6 text-foreground sm:grid-cols-2 sm:p-8"
          >
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="name">Namn *</Label>
              <Input id="name" name="name" required autoComplete="name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input id="phone" name="phone" type="tel" autoComplete="tel" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">E-post *</Label>
              <Input id="email" name="email" type="email" required autoComplete="email" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rooms">Antal rum</Label>
              <Select id="rooms" name="rooms" defaultValue="">
                <option value="" disabled>
                  Välj storlek
                </option>
                <option value="2">2 rum & kök</option>
                <option value="3">3 rum & kök</option>
                <option value="4">4 rum & kök</option>
                <option value="5">5 rum & kök</option>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="city">Nuvarande ort</Label>
              <Input id="city" name="city" autoComplete="address-level2" />
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="housing">Nuvarande bostadstyp</Label>
              <Select id="housing" name="housing" defaultValue="">
                <option value="" disabled>
                  Välj bostadstyp
                </option>
                <option value="hyresratt">Hyresrätt</option>
                <option value="bostadsratt">Bostadsrätt</option>
                <option value="villa">Villa</option>
                <option value="inneboende">Inneboende</option>
              </Select>
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="message">Meddelande</Label>
              <Textarea id="message" name="message" placeholder="Berätta gärna vad du letar efter…" />
            </div>
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="website">Webbplats</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <label className="flex items-start gap-3 text-sm text-muted-foreground sm:col-span-2">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-0.5 size-4 shrink-0 accent-[#213253]"
              />
              <span>
                Jag godkänner{" "}
                <Link
                  href="/personuppgiftspolicy"
                  className="text-primary underline underline-offset-4"
                >
                  villkor och avtal
                </Link>{" "}
                för hantering av mina personuppgifter. *
              </span>
            </label>
            {status === "error" && (
              <p
                role="alert"
                className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive sm:col-span-2"
              >
                {errorMessage ?? (
                  <>
                    Något gick fel och anmälan kunde inte skickas. Försök igen eller
                    mejla{" "}
                    <a
                      href={`mailto:${SITE.broker.officeEmail}`}
                      className="underline underline-offset-4"
                    >
                      {SITE.broker.officeEmail}
                    </a>
                    .
                  </>
                )}
              </p>
            )}
            <Button
              type="submit"
              size="lg"
              disabled={status === "sending"}
              className="sm:col-span-2"
            >
              {status === "sending" ? "Skickar…" : "Skicka intresseanmälan"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
