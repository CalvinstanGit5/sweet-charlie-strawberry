import config from "@/config/site";
import { Container } from "./ui";

const updated = "27 October 2026";

export default function Privacy() {
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
          <h1 className="mt-2 font-serif text-3xl text-berry-900 sm:text-4xl">Privacy Notice</h1>
          <p className="mt-2 text-sm text-bark-400">Last updated: {updated}</p>

          <div className="mt-10 space-y-8 text-sm leading-relaxed text-bark-600">
            <section>
              <h2 className="text-lg font-semibold text-berry-800">1. Introduction</h2>
              <p className="mt-2">
                {config.businessName} (\u201cwe\u201d, \u201cus\u201d) respects your privacy. This notice explains what
                personal information we collect when you use our website or contact us, and how we use
                it. We process information in line with the Protection of Personal Information Act 4 of
                2013 (POPIA) where it applies.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-berry-800">2. What we collect</h2>
              <p className="mt-2">When you request an estimate or message us, we may collect:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Name and optional business name</li>
                <li>WhatsApp number and optional email</li>
                <li>Location / town and delivery address</li>
                <li>Order details (quantity, order type, notes)</li>
                <li>
                  Technical data stored on your device only (e.g. saved enquiries in browser local
                  storage \u2014 not sent to our servers automatically)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-berry-800">3. Why we use it</h2>
              <p className="mt-2">We use your information to:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Prepare and discuss quotes and orders</li>
                <li>Arrange collection or delivery</li>
                <li>Communicate via WhatsApp or email about your enquiry</li>
                <li>Keep basic records of sales and enquiries</li>
              </ul>
              <p className="mt-3">
                We do <strong>not</strong> sell your personal information. We do not use it for
                unrelated marketing lists without a lawful basis or your consent.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-berry-800">4. Sharing</h2>
              <p className="mt-2">
                We may share details only as needed to fulfil your order (for example a courier, if
                used) or if required by law. WhatsApp is provided by Meta; messages you send via
                WhatsApp are subject to their terms and privacy policy.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-berry-800">5. Storage &amp; security</h2>
              <p className="mt-2">
                Enquiry forms on this site calculate estimates in your browser. Saved enquiries on the
                \u201cSaved enquiries\u201d page are stored only on that device (local storage). When you contact
                us on WhatsApp or email, we retain what we need to complete and support your order. We
                take reasonable steps to keep information secure.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-berry-800">6. Your rights</h2>
              <p className="mt-2">
                Subject to POPIA, you may request access to the personal information we hold about you,
                or ask us to correct or delete it where appropriate. Contact us on WhatsApp{" "}
                {config.whatsappDisplay}.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-berry-800">7. Cookies</h2>
              <p className="mt-2">
                This site is a simple brochure and quote tool. We do not run third-party advertising
                trackers. Your browser may store local data for saved enquiries on this device only.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-berry-800">8. Contact</h2>
              <p className="mt-2">
                {config.businessName} \u00b7 {config.collectionLocation}
                <br />
                WhatsApp: {config.whatsappDisplay}
              </p>
              <p className="mt-3">
                See also our{" "}
                <a href="#/terms" className="font-semibold text-berry-700 underline">
                  Terms &amp; Conditions
                </a>
                .
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
