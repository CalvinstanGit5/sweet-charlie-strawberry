import { useState, type FormEvent, type ReactNode } from "react";
import config from "@/config/site";
import { images } from "@/config/images";
import { DELIVERY_HUBS, deliveryConfig } from "@/config/delivery";
import { Button, Container, SectionHeading } from "./ui";
import { ChevronDown, MapPin, Strawberry } from "./Icons";
import { calculateQuote, formatMoney } from "@/lib/quote";
import { getNextQuoteRef, saveEnquiry } from "@/lib/storage";
import {
  DELIVERY_PREFERENCES,
  ORDER_TYPES,
  type DeliveryPreference,
  type EnquiryInput,
  type OrderType,
  type StoredEnquiry,
} from "@/lib/types";
import QuoteResult from "./QuoteResult";

const QUICK_QTY = [50, 100, 250, 500, 1000];

const initialForm: EnquiryInput = {
  name: "",
  business: "",
  whatsapp: "",
  email: "",
  location: "",
  quantity: 100,
  orderType: "Home garden",
  delivery: "Collection",
  deliveryHub: "",
  deliveryAddress: "",
  customOneWayKm: 0,
  notes: "",
  bulkDiscussion: false,
};

type Errors = Partial<Record<keyof EnquiryInput, string>>;

const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-bark-600 placeholder:text-bark-300 transition outline-none focus:ring-4";
const okClass = "border-cream-300 focus:border-leaf-400 focus:ring-leaf-100";
const errClass = "border-berry-400 focus:border-berry-400 focus:ring-berry-100";

