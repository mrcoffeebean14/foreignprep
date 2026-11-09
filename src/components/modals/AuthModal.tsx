"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  GraduationCap,
  Loader2,
  Lock,
  Mail,
  Phone,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { TextField } from "@/components/ui/Field";
import { BRAND } from "@/data/mockData";
import { cn, isEmail, isPhone } from "@/lib/utils";

type AuthTab = "signin" | "signup";

type FieldKey = "name" | "email" | "phone" | "password" | "terms";

const TABS: Array<{ id: AuthTab; label: string }> = [
  { id: "signin", label: "Sign in" },
  { id: "signup", label: "Create account" },
];

const EMPTY_VALUES: Record<"name" | "email" | "phone" | "password", string> = {
  name: "",
  email: "",
  phone: "",
  password: "",
};

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="#E8EAF2" />
      <path d="M10 5.5A4.5 4.5 0 1 0 14.5 10H10" fill="none" stroke="#D81239" strokeWidth="2.4" />
    </svg>
  );
}

function AppleGlyph() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="#14141F" />
      <path d="M7 12.5c0-2.6 1.4-4.2 3-4.2s3 1.6 3 4.2" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="10" cy="6" r="1.2" fill="#FFFFFF" />
    </svg>
  );
}

export function AuthModal({
  open,
  initialTab,
  onClose,
  onSuccess,
}: {
  open: boolean;
  initialTab: "signin" | "signup";
  onClose: () => void;
  onSuccess: (message: string) => void;
}) {
  const [tab, setTab] = useState<AuthTab>(initialTab);
  const [values, setValues] = useState(EMPTY_VALUES);
  const [terms, setTerms] = useState(false);
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    if (!open) return;
    setTab(initialTab);
    setValues(EMPTY_VALUES);
    setTerms(false);
    setErrors({});
    setLoading(false);
    setShowPassword(false);
  }, [open, initialTab]);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const setValue = (key: "name" | "email" | "phone" | "password", value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const switchTab = (next: AuthTab) => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    setTab(next);
    setErrors({});
    setLoading(false);
    setShowPassword(false);
  };

  const handleSubmit = () => {
    if (loading) return;
    const next: Partial<Record<FieldKey, string>> = {};

    if (!isEmail(values.email)) next.email = "Enter a valid email address.";
    if (values.password.length < 8) next.password = "Use at least 8 characters.";

    if (tab === "signup") {
      if (values.name.trim().length < 2) next.name = "Tell us your full name.";
      if (!isPhone(values.phone)) next.phone = "Enter a 10-digit mobile number.";
      if (!terms) next.terms = "Please accept the terms to continue.";
    }

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    timer.current = setTimeout(() => {
      setLoading(false);
      if (tab === "signin") {
        onSuccess(`Signed in as ${values.email.trim()}`);
      } else {
        onSuccess(`Account created. Welcome to ${BRAND.name}, ${values.name.trim()}.`);
      }
    }, 900);
  };

  const passwordToggle = (
    <button
      type="button"
      onClick={() => setShowPassword((v) => !v)}
      aria-label={showPassword ? "Hide password" : "Show password"}
      className="focus-ring absolute right-2 top-11 z-10 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-ink-400 transition hover:bg-surface-sunken hover:text-ink"
    >
      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  );

  return (
    <Modal open={open} onClose={onClose} size="md" label="Account access">
      <div className="px-5 pb-7 pt-6 sm:px-8 sm:pb-8">
        <div className="flex items-center gap-3 pr-12">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-600 text-white shadow-lift">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-extrabold tracking-[-0.02em] text-ink">
            {BRAND.name}
          </span>
        </div>

        <div
          role="tablist"
          aria-label="Account access tabs"
          className="mt-5 flex rounded-full bg-surface-sunken p-1"
        >
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`auth-tab-${item.id}`}
              aria-selected={tab === item.id}
              aria-controls={`auth-panel-${item.id}`}
              onClick={() => switchTab(item.id)}
              className={cn(
                "focus-ring relative flex-1 rounded-full px-3 py-2 text-sm font-semibold transition-colors",
                tab === item.id ? "text-ink" : "text-ink-500 hover:text-ink",
              )}
            >
              {tab === item.id ? (
                <motion.span
                  layoutId="authTab"
                  className="absolute inset-0 rounded-full bg-white shadow-soft"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              ) : null}
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </div>

        <h3 className="mt-6 font-display text-2xl font-extrabold tracking-[-0.02em] text-ink">
          {tab === "signin" ? "Welcome back" : "Create your account"}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
          {tab === "signin"
            ? "Pick up your practice plan, mock tests and counselling notes."
            : "Start with a free diagnostic test and a study plan built around your target."}
        </p>

        <div className="mt-5 grid gap-2.5">
          <Button
            variant="outline"
            fullWidth
            aria-label="Continue with Google"
            iconLeft={<GoogleGlyph />}
            onClick={() => onSuccess("Social sign-in is a demo on this preview.")}
          >
            Continue with Google
          </Button>
          <Button
            variant="outline"
            fullWidth
            aria-label="Continue with Apple"
            iconLeft={<AppleGlyph />}
            onClick={() => onSuccess("Social sign-in is a demo on this preview.")}
          >
            Continue with Apple
          </Button>
        </div>

        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-ink-300/30" />
          <span className="text-xs font-semibold uppercase tracking-wide text-ink-400">or</span>
          <span className="h-px flex-1 bg-ink-300/30" />
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.form
            key={tab}
            role="tabpanel"
            id={`auth-panel-${tab}`}
            aria-labelledby={`auth-tab-${tab}`}
            initial={{ opacity: 0, x: tab === "signin" ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: tab === "signin" ? 16 : -16 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
            className="grid gap-4"
          >
            {tab === "signup" ? (
              <TextField
                label="Full name"
                name="name"
                autoComplete="name"
                placeholder="Ananya Sharma"
                icon={<Users className="h-4 w-4" />}
                value={values.name}
                error={errors.name}
                onChange={(event) => setValue("name", event.target.value)}
              />
            ) : null}

            <TextField
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@email.com"
              icon={<Mail className="h-4 w-4" />}
              value={values.email}
              error={errors.email}
              onChange={(event) => setValue("email", event.target.value)}
            />

            {tab === "signup" ? (
              <TextField
                label="Mobile number"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="98765 43210"
                icon={<Phone className="h-4 w-4" />}
                value={values.phone}
                error={errors.phone}
                onChange={(event) => setValue("phone", event.target.value)}
              />
            ) : null}

            <div className="relative">
              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete={tab === "signin" ? "current-password" : "new-password"}
                placeholder="At least 8 characters"
                icon={<Lock className="h-4 w-4" />}
                className="pr-12"
                value={values.password}
                error={errors.password}
                onChange={(event) => setValue("password", event.target.value)}
              />
              {passwordToggle}
              {tab === "signin" ? (
                <button
                  type="button"
                  onClick={() => onSuccess("Reset link sent if the email is registered.")}
                  className="focus-ring absolute right-0 top-0 z-10 rounded-md text-xs font-semibold text-brand-600 transition hover:text-brand-700"
                >
                  Forgot password?
                </button>
              ) : null}
            </div>

            {tab === "signin" ? (
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-500">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                  className="focus-ring h-4 w-4 rounded border-ink-300/50 text-brand-600 accent-brand-600"
                />
                Remember me on this device
              </label>
            ) : (
              <div>
                <label className="flex cursor-pointer items-start gap-2.5 text-sm text-ink-500">
                  <input
                    type="checkbox"
                    checked={terms}
                    onChange={(event) => {
                      setTerms(event.target.checked);
                      setErrors((prev) => {
                        if (!prev.terms) return prev;
                        const next = { ...prev };
                        delete next.terms;
                        return next;
                      });
                    }}
                    className="focus-ring mt-0.5 h-4 w-4 shrink-0 rounded border-ink-300/50 accent-brand-600"
                  />
                  I agree to the terms and privacy policy
                </label>
                {errors.terms ? (
                  <p className="mt-1.5 text-xs font-medium text-brand-600">{errors.terms}</p>
                ) : null}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={loading}
              iconLeft={loading ? <Loader2 className="h-4 w-4 animate-spin" /> : undefined}
            >
              {loading
                ? "Please wait"
                : tab === "signin"
                  ? "Sign in"
                  : "Create free account"}
            </Button>
          </motion.form>
        </AnimatePresence>

        <p className="mt-5 text-center text-sm text-ink-500">
          {tab === "signin" ? `New to ${BRAND.name}? ` : "Already have an account? "}
          <button
            type="button"
            onClick={() => switchTab(tab === "signin" ? "signup" : "signin")}
            className="focus-ring rounded-md font-semibold text-brand-600 transition hover:text-brand-700"
          >
            {tab === "signin" ? "Create an account" : "Sign in instead"}
          </button>
        </p>
      </div>
    </Modal>
  );
}
