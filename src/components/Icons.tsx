import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** Base stroke icon (lucide-style). */
function Stroke({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ---- Stroke icons ---- */

export const Leaf = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z" />
    <path d="M2 21c0-3 1.9-5.4 5.1-6C9.5 14.5 12 13 13 12" />
  </Stroke>
);

export const Check = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Stroke>
);

export const CheckCircle = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12.5 2.5 2.5 5-5.5" />
  </Stroke>
);

export const MapPin = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </Stroke>
);

export const Truck = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M3 16V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v10" />
    <path d="M16 9h3.2a1 1 0 0 1 .8.4l2 2.6a1 1 0 0 1 .2.6V16h-2" />
    <circle cx="7" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
    <path d="M8.8 17.5h6.4" />
  </Stroke>
);

export const Store = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M3 9h18l-1.6-5H4.6L3 9Z" />
    <path d="M4.5 9v10.5a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V9" />
    <path d="M9.5 20.5v-6h5v6" />
  </Stroke>
);

export const Package = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M21 8.5 12 3.5 3 8.5v7L12 20.5 21 15.5v-7Z" />
    <path d="m3 8.5 9 5 9-5" />
    <path d="M12 13.5v7" />
  </Stroke>
);

export const HelpCircle = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.4 9.3a2.7 2.7 0 0 1 5.2.9c0 1.8-2.6 2.3-2.6 4" />
    <circle cx="12" cy="17.2" r="0.6" fill="currentColor" stroke="none" />
  </Stroke>
);

export const Home = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m3 10.5 9-7.5 9 7.5" />
    <path d="M5.5 9.5V20a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.5" />
  </Stroke>
);

export const Sprout = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M7 21h10" />
    <path d="M12 21V8.5" />
    <path d="M12 8.5C12 5.5 10 3.5 7 3.5c0 3 2 5 5 5Z" />
    <path d="M12 8.5c0-3 2-5 5-5 0 3-2 5-5 5Z" />
  </Stroke>
);

export const Users = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M16 20v-1.6a4 4 0 0 0-4-4H6.5a4 4 0 0 0-4 4V20" />
    <circle cx="9.2" cy="7.2" r="3.4" />
    <path d="M21.5 20v-1.6a4 4 0 0 0-3-3.86" />
    <path d="M16 3.7a3.4 3.4 0 0 1 0 6.6" />
  </Stroke>
);

export const Building = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="4" y="3" width="16" height="18" rx="1.2" />
    <path d="M9 7h1.5M13.5 7H15M9 11h1.5M13.5 11H15M9 15h1.5M13.5 15H15" />
    <path d="M10 21v-3.5h4V21" />
  </Stroke>
);

export const Factory = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M3 21h18" />
    <path d="M5.5 21V10l4 2.4V10l4 2.4V10l4.5 2.7V21" />
    <path d="M9.5 21v-4h4v4" />
  </Stroke>
);

export const Sun = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2.2M12 19.8V22M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2 12h2.2M19.8 12H22M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
  </Stroke>
);

export const FileText = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M14 3H7.5A1.5 1.5 0 0 0 6 4.5v15A1.5 1.5 0 0 0 7.5 21h9a1.5 1.5 0 0 0 1.5-1.5V8l-4-5Z" />
    <path d="M14 3v5h4.5" />
    <path d="M9 13h6M9 16.5h4" />
  </Stroke>
);

export const Download = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 3v11" />
    <path d="m7.5 10 4.5 4.5L16.5 10" />
    <path d="M4.5 20h15" />
  </Stroke>
);

export const Refresh = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M3.5 12a8.5 8.5 0 0 1 14.4-6.1L21 8.5" />
    <path d="M21 3.5v5h-5" />
    <path d="M20.5 12a8.5 8.5 0 0 1-14.4 6.1L3 15.5" />
    <path d="M3 20.5v-5h5" />
  </Stroke>
);

export const ChevronDown = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m6 9 6 6 6-6" />
  </Stroke>
);

export const MessageCircle = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M21 11.4a8.3 8.3 0 0 1-9 8.3 8.7 8.7 0 0 1-3.7-.85L3.5 20.5l1.7-4.7A8.3 8.3 0 0 1 4 11.4 8.3 8.3 0 0 1 12.3 3 8.3 8.3 0 0 1 21 11.4Z" />
  </Stroke>
);

export const Shield = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 3l7.5 3v5.5c0 4.6-3.1 8.3-7.5 9.5-4.4-1.2-7.5-4.9-7.5-9.5V6L12 3Z" />
    <path d="m9 12 2 2 4-4" />
  </Stroke>
);

export const Trash = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M4 7h16" />
    <path d="M10 11v6M14 11v6" />
    <path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" />
    <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
  </Stroke>
);

export const ArrowLeft = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M19 12H5" />
    <path d="m12 19-7-7 7-7" />
  </Stroke>
);

/* ---- Fill icons ---- */

export const WhatsApp = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.347-.347.52-.52.173-.174.23-.298.347-.497.116-.198.058-.371-.03-.52-.088-.148-.66-1.59-.905-2.177-.238-.571-.48-.496-.66-.505-.17-.008-.363-.01-.557-.01-.193 0-.507.073-.772.372-.265.297-1.01.984-1.01 2.4 0 1.415 1.033 2.78 1.176 2.972.144.198 2.03 3.19 4.94 4.378.69.298 1.23.475 1.65.607.707.223 1.35.19 1.86.115.568-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

export const Strawberry = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M12 22c-4.2 0-7.5-3.4-7.5-7.7 0-2.5 1.4-4.4 3.3-5.3C9 8.2 10.4 7 12 7s3 1.2 4.2 2c1.9.9 3.3 2.8 3.3 5.3 0 4.3-3.3 7.7-7.5 7.7Z" />
    <path d="M12 7c-.4-1.6-1.9-2.7-3.6-2.9.4 1.4 1.3 2.4 2.7 2.8m1-.1c.4-1.6 1.9-2.7 3.6-2.9-.4 1.4-1.3 2.4-2.7 2.8M12 4.2V7" />
  </svg>
);

export const Sparkles = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M12 2.5l1.7 4.4 4.4 1.7-4.4 1.7L12 14.7l-1.7-4.4L5.9 8.6l4.4-1.7L12 2.5Z" />
    <path d="M19 14l.9 2.3 2.3.9-2.3.9L19 20.4l-.9-2.3-2.3-.9 2.3-.9L19 14Z" />
  </svg>
);
