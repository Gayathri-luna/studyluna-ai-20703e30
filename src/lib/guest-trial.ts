import { useCallback, useEffect, useState } from "react";

/** Free-trial rules for guests (no account): 10 messages, or 10 minutes from the first message. */
export const GUEST_MESSAGE_LIMIT = 10;
export const GUEST_WINDOW_MS = 10 * 60_000;

const KEY = "luna-guest-trial";

export type GuestTrial = { used: number; startedAt: number | null };

const EMPTY: GuestTrial = { used: 0, startedAt: null };

function read(): GuestTrial {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<GuestTrial>;
    return {
      used: typeof parsed.used === "number" ? parsed.used : 0,
      startedAt: typeof parsed.startedAt === "number" ? parsed.startedAt : null,
    };
  } catch {
    return EMPTY;
  }
}

function write(trial: GuestTrial) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(trial));
  } catch {
    /* storage unavailable — the server-side trial cap still applies */
  }
}

export function messagesLeft(trial: GuestTrial) {
  return Math.max(0, GUEST_MESSAGE_LIMIT - trial.used);
}

export function timeExpired(trial: GuestTrial, now = Date.now()) {
  return trial.startedAt !== null && now - trial.startedAt >= GUEST_WINDOW_MS;
}

export function trialOver(trial: GuestTrial, now = Date.now()) {
  return messagesLeft(trial) === 0 || timeExpired(trial, now);
}

/**
 * Tracks the guest free trial in localStorage.
 * `enabled` is false for signed-in users, who never hit these limits.
 */
export function useGuestTrial(enabled: boolean) {
  const [trial, setTrial] = useState<GuestTrial>(EMPTY);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    setTrial(read());
  }, [enabled]);

  // Keeps the countdown badge and the time limit honest while the tab stays open.
  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => setTick((t) => t + 1), 15_000);
    return () => clearInterval(id);
  }, [enabled]);

  const consume = useCallback(() => {
    const current = read();
    const next: GuestTrial = {
      used: current.used + 1,
      startedAt: current.startedAt ?? Date.now(),
    };
    write(next);
    setTrial(next);
  }, []);

  void tick; // re-render trigger so the badge/timer stay current
  const left = messagesLeft(trial);
  const expired = enabled && trialOver(trial);
  const minutesLeft =
    trial.startedAt === null
      ? Math.round(GUEST_WINDOW_MS / 60_000)
      : Math.max(0, Math.ceil((trial.startedAt + GUEST_WINDOW_MS - Date.now()) / 60_000));

  return { trial, left, expired, minutesLeft, consume, timedOut: enabled && timeExpired(trial) };
}
