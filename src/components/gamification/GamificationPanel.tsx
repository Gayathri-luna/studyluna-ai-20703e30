import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Flame,
  Gift,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ACTIVITY_LABELS,
  BADGES,
  CHALLENGES,
  LEVELS,
  REWARDS,
  bumpCourse,
  completeChallenge,
  levelFor,
  liveStreak,
  logActivity,
  resetGamification,
  useGamification,
  type Challenge,
} from "@/lib/gamification";

function Stat({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof Zap;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="luna-card animate-rise p-5">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4 text-primary" />
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-2 text-3xl font-extrabold text-foreground">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}

function SectionTitle({ icon: Icon, title, hint }: { icon: typeof Zap; title: string; hint: string }) {
  return (
    <div className="mb-4">
      <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
        <Icon className="h-5 w-5 text-primary" />
        {title}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">{hint}</p>
    </div>
  );
}

/** `compact` renders the dashboard summary; full mode renders the whole section. */
export function GamificationPanel({ compact = false }: { compact?: boolean }) {
  const { state, ready } = useGamification();
  const [justEarned, setJustEarned] = useState<string | null>(null);

  const streak = liveStreak(state);
  const { current, next, progress, xpToNext } = levelFor(state.xp);
  const earnedBadges = BADGES.filter((b) => state.badges.includes(b.id));
  const lockedBadges = BADGES.filter((b) => !state.badges.includes(b.id));

  const totalUnits = state.courses.reduce((n, c) => n + c.total, 0);
  const doneUnits = state.courses.reduce((n, c) => n + c.completed, 0);
  const overall = totalUnits ? Math.round((doneUnits / totalUnits) * 100) : 0;

  function onChallenge(challenge: Challenge) {
    completeChallenge(challenge);
    setJustEarned(`+${challenge.xp} XP — ${challenge.title}`);
    window.setTimeout(() => setJustEarned(null), 3200);
  }

  if (!ready) {
    return <div className="luna-card h-40 animate-pulse" />;
  }

  return (
    <div className="space-y-10">
      {justEarned ? (
        <div className="animate-rise rounded-lg border border-primary/50 bg-primary/10 px-4 py-3 text-sm font-medium text-foreground">
          <Sparkles className="mr-2 inline h-4 w-4 text-primary" />
          {justEarned}
        </div>
      ) : null}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={Zap} label="Total XP" value={String(state.xp)} sub="Earned from real study activity" />
        <Stat
          icon={TrendingUp}
          label="Level"
          value={`${current.level} · ${current.name}`}
          sub={next ? `${xpToNext} XP to ${next.name}` : "Highest level reached"}
        />
        <Stat
          icon={Flame}
          label="Streak"
          value={`${streak} day${streak === 1 ? "" : "s"}`}
          sub={streak > 0 ? `Best: ${state.bestStreak} days` : "Study today to start a streak"}
        />
        <Stat
          icon={Award}
          label="Badges"
          value={`${earnedBadges.length}/${BADGES.length}`}
          sub="Each one explains why it was earned"
        />
      </div>

      {/* Level progress */}
      <div className="luna-card animate-rise p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-semibold text-foreground">
            Level {current.level} — {current.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {next ? `Next: Level ${next.level} ${next.name}` : "Max level"}
          </p>
        </div>
        <Progress value={progress} className="mt-3 h-2.5" />
        <p className="mt-2 text-xs text-muted-foreground">
          Unlocked at this level: {current.unlocks}
          {next ? ` · ${next.name} unlocks ${next.unlocks}` : ""}
        </p>
      </div>

      {/* Course progress */}
      <section>
        <SectionTitle
          icon={BookOpen}
          title="Course progress"
          hint={`Overall ${overall}% complete across your active tracks.`}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {state.courses.map((course) => {
            const pct = course.total ? Math.round((course.completed / course.total) * 100) : 0;
            return (
              <div key={course.id} className="luna-card animate-rise p-5">
                <p className="font-semibold text-foreground">{course.name}</p>
                <Progress value={pct} className="mt-3 h-2" />
                <p className="mt-2 text-xs text-muted-foreground">
                  {course.completed} of {course.total} units · {pct}%
                </p>
                {!compact ? (
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="secondary" onClick={() => bumpCourse(course.id, 1)}>
                      Mark a unit done
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => bumpCourse(course.id, -1)}>
                      Undo
                    </Button>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      {compact ? (
        <Button asChild>
          <Link to="/progress">Open my progress hub</Link>
        </Button>
      ) : (
        <>
          {/* Log activity */}
          <section>
            <SectionTitle
              icon={CheckCircle2}
              title="Log a learning activity"
              hint="XP only comes from actual study work — log it honestly and your progress stays meaningful."
            />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ACTIVITY_LABELS.map((activity) => (
                <button
                  key={activity.kind}
                  type="button"
                  onClick={() => {
                    const s = logActivity(activity.kind, activity.label, activity.hint);
                    setJustEarned(`${activity.label} logged — total ${s.xp} XP`);
                    window.setTimeout(() => setJustEarned(null), 3200);
                  }}
                  className="luna-card p-4 text-left"
                >
                  <p className="font-semibold text-foreground">{activity.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{activity.hint}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Badges */}
          <section>
            <SectionTitle
              icon={Award}
              title="Badges"
              hint="Every badge states exactly what you did to earn it."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[...earnedBadges, ...lockedBadges].map((badge) => {
                const earned = state.badges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`luna-card animate-rise p-5 ${earned ? "" : "opacity-60"}`}
                  >
                    <div className="flex items-center gap-2">
                      <Trophy className={`h-5 w-5 ${earned ? "text-primary" : "text-muted-foreground"}`} />
                      <p className="font-semibold text-foreground">{badge.name}</p>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{badge.description}</p>
                    <p className="mt-2 text-xs font-medium text-foreground/80">
                      {earned ? "Earned" : "How to earn"}: {badge.criteria}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Challenges */}
          <section>
            <SectionTitle
              icon={Target}
              title="Learning challenges"
              hint="Weekly and course-based goals designed around evidence-backed study habits."
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {CHALLENGES.map((challenge) => {
                const done = state.challengesDone.includes(challenge.id);
                return (
                  <div key={challenge.id} className="luna-card animate-rise flex flex-col p-5">
                    <span className="w-fit rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                      {challenge.cadence}
                    </span>
                    <p className="mt-2 font-semibold text-foreground">{challenge.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{challenge.goal}</p>
                    <p className="mt-2 text-xs text-muted-foreground">Why it works: {challenge.why}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs font-medium text-primary">+{challenge.xp} XP</span>
                      <Button size="sm" disabled={done} onClick={() => onChallenge(challenge)}>
                        {done ? "Completed" : "Mark complete"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Rewards */}
          <section>
            <SectionTitle
              icon={Gift}
              title="Rewards"
              hint="Useful study material you unlock by reaching real milestones."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {REWARDS.map((reward) => {
                const unlocked = state.xp >= reward.requiredXp;
                return (
                  <div key={reward.id} className={`luna-card p-5 ${unlocked ? "" : "opacity-60"}`}>
                    <p className="font-semibold text-foreground">{reward.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{reward.detail}</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {unlocked ? "Unlocked" : `Unlocks at ${reward.requiredXp} XP`}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Leaderboard */}
          <section>
            <SectionTitle
              icon={Trophy}
              title="Encouraging leaderboard"
              hint="Ranked by consistency, not raw competition — everyone in the band is doing well."
            />
            <div className="luna-card overflow-hidden">
              {[
                { name: "You", xp: state.xp, you: true },
                { name: "Study group average", xp: 640, you: false },
                { name: "Most consistent this week", xp: 980, you: false },
                { name: "Top branch learner", xp: 1520, you: false },
              ]
                .sort((a, b) => b.xp - a.xp)
                .map((row, i) => (
                  <div
                    key={row.name}
                    className={`flex items-center justify-between border-b border-border/60 px-5 py-3 last:border-0 ${
                      row.you ? "bg-primary/10" : ""
                    }`}
                  >
                    <span className="text-sm font-medium text-foreground">
                      {i + 1}. {row.name}
                    </span>
                    <span className="text-sm text-muted-foreground">{row.xp} XP</span>
                  </div>
                ))}
            </div>
          </section>

          {/* Recent achievements */}
          <section>
            <SectionTitle
              icon={Sparkles}
              title="Recent achievements"
              hint="A transparent log of what you did and why XP was awarded."
            />
            {state.events.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nothing logged yet. Complete a lesson or quiz above to start your record.
              </p>
            ) : (
              <ul className="space-y-2">
                {state.events.slice(0, 12).map((event) => (
                  <li key={event.id} className="luna-card flex items-start justify-between gap-4 p-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">{event.label}</p>
                      <p className="text-xs text-muted-foreground">{event.reason}</p>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        {new Date(event.at).toLocaleString()}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-primary">+{event.xp} XP</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="border-t border-border pt-6">
            <p className="text-xs text-muted-foreground">
              Levels: {LEVELS.map((l) => `${l.level} ${l.name}`).join(" · ")}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 text-muted-foreground"
              onClick={() => resetGamification()}
            >
              Reset my progress data
            </Button>
          </section>
        </>
      )}
    </div>
  );
}