export default function EnquiryForm() {
  const [form, setForm] = useState<EnquiryInput>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<StoredEnquiry | null>(null);

  const set = <K extends keyof EnquiryInput>(key: K, value: EnquiryInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const liveQuote =
    form.quantity >= 1
      ? calculateQuote({
          quantity: form.quantity,
          delivery: form.delivery,
          deliveryHub: form.deliveryHub,
          customOneWayKm: form.customOneWayKm,
        })
      : null;

  function validate(): Errors {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    const digits = form.whatsapp.replace(/\D/g, "");
    if (!form.whatsapp.trim()) e.whatsapp = "Please enter your WhatsApp number.";
    else if (digits.length < 9) e.whatsapp = "Enter a valid number, e.g. 072 574 2448.";
    if (!form.location.trim()) e.location = "Please enter your town or location.";
    if (!form.quantity || form.quantity < 1)
      e.quantity = "Enter the number of plants (minimum 1).";
    if (form.delivery === "Delivery" && !form.deliveryHub)
      e.deliveryHub = "Please select a delivery hub or area.";
    if (
      form.delivery === "Delivery" &&
      form.deliveryHub === "other" &&
      (!form.customOneWayKm || form.customOneWayKm < 1)
    )
      e.customOneWayKm = "Enter approximate one-way km from Benoni.";
    return e;
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 450));

    const quote = calculateQuote({
      quantity: form.quantity,
      delivery: form.delivery,
      deliveryHub: form.deliveryHub,
      customOneWayKm: form.customOneWayKm,
    });
    const enquiry: StoredEnquiry = {
      ...form,
      ref: getNextQuoteRef(),
      createdAt: new Date().toISOString(),
      config: {
        productName: config.productName,
        currency: config.currency,
        quotePrefix: config.quotePrefix,
      },
      quote,
      status: "New",
    };
    saveEnquiry(enquiry);
    setResult(enquiry);
    setSubmitting(false);

    requestAnimationFrame(() => {
      document
        .getElementById("quote-result")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function handleReset() {
    setResult(null);
    setForm(initialForm);
    setErrors({});
    document
      .getElementById("enquiry")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (result) {
    return (
      <section id="quote-result" className="scroll-mt-20 bg-white py-20 sm:py-24">
        <Container>
          <QuoteResult enquiry={result} onReset={handleReset} />
        </Container>
      </section>
    );
  }

  return (
    <section id="enquiry" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Get a quote"
          title="Request your estimate"
          subtitle="Enter your details and quantity. Prices are fixed by volume. Download your estimate or send it on WhatsApp to confirm availability."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.45fr_1fr] lg:gap-10">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="f-name" required>
                  Your name
                </Label>
                <input
                  id="f-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Your name"
                  className={`${inputBase} ${errors.name ? errClass : okClass}`}
                />
                <FieldError id="err-name" msg={errors.name} />
              </div>
              <div>
                <Label htmlFor="f-business">Business / farm name</Label>
                <input
                  id="f-business"
                  type="text"
                  value={form.business}
                  onChange={(e) => set("business", e.target.value)}
                  placeholder="Optional"
                  className={`${inputBase} ${okClass}`}
                />
              </div>
              <div>
                <Label htmlFor="f-whatsapp" required>
                  WhatsApp number
                </Label>
                <input
                  id="f-whatsapp"
                  type="tel"
                  value={form.whatsapp}
                  onChange={(e) => set("whatsapp", e.target.value)}
                  placeholder="072 574 2448"
                  className={`${inputBase} ${errors.whatsapp ? errClass : okClass}`}
                />
                <FieldError id="err-whatsapp" msg={errors.whatsapp} />
              </div>
              <div>
                <Label htmlFor="f-email">Email</Label>
                <input
                  id="f-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="Optional"
                  className={`${inputBase} ${okClass}`}
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="f-location" required>
                  Location / town
                </Label>
                <input
                  id="f-location"
                  type="text"
                  value={form.location}
                  onChange={(e) => set("location", e.target.value)}
                  placeholder="e.g. Benoni, Gauteng"
                  className={`${inputBase} ${errors.location ? errClass : okClass}`}
                />
                <FieldError id="err-location" msg={errors.location} />
              </div>
            </div>

            <div>
              <Label htmlFor="f-quantity" required>
                Number of plants
              </Label>
              <input
                id="f-quantity"
                type="number"
                min={1}
                inputMode="numeric"
                value={form.quantity > 0 ? form.quantity : ""}
                onChange={(e) => {
                  const n = e.target.valueAsNumber;
                  set("quantity", Number.isNaN(n) ? 0 : Math.floor(n));
                }}
                placeholder="e.g. 250"
                className={`${inputBase} ${errors.quantity ? errClass : okClass}`}
              />
              <FieldError id="err-quantity" msg={errors.quantity} />
              <div className="mt-3 flex flex-wrap gap-2">
                {QUICK_QTY.map((q) => {
                  const active = form.quantity === q;
                  return (
                    <button
                      key={q}
                      type="button"
                      onClick={() => set("quantity", q)}
                      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                        active
                          ? "border-berry-600 bg-berry-600 text-white"
                          : "border-cream-300 bg-white text-bark-500 hover:border-berry-300"
                      }`}
                    >
                      {q === 1000 ? "1000+" : q}
                    </button>
                  );
                })}
              </div>
              {liveQuote && form.quantity >= 1 && (
                <p className="mt-3 text-sm text-bark-500">
                  Locked rate:{" "}
                  <strong className="text-berry-700">{liveQuote.priceLabel}</strong>
                  {" · "}Plant total:{" "}
                  <strong className="text-berry-700">{formatMoney(liveQuote.subtotal)}</strong>
                </p>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="f-ordertype">Order type</Label>
                <Select
                  id="f-ordertype"
                  value={form.orderType}
                  onChange={(v) => set("orderType", v as OrderType)}
                  options={ORDER_TYPES}
                />
              </div>
              <div>
                <Label htmlFor="f-delivery">Delivery preference</Label>
                <Select
                  id="f-delivery"
                  value={form.delivery}
                  onChange={(v) => {
                    const pref = v as DeliveryPreference;
                    set("delivery", pref);
                    if (pref !== "Delivery") {
                      set("deliveryHub", "");
                      set("customOneWayKm", 0);
                    }
                  }}
                  options={DELIVERY_PREFERENCES}
                />
              </div>
            </div>

            {form.delivery === "Delivery" && (
              <div className="space-y-4 rounded-2xl border border-leaf-100 bg-leaf-50/60 p-4">
                <div>
                  <Label htmlFor="f-hub" required>
                    Delivery hub / area
                  </Label>
                  <div className="relative">
                    <select
                      id="f-hub"
                      value={form.deliveryHub}
                      onChange={(e) => set("deliveryHub", e.target.value)}
                      className={`${inputBase} ${errors.deliveryHub ? errClass : okClass} appearance-none pr-10`}
                    >
                      <option value="">Select a hub…</option>
                      {DELIVERY_HUBS.filter((h) => h.id !== "benoni").map((h) => (
                        <option key={h.id} value={h.id}>
                          {h.label}
                          {h.oneWayKm > 0 ? ` · ~${h.oneWayKm} km` : ""}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-bark-400" />
                  </div>
                  <FieldError id="err-hub" msg={errors.deliveryHub} />
                </div>
                {form.deliveryHub === "other" && (
                  <div>
                    <Label htmlFor="f-custom-km" required>
                      One-way km from Benoni
                    </Label>
                    <input
                      id="f-custom-km"
                      type="number"
                      min={1}
                      value={form.customOneWayKm > 0 ? form.customOneWayKm : ""}
                      onChange={(e) => {
                        const n = e.target.valueAsNumber;
                        set("customOneWayKm", Number.isNaN(n) ? 0 : Math.floor(n));
                      }}
                      placeholder="e.g. 55"
                      className={`${inputBase} ${errors.customOneWayKm ? errClass : okClass}`}
                    />
                    <FieldError id="err-km" msg={errors.customOneWayKm} />
                  </div>
                )}
                <p className="text-xs text-bark-500">
                  Delivery at R{deliveryConfig.ratePerKm}/km one-way. Min{" "}
                  {formatMoney(deliveryConfig.minimumFee)}.
                </p>
              </div>
            )}

            <div>
              <Label htmlFor="f-address">Delivery location / address</Label>
              <input
                id="f-address"
                type="text"
                value={form.deliveryAddress}
                onChange={(e) => set("deliveryAddress", e.target.value)}
                placeholder="Street or suburb if delivery"
                className={`${inputBase} ${okClass}`}
              />
            </div>

            <div>
              <Label htmlFor="f-notes">Additional notes</Label>
              <textarea
                id="f-notes"
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                rows={3}
                className={`${inputBase} ${okClass} resize-y`}
              />
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-cream-200 bg-cream-50 p-4">
              <input
                type="checkbox"
                checked={form.bulkDiscussion}
                onChange={(e) => set("bulkDiscussion", e.target.checked)}
                className="mt-0.5 h-5 w-5 rounded border-cream-300 accent-berry-600"
              />
              <span className="text-sm text-bark-600">I would like to discuss a bulk order.</span>
            </label>

            <Button type="submit" size="lg" disabled={submitting} className="w-full">
              {submitting ? "Preparing your estimate…" : "Calculate My Estimate"}
            </Button>
          </form>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-3xl border border-cream-200 bg-cream-50 shadow-soft">
              <div className="p-6">
                <h3 className="text-lg text-berry-800">{config.productName}</h3>
                <dl className="mt-4 space-y-1">
                  <Line
                    label="Quantity"
                    value={
                      form.quantity >= 1 ? form.quantity.toLocaleString("en-ZA") : "—"
                    }
                  />
                  <Line
                    label="Plant price"
                    value={liveQuote ? `${formatMoney(liveQuote.pricePerPlant)} each` : "—"}
                  />
                  <Line
                    label="Plant subtotal"
                    value={liveQuote ? formatMoney(liveQuote.subtotal) : "Enter a quantity"}
                  />
                  {liveQuote?.delivery.applicable && liveQuote.delivery.cost !== null && (
                    <Line label="Delivery" value={formatMoney(liveQuote.delivery.cost)} />
                  )}
                  <Line
                    label="Estimated total"
                    value={
                      liveQuote
                        ? liveQuote.grandTotal !== null
                          ? formatMoney(liveQuote.grandTotal)
                          : formatMoney(liveQuote.subtotal)
                        : "—"
                    }
                    strong
                  />
                </dl>
                <p className="mt-4 text-xs text-bark-400">
                  Non-binding estimate. Availability confirmed on WhatsApp. T&Cs apply.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}

function Label({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-bark-600">
      {children}
      {required && <span className="text-berry-600"> *</span>}
    </label>
  );
}

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} className="mt-1 text-xs text-berry-600">
      {msg}
    </p>
  );
}

function Select({
  id,
  value,
  onChange,
  options,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputBase} ${okClass} appearance-none pr-10`}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-bark-400" />
    </div>
  );
}

function Line({
  label,
  value,
  strong,
}: {
  label: string;
  value: ReactNode;
  strong?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-cream-200 py-2 last:border-0">
      <dt className="text-sm text-bark-400">{label}</dt>
      <dd className={`text-right text-sm ${strong ? "font-bold text-berry-700" : "font-medium text-bark-600"}`}>
        {value}
      </dd>
    </div>
  );
}
