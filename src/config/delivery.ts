/**
 * Delivery costing — AA-style operating rate for our delivery vehicle.
 *
 * Vehicle: Toyota Hilux 3.0 4×4 (2012)
 * Rate basis: AA-style large bakkie / >2500cc operating cost (2026 estimates).
 * DriveCost AA large band ≈ R6.42/km; we use R6.50/km all-in
 * (fuel, maintenance, tyres, wear). One-way only is charged.
 *
 * Distances are one-way km from collection (Benoni).
 */

export type DeliveryHub = {
  id: string;
  label: string;
  /** One-way kilometres from Benoni collection point. */
  oneWayKm: number;
  area?: string;
};

/** Pre-loaded drop hubs (Gauteng & surrounds). Sorted roughly by distance. */
export const DELIVERY_HUBS: DeliveryHub[] = [
  { id: "benoni", label: "Benoni (collection)", oneWayKm: 0, area: "Ekurhuleni" },
  { id: "boksburg", label: "Boksburg", oneWayKm: 12, area: "Ekurhuleni" },
  { id: "kempton-park", label: "Kempton Park", oneWayKm: 15, area: "Ekurhuleni" },
  { id: "germiston", label: "Germiston", oneWayKm: 20, area: "Ekurhuleni" },
  { id: "springs", label: "Springs", oneWayKm: 25, area: "Ekurhuleni" },
  { id: "edenvale", label: "Edenvale", oneWayKm: 28, area: "Ekurhuleni" },
  { id: "jhb-cbd", label: "Johannesburg CBD", oneWayKm: 30, area: "Johannesburg" },
  { id: "bedfordview", label: "Bedfordview", oneWayKm: 28, area: "Johannesburg" },
  { id: "sandton", label: "Sandton", oneWayKm: 40, area: "Johannesburg" },
  { id: "midrand", label: "Midrand", oneWayKm: 45, area: "Johannesburg" },
  { id: "randburg", label: "Randburg", oneWayKm: 50, area: "Johannesburg" },
  { id: "centurion", label: "Centurion", oneWayKm: 55, area: "Tshwane" },
  { id: "roodepoort", label: "Roodepoort", oneWayKm: 55, area: "Johannesburg" },
  { id: "pretoria-cbd", label: "Pretoria CBD", oneWayKm: 70, area: "Tshwane" },
  { id: "pretoria-east", label: "Pretoria East / Faerie Glen", oneWayKm: 75, area: "Tshwane" },
  { id: "krugersdorp", label: "Krugersdorp", oneWayKm: 70, area: "West Rand" },
  { id: "vereeniging", label: "Vereeniging", oneWayKm: 80, area: "Sedibeng" },
  { id: "vanderbijlpark", label: "Vanderbijlpark", oneWayKm: 90, area: "Sedibeng" },
  { id: "other", label: "Other / custom address", oneWayKm: 0, area: "Custom" },
];

export type DeliveryConfig = {
  /** AA-style rate per km for Hilux 3L 4×4 2012 (operating cost). */
  ratePerKm: number;
  /** Charge round-trip (to hub and back to Benoni). false = one-way only. */
  roundTrip: boolean;
  /** Minimum delivery charge when distance is short. */
  minimumFee: number;
  vehicleLabel: string;
  rateNote: string;
};

export const deliveryConfig: DeliveryConfig = {
  ratePerKm: 6.5,
  roundTrip: false,
  minimumFee: 150,
  vehicleLabel: "Toyota Hilux 3.0 4×4 (2012)",
  rateNote:
    "Based on AA-style operating cost for a large bakkie / >2500 cc (≈ R6.50/km, 2026). One-way from Benoni.",
};

/**
 * Calculate delivery cost for a hub (or custom one-way km).
 * Collection / courier / not-sure → no vehicle delivery cost.
 */
export function calculateDeliveryCost(
  preference: "Collection" | "Delivery" | "Courier" | "Not sure",
  oneWayKm: number,
): {
  applicable: boolean;
  oneWayKm: number;
  chargeableKm: number;
  ratePerKm: number;
  cost: number | null;
  label: string;
} {
  if (preference !== "Delivery" || oneWayKm <= 0) {
    return {
      applicable: false,
      oneWayKm: 0,
      chargeableKm: 0,
      ratePerKm: deliveryConfig.ratePerKm,
      cost: null,
      label:
        preference === "Collection"
          ? "Collection — no delivery charge"
          : preference === "Courier"
            ? "Courier — cost to be confirmed"
            : "Delivery cost to be confirmed",
    };
  }

  const chargeableKm = deliveryConfig.roundTrip ? oneWayKm * 2 : oneWayKm;
  const raw = chargeableKm * deliveryConfig.ratePerKm;
  const cost = Math.max(deliveryConfig.minimumFee, Math.round(raw));

  return {
    applicable: true,
    oneWayKm,
    chargeableKm,
    ratePerKm: deliveryConfig.ratePerKm,
    cost,
    label: deliveryConfig.roundTrip
      ? `${oneWayKm} km one-way · ${chargeableKm} km return @ R${deliveryConfig.ratePerKm}/km`
      : `${oneWayKm} km one-way @ R${deliveryConfig.ratePerKm}/km`,
  };
}

export function findHub(id: string): DeliveryHub | undefined {
  return DELIVERY_HUBS.find((h) => h.id === id);
}
