"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const sizes = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-3xl",
  xl: "max-w-5xl",
};

export function Modal({
  open,
  onClose,
  children,
  size = "md",
  label,
  className,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: keyof typeof sizes;
  label: string;
  className?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-6">
          <motion.div
            className="fixed inset-0 bg-ink/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className={cn(
              "relative z-10 my-auto w-full overflow-hidden rounded-t-3xl bg-white shadow-card sm:rounded-3xl",
              sizes[size],
              className,
            )}
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="focus-ring absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-white/80 text-ink-500 ring-1 ring-ink-300/30 transition hover:bg-surface-sunken hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
            {children}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

export function ModalHeader({
  title,
  subtitle,
  className,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border-b border-ink-300/20 px-6 py-5 pr-16 sm:px-8", className)}>
      <h3 className="text-xl font-extrabold text-ink sm:text-2xl">{title}</h3>
      {subtitle ? (
        <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{subtitle}</p>
      ) : null}
    </div>
  );
}
