import config from "@/config/site";
import {
  calculateDeliveryCost,
  findHub,
  deliveryConfig,
} from "@/config/delivery";
import type {
  DeliveryPreference,
  DeliveryQuote,
  EnquiryInput,
  QuoteResult,
} from "./types";

export type QuoteOptions = {
  quantity: number;
  /**
   * Manual unit price (R per plant). When set, this drives the quote
   * regardless of tier defaults — for the pre-launch quote creator.
   */
  unitPrice?: number | null;
  delivery?: DeliveryPreference;
  deliveryHub?: string;
  customOneWayKm?: number;
};

function resolveDelivery(
  preference: DeliveryPreference = "Collection",
  hubId = "",
  customOneWayKm = 0,
): DeliveryQuote {
  const hub = hubId ? findHub(hubId) : undefined;
  const oneWay =
    preference === "Delivery"
      ? hubId === "other"
        ? Math.max(0, Math.floor(customOneWayKm || 0))
        : hub?.oneWayKm ?? 0
      : 0;

  const calc = calculateDeliveryCost(preference, oneWay);
  const hubLabel =
    preference === "Collection"
      ? config.collectionLocation
      : hubId === "other"
        ? "Custom address"
        : hub?.label ?? "—";

  return {
    applicable: calc.applicable,
    hubId: hubId || "",
    hubLabel,
    oneWayKm: calc.oneWayKm,
    chargeableKm: calc.chargeableKm,
    ratePerKm: calc.ratePerKm,
    cost: calc.cost,
    label: calc.label,
  };
}

function resolveTier(qty: number): QuoteResult["tier"] {
  if (qty >= config.bulkThreshold) return "bulk";
  if (qty >= config.midTierMin) return "100-999";
  return "under-100";
}

/**
 * Calculate a non-binding estimate.
 *
 * Prefer manual unitPrice (quote creator). If omitted, fall back to
 * the tier price in site.ts (null → contact us / special bulk).
 */
export function calculateQuote(opts: QuoteOptions | number): QuoteResult {
  const options: QuoteOptions =
    typeof opts === "number" ? { quantity: opts } : opts;

  const qty = Math.max(0, Math.floor(Number(options.quantity) || 0));
  const deliveryNote = config.deliveryMessage;
  const delivery = resolveDelivery(
    options.delivery,
    options.deliveryHub,
    options.customOneWayKm,
  );
  const tier = resolveTier(qty);

  const withDelivery = (
    base: Omit<QuoteResult, "delivery" | "grandTotal" | "deliveryNote">,
  ): QuoteResult => {
    const plant = base.subtotal;
    const del = delivery.cost;
    const grandTotal =
      plant !== null && del !== null
        ? plant + del
        : plant !== null && !delivery.applicable
          ? plant
          : null;

    return {
      ...base,
      delivery,
      grandTotal,
      deliveryNote,
    };
  };

  // Manual unit price wins (quote creator mode)
  const manual =
    options.unitPrice !== undefined && options.unitPrice !== null
      ? Number(options.unitPrice)
      : null;

  if (manual !== null && Number.isFinite(manual) && manual > 0) {
    const price = Math.round(manual * 100) / 100;
    return withDelivery({
      tier,
      quantity: qty,
      pricePerPlant: price,
      subtotal: Math.round(qty * price * 100) / 100,
      isBulk: tier === "bulk",
      isContactUs: false,
      priceLabel: `${config.currency}${price} each`,
    });
  }

  // Fall back to config tiers
  const tierPrice =
    tier === "bulk"
      ? config.priceBulk
      : tier === "100-999"
        ? config.price100To999
        : config.priceUnder100;

  if (tierPrice === null || tierPrice === undefined) {
    return withDelivery({
      tier,
      quantity: qty,
      pricePerPlant: null,
      subtotal: null,
      isBulk: tier === "bulk",
      isContactUs: tier !== "bulk",
      priceLabel:
        tier === "bulk"
          ? "Special bulk enquiry"
          : "Contact us for current pricing",
    });
  }

  return withDelivery({
    tier,
    quantity: qty,
    pricePerPlant: tierPrice,
    subtotal: qty * tierPrice,
    isBulk: tier === "bulk",
    isContactUs: false,
    priceLabel: `${config.currency}${tierPrice} each`,
  });
}

/**
 * Format a number as currency, e.g. 1500 -> "R1 500".
 * Uses a normal space so totals never show as dashes in the UI or PDF.
 */
export function formatMoney(amount: number, currency = config.currency): string {
  const rounded = Math.round(amount);
  const grouped = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${currency}${grouped}`;
}

/** Lightweight live-preview text for the form as the user types. */
export function previewEstimate(
  quantity: number,
  unitPrice?: number | null,
  delivery?: DeliveryPreference,
  deliveryHub?: string,
  customOneWayKm?: number,
): string {
  const qty = Math.floor(Number(quantity) || 0);
  if (qty <= 0) return "";
  const q = calculateQuote({
    quantity: qty,
    unitPrice,
    delivery,
    deliveryHub,
    customOneWayKm,
  });
  if (q.isBulk && q.subtotal === null) return "Special bulk enquiry";
  if (q.isContactUs) return "Contact us for current pricing";

  const parts: string[] = [];
  if (q.subtotal !== null) parts.push(`Plants: ${formatMoney(q.subtotal)}`);
  if (q.delivery.applicable && q.delivery.cost !== null) {
    parts.push(`Delivery: ${formatMoney(q.delivery.cost)}`);
  }
  if (q.grandTotal !== null) {
    parts.push(`Total: ${formatMoney(q.grandTotal)}`);
  } else if (parts.length === 0) {
    return q.priceLabel;
  }
  return parts.join(" · ");
}

/** Sanitise/validate a WhatsApp number into international digits for the link. */
export function normaliseWhatsApp(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits.slice(1);
  if (digits.startsWith("0")) return `27${digits.slice(1)}`;
  return digits;
}

export { deliveryConfig };
export type { EnquiryInput };
