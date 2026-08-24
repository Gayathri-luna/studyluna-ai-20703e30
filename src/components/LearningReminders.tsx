import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { dueReminders, loadGoals, reminderMessage, saveGoals } from "@/lib/planner";

/**
 * In-browser reminder runner. Mounted once in the root layout.
 *
 * Reminders are local only — an in-app toast plus (if the student has granted
 * permission) a browser Notification. No email, SMS or push backend exists.
 */
export function LearningReminders() {
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const check = () => {
      const goals = loadGoals();
      const due = dueReminders(goals);
      if (due.length === 0) return;

      const now = Date.now();
      saveGoals(goals.map((g) => (due.some((d) => d.id === g.id) ? { ...g, lastRemindedAt: now } : g)));

      for (const goal of due) {
        const message = reminderMessage(goal);
        toast("Learning reminder", { description: message, duration: 10000 });
        try {
          if (typeof Notification !== "undefined" && Notification.permission === "granted") {
            new Notification("LUNA learning reminder", { body: message });
          }
        } catch {
          /* Notification unsupported in this context — the toast is enough */
        }
      }
    };

    check();
    timer.current = setInterval(check, 60_000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  return null;
}
