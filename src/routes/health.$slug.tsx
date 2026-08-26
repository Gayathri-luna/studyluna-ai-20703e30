import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft, ExternalLink } from "lucide-react";
import { healthGuideBySlug, relatedHealthGuides } from "@/data/healthGuides";
import { AskLunaButton } from "@/components/AskLunaButton";
import { BookmarkButton } from "@/components/BookmarkButton";

export const Route = createFileRoute("/health/$slug")({
  loader: ({ params }) => {
    const guide = healthGuideBySlug(params.slug);
    if (!guide) throw notFound();
    return { guide };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Guide not found | LUNA" }, { name: "robots", content: "noindex" }] };
    }
    const { guide } = loaderData;
    return {
      meta: [
        { title: `${guide.title} — Health Guide | LUNA` },
        { name: "description", content: guide.summary },
        { property: "og:title", content: `${guide.title} — Health Guide` },
        { property: "og:description", content: guide.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: HealthGuidePage,
  notFoundComponent: GuideNotFound,
});

function GuideNotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl font-extrabold text-foreground">Guide not found</h1>
      <Link to="/health" className="mt-6 inline-block text-sm font-semibold text-primary">
        Back to healthcare guides
      </Link>
    </div>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  if (!items?.length) return null;
  return (
    <section className="mt-8">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-muted-foreground">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function HealthGuidePage() {
  const { guide } = Route.useLoaderData();
  const related = relatedHealthGuides(guide);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-14">
      <Link
        to="/health"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All health guides
      </Link>

      <span className="mt-6 inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
        {guide.category}
      </span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        {guide.title}
      </h1>
      <p className="mt-3 text-muted-foreground">{guide.summary}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <AskLunaButton variant="inline" topic={guide.title} label="Ask Luna about this" />
        <BookmarkButton
          item={{ kind: "health", slug: guide.slug, label: guide.title, href: `/health/${guide.slug}` }}
        />
      </div>

      <div className="mt-6 flex gap-3 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
        <p className="text-sm text-foreground/90">{guide.warning}</p>
      </div>

      <p className="mt-8 text-[15px] leading-relaxed text-foreground/90">{guide.detail}</p>

      <List title="Key concepts" items={guide.keyConcepts} />
      <List title="Signs to watch for" items={guide.signs ?? []} />
      <List title="Risk factors" items={guide.riskFactors ?? []} />
      <List title="Prevention" items={guide.prevention} />
      <List title="Self-care" items={guide.selfCare} />
      <List title="When to seek professional help" items={guide.seekHelp} />

      {guide.faqs.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-bold text-foreground">FAQs</h2>
          <div className="mt-3 space-y-3">
            {guide.faqs.map((faq) => (
              <details
                key={faq.q}
                className="rounded-xl border border-border/70 bg-card/50 p-4 backdrop-blur-xl"
              >
                <summary className="cursor-pointer text-sm font-semibold text-foreground">{faq.q}</summary>
                <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      <section className="mt-8">
        <h2 className="text-lg font-bold text-foreground">Trusted external resources</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {guide.resources.map((r) => (
            <a
              key={r.href}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between gap-2 rounded-lg border border-border/70 bg-card/50 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/60"
            >
              {r.label}
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
            </a>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-bold text-foreground">Related guides</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {related.map((g) => (
              <Link
                key={g.slug}
                to="/health/$slug"
                params={{ slug: g.slug }}
                className="rounded-lg border border-border/70 bg-card/50 p-4 text-sm font-semibold text-foreground transition-colors hover:border-primary/60"
              >
                {g.title}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
