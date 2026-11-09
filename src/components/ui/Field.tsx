"use client";

import type { InputHTMLAttributes, SelectHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "focus-ring h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-ink transition placeholder:text-ink-300";

export function TextField({
  label,
  error,
  hint,
  icon,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">
        {label}
      </span>
      <span className="relative block">
        {icon ? (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300">
            {icon}
          </span>
        ) : null}
        <input
          className={cn(
            base,
            icon ? "pl-10" : null,
            error
              ? "border-brand-500 ring-1 ring-brand-200"
              : "border-ink-300/35 hover:border-ink-300/60 focus:border-brand-400",
            className,
          )}
          {...props}
        />
      </span>
      {error ? (
        <span className="mt-1.5 block text-xs font-medium text-brand-600">{error}</span>
      ) : hint ? (
        <span className="mt-1.5 block text-xs text-ink-400">{hint}</span>
      ) : null}
    </label>
  );
}

export function SelectField({
  label,
  error,
  options,
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">
        {label}
      </span>
      <select
        className={cn(
          base,
          "appearance-none bg-[length:1rem] bg-[right_0.9rem_center] bg-no-repeat pr-10",
          error
            ? "border-brand-500 ring-1 ring-brand-200"
            : "border-ink-300/35 hover:border-ink-300/60 focus:border-brand-400",
          className,
        )}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236B6B7E' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
        }}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? (
        <span className="mt-1.5 block text-xs font-medium text-brand-600">{error}</span>
      ) : null}
    </label>
  );
}
