import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/components/providers/AppProvider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ForeignPrep — IELTS, TOEFL, GRE & GMAT prep with a study abroad desk",
  description:
    "Live classes, adaptive mock tests and AI feedback for IELTS, TOEFL, PTE, Duolingo, GRE, GMAT and SAT — plus university shortlisting, SOP review and visa guidance.",
  keywords: [
    "IELTS coaching",
    "TOEFL preparation",
    "GRE classes",
    "GMAT Focus",
    "study abroad counselling",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable}`}>
      <body className="bg-surface font-sans text-ink">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
