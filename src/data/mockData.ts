/**
 * Central mock dataset for the ForeignPrep marketing site.
 * Every section imports from here so copy + numbers stay consistent.
 */

export type ExamId =
  | "ielts"
  | "toefl"
  | "pte"
  | "duolingo"
  | "gre"
  | "gmat"
  | "sat";

export type ProgramCategory =
  | "english"
  | "graduate"
  | "undergraduate"
  | "counseling";

export const BRAND = {
  name: "ForeignPrep",
  tagline: "Your gateway to studying abroad",
  phone: "+91 82849 17080",
  tollFree: "1800 419 2200",
  email: "hello@foreignprep.com",
  address:
    "4th Floor, Levels Building, 18th Cross Road, Sector 3, HSR Layout, Bengaluru, Karnataka 560102",
  whatsapp: "+91 82849 17080",
  rating: 4.9,
  reviewCount: 1060,
};

export const TRUST_STATS = [
  { value: "15K+", label: "Students trained", detail: "across 240 cohorts" },
  { value: "97%", label: "Score-target hit rate", detail: "within 2 attempts" },
  { value: "1.5", label: "Avg. IELTS band gain", detail: "in 6 weeks" },
  { value: "38", label: "Partner universities", detail: "in 6 countries" },
];

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export type MegaMenuItem = {
  label: string;
  href: string;
  description: string;
  meta?: string;
};

export type MegaMenuColumn = {
  heading: string;
  items: MegaMenuItem[];
};

export type NavLink = {
  label: string;
  href: string;
  columns?: MegaMenuColumn[];
  promo?: { title: string; body: string; cta: string };
};

export const NAV_LINKS: NavLink[] = [
  {
    label: "Test Prep",
    href: "#programs",
    columns: [
      {
        heading: "English proficiency",
        items: [
          {
            label: "IELTS",
            href: "#programs",
            description: "Academic & General Training",
            meta: "Band 8+ track",
          },
          {
            label: "TOEFL iBT",
            href: "#programs",
            description: "Integrated skills coaching",
            meta: "110+ target",
          },
          {
            label: "PTE Academic",
            href: "#programs",
            description: "AI-scored speaking drills",
            meta: "79+ target",
          },
          {
            label: "Duolingo English Test",
            href: "#programs",
            description: "Adaptive 1-hour format",
            meta: "135+ target",
          },
        ],
      },
      {
        heading: "Admissions tests",
        items: [
          {
            label: "GRE",
            href: "#programs",
            description: "Quant, Verbal & AWA",
            meta: "325+ target",
          },
          {
            label: "GMAT Focus",
            href: "#programs",
            description: "Data Insights included",
            meta: "685+ target",
          },
          {
            label: "SAT",
            href: "#programs",
            description: "Digital adaptive format",
            meta: "1500+ target",
          },
        ],
      },
    ],
    promo: {
      title: "Free diagnostic test",
      body: "Three questions, instant band estimate and a study plan built around your weak sections.",
      cta: "Try the diagnostic",
    },
  },
  {
    label: "Study Abroad",
    href: "#calculator",
    columns: [
      {
        heading: "Top destinations",
        items: [
          {
            label: "United States",
            href: "#calculator",
            description: "F-1 route, OPT & STEM extension",
            meta: "Fall & Spring",
          },
          {
            label: "United Kingdom",
            href: "#calculator",
            description: "1-year masters, 2-year PSW",
            meta: "Sep & Jan",
          },
          {
            label: "Canada",
            href: "#calculator",
            description: "SDS stream, PGWP pathway",
            meta: "3 intakes",
          },
        ],
      },
      {
        heading: "Also popular",
        items: [
          {
            label: "Australia",
            href: "#calculator",
            description: "Group of Eight admissions",
            meta: "Feb & Jul",
          },
          {
            label: "Germany",
            href: "#calculator",
            description: "Low-tuition public universities",
            meta: "Winter & Summer",
          },
          {
            label: "Ireland",
            href: "#calculator",
            description: "Tech & pharma corridors",
            meta: "Sep intake",
          },
        ],
      },
    ],
    promo: {
      title: "Shortlist in 10 minutes",
      body: "Tell us your score and intake — we map ambitious, target and safe universities for you.",
      cta: "Open the calculator",
    },
  },
  {
    label: "Services",
    href: "#platform",
    columns: [
      {
        heading: "On the platform",
        items: [
          {
            label: "AI practice tests",
            href: "#platform",
            description: "Adaptive, full-length, exam-timed",
            meta: "120+ tests",
          },
          {
            label: "AI writing & speaking review",
            href: "#platform",
            description: "Criterion-wise band breakdown",
            meta: "Under 60s",
          },
          {
            label: "1-on-1 mentorship",
            href: "#pricing",
            description: "Weekly sessions with a band 8+ trainer",
            meta: "Elite plan",
          },
        ],
      },
      {
        heading: "Admissions desk",
        items: [
          {
            label: "University shortlisting",
            href: "#platform",
            description: "Profile-matched ambitious to safe list",
            meta: "12 universities",
          },
          {
            label: "SOP & LOR review",
            href: "#platform",
            description: "Two editing rounds per document",
            meta: "48h turnaround",
          },
          {
            label: "Visa guidance",
            href: "#platform",
            description: "Documentation plus mock interviews",
            meta: "Till approval",
          },
        ],
      },
    ],
    promo: {
      title: "Talk to a counsellor",
      body: "A 30-minute call covering your profile, budget and a realistic intake plan. No charge.",
      cta: "Book free counseling",
    },
  },
  { label: "Pricing", href: "#pricing" },
  { label: "Results", href: "#stories" },
  { label: "Resources", href: "#faq" },
];

/* ------------------------------------------------------------------ */
/* Programs                                                            */
/* ------------------------------------------------------------------ */

export type CurriculumModule = {
  week: string;
  title: string;
  points: string[];
};

