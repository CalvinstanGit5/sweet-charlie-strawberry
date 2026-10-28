/**
 * Delivery costing — per-km rate for our delivery buggy.
 * One-way from Benoni. R6.50/km, minimum fee applies.
 */

export type DeliveryHub = {
  id: string;
  label: string;
  /** One-way kilometres from Benoni collection point. */
  oneWayKm: number;
  area?: string;
};

/** Pre-loaded drop hubs (Gauteng & surrounds). */
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
  ratePerKm: number;
  roundTrip: boolean;
  minimumFee: number;
  vehicleLabel: string;
  rateNote: string;
};

export const deliveryConfig: DeliveryConfig = {
  ratePerKm: 6.5,
  roundTrip: false,
  minimumFee: 150,
  vehicleLabel: "delivery buggy",
  rateNote:
    "R6.50/km one-way from Benoni in our delivery buggy (minimum fee applies).",
};

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
    label: `${oneWayKm} km one-way @ R${deliveryConfig.ratePerKm}/km`,
  };
}

export function findHub(id: string): DeliveryHub | undefined {
  return DELIVERY_HUBS.find((h) => h.id === id);
}
