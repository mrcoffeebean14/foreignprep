"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  GraduationCap,
  Mail,
  Menu,
  Phone,
  Sparkles,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useApp } from "@/components/providers/AppProvider";
import { BRAND, NAV_LINKS, type NavLink } from "@/data/mockData";
import { cn } from "@/lib/utils";

function telHref(value: string) {
  return `tel:${value.replace(/[^+\d]/g, "")}`;
}

function Wordmark() {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
        <GraduationCap className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="font-display text-xl font-extrabold tracking-[-0.02em] text-ink">
        Foreign<span className="text-brand-600">Prep</span>
      </span>
    </span>
  );
}

export function Header() {
  const { openAuth, openCounseling, openQuiz } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [drawerOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenMenu(null);
      setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const runPromo = (label: string) => {
    setOpenMenu(null);
    setDrawerOpen(false);
    if (label === "Test Prep") {
      openQuiz();
      return;
    }
    if (label === "Services") {
      openCounseling();
      return;
    }
    document
      .querySelector("#calculator")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className="hidden bg-brand-600 text-white sm:block">
        <div className="container-page flex h-10 items-center justify-between gap-4 text-xs sm:text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 font-semibold">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Claim free demo class &amp; scholarships
          </span>
          <span className="inline-flex items-center gap-4">
            <a
              href={telHref(BRAND.phone)}
              className="focus-ring inline-flex items-center gap-1.5 rounded-full px-1 font-semibold hover:underline"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {BRAND.phone}
            </a>
            <a
              href={telHref(BRAND.tollFree)}
              className="focus-ring hidden rounded-full px-1 text-white/90 hover:underline md:inline"
            >
              Toll free {BRAND.tollFree}
            </a>
          </span>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-ink-300/20 bg-white/85 shadow-soft backdrop-blur-xl"
            : "bg-white/40 backdrop-blur-sm",
        )}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
          <a href="#top" className="focus-ring rounded-xl" aria-label={BRAND.name}>
            <Wordmark />
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link: NavLink) => {
                if (!link.columns) {
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="focus-ring block rounded-full px-3 py-2 text-sm font-semibold text-ink-500 transition-colors hover:bg-surface-sunken hover:text-ink"
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                }
                const isOpen = openMenu === link.label;
                return (
                  <li
                    key={link.label}
                    className="relative"
                    onPointerEnter={() => setOpenMenu(link.label)}
                    onPointerLeave={() => setOpenMenu(null)}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenMenu(isOpen ? null : link.label)}
                      onFocus={() => setOpenMenu(link.label)}
                      className={cn(
                        "focus-ring inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold transition-colors",
                        isOpen
                          ? "bg-surface-sunken text-ink"
                          : "text-ink-500 hover:bg-surface-sunken hover:text-ink",
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          isOpen && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-1/2 top-full z-50 w-[min(56rem,calc(100vw-3rem))] -translate-x-1/2 pt-3"
                        >
                          <div className="grid grid-cols-3 gap-6 rounded-3xl border border-ink-300/20 bg-white p-6 shadow-card">
                            <div className="col-span-2 grid grid-cols-2 gap-6">
                              {link.columns.map((column) => (
                                <div key={column.heading}>
                                  <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-400">
                                    {column.heading}
                                  </h3>
                                  <ul className="space-y-1">
                                    {column.items.map((item) => (
                                      <li key={item.label}>
                                        <a
                                          href={item.href}
                                          onClick={() => setOpenMenu(null)}
                                          className="focus-ring block rounded-2xl px-3 py-2 transition-colors hover:bg-surface-muted"
                                        >
                                          <span className="flex items-center gap-2">
                                            <span className="text-sm font-semibold text-ink">
                                              {item.label}
                                            </span>
                                            {item.meta && (
                                              <Badge tone="brand">
                                                {item.meta}
                                              </Badge>
                                            )}
                                          </span>
                                          <span className="mt-0.5 block text-xs text-ink-500">
                                            {item.description}
                                          </span>
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>

                            {link.promo && (
                              <div className="flex flex-col justify-between gap-4 rounded-2xl bg-brand-50 p-5">
                                <div>
                                  <h3 className="font-display text-base font-extrabold tracking-[-0.02em] text-ink">
                                    {link.promo.title}
                                  </h3>
                                  <p className="mt-2 text-xs leading-relaxed text-ink-500">
                                    {link.promo.body}
                                  </p>
                                </div>
                                <Button
                                  size="sm"
                                  onClick={() => runPromo(link.label)}
                                >
                                  {link.promo.cta}
                                </Button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle className="mr-1" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openAuth("signin")}
            >
              Log In
            </Button>
            <Button size="sm" onClick={openCounseling}>
              Book free counseling
            </Button>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink-300/20 text-ink lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[90] overflow-y-auto bg-white lg:hidden"
          >
            <div className="container-page flex h-16 items-center justify-between">
              <Wordmark />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setDrawerOpen(false)}
                className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink-300/20 text-ink"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="container-page pb-10">
              <ul className="divide-y divide-ink-300/20 border-y border-ink-300/20">
                {NAV_LINKS.map((link: NavLink) => {
                  if (!link.columns) {
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          onClick={() => setDrawerOpen(false)}
                          className="focus-ring block rounded-xl py-4 text-base font-semibold text-ink"
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  }
                  const expanded = openAccordion === link.label;
                  return (
                    <li key={link.label}>
                      <button
                        type="button"
                        aria-expanded={expanded}
                        onClick={() =>
                          setOpenAccordion(expanded ? null : link.label)
                        }
                        className="focus-ring flex w-full items-center justify-between rounded-xl py-4 text-left text-base font-semibold text-ink"
                      >
                        {link.label}
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 text-ink-400 transition-transform duration-200",
                            expanded && "rotate-180",
                          )}
                          aria-hidden="true"
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {expanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-5 pb-4">
                              {link.columns.map((column) => (
                                <div key={column.heading}>
                                  <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-400">
                                    {column.heading}
                                  </h3>
                                  <ul className="space-y-1">
                                    {column.items.map((item) => (
                                      <li key={item.label}>
                                        <a
                                          href={item.href}
                                          onClick={() => setDrawerOpen(false)}
                                          className="focus-ring block rounded-2xl bg-surface-muted px-4 py-3"
                                        >
                                          <span className="flex flex-wrap items-center gap-2">
                                            <span className="text-sm font-semibold text-ink">
                                              {item.label}
                                            </span>
                                            {item.meta && (
                                              <Badge tone="brand">
                                                {item.meta}
                                              </Badge>
                                            )}
                                          </span>
                                          <span className="mt-0.5 block text-xs text-ink-500">
                                            {item.description}
                                          </span>
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}

                              {link.promo && (
                                <div className="rounded-2xl bg-brand-50 p-5">
                                  <h3 className="font-display text-base font-extrabold tracking-[-0.02em] text-ink">
                                    {link.promo.title}
                                  </h3>
                                  <p className="mt-2 text-xs leading-relaxed text-ink-500">
                                    {link.promo.body}
                                  </p>
                                  <Button
                                    size="sm"
                                    className="mt-4"
                                    onClick={() => runPromo(link.label)}
                                  >
                                    {link.promo.cta}
                                  </Button>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 flex items-center justify-between rounded-2xl border border-ink-300/20 px-4 py-3">
                <span className="text-sm font-semibold text-ink">Colour theme</span>
                <ThemeToggle />
              </div>
              <div className="mt-6 space-y-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => {
                    setDrawerOpen(false);
                    openAuth("signin");
                  }}
                >
                  Log In
                </Button>
                <Button
                  fullWidth
                  onClick={() => {
                    setDrawerOpen(false);
                    openCounseling();
                  }}
                >
                  Book free counseling
                </Button>
              </div>

              <div className="mt-6 space-y-2 text-sm">
                <a
                  href={telHref(BRAND.phone)}
                  className="focus-ring flex items-center gap-2 rounded-xl py-1 font-semibold text-ink"
                >
                  <Phone className="h-4 w-4 text-brand-600" aria-hidden="true" />
                  {BRAND.phone}
                </a>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="focus-ring flex items-center gap-2 rounded-xl py-1 font-semibold text-ink"
                >
                  <Mail className="h-4 w-4 text-brand-600" aria-hidden="true" />
                  {BRAND.email}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
