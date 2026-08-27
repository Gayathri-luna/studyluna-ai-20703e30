/**
 * StudyLUNA gamification engine.
 *
 * Deliberately learning-first: XP is only awarded for real study actions
 * (lessons, quizzes, assignments, projects, AI study sessions), every award
 * carries a human-readable reason, and nothing here is random or game-like.
 *
 * State lives in localStorage so it works for guests too; signed-in students
 * keep the same key per browser.
 */

import { useCallback, useEffect, useState } from "react";

const KEY = "luna-gamification-v1";
const EVENT = "luna-gamification-changed";

export type ActivityKind =
  | "lesson"
  | "quiz"
  | "assignment"
  | "project"
  | "reading"
  | "ai-session"
  | "challenge";

export interface XPEvent {
  id: string;
  kind: ActivityKind;
  label: string;
  reason: string;
  xp: number;
  at: string; // ISO
}

export interface CourseProgress {
  id: string;
  name: string;
  completed: number;
  total: number;
}

export interface GamificationState {
  xp: number;
  events: XPEvent[];
  badges: string[]; // badge ids
  streakDays: number;
  lastActiveDay: string | null; // YYYY-MM-DD
  bestStreak: number;
  challengesDone: string[];
  courses: CourseProgress[];
}

export const XP_BY_KIND: Record<ActivityKind, number> = {
  lesson: 20,
  quiz: 30,
  assignment: 40,
  project: 60,
  reading: 15,
  "ai-session": 10,
  challenge: 50,
};

export const ACTIVITY_LABELS: { kind: ActivityKind; label: string; hint: string }[] = [
  { kind: "lesson", label: "Lesson completed", hint: "Finished a roadmap or skill lesson" },
  { kind: "quiz", label: "Quiz attempted", hint: "Practised questions and reviewed answers" },
  { kind: "assignment", label: "Assignment done", hint: "Completed a self-assignment end to end" },
  { kind: "project", label: "Project milestone", hint: "Shipped a build step of a project" },
  { kind: "reading", label: "Study reading", hint: "Read notes, docs or a resource page" },
  { kind: "ai-session", label: "LunaAI study session", hint: "Learned a concept with LunaAI" },
];

/* ---------------- Levels ---------------- */

export interface Level {
  level: number;
  name: string;
  minXp: number;
  unlocks: string;
}

export const LEVELS: Level[] = [
  { level: 1, name: "Starter", minXp: 0, unlocks: "Daily streak tracking" },
  { level: 2, name: "Explorer", minXp: 150, unlocks: "Weekly challenges" },
  { level: 3, name: "Builder", minXp: 400, unlocks: "Project milestone rewards" },
  { level: 4, name: "Analyst", minXp: 800, unlocks: "Advanced revision packs" },
  { level: 5, name: "Specialist", minXp: 1400, unlocks: "Interview prep track" },
  { level: 6, name: "Mentor", minXp: 2200, unlocks: "Peer answering badge" },
  { level: 7, name: "Luminary", minXp: 3200, unlocks: "Full StudyLUNA certificate pack" },
];

export function levelFor(xp: number) {
  let current = LEVELS[0]!;
  for (const l of LEVELS) if (xp >= l.minXp) current = l;
  const next = LEVELS.find((l) => l.minXp > xp) ?? null;
  const span = next ? next.minXp - current.minXp : 1;
  const into = xp - current.minXp;
  return {
    current,
    next,
    progress: next ? Math.min(100, Math.round((into / span) * 100)) : 100,
    xpToNext: next ? next.minXp - xp : 0,
  };
}

/* ---------------- Badges ---------------- */

export interface Badge {
  id: string;
  name: string;
  description: string;
  criteria: string;
  earned: (s: GamificationState) => boolean;
}

const countKind = (s: GamificationState, kind: ActivityKind) =>
  s.events.filter((e) => e.kind === kind).length;

