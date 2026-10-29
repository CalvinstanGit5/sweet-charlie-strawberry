import { images } from "@/config/images";
import { Container, SectionHeading } from "./ui";
import { CheckCircle, Leaf } from "./Icons";
import MascotPeek from "./MascotPeek";

const highlights = [
  "Sweet, aromatic fruit",
  "Crops through the warm season",
  "Happy in pots, beds, tunnels & greenhouses",
  "Ideal for bulk planting",
];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-last lg:order-first">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-leaf-100 shadow-soft ring-1 ring-black/5">
              <img
                src={images.plantPrimary.src}
                alt={images.plantPrimary.alt}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 w-40 overflow-hidden rounded-2xl border-4 border-cream-50 shadow-lift sm:-right-6 sm:w-48">
              <div className="aspect-square">
                <img
                  src={images.fruitSecondary.src}
                  alt={images.fruitSecondary.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <span className="absolute -left-3 top-6 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-leaf-700 shadow-soft ring-1 ring-black/5">
              <Leaf className="h-4 w-4" />
              Well-rooted runners
            </span>
            <MascotPeek pose="gardener" corner="br" size="lg" />
          </div>

          <div>
            <SectionHeading
              align="left"
              eyebrow="About the variety"
              title="Meet Sweet Charlie"
              subtitle="A well-loved strawberry variety grown by home gardeners and commercial growers across South Africa."
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-bark-500">
              <p>
                Sweet Charlie is prized for its sweet, aromatic fruit and its
                reliable cropping through the warmer months — the classic taste
                of a South African summer.
              </p>
              <p>
                Our plants are supplied as healthy, well-rooted runners, ready to
                settle into gardens, raised beds, tunnels or greenhouses. Whether
                you're filling a few pots on a patio or planting out a
                commercial block, Sweet Charlie is a forgiving, productive choice.
              </p>
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm font-medium text-bark-600">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-leaf-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
