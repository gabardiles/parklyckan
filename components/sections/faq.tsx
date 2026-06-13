import { faqs } from "@/data/site";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 bg-background">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            Vanliga frågor
          </p>
          <h2 className="mt-3 font-display text-3xl font-light leading-tight sm:text-5xl">
            Bra att veta om Parklyckan
          </h2>
        </div>

        <div className="mt-10 divide-y divide-border border-y border-border">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg leading-snug marker:hidden">
                <span>{faq.question}</span>
                <span
                  aria-hidden
                  className="grid size-7 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
