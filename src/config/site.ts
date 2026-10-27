/**
 * SINGLE SOURCE OF TRUTH
 * ------------------------------------------------------------------
 * Pricing is LOCKED. Customers cannot change unit prices.
 * Estimates are non-binding until availability is confirmed on WhatsApp.
 * Banking details are for invoices only — not shown on public quotes.
 */

export type PriceTier = {
  /** Inclusive min quantity for this tier. */
  minQty: number;
  /** Inclusive max quantity (null = no upper limit). */
  maxQty: number | null;
  /** Rand per plant. */
  pricePerPlant: number;
  /** Short label for cards, e.g. "1 – 19 plants". */
  label: string;
};

export type BankingDetails = {
  accountHolder: string;
  bank: string;
  accountType: string;
  branchCode: string;
  accountNumber: string;
};

export type SiteConfig = {
  productName: string;
  /** Locked public price tiers (quantity bands). */
  priceTiers: PriceTier[];
  whatsappNumber: string;
  whatsappDisplay: string;
  businessName: string;
  collectionLocation: string;
  deliveryMessage: string;
  quotePrefix: string;
  currency: string;
  siteUrl: string;
  /** Banking — invoices only, not quotes. */
  banking: BankingDetails;
};

export const config: SiteConfig = {
  productName: "Sweet Charlie Strawberry Plants",

  // ---- LOCKED plant pricing (do not expose as editable on the form) --
  priceTiers: [
    { minQty: 1, maxQty: 19, pricePerPlant: 25, label: "1 – 19 plants" },
    { minQty: 20, maxQty: 99, pricePerPlant: 20, label: "20 – 99 plants" },
    { minQty: 100, maxQty: 499, pricePerPlant: 15, label: "100 – 499 plants" },
    { minQty: 500, maxQty: 999, pricePerPlant: 12, label: "500 – 999 plants" },
    { minQty: 1000, maxQty: null, pricePerPlant: 10, label: "1000+ plants" },
  ],
  // -------------------------------------------------------------------

  whatsappNumber: "27725742448",
  whatsappDisplay: "072 574 2448",
  businessName: "Sweet Charlie Strawberry Plants",
  collectionLocation: "Benoni, Gauteng",
  deliveryMessage:
    "Delivery priced on AA-style operating cost for our Hilux 3.0 4×4 (R6.50/km one-way from Benoni). Courier costs confirmed separately.",
  quotePrefix: "SC",
  currency: "R",
  siteUrl: "https://www.sweetcharlie.co.za",
  banking: {
    accountHolder: "Calvin Marais",
    bank: "Bank Zero",
    accountType: "Current Account",
    branchCode: "888000",
    accountNumber: "80204168266",
  },
};

/** Resolve locked unit price for a quantity. */
export function priceForQuantity(qty: number): {
  pricePerPlant: number;
  tierLabel: string;
  tierIndex: number;
} | null {
  const n = Math.max(0, Math.floor(qty));
  if (n < 1) return null;
  const idx = config.priceTiers.findIndex(
    (t) => n >= t.minQty && (t.maxQty === null || n <= t.maxQty),
  );
  if (idx < 0) return null;
  const t = config.priceTiers[idx];
  return {
    pricePerPlant: t.pricePerPlant,
    tierLabel: t.label,
    tierIndex: idx,
  };
}

export default config;
