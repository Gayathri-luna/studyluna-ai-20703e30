import { createFileRoute, Link } from "@tanstack/react-router";
import { interests } from "@/data/interests";
import { AskLunaButton } from "@/components/AskLunaButton";
import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";

const DESCRIPTION =
  "Hobbies and passions explained from scratch — art, chess, music, photography, writing, sport, coding and public speaking, each with basics, free resources and a way to get better.";

export const Route = createFileRoute("/interests/")({
  head: () => ({
    meta: [
      { title: "Hobbies & Interests — Learn Anything You Love | LUNA" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Hobbies & Interests — LUNA" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InterestsPage,
});

function InterestIcon({ name }: { name: string }) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name];
  if (!Icon) return null;
  return <Icon className="h-5 w-5 text-primary" />;
}

function InterestsPage() {
  return (
    <div className="container mx-auto px-4 py-14">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Interests</h1>
        <p className="mt-3 text-muted-foreground">
          Your degree is not your whole personality. Pick something you enjoy and learn it properly — basics,
          free resources and how to keep getting better.
        </p>
      </header>

      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {interests.map((item) => (
          <div
            key={item.slug}
            className="group relative rounded-xl border border-border/70 bg-card/50 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/60"
          >
            <Link to="/interests/$slug" params={{ slug: item.slug }} className="block">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <InterestIcon name={item.icon} />
              </span>
              <h2 className="mt-3 text-base font-bold text-foreground">{item.name}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{item.summary}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                Open guide <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
            <AskLunaButton variant="inline" topic={item.name} label="Ask Luna" className="mt-3" />
          </div>
        ))}
      </div>

      <AskLunaButton topic="choosing and learning a new hobby alongside college" />
    </div>
  );
}
