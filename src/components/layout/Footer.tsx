"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Globe,
  Users,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { useApp } from "@/components/providers/AppProvider";
import { isEmail } from "@/lib/utils";
import { BRAND, FOOTER_COLUMNS, LEGAL_LINKS } from "@/data/mockData";

const SOCIALS = [
  { label: "Chat with us on WhatsApp", Icon: MessageCircle },
  { label: "Read the ForeignPrep blog", Icon: Globe },
  { label: "Join our student community", Icon: Users },
  { label: "Email our admissions team", Icon: Mail },
  { label: "Call our counsellors", Icon: Phone },
];

export function Footer() {
  const { toast } = useApp();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isEmail(email)) {
      const message = "Enter a valid email address so we can reach you.";
      setError(message);
      toast(message, "error");
      return;
    }
    setError("");
    setEmail("");
    toast("You're subscribed - look out for our weekly prep digest.");
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    if (error) setError("");
  }

  return (
    <footer className="bg-ink text-white">
      <Container className="py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600">
                <GraduationCap className="h-6 w-6 text-white" aria-hidden="true" />
              </span>
              <span className="text-xl font-extrabold tracking-[-0.02em] text-white">
                {BRAND.name}
              </span>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              We coach ambitious students through the entire journey abroad: test prep
              scored by AI within the hour, mentors who have sat the exams themselves,
              and application support that ends in an offer letter. One team, from your
              first mock to visa day.
            </p>

            <ul className="mt-7 space-y-3.5 text-sm">
              <li>
                <a
                  href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
                  className="focus-ring inline-flex items-start gap-3 rounded-md text-white/70 transition hover:text-white"
                >
                  <Phone
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-500"
                    aria-hidden="true"
                  />
                  <span>{BRAND.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="focus-ring inline-flex items-start gap-3 break-all rounded-md text-white/70 transition hover:text-white"
                >
                  <Mail
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-500"
                    aria-hidden="true"
                  />
                  <span>{BRAND.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-500"
                  aria-hidden="true"
                />
                <span>{BRAND.address}</span>
              </li>
            </ul>

            <ul className="mt-7 flex flex-wrap gap-3">
              {SOCIALS.map(({ label, Icon }) => (
                <li key={label}>
                  <button
                    type="button"
                    aria-label={label}
                    onClick={() =>
                      toast("Our social channels go live with the new app - stay tuned.")
                    }
                    className="focus-ring flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:-translate-y-1 hover:bg-brand-600"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4">
              {FOOTER_COLUMNS.map((column) => (
                <div key={column.heading}>
                  <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white">
                    {column.heading}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {column.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="focus-ring rounded-md text-sm text-white/70 transition hover:text-white hover:underline"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Reveal className="mt-14">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 lg:p-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-10">
              <div>
                <h3 className="text-2xl font-extrabold tracking-[-0.02em] text-white">
                  The weekly prep digest
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  One email a week: a practice set, a scoring tip from our mentors, and
                  the intake deadlines worth watching.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex-1">
                    <label htmlFor="footer-newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="footer-newsletter-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={handleChange}
                      aria-invalid={error ? true : undefined}
                      aria-describedby={error ? "footer-newsletter-error" : undefined}
                      className="focus-ring h-12 w-full rounded-full border border-white/15 bg-white/10 px-5 text-sm text-white transition placeholder:text-white/40 hover:border-white/30 focus:border-brand-500"
                    />
                  </div>
                  <Button type="submit" size="lg" className="shrink-0">
                    Subscribe
                  </Button>
                </div>
                {error ? (
                  <p
                    id="footer-newsletter-error"
                    role="alert"
                    className="mt-2 px-1 text-xs font-medium text-brand-400"
                  >
                    {error}
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-8 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between">
          <p className="text-sm text-white/50">
            &copy; 2026 {BRAND.name}. All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="focus-ring rounded-md text-xs text-white/50 transition hover:text-white hover:underline"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 lg:self-auto">
            <Star
              className="h-4 w-4 fill-accent-amber text-accent-amber"
              aria-hidden="true"
            />
            <span className="text-sm font-semibold text-white">{BRAND.rating}</span>
            <span className="text-xs text-white/50">
              {BRAND.reviewCount.toLocaleString("en-IN")} reviews
            </span>
          </div>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-white/40">
          All exam names and trademarks are the property of their respective owners.{" "}
          {BRAND.name} is an independent coaching provider and is not affiliated with,
          endorsed by, or administered by any testing body or university.
        </p>
      </Container>
    </footer>
  );
}
