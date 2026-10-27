import config, { priceForQuantity } from "@/config/site";
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

/**
 * Calculate a non-binding estimate from locked price tiers.
 * Customers cannot set their own unit price.
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

  const resolved = priceForQuantity(qty);
  const pricePerPlant = resolved?.pricePerPlant ?? 0;
  const tier = resolved?.tierLabel ?? "—";
  const subtotal = Math.round(qty * pricePerPlant * 100) / 100;

  const plant = qty >= 1 ? subtotal : 0;
  const del = delivery.cost;
  const grandTotal =
    qty >= 1 && del !== null
      ? plant + del
      : qty >= 1 && !delivery.applicable
        ? plant
        : qty >= 1
          ? plant
          : null;

  return {
    tier,
    quantity: qty,
    pricePerPlant,
    subtotal: plant,
    delivery,
    grandTotal,
    isBulk: false,
    isContactUs: false,
    priceLabel: `${config.currency}${pricePerPlant} each`,
    deliveryNote,
  };
}

export function formatMoney(amount: number, currency = config.currency): string {
  const rounded = Math.round(amount);
  const grouped = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${currency}${grouped}`;
}

export function previewEstimate(
  quantity: number,
  delivery?: DeliveryPreference,
  deliveryHub?: string,
  customOneWayKm?: number,
): string {
  const qty = Math.floor(Number(quantity) || 0);
  if (qty <= 0) return "";
  const q = calculateQuote({
    quantity: qty,
    delivery,
    deliveryHub,
    customOneWayKm,
  });

  const parts: string[] = [];
  if (q.subtotal !== null)
    parts.push(`Plants: ${formatMoney(q.subtotal)} (${q.priceLabel})`);
  if (q.delivery.applicable && q.delivery.cost !== null) {
    parts.push(`Delivery: ${formatMoney(q.delivery.cost)}`);
  }
  if (q.grandTotal !== null) {
    parts.push(`Total: ${formatMoney(q.grandTotal)}`);
  }
  return parts.join(" · ");
}

export function normaliseWhatsApp(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits.slice(1);
  if (digits.startsWith("0")) return `27${digits.slice(1)}`;
  return digits;
}

export { deliveryConfig };
export type { EnquiryInput };
