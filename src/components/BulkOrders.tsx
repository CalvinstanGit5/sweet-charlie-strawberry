import config from "@/config/site";
import { images } from "@/config/images";
import { Container, LinkButton } from "./ui";
import { CheckCircle, Package } from "./Icons";
import MascotPeek from "./MascotPeek";
import { buildGeneralWhatsAppLink } from "@/lib/whatsapp";

const points = [
  "1000+ plants — volume rate R10 each",
  "Farms, nurseries & resellers",
  "Greenhouse and tunnel production",
];

export default function BulkOrders() {
  const waHref = buildGeneralWhatsAppLink();

  return (
    <section id="bulk" className="bg-leaf-800 py-20 text-cream-50 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-leaf-700/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-leaf-100">
              <Package className="h-4 w-4" />
              Bulk orders
            </span>
            <h2 className="mt-5 text-3xl leading-tight text-cream-50 sm:text-4xl">
              Planting in volume?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-cream-200/90">
              We supply farms, nurseries, resellers and greenhouse growers. Orders of 1000+
              plants are R10 each. WhatsApp us for large mixed or staged deliveries.
            </p>

            <ul className="mt-7 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-cream-100">
                  <CheckCircle className="h-5 w-5 shrink-0 text-leaf-300" />
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white shadow-lift transition hover:bg-[#1eb855]"
              >
                Request a bulk quote
              </a>
              <LinkButton href="#enquiry" variant="onDark" size="lg">
                Use the quote form
              </LinkButton>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[5/4] overflow-hidden rounded-[2rem] bg-leaf-900 shadow-lift ring-1 ring-white/10">
              <img
                src={images.bulk.src}
                alt={images.bulk.alt}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute -bottom-5 left-6 rounded-2xl bg-cream-50 px-5 py-3 shadow-lift">
              <p className="text-2xl font-bold text-berry-600">R10 each</p>
              <p className="text-xs font-medium text-bark-400">1000+ plants volume rate</p>
            </div>
            <MascotPeek pose="proud" corner="br" size="lg" />
          </div>
        </div>
      </Container>
    </section>
  );
}
