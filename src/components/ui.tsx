import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { WhatsApp } from "./Icons";

/* ------------------------------------------------------------------ */
/*  Buttons                                                           */
/* ------------------------------------------------------------------ */

type Variant = "primary" | "secondary" | "whatsapp" | "onDark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-200 select-none disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-berry-600 text-white shadow-soft hover:bg-berry-700 hover:shadow-lift active:scale-[0.98]",
  secondary:
    "bg-white text-berry-700 border border-berry-200 hover:border-berry-400 hover:bg-berry-50 active:scale-[0.98]",
  whatsapp:
    "bg-[#25D366] text-white shadow-soft hover:bg-[#1eb855] hover:shadow-lift active:scale-[0.98]",
  onDark:
    "bg-white/15 text-white border border-white/50 backdrop-blur-sm hover:bg-white/25 active:scale-[0.98]",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[0.95rem]",
};

export function btnClass(variant: Variant = "primary", size: Size = "md", extra?: string) {
  return cn(base, variants[variant], sizes[size], extra);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  return <button className={btnClass(variant, size, className)} {...props} />;
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
};

export function LinkButton({ variant = "primary", size = "md", className, ...props }: LinkButtonProps) {
  return <a className={btnClass(variant, size, className)} {...props} />;
}

type WhatsAppButtonProps = LinkButtonProps & {
  href: string;
  label?: string;
};

export function WhatsAppButton({ href, label = "WhatsApp Us", size = "md", ...props }: WhatsAppButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={btnClass("whatsapp", size, props.className)}
      {...props}
    >
      <WhatsApp className="h-[1.15em] w-[1.15em]" />
      <span>{label}</span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Layout helpers                                                    */
/* ------------------------------------------------------------------ */

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>{children}</div>;
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-xs font-bold uppercase tracking-[0.2em]",
            tone === "dark" ? "text-leaf-300" : "text-leaf-600",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl leading-tight sm:text-4xl",
          tone === "dark" ? "text-cream-50" : "text-berry-800",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-cream-200/90" : "text-bark-500",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
