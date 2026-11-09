"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, GraduationCap, Quote, Timer } from "lucide-react";
import { cn, initials } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { useApp } from "@/components/providers/AppProvider";
import { STORIES, STORY_FILTERS, type Story } from "@/data/mockData";

const avatarGradients: Record<Story["accent"], string> = {
  brand: "from-brand-500 to-brand-700",
  blue: "from-accent-blue to-accent-violet",
  green: "from-accent-green to-accent-blue",
  amber: "from-accent-amber to-brand-500",
  violet: "from-accent-violet to-accent-blue",
};

export function SuccessStories() {
  const { openCounseling } = useApp();
  const [filter, setFilter] = useState<string>("all");

  const stories = useMemo(
    () =>
      filter === "all"
        ? STORIES
        : STORIES.filter((story) => story.category === filter),
    [filter],
  );

  return (
    <section id="stories" className="bg-surface-muted py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Results"
          title={
            <>
              Real score jumps,{" "}
              <span className="text-gradient-brand">real admits</span>
            </>
          }
          subtitle="Every story below started where you are now — a flat score and a vague university list — and ended with an offer letter."
        />

        <Reveal className="mt-10" delay={0.05}>
          <div className="flex flex-col items-center gap-4">
            <ul className="no-scrollbar mask-fade-x -mx-4 flex max-w-full gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
              {STORY_FILTERS.map((item) => {
                const active = item.id === filter;
                return (
                  <li key={item.id} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setFilter(item.id)}
                      aria-pressed={active}
                      className={cn(
                        "focus-ring relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                        active
                          ? "text-white"
                          : "text-ink-500 hover:bg-white hover:text-ink",
                      )}
                    >
                      {active ? (
                        <motion.span
                          layoutId="storyFilter"
                          className="absolute inset-0 rounded-full bg-brand-600 shadow-lift"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 34,
                          }}
                        />
                      ) : null}
                      <span className="relative z-10">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <p aria-live="polite" className="text-sm font-semibold text-ink-400">
              {stories.length} {stories.length === 1 ? "result" : "results"}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {stories.map((story) => (
              <motion.article
                key={story.id}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -12 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="card-base flex h-full flex-col p-6 transition hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <div
                    aria-hidden="true"
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-sm font-extrabold text-white",
                      avatarGradients[story.accent],
                    )}
                  >
                    {initials(story.name)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate font-bold text-ink">{story.name}</h3>
                    <p className="truncate text-xs text-ink-400">
                      {story.city} &middot; {story.exam}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl bg-surface-sunken p-3">
                  <div>
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink-400">
                      Before
                    </p>
                    <p className="text-base font-bold text-ink-400">
                      {story.before}
                    </p>
                  </div>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-brand-600"
                  />
                  <div className="text-right">
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink-400">
                      After
                    </p>
                    <p className="text-xl font-extrabold text-accent-green">
                      {story.after}
                    </p>
                  </div>
                </div>

                <Quote aria-hidden="true" className="mt-5 h-6 w-6 text-brand-200" />
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {story.quote}
                </p>

                <div className="mt-auto flex items-start justify-between gap-3 border-t border-ink-300/20 pt-4">
                  <div className="flex min-w-0 items-start gap-2">
                    <GraduationCap
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-600"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink">
                        {story.admit}
                      </p>
                      <p className="text-xs text-ink-400">{story.program}</p>
                    </div>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-surface-tint px-2.5 py-1 text-xs font-semibold text-brand-700">
                    <Timer aria-hidden="true" className="h-3.5 w-3.5" />
                    {story.weeks} weeks
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        <Reveal className="mt-12" delay={0.1}>
          <div className="flex flex-col items-center gap-5 text-center">
            <p className="max-w-xl text-base text-ink-500">
              The pattern repeats: an honest diagnostic, a plan built around your
              weakest section, and feedback fast enough to act on the same day.
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Button
                size="lg"
                onClick={openCounseling}
                iconRight={<ArrowRight className="h-4 w-4" />}
              >
                Start your own story
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() =>
                  document
                    .getElementById("platform")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              >
                See how we teach
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
