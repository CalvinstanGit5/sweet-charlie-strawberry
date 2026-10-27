import config from "@/config/site";
import { Container } from "./ui";
import { WhatsApp } from "./Icons";
import { buildGeneralWhatsAppLink } from "@/lib/whatsapp";

export default function WhatsAppCTA() {
  const waHref = buildGeneralWhatsAppLink();

  return (
    <section className="pb-4">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-berry-600 to-berry-700 px-6 py-12 text-center shadow-lift sm:px-12">
          <div
            className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
            aria-hidden="true"
          />
          <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
            <WhatsApp className="h-8 w-8" />
          </span>
          <h2 className="mt-5 text-2xl text-white sm:text-3xl">Prefer to chat?</h2>
          <p className="mx-auto mt-3 max-w-md text-cream-100/90">
            Message us on WhatsApp and we&apos;ll help you plan your order — from a
            few patio plants to a full commercial block.
          </p>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-semibold text-white shadow-lift transition hover:bg-[#1eb855] active:scale-[0.98]"
          >
            <WhatsApp className="h-5 w-5" />
            WhatsApp {config.whatsappDisplay}
          </a>
          <p className="mt-4 text-xs text-cream-100/70">
            Opens WhatsApp with a message ready to send — nothing is sent until you
            press send.
          </p>
        </div>
      </Container>
    </section>
  );
}
