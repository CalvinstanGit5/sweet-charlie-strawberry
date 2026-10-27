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
  unitPrice: config.defaultUnitPrice,
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
    form.quantity >= 1 && form.unitPrice > 0
      ? calculateQuote({
          quantity: form.quantity,
          unitPrice: form.unitPrice,
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
    if (!form.unitPrice || form.unitPrice <= 0)
      e.unitPrice = "Enter the price per plant (R).";
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
    await new Promise((r) => setTimeout(r, 450)); // brief processing feedback

    const quote = calculateQuote({
      quantity: form.quantity,
      unitPrice: form.unitPrice,
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
        priceUnder100: config.priceUnder100,
        price100To999: config.price100To999,
        priceBulk: config.priceBulk,
        midTierMin: config.midTierMin,
        bulkThreshold: config.bulkThreshold,
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

  return (
    <section id="enquiry" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Quote creator"
          title="Build a quote"
          subtitle="Set quantity and price per plant, add delivery if needed, then download a PDF or send over WhatsApp."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.45fr_1fr] lg:gap-10">
          {/* ---------------- Form ---------------- */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Name */}
              <div>
                <Label htmlFor="f-name" required>Customer name</Label>
                <input
                  id="f-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Your name"
                  className={`${inputBase} ${errors.name ? errClass : okClass}`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "err-name" : undefined}
                />
                <FieldError id="err-name" msg={errors.name} />
              </div>
              {/* Business */}
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
              {/* WhatsApp */}
              <div>
                <Label htmlFor="f-whatsapp" required>WhatsApp number</Label>
                <input
                  id="f-whatsapp"
                  type="tel"
                  value={form.whatsapp}
                  onChange={(e) => set("whatsapp", e.target.value)}
                  placeholder="072 574 2448"
                  className={`${inputBase} ${errors.whatsapp ? errClass : okClass}`}
                  aria-invalid={!!errors.whatsapp}
                  aria-describedby={errors.whatsapp ? "err-whatsapp" : undefined}
                />
                <p className="mt-1 text-xs text-bark-400">Use the +27 format, e.g. 072 574 2448.</p>
                <FieldError id="err-whatsapp" msg={errors.whatsapp} />
              </div>
              {/* Email */}
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
              {/* Location */}
              <div className="sm:col-span-2">
                <Label htmlFor="f-location" required>Location / town</Label>
                <input
                  id="f-location"
                  type="text"
                  value={form.location}
                  onChange={(e) => set("location", e.target.value)}
                  placeholder="e.g. Benoni, Gauteng"
                  className={`${inputBase} ${errors.location ? errClass : okClass}`}
                  aria-invalid={!!errors.location}
                  aria-describedby={errors.location ? "err-location" : undefined}
                />
                <FieldError id="err-location" msg={errors.location} />
              </div>
            </div>

            {/* Quantity + unit price (quote creator) */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="f-quantity" required>Number of plants</Label>
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
                  aria-invalid={!!errors.quantity}
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
                        aria-pressed={active}
                        className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                          active
                            ? "border-berry-600 bg-berry-600 text-white"
                            : "border-cream-300 bg-white text-bark-500 hover:border-berry-300 hover:text-berry-600"
                        }`}
                      >
                        {q === 1000 ? "1000+" : q}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <Label htmlFor="f-unitprice" required>Price per plant (R)</Label>
                <input
                  id="f-unitprice"
                  type="number"
                  min={0.01}
                  step={0.01}
                  inputMode="decimal"
                  value={form.unitPrice > 0 ? form.unitPrice : ""}
                  onChange={(e) => {
                    const n = e.target.valueAsNumber;
                    set("unitPrice", Number.isNaN(n) ? 0 : n);
                  }}
                  placeholder={`e.g. ${config.defaultUnitPrice}`}
                  className={`${inputBase} ${errors.unitPrice ? errClass : okClass}`}
                  aria-invalid={!!errors.unitPrice}
                />
                <FieldError id="err-unitprice" msg={errors.unitPrice} />
                <p className="mt-2 text-xs text-bark-400">
                  Change this for each quote — estimate updates live.
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[10, 12, 15, 18, 20, 25].map((p) => {
                    const active = form.unitPrice === p;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => set("unitPrice", p)}
                        aria-pressed={active}
                        className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                          active
                            ? "border-berry-600 bg-berry-600 text-white"
                            : "border-cream-300 bg-white text-bark-500 hover:border-berry-300 hover:text-berry-600"
                        }`}
                      >
                        R{p}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Order type */}
              <div>
                <Label htmlFor="f-ordertype">Order type</Label>
                <Select
                  id="f-ordertype"
                  value={form.orderType}
                  onChange={(v) => set("orderType", v as OrderType)}
                  options={ORDER_TYPES}
                />
              </div>
              {/* Delivery */}
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

            {/* Delivery hub (when Delivery selected) */}
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
                      aria-invalid={!!errors.deliveryHub}
                    >
                      <option value="">Select a hub…</option>
                      {DELIVERY_HUBS.filter((h) => h.id !== "benoni").map((h) => (
                        <option key={h.id} value={h.id}>
                          {h.label}
                          {h.oneWayKm > 0 ? ` · ~${h.oneWayKm} km` : ""}
                          {h.area ? ` (${h.area})` : ""}
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
                      inputMode="numeric"
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

                <p className="text-xs leading-relaxed text-bark-500">
                  Delivery charged at{" "}
                  <strong className="text-bark-600">
                    R{deliveryConfig.ratePerKm}/km one-way
                  </strong>{" "}
                  (AA-style rate for {deliveryConfig.vehicleLabel}). Min fee{" "}
                  {formatMoney(deliveryConfig.minimumFee)}.
                </p>
              </div>
            )}

            {/* Delivery address */}
            <div>
              <Label htmlFor="f-address">Delivery location / address</Label>
              <input
                id="f-address"
                type="text"
                value={form.deliveryAddress}
                onChange={(e) => set("deliveryAddress", e.target.value)}
                placeholder="Street address or suburb (if delivery or courier)"
                className={`${inputBase} ${okClass}`}
              />
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="f-notes">Additional requirements / notes</Label>
              <textarea
                id="f-notes"
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                rows={3}
                placeholder="Anything else we should know?"
                className={`${inputBase} ${okClass} resize-y`}
              />
            </div>

            {/* Bulk discussion */}
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

          {/* ---------------- Live estimate ---------------- */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-3xl border border-cream-200 bg-cream-50 shadow-soft">
              <div className="relative h-28">
                <img
                  src={images.fruitPrimary.src}
                  alt={images.fruitPrimary.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-berry-900/40 to-transparent" />
                <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-berry-700">
                  <Strawberry className="h-4 w-4" />
                  Live estimate
                </span>
              </div>

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
                    value={
                      liveQuote
                        ? liveQuote.isBulk || liveQuote.isContactUs
                          ? "To be confirmed"
                          : `${formatMoney(liveQuote.pricePerPlant ?? 0)} each`
                        : "—"
                    }
                  />
                  <Line
                    label="Plant subtotal"
                    value={
                      liveQuote
                        ? liveQuote.isBulk
                          ? "Special bulk enquiry"
                          : liveQuote.isContactUs
                            ? "Contact us"
                            : formatMoney(liveQuote.subtotal ?? 0)
                        : "Enter a quantity"
                    }
                  />
                  {liveQuote?.delivery.applicable && liveQuote.delivery.cost !== null && (
                    <>
                      <Line
                        label="Delivery"
                        value={formatMoney(liveQuote.delivery.cost)}
                      />
                      <p className="pb-1 text-[11px] leading-snug text-bark-400">
                        {liveQuote.delivery.label}
                      </p>
                    </>
                  )}
                  <Line
                    label="Estimated total"
                    value={
                      liveQuote
                        ? liveQuote.isBulk
                          ? "Special bulk enquiry"
                          : liveQuote.isContactUs
                            ? "Contact us"
                            : liveQuote.grandTotal !== null
                              ? formatMoney(liveQuote.grandTotal)
                              : formatMoney(liveQuote.subtotal ?? 0)
                        : "—"
                    }
                    strong
                  />
                </dl>

                <div className="mt-4 flex items-start gap-2 rounded-xl bg-white p-3 text-xs leading-relaxed text-bark-400">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-leaf-500" />
                  {config.deliveryMessage}
                </div>
                <p className="mt-3 text-xs text-bark-400">
                  Indicative only. Submit the form to generate a downloadable quote.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* ---------------- Result ---------------- */}
        {result && (
          <div className="mt-10">
            <QuoteResult enquiry={result} onReset={handleReset} />
          </div>
        )}
      </Container>
    </section>
  );
}

/* ---------------- Small helpers ---------------- */

function Label({
  children,
  required,
  htmlFor,
}: {
  children: ReactNode;
  required?: boolean;
  htmlFor?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-bark-600">
      {children}
      {required && <span className="ml-0.5 text-berry-500">*</span>}
    </label>
  );
}

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} className="mt-1 text-xs font-medium text-berry-600">
      {msg}
    </p>
  );
}

function Line({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <dt className="text-sm text-bark-400">{label}</dt>
      <dd className={`text-sm ${strong ? "font-bold text-berry-700" : "font-medium text-bark-600"}`}>
        {value}
      </dd>
    </div>
  );
}

function Select({
  id,
  value,
  onChange,
  options,
}: {
  id?: string;
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
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-bark-400" />
    </div>
  );
}
