import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Briefcase,
  CalendarDays,
  ExternalLink,
  MapPin,
  Search,
  Sparkles,
  Target,
  Wallet,
  X,
} from "lucide-react";
import {
  OPPORTUNITY_KINDS,
  opportunities,
  type Opportunity,
  type OpportunityKind,
} from "@/data/opportunities";
import { AskLunaButton } from "@/components/AskLunaButton";

const DESCRIPTION =
  "Career Hub for engineering students — internships, hackathons, competitions and government/PSU openings with direct official apply links.";

type KindFilter = OpportunityKind | "all";

export const Route = createFileRoute("/career-hub")({
  validateSearch: (search: Record<string, unknown>): { kind: KindFilter } => {
    const kind = search['kind'];
    const valid = ["internship", "hackathon", "competition", "government"];
    return { kind: typeof kind === "string" && valid.includes(kind) ? (kind as OpportunityKind) : "all" };
  },
  head: () => ({
    meta: [
      { title: "Career Hub — Internships, Hackathons & Govt Jobs | LUNA" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "LUNA Career Hub" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CareerHubPage,
});

function useDebounced<T>(value: T, delay = 180) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

const BRANCHES = ["CSE / IT", "ECE / Electronics", "Mechanical", "Civil", "Electrical", "Other"];
const YEARS = ["1st year", "2nd year", "3rd year", "Final year", "Graduated"];
const GOALS = [
  { id: "software", label: "Software / AI" },
  { id: "hardware", label: "Core / Hardware" },
  { id: "research", label: "Research" },
  { id: "government", label: "Government / PSU" },
];

const BRANCH_TAGS: Record<string, string[]> = {
  "CSE / IT": ["cse", "it", "software", "ai", "ml", "data science", "web"],
  "ECE / Electronics": ["ece", "electronics", "embedded", "hardware"],
  Mechanical: ["mechanical", "automobile", "design"],
  Civil: ["civil"],
  Electrical: ["electrical", "electronics"],
  Other: ["all branches"],
};

const GOAL_TAGS: Record<string, string[]> = {
  software: ["software", "ai", "ml", "web", "data science", "cse"],
  hardware: ["hardware", "embedded", "electronics", "mechanical", "design"],
  research: ["research", "fellowship", "academia", "space", "defence"],
  government: ["government", "psu", "upsc", "isro", "drdo", "india"],
};

function CareerHubPage() {
  const { kind } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const [query, setQuery] = useState("");
  const debounced = useDebounced(query);

  const [branch, setBranch] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [matched, setMatched] = useState(false);

  const filtered = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    let list = opportunities.filter((o) => (kind === "all" ? true : o.kind === kind));
    if (q) {
      list = list.filter((o) =>
        [o.title, o.organization, o.summary, o.eligibility, o.location, ...o.tags]
          .join(" ")
          .toLowerCase()
          .includes(q),
      );
    }
    if (matched) {
      const wanted = new Set([...(BRANCH_TAGS[branch] ?? []), ...(GOAL_TAGS[goal] ?? [])]);
      const score = (o: Opportunity) => {
        let s = o.tags.reduce((acc, t) => acc + (wanted.has(t) ? 2 : 0), 0);
        if (o.tags.includes("all branches")) s += 1;
        if ((year === "1st year" || year === "2nd year") && o.tags.includes("beginner")) s += 2;
        if ((year === "Final year" || year === "Graduated") && o.kind === "government") s += 2;
        if ((year === "Final year" || year === "Graduated") && o.kind === "internship") s += 1;
        return s;
      };
      list = list
        .map((o) => ({ o, s: score(o) }))
        .filter((x) => x.s > 0)
        .sort((a, b) => b.s - a.s)
        .map((x) => x.o);
    }
    return list;
  }, [debounced, kind, matched, branch, goal, year]);

  const setKind = (next: KindFilter) =>
    void navigate({ search: next === "all" ? {} : { kind: next }, resetScroll: false });

  return (
    <div className="container mx-auto px-4 py-14">
      <header className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Briefcase className="h-3.5 w-3.5" /> Career Hub
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Internships, hackathons and government routes
        </h1>
        <p className="mt-3 text-muted-foreground">
          Every listing links straight to the official page — no generic redirects, no dead ends.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <AskLunaButton variant="inline" topic="career opportunities for engineering students" label="Ask Luna for a plan" />
          <Link
            to="/hub"
            search={{ tab: "career" }}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            Career roadmaps <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            to="/government-jobs"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            Govt jobs list <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      {/* Find My Opportunities */}
      <section
        aria-labelledby="find-my-opportunities"
        className="mx-auto mt-12 max-w-4xl rounded-2xl border border-border/70 bg-card/50 p-5 backdrop-blur-xl sm:p-6"
      >
        <h2 id="find-my-opportunities" className="flex items-center gap-2 text-lg font-bold text-foreground">
          <Target className="h-5 w-5 text-primary" /> Find My Opportunities
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick your branch, year and goal — we rank the listings that fit you first.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Branch
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-normal normal-case tracking-normal text-foreground"
            >
              <option value="">Select branch</option>
              {BRANCHES.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </label>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Year
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-normal normal-case tracking-normal text-foreground"
            >
              <option value="">Select year</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </label>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Goal
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-normal normal-case tracking-normal text-foreground"
            >
              <option value="">Select goal</option>
              {GOALS.map((g) => (
                <option key={g.id} value={g.id}>{g.label}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setMatched(true)}
            disabled={!branch && !goal && !year}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" /> Match me
          </button>
          {matched ? (
            <button
              type="button"
              onClick={() => setMatched(false)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" /> Show all
            </button>
          ) : null}
        </div>
      </section>

      {/* Search + chips */}
      <div className="sticky top-16 z-30 mt-10 -mx-4 border-y border-border/60 bg-background/80 px-4 py-3 backdrop-blur-xl">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search internships, hackathons, PSUs…"
            aria-label="Search opportunities"
            className="w-full rounded-full border border-border bg-card/60 py-2.5 pl-10 pr-10 text-sm text-foreground outline-none transition-colors focus:border-primary"
          />
          {query ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {[{ id: "all" as const, label: "All" }, ...OPPORTUNITY_KINDS].map((chip) => {
            const active = kind === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => setKind(chip.id as KindFilter)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-14 text-center text-muted-foreground">
          No results found for “{query || "your filters"}”.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((o) => (
            <article
              key={o.id}
              className="flex flex-col rounded-xl border border-border/70 bg-card/50 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/60"
            >
              <span className="w-fit rounded-full border border-border/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {OPPORTUNITY_KINDS.find((k) => k.id === o.kind)?.label}
              </span>
              <h3 className="mt-3 text-base font-bold text-foreground">{o.title}</h3>
              <p className="text-xs font-medium text-primary">{o.organization}</p>
              <p className="mt-2 text-sm text-muted-foreground">{o.summary}</p>

              <dl className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-start gap-1.5">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" /> <dd>{o.location}</dd>
                </div>
                <div className="flex items-start gap-1.5">
                  <CalendarDays className="mt-0.5 h-3.5 w-3.5 shrink-0" /> <dd>{o.deadline}</dd>
                </div>
                {o.stipend ? (
                  <div className="flex items-start gap-1.5">
                    <Wallet className="mt-0.5 h-3.5 w-3.5 shrink-0" /> <dd>{o.stipend}</dd>
                  </div>
                ) : null}
              </dl>

              <p className="mt-3 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Eligibility: </span>
                {o.eligibility}
              </p>

              <div className="mt-4 flex flex-wrap gap-2 pt-1">
                <a
                  href={o.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
                >
                  Apply <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href={o.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                  Official source <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <AskLunaButton variant="inline" topic={`${o.title} preparation`} label="Ask Luna" />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
