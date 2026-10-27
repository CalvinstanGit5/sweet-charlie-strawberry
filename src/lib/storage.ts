import config from "@/config/site";
import type { EnquiryStatus, StoredEnquiry } from "./types";

/**
 * Device-local persistence (localStorage only).
 * This is intentionally simple: it is NOT a CRM, has no online backup
 * and does not sync across devices. It just remembers enquiries made
 * in this browser.
 */

const ENQUIRIES_KEY = "sweet-charlie-enquiries";
const COUNTER_KEY = "sweet-charlie-quote-counter";

function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* storage unavailable (private mode / quota) — fail silently */
  }
}

/**
 * Generate the next quote reference: PREFIX-YYYY-XXXX.
 * Uses a per-year counter stored locally. Falls back to a timestamp +
 * random suffix if storage is unavailable, to avoid collisions.
 */
export function getNextQuoteRef(now = new Date()): string {
  const year = now.getFullYear();
  const counterKey = `${COUNTER_KEY}-${year}`;

  const raw = safeGet(counterKey);
  const current = raw ? parseInt(raw, 10) : 0;
  const next = Number.isFinite(current) && current >= 0 ? current + 1 : 1;

  if (raw === null && !storageAvailable()) {
    // Fallback: timestamp + 3 random digits
    const ts = now.getTime().toString().slice(-4);
    const rand = Math.floor(100 + Math.random() * 900);
    return `${config.quotePrefix}-${year}-${ts}${rand}`.slice(
      0,
      `${config.quotePrefix}-${year}-`.length + 7,
    );
  }

  safeSet(counterKey, String(next));
  const seq = String(next).padStart(4, "0");
  return `${config.quotePrefix}-${year}-${seq}`;
}

function storageAvailable(): boolean {
  try {
    const k = "__sc_test__";
    window.localStorage.setItem(k, "1");
    window.localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

/** Read all stored enquiries (newest first). */
export function loadEnquiries(): StoredEnquiry[] {
  const raw = safeGet(ENQUIRIES_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredEnquiry[]) : [];
  } catch {
    return [];
  }
}

function persist(enquiries: StoredEnquiry[]): void {
  safeSet(ENQUIRIES_KEY, JSON.stringify(enquiries));
}

/** Add a new enquiry to the front of the list. */
export function saveEnquiry(enquiry: StoredEnquiry): void {
  const all = loadEnquiries();
  persist([enquiry, ...all]);
}

/** Update the status of an enquiry by reference. */
export function updateEnquiryStatus(ref: string, status: EnquiryStatus): void {
  const all = loadEnquiries();
  const idx = all.findIndex((e) => e.ref === ref);
  if (idx === -1) return;
  all[idx] = { ...all[idx], status };
  persist(all);
}

/** Delete a single enquiry by reference. */
export function deleteEnquiry(ref: string): void {
  persist(loadEnquiries().filter((e) => e.ref !== ref));
}

/** Remove all stored enquiries. */
export function clearEnquiries(): void {
  persist([]);
}
