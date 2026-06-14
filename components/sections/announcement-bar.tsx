import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { availability } from "@/data/site";

export function AnnouncementBar() {
  return (
    <Link
      href="#lagenheter"
      className="block bg-[#0a1322] text-white/90 transition-colors hover:text-white"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2 text-center text-xs font-medium tracking-wide sm:text-sm">
        <span className="hidden size-1.5 animate-pulse rounded-full bg-accent sm:inline-block" />
        <span>
          Nästan slutsålt — endast {availability.remainingCount} av{" "}
          {availability.total} lägenheter kvar
        </span>
        <span className="hidden items-center gap-1 underline underline-offset-4 sm:inline-flex">
          Se lediga lägenheter <ArrowRight className="size-3.5" />
        </span>
      </div>
    </Link>
  );
}
