"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { ToastViewport, type ToastItem } from "@/components/ui/Toast";
import { AuthModal } from "@/components/modals/AuthModal";
import { CounselingModal } from "@/components/modals/CounselingModal";
import { CurriculumModal } from "@/components/modals/CurriculumModal";
import { PlanModal } from "@/components/modals/PlanModal";
import { DiagnosticQuizModal } from "@/components/modals/DiagnosticQuizModal";
import type { BillingCycle, Plan, Program } from "@/data/mockData";

type AuthTab = "signin" | "signup";

type AppContextValue = {
  openAuth: (tab?: AuthTab) => void;
  openCounseling: () => void;
  openCurriculum: (program: Program) => void;
  openPlan: (plan: Plan, cycle: BillingCycle) => void;
  openQuiz: () => void;
  toast: (message: string, tone?: ToastItem["tone"]) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [authTab, setAuthTab] = useState<AuthTab | null>(null);
  const [counselingOpen, setCounselingOpen] = useState(false);
  const [curriculum, setCurriculum] = useState<Program | null>(null);
  const [planState, setPlanState] = useState<{
    plan: Plan;
    cycle: BillingCycle;
  } | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toastId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, tone: ToastItem["tone"] = "success") => {
      toastId.current += 1;
      const id = toastId.current;
      setToasts((prev) => [...prev, { id, message, tone }]);
      setTimeout(() => dismiss(id), 4200);
    },
    [dismiss],
  );

  const value = useMemo<AppContextValue>(
    () => ({
      openAuth: (tab: AuthTab = "signin") => setAuthTab(tab),
      openCounseling: () => setCounselingOpen(true),
      openCurriculum: (program: Program) => setCurriculum(program),
      openPlan: (plan: Plan, cycle: BillingCycle) =>
        setPlanState({ plan, cycle }),
      openQuiz: () => setQuizOpen(true),
      toast,
    }),
    [toast],
  );

  return (
    <AppContext.Provider value={value}>
      {children}

      <AuthModal
        open={authTab !== null}
        initialTab={authTab ?? "signin"}
        onClose={() => setAuthTab(null)}
        onSuccess={(message) => {
          setAuthTab(null);
          toast(message);
        }}
      />

      <CounselingModal
        open={counselingOpen}
        onClose={() => setCounselingOpen(false)}
      />

      <CurriculumModal
        open={curriculum !== null}
        program={curriculum}
        onClose={() => setCurriculum(null)}
        onEnroll={(program) => {
          setCurriculum(null);
          toast(`Seat held for ${program.title}. Our team will call you shortly.`);
        }}
      />

      <PlanModal
        open={planState !== null}
        plan={planState?.plan ?? null}
        cycle={planState?.cycle ?? "monthly"}
        onClose={() => setPlanState(null)}
        onConfirm={(plan) => {
          setPlanState(null);
          toast(`${plan.name} selected. Check your email for next steps.`);
        }}
      />

      <DiagnosticQuizModal open={quizOpen} onClose={() => setQuizOpen(false)} />

      <ToastViewport toasts={toasts} dismiss={dismiss} />
    </AppContext.Provider>
  );
}
