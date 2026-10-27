import type { SiteConfig } from "@/config/site";

export const ORDER_TYPES = [
  "Home garden",
  "Small grower",
  "Farm",
  "Nursery / reseller",
  "Commercial / bulk",
] as const;

export const DELIVERY_PREFERENCES = [
  "Collection",
  "Delivery",
  "Courier",
  "Not sure",
] as const;

export type OrderType = (typeof ORDER_TYPES)[number];
export type DeliveryPreference = (typeof DELIVERY_PREFERENCES)[number];

export type EnquiryStatus =
  | "New"
  | "Contacted"
  | "Quoted"
  | "Confirmed"
  | "Completed";

/** Raw form data captured from the enquiry form. */
export type EnquiryInput = {
  name: string;
  business: string;
  whatsapp: string;
  email: string;
  location: string;
  quantity: number;
  /**
   * Manual price per plant (R). Used by the quote creator —
   * overrides tier defaults so each quote can be priced freely.
   */
  unitPrice: number;
  orderType: OrderType;
  delivery: DeliveryPreference;
  /** Preloaded hub id, e.g. "centurion", or "other". */
  deliveryHub: string;
  deliveryAddress: string;
  /** Optional custom one-way km when hub is "other". */
  customOneWayKm: number;
  notes: string;
  bulkDiscussion: boolean;
};

/** Delivery portion of a quote. */
export type DeliveryQuote = {
  applicable: boolean;
  hubId: string;
  hubLabel: string;
  oneWayKm: number;
  chargeableKm: number;
  ratePerKm: number;
  cost: number | null;
  label: string;
};

/** The priced result of a quote calculation. */
export type QuoteResult = {
  /** Which pricing tier the quantity falls into. */
  tier: "under-100" | "100-999" | "bulk";
  quantity: number;
  /** Price per plant, or null when not applicable (contact-us / bulk). */
  pricePerPlant: number | null;
  /** Plant subtotal, or null when there is no fixed price. */
  subtotal: number | null;
  /** Delivery estimate (null cost when not applicable). */
  delivery: DeliveryQuote;
  /** Grand total = plant subtotal + delivery (when both known). */
  grandTotal: number | null;
  /** True for 1000+ orders (special bulk enquiry). */
  isBulk: boolean;
  /** True for under-100 orders with no configured price. */
  isContactUs: boolean;
  /** Short human label, e.g. "R15 each" or "Special bulk enquiry". */
  priceLabel: string;
  /** Delivery note to always display. */
  deliveryNote: string;
};

/** A fully stored enquiry, persisted to localStorage. */
export type StoredEnquiry = EnquiryInput & {
  ref: string;
  createdAt: string; // ISO timestamp
  config: Pick<
    SiteConfig,
    | "productName"
    | "currency"
    | "priceUnder100"
    | "price100To999"
    | "priceBulk"
    | "midTierMin"
    | "bulkThreshold"
    | "quotePrefix"
  >;
  quote: QuoteResult;
  status: EnquiryStatus;
};
