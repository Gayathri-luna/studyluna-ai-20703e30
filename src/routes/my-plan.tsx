import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { BellRing, CalendarClock, CheckCircle2, Clock, Plus, Target, Trash2 } from "lucide-react";
import {
  SCHEDULES,
  STATUSES,
  planProgress,
  scheduleLabel,
  usePlan,
  type ScheduleId,
  type StatusId,
} from "@/lib/planner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DESCRIPTION =
  "Create your own learning goal on LUNA — pick a topic, a study schedule, an optional target date and a daily reminder, then track your progress.";

export const Route = createFileRoute("/my-plan")({
  head: () => ({
    meta: [
      { title: "My Learning Plan & Reminders | LUNA" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "My Learning Plan — LUNA" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MyPlanPage,
});

function MyPlanPage() {
  const { goals, addGoal, updateGoal, removeGoal } = usePlan();
  const [topic, setTopic] = useState("");
  const [goal, setGoal] = useState("");
  const [schedule, setSchedule] = useState<ScheduleId>("daily");
  const [reminderTime, setReminderTime] = useState("19:00");
  const [targetDate, setTargetDate] = useState("");
  const [dailyMinutes, setDailyMinutes] = useState("");

  const progress = useMemo(() => planProgress(goals), [goals]);

  async function requestNotifications() {
    if (typeof Notification === "undefined") {
      toast.error("This browser does not support notifications. In-app reminders still work.");
      return;
    }
    if (Notification.permission === "granted") {
      toast.success("Browser notifications are already enabled.");
      return;
    }
    if (Notification.permission === "denied") {
      toast.error("Notifications are blocked in your browser settings. In-app reminders still work.");
      return;
    }
    const result = await Notification.requestPermission();
    if (result === "granted") toast.success("Browser reminders enabled.");
    else toast("Reminders will show inside LUNA while this tab is open.");
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!topic.trim()) {
      toast.error("Add a topic or skill first.");
      return;
    }
    addGoal({
      topic: topic.trim(),
      goal: goal.trim() || `Learn ${topic.trim()}`,
      schedule,
      reminderTime: reminderTime || undefined,
      targetDate: targetDate || undefined,
      dailyMinutes: dailyMinutes ? Number(dailyMinutes) : undefined,
    });
    toast.success("Goal added to your plan.");
    setTopic("");
    setGoal("");
    setTargetDate("");
    setDailyMinutes("");
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <header className="animate-rise">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/50 px-3 py-1 text-xs font-medium text-muted-foreground">
          <Target className="h-3.5 w-3.5 text-primary" /> Personal Learning
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          My Learning Plan
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Set your own goal, choose how often you'll study and get a reminder in your browser. Your
          plan is saved on this device — no email, SMS or push notifications are sent.
        </p>
      </header>

      <form
        onSubmit={onSubmit}
        className="animate-rise mt-8 grid gap-4 rounded-2xl border border-border/70 bg-card/50 p-5 backdrop-blur-xl sm:p-6"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="topic">Topic or skill</Label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="C Programming"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="goal">Goal</Label>
            <Input
              id="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Learn C Programming"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="schedule">Preferred study schedule</Label>
            <Select value={schedule} onValueChange={(v) => setSchedule(v as ScheduleId)}>
              <SelectTrigger id="schedule">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SCHEDULES.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="reminder">Reminder time (optional)</Label>
            <Input
              id="reminder"
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="target">Target date (optional)</Label>
            <Input
              id="target"
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="minutes">Daily study time in minutes (optional)</Label>
            <Input
              id="minutes"
              type="number"
              min={5}
              max={600}
              value={dailyMinutes}
              onChange={(e) => setDailyMinutes(e.target.value)}
              placeholder="45"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" className="gap-2">
            <Plus className="h-4 w-4" /> Add goal
          </Button>
          <Button type="button" variant="outline" className="gap-2" onClick={requestNotifications}>
            <BellRing className="h-4 w-4" /> Enable browser reminders
          </Button>
        </div>
      </form>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-xl font-bold text-foreground">Personal Learning</h2>
          {progress.total > 0 && (
            <p className="text-sm text-muted-foreground">
              {progress.completed} of {progress.total} completed · {progress.inProgress} in progress
            </p>
          )}
        </div>

        {progress.total > 0 && (
          <div
            className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={progress.percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Learning plan progress"
          >
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out motion-reduce:transition-none"
              style={{ width: `${progress.percent}%` }}
            />
          </div>
        )}

        {goals.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-border/70 bg-card/30 p-6 text-sm text-muted-foreground">
            No goals yet. Add your first one above — for example “Learn C Programming”, daily at 7:00 PM.
          </p>
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {goals.map((item, index) => (
              <li
                key={item.id}
                style={{ animationDelay: `${index * 50}ms` }}
                className="animate-rise rounded-2xl border border-border/70 bg-card/50 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/60"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-foreground">{item.topic}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.goal}</p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${item.topic}`}
                    onClick={() => {
                      removeGoal(item.id);
                      toast("Goal removed");
                    }}
                    className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 px-2.5 py-1">
                    <CalendarClock className="h-3.5 w-3.5 text-primary" /> {scheduleLabel(item.schedule)}
                  </span>
                  {item.reminderTime && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 px-2.5 py-1">
                      <BellRing className="h-3.5 w-3.5 text-primary" /> {item.reminderTime}
                    </span>
                  )}
                  {item.dailyMinutes && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 px-2.5 py-1">
                      <Clock className="h-3.5 w-3.5 text-primary" /> {item.dailyMinutes} min/day
                    </span>
                  )}
                  {item.targetDate && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 px-2.5 py-1">
                      <Target className="h-3.5 w-3.5 text-primary" /> by {item.targetDate}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {STATUSES.map((status) => {
                    const active = item.status === status.id;
                    return (
                      <button
                        key={status.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => updateGoal(item.id, { status: status.id as StatusId })}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 hover:scale-[1.03] motion-reduce:hover:scale-100 ${
                          active
                            ? "border-primary/70 bg-primary/15 text-primary"
                            : "border-border/70 bg-card/50 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {active && status.id === "completed" && <CheckCircle2 className="h-3.5 w-3.5" />}
                        {status.label}
                      </button>
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
