import config from "@/config/site";
import { formatMoney } from "./quote";
import type { StoredEnquiry } from "./types";

/**
 * Build a wa.me click-to-chat link with a pre-filled message.
 * This only opens WhatsApp with the text ready to send — the site
 * never sends anything silently on the user's behalf.
 */
function waLink(message: string): string {
  return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Simple, general enquiry message for the top-level WhatsApp CTAs. */
export function buildGeneralWhatsAppLink(): string {
  const message = [
    `Hi, I would like to enquire about ${config.productName}.`,
    "",
    "Name:",
    "Location:",
    "Quantity:",
    "Order type:",
    "Delivery/collection:",
    "Additional requirements:",
    "",
    "I would like to receive a quotation.",
  ].join("\n");
  return waLink(message);
}

/** Detailed message generated from a completed quote/enquiry. */
export function buildQuoteWhatsAppLink(enquiry: StoredEnquiry): string {
  const { quote, quantity, orderType, delivery, deliveryAddress, notes } = enquiry;

  const priceLine = quote.isBulk
    ? "Special bulk enquiry"
    : quote.isContactUs
      ? "To be confirmed"
      : `${formatMoney(quote.pricePerPlant ?? 0)} per plant (est. ${formatMoney(
          quote.subtotal ?? 0,
        )})`;

  const d = quote.delivery;
  const deliveryLines: string[] = [`Delivery/collection: ${delivery}`];
  if (d?.applicable && d.cost !== null) {
    deliveryLines.push(`Delivery hub: ${d.hubLabel}`);
    deliveryLines.push(
      `Delivery estimate: ${formatMoney(d.cost)} (${d.label})`,
    );
  }
  if (deliveryAddress) deliveryLines.push(`Delivery address: ${deliveryAddress}`);

  const totalLine =
    quote.isBulk || quote.isContactUs
      ? null
      : quote.grandTotal !== null
        ? `Estimated total: ${formatMoney(quote.grandTotal)}`
        : `Estimated plant total: ${formatMoney(quote.subtotal ?? 0)}`;

  const bank = config.banking;
  const lines = [
    `Hi, I would like to enquire about ${config.productName}.`,
    "",
    `Quote ref: ${enquiry.ref}`,
    `Name: ${enquiry.name}`,
    enquiry.business ? `Business: ${enquiry.business}` : "",
    `Location: ${enquiry.location}`,
    `Quantity: ${quantity} plants`,
    `Order type: ${orderType}`,
    ...deliveryLines,
    `Plant price: ${priceLine}`,
    totalLine,
    notes ? `Additional requirements: ${notes}` : "",
    "",
    "Banking details for payment:",
    `Account holder: ${bank.accountHolder}`,
    `Bank: ${bank.bank}`,
    `Account type: ${bank.accountType}`,
    `Branch code: ${bank.branchCode}`,
    `Account number: ${bank.accountNumber}`,
    `Reference: ${enquiry.ref}`,
    "",
    "I would like to receive a quotation.",
  ].filter(Boolean);

  return waLink(lines.join("\n"));
}
