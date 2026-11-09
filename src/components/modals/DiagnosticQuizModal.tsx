"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Phone,
  Target,
  Timer,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal, ModalHeader } from "@/components/ui/Modal";
import { PROGRAMS, QUIZ_QUESTIONS } from "@/data/mockData";
import { cn } from "@/lib/utils";

const LETTERS = ["A", "B", "C", "D", "E"];

const RECOMMENDED =
  PROGRAMS.find((program) => program.id === "ielts-intensive") ?? PROGRAMS[0];

function verdictFor(score: number) {
  if (score === QUIZ_QUESTIONS.length) {
    return {
      headline: "Band 7.5+ territory",
      body: "You read the traps correctly on all three. The work now is holding that accuracy under a timer, across a full-length paper.",
      tone: "green" as const,
    };
  }
  if (score === QUIZ_QUESTIONS.length - 1) {
    return {
      headline: "You are close — the gap is in one skill area",
      body: "One miss is rarely a knowledge problem. It is usually a single habit, and a focused fortnight is enough to close it.",
      tone: "amber" as const,
    };
  }
  return {
    headline: "A structured start will move this fast",
    body: "Nothing here is out of reach. With a weekly plan and graded feedback, the first band of improvement usually arrives quickest.",
    tone: "brand" as const,
  };
}

