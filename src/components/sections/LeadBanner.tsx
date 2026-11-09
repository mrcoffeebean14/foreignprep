"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, CheckCircle2, Loader2, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { TextField, SelectField } from "@/components/ui/Field";
import { useApp } from "@/components/providers/AppProvider";
import { BRAND, DESTINATIONS, EXAM_OPTIONS } from "@/data/mockData";
import { isEmail, isPhone } from "@/lib/utils";

const COUNTRY_OPTIONS = DESTINATIONS.map((d) => d.country);

const PROMISES = [
  "A line-by-line review of your academics, budget and timeline",
  "A realistic shortlist — ambitious, target and safe, with deadlines",
  "A week-by-week score plan down to the sections you keep losing",
];

type FormState = {
  name: string;
  phone: string;
  email: string;
  exam: string;
  country: string;
};

type FieldName = "name" | "phone" | "email";

const EMPTY: FormState = {
  name: "",
  phone: "",
  email: "",
  exam: EXAM_OPTIONS[0],
  country: COUNTRY_OPTIONS[0],
};

export function LeadBanner() {
  const { toast } = useApp();
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [sending, setSending] = useState(false);
  const [sentName, setSentName] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function update(field: keyof FormState) {
    return (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const next = event.target.value;
      setValues((prev) => ({ ...prev, [field]: next }));
      setErrors((prev) => {
        if (!(field in prev)) return prev;
        const rest = { ...prev };
        delete rest[field as FieldName];
        return rest;
      });
    };
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found: Partial<Record<FieldName, string>> = {};
    if (!values.name.trim()) found.name = "Please tell us your name";
    if (!values.phone.trim()) found.phone = "We need a number to call you on";
    else if (!isPhone(values.phone)) found.phone = "Enter a 10-digit mobile number";
    if (!values.email.trim()) found.email = "Please add an email address";
    else if (!isEmail(values.email)) found.email = "That email does not look right";

    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSending(true);
    const name = values.name.trim();
    timer.current = setTimeout(() => {
      timer.current = null;
      setSending(false);
      setSentName(name);
      toast("Callback requested. Our counsellor will ring you shortly.");
    }, 900);
  }

  function reset() {
    setValues(EMPTY);
    setErrors({});
    setSentName(null);
  }

  return (
    <section id="callback" className="bg-surface py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink text-white shadow-lift">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-600/30 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-28 right-0 h-80 w-80 rounded-full bg-brand-600/30 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                backgroundSize: "56px 56px",
              }}
            />

            <div className="relative grid items-center gap-10 p-8 md:p-12 lg:grid-cols-2">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-inset ring-white/20">
                  Free · 30 minutes · No obligation
                </span>

                <h2 className="mt-5 text-3xl font-extrabold leading-[1.15] tracking-[-0.02em] md:text-4xl">
                  Talk to a counsellor before you{" "}
                  <span className="text-brand-400">spend a rupee</span> on applications
                </h2>

                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
                  One call is usually enough to know whether your target intake is realistic,
                  what score it needs, and how many weeks of prep stand between the two.
                </p>

                <ul className="mt-7 space-y-3">
                  {PROMISES.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-white/80">
                      <Check
                        className="mt-0.5 h-5 w-5 shrink-0 text-brand-400"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <a
                    href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
                    className="focus-ring inline-flex items-center gap-2.5 rounded-full text-xl font-extrabold tracking-[-0.02em] text-white transition hover:text-brand-400 sm:text-2xl"
                  >
                    <Phone className="h-5 w-5 text-brand-400" aria-hidden="true" />
                    {BRAND.phone}
                  </a>
                  <span className="text-sm text-white/50">or fill the form</span>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 text-ink shadow-card">
                <AnimatePresence mode="wait" initial={false}>
                  {sentName ? (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center py-6 text-center"
                    >
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
                        <CheckCircle2 className="h-8 w-8 text-brand-600" aria-hidden="true" />
                      </span>
                      <h3 className="mt-5 text-xl font-extrabold tracking-[-0.02em] text-ink">
                        We&apos;ll call you within 2 hours
                      </h3>
                      <p className="mt-2 text-sm text-ink-500">
                        Thanks, {sentName}. A counsellor has your request and will ring the
                        number you shared.
                      </p>
                      <Button variant="ghost" className="mt-5" onClick={reset}>
                        Submit another request
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleSubmit}
                      noValidate
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-extrabold tracking-[-0.02em] text-ink">
                        Request a callback
                      </h3>

                      <TextField
                        label="Full name"
                        name="name"
                        autoComplete="name"
                        placeholder="Your name"
                        value={values.name}
                        onChange={update("name")}
                        error={errors.name}
                      />
                      <TextField
                        label="Phone number"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="98765 43210"
                        icon={<Phone className="h-4 w-4" aria-hidden="true" />}
                        value={values.phone}
                        onChange={update("phone")}
                        error={errors.phone}
                      />
                      <TextField
                        label="Email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        icon={<Mail className="h-4 w-4" aria-hidden="true" />}
                        value={values.email}
                        onChange={update("email")}
                        error={errors.email}
                      />
                      <div className="grid gap-4 sm:grid-cols-2">
                        <SelectField
                          label="Target exam"
                          name="exam"
                          options={EXAM_OPTIONS}
                          value={values.exam}
                          onChange={update("exam")}
                        />
                        <SelectField
                          label="Preferred country"
                          name="country"
                          options={COUNTRY_OPTIONS}
                          value={values.country}
                          onChange={update("country")}
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        fullWidth
                        disabled={sending}
                        iconLeft={
                          sending ? (
                            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                          ) : undefined
                        }
                      >
                        {sending ? "Sending…" : "Request a callback"}
                      </Button>

                      <p className="text-xs text-ink-400">
                        We use your details only for this callback. No spam, no selling your
                        number on, and you can ask us to delete it any time.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
