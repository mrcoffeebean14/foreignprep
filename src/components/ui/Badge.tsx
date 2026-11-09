import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeTone =
  | "brand"
  | "blue"
  | "green"
  | "amber"
  | "violet"
  | "neutral";

const tones: Record<BadgeTone, string> = {
  brand: "bg-brand-50 text-brand-700 ring-brand-200",
  blue: "bg-accent-sky text-accent-blue ring-accent-blue/20",
  green: "bg-accent-mint text-accent-green ring-accent-green/20",
  amber: "bg-accent-cream text-amber-700 ring-accent-amber/30",
  violet: "bg-accent-lilac text-accent-violet ring-accent-violet/20",
  neutral: "bg-surface-sunken text-ink-500 ring-ink-300/30",
};

export function Badge({
  tone = "neutral",
  children,
  className,
  icon,
}: {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