export type Program = {
  id: string;
  exam: string;
  category: ProgramCategory;
  badge: string;
  tone: "brand" | "blue" | "green" | "amber" | "violet";
  title: string;
  summary: string;
  targetScore: string;
  duration: string;
  mockTests: number;
  liveHours: number;
  priceFrom: number;
  seatsLeft: number;
  deliverables: string[];
  curriculum: CurriculumModule[];
};

export const PROGRAMS: Program[] = [
  {
    id: "ielts-intensive",
    exam: "IELTS",
    category: "english",
    badge: "Most enrolled",
    tone: "brand",
    title: "IELTS Band 8 Intensive",
    summary:
      "Daily live classes across all four modules with criterion-wise feedback on every writing and speaking submission.",
    targetScore: "Band 7.5 – 8.5",
    duration: "8 weeks",
    mockTests: 16,
    liveHours: 64,
    priceFrom: 18999,
    seatsLeft: 7,
    deliverables: [
      "Band-wise diagnostic and weekly progress report",
      "Unlimited AI evaluation on Writing Task 1 & 2",
      "Two recorded speaking mocks with examiner notes",
      "Section strategy playbooks for Reading & Listening",
    ],
    curriculum: [
      {
        week: "Week 1–2",
        title: "Diagnostics and foundations",
        points: [
          "Full-length baseline test with band breakdown",
          "Listening: map, form and multiple-choice patterns",
          "Reading: skimming, scanning and True/False/Not Given logic",
        ],
      },
      {
        week: "Week 3–4",
        title: "Writing under the band descriptors",
        points: [
          "Task 1 data description: trends, comparisons, process diagrams",
          "Task 2 essay frames for opinion, discussion and problem-solution",
          "Lexical resource and cohesion drills graded by AI",
        ],
      },
      {
        week: "Week 5–6",
        title: "Speaking fluency and pronunciation",
        points: [
          "Part 2 cue-card bank with 90-second recordings",
          "Part 3 abstract discussion and paraphrasing practice",
          "Pronunciation clinics on stress, linking and intonation",
        ],
      },
      {
        week: "Week 7–8",
        title: "Exam simulation",
        points: [
          "Four timed full mocks in real test conditions",
          "Error-log review and targeted re-practice",
          "Test-day logistics, pacing and stamina plan",
        ],
      },
    ],
  },
  {
    id: "toefl-accelerator",
    exam: "TOEFL iBT",
    category: "english",
    badge: "110+ track",
    tone: "blue",
    title: "TOEFL iBT Accelerator",
    summary:
      "Integrated-task focused coaching built for the shortened iBT format, with note-taking systems for every section.",
    targetScore: "105 – 115",
    duration: "6 weeks",
    mockTests: 12,
    liveHours: 48,
    priceFrom: 17499,
    seatsLeft: 11,
    deliverables: [
      "Integrated speaking and writing templates",
      "Note-taking shorthand system with practice lectures",
      "Vocabulary set of 900 academic words",
      "Score-report reading and retake strategy",
    ],
    curriculum: [
      {
        week: "Week 1",
        title: "Format and baseline",
        points: [
          "Full diagnostic across all four sections",
          "Academic note-taking shorthand",
          "Pacing targets per section",
        ],
      },
      {
        week: "Week 2–3",
        title: "Reading and Listening accuracy",
        points: [
          "Inference, rhetorical purpose and summary questions",
          "Lecture structure prediction drills",
          "Timed sets with accuracy tracking",
        ],
      },
      {
        week: "Week 4–5",
        title: "Integrated speaking and writing",
        points: [
          "Task 2–4 speaking response frames",
          "Reading-listening synthesis essays",
          "Academic discussion writing practice",
        ],
      },
      {
        week: "Week 6",
        title: "Full simulations",
        points: [
          "Three back-to-back full-length mocks",
          "Recorded speaking review with a trainer",
          "Final score projection and retake plan",
        ],
      },
    ],
  },
  {
    id: "pte-sprint",
    exam: "PTE Academic",
    category: "english",
    badge: "Fastest result",
    tone: "violet",
    title: "PTE Academic Sprint",
    summary:
      "Template-driven preparation tuned to the PTE scoring engine, with unlimited AI scoring on all 20 task types.",
    targetScore: "79 – 90",
    duration: "4 weeks",
    mockTests: 14,
    liveHours: 32,
    priceFrom: 14999,
    seatsLeft: 5,
    deliverables: [
      "Task-type templates for all 20 PTE items",
      "Unlimited AI scoring on speaking and writing",
      "Enabling-skills breakdown after each mock",
      "Repeat-sentence and retell-lecture drill bank",
    ],
    curriculum: [
      {
        week: "Week 1",
        title: "Scoring engine and speaking",
        points: [
          "How content, fluency and pronunciation are scored",
          "Read-aloud and repeat-sentence technique",
          "Describe-image frameworks",
        ],
      },
      {
        week: "Week 2",
        title: "Writing and reading",
        points: [
          "Summarise-written-text in one sentence",
          "Essay template with scored practice",
          "Reorder-paragraph and fill-in-the-blank logic",
        ],
      },
      {
        week: "Week 3",
        title: "Listening mastery",
        points: [
          "Write-from-dictation bank of 300 sentences",
          "Highlight-correct-summary accuracy drills",
          "Note-taking for retell lecture",
        ],
      },
      {
        week: "Week 4",
        title: "Mock marathon",
        points: [
          "Five scored full mocks",
          "Enabling-skills gap closure",
          "Booking and test-centre strategy",
        ],
      },
    ],
  },
  {
    id: "duolingo-fast",
    exam: "Duolingo",
    category: "english",
    badge: "Budget pick",
    tone: "green",
    title: "Duolingo English Test Fast Track",
    summary:
      "Adaptive-format drilling for the one-hour test, including the interactive writing and video interview sections.",
    targetScore: "130 – 150",
    duration: "3 weeks",
    mockTests: 9,
    liveHours: 18,
    priceFrom: 9999,
    seatsLeft: 14,
    deliverables: [
      "Adaptive question bank mirroring the live test",
      "Video interview and writing sample coaching",
      "Vocabulary recall and elicited-imitation drills",
      "Subscore interpretation guide",
    ],
    curriculum: [
      {
        week: "Week 1",
        title: "Adaptive format basics",
        points: [
          "How the adaptive engine selects difficulty",
          "Read-and-complete and read-and-select drills",
          "Baseline practice test",
        ],
      },
      {
        week: "Week 2",
        title: "Production tasks",
        points: [
          "Speak-about-the-photo structure",
          "Write-about-the-photo timing",
          "Elicited imitation and listen-and-type",
        ],
      },
      {
        week: "Week 3",
        title: "Interview and simulation",
        points: [
          "Video interview delivery and body language",
          "Three full simulations under time",
          "Score-send strategy for universities",
        ],
      },
    ],
  },
  {
    id: "gre-quant-focus",
    exam: "GRE",
    category: "graduate",
    badge: "325+ track",
    tone: "amber",
    title: "GRE 325+ Masterclass",
    summary:
      "Concept-first quant and vocabulary-in-context verbal, with adaptive section practice modelled on the shorter GRE.",
    targetScore: "322 – 332",
    duration: "10 weeks",
    mockTests: 10,
    liveHours: 72,
    priceFrom: 24999,
    seatsLeft: 9,
    deliverables: [
      "Quant concept library with 2,400 practice problems",
      "High-frequency word list with spaced repetition",
      "AWA essays reviewed by a trainer",
      "Section-adaptive mocks with percentile tracking",
    ],
    curriculum: [
      {
        week: "Week 1–3",
        title: "Quant foundations",
        points: [
          "Arithmetic, number properties and ratios",
          "Algebra, functions and coordinate geometry",
          "Quantitative comparison technique",
        ],
      },
      {
        week: "Week 4–6",
        title: "Verbal reasoning",
        points: [
          "Text completion and sentence equivalence logic",
          "Reading comprehension argument mapping",
          "Vocabulary in context, 60 words a week",
        ],
      },
      {
        week: "Week 7–8",
        title: "Advanced problem solving",
        points: [
          "Data interpretation sets under time",
          "Probability, permutations and statistics",
          "Error-log driven re-practice",
        ],
      },
      {
        week: "Week 9–10",
        title: "Adaptive simulation",
        points: [
          "Four full adaptive mocks",
          "Analytical writing scored and revised",
          "Score-report analysis and retake call",
        ],
      },
    ],
  },
  {
    id: "gmat-focus",
    exam: "GMAT Focus",
    category: "graduate",
    badge: "MBA ready",
    tone: "blue",
    title: "GMAT Focus 685+ Program",
    summary:
      "Built for the Focus edition: Data Insights gets equal weight alongside Quant and Verbal, with full review flexibility drilled in.",
    targetScore: "675 – 715",
    duration: "12 weeks",
    mockTests: 8,
    liveHours: 80,
    priceFrom: 29999,
    seatsLeft: 6,
    deliverables: [
      "Data Insights question bank across all five formats",
      "Critical reasoning argument frameworks",
      "Timing strategy with the review-and-edit tool",
      "Business-school profile positioning session",
    ],
    curriculum: [
      {
        week: "Week 1–3",
        title: "Quantitative reasoning",
        points: [
          "Problem solving without the geometry overhead",
          "Word problems, rates and work",
          "Smart-number and estimation tactics",
        ],
      },
      {
        week: "Week 4–6",
        title: "Verbal reasoning",
        points: [
          "Critical reasoning assumption and flaw families",
          "Reading comprehension for dense passages",
          "Elimination discipline under time",
        ],
      },
      {
        week: "Week 7–9",
        title: "Data Insights",
        points: [
          "Multi-source reasoning and table analysis",
          "Graphics interpretation and two-part analysis",
          "Data sufficiency within the DI section",
        ],
      },
      {
        week: "Week 10–12",
        title: "Test readiness",
        points: [
          "Four official-format adaptive mocks",
          "Section-order and bookmarking strategy",
          "Round 1 vs Round 2 application timing",
        ],
      },
    ],
  },
  {
    id: "sat-digital",
    exam: "SAT",
    category: "undergraduate",
    badge: "Grade 11–12",
    tone: "violet",
    title: "Digital SAT 1500+ Program",
    summary:
      "Module-adaptive practice for the digital SAT with Desmos-integrated math training and evidence-based reading drills.",
    targetScore: "1480 – 1560",
    duration: "14 weeks",
    mockTests: 10,
    liveHours: 70,
    priceFrom: 26999,
    seatsLeft: 12,
    deliverables: [
      "Bluebook-style adaptive practice modules",
      "Desmos graphing shortcuts for the math section",
      "Grammar rule book with 500 drills",
      "Undergraduate profile and activity-list review",
    ],
    curriculum: [
      {
        week: "Week 1–4",
        title: "Reading and writing",
        points: [
          "Craft and structure question types",
          "Information and ideas with evidence",
          "Standard English conventions rule set",
        ],
      },
      {
        week: "Week 5–8",
        title: "Math foundations",
        points: [
          "Algebra and advanced math in context",
          "Problem solving and data analysis",
          "Desmos-assisted solving methods",
        ],
      },
      {
        week: "Week 9–11",
        title: "Adaptive module practice",
        points: [
          "Module 1 to module 2 difficulty routing",
          "Timed section sets twice a week",
          "Error-log clinics",
        ],
      },
      {
        week: "Week 12–14",
        title: "Final simulations",
        points: [
          "Four full digital mocks",
          "Score-choice and superscore planning",
          "Early action and regular decision calendar",
        ],
      },
    ],
  },
  {
    id: "admissions-elite",
    exam: "Admissions",
    category: "counseling",
    badge: "End to end",
    tone: "green",
    title: "Study Abroad Admissions Desk",
    summary:
      "Profile evaluation through visa approval — shortlisting, documents, applications and interview prep handled with you.",
    targetScore: "12 applications",
    duration: "Till admit",
    mockTests: 4,
    liveHours: 24,
    priceFrom: 39999,
    seatsLeft: 8,
    deliverables: [
      "Ambitious, target and safe university shortlist",
      "SOP, LOR and resume editing with two rounds each",
      "Scholarship and assistantship mapping",
      "Visa documentation and mock interviews",
    ],
    curriculum: [
      {
        week: "Stage 1",
        title: "Profile evaluation",
        points: [
          "Academic record, backlog and gap assessment",
          "Budget, intake and country fit",
          "Realistic score targets for your list",
        ],
      },
      {
        week: "Stage 2",
        title: "University shortlisting",
        points: [
          "12-university list across three risk tiers",
          "Course curriculum and outcome comparison",
          "Deadline and fee-waiver tracker",
        ],
      },
      {
        week: "Stage 3",
        title: "Documents and applications",
        points: [
          "SOP narrative build and two editing rounds",
          "LOR briefs for recommenders",
          "Portal submissions reviewed before sending",
        ],
      },
      {
        week: "Stage 4",
        title: "Visa and departure",
        points: [
          "Financial documentation checklist",
          "Three mock visa interviews",
          "Pre-departure and accommodation briefing",
        ],
      },
    ],
  },
];

