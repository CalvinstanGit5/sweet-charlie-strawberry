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
  orderType: OrderType;
  delivery: DeliveryPreference;
  deliveryHub: string;
  deliveryAddress: string;
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
  tier: string;
  quantity: number;
  pricePerPlant: number;
  subtotal: number;
  delivery: DeliveryQuote;
  grandTotal: number | null;
  isBulk: boolean;
  isContactUs: boolean;
  priceLabel: string;
  deliveryNote: string;
};

/** A fully stored enquiry, persisted to localStorage. */
export type StoredEnquiry = EnquiryInput & {
  ref: string;
  createdAt: string;
  config: Pick<SiteConfig, "productName" | "currency" | "quotePrefix">;
  quote: QuoteResult;
  status: EnquiryStatus;
};
