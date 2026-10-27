/**
 * SINGLE SOURCE OF TRUTH
 * ------------------------------------------------------------------
 * Every business value lives here. Change pricing, the WhatsApp
 * number, thresholds or copy in this file only — no other file
 * should hard-code these values.
 *
 * QUOTE CREATOR MODE (pre-launch)
 *   The enquiry form has a manual "Price per plant (R)" field.
 *   You type the unit price for each quote — the site calculates
 *   the estimate, PDF and WhatsApp message from that.
 *
 *   defaultUnitPrice = suggested starting value in the form (editable).
 *
 * Public tier display (Pricing page / hero) still uses the tier
 * fields below. Set numbers when you publish fixed bands; leave
 * null to show "Contact us" on the marketing cards only.
 */

export type BankingDetails = {
  accountHolder: string;
  bank: string;
  accountType: string;
  branchCode: string;
  accountNumber: string;
};

export type SiteConfig = {
  productName: string;
  /**
   * Suggested unit price pre-filled on the quote form.
   * Change freely — each quote still lets you override it.
   */
  defaultUnitPrice: number;
  /**
   * Price per plant for orders below midTierMin (Pricing page only).
   * null = "Contact us" on the marketing card.
   */
  priceUnder100: number | null;
  /**
   * Mid-band display price (Pricing page / hero badge).
   * null = "Contact us" / "Get a quote".
   */
  price100To999: number | null;
  /**
   * Bulk display price. null = "Special bulk quotation".
   */
  priceBulk: number | null;
  /** Minimum quantity for the mid-band label. */
  midTierMin: number;
  /** Bulk threshold for the marketing tier label. */
  bulkThreshold: number;
  whatsappNumber: string;
  whatsappDisplay: string;
  businessName: string;
  collectionLocation: string;
  deliveryMessage: string;
  quotePrefix: string;
  currency: string;
  siteUrl: string;
  banking: BankingDetails;
};

export const config: SiteConfig = {
  productName: "Sweet Charlie Strawberry Plants",

  // ---- Quote creator: suggested price (edit per quote on the form) --
  defaultUnitPrice: 15,
  // ---- Public tier cards (optional until launch) --------------------
  priceUnder100: null,
  price100To999: 15,
  priceBulk: null,
  midTierMin: 100,
  bulkThreshold: 1000,
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

export default config;
