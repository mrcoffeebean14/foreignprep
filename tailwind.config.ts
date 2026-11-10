import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Themed via CSS variables (see globals.css). The <alpha-value>
        // placeholder keeps opacity modifiers like `bg-brand-600/20` working.
        brand: {
          50: "rgb(var(--c-brand-50) / <alpha-value>)",
          100: "rgb(var(--c-brand-100) / <alpha-value>)",
          200: "rgb(var(--c-brand-200) / <alpha-value>)",
          300: "rgb(var(--c-brand-300) / <alpha-value>)",
          400: "rgb(var(--c-brand-400) / <alpha-value>)",
          500: "rgb(var(--c-brand-500) / <alpha-value>)",
          600: "rgb(var(--c-brand-600) / <alpha-value>)",
          700: "rgb(var(--c-brand-700) / <alpha-value>)",
          800: "rgb(var(--c-brand-800) / <alpha-value>)",
          900: "rgb(var(--c-brand-900) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "#14141F",
          700: "#2C2C3A",
          500: "#4A4A5C",
          400: "#6B6B7E",
          300: "#9A9AAC",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#FAFAFC",
          sunken: "#F4F4F8",
          tint: "rgb(var(--c-surface-tint) / <alpha-value>)",
        },
        accent: {
          blue: "rgb(var(--c-accent-blue) / <alpha-value>)",
          sky: "rgb(var(--c-accent-sky) / <alpha-value>)",
          amber: "rgb(var(--c-accent-amber) / <alpha-value>)",
          cream: "rgb(var(--c-accent-cream) / <alpha-value>)",
          green: "#15A66B",
          mint: "#E6F7EF",
          violet: "#7C5CF0",
          lilac: "#F0ECFE",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
        "4xl": "2.25rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(20,20,31,0.04), 0 8px 24px -12px rgba(20,20,31,0.12)",
        card: "0 2px 4px rgba(20,20,31,0.03), 0 18px 40px -20px rgba(20,20,31,0.18)",
        lift: "0 10px 20px -8px rgba(20,20,31,0.12), 0 30px 60px -28px rgb(var(--c-brand-600) / 0.28)",
        glow: "0 0 0 1px rgb(var(--c-brand-500) / 0.16), 0 20px 50px -24px rgb(var(--c-brand-500) / 0.45)",
      },
      maxWidth: {
        container: "80rem",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-500px 0" },
          "100%": { backgroundPosition: "500px 0" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.2s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
