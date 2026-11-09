"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { useApp } from "@/components/providers/AppProvider";
import { BRAND, FAQS, FAQ_CATEGORIES } from "@/data/mockData";
import type { FaqCategory } from "@/data/mockData";

export function Faq() {
  const { openCounseling } = useApp();
  const [category, setCategory] = useState<FaqCategory>(FAQ_CATEGORIES[0].id);
  const [open, setOpen] = useState<string | null>(null);

  const items = useMemo(
    () => FAQS.filter((faq) => faq.category === category),
    [category],
  );

  return (
    <section id="faq" className="bg-white py-16 md:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                align="left"
                eyebrow="FAQ"
                title={
                  <>
                    Everything you wanted to{" "}
                    <span className="text-gradient-brand">ask before paying</span>
                  </>
                }
              />
              <p className="mt-4 max-w-md text-base leading-relaxed text-ink-500">
                Straight answers on batches, scores, refunds and admissions — the
                same ones our counsellors give on the phone, written down so you
                can read them at 2am.
              </p>

              <div className="mt-8 rounded-3xl bg-brand-50 p-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-soft">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-4 text-base font-bold text-ink">
                  Still have a question?
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-500">
                  Talk to a counsellor for free — no scripts, no pressure.
                </p>
                <a
                  href={`tel:${BRAND.phone.replace(/\s+/g, "")}`}
                  className="focus-ring mt-3 inline-flex items-center gap-2 rounded-full text-sm font-semibold text-brand-700 hover:text-brand-800"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {BRAND.phone}
                </a>
                <div className="mt-4">
                  <Button size="sm" onClick={openCounseling}>
                    Ask a counsellor
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label="FAQ categories"
            >
              {FAQ_CATEGORIES.map((tab) => {
                const active = tab.id === category;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      setCategory(tab.id);
                      setOpen(null);
                    }}
                    className={`focus-ring relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      active
                        ? "text-white"
                        : "border border-ink-300/20 text-ink-500 hover:text-ink"
                    }`}
                  >
                    {active ? (
                      <motion.span
                        layoutId="faqTab"
                        className="absolute inset-0 rounded-full bg-brand-600"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <ul className="mt-6 flex flex-col gap-3">
              {items.map((faq, index) => {
                const isOpen = open === faq.q;
                const panelId = `faq-panel-${category}-${index}`;
                return (
                  <li key={faq.q}>
                    <Reveal delay={index * 0.03} y={14}>
                      <div className="rounded-2xl border border-ink-300/20 bg-white transition hover:-translate-y-1 hover:shadow-card">
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => setOpen(isOpen ? null : faq.q)}
                          className="focus-ring flex w-full items-start justify-between gap-4 rounded-2xl p-5 text-left"
                        >
                          <h3 className="text-left text-base font-semibold text-ink">
                            {faq.q}
                          </h3>
                          <motion.span
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ duration: 0.2 }}
                            className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                              isOpen
                                ? "bg-brand-600 text-white"
                                : "bg-surface-muted text-ink-500"
                            }`}
                          >
                            <Plus className="h-4 w-4" aria-hidden="true" />
                          </motion.span>
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen ? (
                            <motion.div
                              id={panelId}
                              key="panel"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <p className="px-5 pb-5 pr-12 text-sm leading-relaxed text-ink-500">
                                {faq.a}
                              </p>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
