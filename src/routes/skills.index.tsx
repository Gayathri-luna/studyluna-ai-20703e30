import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { filterSkills, type Skill, type SkillCategory } from "@/data/skills";
import { branches, branchFields } from "@/data/branches";
import { studyFields, ALL_FIELDS } from "@/data/fields";
import { AskLunaButton } from "@/components/AskLunaButton";
import { useAuth } from "@/lib/auth";
import { ArrowRight, Search, X } from "lucide-react";


const DESCRIPTION =
  "Technical, domain and soft skills for every field of study — each with its own focused guide, steps, resources and career relevance.";

export const Route = createFileRoute("/skills/")({
  head: () => ({
    meta: [
      { title: "Technical, Domain & Soft Skills | LUNA" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Technical, Domain & Soft Skills — LUNA" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SkillsPage,
});

const CATEGORIES: { key: SkillCategory; label: string; blurb: string }[] = [
  { key: "technical", label: "Technical Skills", blurb: "Tools, languages, frameworks and stacks for your branch." },
  { key: "domain", label: "Non-Technical / Domain", blurb: "Standards, terminology and domain practice for your field." },
  { key: "soft", label: "Soft Skills", blurb: "Communication, teamwork and career skills for every branch." },
];

function useDebounced(value: string, delay = 180) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

function SkillGrid({ items, query }: { items: Skill[]; query: string }) {
  if (items.length === 0) {
    return (
      <p className="mt-6 rounded-xl border border-border/70 bg-card/50 p-6 text-sm text-muted-foreground">
        {query
          ? `No results found for "${query}".`
          : "No skills listed for this combination yet — try another field or category."}
      </p>
    );
  }


  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((skill) => (
        <div
          key={skill.slug}
          className="group relative rounded-xl border border-border/70 bg-card/50 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/60"
        >
          <Link to="/skills/$slug" params={{ slug: skill.slug }} className="block">
            <h3 className="text-base font-bold text-foreground">{skill.name}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{skill.summary}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
              Open guide <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
          <AskLunaButton
            variant="inline"
            topic={skill.name}
            label="Ask Luna"
            className="mt-3"
          />
        </div>
      ))}
    </div>
  );
}

function SkillsPage() {
  const { branch } = useAuth();
  const [category, setCategory] = useState<SkillCategory>("technical");
  const [field, setField] = useState<string>(ALL_FIELDS);

  const branchOptions = useMemo(
    () => (field === ALL_FIELDS ? branches : branches.filter((b) => branchFields(b).includes(field))),
    [field],
  );
  const [branchSlug, setBranchSlug] = useState<string | null>(branch ?? null);
  const activeBranch = branchOptions.some((b) => b.slug === branchSlug) ? branchSlug : null;

  const items = useMemo(() => filterSkills(category, field, activeBranch), [category, field, activeBranch]);
  const activeCategory = CATEGORIES.find((c) => c.key === category)!;

  return (
    <div className="container mx-auto px-4 py-14">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Skills</h1>
        <p className="mt-3 text-muted-foreground">
          Two things get you hired: what you can build, and how well you can explain it.
        </p>
      </header>

      <div className="mx-auto mt-10 max-w-4xl space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Field of study</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[{ slug: ALL_FIELDS, label: "All fields" }, ...studyFields].map((f) => (
              <button
                key={f.slug}
                type="button"
                onClick={() => setField(f.slug)}
                aria-pressed={field === f.slug}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 hover:scale-[1.04] active:scale-95 motion-reduce:hover:scale-100 ${
                  field === f.slug
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/70 bg-card/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Branch / programme</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setBranchSlug(null)}
              aria-pressed={!activeBranch}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                !activeBranch
                  ? "border-primary/70 bg-primary/15 text-primary"
                  : "border-border/70 bg-card/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              All
            </button>
            {branchOptions.map((b) => (
              <button
                key={b.slug}
                type="button"
                onClick={() => setBranchSlug(b.slug)}
                aria-pressed={activeBranch === b.slug}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  activeBranch === b.slug
                    ? "border-primary/70 bg-primary/15 text-primary"
                    : "border-border/70 bg-card/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {b.short}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-12" aria-labelledby="skill-category">
        <div className="flex flex-wrap gap-2 border-b border-border/70 pb-3">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setCategory(c.key)}
              aria-pressed={category === c.key}
              className={`rounded-t-lg px-4 py-2 text-sm font-semibold transition-colors ${
                category === c.key
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <h2 id="skill-category" className="mt-6 text-2xl font-bold tracking-tight text-foreground">
          {activeCategory.label}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{activeCategory.blurb}</p>
        <SkillGrid items={items} />
      </section>

      <AskLunaButton topic={`${activeCategory.label} for engineering and professional students`} />
    </div>
  );
}
