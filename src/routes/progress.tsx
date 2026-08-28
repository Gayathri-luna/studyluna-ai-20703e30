import { createFileRoute } from "@tanstack/react-router";
import { Starfield } from "@/components/Starfield";
import { GamificationPanel } from "@/components/gamification/GamificationPanel";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Learning Progress, XP & Badges | StudyLUNA" },
      {
        name: "description",
        content:
          "Track study XP, levels, badges, streaks and weekly challenges. Points are earned only for real learning — lessons, quizzes, assignments and projects.",
      },
      { property: "og:title", content: "Learning Progress, XP & Badges" },
      {
        property: "og:description",
        content:
          "A calm, learning-first progress system: XP for real study work, badges with clear criteria, streaks and challenges.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  return (
    <div className="relative overflow-hidden">
      <Starfield className="opacity-70" />
      <div className="container relative mx-auto max-w-6xl px-4 py-12">
        <header className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Learning progress
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Your XP, badges and streaks
          </h1>
          <p className="mt-3 text-muted-foreground">
            Motivation without the noise. Every point here comes from real study work — lessons,
            quizzes, assignments, projects and LunaAI sessions — and every badge tells you exactly
            why you earned it.
          </p>
        </header>

        <div className="mt-10">
          <GamificationPanel />
        </div>
      </div>
    </div>
  );
}
