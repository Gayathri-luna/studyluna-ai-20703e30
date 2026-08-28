import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { subjects, subjectBranches } from "@/data/subjects";
import { ArrowRight, BookOpen, Search, X } from "lucide-react";

const DESCRIPTION =
  "Core engineering subjects with free notes, PDFs, textbooks and practice links — maths, electronics, CSE, mechanical, civil and EEE.";

export const Route = createFileRoute("/subjects/")({
  head: () => ({
    meta: [
      { title: "Core Subjects & Study Notes (PDF) | LUNA" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Core Subjects & Notes — LUNA" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SubjectsPage,
});

function SubjectsPage() {
  const [query, setQuery] = useState("");
  const [branch, setBranch] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return subjects.filter((s) => {
      const matchBranch = branch === "All" || s.branches.includes(branch);
      if (!matchBranch) return false;
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.blurb.toLowerCase().includes(q) ||
        s.branches.join(" ").toLowerCase().includes(q) ||
        s.topics.join(" ").toLowerCase().includes(q)
      );
    });
  }, [query, branch]);

  return (
    <div className="container mx-auto px-4 py-14">
      <header className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/50 px-3 py-1 text-xs font-medium text-muted-foreground">
          <BookOpen className="h-3.5 w-3.5 text-primary" /> Notes • PDFs • Practice
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Core Subjects
        </h1>
        <p className="mt-3 text-muted-foreground">
          Every core subject with its topics and hand-picked free notes, PDFs and reference material.
        </p>
      </header>

      <div className="sticky top-16 z-20 mt-8 -mx-4 border-b border-border/60 bg-background/85 px-4 py-3 backdrop-blur-xl">
        <div className="relative mx-auto max-w-2xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search subjects, topics or branch…"
            aria-label="Search subjects"
            className="w-full rounded-full border border-border/70 bg-card/60 py-2.5 pl-10 pr-10 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/70"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="mx-auto mt-3 flex max-w-4xl flex-wrap justify-center gap-2">
          {["All", ...subjectBranches].map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBranch(b)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                branch === b
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border/70 bg-card/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">
          No results found for &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((subject, index) => (
            <Link
              key={subject.slug}
              to="/subjects/$slug"
              params={{ slug: subject.slug }}
              style={{ animationDelay: `${Math.min(index, 12) * 50}ms` }}
              className="group animate-rise rounded-xl border border-border/70 bg-card/50 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 active:scale-[0.98]"
            >
              <div className="flex flex-wrap gap-1.5">
                {subject.branches.map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-border/60 bg-background/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <h2 className="mt-3 flex items-center gap-2 text-lg font-bold text-foreground">
                {subject.name}
                <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{subject.blurb}</p>
              <p className="mt-3 text-xs text-primary">
                {subject.semester} • {subject.resources.length} resources
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
