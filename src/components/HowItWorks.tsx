import { Container, SectionHeading } from "./ui";
import { FileText, MessageCircle, Sparkles, WhatsApp } from "./Icons";

const steps = [
  {
    icon: MessageCircle,
    title: "Tell us how many plants you need",
    body: "Use the quick quote form — it takes less than a minute to complete.",
  },
  {
    icon: FileText,
    title: "Get an instant estimate",
    body: "See an indicative price right away, then download your quote as a PDF.",
  },
  {
    icon: WhatsApp,
    title: "WhatsApp us to confirm & order",
    body: "Send it through and we'll confirm availability, delivery and final pricing.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Three simple steps"
          subtitle="No complicated checkout. Just a quick enquiry and a friendly conversation on WhatsApp."
        />

        <div className="relative mt-14">
          {/* Connecting line (desktop) */}
          <div
            className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-leaf-200 via-leaf-300 to-leaf-200 lg:block"
            aria-hidden="true"
          />

          <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
            {steps.map((step, i) => (
              <div key={step.title} className="relative text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center">
                  <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white text-leaf-600 shadow-soft ring-1 ring-leaf-100">
                    <step.icon className="h-8 w-8" />
                    <span className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-berry-600 text-sm font-bold text-white shadow-soft">
                      {i + 1}
                    </span>
                  </span>
                </div>
                <h3 className="mt-5 text-xl text-berry-800">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-bark-500">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 flex items-center justify-center gap-2 text-center text-sm text-bark-400">
          <Sparkles className="h-4 w-4 text-berry-400" />
          Fast, friendly and obligation-free — quotes are estimates, not invoices.
        </p>
      </Container>
    </section>
  );
}
