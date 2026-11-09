"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Calendar,
  Globe,
  GraduationCap,
  Route,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal, staggerChild, staggerParent } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/components/providers/AppProvider";
import { BENEFITS, TRUST_STATS } from "@/data/mockData";
import { cn } from "@/lib/utils";

const STAT_STYLES: { icon: LucideIcon; circle: string }[] = [
  { icon: Users, circle: "bg-accent-sky text-accent-blue" },
  { icon: Target, circle: "bg-accent-mint text-accent-green" },
  { icon: TrendingUp, circle: "bg-accent-cream text-accent-amber" },
  { icon: GraduationCap, circle: "bg-brand-50 text-brand-600" },
];

const BENEFIT_ICONS: Record<string, LucideIcon> = {
  globe: Globe,
  calendar: Calendar,
  sparkles: Sparkles,
  route: Route,
  badge: Award,
  zap: Zap,
  users: Users,
  wallet: Wallet,
};

const BENEFIT_TINTS = [
  "bg-accent-sky text-accent-blue",
  "bg-accent-mint text-accent-green",
  "bg-accent-cream text-accent-amber",
  "bg-accent-lilac text-accent-violet",
];

export function WhyUs() {
  const { openCounseling } = useApp();

  return (
    <section id="why-us" className="bg-surface-muted py-16 md:py-24">
      <Container>
        {/* Part A — trust stats */}
        <motion.ul
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {TRUST_STATS.map((stat, i) => {
            const style = STAT_STYLES[i % STAT_STYLES.length];
            const Icon = style.icon;
            return (
              <motion.li key={stat.label} variants={staggerChild}>
                <div className="h-full rounded-3xl border border-ink-300/20 bg-white p-6 text-center shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-card">
                  <span
                    className={cn(
                      "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full",
                      style.circle,
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="text-3xl font-extrabold tracking-[-0.02em] text-ink">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-ink">{stat.label}</p>
                  <p className="mt-1 text-xs text-ink-400">{stat.detail}</p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* Part B — benefits */}
        <Reveal className="mt-16 md:mt-24">
          <SectionHeading
            eyebrow="Learn smarter"
            title={
              <>
                Preparation that bends around{" "}
                <span className="text-gradient-brand">your life</span>
              </>
            }
            subtitle="Live teaching, adaptive practice and honest pricing — built so that consistency is the only thing you have to supply."
          />
        </Reveal>

        <motion.ul
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {BENEFITS.map((benefit, i) => {
            const Icon = BENEFIT_ICONS[benefit.icon] ?? Sparkles;
            return (
              <motion.li key={benefit.title} variants={staggerChild} className="h-full">
                <div className="group flex h-full flex-col rounded-3xl border border-ink-300/20 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:shadow-card">
                  <span
                    className={cn(
                      "mb-4 flex h-12 w-12 items-center justify-center rounded-2xl transition-colors duration-200 group-hover:bg-brand-600 group-hover:text-white",
                      BENEFIT_TINTS[i % BENEFIT_TINTS.length],
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-bold text-ink">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    {benefit.body}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-6">
            <p className="text-sm font-semibold text-ink-500">
              Not sure which program fits?
            </p>
            <Button
              size="lg"
              onClick={openCounseling}
              iconRight={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
            >
              Talk to a counsellor
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
