import { createFileRoute, Link } from "@tanstack/react-router";
import { resourceCategories } from "@/data/resources";
import { ArrowRight, Library } from "lucide-react";

const DESCRIPTION =
  "Curated engineering learning resources — books, PDF notes, YouTube channels, free courses, GitHub repos, documentation and blogs.";

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      { title: "Learning Resources for Engineering Students | LUNA" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Learning Resources — LUNA" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-14">
      <header className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/50 px-3 py-1 text-xs font-medium text-muted-foreground">
          <Library className="h-3.5 w-3.5 text-primary" /> Free & curated
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Learning Resources
        </h1>
        <p className="mt-3 text-muted-foreground">
          Pick a category and get a short, hand-picked list — no endless link dumps.
        </p>
        <Link
          to="/subjects"
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
        >
          Looking for subject-wise notes & PDFs? <ArrowRight className="h-4 w-4" />
        </Link>
      </header>


      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resourceCategories.map((category, index) => (
          <Link
            key={category.slug}
            to="/resources/$slug"
            params={{ slug: category.slug }}
            style={{ animationDelay: `${index * 60}ms` }}
            className="group animate-rise rounded-xl border border-border/70 bg-card/50 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 active:scale-[0.98]"
          >
            <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
              {category.title}
              <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{category.blurb}</p>
            <p className="mt-3 text-xs text-primary">{category.items.length} picks</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
