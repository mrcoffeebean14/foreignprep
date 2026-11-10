"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const THEMES = [
  {
    id: "crimson",
    label: "Crimson",
    description: "Red on white",
    swatch: ["#D81239", "#F5A623"],
  },
  {
    id: "azure",
    label: "Azure",
    description: "Blue and mustard",
    swatch: ["#1A4FD6", "#E0A412"],
  },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

export const THEME_STORAGE_KEY = "fp-theme";

/** Crimson is the default, so it is represented by the absence of the attribute. */
export function applyTheme(id: ThemeId) {
  const root = document.documentElement;
  if (id === "crimson") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", id);
  }
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, id);
  } catch {
    /* Storage can be unavailable (private mode); theme still applies for this page. */
  }
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<ThemeId>("crimson");

  // Read the value the inline boot script already applied, so the control
  // matches the painted page without causing a hydration mismatch.
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "azure" ? "azure" : "crimson");
  }, []);

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-ink-300/25 bg-white p-1",
        className,
      )}
    >
      {THEMES.map((option) => {
        const active = theme === option.id;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            title={`${option.label} theme — ${option.description}`}
            onClick={() => {
              setTheme(option.id);
              applyTheme(option.id);
            }}
            className={cn(
              "focus-ring relative grid h-7 w-7 place-items-center rounded-full transition",
              active
                ? "ring-2 ring-ink/70 ring-offset-1 ring-offset-white"
                : "opacity-70 hover:opacity-100",
            )}
          >
            <span
              aria-hidden="true"
              className="h-5 w-5 rounded-full"
              style={{
                backgroundImage: `linear-gradient(135deg, ${option.swatch[0]} 50%, ${option.swatch[1]} 50%)`,
              }}
            />
            {active ? (
              <Check
                aria-hidden="true"
                className="absolute h-3 w-3 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]"
                strokeWidth={3.5}
              />
            ) : null}
            <span className="sr-only">
              {option.label} theme — {option.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