export function DiagnosticQuizModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const total = QUIZ_QUESTIONS.length;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(() =>
    QUIZ_QUESTIONS.map(() => null),
  );
  const [checked, setChecked] = useState(false);
  const [done, setDone] = useState(false);

  const reset = () => {
    setIndex(0);
    setAnswers(QUIZ_QUESTIONS.map(() => null));
    setChecked(false);
    setDone(false);
  };

  useEffect(() => {
    if (open) reset();
  }, [open]);

  const question = QUIZ_QUESTIONS[index];
  const selected = answers[index];
  const isLast = index === total - 1;
  const score = QUIZ_QUESTIONS.reduce(
    (sum, q, i) => (answers[i] === q.answerId ? sum + 1 : sum),
    0,
  );
  const verdict = verdictFor(score);

  const select = (optionId: string) => {
    if (checked) return;
    setAnswers((prev) => prev.map((a, i) => (i === index ? optionId : a)));
  };

  const advance = () => {
    if (!checked) {
      setChecked(true);
      return;
    }
    if (isLast) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
    setChecked(false);
  };

  const progress = done ? 100 : ((index + (checked ? 1 : 0)) / total) * 100;

  return (
    <Modal open={open} onClose={onClose} size="lg" label="Free diagnostic test">
      <ModalHeader
        title="3-question diagnostic"
        subtitle="A quick read on where your band sits today. Answer honestly — you get the reasoning after every question."
      />

      <div className="px-6 pt-5 sm:px-8">
        <div className="flex items-center justify-between gap-3 text-xs font-semibold text-ink-500">
          <span>{done ? "Diagnostic complete" : `Question ${index + 1} of ${total}`}</span>
          <span className="inline-flex items-center gap-1.5">
            <Timer className="h-3.5 w-3.5" aria-hidden="true" />
            About 2 minutes
          </span>
        </div>
        <div
          className="mt-2 h-1 w-full overflow-hidden rounded-full bg-surface-sunken"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          aria-label="Diagnostic progress"
        >
          <motion.div
            className="h-full rounded-full bg-brand-600"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.div
            key="result"
            className="px-6 py-6 sm:px-8"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-ink-300/20 bg-surface-tint p-5 sm:flex-row sm:items-center sm:gap-6">
              <motion.div
                className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-white shadow-card"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                <span className="font-display text-3xl font-extrabold tracking-[-0.02em] text-brand-600">
                  {score}
                  <span className="text-lg text-ink-400">/{total}</span>
                </span>
              </motion.div>
              <div>
                <Badge tone={verdict.tone}>{verdict.headline}</Badge>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {verdict.body}
                </p>
              </div>
            </div>

            <h4 className="mt-6 text-sm font-extrabold uppercase tracking-wide text-ink-400">
              Question review
            </h4>
            <ul className="mt-3 space-y-2">
              {QUIZ_QUESTIONS.map((q, i) => {
                const correct = answers[i] === q.answerId;
                return (
                  <li
                    key={q.id}
                    className="flex gap-3 rounded-2xl border border-ink-300/20 bg-white p-4 transition hover:-translate-y-1 hover:shadow-soft"
                  >
                    <span
                      className={cn(
                        "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg",
                        correct
                          ? "bg-accent-mint text-accent-green"
                          : "bg-brand-50 text-brand-600",
                      )}
                      aria-hidden="true"
                    >
                      {correct ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <X className="h-4 w-4" />
                      )}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink">
                        {q.section}
                        <span
                          className={cn(
                            "ml-2 text-xs font-bold",
                            correct ? "text-accent-green" : "text-brand-600",
                          )}
                        >
                          {correct ? "Correct" : "Missed"}
                        </span>
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-500">
                        {q.explanation}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 rounded-2xl border border-brand-200 bg-brand-50 p-5">
              <div className="flex items-start gap-3">
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-brand-600 shadow-soft"
                  aria-hidden="true"
                >
                  <GraduationCap className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-700">
                    Suggested next step
                  </p>
                  <h5 className="mt-1 font-display text-lg font-extrabold tracking-[-0.02em] text-ink">
                    {RECOMMENDED.title}
                  </h5>
                  <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-500">
                    <li className="inline-flex items-center gap-1.5">
                      <Timer className="h-4 w-4 text-brand-600" aria-hidden="true" />
                      {RECOMMENDED.duration}
                    </li>
                    <li className="inline-flex items-center gap-1.5">
                      <Target className="h-4 w-4 text-brand-600" aria-hidden="true" />
                      {RECOMMENDED.targetScore}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                fullWidth
                onClick={onClose}
                iconLeft={<Phone className="h-4 w-4" />}
              >
                Book a free counseling call
              </Button>
              <Button variant="outline" size="lg" fullWidth onClick={reset}>
                Retake the diagnostic
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={index}
            className="px-6 py-6 sm:px-8"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
              {question.section}
            </span>

            {question.passage ? (
              <div className="mt-4 rounded-2xl bg-surface-sunken p-4 text-sm leading-relaxed text-ink-500">
                <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-ink-400">
                  Passage
                </p>
                {question.passage}
              </div>
            ) : null}

            <h4 className="mt-4 text-lg font-semibold leading-snug text-ink">
              {question.prompt}
            </h4>

            <ul className="mt-4 space-y-2.5">
              {question.options.map((option, i) => {
                const isSelected = selected === option.id;
                const isAnswer = option.id === question.answerId;
                const showCorrect = checked && isAnswer;
                const showWrong = checked && isSelected && !isAnswer;
                return (
                  <li key={option.id}>
                    <button
                      type="button"
                      onClick={() => select(option.id)}
                      disabled={checked}
                      aria-pressed={isSelected}
                      className={cn(
                        "focus-ring flex w-full items-start gap-3 rounded-2xl border bg-white p-4 text-left transition",
                        !checked &&
                          "hover:border-brand-300 disabled:cursor-not-allowed",
                        isSelected && !checked
                          ? "border-brand-600 bg-brand-50 ring-1 ring-brand-600"
                          : "border-ink-300/20",
                        showCorrect &&
                          "border-accent-green/40 bg-accent-mint ring-1 ring-accent-green/30",
                        showWrong &&
                          "border-brand-400 bg-brand-50 ring-1 ring-brand-400",
                      )}
                    >
                      <span
                        className={cn(
                          "grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-bold",
                          showCorrect
                            ? "bg-accent-green text-white"
                            : showWrong
                              ? "bg-brand-600 text-white"
                              : isSelected
                                ? "bg-brand-600 text-white"
                                : "bg-surface-sunken text-ink-500",
                        )}
                        aria-hidden="true"
                      >
                        {showCorrect ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : showWrong ? (
                          <X className="h-4 w-4" />
                        ) : (
                          LETTERS[i]
                        )}
                      </span>
                      <span className="min-w-0 text-sm leading-relaxed text-ink">
                        {option.text}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <AnimatePresence initial={false}>
              {checked ? (
                <motion.div
                  key="explanation"
                  className="mt-4 overflow-hidden rounded-2xl bg-accent-sky p-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-accent-blue">
                    {selected === question.answerId
                      ? "Correct — here is why"
                      : "Why the answer is different"}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-700">
                    {question.explanation}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="mt-6">
              <Button
                size="lg"
                fullWidth
                onClick={advance}
                disabled={!selected}
                iconRight={
                  checked ? <ArrowRight className="h-4 w-4" /> : undefined
                }
              >
                {!checked
                  ? "Check answer"
                  : isLast
                    ? "See my result"
                    : "Next question"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="border-t border-ink-300/20 px-6 py-4 text-center text-xs leading-relaxed text-ink-400 sm:px-8">
        This is a short sample. The full diagnostic is 40 questions across
        Listening, Reading, Writing and Speaking, with a band-wise report.
      </p>
    </Modal>
  );
}