export const PROGRAM_CATEGORIES: {
  id: ProgramCategory | "all";
  label: string;
  blurb: string;
}[] = [
  { id: "all", label: "All programs", blurb: "Everything we run, in one view" },
  {
    id: "english",
    label: "English proficiency",
    blurb: "IELTS, TOEFL, PTE and Duolingo",
  },
  {
    id: "graduate",
    label: "Graduate admissions",
    blurb: "GRE and GMAT Focus edition",
  },
  { id: "undergraduate", label: "Undergraduate", blurb: "Digital SAT prep" },
  {
    id: "counseling",
    label: "Study abroad counseling",
    blurb: "Shortlisting to visa approval",
  },
];

/* ------------------------------------------------------------------ */
/* Eligibility calculator                                              */
/* ------------------------------------------------------------------ */

export type ExamScale = {
  id: ExamId;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultCurrent: number;
  defaultTarget: number;
  /** points of improvement a focused week of prep typically delivers */
  weeklyGain: number;
  format: (value: number) => string;
};

export const EXAM_SCALES: ExamScale[] = [
  {
    id: "ielts",
    label: "IELTS",
    min: 4,
    max: 9,
    step: 0.5,
    defaultCurrent: 6,
    defaultTarget: 7.5,
    weeklyGain: 0.2,
    format: (v) => `Band ${v.toFixed(1)}`,
  },
  {
    id: "toefl",
    label: "TOEFL iBT",
    min: 40,
    max: 120,
    step: 1,
    defaultCurrent: 82,
    defaultTarget: 105,
    weeklyGain: 3.2,
    format: (v) => `${Math.round(v)} / 120`,
  },
  {
    id: "gre",
    label: "GRE",
    min: 260,
    max: 340,
    step: 1,
    defaultCurrent: 302,
    defaultTarget: 325,
    weeklyGain: 2.4,
    format: (v) => `${Math.round(v)} / 340`,
  },
  {
    id: "gmat",
    label: "GMAT Focus",
    min: 205,
    max: 805,
    step: 5,
    defaultCurrent: 575,
    defaultTarget: 685,
    weeklyGain: 12,
    format: (v) => `${Math.round(v)} / 805`,
  },
];

