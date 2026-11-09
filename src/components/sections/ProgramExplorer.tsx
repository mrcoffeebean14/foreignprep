"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Clock,
  FileText,
  Search,
  Target,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { useApp } from "@/components/providers/AppProvider";
import { PROGRAMS, PROGRAM_CATEGORIES } from "@/data/mockData";
import type { Program, ProgramCategory } from "@/data/mockData";
import { formatINR } from "@/lib/utils";

type TabId = ProgramCategory | "all";

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-400">
        {icon}
        {label}
      </span>
      <span className="text-sm font-bold text-ink">{value}</span>
    </div>
  );
}

function ProgramCard({
  program,
  onOpen,
}: {
  program: Program;
  onOpen: (program: Program) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="card-base flex flex-col p-6 transition hover:-translate-y-1 hover:shadow-card"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge tone={program.tone}>{program.badge}</Badge>
        <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-700">
          {program.seatsLeft} seats left
        </span>
      </div>

      <p className="mt-5 text-xs font-bold uppercase tracking-wide text-ink-400">
        {program.exam}
      </p>
      <h3 className="mt-1.5 text-xl font-extrabold leading-snug text-ink">
        {program.title}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-ink-500">
        {program.summary}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-4 rounded-2xl bg-surface-sunken p-4">
        <Stat
          icon={<Target className="h-3.5 w-3.5" aria-hidden="true" />}
          label="Target"
          value={program.targetScore}
        />
        <Stat
          icon={<Clock className="h-3.5 w-3.5" aria-hidden="true" />}
          label="Duration"
          value={program.duration}
        />
        <Stat
          icon={<FileText className="h-3.5 w-3.5" aria-hidden="true" />}
          label="Mock tests"
          value={String(program.mockTests)}
        />
        <Stat
          icon={<Users className="h-3.5 w-3.5" aria-hidden="true" />}
          label="Live hours"
          value={`${program.liveHours}h`}
        />
      </div>

      <ul className="mt-5 flex flex-col gap-2.5">
        {program.deliverables.slice(0, 3).map((item) => (
          <li key={item} className="flex gap-2.5 text-sm text-ink-500">
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-end justify-between gap-4 border-t border-ink-300/20 pt-5">
        <p className="text-sm text-ink-400">
          from{" "}
          <span className="text-lg font-extrabold text-ink">
            {formatINR(program.priceFrom)}
          </span>{" "}
          onwards
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => onOpen(program)}>
            View curriculum
          </Button>
          <Button
            size="sm"
            iconRight={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
            onClick={() => onOpen(program)}
          >
            Enroll
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function ProgramExplorer() {
  const { openCurriculum } = useApp();
  const [active, setActive] = useState<TabId>("all");

  const programs = useMemo(
    () =>
      active === "all"
        ? PROGRAMS
        : PROGRAMS.filter((program) => program.category === active),
    [active],
  );

  const activeCategory = PROGRAM_CATEGORIES.find((c) => c.id === active);

  return (
    <section id="programs" className="bg-surface py-16 md:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Programs"
            title={
              <>
                Pick the exam.{" "}
                <span className="text-gradient-brand">We bring the plan.</span>
              </>
            }
            subtitle="Every program starts with a diagnostic and ends with timed simulations. Live hours, mock counts and deliverables are listed upfront so you know exactly what you are buying."
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:justify-center md:px-0">
            {PROGRAM_CATEGORIES.map((category) => {
              const isActive = category.id === active;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActive(category.id)}
                  aria-pressed={isActive}
                  className={`focus-ring relative shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-white"
                      : "border border-ink-300/30 bg-white text-ink-500 hover:text-ink"
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="programTab"
                      className="absolute inset-0 rounded-full bg-brand-600"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  ) : null}
                  <span className="relative z-10 whitespace-nowrap">
                    {category.label}
                  </span>
                </button>
              );
            })}
          </div>
          {activeCategory ? (
            <p className="mt-4 text-center text-sm text-ink-400">
              {activeCategory.blurb}
            </p>
          ) : null}
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {programs.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                onOpen={openCurriculum}
              />
            ))}
          </AnimatePresence>
        </div>

        {programs.length === 0 ? (
          <div className="mt-10 flex flex-col items-center gap-3 rounded-3xl border border-ink-300/20 bg-surface-muted px-6 py-14 text-center">
            <Search className="h-6 w-6 text-brand-600" aria-hidden="true" />
            <h3 className="text-lg font-extrabold text-ink">
              Nothing in this track yet
            </h3>
            <p className="max-w-sm text-sm text-ink-500">
              New cohorts open every month. Pick another track, or talk to a
              counsellor and we will tell you when this one starts.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-1"
              onClick={() => setActive("all")}
            >
              Show all programs
            </Button>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
