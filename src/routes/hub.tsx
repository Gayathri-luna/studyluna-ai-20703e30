import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { CareerHubPanel } from "@/components/hub/CareerHubPanel";
import { LearningHubPanel } from "@/components/hub/LearningHubPanel";

const DESCRIPTION =
  "One hub for engineering careers and learning — roadmaps, skills, resources, hiring domains, government job routes and industry updates.";

export type HubTab = "career" | "learning";

export const Route = createFileRoute("/hub")({
  validateSearch: (search: Record<string, unknown>): { tab: HubTab } => ({
    tab: search['tab'] === "career" ? "career" : "learning",
  }),
  head: () => ({
    meta: [
      { title: "Hub — Careers & Learning for Engineers | LUNA" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "LUNA Hub — Careers & Learning" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HubPage,
});

const TABS = [
  { id: "learning" as const, label: "Learning Hub", icon: GraduationCap, blurb: "Roadmaps, skills and resources" },
  { id: "career" as const, label: "Career Hub", icon: Briefcase, blurb: "Jobs, hiring domains and updates" },
];

function HubPage() {
  const { tab } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const reduced = useReducedMotion();

  return (
    <div>
      <div className="border-b border-border/60 bg-muted/20">
        <div className="container mx-auto px-4 pb-4 pt-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">Hub</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Everything for your growth in one place — learning on one side, careers on the other.
          </p>

          <div
            role="tablist"
            aria-label="Hub sections"
            className="mt-6 inline-flex flex-wrap gap-1 rounded-full border border-border bg-background/60 p-1 backdrop-blur"
          >
            {TABS.map(({ id, label, icon: Icon, blurb }) => {
              const active = tab === id;
              return (
                <button
                  key={id}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => navigate({ to: "/hub", search: { tab: id }, resetScroll: false })}
                  className="relative rounded-full px-4 py-2 text-sm font-semibold transition-colors"
                  title={blurb}
                >
                  {active && (
                    <motion.span
                      layoutId="hub-tab-pill"
                      transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-primary"
                    />
                  )}
                  <span
                    className={`relative z-10 inline-flex items-center gap-2 ${
                      active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tab}
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
          transition={{ duration: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {tab === "career" ? <CareerHubPanel /> : <LearningHubPanel />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
