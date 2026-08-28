import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { subjectBySlug, type SubjectResource } from "@/data/subjects";
import { ArrowLeft, ExternalLink, FileText } from "lucide-react";

export const Route = createFileRoute("/subjects/$slug")({
  loader: ({ params }) => {
    const subject = subjectBySlug(params.slug);
    if (!subject) throw notFound();
    return { subject };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found | LUNA" }, { name: "robots", content: "noindex" }] };
    }
    const { subject } = loaderData;
    const description = `${subject.blurb} Free notes, PDFs and reference links for ${subject.name}.`;
    return {
      meta: [
        { title: `${subject.name} — Notes, PDFs & Resources | LUNA` },
        { name: "description", content: description },
        { property: "og:title", content: `${subject.name} — Study Resources` },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  errorComponent: () => <Fallback title="Something went wrong" />,
  notFoundComponent: () => <Fallback title="Subject not found" />,
  component: SubjectPage,
});

function Fallback({ title }: { title: string }) {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      <Link to="/subjects" className="mt-4 inline-block text-sm text-primary hover:underline">
        Back to Subjects
      </Link>
    </div>
  );
}

const TYPE_ORDER: SubjectResource["type"][] = ["Notes/PDF", "Book", "Video", "Practice"];

function SubjectPage() {
  const { subject } = Route.useLoaderData();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Link
        to="/subjects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All subjects
      </Link>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {subject.branches.map((b: string) => (
          <span
            key={b}
            className="rounded-full border border-border/60 bg-card/50 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
          >
            {b}
          </span>
        ))}
        <span className="rounded-full border border-primary/50 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
          {subject.semester}
        </span>
      </div>

      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground">{subject.name}</h1>
      <p className="mt-2 text-muted-foreground">{subject.blurb}</p>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-foreground">Key topics</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {subject.topics.map((t: string) => (
            <li
              key={t}
              className="rounded-lg border border-border/70 bg-card/50 px-3 py-1.5 text-sm text-foreground"
            >
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
          <FileText className="h-5 w-5 text-primary" /> Notes, PDFs & resources
        </h2>
        {TYPE_ORDER.map((type) => {
          const items = subject.resources.filter((r: SubjectResource) => r.type === type);
          if (items.length === 0) return null;
          return (
            <div key={type} className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {type}
              </h3>
              <ul className="mt-3 space-y-3">
                {items.map((item: SubjectResource) => (
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
        })}
      </section>
    </div>
  );
}
