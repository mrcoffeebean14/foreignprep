"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Lock,
  MapPin,
  Phone,
  Route,
  Target,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { useApp } from "@/components/providers/AppProvider";
import {
  DESTINATIONS,
  EXAM_SCALES,
  INTAKES,
  PLANS,
  type ExamId,
} from "@/data/mockData";

const TIMELINE_STEPS = [
  {
    title: "Diagnostic",
    body: "Baseline test, section-wise error map, pacing targets.",
    share: 0.12,
  },
  {
    title: "Foundations",
    body: "Concepts and technique for the two sections costing you most.",
    share: 0.45,
  },
  {
    title: "Drills & mocks",
    body: "Timed sets twice a week, error log driving every repeat.",
    share: 0.8,
  },
  {
    title: "Test window",
    body: "Full simulations, stamina plan, booking the date.",
    share: 1,
  },
];

const PLAN_REASONS: Record<string, string> = {
  "self-paced":
    "Your gap is small enough to close with drills and mocks on your own clock.",
  "pro-live":
    "A gap this size moves fastest with daily live classes plus unlimited AI feedback.",
  elite:
    "A long runway deserves a dedicated mentor and the admissions desk working in parallel.",
};

export function EligibilityCalculator() {
  const { openPlan, openCounseling } = useApp();

  const [examId, setExamId] = useState<ExamId>(EXAM_SCALES[0].id);
  const [current, setCurrent] = useState(EXAM_SCALES[0].defaultCurrent);
  const [target, setTarget] = useState(EXAM_SCALES[0].defaultTarget);
  const [intakeId, setIntakeId] = useState(INTAKES[0].id);
  const [destId, setDestId] = useState(DESTINATIONS[0].id);

  const scale = EXAM_SCALES.find((s) => s.id === examId) ?? EXAM_SCALES[0];
  const destination =
    DESTINATIONS.find((d) => d.id === destId) ?? DESTINATIONS[0];

  const result = useMemo(() => {
    const gap = Math.max(0, target - current);
    const rawWeeks = Math.max(2, Math.ceil(gap / scale.weeklyGain));
    const capped = rawWeeks > 24;
    const weeks = capped ? 24 : rawWeeks;

    const planId =
      weeks <= 4 ? "self-paced" : weeks <= 10 ? "pro-live" : "elite";
    const plan = PLANS.find((p) => p.id === planId) ?? PLANS[1];

    let cursor = 1;
    const timeline = TIMELINE_STEPS.map((step, i) => {
      const end =
        i === TIMELINE_STEPS.length - 1
          ? weeks
          : Math.min(weeks, Math.max(cursor, Math.round(weeks * step.share)));
      const range = cursor === end ? `Week ${cursor}` : `Week ${cursor}–${end}`;
      cursor = Math.min(weeks, end + 1);
      return { title: step.title, body: step.body, range };
    });

    const span = scale.max - scale.min;
    const normalised = (target - scale.min) / span;
    const scoreFor = (cutoff: number) => scale.min + cutoff * span;
    const deltaLabel = (cutoff: number) => {
      const delta = Math.max(scale.step, scoreFor(cutoff) - target);
      return scale.step < 1
        ? `${delta.toFixed(1)} band`
        : `${Math.ceil(delta)} points`;
    };

    const tiers = destination.tiers.map((t) => {
      const cutoff =
        t.tier === "Ambitious"
          ? destination.ambitiousCutoff
          : t.tier === "Target"
            ? destination.targetCutoff
            : 0;
      const unlocked = normalised >= cutoff;
      return {
        tier: t.tier,
        schools: t.schools,
        unlocked,
        hint: unlocked ? "" : `Raise your target by ${deltaLabel(cutoff)}`,
      };
    });

    return { gap, weeks, capped, plan, timeline, tiers };
  }, [current, target, scale, destination]);

  const weeksLabel = result.capped ? "24+" : String(result.weeks);

  function onCurrentChange(value: number) {
    setCurrent(value);
    if (value > target) setTarget(value);
  }

  function onTargetChange(value: number) {
    setTarget(value);
    if (value < current) setCurrent(value);
  }

  function onExamChange(id: ExamId) {
    const next = EXAM_SCALES.find((s) => s.id === id) ?? EXAM_SCALES[0];
    setExamId(next.id);
    setCurrent(next.defaultCurrent);
    setTarget(next.defaultTarget);
  }

  return (
    <section id="calculator" className="section-pad bg-surface-tint">
      <Container>
        <SectionHeading
          eyebrow="Eligibility calculator"
          title={
            <>
              See the score, the timeline and the{" "}
              <span className="text-gradient-brand">universities</span> that
              follow
            </>
          }
          subtitle="Move the sliders. Everything on the right recalculates — weeks of prep, the plan that fits and which university tiers open up for your target country."
        />

        <Reveal className="mt-12">
          <div className="card-base grid overflow-hidden rounded-3xl lg:grid-cols-5">
            {/* ---------------- controls ---------------- */}
            <div className="bg-white p-6 md:p-8 lg:col-span-3">
              <fieldset>
                <legend className="text-sm font-bold text-ink">
                  1. Which test are you taking?
                </legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {EXAM_SCALES.map((s) => {
                    const active = s.id === examId;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => onExamChange(s.id)}
                        className={cn(
                          "focus-ring rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                          active
                            ? "border-brand-600 bg-brand-600 text-white"
                            : "border-ink-300/30 bg-white text-ink-500 hover:border-brand-400 hover:text-brand-700",
                        )}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="calc-current"
                    className="text-sm font-bold text-ink"
                  >
                    2. Your current score
                  </label>
                  <p className="mt-2 text-3xl font-extrabold tracking-[-0.02em] text-brand-600">
                    {scale.format(current)}
                  </p>
                  <input
                    id="calc-current"
                    type="range"
                    min={scale.min}
                    max={scale.max}
                    step={scale.step}
                    value={current}
                    onChange={(e) => onCurrentChange(Number(e.target.value))}
                    className="focus-ring mt-3 w-full accent-brand-600"
                  />
                  <div className="mt-1 flex justify-between text-xs font-medium text-ink-400">
                    <span>{scale.format(scale.min)}</span>
                    <span>{scale.format(scale.max)}</span>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="calc-target"
                    className="text-sm font-bold text-ink"
                  >
                    3. Your target score
                  </label>
                  <p className="mt-2 text-3xl font-extrabold tracking-[-0.02em] text-brand-600">
                    {scale.format(target)}
                  </p>
                  <input
                    id="calc-target"
                    type="range"
                    min={scale.min}
                    max={scale.max}
                    step={scale.step}
                    value={target}
                    onChange={(e) => onTargetChange(Number(e.target.value))}
                    className="focus-ring mt-3 w-full accent-brand-600"
                  />
                  <div className="mt-1 flex justify-between text-xs font-medium text-ink-400">
                    <span>{scale.format(scale.min)}</span>
                    <span>{scale.format(scale.max)}</span>
                  </div>
                </div>
              </div>

              <fieldset className="mt-8">
                <legend className="text-sm font-bold text-ink">
                  4. Target intake
                </legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {INTAKES.map((intake) => {
                    const active = intake.id === intakeId;
                    return (
                      <label
                        key={intake.id}
                        className={cn(
                          "cursor-pointer rounded-2xl border p-4 transition hover:-translate-y-1",
                          active
                            ? "border-brand-600 bg-brand-50"
                            : "border-ink-300/20 bg-surface-muted hover:border-brand-400",
                        )}
                      >
                        <input
                          type="radio"
                          name="calc-intake"
                          value={intake.id}
                          checked={active}
                          onChange={() => setIntakeId(intake.id)}
                          className="focus-ring h-4 w-4 accent-brand-600"
                        />
                        <span className="mt-2 block text-sm font-bold text-ink">
                          {intake.label}
                        </span>
                        <span className="mt-1 block text-xs text-ink-500">
                          {intake.deadline}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="mt-8">
                <legend className="text-sm font-bold text-ink">
                  5. Target country
                </legend>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {DESTINATIONS.map((dest) => {
                    const active = dest.id === destId;
                    return (
                      <button
                        key={dest.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setDestId(dest.id)}
                        className={cn(
                          "focus-ring flex items-center gap-2 rounded-2xl border px-3 py-3 text-left text-sm font-semibold transition hover:-translate-y-1",
                          active
                            ? "border-brand-600 bg-brand-50 text-brand-700"
                            : "border-ink-300/20 bg-white text-ink-500 hover:border-brand-400",
                        )}
                      >
                        <span aria-hidden="true" className="text-lg">
                          {dest.flag}
                        </span>
                        <span className="min-w-0 break-words">
                          {dest.country}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            </div>

            {/* ---------------- live result ---------------- */}
            <div className="bg-ink p-6 text-white md:p-8 lg:col-span-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/50">
                <Target className="h-4 w-4" aria-hidden="true" />
                Your plan
              </div>

              <div className="mt-4 flex items-end gap-3">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={weeksLabel}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="text-5xl font-extrabold leading-none tracking-[-0.02em]"
                  >
                    {weeksLabel}
                  </motion.span>
                </AnimatePresence>
                <span className="pb-1 text-sm font-semibold text-white/60">
                  weeks of focused prep
                </span>
              </div>
              <p className="mt-2 text-sm text-white/60">
                Closing {scale.format(current)} to {scale.format(target)} on{" "}
                {scale.label}
                {result.gap === 0
                  ? " — you are already at target, so this is a maintenance block."
                  : "."}
              </p>

              <div className="mt-6 rounded-2xl bg-white/10 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/50">
                      Recommended plan
                    </p>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.p
                        key={result.plan.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22 }}
                        className="mt-1 text-lg font-extrabold tracking-[-0.02em]"
                      >
                        {result.plan.name}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  <Badge tone="brand">{result.plan.bestFor}</Badge>
                </div>
                <p className="mt-2 text-sm text-white/70">
                  {PLAN_REASONS[result.plan.id] ?? result.plan.tagline}
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-4"
                  iconRight={<ArrowRight className="h-4 w-4" />}
                  onClick={() => openPlan(result.plan, "complete")}
                >
                  See what this plan includes
                </Button>
              </div>

              <div className="mt-8">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/50">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  Study timeline
                </p>
                <div className="relative mt-4 pl-6">
                  <span
                    aria-hidden="true"
                    className="absolute left-[5px] top-2 h-[calc(100%-1rem)] w-px bg-white/20"
                  />
                  <ul className="space-y-5">
                    {result.timeline.map((step) => (
                      <li key={step.title} className="relative">
                        <span
                          aria-hidden="true"
                          className="absolute -left-6 top-1.5 h-2.5 w-2.5 rounded-full bg-brand-600 ring-4 ring-brand-600/20"
                        />
                        <p className="text-sm font-bold">
                          {step.title}
                          <span className="ml-2 text-xs font-semibold text-white/50">
                            {step.range}
                          </span>
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-white/60">
                          {step.body}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/50">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {destination.country} shortlist
                </p>
                <ul className="mt-4 space-y-3">
                  {result.tiers.map((tier) => (
                    <li
                      key={tier.tier}
                      className={cn(
                        "rounded-2xl p-3",
                        tier.unlocked ? "bg-white/5" : "bg-white/5 opacity-60",
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {tier.unlocked ? (
                          <CheckCircle2
                            className="h-4 w-4 text-accent-mint"
                            aria-hidden="true"
                          />
                        ) : (
                          <Lock
                            className="h-4 w-4 text-white/40"
                            aria-hidden="true"
                          />
                        )}
                        <span className="text-sm font-bold">{tier.tier}</span>
                        {!tier.unlocked ? (
                          <span className="ml-auto text-right text-xs font-semibold text-white/50">
                            {tier.hint}
                          </span>
                        ) : null}
                      </div>
                      {tier.unlocked ? (
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.div
                            key={`${destination.id}-${tier.tier}`}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            className="mt-2 flex flex-wrap gap-2"
                          >
                            {tier.schools.map((school) => (
                              <span
                                key={school}
                                className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-medium text-white/80"
                              >
                                {school}
                              </span>
                            ))}
                          </motion.div>
                        </AnimatePresence>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-3">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-white/50">
                    <Wallet className="h-3.5 w-3.5" aria-hidden="true" />
                    Cost per year
                  </p>
                  <p className="mt-1 text-sm font-bold">
                    {destination.costPerYear}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-white/50">
                    <Route className="h-3.5 w-3.5" aria-hidden="true" />
                    Work rights
                  </p>
                  <p className="mt-1 text-sm font-bold">
                    {destination.workRights}
                  </p>
                </div>
              </div>

              <Button
                fullWidth
                size="lg"
                variant="light"
                className="mt-6"
                iconLeft={<Phone className="h-4 w-4" />}
                onClick={openCounseling}
              >
                Get this plan on a call
              </Button>
              <p className="mt-3 text-center text-xs text-white/50">
                Free 30-minute call. We will walk through{" "}
                {INTAKES.find((i) => i.id === intakeId)?.label ??
                  INTAKES[0].label}{" "}
                deadlines with you.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
