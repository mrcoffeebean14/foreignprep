import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FFF1F3",
          100: "#FFE0E5",
          200: "#FFC5CE",
          300: "#FF9CAC",
          400: "#FA6280",
          500: "#ED2D52",
          600: "#D81239",
          700: "#B60C2E",
          800: "#8F0A24",
          900: "#6B0A1D",
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
          tint: "#FFF6F7",
        },
        accent: {
          blue: "#2E6FF2",
          sky: "#E8F0FE",
          amber: "#F5A623",
          cream: "#FFF6E3",
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
        lift: "0 10px 20px -8px rgba(20,20,31,0.12), 0 30px 60px -28px rgba(216,18,57,0.28)",
        glow: "0 0 0 1px rgba(237,45,82,0.16), 0 20px 50px -24px rgba(237,45,82,0.45)",
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
