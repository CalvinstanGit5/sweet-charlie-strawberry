import config from "@/config/site";
import { DELIVERY_HUBS, deliveryConfig } from "@/config/delivery";
import { Container, SectionHeading } from "./ui";
import { HelpCircle, MapPin, Package, Store, Truck } from "./Icons";

const options = [
  {
    icon: Store,
    title: "Collection",
    body: `Collect your plants from us in ${config.collectionLocation}.`,
  },
  {
    icon: Truck,
    title: "Delivery",
    body: `We deliver in our buggy at R${deliveryConfig.ratePerKm}/km one-way from Benoni.`,
  },
  {
    icon: Package,
    title: "Courier",
    body: "Nationwide courier for larger or further orders — cost confirmed on quote.",
  },
  {
    icon: HelpCircle,
    title: "Not sure",
    body: "Let us recommend the best option for your order.",
  },
];

const featuredHubs = DELIVERY_HUBS.filter(
  (h) => h.id !== "benoni" && h.id !== "other" && h.oneWayKm > 0,
).slice(0, 12);

export default function Delivery() {
  return (
    <section id="delivery" className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Delivery & collection"
          title="Getting your plants"
          subtitle="Choose collection, delivery or courier. Delivery is priced from Benoni at a simple per-km rate for our buggy."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {options.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-cream-200 bg-white p-6 text-center shadow-sm transition hover:shadow-soft"
            >
              <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf-50 text-leaf-600">
                <Icon className="h-7 w-7" />
              </span>
              <h3 className="mt-4 text-lg text-berry-800">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-bark-500">{body}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-leaf-100 bg-leaf-50 p-6">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-leaf-800">
                Collection: {config.collectionLocation}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-bark-500">
                Delivered by: <strong>our buggy</strong>
                {" · "}
                Rate: <strong>R{deliveryConfig.ratePerKm}/km one-way</strong>
                {" · "}
                Min fee: R{deliveryConfig.minimumFee}
              </p>
              <p className="mt-1 text-xs text-bark-400">{deliveryConfig.rateNote}</p>
            </div>
          </div>

          <div className="mt-5 border-t border-leaf-200/80 pt-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-leaf-700">
              Preloaded delivery hubs
            </p>
            <ul className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredHubs.map((h) => {
                const chargeableKm = deliveryConfig.roundTrip
                  ? h.oneWayKm * 2
                  : h.oneWayKm;
                const cost = Math.max(
                  deliveryConfig.minimumFee,
                  Math.round(chargeableKm * deliveryConfig.ratePerKm),
                );
                return (
                  <li
                    key={h.id}
                    className="flex items-baseline justify-between gap-2 text-sm text-bark-600"
                  >
                    <span>
                      {h.label}
                      <span className="text-bark-400"> · {h.oneWayKm} km</span>
                    </span>
                    <span className="font-semibold text-berry-700">R{cost}</span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-xs text-bark-400">
              Costs are one-way estimates from Benoni. Final amount confirmed on your quote.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
