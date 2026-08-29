import { useMemo, useState } from "react";
import { BookOpen, ExternalLink, Search, X } from "lucide-react";
import type { Subject } from "@/data/subjects";
import { useScribdResources, type ScribdResource } from "@/lib/scribd";

export function ScribdCard({ item }: { item: ScribdResource }) {
  return (
    <article className="flex h-full flex-col justify-between rounded-xl border border-border/70 bg-card/50 p-5 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-primary/60">
      <div>
        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-full border border-primary/50 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
            {item.branch}
          </span>
          <span className="rounded-full border border-border/60 bg-background/40 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
            {item.subject_name}
          </span>
          {item.unit && (
            <span className="rounded-full border border-border/60 bg-background/40 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
              {item.unit}
            </span>
          )}
        </div>
        <h3 className="mt-3 font-semibold text-foreground">{item.title}</h3>
        {item.description && (
          <p className="mt-1.5 text-sm text-muted-foreground">{item.description}</p>
        )}
        {item.topic && (
          <p className="mt-2 text-xs text-muted-foreground">Topic: {item.topic}</p>
        )}
        <p className="mt-1 text-xs text-muted-foreground">Source: Scribd</p>
      </div>
      <a
        href={item.scribd_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-primary/60 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
      >
        Read on Scribd <ExternalLink className="h-4 w-4" />
      </a>
    </article>
  );
}

/** Scribd study materials for one core subject, with search + branch filter. */
export function ScribdMaterials({ subject }: { subject: Subject }) {
  const { resources, loading } = useScribdResources(subject);
  const [query, setQuery] = useState("");
  const [branch, setBranch] = useState<string>("All");

  const branches = useMemo(
    () => ["All", ...Array.from(new Set(resources.map((r) => r.branch)))],
    [resources],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((r) => {
      if (branch !== "All" && r.branch !== branch) return false;
      if (!q) return true;
      return [r.title, r.description, r.topic, r.unit, r.subject_name]
        .filter(Boolean)
        .some((v) => (v as string).toLowerCase().includes(q));
    });
  }, [resources, query, branch]);

  return (
    <section className="mt-10">
      <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
        <BookOpen className="h-5 w-5 text-primary" /> Scribd study materials
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Curated Scribd document searches for {subject.name}. Every link opens on Scribd in a new tab.
      </p>

      <div className="mt-4 flex flex-col gap-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search materials, units or topics…"
            className="w-full rounded-xl border border-border/70 bg-card/50 py-2.5 pl-10 pr-10 text-sm text-foreground outline-none backdrop-blur-xl focus:border-primary/60"
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
        {branches.length > 2 && (
          <div className="flex flex-wrap gap-2">
            {branches.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBranch(b)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  branch === b
                    ? "border-primary/60 bg-primary/15 text-primary"
                    : "border-border/70 bg-card/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        )}
      </div>

      {loading && <p className="mt-4 text-sm text-muted-foreground">Loading materials…</p>}

      {!loading && filtered.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">No materials found for “{query}”.</p>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {filtered.map((item) => (
            <ScribdCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
