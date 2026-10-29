/**
 * Mascot poses — transparent PNGs under /images/strawberries/mascot/
 * Drop new files in that folder and register them here.
 */
const base = "/images/strawberries/mascot";

export type MascotPose =
  | "welcome"
  | "gardener"
  | "harvest"
  | "purchase"
  | "celebrate"
  | "proud"
  | "quality_check"
  | "holding_plant"
  | "help_point_right"
  | "point_left"
  | "show_left"
  | "show_right"
  | "look_right"
  | "look_up_left"
  | "pick_up"
  | "admire-01"
  | "admire-02"
  | "admire-03"
  | "sneak_peak_around_image"
  | "strawberry"
  | "delivery";

export const mascotPoses: Record<MascotPose, { src: string; alt: string }> = {
  welcome: { src: `${base}/welcome.png`, alt: "Sweet Charlie waving hello" },
  gardener: { src: `${base}/gardener.png`, alt: "Sweet Charlie as a gardener" },
  harvest: { src: `${base}/harvest.png`, alt: "Sweet Charlie with a harvest" },
  purchase: { src: `${base}/purchase.png`, alt: "Sweet Charlie ready to buy plants" },
  celebrate: { src: `${base}/celebrate.png`, alt: "Sweet Charlie celebrating" },
  proud: { src: `${base}/proud.png`, alt: "Sweet Charlie looking proud" },
  quality_check: { src: `${base}/quality_check.png`, alt: "Sweet Charlie checking plant quality" },
  holding_plant: { src: `${base}/holding_plant.png`, alt: "Sweet Charlie holding a plant" },
  help_point_right: { src: `${base}/help_point_right.png`, alt: "Sweet Charlie pointing right" },
  point_left: { src: `${base}/point_left.png`, alt: "Sweet Charlie pointing left" },
  show_left: { src: `${base}/show_left.png`, alt: "Sweet Charlie showing left" },
  show_right: { src: `${base}/show_right.png`, alt: "Sweet Charlie showing right" },
  look_right: { src: `${base}/look_right.png`, alt: "Sweet Charlie looking right" },
  look_up_left: { src: `${base}/look_up_left.png`, alt: "Sweet Charlie looking up" },
  pick_up: { src: `${base}/pick_up.png`, alt: "Sweet Charlie picking strawberries" },
  "admire-01": { src: `${base}/admire-01.png`, alt: "Sweet Charlie admiring plants" },
  "admire-02": { src: `${base}/admire-02.png`, alt: "Sweet Charlie admiring fruit" },
  "admire-03": { src: `${base}/admire-03.png`, alt: "Sweet Charlie admiring the garden" },
  sneak_peak_around_image: {
    src: `${base}/sneak_peak_around_image.png`,
    alt: "Sweet Charlie peeking around the edge",
  },
  strawberry: { src: `${base}/strawberry.png`, alt: "Sweet Charlie with a strawberry" },
  delivery: { src: `${base}/delivery.png`, alt: "Sweet Charlie ready for delivery" },
};

export default mascotPoses;
