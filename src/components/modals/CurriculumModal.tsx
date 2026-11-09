"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  FileText,
  Target,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import type { Program } from "@/data/mockData";
import { formatINR } from "@/lib/utils";

export function CurriculumModal({
  open,
  program,
  onClose,
  onEnroll,
}: {
  open: boolean;
  program: Program | null;
  onClose: () => void;
  onEnroll: (program: Program) => void;
}) {
  const [openModule, setOpenModule] = useState(0);

  useEffect(() => {
    if (open) setOpenModule(0);
  }, [open, program]);

  return (
    <Modal open={open} onClose={onClose} size="lg" label="Program curriculum">
      {program ? (
        <div className="flex max-h-[88vh] flex-col">
          <div className="bg-brand-50 p-6 pr-16 sm:p-8 sm:pr-16">
            <Badge tone="brand">{program.exam}</Badge>
            <h3 className="mt-3 text-2xl font-extrabold leading-tight text-ink">
              {program.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">
              {program.summary}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              <li className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink ring-1 ring-inset ring-ink-300/20">
                <Target className="h-3.5 w-3.5 text-brand-600" />
                {program.targetScore}
              </li>
              <li className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink ring-1 ring-inset ring-ink-300/20">
                <Clock className="h-3.5 w-3.5 text-brand-600" />
                {program.duration}
              </li>
              <li className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink ring-1 ring-inset ring-ink-300/20">
                <FileText className="h-3.5 w-3.5 text-brand-600" />
                {program.mockTests} mock tests
              </li>
              <li className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink ring-1 ring-inset ring-ink-300/20">
                <Users className="h-3.5 w-3.5 text-brand-600" />
                {program.liveHours}h live
              </li>
            </ul>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-6 sm:p-8">
            <h4 className="text-sm font-bold uppercase tracking-[0.14em] text-ink-400">
              What you get
            </h4>
            <ul className="mt-4 space-y-3">
              {program.deliverables.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h4 className="mt-8 text-sm font-bold uppercase tracking-[0.14em] text-ink-400">
              Curriculum
            </h4>
            <ul className="mt-4 space-y-3">
              {program.curriculum.map((module, index) => {
                const isOpen = openModule === index;
                return (
                  <li
                    key={module.week}
                    className="overflow-hidden rounded-2xl border border-ink-300/20 bg-white"
                  >
                    <h5>
                      <button
                        type="button"
                        onClick={() => setOpenModule(isOpen ? -1 : index)}
                        aria-expanded={isOpen}
                        className="focus-ring flex w-full items-center gap-3 p-4 text-left transition hover:bg-surface-muted sm:p-5"
                      >
                        <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-600">
                          {module.week}
                        </span>
                        <span className="flex-1 text-sm font-semibold text-ink">
                          {module.title}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-ink-400 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </h5>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          key="panel"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <ul className="space-y-2.5 border-t border-ink-300/20 p-4 sm:p-5">
                            {module.points.map((point) => (
                              <li
                                key={point}
                                className="flex gap-3 text-sm leading-relaxed text-ink-500"
                              >
                                <span
                                  aria-hidden="true"
                                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600"
                                />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="sticky bottom-0 flex flex-col gap-3 border-t border-ink-300/20 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex items-center gap-3">
              <p className="text-lg font-extrabold text-ink">
                <span className="mr-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                  from
                </span>
                {formatINR(program.priceFrom)}
              </p>
              <Badge tone="amber">{program.seatsLeft} seats left</Badge>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" onClick={onClose}>
                Talk to a counsellor
              </Button>
              <Button
                onClick={() => onEnroll(program)}
                iconRight={<ArrowRight className="h-4 w-4" />}
              >
                Enroll now
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
