/**
 * IMAGE MANIFEST
 * ------------------------------------------------------------------
 * Maps semantic slots to files inside /public/images/strawberries/.
 */

const base = "/images/strawberries";

export type ImageSlot =
  | "hero"
  | "plantPrimary"
  | "plantSecondary"
  | "fruitPrimary"
  | "fruitSecondary"
  | "bulk"
  | "lifestyle"
  | "icon"
  | "mascot";

export const images: Record<ImageSlot, { src: string; alt: string }> = {
  hero: {
    src: `${base}/hero/hero-1.jpg`,
    alt: "Ripe red Sweet Charlie strawberries growing on green plants in a sunny summer garden",
  },
  plantPrimary: {
    src: `${base}/plants/plant-1.jpg`,
    alt: "A healthy Sweet Charlie strawberry plant with green leaves, white blossoms and ripe berries",
  },
  plantSecondary: {
    src: `${base}/plants/plant-2.jpg`,
    alt: "Young Sweet Charlie strawberry seedlings ready for planting in a nursery tray",
  },
  fruitPrimary: {
    src: `${base}/fruit/fruit-1.jpg`,
    alt: "A fresh pile of ripe red Sweet Charlie strawberries picked for the table",
  },
  fruitSecondary: {
    src: `${base}/fruit/fruit-2.jpg`,
    alt: "A basket filled with fresh ripe Sweet Charlie strawberries and green leaves",
  },
  bulk: {
    src: `${base}/promotional/promo-1.jpg`,
    alt: "Rows of strawberry plants heavy with ripe berries ready for a bulk harvest",
  },
  lifestyle: {
    src: `${base}/lifestyle/lifestyle-1.jpg`,
    alt: "Hands gently holding freshly picked Sweet Charlie strawberries in a summer garden",
  },
  icon: {
    src: `${base}/mascot.png`,
    alt: "Sweet Charlie mascot",
  },
  mascot: {
    src: `${base}/mascot.png`,
    alt: "Sweet Charlie strawberry mascot holding a potted plant",
  },
};

export default images;
