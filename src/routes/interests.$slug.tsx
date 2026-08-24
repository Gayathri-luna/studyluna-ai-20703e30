import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { interestBySlug, type Interest } from "@/data/interests";
import { ArrowLeft, ExternalLink, Sparkles } from "lucide-react";

export const Route = createFileRoute("/interests/$slug")({
  loader: ({ params }): { interest: Interest } => {
    const interest = interestBySlug(params.slug);
    if (!interest) throw notFound();
    return { interest };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Interest not found | LUNA" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.interest.name} — Start from the basics | LUNA`;
    const description = loaderData.interest.summary;
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
      <h1 className="text-2xl font-bold text-foreground">Interest not found</h1>
      <Link to="/interests" className="mt-4 inline-block text-primary hover:underline">
        Back to all interests
      </Link>
    </div>
  ),
  component: InterestPage,
});

function InterestPage() {
  const { interest } = Route.useLoaderData() as { interest: Interest };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Link
        to="/interests"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All interests
      </Link>

      <header className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Hobby guide</p>
        <h1 className="mt-1 text-4xl font-extrabold tracking-tight text-foreground">{interest.name}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{interest.summary}</p>
      </header>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-foreground">The basics</h2>
        <ol className="mt-4 space-y-3">
          {interest.basics.map((item, index) => (
            <li key={item} className="flex gap-3 rounded-xl border border-border/70 bg-card/40 p-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                {index + 1}
              </span>
              <span className="text-sm text-muted-foreground">{item}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-foreground">Free resources</h2>
        <ul className="mt-3 space-y-3">
          {interest.resources.map((resource) => (
            <li key={resource.label} className="rounded-xl border border-border/70 bg-card/40 p-4">
              {resource.href ? (
                <a
                  href={resource.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  {resource.label} <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : (
                <span className="text-sm font-semibold text-foreground">{resource.label}</span>
              )}
              <p className="mt-1 text-sm text-muted-foreground">{resource.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-foreground">How to progress</h2>
        <ul className="mt-3 space-y-2">
          {interest.progress.map((step) => (
            <li key={step} className="flex gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {step}
            </li>
          ))}
        </ul>
      </section>

      <Link
        to="/luna-ai"
        className="mt-12 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
      >
        <Sparkles className="h-4 w-4" /> Ask Luna AI about {interest.name}
      </Link>
    </div>
  );
}
