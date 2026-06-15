import { facts } from "@/data/site";

export function KeyFacts() {
  return (
    <section className="border-b border-border bg-card">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-10 sm:px-6 md:grid-cols-3 lg:grid-cols-6">
        {facts.map((fact, i) => (
          <div
            key={fact.label}
            data-reveal
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {fact.label}
            </dt>
            <dd className="mt-2 font-display text-lg leading-snug">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
