import config from "@/config/site";
import { Container, LinkButton, SectionHeading } from "./ui";
import { Check, Leaf } from "./Icons";

function tierPriceLabel(price: number | null, currency: string): string {
  if (price === null || price === undefined) return "Contact us";
  return `${currency}${price} each`;
}

export default function Pricing() {
  const {
    currency,
    priceUnder100,
    price100To999,
    priceBulk,
    midTierMin,
    bulkThreshold,
  } = config;

  const underHas = priceUnder100 !== null && priceUnder100 !== undefined;
  const midHas = price100To999 !== null && price100To999 !== undefined;
  const bulkHas = priceBulk !== null && priceBulk !== undefined;

  const tiers = [
    {
      key: "under-100",
      label: `Under ${midTierMin}`,
      tag: "Small garden lots",
      price: tierPriceLabel(priceUnder100, currency),
      note: underHas
        ? `For orders of fewer than ${midTierMin} plants.`
        : "Contact us for current pricing on smaller lots.",
      featured: false,
      features: underHas
        ? [`${currency}${priceUnder100} per plant`, "Home garden quantities"]
        : ["Pricing on request", "Home garden quantities"],
    },
    {
      key: "100-999",
      label: `${midTierMin.toLocaleString("en-ZA")} – ${(bulkThreshold - 1).toLocaleString("en-ZA")} plants`,
      tag: "Most popular",
      price: midHas
        ? tierPriceLabel(price100To999, currency)
        : "Contact us",
      note: midHas
        ? "Ideal for keen home gardeners and small growers."
        : "Contact us for current volume pricing.",
      featured: true,
      features: midHas
        ? [
            `${currency}${price100To999} per plant`,
            "Growers & small farms",
            "Healthy, well-rooted plants",
          ]
        : [
            "Pricing on request",
            "Growers & small farms",
            "Healthy, well-rooted plants",
          ],
    },
    {
      key: "bulk",
      label: `${bulkThreshold.toLocaleString("en-ZA")}+ plants`,
      tag: "Wholesale",
      price: bulkHas
        ? tierPriceLabel(priceBulk, currency)
        : "Special bulk quotation",
      note: bulkHas
        ? "Volume rate for farms, nurseries and resellers."
        : "Custom pricing for farms, nurseries and resellers.",
      featured: false,
      features: bulkHas
        ? [
            `${currency}${priceBulk} per plant`,
            "Nurseries & resellers",
            "Volume supply",
          ]
        : ["Custom bulk pricing", "Nurseries & resellers", "Volume supply"],
    },
  ];

  return (
    <section id="pricing" className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Simple pricing"
          title="Clear, honest pricing"
          subtitle="Indicative pricing at a glance. Delivery and courier costs are always confirmed based on your location and order."
        />

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.key}
              className={`relative flex flex-col rounded-3xl p-7 transition ${
                tier.featured
                  ? "bg-berry-600 text-white shadow-lift ring-1 ring-berry-600 lg:-mt-3 lg:mb-3"
                  : "border border-cream-200 bg-cream-50 text-bark-600"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-leaf-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-soft">
                  {tier.tag}
                </span>
              )}
              {!tier.featured && (
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-leaf-600">
                  {tier.tag}
                </span>
              )}

              <h3
                className={`mt-3 text-2xl ${tier.featured ? "text-white" : "text-berry-800"}`}
              >
                {tier.label}
              </h3>

              <p
                className={`mt-4 text-3xl font-bold ${tier.featured ? "text-white" : "text-berry-600"}`}
              >
                {tier.price}
              </p>
              <p
                className={`mt-2 text-sm ${tier.featured ? "text-berry-50/90" : "text-bark-400"}`}
              >
                {tier.note}
              </p>

              <ul className="mt-6 space-y-2.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check
                      className={`h-4 w-4 shrink-0 ${tier.featured ? "text-leaf-200" : "text-leaf-500"}`}
                    />
                    <span className={tier.featured ? "text-cream-50" : "text-bark-600"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 pt-2">
                <LinkButton
                  href="#enquiry"
                  variant={tier.featured ? "onDark" : "primary"}
                  className="w-full"
                >
                  Request a Quote
                </LinkButton>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-bark-400">
          <Leaf className="h-4 w-4 text-leaf-500" />
          Prices are indicative and subject to change. Delivery/courier to be confirmed.
        </p>
      </Container>
    </section>
  );
}
