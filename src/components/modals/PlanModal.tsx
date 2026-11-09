"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Loader2, Shield, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal, ModalHeader } from "@/components/ui/Modal";
import { BILLING_CYCLES } from "@/data/mockData";
import type { BillingCycle, Plan } from "@/data/mockData";
import { formatINR } from "@/lib/utils";

export function PlanModal({
  open,
  plan,
  cycle,
  onClose,
  onConfirm,
}: {
  open: boolean;
  plan: Plan | null;
  cycle: BillingCycle;
  onClose: () => void;
  onConfirm: (plan: Plan) => void;
}) {
  const [activeCycle, setActiveCycle] = useState<BillingCycle>(cycle);
  const [showExcluded, setShowExcluded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    if (!open) return;
    setActiveCycle(cycle);
    setShowExcluded(false);
    setSubmitting(false);
  }, [open, cycle]);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const cycleObj =
    BILLING_CYCLES.find((c) => c.id === activeCycle) ?? BILLING_CYCLES[0];
  const price = plan ? Math.round(plan.basePrice * cycleObj.multiplier) : 0;
  const gst = Math.round(price * 0.18);
  const included = plan ? plan.features.filter((f) => f.included) : [];
  const excluded = plan ? plan.features.filter((f) => !f.included) : [];

  const handleConfirm = () => {
    if (!plan || submitting) return;
    setSubmitting(true);
    timer.current = setTimeout(() => {
      setSubmitting(false);
      onConfirm(plan);
    }, 800);
  };

  return (
    <Modal open={open} onClose={onClose} size="md" label="Confirm your plan">
      {plan ? (
        <div className="flex max-h-[88vh] flex-col">
          <ModalHeader
            title="Confirm your plan"
            subtitle="Review what is included before you continue."
          />

          <div className="overflow-y-auto p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <h4 className="text-lg font-extrabold text-ink">{plan.name}</h4>
              {plan.popular ? <Badge tone="brand">Most popular</Badge> : null}
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
              {plan.tagline}
            </p>

            <div className="mt-5 rounded-2xl border border-ink-300/20 bg-surface-muted p-5">
              <div className="flex flex-wrap items-end gap-2">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={price}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="text-3xl font-extrabold text-ink sm:text-4xl"
                  >
                    {formatINR(price)}
                  </motion.span>
                </AnimatePresence>
                <span className="pb-1 text-sm font-semibold text-ink-400">
                  {cycleObj.period}
                </span>
                {cycleObj.discount ? (
                  <Badge tone="green" className="mb-1">
                    {cycleObj.discount}
                  </Badge>
                ) : null}
              </div>
              <p className="mt-1 text-xs text-ink-400">{cycleObj.note}</p>

              <div
                role="group"
                aria-label="Billing cycle"
                className="mt-4 flex flex-wrap gap-2"
              >
                {BILLING_CYCLES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveCycle(c.id)}
                    aria-pressed={c.id === activeCycle}
                    className={`focus-ring rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                      c.id === activeCycle
                        ? "bg-brand-600 text-white"
                        : "bg-white text-ink-500 ring-1 ring-inset ring-ink-300/30 hover:text-ink"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <ul className="mt-6 space-y-3">
              {included.map((feature) => (
                <li
                  key={feature.label}
                  className="flex gap-3 text-sm leading-relaxed text-ink-700"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  <span>{feature.label}</span>
                </li>
              ))}
            </ul>

            {excluded.length > 0 ? (
              <div className="mt-5 overflow-hidden rounded-2xl border border-ink-300/20">
                <button
                  type="button"
                  onClick={() => setShowExcluded((v) => !v)}
                  aria-expanded={showExcluded}
                  className="focus-ring flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-surface-muted"
                >
                  <span className="text-sm font-semibold text-ink-500">
                    Not included ({excluded.length})
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-ink-400 transition-transform duration-200 ${
                      showExcluded ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {showExcluded ? (
                    <motion.div
                      key="excluded"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-2.5 border-t border-ink-300/20 px-4 py-3">
                        {excluded.map((feature) => (
                          <li
                            key={feature.label}
                            className="flex gap-3 text-sm leading-relaxed text-ink-400"
                          >
                            <X className="mt-0.5 h-4 w-4 shrink-0 text-ink-300" />
                            <span>{feature.label}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            ) : null}

            <dl className="mt-6 space-y-2 rounded-2xl bg-surface-sunken p-5 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-ink-500">Subtotal</dt>
                <dd className="font-semibold text-ink">{formatINR(price)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-500">GST (18%)</dt>
                <dd className="font-semibold text-ink">{formatINR(gst)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-ink-300/20 pt-2">
                <dt className="font-bold text-ink">Total payable</dt>
                <dd className="text-base font-extrabold text-ink">
                  {formatINR(price + gst)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="border-t border-ink-300/20 bg-white p-4 sm:px-8 sm:py-5">
            <Button
              size="lg"
              fullWidth
              onClick={handleConfirm}
              disabled={submitting}
              iconLeft={
                submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : undefined
              }
            >
              {submitting ? "Confirming" : "Confirm and continue"}
            </Button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-ink-400">
              <Shield className="h-3.5 w-3.5" />
              Full refund within 7 days of enrolment, up to two live classes attended.
            </p>
            <Button variant="ghost" fullWidth className="mt-2" onClick={onClose}>
              Keep comparing
            </Button>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
