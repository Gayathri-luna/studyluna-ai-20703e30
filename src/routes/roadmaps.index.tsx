import { createFileRoute, Link } from "@tanstack/react-router";
import { branches } from "@/data/branches";
import { useAuth } from "@/lib/auth";
import { ArrowRight, Star } from "lucide-react";

const DESCRIPTION =
  "Pick your engineering branch and open a complete step-by-step learning roadmap — foundations to job ready.";

export const Route = createFileRoute("/roadmaps/")({
  head: () => ({
    meta: [
      { title: "Learning Roadmaps by Branch | LUNA" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Learning Roadmaps by Branch — LUNA" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RoadmapsPage,
});

function RoadmapsPage() {
  const { branch } = useAuth();

  return (
    <div className="container mx-auto px-4 py-14">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Choose your branch
        </h1>
        <p className="mt-3 text-muted-foreground">
          Each branch has its own complete roadmap — what to learn, in what order.
        </p>
      </header>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {branches.map((b) => (
          <Link
            key={b.slug}
            to="/roadmaps/$branch"
            params={{ branch: b.slug }}
            className="group relative rounded-2xl border border-border/70 bg-card/50 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/60 active:scale-[0.98]"
          >
            {branch === b.slug && (
              <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                <Star className="h-3 w-3" /> Yours
              </span>
            )}
            <p className="text-2xl font-extrabold tracking-tight text-primary">{b.short}</p>
            <h2 className="mt-1 text-base font-bold text-foreground">{b.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{b.tagline}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              View roadmap <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
