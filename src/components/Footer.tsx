import config from "@/config/site";
import { images } from "@/config/images";
import { Container } from "./ui";
import { MapPin, Strawberry, WhatsApp } from "./Icons";
import { buildGeneralWhatsAppLink } from "@/lib/whatsapp";

const explore = [
  { label: "About Sweet Charlie", href: "#about" },
  { label: "How it works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "Bulk orders", href: "#bulk" },
  { label: "Delivery", href: "#delivery" },
  { label: "Get a quote", href: "#enquiry" },
];

export default function Footer() {
  const waHref = buildGeneralWhatsAppLink();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-cream-100 pt-16">
      <Container>
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <img
                src={images.icon.src}
                alt=""
                className="h-9 w-9 rounded-lg object-cover"
                loading="lazy"
              />
              <span className="font-serif text-lg font-semibold text-berry-800">
                {config.businessName}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-bark-500">
              Healthy Sweet Charlie strawberry plants for home gardens, growers,
              farms, nurseries and bulk planting across South Africa.
            </p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1eb855]"
            >
              <WhatsApp className="h-4 w-4" />
              {config.whatsappDisplay}
            </a>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-bark-400">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5">
              {explore.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-bark-500 transition hover:text-berry-600"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-bark-400">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-bark-500">
              <li className="flex items-center gap-2">
                <WhatsApp className="h-4 w-4 text-leaf-600" />
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="hover:text-berry-600">
                  {config.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-leaf-600" />
                Collection: {config.collectionLocation}
              </li>
              <li className="flex items-center gap-2">
                <Strawberry className="h-4 w-4 text-berry-500" />
                {config.productName}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-cream-300 py-6 text-xs text-bark-400 sm:flex-row">
          <p>
            © {year} {config.businessName}. Estimates are non-binding; prices and
            availability subject to change.
          </p>
          <a href="#/enquiries" className="underline decoration-dotted hover:text-berry-600">
            Saved enquiries (this device only)
          </a>
        </div>
      </Container>
    </footer>
  );
}
