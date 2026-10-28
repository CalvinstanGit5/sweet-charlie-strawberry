import type { ReactNode } from "react";
import config from "@/config/site";
import { Button } from "./ui";
import { Download, FileText, MapPin, Refresh, WhatsApp } from "./Icons";
import { formatMoney } from "@/lib/quote";
import { generateQuotePDF } from "@/lib/pdf";
import { buildQuoteWhatsAppLink } from "@/lib/whatsapp";
import type { StoredEnquiry } from "@/lib/types";

const DISCLAIMER =
  "This is a non-binding estimate only. Final pricing, plant availability and delivery costs will be confirmed by us before any order is accepted. Prices are subject to change.";

function Row({ label, value, strong }: { label: string; value: ReactNode; strong?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-cream-200 py-2.5 last:border-0">
      <dt className="text-sm text-bark-400">{label}</dt>
      <dd
        className={`text-right text-sm ${strong ? "font-bold text-berry-700" : "font-medium text-bark-600"}`}
      >
        {value}
      </dd>
    </div>
  );
}

export default function QuoteResult({
  enquiry,
  onReset,
}: {
  enquiry: StoredEnquiry;
  onReset: () => void;
}) {
  const { quote } = enquiry;
  const delivery = quote.delivery ?? {
    applicable: false,
    hubId: "",
    hubLabel: "—",
    oneWayKm: 0,
    chargeableKm: 0,
    ratePerKm: 6.5,
    cost: null,
    label: "Delivery cost to be confirmed",
  };
  const dateStr = new Date(enquiry.createdAt).toLocaleString("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const totalLabel =
    quote.grandTotal != null
      ? formatMoney(quote.grandTotal)
      : formatMoney(quote.subtotal ?? 0);

  return (
    <div
      id="quote-result"
      className="scroll-mt-24 overflow-hidden rounded-3xl border border-leaf-200 bg-white shadow-lift"
    >
      <div className="relative bg-berry-600 px-6 py-6 text-white sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
              <FileText className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-berry-100">
                Quote / Estimate
              </p>
              <p className="text-lg font-bold">{enquiry.ref}</p>
            </div>
          </div>
          <p className="text-sm text-berry-100">{dateStr}</p>
        </div>
        <p className="mt-4 rounded-lg bg-white/10 px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide">
          Estimate — not an invoice
        </p>
      </div>

      <div className="px-6 py-6 sm:px-8">
        <dl className="grid gap-x-10 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Row label="Customer" value={enquiry.name} strong />
          </div>
          {enquiry.business && <Row label="Business / farm" value={enquiry.business} />}
          <Row label="Location" value={enquiry.location} />
          <Row label="Order type" value={enquiry.orderType} />
          <Row
            label="Quantity"
            value={`${enquiry.quantity.toLocaleString("en-ZA")} plants`}
            strong
          />
          <Row label="Product" value={config.productName} />
          <Row
            label="Plant price"
            value={`${formatMoney(quote.pricePerPlant ?? 0)} each`}
          />
          <Row label="Plant subtotal" value={formatMoney(quote.subtotal ?? 0)} />
          <Row label="Delivery / collection" value={enquiry.delivery} />
          {delivery.applicable && delivery.cost !== null ? (
            <>
              <Row label="Delivery hub" value={delivery.hubLabel} />
              <Row label="Delivery estimate" value={formatMoney(delivery.cost)} />
            </>
          ) : (
            <Row
              label="Delivery estimate"
              value={
                enquiry.delivery === "Collection"
                  ? "No charge"
                  : enquiry.delivery === "Delivery"
                    ? "Enquire — confirm hub/distance on WhatsApp"
                    : "To be confirmed"
              }
            />
          )}
          <div className="sm:col-span-2">
            <Row label="Estimated total" value={totalLabel} strong />
          </div>
        </dl>

        {delivery.applicable && delivery.cost !== null && (
          <p className="mt-2 text-xs text-bark-400">{delivery.label}</p>
        )}

        <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-cream-100 p-4 text-sm text-bark-500">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-leaf-600" />
          <p>{config.deliveryMessage}</p>
        </div>

        {enquiry.notes.trim() && (
          <div className="mt-4 rounded-xl border border-cream-200 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-bark-400">
              Additional requirements
            </p>
            <p className="mt-1 whitespace-pre-line text-sm text-bark-600">{enquiry.notes}</p>
          </div>
        )}

        <p className="mt-5 rounded-xl border border-berry-100 bg-berry-50/60 p-4 text-xs leading-relaxed text-bark-500">
          {DISCLAIMER}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button onClick={() => generateQuotePDF(enquiry)} size="lg" className="flex-1 sm:flex-none">
            <Download className="h-[1.1em] w-[1.1em]" />
            Download Quote (PDF)
          </Button>
          <a
            href={buildQuoteWhatsAppLink(enquiry)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-semibold text-white shadow-soft transition hover:bg-[#1eb855] active:scale-[0.98] sm:flex-none"
          >
            <WhatsApp className="h-[1.15em] w-[1.15em]" />
            WhatsApp This Enquiry
          </a>
          <Button onClick={onReset} variant="secondary" size="lg" className="flex-1 sm:flex-none">
            <Refresh className="h-[1.1em] w-[1.1em]" />
            Start Another Enquiry
          </Button>
        </div>
      </div>
    </div>
  );
}
