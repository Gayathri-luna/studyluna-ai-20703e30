import { useCallback, useEffect, useState } from "react";

/**
 * Personal Learning Plan — local-first store.
 *
 * Goals live in localStorage (same approach as luna-threads). No backend or
 * push/email/SMS notification service is involved: reminders are in-browser only.
 */

export const SCHEDULES = [
  { id: "daily", label: "Every day" },
  { id: "weekdays", label: "Weekdays (Mon–Fri)" },
  { id: "weekends", label: "Weekends" },
  { id: "weekly", label: "Once a week" },
] as const;

export type ScheduleId = (typeof SCHEDULES)[number]["id"];

export const STATUSES = [
  { id: "not-started", label: "Not started" },
  { id: "in-progress", label: "In progress" },
  { id: "completed", label: "Completed" },
] as const;

export type StatusId = (typeof STATUSES)[number]["id"];

export interface LearningGoal {
  id: string;
  topic: string;
  goal: string;
  schedule: ScheduleId;
  /** "HH:MM" 24h local time, optional. */
  reminderTime?: string | undefined;
  /** ISO date (yyyy-mm-dd), optional. */
  targetDate?: string | undefined;
  /** Optional daily study minutes. */
  dailyMinutes?: number | undefined;
  status: StatusId;
  createdAt: number;
  /** Timestamp of last reminder fired, used to fire at most once a day. */
  lastRemindedAt?: number | undefined;
}

const KEY = "luna-learning-plan-v1";
const EVENT = "luna-plan-change";

const isBrowser = () => typeof window !== "undefined";

export function loadGoals(): LearningGoal[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as LearningGoal[]) : [];
  } catch {
    return [];
  }
}

export function saveGoals(goals: LearningGoal[]) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(goals));
  } catch {
    /* storage full or unavailable — ignore */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function createGoalId() {
  return `goal-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Reactive access to the plan across components/tabs. */
export function usePlan() {
  const [goals, setGoals] = useState<LearningGoal[]>([]);

  useEffect(() => {
    const sync = () => setGoals(loadGoals());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const addGoal = useCallback((goal: Omit<LearningGoal, "id" | "createdAt" | "status"> & { status?: StatusId | undefined }) => {
    const next: LearningGoal = {
      ...goal,
      status: goal.status ?? "not-started",
      id: createGoalId(),
      createdAt: Date.now(),
    };
    saveGoals([next, ...loadGoals()]);
    return next;
  }, []);

  const updateGoal = useCallback((id: string, patch: Partial<LearningGoal>) => {
    saveGoals(loadGoals().map((g) => (g.id === id ? { ...g, ...patch } : g)));
  }, []);

  const removeGoal = useCallback((id: string) => {
    saveGoals(loadGoals().filter((g) => g.id !== id));
  }, []);

  return { goals, addGoal, updateGoal, removeGoal };
}

export function planProgress(goals: LearningGoal[]) {
  const total = goals.length;
  const completed = goals.filter((g) => g.status === "completed").length;
  const inProgress = goals.filter((g) => g.status === "in-progress").length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { total, completed, inProgress, notStarted: total - completed - inProgress, percent };
}

export function scheduleLabel(id: ScheduleId) {
  return SCHEDULES.find((s) => s.id === id)?.label ?? id;
}

export function statusLabel(id: StatusId) {
  return STATUSES.find((s) => s.id === id)?.label ?? id;
}

/** True when today matches the goal's schedule. */
export function isDueToday(goal: LearningGoal, now = new Date()) {
  const day = now.getDay(); // 0 Sun … 6 Sat
  switch (goal.schedule) {
    case "daily":
      return true;
    case "weekdays":
      return day >= 1 && day <= 5;
    case "weekends":
      return day === 0 || day === 6;
    case "weekly":
      return day === new Date(goal.createdAt).getDay();
    default:
      return false;
  }
}

function sameDay(a: number, b: number) {
  const d1 = new Date(a);
  const d2 = new Date(b);
  return d1.toDateString() === d2.toDateString();
}

/** Goals whose reminder time has passed today and that haven't been reminded yet today. */
export function dueReminders(goals: LearningGoal[], now = new Date()) {
  const minutesNow = now.getHours() * 60 + now.getMinutes();
  return goals.filter((goal) => {
    if (goal.status === "completed" || !goal.reminderTime) return false;
    if (!isDueToday(goal, now)) return false;
    const [h, m] = goal.reminderTime.split(":").map(Number);
    if (Number.isNaN(h) || Number.isNaN(m)) return false;
    const target = (h ?? 0) * 60 + (m ?? 0);
    if (minutesNow < target) return false;
    // Only within 2 hours of the scheduled time, and once per day.
    if (minutesNow - target > 120) return false;
    if (goal.lastRemindedAt && sameDay(goal.lastRemindedAt, now.getTime())) return false;
    return true;
  });
}

export function reminderMessage(goal: LearningGoal) {
  return `Time to continue your ${goal.topic} learning.`;
}
