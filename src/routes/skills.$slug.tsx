import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { skillBySlug, type Skill } from "@/data/skills";
import { ArrowLeft, ExternalLink, Sparkles } from "lucide-react";

export const Route = createFileRoute("/skills/$slug")({
  loader: ({ params }): { skill: Skill } => {
    const skill = skillBySlug(params.slug);
    if (!skill) throw notFound();
    return { skill };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Skill not found | LUNA" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.skill.name} — Learn it step by step | LUNA`;
    const description = `${loaderData.skill.summary} ${loaderData.skill.why}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-foreground">Skill not found</h1>
      <Link to="/skills" className="mt-4 inline-block text-primary hover:underline">
        Back to all skills
      </Link>
    </div>
  ),
  component: SkillPage,
});

function SkillPage() {
  const { skill } = Route.useLoaderData() as { skill: Skill };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Link to="/skills" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All skills
      </Link>

      <header className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          {skill.type === "technical" ? "Technical skill" : "Soft skill"}
        </p>
        <h1 className="mt-1 text-4xl font-extrabold tracking-tight text-foreground">{skill.name}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{skill.summary}</p>
      </header>

      <section className="mt-10 rounded-2xl border border-border/70 bg-card/50 p-6 backdrop-blur-xl">
        <h2 className="text-lg font-bold text-foreground">Why it matters</h2>
        <p className="mt-2 text-sm text-muted-foreground">{skill.why}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-foreground">How to learn it</h2>
        <ol className="mt-4 space-y-3">
          {skill.steps.map((step, index) => (
            <li key={step} className="flex gap-3 rounded-xl border border-border/70 bg-card/40 p-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                {index + 1}
              </span>
              <span className="text-sm text-muted-foreground">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-foreground">Free resources</h2>
        <ul className="mt-3 space-y-2">
          {skill.resources.map((resource) => (
            <li key={resource.href}>
              <a
                href={resource.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
              >
                {resource.label} <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <Link
        to="/luna-ai"
        className="mt-12 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
      >
        <Sparkles className="h-4 w-4" /> Ask Luna AI about {skill.name}
      </Link>
    </div>
  );
}
