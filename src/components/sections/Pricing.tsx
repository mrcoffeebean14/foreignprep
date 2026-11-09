"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Shield, Users, Wallet, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { useApp } from "@/components/providers/AppProvider";
import { cn, formatINR } from "@/lib/utils";
import { BILLING_CYCLES, PLANS, type BillingCycle } from "@/data/mockData";

/** raw months a cycle covers, used only for the struck-through comparison price */
const RAW_MONTHS: Record<BillingCycle, number> = {
  monthly: 1,
  quarterly: 3,
  complete: 6,
};

const REASSURANCE = [
  { icon: Shield, label: "7-day refund" },
  { icon: Wallet, label: "No-cost EMI available" },
  { icon: Users, label: "Free batch switch" },
];

export function Pricing() {
  const { openPlan, openCounseling } = useApp();
  const [cycleId, setCycleId] = useState<BillingCycle>("quarterly");
  const activeCycle =
    BILLING_CYCLES.find((cycle) => cycle.id === cycleId) ?? BILLING_CYCLES[0];

  return (
    <section id="pricing" className="radial-tint relative bg-white py-16 md:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Pricing"
            title={
              <>
                One fee, <span className="text-gradient-brand">no surprises</span> at
                checkout
              </>
            }
            subtitle="Classes, mocks, evaluations and recordings are all included. Pick the level of hand-holding you want, and switch plans any time before your test date."
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-10 flex flex-col items-center gap-3">
          <div
            role="group"
            aria-label="Billing cycle"
            className="inline-flex max-w-full flex-wrap justify-center gap-1 rounded-full bg-surface-sunken p-1"
          >
            {BILLING_CYCLES.map((cycle) => {
              const active = cycle.id === cycleId;
              return (
                <button
                  key={cycle.id}
                  type="button"
                  onClick={() => setCycleId(cycle.id)}
                  aria-pressed={active}
                  className={cn(
                    "focus-ring relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    active ? "text-ink" : "text-ink-500 hover:text-ink",
                  )}
                >
                  {active ? (
                    <motion.span
                      layoutId="billingPill"
                      className="absolute inset-0 rounded-full bg-white shadow-soft"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                  <span className="relative z-10 inline-flex items-center gap-2">
                    {cycle.label}
                    {cycle.discount ? (
                      <span className="rounded-full bg-accent-mint px-2 py-0.5 text-[11px] font-bold text-accent-green">
                        {cycle.discount}
                      </span>
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-sm text-ink-400">{activeCycle.note}</p>
        </Reveal>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
          {PLANS.map((plan, index) => {
            const price = Math.round(plan.basePrice * activeCycle.multiplier);
            const compareAt = plan.basePrice * RAW_MONTHS[activeCycle.id];
            return (
              <Reveal key={plan.id} delay={0.06 * index} className="h-full">
                <div
                  className={cn(
                    "card-base relative flex h-full flex-col rounded-3xl border border-ink-300/20 bg-white transition duration-200 hover:-translate-y-1",
                    plan.popular
                      ? "p-6 shadow-glow ring-2 ring-brand-500 sm:p-8 lg:-mt-4"
                      : "p-6 shadow-card",
                  )}
                >
                  {plan.popular ? (
                    <Badge
                      tone="brand"
                      className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap shadow-soft"
                    >
                      Most popular
                    </Badge>
                  ) : null}

                  <h3 className="text-xl font-extrabold text-ink">{plan.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    {plan.tagline}
                  </p>
                  <span className="mt-4 inline-flex w-fit rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-ink-500">
                    Best for {plan.bestFor}
                  </span>

                  <div className="mt-6 flex flex-wrap items-end gap-x-2 gap-y-1">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={price}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.22 }}
                        className="text-4xl font-extrabold tracking-[-0.02em] text-ink"
                      >
                        {formatINR(price)}
                      </motion.span>
                    </AnimatePresence>
                    <span className="pb-1 text-sm text-ink-400">
                      {activeCycle.period}
                    </span>
                    {activeCycle.discount ? (
                      <span className="pb-1 text-sm text-ink-300 line-through">
                        {formatINR(compareAt)}
                      </span>
                    ) : null}
                  </div>

                  <ul className="mt-6 flex flex-col gap-3 border-t border-ink-300/20 pt-6">
                    {plan.features.map((feature) => (
                      <li key={feature.label} className="flex items-start gap-3">
                        {feature.included ? (
                          <CheckCircle2
                            className="mt-0.5 h-5 w-5 shrink-0 text-brand-600"
                            aria-hidden="true"
                          />
                        ) : (
                          <X
                            className="mt-0.5 h-5 w-5 shrink-0 text-ink-300"
                            aria-hidden="true"
                          />
                        )}
                        <span
                          className={cn(
                            "text-sm leading-relaxed",
                            feature.included ? "text-ink" : "text-ink-300",
                          )}
                        >
                          {feature.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-0">
                    <Button
                      fullWidth
                      size="lg"
                      variant={plan.popular ? "primary" : "outline"}
                      onClick={() => openPlan(plan, activeCycle.id)}
                    >
                      Choose {plan.name}
                    </Button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1} className="mt-12">
          <div className="flex flex-col items-center gap-6 rounded-3xl border border-ink-300/20 bg-surface-muted px-6 py-8 text-center">
            <ul className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
              {REASSURANCE.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-2 text-sm font-semibold text-ink"
                >
                  <item.icon className="h-5 w-5 text-brand-600" aria-hidden="true" />
                  {item.label}
                </li>
              ))}
            </ul>
            <p className="text-sm text-ink-500">
              Not sure which plan fits your timeline?{" "}
              <button
                type="button"
                onClick={openCounseling}
                className="focus-ring rounded-sm font-semibold text-brand-600 underline decoration-brand-200 decoration-2 underline-offset-4 hover:text-brand-700"
              >
                Book a free counselling call
              </button>{" "}
              and we will pick it with you.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
