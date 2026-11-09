"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  Flag,
  Mic,
  PenLine,
  Sparkles,
  Timer,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { useApp } from "@/components/providers/AppProvider";
import {
  AI_EVALUATION,
  COUNSELING_STEPS,
  MOCK_TEST_PREVIEW,
} from "@/data/mockData";

const EVAL_TABS = ["Writing", "Speaking"] as const;
type EvalTab = (typeof EVAL_TABS)[number];

const SPEAKING_LABELS = [
  "Fluency",
  "Pronunciation",
  "Lexical Resource",
  "Grammar",
];

/** deterministic waveform heights — must match on server and client */
const WAVE_BARS = Array.from({ length: 28 }, (_, i) =>
  Math.round(22 + 26 * Math.abs(Math.sin(i * 0.78)) + ((i * 11) % 13)),
);

function CriteriaRows({ tab }: { tab: EvalTab }) {
  return (
    <ul className="mt-4 space-y-3.5">
      {AI_EVALUATION.criteria.map((criterion, index) => {
        const label =
          tab === "Speaking" ? SPEAKING_LABELS[index] : criterion.label;
        const pct = (criterion.score / 9) * 100;
        return (
          <li key={label}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm font-semibold text-ink">{label}</span>
              <span className="text-sm font-bold tabular-nums text-brand-700">
                {criterion.score.toFixed(1)}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken">
              <motion.div
                className="h-full rounded-full bg-brand-600"
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.9,
                  delay: 0.08 * index,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-400">
              {criterion.note}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

function EvaluatorVisual() {
  const [tab, setTab] = useState<EvalTab>("Writing");

  return (
    <div>
      <div
        role="tablist"
        aria-label="Evaluation type"
        className="mb-4 inline-flex items-center gap-1 rounded-full border border-ink-300/20 bg-white p-1 shadow-soft"
      >
        {EVAL_TABS.map((item) => {
          const active = item === tab;
          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(item)}
              className={cn(
                "focus-ring relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                active ? "text-white" : "text-ink-500 hover:text-ink",
              )}
            >
              {active ? (
                <motion.span
                  layoutId="eval-tab-pill"
                  className="absolute inset-0 rounded-full bg-brand-600"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              ) : null}
              <span className="relative z-10 inline-flex items-center gap-1.5">
                {item === "Writing" ? (
                  <PenLine className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Mic className="h-4 w-4" aria-hidden="true" />
                )}
                {item}
              </span>
            </button>
          );
        })}
      </div>

      <div className="card-base p-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {tab === "Writing" ? (
              <>
                <p className="line-clamp-2 rounded-xl bg-surface-sunken px-3.5 py-3 text-sm leading-relaxed text-ink-700">
                  {AI_EVALUATION.prompt}
                </p>
                <p className="mt-2.5 rounded-xl border border-ink-300/20 px-3.5 py-3 text-xs leading-relaxed text-ink-400">
                  {AI_EVALUATION.response}
                </p>
              </>
            ) : (
              <>
                <p className="line-clamp-2 rounded-xl bg-surface-sunken px-3.5 py-3 text-sm leading-relaxed text-ink-700">
                  Part 2 cue card: describe a decision you made that turned out
                  better than you expected.
                </p>
                <div
                  className="mt-3 flex h-20 items-center justify-between gap-[3px] rounded-xl border border-ink-300/20 px-3"
                  aria-hidden="true"
                >
                  {WAVE_BARS.map((height, index) => (
                    <motion.span
                      key={index}
                      className="w-full rounded-full bg-brand-600/70"
                      initial={{ height: 4 }}
                      animate={{ height }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.015,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>
                <p className="mt-2 text-xs text-ink-400">
                  1:32 recorded · scored against the speaking descriptors
                </p>
              </>
            )}

            <div className="mt-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-3.5 py-1.5 text-xs font-bold text-white">
                Overall band {AI_EVALUATION.overall.toFixed(1)}
              </span>
              <span className="text-xs font-medium text-ink-400">
                returned in 48 seconds
              </span>
            </div>

            <CriteriaRows tab={tab} />

            <div className="mt-5 rounded-xl bg-surface-muted p-4">
              <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-ink-500">
                Suggested fixes
              </h4>
              <ul className="mt-2.5 space-y-2">
                {AI_EVALUATION.fixes.map((fix) => (
                  <li key={fix} className="flex gap-2.5">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600"
                      aria-hidden="true"
                    />
                    <span className="text-xs leading-relaxed text-ink-700">
                      {fix}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function MockTestVisual() {
  const { answered, total } = MOCK_TEST_PREVIEW;
  const progress = Math.round((answered / total) * 100);

  return (
    <div className="card-base overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-300/20 px-5 py-4">
        <p className="text-sm font-bold text-ink">{MOCK_TEST_PREVIEW.section}</p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-sm font-bold tabular-nums text-brand-700">
          <Timer className="h-4 w-4" aria-hidden="true" />
          {MOCK_TEST_PREVIEW.timeRemaining}
        </span>
      </div>

      <div className="p-5">
        <ul className="grid grid-cols-10 gap-1.5">
          {MOCK_TEST_PREVIEW.palette.map((item) => (
            <li
              key={item.number}
              className={cn(
                "flex aspect-square items-center justify-center rounded-md text-[10px] font-bold tabular-nums sm:text-xs",
                item.state === "answered" && "bg-brand-600 text-white",
                item.state === "flagged" &&
                  "bg-accent-amber/20 text-amber-700 ring-1 ring-inset ring-accent-amber",
                item.state === "unseen" && "bg-surface-sunken text-ink-400",
              )}
            >
              {item.number}
            </li>
          ))}
        </ul>

        <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-500">
          <li className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-sm bg-brand-600"
              aria-hidden="true"
            />
            Answered
          </li>
          <li className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-sm bg-accent-amber/30 ring-1 ring-inset ring-accent-amber"
              aria-hidden="true"
            />
            Flagged for review
          </li>
          <li className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-sm bg-surface-sunken"
              aria-hidden="true"
            />
            Not seen yet
          </li>
        </ul>

        <div className="mt-4">
          <div className="flex items-baseline justify-between text-xs font-semibold text-ink-500">
            <span>
              {answered} of {total} answered
            </span>
            <span className="tabular-nums">{progress}%</span>
          </div>
          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-surface-sunken">
            <motion.div
              className="h-full rounded-full bg-brand-600"
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {MOCK_TEST_PREVIEW.analytics.map((stat) => (
            <li
              key={stat.label}
              className="rounded-xl border border-ink-300/20 bg-surface-muted p-3"
            >
              <p className="text-xs font-semibold text-ink-500">{stat.label}</p>
              <p className="mt-1 text-xl font-extrabold tabular-nums text-ink">
                {stat.score}
                <span className="text-xs font-semibold text-ink-400">/100</span>
              </p>
              <p className="mt-0.5 inline-flex items-center gap-1 text-xs font-bold text-accent-green">
                <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                {stat.delta}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-5 rounded-xl bg-surface-muted p-4">
          <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-ink-500">
            Section scores
          </h4>
          <div className="mt-3 flex h-28 items-end justify-between gap-3">
            {MOCK_TEST_PREVIEW.analytics.map((stat, index) => (
              <div
                key={stat.label}
                className="flex h-full flex-1 flex-col items-center justify-end gap-1.5"
              >
                <span className="text-xs font-bold tabular-nums text-ink-500">
                  {stat.score}
                </span>
                <motion.div
                  className="w-full rounded-t-md bg-brand-600/80"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${stat.score}%` }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1 * index,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
                <span className="w-full truncate text-center text-[10px] font-semibold text-ink-400">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CounselingStepper() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="card-base p-5 sm:p-6">
      <ul>
        {COUNSELING_STEPS.map((step, index) => {
          const active = index === activeIndex;
          const done = index <= activeIndex;
          const last = index === COUNSELING_STEPS.length - 1;
          return (
            <li key={step.id} className="relative pb-2 pl-11 last:pb-0">
              {!last ? (
                <span
                  className={cn(
                    "absolute left-[15px] top-8 bottom-0 w-0.5 rounded-full transition-colors",
                    done ? "bg-brand-600" : "bg-ink-300/30",
                  )}
                  aria-hidden="true"
                />
              ) : null}
              <span
                className={cn(
                  "absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ring-1 ring-inset transition-colors",
                  done
                    ? "bg-brand-600 text-white ring-brand-600"
                    : "bg-white text-ink-400 ring-ink-300/40",
                )}
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-expanded={active}
                className="focus-ring flex w-full items-center justify-between gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-surface-muted"
              >
                <span>
                  <span className="block text-sm font-bold text-ink">
                    {step.title}
                  </span>
                  <span className="block text-xs font-medium text-ink-400">
                    {step.duration}
                  </span>
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-ink-400 transition-transform",
                    active && "rotate-180",
                  )}
                  aria-hidden="true"
                />
              </button>
              <AnimatePresence initial={false}>
                {active ? (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-2 pb-3 pt-1">
                      <p className="text-sm leading-relaxed text-ink-500">
                        {step.body}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent-mint px-3 py-1.5 text-xs font-semibold text-accent-green">
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        {step.deliverable}
                      </span>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-ink-300/20 pt-4">
        <Button
          variant="outline"
          size="sm"
          disabled={activeIndex === 0}
          onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
        >
          Previous
        </Button>
        <span className="text-xs font-semibold tabular-nums text-ink-400">
          Step {activeIndex + 1} of {COUNSELING_STEPS.length}
        </span>
        <Button
          variant="outline"
          size="sm"
          iconRight={<ChevronRight className="h-4 w-4" aria-hidden="true" />}
          disabled={activeIndex === COUNSELING_STEPS.length - 1}
          onClick={() =>
            setActiveIndex((i) =>
              Math.min(COUNSELING_STEPS.length - 1, i + 1),
            )
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"
            aria-hidden="true"
          >
            <Check className="h-3 w-3" />
          </span>
          <span className="text-sm leading-relaxed text-ink-500">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function PlatformFeatures() {
  const { openCounseling, openQuiz } = useApp();

  return (
    <section id="platform" className="bg-white py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="The platform"
          title={
            <>
              Practice, feedback and admissions in{" "}
              <span className="text-gradient-brand">one place</span>
            </>
          }
          subtitle="Three systems do most of the work: an evaluator that grades like an examiner, mocks that behave like the real test, and a counselling desk that stays with you till the visa."
        />

        <div className="mt-14 space-y-20 md:mt-20 md:space-y-28">
          {/* Block 1 */}
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <Badge
                tone="brand"
                icon={<Sparkles className="h-3.5 w-3.5" aria-hidden="true" />}
              >
                AI evaluation
              </Badge>
              <h3 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.02em] text-ink">
                An examiner&apos;s eye on every essay and recording
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ink-500">
                Submit a Task 2 essay or a 90-second speaking answer and get a
                band back before you lose the thread of what you wrote. Scores
                map to the official descriptors, not a vague overall number.
              </p>
              <CheckList
                items={[
                  "Criterion-wise bands with the exact descriptor you missed",
                  "Rewrite suggestions tied to the sentence that caused the drop",
                  "Every submission logged so you can watch the trend, not one score",
                ]}
              />
              <Button
                variant="link"
                size="sm"
                className="mt-6"
                iconRight={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
                onClick={openCounseling}
              >
                See how the evaluator scores your work
              </Button>
            </Reveal>
            <Reveal delay={0.12}>
              <EvaluatorVisual />
            </Reveal>
          </div>

          {/* Block 2 — visual first on large screens */}
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal className="lg:order-2">
              <Badge
                tone="blue"
                icon={<Timer className="h-3.5 w-3.5" aria-hidden="true" />}
              >
                Adaptive mocks
              </Badge>
              <h3 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.02em] text-ink">
                Full-length tests that behave like the real thing
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ink-500">
                Same timer, same navigation, same flag-and-return palette. The
                difficulty moves with your accuracy, so the score you see on
                practice day is the score you can expect on test day.
              </p>
              <CheckList
                items={[
                  "Section-adaptive difficulty modelled on the live scoring engines",
                  "Per-question timing and an error log that builds your next week",
                  "Score projection after every mock, with the delta since the last one",
                ]}
              />
              <Button
                variant="link"
                size="sm"
                className="mt-6"
                iconRight={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
                onClick={openQuiz}
              >
                Take the three-question diagnostic
              </Button>
            </Reveal>
            <Reveal delay={0.12} className="lg:order-1">
              <MockTestVisual />
            </Reveal>
          </div>

          {/* Block 3 */}
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <Badge
                tone="green"
                icon={<Flag className="h-3.5 w-3.5" aria-hidden="true" />}
              >
                Admissions desk
              </Badge>
              <h3 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.02em] text-ink">
                From a blank shortlist to a stamped visa
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ink-500">
                One counsellor owns your file through every stage, and each stage
                ends with something you can hold — a tracker, a document, a
                readiness score. No stage closes on a verbal assurance.
              </p>
              <CheckList
                items={[
                  "Twelve universities across ambitious, target and safe tiers",
                  "Two editing rounds on your SOP, LORs and resume",
                  "Visa file review plus three recorded mock interviews",
                ]}
              />
              <Button
                variant="link"
                size="sm"
                className="mt-6"
                iconRight={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
                onClick={openCounseling}
              >
                Book a free counselling call
              </Button>
            </Reveal>
            <Reveal delay={0.12}>
              <CounselingStepper />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
