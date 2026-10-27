import { jsPDF } from "jspdf";
import config from "@/config/site";
import { formatMoney } from "./quote";
import type { StoredEnquiry } from "./types";

/**
 * Generate a clean, professional one-page quote PDF and trigger a download.
 * Client-side only — no server involved.
 */
export function generateQuotePDF(enquiry: StoredEnquiry): void {
  const { quote } = enquiry;
  const delivery = quote.delivery ?? {
    applicable: false,
    hubId: "",
    hubLabel: "—",
    oneWayKm: 0,
    chargeableKm: 0,
    ratePerKm: 6.5,
    cost: null as number | null,
    label: "Delivery cost to be confirmed",
  };

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth(); // 210
  const margin = 18;
  const contentW = pageW - margin * 2;
  const right = pageW - margin;

  // Palette
  const berry: [number, number, number] = [193, 18, 43];
  const berryDark: [number, number, number] = [125, 14, 32];
  const leaf: [number, number, number] = [47, 125, 41];
  const ink: [number, number, number] = [51, 44, 40];
  const muted: [number, number, number] = [122, 106, 92];
  const cream: [number, number, number] = [253, 241, 222];
  const line: [number, number, number] = [230, 219, 203];

  // ---- Header band -------------------------------------------------
  doc.setFillColor(...berry);
  doc.rect(0, 0, pageW, 32, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(config.businessName, margin, 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(255, 235, 238);
  doc.text("Fresh strawberry plants  ·  South Africa", margin, 23);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text("QUOTE / ESTIMATE", right, 15, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(enquiry.ref, right, 21, { align: "right" });

  // ---- "Estimate, not an invoice" banner ---------------------------
  doc.setDrawColor(...berry);
  doc.setLineWidth(0.4);
  doc.setFillColor(255, 241, 242);
  doc.rect(margin, 37, contentW, 10, "FD");
  doc.setTextColor(...berryDark);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("ESTIMATE — NOT AN INVOICE", pageW / 2, 43, { align: "center" });

  // ---- Meta (date + prepared for) ----------------------------------
  let y = 58;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...muted);
  doc.text("DATE", margin, y);
  doc.text("PREPARED FOR", margin + 70, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...ink);
  const dateStr = new Date(enquiry.createdAt).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.text(dateStr, margin, y + 6);
  doc.text(enquiry.name, margin + 70, y + 6);

  y += 16;
  doc.setDrawColor(...line);
  doc.line(margin, y, right, y);

  // ---- Customer information ----------------------------------------
  y += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...leaf);
  doc.text("CUSTOMER INFORMATION", margin, y);
  y += 7;

  doc.setFontSize(10);
  const infoRows: [string, string][] = [
    ["Name", enquiry.name],
    ["Business / farm", enquiry.business || "—"],
    ["WhatsApp", enquiry.whatsapp],
    ["Email", enquiry.email || "—"],
    ["Location", enquiry.location],
    ["Order type", enquiry.orderType],
  ];
  for (const [label, value] of infoRows) {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...muted);
    doc.text(label, margin, y);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...ink);
    doc.text(String(value), margin + 42, y);
    y += 6;
  }

  // ---- Line items ---------------------------------------------------
  y += 6;
  doc.setFillColor(...cream);
  doc.rect(margin, y, contentW, 9, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...berryDark);
  doc.text("PRODUCT", margin + 3, y + 6);
  doc.text("QTY", margin + 92, y + 6, { align: "right" });
  doc.text("PLANT PRICE", margin + 122, y + 6, { align: "right" });
  doc.text("SUBTOTAL", right - 3, y + 6, { align: "right" });

  y += 9;
  doc.setDrawColor(...line);
  doc.line(margin, y, right, y);

  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...ink);
  doc.text(config.productName, margin + 3, y);
  doc.text(String(enquiry.quantity), margin + 92, y, { align: "right" });

  const priceText = quote.isBulk
    ? "—"
    : quote.isContactUs
      ? "On request"
      : formatMoney(quote.pricePerPlant ?? 0);
  const subtotalText = quote.isBulk
    ? "Bulk quote"
    : quote.isContactUs
      ? "On request"
      : formatMoney(quote.subtotal ?? 0);
  doc.text(priceText, margin + 122, y, { align: "right" });
  doc.text(subtotalText, right - 3, y, { align: "right" });

  // ---- Delivery -----------------------------------------------------
  y += 10;
  doc.setDrawColor(...line);
  doc.line(margin, y, right, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...muted);
  doc.text("Delivery / collection", margin, y);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...ink);
  doc.text(enquiry.delivery, margin + 52, y);
  y += 6;

  if (delivery.applicable && delivery.cost !== null) {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...muted);
    doc.text("Hub", margin, y);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...ink);
    doc.text(delivery.hubLabel, margin + 52, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...muted);
    doc.text("Delivery cost", margin, y);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...ink);
    doc.text(formatMoney(delivery.cost), margin + 52, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...muted);
    const delNote = doc.splitTextToSize(delivery.label, contentW);
    doc.text(delNote, margin, y);
    y += delNote.length * 4.5;
    doc.setFontSize(10);
  } else {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...muted);
    const deliveryWrapped = doc.splitTextToSize(
      enquiry.delivery === "Collection"
        ? "Collection from Benoni — no delivery charge."
        : "Delivery/courier cost to be confirmed based on location and requirements.",
      contentW,
    );
    doc.text(deliveryWrapped, margin, y);
    y += deliveryWrapped.length * 5;
  }

  // ---- Estimated total box -----------------------------------------
  y += 6;
  const boxH = quote.isBulk ? 22 : 18;
  doc.setFillColor(...berry);
  doc.rect(margin, y, contentW, boxH, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("ESTIMATED TOTAL", margin + 4, y + 8);
  doc.setFontSize(quote.isBulk ? 11 : 14);
  if (quote.isBulk) {
    doc.text("SPECIAL BULK ENQUIRY", right - 4, y + 8, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(
      "1000+ plants — a customised quotation will be prepared for you.",
      margin + 4,
      y + 16,
    );
  } else if (quote.isContactUs) {
    doc.text("TO BE CONFIRMED", right - 4, y + 9, { align: "right" });
  } else {
    const total =
      quote.grandTotal !== null ? quote.grandTotal : (quote.subtotal ?? 0);
    doc.text(formatMoney(total), right - 4, y + 9, { align: "right" });
  }

  y += boxH + 4;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...muted);
  if (quote.isBulk) {
    doc.text("Delivery/courier not included — to be confirmed.", margin, y);
  } else if (delivery.applicable && delivery.cost !== null) {
    doc.text(
      `Includes plant subtotal ${formatMoney(quote.subtotal ?? 0)} + delivery ${formatMoney(delivery.cost)}.`,
      margin,
      y,
    );
  } else if (enquiry.delivery === "Collection") {
    doc.text("Collection — no delivery charge included.", margin, y);
  } else {
    doc.text("Delivery/courier cost to be confirmed separately.", margin, y);
  }

  // ---- Notes --------------------------------------------------------
  if (enquiry.notes.trim()) {
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...leaf);
    doc.text("ADDITIONAL REQUIREMENTS", margin, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...ink);
    const noteLines = doc.splitTextToSize(enquiry.notes, contentW);
    doc.text(noteLines, margin, y);
    y += noteLines.length * 5;
  }

  // ---- Contact ------------------------------------------------------
  y += 12;
  doc.setDrawColor(...line);
  doc.line(margin, y, right, y);
  y += 7;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...leaf);
  doc.text("TO CONFIRM YOUR ORDER", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...ink);
  doc.text(`WhatsApp: ${config.whatsappDisplay}`, margin, y);
  doc.text(`Collection: ${config.collectionLocation}`, margin + 70, y);

  // ---- Banking details ----------------------------------------------
  const bank = config.banking;
  y += 12;
  doc.setDrawColor(...line);
  doc.line(margin, y, right, y);
  y += 7;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...leaf);
  doc.text("BANKING DETAILS — PAYMENT", margin, y);
  y += 7;

  const bankRows: [string, string][] = [
    ["Account holder", bank.accountHolder],
    ["Bank", bank.bank],
    ["Account type", bank.accountType],
    ["Branch code", bank.branchCode],
    ["Account number", bank.accountNumber],
    ["Reference", enquiry.ref],
  ];
  doc.setFontSize(9);
  for (const [label, value] of bankRows) {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...muted);
    doc.text(label, margin, y);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...ink);
    doc.text(value, margin + 42, y);
    y += 5.5;
  }
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...muted);
  y += 5.5;
  doc.text("Please use the quote reference above when making payment.", margin, y);

  // ---- Disclaimer (flow after content — never overlap banking) ------
  const disclaimer =
    "This is a non-binding estimate only. Final pricing, plant availability and delivery costs will be confirmed by us before any order is accepted. Prices are subject to change.";
  doc.setFontSize(7.5);
  doc.setTextColor(...muted);
  const disclaimerLines = doc.splitTextToSize(disclaimer, contentW);
  const pageH = doc.internal.pageSize.getHeight();
  const footerReserve = 16;
  y += 10;
  // If content already near the bottom, start a second page for the disclaimer
  if (y + disclaimerLines.length * 4 > pageH - footerReserve) {
    doc.addPage();
    y = margin + 10;
  }
  doc.text(disclaimerLines, margin, y);

  // ---- Save ---------------------------------------------------------
  doc.save(`Sweet-Charlie-Quote-${enquiry.ref}.pdf`);
}
