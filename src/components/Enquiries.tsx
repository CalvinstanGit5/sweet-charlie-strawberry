import { useCallback, useEffect, useState } from "react";
import config from "@/config/site";
import { Container } from "./ui";
import { Button } from "./ui";
import { ArrowLeft, Download, MapPin, Trash, WhatsApp } from "./Icons";
import { formatMoney } from "@/lib/quote";
import { generateQuotePDF } from "@/lib/pdf";
import { buildQuoteWhatsAppLink } from "@/lib/whatsapp";
import {
  clearEnquiries,
  deleteEnquiry,
  loadEnquiries,
  updateEnquiryStatus,
} from "@/lib/storage";
import type { EnquiryStatus, StoredEnquiry } from "@/lib/types";

const STATUSES: EnquiryStatus[] = [
  "New",
  "Contacted",
  "Quoted",
  "Confirmed",
  "Completed",
];

const statusColor: Record<EnquiryStatus, string> = {
  New: "bg-berry-50 text-berry-700",
  Contacted: "bg-amber-50 text-amber-700",
  Quoted: "bg-leaf-50 text-leaf-700",
  Confirmed: "bg-leaf-100 text-leaf-800",
  Completed: "bg-bark-300/30 text-bark-600",
};

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState<StoredEnquiry[]>([]);

  const refresh = useCallback(() => setEnquiries(loadEnquiries()), []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="border-b border-cream-200 bg-white">
        <Container className="flex h-16 items-center justify-between">
          <a href="#/" className="flex items-center gap-2 text-sm font-semibold text-berry-700 hover:text-berry-800">
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </a>
          <span className="font-serif text-base font-semibold text-berry-800">
            {config.businessName}
          </span>
        </Container>
      </header>

      <Container className="py-12">
        <h1 className="text-3xl text-berry-800 sm:text-4xl">Saved Enquiries</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-bark-500">
          A simple, private list of enquiries created on this device. It is stored
          only in this browser and does not sync across devices or back up online —
          this is <strong>not</strong> a CRM.
        </p>

        {enquiries.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-cream-300 bg-white p-12 text-center">
            <p className="text-bark-400">No enquiries saved on this device yet.</p>
            <a
              href="#/"
              className="mt-4 inline-block rounded-full bg-berry-600 px-6 py-3 font-semibold text-white transition hover:bg-berry-700"
            >
              Create a quote
            </a>
          </div>
        ) : (
          <>
            <div className="mt-8 flex items-center justify-between">
              <p className="text-sm text-bark-400">
                {enquiries.length} {enquiries.length === 1 ? "enquiry" : "enquiries"}
              </p>
              <button
                onClick={() => {
                  if (confirm("Delete all saved enquiries on this device?")) {
                    clearEnquiries();
                    refresh();
                  }
                }}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-bark-400 hover:text-berry-600"
              >
                <Trash className="h-4 w-4" />
                Clear all
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {enquiries.map((e) => (
                <article
                  key={e.ref}
                  className="rounded-2xl border border-cream-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-berry-700">{e.ref}</p>
                      <p className="text-sm text-bark-500">
                        {new Date(e.createdAt).toLocaleString("en-ZA", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[e.status]}`}
                    >
                      {e.status}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-x-8 gap-y-1 sm:grid-cols-2">
                    <Info label="Customer" value={e.name} />
                    {e.business && <Info label="Business" value={e.business} />}
                    <Info label="WhatsApp" value={e.whatsapp} />
                    <Info label="Location" value={e.location} />
                    <Info label="Quantity" value={`${e.quantity.toLocaleString("en-ZA")} plants`} />
                    <Info label="Order type" value={e.orderType} />
                    <Info label="Delivery" value={e.delivery} />
                    <Info
                      label="Estimate"
                      value={
                        e.quote.isBulk
                          ? "Special bulk enquiry"
                          : e.quote.isContactUs
                            ? "To be confirmed"
                            : formatMoney(e.quote.subtotal ?? 0)
                      }
                    />
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-cream-200 pt-4">
                    <label className="sr-only" htmlFor={`status-${e.ref}`}>
                      Status for {e.ref}
                    </label>
                    <select
                      id={`status-${e.ref}`}
                      value={e.status}
                      onChange={(ev) => {
                        updateEnquiryStatus(e.ref, ev.target.value as EnquiryStatus);
                        refresh();
                      }}
                      className="rounded-lg border border-cream-300 bg-white px-3 py-2 text-sm text-bark-600 outline-none focus:border-leaf-400"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>

                    <Button
                      variant="secondary"
                      onClick={() => generateQuotePDF(e)}
                      className="px-4 py-2 text-sm"
                    >
                      <Download className="h-4 w-4" />
                      PDF
                    </Button>
                    <a
                      href={buildQuoteWhatsAppLink(e)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1eb855]"
                    >
                      <WhatsApp className="h-4 w-4" />
                      WhatsApp
                    </a>
                    <button
                      onClick={() => {
                        deleteEnquiry(e.ref);
                        refresh();
                      }}
                      className="ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-bark-400 hover:text-berry-600"
                      aria-label={`Delete ${e.ref}`}
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-8 flex items-center gap-2 text-xs text-bark-400">
              <MapPin className="h-4 w-4 text-leaf-500" />
              Collection point: {config.collectionLocation} · WhatsApp {config.whatsappDisplay}
            </p>
          </>
        )}
      </Container>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 py-0.5 text-sm sm:block">
      <span className="text-bark-400">{label}: </span>
      <span className="font-medium text-bark-600">{value}</span>
    </div>
  );
}
