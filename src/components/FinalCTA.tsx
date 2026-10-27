import { Container, LinkButton } from "./ui";
import { Leaf, Strawberry } from "./Icons";
import { buildGeneralWhatsAppLink } from "@/lib/whatsapp";

export default function FinalCTA() {
  const waHref = buildGeneralWhatsAppLink();

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2.2rem] border border-cream-200 bg-gradient-to-br from-cream-100 via-cream-50 to-leaf-50 px-6 py-16 text-center shadow-soft sm:px-12">
          <span
            className="pointer-events-none absolute -left-6 top-6 text-berry-200/60"
            aria-hidden="true"
          >
            <Strawberry className="h-16 w-16 animate-float" />
          </span>
          <span
            className="pointer-events-none absolute -right-4 bottom-4 text-leaf-300/50"
            aria-hidden="true"
          >
            <Leaf className="h-20 w-20" />
          </span>

          <span className="inline-flex items-center gap-2 rounded-full border border-berry-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-berry-600">
            <Strawberry className="h-4 w-4" />
            Let&apos;s get planting
          </span>
          <h2 className="mt-5 text-4xl leading-tight sm:text-5xl">Ready to Grow?</h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-bark-500">
            Tell us how many plants you need and we&apos;ll prepare an estimate.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LinkButton href="#enquiry" size="lg" className="w-full sm:w-auto">
              Get My Quote
            </LinkButton>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-semibold text-white shadow-soft transition hover:bg-[#1eb855] active:scale-[0.98] sm:w-auto"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
