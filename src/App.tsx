import { useEffect, useState } from "react";
import { images } from "@/config/images";
import { Container, WhatsAppButton } from "./components/ui";
import { buildGeneralWhatsAppLink } from "@/lib/whatsapp";

import Hero from "./components/Hero";
import About from "./components/About";
import WhyGrow from "./components/WhyGrow";
import HowItWorks from "./components/HowItWorks";
import Pricing from "./components/Pricing";
import BulkOrders from "./components/BulkOrders";
import Delivery from "./components/Delivery";
import EnquiryForm from "./components/EnquiryForm";
import WhatsAppCTA from "./components/WhatsAppCTA";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import Enquiries from "./components/Enquiries";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";

/* ---- Minimal hash router: "/enquiries" shows the local enquiries view ---- */
function useHashRoute() {
  const [hash, setHash] = useState(() =>
    typeof window !== "undefined" ? window.location.hash : "",
  );
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return hash;
}

function SiteHeader() {
  const waHref = buildGeneralWhatsAppLink();
  return (
    <header className="sticky top-0 z-50 border-b border-cream-200/70 bg-cream-50/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <img
            src={images.icon.src}
            alt=""
            className="h-8 w-8 rounded-lg object-cover"
            loading="lazy"
          />
          <span className="font-serif text-base font-semibold text-berry-800">
            Sweet Charlie
          </span>
        </a>
        <div className="flex items-center gap-2">
          <a
            href="#enquiry"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-berry-700 transition hover:bg-berry-50 sm:inline-block"
          >
            Get a quote
          </a>
          <WhatsAppButton href={waHref} label="WhatsApp" />
        </div>
      </Container>
    </header>
  );
}

function Landing() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <WhyGrow />
        <HowItWorks />
        <Pricing />
        <BulkOrders />
        <Delivery />
        <EnquiryForm />
        <WhatsAppCTA />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const hash = useHashRoute();

  useEffect(() => {
    if (hash === "" || hash === "#/" || hash === "#/enquiries" || hash === "#/terms" || hash === "#/privacy") {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  if (hash === "#/enquiries") {
    return <Enquiries />;
  }
  if (hash === "#/terms") {
    return <Terms />;
  }
  if (hash === "#/privacy") {
    return <Privacy />;
  }

  return <Landing />;
}
