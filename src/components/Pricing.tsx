import config from "@/config/site";
import { Container, LinkButton, SectionHeading } from "./ui";
import { Check, Leaf } from "./Icons";

export default function Pricing() {
  const { currency, priceTiers } = config;
  const featuredIndex = priceTiers.findIndex((t) => t.minQty === 100);

  return (
    <section id="pricing" className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Simple pricing"
          title="Clear, locked pricing"
          subtitle="Volume discounts apply automatically. Estimates are non-binding until we confirm availability on WhatsApp. Delivery priced separately."
        />

        <div className="mt-14 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {priceTiers.map((tier, i) => {
            const featured = i === featuredIndex;
            return (
              <div
                key={tier.label}
                className={`relative flex flex-col rounded-3xl p-6 transition ${
                  featured
                    ? "bg-berry-600 text-white shadow-lift ring-1 ring-berry-600 lg:-mt-2 lg:mb-2"
                    : "border border-cream-200 bg-cream-50 text-bark-600"
                }`}
              >
                {featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-leaf-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-soft">
                    Popular
                  </span>
                )}
                <p
                  className={`text-xs font-bold uppercase tracking-[0.12em] ${
                    featured ? "text-berry-100" : "text-leaf-600"
                  }`}
                >
                  {tier.label}
                </p>
                <p
                  className={`mt-3 text-3xl font-bold ${
                    featured ? "text-white" : "text-berry-600"
                  }`}
                >
                  {currency}
                  {tier.pricePerPlant}
                  <span
                    className={`text-base font-semibold ${
                      featured ? "text-berry-100" : "text-bark-400"
                    }`}
                  >
                    {" "}each
                  </span>
                </p>
                <ul className="mt-5 space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <Check
                      className={`h-4 w-4 shrink-0 ${
                        featured ? "text-leaf-200" : "text-leaf-500"
                      }`}
                    />
                    <span className={featured ? "text-cream-50" : "text-bark-600"}>
                      {currency}
                      {tier.pricePerPlant} per plant
                    </span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check
                      className={`h-4 w-4 shrink-0 ${
                        featured ? "text-leaf-200" : "text-leaf-500"
                      }`}
                    />
                    <span className={featured ? "text-cream-50" : "text-bark-600"}>
                      Healthy, well-rooted plants
                    </span>
                  </li>
                </ul>
                <div className="mt-6 pt-1">
                  <LinkButton
                    href="#enquiry"
                    variant={featured ? "onDark" : "primary"}
                    className="w-full"
                  >
                    Get estimate
                  </LinkButton>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-bark-400">
          <Leaf className="h-4 w-4 text-leaf-500" />
          Non-binding estimates. Availability confirmed on WhatsApp. T&Cs apply.
        </p>
      </Container>
    </section>
  );
}