export const BADGES: Badge[] = [
  {
    id: "first-step",
    name: "First Step",
    description: "You logged your very first study activity.",
    criteria: "Log any 1 learning activity",
    earned: (s) => s.events.length >= 1,
  },
  {
    id: "quiz-sharp",
    name: "Quiz Sharp",
    description: "You practised with quizzes five times.",
    criteria: "Complete 5 quizzes",
    earned: (s) => countKind(s, "quiz") >= 5,
  },
  {
    id: "consistent-3",
    name: "Consistent",
    description: "You studied three days in a row.",
    criteria: "3-day learning streak",
    earned: (s) => s.bestStreak >= 3,
  },
  {
    id: "streak-7",
    name: "Week Strong",
    description: "A full week of daily learning.",
    criteria: "7-day learning streak",
    earned: (s) => s.bestStreak >= 7,
  },
  {
    id: "builder",
    name: "Builder",
    description: "You turned theory into a working project.",
    criteria: "Log 3 project milestones",
    earned: (s) => countKind(s, "project") >= 3,
  },
  {
    id: "assignment-ace",
    name: "Assignment Ace",
    description: "You finished five self-assignments.",
    criteria: "Complete 5 assignments",
    earned: (s) => countKind(s, "assignment") >= 5,
  },
  {
    id: "course-finisher",
    name: "Course Finisher",
    description: "You completed an entire course track.",
    criteria: "Finish 100% of any course",
    earned: (s) => s.courses.some((c) => c.total > 0 && c.completed >= c.total),
  },
  {
    id: "challenger",
    name: "Challenger",
    description: "You completed a weekly learning challenge.",
    criteria: "Complete 1 challenge",
    earned: (s) => s.challengesDone.length >= 1,
  },
  {
    id: "level-3",
    name: "Rising Scholar",
    description: "You reached Level 3 through steady study.",
    criteria: "Reach 400 XP",
    earned: (s) => s.xp >= 400,
  },
  {
    id: "level-5",
    name: "Specialist",
    description: "Deep, sustained learning across topics.",
    criteria: "Reach 1400 XP",
    earned: (s) => s.xp >= 1400,
  },
];

/* ---------------- Challenges ---------------- */

export interface Challenge {
  id: string;
  title: string;
  goal: string;
  why: string;
  xp: number;
  cadence: "Weekly" | "Course-based";
}

export const CHALLENGES: Challenge[] = [
  {
    id: "w-concepts",
    title: "Five concepts, five days",
    goal: "Learn and note down one new core concept each day this week.",
    why: "Spacing concepts across days improves long-term recall far more than one long session.",
    xp: 50,
    cadence: "Weekly",
  },
  {
    id: "w-quiz",
    title: "Quiz yourself thrice",
    goal: "Attempt three quizzes on topics you studied last week.",
    why: "Retrieval practice is the single most reliable way to make knowledge stick.",
    xp: 50,
    cadence: "Weekly",
  },
  {
    id: "w-teach",
    title: "Explain it simply",
    goal: "Explain one difficult topic in your own words to LunaAI or a friend.",
    why: "Teaching exposes the gaps you did not know you had.",
    xp: 50,
    cadence: "Weekly",
  },
  {
    id: "c-mini-project",
    title: "Ship a mini project",
    goal: "Finish one small project from the Project Builder, end to end.",
    why: "Applied work converts passive knowledge into usable skill and portfolio proof.",
    xp: 80,
    cadence: "Course-based",
  },
  {
    id: "c-revision",
    title: "Revision sweep",
    goal: "Revise a full unit and write a one-page summary sheet.",
    why: "Summarising forces you to prioritise what actually matters for exams.",
    xp: 60,
    cadence: "Course-based",
  },
  {
    id: "c-interview",
    title: "Ten interview questions",
    goal: "Answer ten interview-style questions from your branch.",
    why: "Early exposure to interview framing makes placement season far less stressful.",
    xp: 70,
    cadence: "Course-based",
  },
];

/* ---------------- Rewards ---------------- */

export interface Reward {
  id: string;
  name: string;
  detail: string;
  requiredXp: number;
}

export const REWARDS: Reward[] = [
  { id: "r1", name: "Revision notes pack", detail: "Downloadable summary notes for your branch.", requiredXp: 200 },
  { id: "r2", name: "Flashcard deck", detail: "Auto-generated flashcards from your studied topics.", requiredXp: 500 },
  { id: "r3", name: "Project certificate", detail: "A shareable certificate for completed projects.", requiredXp: 1000 },
  { id: "r4", name: "Interview prep kit", detail: "Curated question bank plus a mock-interview plan.", requiredXp: 1800 },
  { id: "r5", name: "StudyLUNA Scholar profile", detail: "A verified learning profile you can link in applications.", requiredXp: 3000 },
];

