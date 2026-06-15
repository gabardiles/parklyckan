"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { images } from "@/data/site";

const nav = [
  { href: "/#lagenheter", label: "Lediga lägenheter" },
  { href: "/#lagenhetsvaljaren", label: "Lägenhetsväljaren" },
  { href: "/#interior", label: "Interiör" },
  { href: "/#nyheter", label: "Nyheter" },
];

/**
 * `glass` should be set on pages that render a dark hero *behind* the
 * header (the homepage). The header then frosts the hero while pinned at
 * the top, and turns into the solid brand gradient once you scroll past it
 * — so it never sits washed-out over light content.
 */
export function SiteHeader({ glass = false }: { glass?: boolean }) {
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    if (!glass) return;
    const onScroll = () => setAtTop(window.scrollY < 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [glass]);

  const frosted = glass && atTop && !open;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-white/10 transition-colors duration-300",
        frosted ? "glass-dark" : "brand-gradient"
      )}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="Parklyckan – till startsidan" className="drop-shadow-sm">
          <Image
            src={images.logoSilver}
            alt="Parklyckan"
            width={220}
            height={48}
            className="h-10 w-auto sm:h-14"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Huvudmeny">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href="/#formular"
            className={cn(
              buttonVariants({ variant: "accent", size: "sm" }),
              "sm:h-10 sm:px-5"
            )}
          >
            Anmäl intresse
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Stäng meny" : "Öppna meny"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid size-11 place-items-center rounded-md text-primary-foreground/90 transition-colors hover:bg-white/10 md:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobilmeny"
          className="border-t border-white/10 md:hidden"
        >
          <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center text-base text-primary-foreground/90 transition-colors hover:text-primary-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
