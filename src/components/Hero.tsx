import config from "@/config/site";
import { images } from "@/config/images";
import { Container, LinkButton, WhatsAppButton } from "./ui";
import { Leaf, Strawberry, WhatsApp } from "./Icons";
import { buildGeneralWhatsAppLink } from "@/lib/whatsapp";

export default function Hero() {
  const waHref = buildGeneralWhatsAppLink();

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Soft summery background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-leaf-50 via-cream-50 to-cream-50" />
      <div
        className="absolute -left-24 -top-24 -z-10 h-72 w-72 rounded-full bg-berry-100/50 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -right-16 top-40 -z-10 h-80 w-80 rounded-full bg-leaf-100/50 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative grid items-center gap-12 pb-16 pt-28 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24 lg:pt-36">
        {/* Copy */}
        <div className="animate-fade-up text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-leaf-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-leaf-700 shadow-sm">
            <Leaf className="h-4 w-4" />
            Fresh plants · Now planting
          </span>

          <h1 className="mt-6 text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.1rem]">
            Grow Your Own{" "}
            <span className="relative text-berry-600">
              Sweet Summer
              <svg
                className="absolute -bottom-2 left-0 h-3 w-full text-berry-300"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 8c40-6 80-6 120-2s60 2 76-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-6 font-serif text-2xl text-leaf-700 sm:text-3xl">
            {config.productName}
          </p>
          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-bark-500 lg:mx-0">
            Healthy strawberry plants for gardens, growers and bulk planting.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <LinkButton href="#enquiry" size="lg" className="w-full sm:w-auto">
              Get a Quote
            </LinkButton>
            <WhatsAppButton href={waHref} size="lg" className="w-full sm:w-auto" />
          </div>

          <p className="mt-7 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm font-medium text-bark-400 lg:justify-start">
            <span>Home gardens</span>
            <span className="text-berry-300">•</span>
            <span>Growers</span>
            <span className="text-berry-300">•</span>
            <span>Farms</span>
            <span className="text-berry-300">•</span>
            <span>Nurseries</span>
            <span className="text-berry-300">•</span>
            <span>Bulk orders</span>
          </p>
        </div>

        {/* Image */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.2rem] bg-leaf-100 shadow-lift ring-1 ring-black/5">
            <img
              src={images.hero.src}
              alt={images.hero.alt}
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-berry-900/10 to-transparent" />
          </div>

          {/* Floating price badge — reflects config (null = contact us) */}
          <div className="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lift ring-1 ring-black/5 sm:-left-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-berry-50 text-berry-600">
              <Strawberry className="h-6 w-6" />
            </span>
            <div>
              <p className="text-lg font-bold leading-none text-berry-700">
                {config.price100To999 != null
                  ? `${config.currency}${config.price100To999} each`
                  : "Get a quote"}
              </p>
              <p className="mt-1 text-xs font-medium text-bark-400">
                {config.price100To999 != null
                  ? `${config.midTierMin}+ plants`
                  : "Pricing on request"}
              </p>
            </div>
          </div>

          {/* Floating WhatsApp chip */}
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute -right-3 top-6 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white shadow-lift transition hover:bg-[#1eb855] sm:-right-5"
          >
            <WhatsApp className="h-4 w-4" />
            Chat with us
          </a>
        </div>
      </Container>
    </section>
  );
}