/* ---------------- Storage ---------------- */

const DEFAULT_COURSES: CourseProgress[] = [
  { id: "core", name: "Core branch roadmap", completed: 0, total: 24 },
  { id: "skills", name: "Skill track", completed: 0, total: 12 },
  { id: "projects", name: "Project builder", completed: 0, total: 8 },
];

const EMPTY: GamificationState = {
  xp: 0,
  events: [],
  badges: [],
  streakDays: 0,
  lastActiveDay: null,
  bestStreak: 0,
  challengesDone: [],
  courses: DEFAULT_COURSES,
};

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function dayDiff(a: string, b: string): number {
  return Math.round((Date.parse(b) - Date.parse(a)) / 86_400_000);
}

export function loadState(): GamificationState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<GamificationState>;
    return {
      ...EMPTY,
      ...parsed,
      events: Array.isArray(parsed.events) ? parsed.events : [],
      badges: Array.isArray(parsed.badges) ? parsed.badges : [],
      challengesDone: Array.isArray(parsed.challengesDone) ? parsed.challengesDone : [],
      courses: Array.isArray(parsed.courses) && parsed.courses.length ? parsed.courses : DEFAULT_COURSES,
    };
  } catch {
    return EMPTY;
  }
}

function save(state: GamificationState): GamificationState {
  const withBadges: GamificationState = {
    ...state,
    badges: Array.from(new Set([...state.badges, ...BADGES.filter((b) => b.earned(state)).map((b) => b.id)])),
  };
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(withBadges));
    window.dispatchEvent(new CustomEvent(EVENT));
  }
  return withBadges;
}

function touchStreak(state: GamificationState): GamificationState {
  const day = today();
  if (state.lastActiveDay === day) return state;
  const gap = state.lastActiveDay ? dayDiff(state.lastActiveDay, day) : null;
  const streakDays = gap === 1 ? state.streakDays + 1 : 1;
  return {
    ...state,
    lastActiveDay: day,
    streakDays,
    bestStreak: Math.max(state.bestStreak, streakDays),
  };
}

/** Current streak, expired if the student missed more than a day. */
export function liveStreak(state: GamificationState): number {
  if (!state.lastActiveDay) return 0;
  const gap = dayDiff(state.lastActiveDay, today());
  return gap <= 1 ? state.streakDays : 0;
}

export function logActivity(kind: ActivityKind, label: string, reason: string, xp?: number) {
  const base = touchStreak(loadState());
  const amount = xp ?? XP_BY_KIND[kind];
  const event: XPEvent = {
    id: crypto.randomUUID(),
    kind,
    label,
    reason,
    xp: amount,
    at: new Date().toISOString(),
  };
  return save({ ...base, xp: base.xp + amount, events: [event, ...base.events].slice(0, 60) });
}

export function completeChallenge(challenge: Challenge) {
  const state = loadState();
  if (state.challengesDone.includes(challenge.id)) return state;
  const next = touchStreak({ ...state, challengesDone: [...state.challengesDone, challenge.id] });
  return save({
    ...next,
    xp: next.xp + challenge.xp,
    events: [
      {
        id: crypto.randomUUID(),
        kind: "challenge" as const,
        label: challenge.title,
        reason: `Challenge completed — ${challenge.goal}`,
        xp: challenge.xp,
        at: new Date().toISOString(),
      },
      ...next.events,
    ].slice(0, 60),
  });
}

export function bumpCourse(courseId: string, delta: number) {
  const state = touchStreak(loadState());
  const courses = state.courses.map((c) =>
    c.id === courseId ? { ...c, completed: Math.max(0, Math.min(c.total, c.completed + delta)) } : c,
  );
  return save({ ...state, courses });
}

export function resetGamification() {
  return save({ ...EMPTY, courses: DEFAULT_COURSES });
}

/* ---------------- Hook ---------------- */

export function useGamification() {
  const [state, setState] = useState<GamificationState>(EMPTY);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => setState(loadState()), []);

  useEffect(() => {
    refresh();
    setReady(true);
    const onChange = () => refresh();
    window.addEventListener(EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [refresh]);

  return { state, ready, refresh };
}
