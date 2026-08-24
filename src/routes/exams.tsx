import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, GraduationCap, Search, X } from "lucide-react";
import { EXAM_CATEGORIES, filterExams, type ExamCategory } from "@/data/exams";
import { AskLunaButton } from "@/components/AskLunaButton";

const DESCRIPTION =
  "CAT, XAT, GATE, CLAT, GRE, GMAT, TOEFL, IELTS and more — exam names, conducting bodies, purpose, dates and official links, with prep roadmaps.";

export const Route = createFileRoute("/exams")({
  head: () => ({
    meta: [
      { title: "Exams & Preparation — CAT, GATE, GRE, IELTS | LUNA" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Exams & Preparation — LUNA" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://studyluna-ai.lovable.app/exams" }],
  }),
  component: ExamsPage,
});

function useDebounced(value: string, delay = 180) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

function ExamCard({ exam }: { exam: ReturnType<typeof filterExams>[number] }) {
  return (
    <div className="group relative flex h-full flex-col rounded-xl border border-border/70 bg-card/50 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/60">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold text-foreground">{exam.name}</h3>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
          {exam.category === "management" ? "Entrance" : "International"}
        </span>
      </div>

      {exam.conductingBody && (
        <p className="mt-1 text-xs font-medium text-muted-foreground">
          Conducted by {exam.conductingBody}
        </p>
      )}

      <p className="mt-2 text-sm text-muted-foreground">{exam.summary}</p>

      <dl className="mt-4 space-y-1.5 text-sm">
        <div className="flex gap-2">
          <dt className="shrink-0 font-semibold text-foreground">Purpose:</dt>
          <dd className="text-muted-foreground">{exam.purpose}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="shrink-0 font-semibold text-foreground">Date:</dt>
          <dd className="text-muted-foreground">{exam.examDate}</dd>
        </div>
      </dl>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
        {exam.roadmapSlug && (
          <Link
            to="/government-jobs/$slug"
            params={{ slug: exam.roadmapSlug }}
            className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            View Roadmap <ArrowRight className="h-3 w-3" />
          </Link>
        )}
        {exam.syllabus && (
          <a
            href={exam.syllabus}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full border border-border/70 px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/60 hover:text-primary"
          >
            Syllabus / Prep
          </a>
        )}
        <a
          href={exam.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-full border border-border/70 px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/60 hover:text-primary"
        >
          Official Website
        </a>
      </div>
    </div>
  );
}

function ExamsPage() {
  const [category, setCategory] = useState<ExamCategory | "all">("all");
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounced(query);

  const items = useMemo(
    () => filterExams(category, debouncedQuery),
    [category, debouncedQuery],
  );
  const activeCategory = EXAM_CATEGORIES.find((c) => c.key === category)!;

  return (
    <div className="container mx-auto px-4 py-14">
      <header className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/50 px-3 py-1 text-xs font-medium text-muted-foreground">
          <GraduationCap className="h-3.5 w-3.5 text-primary" /> Exams
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Exams & Preparation
        </h1>
        <p className="mt-3 text-muted-foreground">
          Management, entrance and international exams — conducting body, purpose,
          dates, prep links and official websites in one place.
        </p>
      </header>

      <section className="mt-12" aria-labelledby="exams-list">
        <div className="sticky top-16 z-30 -mx-4 space-y-3 border-b border-border/70 bg-background/85 px-4 pb-3 pt-3 backdrop-blur-xl">
          <div className="relative w-full">
            <Search
              aria-hidden
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search exams by name, purpose or conducting body…"
              aria-label="Search exams"
              className="w-full rounded-full border border-border/70 bg-card/60 py-2.5 pl-9 pr-10 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {EXAM_CATEGORIES.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setCategory(c.key)}
                aria-pressed={category === c.key}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
                  category === c.key
                    ? "bg-primary text-primary-foreground"
                    : "border border-border/70 bg-card/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <h2 id="exams-list" className="mt-6 text-2xl font-bold tracking-tight text-foreground">
          {activeCategory.label}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{activeCategory.blurb}</p>

        {items.length === 0 ? (
          <p className="mt-6 rounded-xl border border-border/70 bg-card/50 p-6 text-sm text-muted-foreground">
            {debouncedQuery.trim()
              ? `No results found for "${debouncedQuery.trim()}".`
              : "No exams in this category yet."}
          </p>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((exam) => (
              <ExamCard key={exam.slug} exam={exam} />
            ))}
          </div>
        )}
      </section>

      <AskLunaButton topic={`${activeCategory.label} exam preparation strategy`} />
    </div>
  );
}
