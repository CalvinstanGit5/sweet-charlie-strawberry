import { Container, SectionHeading } from "./ui";
import { Leaf, Package, Sparkles, Users } from "./Icons";

const features = [
  {
    icon: Sparkles,
    title: "Sweet, sun-ripened flavour",
    body: "Firm, aromatic berries with the sweetness that has made Sweet Charlie a firm favourite.",
  },
  {
    icon: Leaf,
    title: "Grows almost anywhere",
    body: "Happy in pots, raised beds, open ground, tunnels and greenhouses across the country.",
  },
  {
    icon: Users,
    title: "Home gardens to farms",
    body: "A versatile variety that scales from a few patio plants through to commercial blocks.",
  },
  {
    icon: Package,
    title: "Bulk & resale ready",
    body: "Popular with nurseries and resellers — we supply healthy plants in volume.",
  },
];

export default function WhyGrow() {
  return (
    <section id="why" className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Why Sweet Charlie"
          title="A rewarding plant, whatever your scale"
          subtitle="From a sunny balcony to a working farm, Sweet Charlie rewards a little care with a generous harvest of sweet summer fruit."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group rounded-2xl border border-cream-200 bg-cream-50 p-6 transition hover:-translate-y-1 hover:border-leaf-200 hover:shadow-soft"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-berry-50 text-berry-600 transition group-hover:bg-berry-100">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg text-berry-800">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-bark-500">{body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
