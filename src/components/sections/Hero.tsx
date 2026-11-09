"use client";

import { motion } from "framer-motion";
import {
  Clock,
  PenLine,
  Play,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { useApp } from "@/components/providers/AppProvider";
import { AI_EVALUATION, BRAND, UNIVERSITY_LOGOS } from "@/data/mockData";
import { initials } from "@/lib/utils";

const PEERS: { name: string; gradient: string }[] = [
  { name: "Kashish Mehra", gradient: "from-brand-400 to-brand-700" },
  { name: "Alok Nair", gradient: "from-accent-blue to-accent-violet" },
  { name: "Vanshika Rao", gradient: "from-accent-amber to-brand-500" },
  { name: "Ibrahim Qureshi", gradient: "from-accent-green to-accent-blue" },
  { name: "Meher Kaur", gradient: "from-accent-violet to-brand-600" },
];

const BANDS: { skill: string; value: number; bar: string }[] = [
  { skill: "Listening", value: 82, bar: "from-brand-400 to-brand-600" },
  { skill: "Reading", value: 74, bar: "from-accent-blue to-accent-violet" },
  { skill: "Writing", value: 68, bar: "from-accent-amber to-brand-500" },
  { skill: "Speaking", value: 79, bar: "from-accent-green to-accent-blue" },
];

const ATTENDEES: { name: string; gradient: string }[] = [
  { name: "Dhruv Patel", gradient: "from-accent-blue to-accent-sky" },
  { name: "Ananya Deshpande", gradient: "from-brand-400 to-brand-600" },
  { name: "Ritwik Sharma", gradient: "from-accent-violet to-accent-lilac" },
];

export function Hero() {
  const { openCounseling, openQuiz } = useApp();
  const feedbackCriteria = AI_EVALUATION.criteria.slice(0, 2);

  return (
    <section
      className="radial-tint relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-16"
      aria-labelledby="hero-title"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* ---------------------------------------------------------- */}
          {/* Left: copy                                                 */}
          {/* ---------------------------------------------------------- */}
          <div className="lg:col-span-6">
            <Reveal delay={0}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink-700 ring-1 ring-brand-200">
                <Sparkles className="h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                AI-scored practice · 15,000+ students trained
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h1
                id="hero-title"
                className="mt-6 text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl lg:text-6xl"
              >
                Train for the test.{" "}
                <span className="text-gradient-brand">Then land the admit.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500">
                Live classes with band 8+ trainers, adaptive full-length mocks that
                follow your weak sections, and AI feedback on every writing and
                speaking attempt — then an admissions desk that stays with you from
                your shortlist through to the visa interview.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button size="lg" onClick={openCounseling}>
                  Book a free counseling call
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  iconLeft={<Play className="h-4 w-4" aria-hidden="true" />}
                  onClick={openQuiz}
                >
                  Try the 3-question diagnostic
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <ul className="flex items-center" aria-label="Recent students">
                  {PEERS.map((peer) => (
                    <li
                      key={peer.name}
                      className={`-ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${peer.gradient} text-xs font-bold text-white ring-2 ring-white first:ml-0`}
                    >
                      <span aria-hidden="true">{initials(peer.name)}</span>
                      <span className="sr-only">{peer.name}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5" aria-hidden="true">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-accent-amber text-accent-amber"
                        />
                      ))}
                    </span>
                    <span className="text-sm font-bold text-ink">
                      {BRAND.rating}
                    </span>
                    <span className="text-sm text-ink-500">
                      from {BRAND.reviewCount.toLocaleString("en-IN")} reviews
                    </span>
                  </div>
                  <p className="text-sm text-ink-500">
                    avg. +1.5 IELTS bands in 6 weeks
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-10">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink-400">
                  Our students now study at
                </p>
                <div className="mask-fade-x mt-4 overflow-hidden">
                  <div className="flex w-max animate-marquee items-center gap-3">
                    {[...UNIVERSITY_LOGOS, ...UNIVERSITY_LOGOS].map((name, i) => (
                      <span
                        key={`${name}-${i}`}
                        className="whitespace-nowrap rounded-xl border border-ink-300/20 bg-white px-4 py-2 text-sm font-bold text-ink-700 shadow-soft"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* Right: dashboard preview                                   */}
          {/* ---------------------------------------------------------- */}
          <div className="relative min-h-[30rem] sm:min-h-[32rem] lg:col-span-6">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-200/40 blur-3xl sm:h-96 sm:w-96"
            />

            {/* Score predictor */}
            <div className="card-base relative mx-auto mt-6 w-full max-w-md rounded-3xl p-5 shadow-card sm:mt-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-400">
                    Score predictor
                  </p>
                  <p className="mt-1 text-sm text-ink-500">IELTS Academic · week 6</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-accent-mint px-2.5 py-1 text-xs font-bold text-accent-green">
                  <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                  +1.5
                </span>
              </div>

              <div className="mt-4 flex items-end gap-2">
                <span className="text-5xl font-extrabold leading-none text-ink">
                  7.5
                </span>
                <span className="pb-1 text-sm font-semibold text-ink-500">
                  projected band
                </span>
              </div>

              <ul className="mt-6 space-y-4">
                {BANDS.map((band, i) => (
                  <li key={band.skill}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-ink-700">
                        {band.skill}
                      </span>
                      <span className="font-bold text-ink">{band.value}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-sunken">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${band.bar}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${band.value}%` }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{
                          duration: 0.9,
                          delay: 0.15 + i * 0.12,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI feedback — floating top right */}
            <div className="pointer-events-none absolute -top-2 right-0 w-56 rotate-3 animate-float sm:w-64 lg:-right-4">
              <div className="card-base rounded-2xl p-4 shadow-lift">
                <p className="flex items-center gap-2 text-sm font-bold text-ink">
                  <PenLine className="h-4 w-4 text-brand-600" aria-hidden="true" />
                  AI feedback ready
                </p>
                <p className="mt-2 truncate text-xs text-ink-500">
                  {AI_EVALUATION.response}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {feedbackCriteria.map((criterion) => (
                    <li
                      key={criterion.label}
                      className="rounded-full bg-brand-50 px-2 py-1 text-[0.65rem] font-bold text-brand-700 ring-1 ring-inset ring-brand-200"
                    >
                      {criterion.label} · {criterion.score}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Live class — floating bottom left */}
            <div
              className="absolute bottom-0 left-0 w-60 -rotate-2 animate-float sm:w-64 lg:-left-6"
              style={{ animationDelay: "1.8s" }}
            >
              <div className="card-base rounded-2xl p-4 shadow-lift">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-brand-600">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  Live class · tonight
                </p>
                <p className="mt-2 text-sm font-bold text-ink">
                  Task 2 essays: holding a position
                </p>
                <p className="mt-0.5 text-xs text-ink-500">
                  with Priya Raghavan · Band 8.5
                </p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <ul className="flex items-center" aria-label="Attendees">
                    {ATTENDEES.map((person) => (
                      <li
                        key={person.name}
                        className={`-ml-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${person.gradient} text-[0.6rem] font-bold text-white ring-2 ring-white first:ml-0`}
                      >
                        <span aria-hidden="true">{initials(person.name)}</span>
                        <span className="sr-only">{person.name}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="rounded-full bg-ink px-3 py-1 text-xs font-bold text-white">
                    Join
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
