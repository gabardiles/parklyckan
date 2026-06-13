"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { availability } from "@/data/site";

/**
 * Lägenhetsväljaren — the interactive 3D Vision building widget from
 * parklyckan.com. Pick an apartment from the 3D facade and step into the
 * 360°-tours, floor plans and details for each unit.
 *
 * The official `buildings.3dvision.se/widget/js/loader.js` simply injects
 * an <iframe> for `data-id` and resizes it from postMessage("on_resize")
 * events. We replicate that here so it works reliably inside React.
 */
const BUILDING_ID = "e53ee4e0-c91d-11eb-a401-113bbe15f89c";
const WIDGET_SRC = `https://buildings.3dvision.se/projects/view/${BUILDING_ID}`;

export function ApartmentSelector() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(900);

  useEffect(() => {
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
  }, []);

  return (
    <section id="lagenhetsvaljaren" className="scroll-mt-24 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="max-w-2xl">
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

        <div className="mt-10 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <iframe
            ref={frameRef}
            src={WIDGET_SRC}
            title="Parklyckan – lägenhetsväljare och 360°-vyer"
            loading="lazy"
            allowFullScreen
            style={{ width: "100%", height, border: "none" }}
          />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Tjänsten tillhandahålls av 3D Vision. Laddar inte väljaren?{" "}
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
