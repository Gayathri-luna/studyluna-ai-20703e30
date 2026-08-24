import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { resourceBySlug } from "@/data/resources";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/resources/$slug")({
  loader: ({ params }) => {
    const category = resourceBySlug(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Not found | LUNA" }, { name: "robots", content: "noindex" }],
      };
    }
    const { category } = loaderData;
    return {
      meta: [
        { title: `${category.title} — Learning Resources | LUNA` },
        { name: "description", content: category.blurb },
        { property: "og:title", content: `${category.title} — LUNA Resources` },
        { property: "og:description", content: category.blurb },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  errorComponent: () => <Fallback title="Something went wrong" />,
  notFoundComponent: () => <Fallback title="Category not found" />,
  component: ResourceCategoryPage,
});

function Fallback({ title }: { title: string }) {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      <Link to="/resources" className="mt-4 inline-block text-sm text-primary hover:underline">
        Back to Resources
      </Link>
    </div>
  );
}

function ResourceCategoryPage() {
  const { category } = Route.useLoaderData();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Link
        to="/resources"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All categories
      </Link>

      <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground">
        {category.title}
      </h1>
      <p className="mt-2 text-muted-foreground">{category.blurb}</p>

      <ul className="mt-8 space-y-3">
        {category.items.map((item: { label: string; href: string; note: string }) => (
          <li key={item.href + item.label}>
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start justify-between gap-4 rounded-xl border border-border/70 bg-card/50 p-5 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-primary/60"
            >
              <span>
                <span className="block font-semibold text-foreground">{item.label}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{item.note}</span>
              </span>
              <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
