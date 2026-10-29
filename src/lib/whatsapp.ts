import config from "@/config/site";
import { formatMoney } from "./quote";
import type { StoredEnquiry } from "./types";

/**
 * Build a wa.me click-to-chat link with a pre-filled message.
 * Banking details are NOT included — invoices only.
 */
function waLink(message: string): string {
  return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

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
    "Please confirm availability.",
  ].join("\n");
  return waLink(message);
}

export function buildQuoteWhatsAppLink(enquiry: StoredEnquiry): string {
  const { quote, quantity, orderType, delivery, deliveryAddress, notes } = enquiry;

  const priceLine = `${formatMoney(quote.pricePerPlant)} per plant (${quote.tier}) · plants ${formatMoney(quote.subtotal)}`;

  const d = quote.delivery;
  const deliveryLines: string[] = [`Delivery/collection: ${delivery}`];
  if (d?.applicable && d.cost !== null) {
    deliveryLines.push(`Delivery hub: ${d.hubLabel}`);
    deliveryLines.push(
      `Delivery estimate: ${formatMoney(d.cost)} (${d.label})`,
    );
  } else if (delivery === "Delivery") {
    deliveryLines.push(
      "Delivery: fee to be confirmed once hub/distance is agreed",
    );
  }
  if (deliveryAddress) deliveryLines.push(`Delivery address: ${deliveryAddress}`);

  const totalLine =
    quote.grandTotal !== null
      ? `Estimated total: ${formatMoney(quote.grandTotal)}`
      : `Estimated plant total: ${formatMoney(quote.subtotal)}` +
        (delivery === "Delivery" && !(d?.cost != null)
          ? " (delivery fee still to confirm)"
          : "");

  const lines = [
    `Hi, I would like to order ${config.productName}.`,
    "",
    `Quote ref: ${enquiry.ref}`,
    `Name: ${enquiry.name}`,
    enquiry.business ? `Business: ${enquiry.business}` : "",
    `WhatsApp: ${enquiry.whatsapp}`,
    enquiry.email ? `Email: ${enquiry.email}` : "",
    `Location: ${enquiry.location}`,
    `Quantity: ${quantity} plants`,
    `Order type: ${orderType}`,
    ...deliveryLines,
    `Plant price: ${priceLine}`,
    totalLine,
    notes ? `Additional requirements: ${notes}` : "",
    "",
    "Please confirm availability. Estimate is non-binding. T&Cs apply.",
  ].filter(Boolean);

  return waLink(lines.join("\n"));
}
