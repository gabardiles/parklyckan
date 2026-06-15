"use client";

import { useEffect, useRef, useState } from "react";
import { Building2, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { availability } from "@/data/site";

/**
 * Lägenhetsväljaren — the interactive 3D Vision building widget from
 * parklyckan.com. Pick an apartment from the 3D facade and step into the
 * 360°-tours, floor plans and details for each unit.
 *
 * The heavy third-party iframe (and its external JS/cookies) is deferred:
 * it auto-loads once the section scrolls into view (IntersectionObserver),
 * so it never weighs down the initial paint. The button is a fallback for
 * browsers without IntersectionObserver / JS. The official loader just
 * injects an iframe for `data-id` and resizes it via postMessage, which we
 * replicate here.
 */
const BUILDING_ID = "e53ee4e0-c91d-11eb-a401-113bbe15f89c";
const WIDGET_SRC = `https://buildings.3dvision.se/projects/view/${BUILDING_ID}`;

export function ApartmentSelector() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [height, setHeight] = useState(900);

  // Auto-load when the widget scrolls into view.
  useEffect(() => {
    if (loaded) return;
    const el = containerRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoaded(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;
    function onMessage(event: MessageEvent) {
      try {
        const data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (data?.eventType === "on_resize" && data.payload?.height) {
          setHeight(data.payload.height);
        }
      } catch {
        /* ignore non-JSON messages from other embeds */
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [loaded]);

  return (
    <section id="lagenhetsvaljaren" className="scroll-mt-24 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div data-reveal className="max-w-2xl">
          <Badge variant="muted" className="mb-5">
            Lägenhetsväljaren
          </Badge>
          <h2 className="font-display text-3xl font-light leading-tight sm:text-5xl">
            Utforska huset i 3D
          </h2>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            Klicka dig fram på fasaden, jämför planlösningar och kliv in i
            360°-vyer för varje lägenhet. Av {availability.total} lägenheter är{" "}
            {availability.remainingCount} fortfarande lediga.
          </p>
        </div>

        <div
          ref={containerRef}
          data-reveal
          className="mt-10 overflow-hidden rounded-lg border border-border bg-card shadow-sm"
        >
          {loaded ? (
            <iframe
              ref={frameRef}
              src={WIDGET_SRC}
              title="Parklyckan – lägenhetsväljare och 360°-vyer"
              allowFullScreen
              style={{ width: "100%", height, border: "none" }}
            />
          ) : (
            <button
              type="button"
              onClick={() => setLoaded(true)}
              aria-label="Öppna lägenhetsväljaren i 3D"
              className="brand-gradient brand-glow group flex aspect-[16/10] w-full flex-col items-center justify-center gap-5 p-8 text-center sm:aspect-[16/7]"
            >
              <span className="relative grid size-16 place-items-center rounded-full bg-white/10 ring-1 ring-white/25 transition-transform group-hover:scale-105">
                <Building2 className="size-7 text-white" />
                <span className="absolute -bottom-1 -right-1 grid size-7 place-items-center rounded-full bg-accent text-white">
                  <Play className="size-3.5 translate-x-px fill-current" />
                </span>
              </span>
              <span className="relative max-w-md">
                <span className="block font-display text-xl font-light text-white sm:text-2xl">
                  Öppna lägenhetsväljaren
                </span>
                <span className="mt-1 block text-sm text-white/70">
                  Interaktiv 3D-modell med planlösningar och 360°-vyer
                </span>
              </span>
            </button>
          )}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Tjänsten tillhandahålls av 3D Vision.{" "}
          <a
            href={WIDGET_SRC}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-primary underline underline-offset-4"
          >
            Öppna i nytt fönster
          </a>
          .
        </p>
      </div>
    </section>
  );
}
