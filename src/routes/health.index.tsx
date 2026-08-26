import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, HeartPulse, Search, X } from "lucide-react";
import { healthGuides } from "@/data/healthGuides";
import { AskLunaButton } from "@/components/AskLunaButton";
import { BookmarkButton } from "@/components/BookmarkButton";

const DESCRIPTION =
  "Healthcare education guides — preventive care, nutrition, fitness, mental wellness, chronic disease, first aid, medical AI and telemedicine, each with key concepts, prevention, FAQs and trusted external resources.";

export const Route = createFileRoute("/health/")({
  head: () => ({
    meta: [
      { title: "Healthcare Education Guides | LUNA" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Healthcare Education Guides — LUNA" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HealthIndexPage,
});

function useDebounced<T>(value: T, delay = 180) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

function HealthIndexPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const debounced = useDebounced(query);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(healthGuides.map((g) => g.category)))],
    [],
  );

  const results = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    return healthGuides.filter((g) => {
      if (category !== "All" && g.category !== category) return false;
      if (!q) return true;
      return [g.title, g.summary, g.category, ...g.tags].join(" ").toLowerCase().includes(q);
    });
  }, [debounced, category]);

  return (
    <div className="container mx-auto px-4 py-14">
      <header className="mx-auto max-w-2xl text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <HeartPulse className="h-6 w-6" />
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Healthcare Education
        </h1>
        <p className="mt-3 text-muted-foreground">
          Clear, practical health guides for students and families — prevention, wellness, chronic
          conditions and health technology. Educational information only, never a substitute for a doctor.
        </p>
      </header>

      <div className="sticky top-16 z-30 -mx-4 mt-10 border-b border-border/50 bg-background/85 px-4 py-3 backdrop-blur-xl">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search health guides (e.g. sleep, diabetes, first aid)"
            aria-label="Search health guides"
            className="w-full rounded-full border border-border bg-card/60 py-2.5 pl-9 pr-9 text-sm text-foreground outline-none transition-colors focus:border-primary"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                category === c
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {results.length === 0 ? (
        <p className="mt-14 text-center text-sm text-muted-foreground">
          No results found for &quot;{query}&quot;.
        </p>
      ) : (
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((guide) => (
            <div
              key={guide.slug}
              className="group relative rounded-xl border border-border/70 bg-card/50 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/60"
            >
              <Link to="/health/$slug" params={{ slug: guide.slug }} className="block">
                <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                  {guide.category}
                </span>
                <h2 className="mt-3 text-base font-bold text-foreground">{guide.title}</h2>
                <p className="mt-1.5 text-sm text-muted-foreground">{guide.summary}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                  Read guide <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <AskLunaButton variant="inline" topic={guide.title} label="Ask Luna" />
                <BookmarkButton
                  item={{
                    kind: "health",
                    slug: guide.slug,
                    label: guide.title,
                    href: `/health/${guide.slug}`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <AskLunaButton topic="healthcare basics, prevention and healthy student routines" />
    </div>
  );
}
