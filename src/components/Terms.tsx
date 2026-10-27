import config from "@/config/site";
import { Container } from "./ui";

const updated = "27 October 2026";

export default function Terms() {
  return (
    <div className="min-h-screen bg-cream-50">
      <header className="border-b border-cream-200 bg-white">
        <Container className="flex h-16 items-center justify-between">
          <a href="#/" className="font-serif text-lg font-semibold text-berry-800">
            {config.businessName}
          </a>
          <a href="#/" className="text-sm font-semibold text-berry-700 hover:underline">
            \u2190 Back to site
          </a>
        </Container>
      </header>

      <main className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-leaf-600">Legal</p>
          <h1 className="mt-2 font-serif text-3xl text-berry-900 sm:text-4xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-2 text-sm text-bark-400">Last updated: {updated}</p>

          <div className="mt-10 space-y-8 text-sm leading-relaxed text-bark-600">
            <section>
              <h2 className="text-lg font-semibold text-berry-800">1. Who we are</h2>
              <p className="mt-2">
                These terms apply to the sale of {config.productName} by {" "}
                {config.businessName} (\u201cwe\u201d, \u201cus\u201d), based in {config.collectionLocation}. Contact: WhatsApp{" "}
                {config.whatsappDisplay}.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-berry-800">2. Estimates are non-binding</h2>
              <p className="mt-2">
                Prices and totals shown on this website, in PDFs, or in WhatsApp messages are{" "}
                <strong>estimates only</strong>. They are not a final offer or invoice. An order is only
                accepted when we confirm plant availability and the final amount on WhatsApp (or in
                writing). Prices and stock may change until that confirmation.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-berry-800">3. Pricing</h2>
              <p className="mt-2">
                Plant prices are fixed by quantity band as published on our website. Delivery and
                courier costs are estimated separately and confirmed before payment. We may correct
                obvious pricing errors before accepting an order.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-berry-800">
                4. Living plants \u2014 non-returnable &amp; non-refundable
              </h2>
              <p className="mt-2">
                Strawberry plants are living, perishable products. Except as set out below:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  Plants are <strong>non-returnable</strong> and <strong>non-refundable</strong> once
                  collected by you or dispatched for delivery.
                </li>
                <li>
                  We do not refund for post-delivery care, weather, soil, pests, watering, or failure
                  of plants to establish.
                </li>
                <li>
                  If we supplied the wrong variety or quantity, or plants were clearly unhealthy at the
                  time of handover, you must notify us within <strong>48 hours</strong> of collection or
                  delivery, with clear photos. Where the claim is valid, we may replace plants or refund
                  at our discretion.
                </li>
                <li>
                  At collection, please check plants before leaving. For delivery, risk passes on
                  handover at the address you provided.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-berry-800">5. Payment &amp; invoices</h2>
              <p className="mt-2">
                Payment is by EFT (or another method we agree). Banking details are provided on the{" "}
                <strong>invoice</strong> after we confirm your order \u2014 not on website estimates or quote
                PDFs. Use the quote or invoice reference as your payment reference. Payment constitutes
                acceptance of these terms for that order.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-berry-800">6. Delivery &amp; collection</h2>
              <p className="mt-2">
                Collection is from {config.collectionLocation} by arrangement. Delivery estimates use an
                AA-style operating rate from Benoni and are indicative until we confirm distance and
                final fee. Courier options, where used, are confirmed separately. You are responsible for
                providing a correct delivery address and being available to receive plants.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-berry-800">7. Availability</h2>
              <p className="mt-2">
                We grow and supply plants subject to stock. We may limit quantities or decline an order
                if plants are unavailable. If we cannot fulfil after payment, we will refund the amount
                paid for unfulfilled plants.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-berry-800">8. Liability</h2>
              <p className="mt-2">
                To the fullest extent permitted by South African law, our liability is limited to the
                price paid for the plants concerned. We are not liable for indirect or consequential loss
                (including crop loss after delivery). Nothing in these terms excludes liability that
                cannot be excluded by law.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-berry-800">9. Privacy</h2>
              <p className="mt-2">
                How we handle personal information is described in our{" "}
                <a href="#/privacy" className="font-semibold text-berry-700 underline">
                  Privacy Notice
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-berry-800">10. Changes &amp; contact</h2>
              <p className="mt-2">
                We may update these terms from time to time; the version on this website applies to new
                orders. Questions: WhatsApp {config.whatsappDisplay}.
              </p>
            </section>
          </div>

          <p className="mt-12 text-center text-sm text-bark-400">
            <a href="#/" className="font-semibold text-berry-700 hover:underline">
              \u2190 Back to Sweet Charlie
            </a>
          </p>
        </Container>
      </main>
    </div>
  );
}
