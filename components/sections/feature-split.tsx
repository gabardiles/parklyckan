import Image from "next/image";
import { cn } from "@/lib/utils";

export function FeatureSplit({
  eyebrow,
  title,
  children,
  image,
  imageAlt,
  reverse = false,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  image: string;
  imageAlt: string;
  reverse?: boolean;
}) {
  return (
    <div data-reveal className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden rounded-lg",
          reverse && "md:order-2"
        )}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className={cn(reverse && "md:order-1")}>
        {eyebrow && (
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-accent">
            {eyebrow}
          </p>
        )}
        <h3 className="font-display text-2xl font-light leading-tight sm:text-4xl">
          {title}
        </h3>
        <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
          {children}
        </div>
      </div>
    </div>
  );
}
