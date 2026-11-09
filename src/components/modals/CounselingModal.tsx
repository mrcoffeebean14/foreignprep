"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Globe,
  Phone,
  Target,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TextField, SelectField } from "@/components/ui/Field";
import { Modal, ModalHeader } from "@/components/ui/Modal";
import {
  COUNSELING_GOALS,
  DESTINATIONS,
  EXAM_OPTIONS,
  INTAKES,
  TIME_SLOTS,
} from "@/data/mockData";
import { cn, isPhone } from "@/lib/utils";

const STEP_LABELS = ["Goal", "Target", "Slot", "Done"];
const PICK = "Select an option";

const EXAM_CHOICES = [PICK, ...EXAM_OPTIONS];
const COUNTRY_CHOICES = [PICK, ...DESTINATIONS.map((d) => d.country)];
const INTAKE_CHOICES = [PICK, ...INTAKES.map((i) => i.label)];
const SLOT_DAYS = Array.from(new Set(TIME_SLOTS.map((s) => s.day)));

const stepVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

export function CounselingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [goalId, setGoalId] = useState("");
  const [exam, setExam] = useState(PICK);
  const [country, setCountry] = useState(PICK);
  const [intake, setIntake] = useState(PICK);
  const [score, setScore] = useState("");
  const [slotId, setSlotId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  useEffect(() => {
    if (!open) return;
    setStep(1);
    setDirection(1);
    setGoalId("");
    setExam(PICK);
    setCountry(PICK);
    setIntake(PICK);
    setScore("");
    setSlotId("");
    setName("");
    setPhone("");
    setNameTouched(false);
    setPhoneTouched(false);
  }, [open]);

  const goal = COUNSELING_GOALS.find((g) => g.id === goalId);
  const slot = TIME_SLOTS.find((s) => s.id === slotId);

  const nameError = nameTouched && !name.trim() ? "Tell us your name" : undefined;
  const phoneError =
    phoneTouched && !isPhone(phone) ? "Enter a valid 10-digit number" : undefined;

  const stepValid =
    step === 1
      ? Boolean(goalId)
      : step === 2
        ? exam !== PICK && country !== PICK && intake !== PICK
        : Boolean(slotId) && name.trim().length > 0 && isPhone(phone);

  const goNext = () => {
    if (!stepValid) return;
    setDirection(1);
    setStep((s) => Math.min(4, s + 1));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(1, s - 1));
  };

  const progress = ((step - 1) / (STEP_LABELS.length - 1)) * 100;

  return (
    <Modal open={open} onClose={onClose} size="lg" label="Book free counseling">
      <ModalHeader
        title="Book free counseling"
        subtitle="A 30-minute call on your profile, budget and a realistic intake plan. No charge, no sales script."
      />

      <div className="border-b border-ink-300/20 px-6 py-6 sm:px-8">
        <div className="relative">
          <div className="absolute left-4 right-4 top-3.5">
            <div className="h-1 w-full rounded-full bg-surface-sunken" />
            <motion.div
              className="absolute left-0 top-0 h-1 rounded-full bg-brand-600"
              initial={false}
              animate={{ width: progress + "%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <ol className="relative flex items-start justify-between">
            {STEP_LABELS.map((label, index) => {
              const number = index + 1;
              const done = number < step;
              const current = number === step;
              return (
                <li
                  key={label}
                  className="flex w-16 flex-col items-center gap-2 text-center"
                  aria-current={current ? "step" : undefined}
                >
                  <span
                    className={cn(
                      "grid h-8 w-8 place-items-center rounded-full border-2 bg-white text-xs font-bold transition-colors",
                      done && "border-brand-600 bg-brand-600 text-white",
                      current && "border-brand-600 text-brand-700",
                      !done && !current && "border-ink-300/40 text-ink-400",
                    )}
                  >
                    {done ? <Check className="h-4 w-4" /> : number}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-semibold",
                      current || done ? "text-ink" : "text-ink-400",
                    )}
                  >
                    {label}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <div className="max-h-[60vh] overflow-y-auto px-6 py-6 sm:px-8">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          {step === 1 ? (
            <motion.div
              key="step-1"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <h4 className="text-lg font-extrabold tracking-[-0.02em] text-ink">
                What are you aiming for?
              </h4>
              <p className="mt-1 text-sm text-ink-500">
                Pick the one closest to your situation. It decides who takes your call.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {COUNSELING_GOALS.map((item) => {
                  const selected = item.id === goalId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setGoalId(item.id)}
                      aria-pressed={selected}
                      className={cn(
                        "focus-ring relative rounded-2xl border p-4 text-left transition hover:-translate-y-1",
                        selected
                          ? "border-brand-600 bg-brand-50 ring-2 ring-brand-600"
                          : "border-ink-300/20 bg-white hover:border-brand-400",
                      )}
                    >
                      {selected ? (
                        <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-brand-600 text-white">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                      ) : null}
                      <span className="block pr-8 text-sm font-bold text-ink">
                        {item.title}
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-ink-500">
                        {item.body}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : null}

          {step === 2 ? (
            <motion.div
              key="step-2"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <h4 className="text-lg font-extrabold tracking-[-0.02em] text-ink">
                Your target
              </h4>
              <p className="mt-1 text-sm text-ink-500">
                Three answers and we will bring the right numbers to the call.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <SelectField
                  label="Target exam"
                  options={EXAM_CHOICES}
                  value={exam}
                  onChange={(e) => setExam(e.target.value)}
                />
                <SelectField
                  label="Preferred country"
                  options={COUNTRY_CHOICES}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                <SelectField
                  label="Intake"
                  options={INTAKE_CHOICES}
                  value={intake}
                  onChange={(e) => setIntake(e.target.value)}
                />
                <TextField
                  label="Current score (if any)"
                  hint="Optional — leave it blank if you have not tested yet."
                  placeholder="e.g. Band 6.5 or 302"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                />
              </div>
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-ink-300/20 bg-accent-sky p-4">
                <Target className="mt-0.5 h-5 w-5 shrink-0 text-accent-blue" />
                <p className="text-sm leading-relaxed text-ink-700">
                  No score yet is completely fine. Your counsellor will run a quick
                  diagnostic estimate live on the call.
                </p>
              </div>
            </motion.div>
          ) : null}

          {step === 3 ? (
            <motion.div
              key="step-3"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <h4 className="text-lg font-extrabold tracking-[-0.02em] text-ink">
                Pick a slot
              </h4>
              <p className="mt-1 text-sm text-ink-500">
                Every call runs 30 minutes on video. Reschedule any time from the link we
                send you.
              </p>

              <div className="mt-5 space-y-5">
                {SLOT_DAYS.map((day) => (
                  <div key={day}>
                    <div className="mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-ink-400" />
                      <h5 className="text-xs font-semibold uppercase tracking-wide text-ink-500">
                        {day}
                      </h5>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {TIME_SLOTS.filter((s) => s.day === day).map((s) => {
                        const selected = s.id === slotId;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setSlotId(s.id)}
                            aria-pressed={selected}
                            className={cn(
                              "focus-ring rounded-2xl border p-3 text-left transition hover:-translate-y-1",
                              selected
                                ? "border-brand-600 bg-brand-50 ring-2 ring-brand-600"
                                : "border-ink-300/20 bg-white hover:border-brand-400",
                            )}
                          >
                            <span className="flex items-center gap-2">
                              <Clock
                                className={cn(
                                  "h-4 w-4",
                                  selected ? "text-brand-600" : "text-ink-400",
                                )}
                              />
                              <span className="text-sm font-bold text-ink">{s.time}</span>
                            </span>
                            <span className="mt-1 block text-xs text-ink-400">
                              {s.day}
                            </span>
                            <span className="mt-1 block text-xs text-ink-500">
                              {s.left} slots left
                            </span>
                            {s.left <= 1 ? (
                              <Badge tone="amber" className="mt-2">
                                Almost full
                              </Badge>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <TextField
                  label="Full name"
                  placeholder="Your name"
                  autoComplete="name"
                  icon={<Users className="h-4 w-4" />}
                  value={name}
                  error={nameError}
                  onBlur={() => setNameTouched(true)}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  label="Phone number"
                  type="tel"
                  inputMode="tel"
                  placeholder="10-digit mobile"
                  autoComplete="tel"
                  icon={<Phone className="h-4 w-4" />}
                  value={phone}
                  error={phoneError}
                  hint="We can call on WhatsApp if you prefer."
                  onBlur={() => setPhoneTouched(true)}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </motion.div>
          ) : null}

          {step === 4 ? (
            <motion.div
              key="step-4"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
                className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-brand-50"
              >
                <CheckCircle2 className="h-10 w-10 text-brand-600" />
              </motion.div>

              <h4 className="mt-5 text-2xl font-extrabold tracking-[-0.02em] text-ink">
                Your call is booked
              </h4>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-500">
                A counsellor will dial the number you shared, at the slot below.
              </p>

              <dl className="mt-6 space-y-3 rounded-2xl border border-ink-300/20 bg-surface-muted p-5 text-left">
                <div className="flex items-start justify-between gap-4">
                  <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
                    <Target className="h-4 w-4" /> Goal
                  </dt>
                  <dd className="text-right text-sm font-semibold text-ink">
                    {goal ? goal.title : "Not selected"}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-ink-500">
                    Exam
                  </dt>
                  <dd className="text-right text-sm font-semibold text-ink">{exam}</dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
                    <Globe className="h-4 w-4" /> Country
                  </dt>
                  <dd className="text-right text-sm font-semibold text-ink">{country}</dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-ink-500">
                    Intake
                  </dt>
                  <dd className="text-right text-sm font-semibold text-ink">{intake}</dd>
                </div>
                <div className="flex items-start justify-between gap-4 border-t border-ink-300/20 pt-3">
                  <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
                    <Clock className="h-4 w-4" /> Slot
                  </dt>
                  <dd className="text-right text-sm font-bold text-brand-700">
                    {slot ? slot.day + ", " + slot.time : "Not selected"}
                  </dd>
                </div>
              </dl>

              <p className="mt-4 text-xs text-ink-400">
                A calendar invite with the video link is on its way to you.
              </p>

              <div className="mt-6">
                <Button size="lg" onClick={onClose}>
                  Done
                </Button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {step < 4 ? (
        <div className="sticky bottom-0 flex items-center justify-between gap-3 border-t border-ink-300/20 bg-white px-6 py-4 sm:px-8">
          {step > 1 ? (
            <Button variant="outline" onClick={goBack}>
              Back
            </Button>
          ) : (
            <span className="text-xs text-ink-400">Step {step} of 4</span>
          )}
          <Button
            onClick={goNext}
            disabled={!stepValid}
            iconRight={<ArrowRight className="h-4 w-4" />}
          >
            Continue
          </Button>
        </div>
      ) : null}
    </Modal>
  );
}
