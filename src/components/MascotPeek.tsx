import { mascotPoses, type MascotPose } from "@/config/mascots";
import { cn } from "@/utils/cn";

type Corner = "br" | "bl" | "tr" | "tl";

const cornerClass: Record<Corner, string> = {
  br: "bottom-0 right-0 translate-x-[8%] translate-y-[6%]",
  bl: "bottom-0 left-0 -translate-x-[8%] translate-y-[6%]",
  tr: "top-0 right-0 translate-x-[10%] -translate-y-[8%]",
  tl: "top-0 left-0 -translate-x-[10%] -translate-y-[8%]",
};

/** Transparent mascot overlaid on a relatively-positioned parent. */
export default function MascotPeek({
  pose,
  corner = "br",
  size = "md",
  className,
}: {
  pose: MascotPose;
  corner?: Corner;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const asset = mascotPoses[pose];
  if (!asset) return null;

  const sizeClass =
    size === "sm"
      ? "w-20 sm:w-24"
      : size === "lg"
        ? "w-32 sm:w-40"
        : size === "xl"
          ? "w-36 sm:w-48"
          : "w-24 sm:w-32";

  return (
    <img
      src={asset.src}
      alt={asset.alt}
      className={cn(
        "pointer-events-none absolute z-10 select-none drop-shadow-md",
        sizeClass,
        cornerClass[corner],
        className,
      )}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}