export const INTAKES = [
  { id: "fall-2026", label: "Fall 2026", deadline: "Applications close Jan 2026" },
  { id: "spring-2027", label: "Spring 2027", deadline: "Applications close Aug 2026" },
  { id: "fall-2027", label: "Fall 2027", deadline: "Applications close Jan 2027" },
];

export type Destination = {
  id: string;
  country: string;
  flag: string;
  costPerYear: string;
  workRights: string;
  tiers: { tier: "Ambitious" | "Target" | "Safe"; schools: string[] }[];
  /** score (normalised 0-1) above which the ambitious tier unlocks */
  ambitiousCutoff: number;
  targetCutoff: number;
};

export const DESTINATIONS: Destination[] = [
  {
    id: "usa",
    country: "United States",
    flag: "🇺🇸",
    costPerYear: "₹38–55 L",
    workRights: "3-year OPT for STEM degrees",
    ambitiousCutoff: 0.86,
    targetCutoff: 0.72,
    tiers: [
      {
        tier: "Ambitious",
        schools: [
          "Carnegie Mellon University",
          "University of California, San Diego",
          "Georgia Institute of Technology",
        ],
      },
      {
        tier: "Target",
        schools: [
          "North Carolina State University",
          "Arizona State University",
          "University of Texas at Dallas",
        ],
      },
      {
        tier: "Safe",
        schools: [
          "University of Texas at Arlington",
          "Stevens Institute of Technology",
          "Pace University",
        ],
      },
    ],
  },
  {
    id: "uk",
    country: "United Kingdom",
    flag: "🇬🇧",
    costPerYear: "₹28–42 L",
    workRights: "2-year Graduate Route visa",
    ambitiousCutoff: 0.84,
    targetCutoff: 0.7,
    tiers: [
      {
        tier: "Ambitious",
        schools: [
          "Imperial College London",
          "University of Edinburgh",
          "University of Manchester",
        ],
      },
      {
        tier: "Target",
        schools: [
          "University of Glasgow",
          "University of Birmingham",
          "Queen Mary University of London",
        ],
      },
      {
        tier: "Safe",
        schools: [
          "University of Sussex",
          "Coventry University",
          "University of Hertfordshire",
        ],
      },
    ],
  },
  {
    id: "canada",
    country: "Canada",
    flag: "🇨🇦",
    costPerYear: "₹22–34 L",
    workRights: "Up to 3-year PGWP",
    ambitiousCutoff: 0.82,
    targetCutoff: 0.68,
    tiers: [
      {
        tier: "Ambitious",
        schools: [
          "University of Toronto",
          "University of British Columbia",
          "McGill University",
        ],
      },
      {
        tier: "Target",
        schools: [
          "University of Waterloo",
          "Dalhousie University",
          "Carleton University",
        ],
      },
      {
        tier: "Safe",
        schools: [
          "Conestoga College",
          "Seneca Polytechnic",
          "Thompson Rivers University",
        ],
      },
    ],
  },
  {
    id: "australia",
    country: "Australia",
    flag: "🇦🇺",
    costPerYear: "₹26–38 L",
    workRights: "2 to 4-year post-study work",
    ambitiousCutoff: 0.83,
    targetCutoff: 0.69,
    tiers: [
      {
        tier: "Ambitious",
        schools: [
          "University of Melbourne",
          "Australian National University",
          "University of Sydney",
        ],
      },
      {
        tier: "Target",
        schools: [
          "Monash University",
          "University of Adelaide",
          "RMIT University",
        ],
      },
      {
        tier: "Safe",
        schools: [
          "Deakin University",
          "La Trobe University",
          "Griffith University",
        ],
      },
    ],
  },
  {
    id: "germany",
    country: "Germany",
    flag: "🇩🇪",
    costPerYear: "₹8–16 L",
    workRights: "18-month job-seeker visa",
    ambitiousCutoff: 0.85,
    targetCutoff: 0.71,
    tiers: [
      {
        tier: "Ambitious",
        schools: [
          "Technical University of Munich",
          "RWTH Aachen University",
          "Heidelberg University",
        ],
      },
      {
        tier: "Target",
        schools: [
          "Technical University of Berlin",
          "University of Stuttgart",
          "Leibniz University Hannover",
        ],
      },
      {
        tier: "Safe",
        schools: [
          "SRH Hochschule Heidelberg",
          "Schmalkalden University",
          "Hochschule Bremen",
        ],
      },
    ],
  },
  {
    id: "ireland",
    country: "Ireland",
    flag: "🇮🇪",
    costPerYear: "₹20–30 L",
    workRights: "2-year stay-back for masters",
    ambitiousCutoff: 0.82,
    targetCutoff: 0.68,
    tiers: [
      {
        tier: "Ambitious",
        schools: [
          "Trinity College Dublin",
          "University College Dublin",
          "University of Galway",
        ],
      },
      {
        tier: "Target",
        schools: [
          "Dublin City University",
          "University College Cork",
          "University of Limerick",
        ],
      },
      {
        tier: "Safe",
        schools: [
          "Technological University Dublin",
          "Munster Technological University",
          "Griffith College Dublin",
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Platform features                                                   */
/* ------------------------------------------------------------------ */

export const AI_EVALUATION = {
  prompt:
    "Some people believe universities should fund only subjects with clear job outcomes. Others say every field deserves support. Discuss both views and give your opinion.",
  response:
    "Funding decisions in higher education are increasingly contested. While there is a practical case for directing public money towards employable disciplines, I would argue that a narrow focus on immediate job outcomes underestimates how knowledge actually produces value...",
  overall: 7.5,
  criteria: [
    {
      label: "Task Achievement",
      score: 7.5,
      note: "Both views addressed with a clear position held throughout.",
    },
    {
      label: "Coherence & Cohesion",
      score: 8,
      note: "Paragraphing is logical; linking devices used without overuse.",
    },
    {
      label: "Lexical Resource",
      score: 7,
      note: "Good range, though two collocations are slightly imprecise.",
    },
    {
      label: "Grammatical Range",
      score: 7.5,
      note: "Complex structures handled well; three article slips found.",
    },
  ],
  fixes: [
    "Replace 'underestimates how knowledge actually produces value' with a more precise academic phrase.",
    "Add one concrete example in paragraph three to support the counter-argument.",
    "Watch article use before abstract nouns such as 'research' and 'funding'.",
  ],
};

export const MOCK_TEST_PREVIEW = {
  section: "Reading · Passage 2",
  timeRemaining: "18:42",
  answered: 27,
  total: 40,
  palette: Array.from({ length: 40 }, (_, i) => ({
    number: i + 1,
    state:
      i < 24
        ? ("answered" as const)
        : i < 27
          ? ("flagged" as const)
          : ("unseen" as const),
  })),
  analytics: [
    { label: "Listening", score: 82, delta: "+9" },
    { label: "Reading", score: 74, delta: "+14" },
    { label: "Writing", score: 68, delta: "+6" },
    { label: "Speaking", score: 79, delta: "+11" },
  ],
};

export const COUNSELING_STEPS = [
  {
    id: "profile",
    title: "Profile evaluation",
    duration: "Week 1",
    body: "Academics, backlogs, work experience and budget reviewed against your target intake so the plan starts from reality.",
    deliverable: "Profile report with realistic score targets",
  },
  {
    id: "shortlist",
    title: "University shortlisting",
    duration: "Week 2–3",
    body: "Twelve universities split across ambitious, target and safe tiers, each with deadlines, fees and scholarship notes.",
    deliverable: "Shortlist tracker with deadlines",
  },
  {
    id: "documents",
    title: "SOP & LOR editing",
    duration: "Week 4–6",
    body: "We build the narrative with you, brief your recommenders and run two editing rounds on every document.",
    deliverable: "Submission-ready SOP, LORs and resume",
  },
  {
    id: "visa",
    title: "Visa & mock interviews",
    duration: "Post-admit",
    body: "Financial documentation checked line by line, followed by three recorded mock interviews with officer-style questioning.",
    deliverable: "Visa file plus interview readiness score",
  },
];

export const BENEFITS = [
  {
    title: "Learn from anywhere",
    body: "Live classes run on web and mobile, and every session is recorded for 12 months.",
    icon: "globe",
  },
  {
    title: "Flexible schedules",
    body: "Morning, evening and weekend batches, with a free batch switch if work gets in the way.",
    icon: "calendar",
  },
  {
    title: "Interactive material",
    body: "Drills, simulations and question banks that adapt to the sections you keep losing marks on.",
    icon: "sparkles",
  },
  {
    title: "Personalised paths",
    body: "Your diagnostic decides your syllabus order — no two study plans look the same.",
    icon: "route",
  },
  {
    title: "Certified trainers",
    body: "Every trainer holds a band 8+ or 330+ score and at least five years of classroom time.",
    icon: "badge",
  },
  {
    title: "Feedback in minutes",
    body: "Writing and speaking submissions return a criterion-wise breakdown in under a minute.",
    icon: "zap",
  },
  {
    title: "A real cohort",
    body: "Study groups, peer speaking partners and weekly doubt rooms with your batch.",
    icon: "users",
  },
  {
    title: "Honest pricing",
    body: "One fee covers classes, mocks and evaluations. No per-test charges hidden at checkout.",
    icon: "wallet",
  },
];

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */

export type BillingCycle = "monthly" | "quarterly" | "complete";

export const BILLING_CYCLES: {
  id: BillingCycle;
  label: string;
  note: string;
  discount?: string;
  multiplier: number;
  period: string;
}[] = [
  { id: "monthly", label: "Monthly", note: "Cancel anytime", multiplier: 1, period: "/month" },
  {
    id: "quarterly",
    label: "Quarterly",
    note: "Billed every 3 months",
    discount: "Save 15%",
    multiplier: 2.55,
    period: "/quarter",
  },
  {
    id: "complete",
    label: "Complete prep",
    note: "One fee till your test date",
    discount: "Save 30%",
    multiplier: 4.2,
    period: "one-time",
  },
];

export type Plan = {
  id: string;
  name: string;
  tagline: string;
  basePrice: number;
  popular?: boolean;
  bestFor: string;
  features: { label: string; included: boolean }[];
};

export const PLANS: Plan[] = [
  {
    id: "self-paced",
    name: "Self-Paced AI Prep",
    tagline: "Everything you need to practise properly, on your own clock.",
    basePrice: 2499,
    bestFor: "Disciplined self-studiers",
    features: [
      { label: "Full question bank and section drills", included: true },
      { label: "12 adaptive full-length mock tests", included: true },
      { label: "AI writing and speaking evaluation (20/month)", included: true },
      { label: "Recorded masterclass library", included: true },
      { label: "Live classes with a trainer", included: false },
      { label: "1-on-1 mentorship sessions", included: false },
      { label: "University shortlisting and SOP review", included: false },
      { label: "Visa documentation support", included: false },
    ],
  },
  {
    id: "pro-live",
    name: "Pro Live Classes + AI",
    tagline: "Daily live coaching with unlimited AI feedback between sessions.",
    basePrice: 5999,
    popular: true,
    bestFor: "Most test takers",
    features: [
      { label: "Full question bank and section drills", included: true },
      { label: "Unlimited adaptive full-length mocks", included: true },
      { label: "Unlimited AI writing and speaking evaluation", included: true },
      { label: "Daily live classes, all four modules", included: true },
      { label: "Weekly doubt rooms and peer speaking pods", included: true },
      { label: "Two trainer-reviewed speaking mocks", included: true },
      { label: "University shortlisting and SOP review", included: false },
      { label: "Visa documentation support", included: false },
    ],
  },
  {
    id: "elite",
    name: "Elite 1-on-1 & Admissions",
    tagline: "A dedicated mentor for the test and a counsellor through the admit.",
    basePrice: 11999,
    bestFor: "Admits at ranked universities",
    features: [
      { label: "Everything in Pro Live Classes", included: true },
      { label: "Weekly 1-on-1 mentorship with a band 8+ trainer", included: true },
      { label: "Priority human review on every submission", included: true },
      { label: "12-university shortlist across three tiers", included: true },
      { label: "SOP, LOR and resume editing, two rounds each", included: true },
      { label: "Scholarship and assistantship mapping", included: true },
      { label: "Visa documentation and three mock interviews", included: true },
      { label: "Pre-departure and accommodation briefing", included: true },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Success stories                                                     */
/* ------------------------------------------------------------------ */

export type Story = {
  id: string;
  name: string;
  city: string;
  exam: string;
  category: "english" | "graduate" | "undergraduate" | "counseling";
  before: string;
  after: string;
  admit: string;
  program: string;
  quote: string;
  weeks: number;
  accent: "brand" | "blue" | "green" | "amber" | "violet";
};

export const STORIES: Story[] = [
  {
    id: "s1",
    name: "Kashish Mehra",
    city: "Delhi",
    exam: "IELTS",
    category: "english",
    before: "6.5",
    after: "8.0",
    admit: "University of Edinburgh",
    program: "MSc Data Science",
    quote:
      "Writing was stuck at 6 for months. The criterion-wise feedback told me exactly which band descriptor I was missing, and I stopped guessing what examiners wanted.",
    weeks: 8,
    accent: "brand",
  },
  {
    id: "s2",
    name: "Alok Nair",
    city: "Kochi",
    exam: "IELTS",
    category: "english",
    before: "6.0",
    after: "7.5",
    admit: "University of Waterloo",
    program: "MEng Electrical",
    quote:
      "The speaking pods were the difference. Talking to a real partner four times a week fixed my fluency faster than any recording ever did.",
    weeks: 7,
    accent: "blue",
  },
  {
    id: "s3",
    name: "Rudrakshi Pillai",
    city: "Pune",
    exam: "GRE",
    category: "graduate",
    before: "305",
    after: "328",
    admit: "Georgia Institute of Technology",
    program: "MS Computer Science",
    quote:
      "My error log became the whole syllabus. By week six I was re-practising only the question types I actually failed, which felt ruthless and worked.",
    weeks: 10,
    accent: "green",
  },
  {
    id: "s4",
    name: "Vanshika Rao",
    city: "Bengaluru",
    exam: "PTE",
    category: "english",
    before: "62",
    after: "86",
    admit: "University of Melbourne",
    program: "Master of IT",
    quote:
      "Unlimited AI scoring meant I could repeat describe-image twenty times in an evening and watch the fluency number climb.",
    weeks: 4,
    accent: "amber",
  },
  {
    id: "s5",
    name: "Ritwik Sharma",
    city: "Jaipur",
    exam: "GMAT Focus",
    category: "graduate",
    before: "595",
    after: "705",
    admit: "ESADE Business School",
    program: "MBA 2026",
    quote:
      "Data Insights was the section everyone ignored. Three weeks of structured DI practice moved my total more than any amount of quant revision.",
    weeks: 12,
    accent: "violet",
  },
  {
    id: "s6",
    name: "Ananya Deshpande",
    city: "Nagpur",
    exam: "TOEFL",
    category: "english",
    before: "88",
    after: "112",
    admit: "Technical University of Munich",
    program: "MSc Informatics",
    quote:
      "The note-taking shorthand carried me through the integrated tasks. I walked out of the test knowing I had not missed a single lecture detail.",
    weeks: 6,
    accent: "blue",
  },
  {
    id: "s7",
    name: "Dhruv Patel",
    city: "Ahmedabad",
    exam: "SAT",
    category: "undergraduate",
    before: "1270",
    after: "1520",
    admit: "Purdue University",
    program: "BS Industrial Engineering",
    quote:
      "Module-adaptive practice taught me to protect module one. Once I stopped rushing the first half, the second half got easier every time.",
    weeks: 14,
    accent: "brand",
  },
  {
    id: "s8",
    name: "Meher Kaur",
    city: "Chandigarh",
    exam: "Admissions",
    category: "counseling",
    before: "No shortlist",
    after: "5 admits",
    admit: "University College Dublin",
    program: "MSc Business Analytics",
    quote:
      "I came in with a vague plan and a 6.5 band. The shortlist was honest about where I would and would not get in, and that honesty saved me four application fees.",
    weeks: 16,
    accent: "green",
  },
  {
    id: "s9",
    name: "Ibrahim Qureshi",
    city: "Hyderabad",
    exam: "IELTS",
    category: "english",
    before: "5.5",
    after: "7.0",
    admit: "University of Glasgow",
    program: "MSc Project Management",
    quote:
      "Starting at 5.5 I assumed a year of work. The diagnostic put listening and reading first because those moved fastest, and the band followed in two months.",
    weeks: 9,
    accent: "amber",
  },
];

export const STORY_FILTERS = [
  { id: "all", label: "All results" },
  { id: "english", label: "English proficiency" },
  { id: "graduate", label: "Graduate admissions" },
  { id: "undergraduate", label: "Undergraduate" },
  { id: "counseling", label: "Admissions counseling" },
];

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export type FaqCategory = "general" | "testprep" | "pricing" | "abroad";

export const FAQ_CATEGORIES: { id: FaqCategory; label: string }[] = [
  { id: "general", label: "General" },
  { id: "testprep", label: "Test prep" },
  { id: "pricing", label: "Pricing & refunds" },
  { id: "abroad", label: "Study abroad" },
];

export const FAQS: { category: FaqCategory; q: string; a: string }[] = [
  {
    category: "general",
    q: "What exactly is ForeignPrep?",
    a: "An online preparation platform for the tests that gate studying abroad — IELTS, TOEFL, PTE, Duolingo, GRE, GMAT and SAT — combined with an admissions desk that takes you from university shortlisting through to the visa interview.",
  },
  {
    category: "general",
    q: "Do I need to attend classes at a fixed time?",
    a: "No. Every batch runs in morning, evening and weekend slots, all sessions are recorded for 12 months, and you can switch batches once at no cost if your schedule changes.",
  },
  {
    category: "general",
    q: "How do I reach a trainer when I am stuck?",
    a: "Daily doubt rooms run for an hour after class, and every plan includes an in-platform message thread with your trainer answered within one working day.",
  },
  {
    category: "general",
    q: "Is a prior knowledge of English required?",
    a: "You need a working command of English to start a test-prep batch. If your diagnostic lands below IELTS band 5, we start you on a four-week foundation module before the main program.",
  },
  {
    category: "testprep",
    q: "How many mock tests do I get?",
    a: "Between 8 and 16 full-length adaptive mocks depending on the program, plus unlimited section-level practice. Pro and Elite plans remove the mock limit entirely.",
  },
  {
    category: "testprep",
    q: "How accurate is the AI evaluation?",
    a: "Writing and speaking submissions are scored against the official band descriptors and land within half a band of our trainers' scores on roughly nine out of ten submissions. Elite plans add a human review on top.",
  },
  {
    category: "testprep",
    q: "How long does it usually take to hit my target?",
    a: "A one-band IELTS gain typically takes six to eight weeks of consistent work; a 20-point GRE gain takes ten to twelve. The calculator on this page gives you a timeline based on your own current and target scores.",
  },
  {
    category: "testprep",
    q: "What if I do not reach my target score?",
    a: "Pro and Elite students who attend at least 80% of classes and complete the assigned mocks get a free repeat batch for the next cycle.",
  },
  {
    category: "pricing",
    q: "What does the fee actually cover?",
    a: "Classes, the full question bank, every mock test, AI evaluations and recordings. There are no per-test or per-evaluation charges added later.",
  },
  {
    category: "pricing",
    q: "Can I pay in instalments?",
    a: "Yes. Quarterly and complete-prep packages can be split into three interest-free instalments, and no-cost EMI is available on most credit cards.",
  },
  {
    category: "pricing",
    q: "What is the refund policy?",
    a: "Full refund within seven days of enrolment if you have attended no more than two live classes. After that we move to a pro-rata credit you can use on any other program for 12 months.",
  },
  {
    category: "pricing",
    q: "Are there scholarships or discounts?",
    a: "We run need-based fee waivers of up to 40% each intake, and students who enrol as a pair get 15% off both plans.",
  },
  {
    category: "abroad",
    q: "Which countries do you place students in?",
    a: "The United States, United Kingdom, Canada, Australia, Germany and Ireland, with 38 partner universities across them.",
  },
  {
    category: "abroad",
    q: "Do you help with the student visa?",
    a: "Yes, on the Elite plan and the standalone Admissions Desk. That covers financial documentation, the application file and three recorded mock interviews.",
  },
  {
    category: "abroad",
    q: "When should I start preparing for a Fall intake?",
    a: "Around twelve to fourteen months ahead. Test scores should be final by August of the preceding year so applications go out in the first round, when seats and scholarships are both less contested.",
  },
  {
    category: "abroad",
    q: "Can you help if I have academic backlogs or a study gap?",
    a: "Yes. Both are common and manageable with the right university list and a clear explanation in your SOP. The profile evaluation addresses this directly in week one.",
  },
];

/* ------------------------------------------------------------------ */
/* Diagnostic quiz                                                     */
/* ------------------------------------------------------------------ */

export type QuizQuestion = {
  id: string;
  section: string;
  prompt: string;
  passage?: string;
  options: { id: string; text: string }[];
  answerId: string;
  explanation: string;
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    section: "Reading · True / False / Not Given",
    passage:
      "The city council approved the cycle-lane expansion in March, three months after the transport committee recommended it. Funding for the first phase came entirely from the municipal budget, though officials have said later phases may require central grants.",
    prompt:
      "Statement: The cycle-lane expansion was funded partly by central grants.",
    options: [
      { id: "a", text: "True" },
      { id: "b", text: "False" },
      { id: "c", text: "Not Given" },
    ],
    answerId: "b",
    explanation:
      "The passage states the first phase came entirely from the municipal budget. Later phases 'may require' grants, which is a possibility, not funding already received — so the statement contradicts the text.",
  },
  {
    id: "q2",
    section: "Writing · Lexical Resource",
    prompt:
      "Which option replaces the underlined phrase with the most precise academic alternative? 'The study shows a big rise in applications from rural districts.'",
    options: [
      { id: "a", text: "a huge jump in" },
      { id: "b", text: "a marked increase in" },
      { id: "c", text: "a lot more" },
      { id: "d", text: "a big-time growth of" },
    ],
    answerId: "b",
    explanation:
      "'A marked increase in' is the register expected in academic writing. The other options are informal or imprecise, which caps your Lexical Resource band.",
  },
  {
    id: "q3",
    section: "Grammar · Range & Accuracy",
    prompt:
      "Choose the grammatically correct sentence.",
    options: [
      {
        id: "a",
        text: "Had the committee reviewed the data earlier, the delay could have been avoided.",
      },
      {
        id: "b",
        text: "If the committee would have reviewed the data earlier, the delay could be avoided.",
      },
      {
        id: "c",
        text: "The committee reviewing the data earlier, the delay avoided.",
      },
      {
        id: "d",
        text: "Unless the committee reviewed the data earlier, the delay could have avoided.",
      },
    ],
    answerId: "a",
    explanation:
      "Option A is a correct inverted third conditional. It signals grammatical range, which is exactly what band 7+ descriptors reward.",
  },
];

/* ------------------------------------------------------------------ */
/* Counseling modal options                                            */
/* ------------------------------------------------------------------ */

export const COUNSELING_GOALS = [
  {
    id: "test",
    title: "Crack a test",
    body: "I need a target score on IELTS, TOEFL, PTE, GRE, GMAT or SAT.",
  },
  {
    id: "admissions",
    title: "Get into a university",
    body: "I want a shortlist, applications and documents handled end to end.",
  },
  {
    id: "both",
    title: "Both, start to finish",
    body: "Score first, then applications and the visa with the same team.",
  },
  {
    id: "unsure",
    title: "Still exploring",
    body: "I want to understand costs, timelines and whether this is realistic.",
  },
];

export const TIME_SLOTS = [
  { id: "t1", day: "Today", time: "6:00 PM", left: 2 },
  { id: "t2", day: "Today", time: "7:30 PM", left: 1 },
  { id: "t3", day: "Tomorrow", time: "11:00 AM", left: 4 },
  { id: "t4", day: "Tomorrow", time: "4:00 PM", left: 3 },
  { id: "t5", day: "Saturday", time: "10:30 AM", left: 5 },
  { id: "t6", day: "Saturday", time: "1:00 PM", left: 2 },
];

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export const FOOTER_COLUMNS: { heading: string; links: string[] }[] = [
  {
    heading: "Test prep",
    links: ["IELTS", "TOEFL iBT", "PTE Academic", "Duolingo", "GRE", "GMAT Focus", "Digital SAT"],
  },
  {
    heading: "Destinations",
    links: ["United States", "United Kingdom", "Canada", "Australia", "Germany", "Ireland"],
  },
  {
    heading: "Services",
    links: [
      "AI practice tests",
      "1-on-1 mentorship",
      "University shortlisting",
      "SOP & LOR review",
      "Visa guidance",
      "Scholarship mapping",
    ],
  },
  {
    heading: "Company",
    links: ["About us", "Our trainers", "Student results", "Careers", "Contact", "Blog"],
  },
];

export const LEGAL_LINKS = [
  "Privacy policy",
  "Terms of service",
  "Refund & cancellation",
  "Code of conduct",
];

export const EXAM_OPTIONS = [
  "IELTS",
  "TOEFL iBT",
  "PTE Academic",
  "Duolingo",
  "GRE",
  "GMAT Focus",
  "Digital SAT",
  "Admissions counseling",
];

export const UNIVERSITY_LOGOS = [
  "Edinburgh",
  "Waterloo",
  "Georgia Tech",
  "TU Munich",
  "Melbourne",
  "UCD Dublin",
  "Purdue",
  "Manchester",
  "UBC",
  "Monash",
];
