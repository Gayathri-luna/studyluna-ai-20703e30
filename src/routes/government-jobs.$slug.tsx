import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { govJobBySlug } from "@/data/govJobs";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/government-jobs/$slug")({
  loader: ({ params }) => {
    const job = govJobBySlug(params.slug);
    if (!job) throw notFound();
    return { job };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Not found | LUNA" }, { name: "robots", content: "noindex" }],
      };
    }
    const { job } = loaderData;
    const description = `${job.full}: eligibility, required skills, salary, exam pattern and preparation roadmap for engineering graduates.`;
    return {
      meta: [
        { title: `${job.org} Jobs — Eligibility, Salary & Exam | LUNA` },
        { name: "description", content: description },
        { property: "og:title", content: `${job.org} — ${job.full}` },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  errorComponent: () => <Fallback title="Something went wrong" />,
  notFoundComponent: () => <Fallback title="Organisation not found" />,
  component: GovJobDetail,
});

function Fallback({ title }: { title: string }) {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      <Link to="/government-jobs" className="mt-4 inline-block text-sm text-primary hover:underline">
        Back to Government Jobs
      </Link>
    </div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-xl border border-border/70 bg-card/50 p-6 backdrop-blur-xl">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">{title}</h2>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden className="text-primary">•</span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function GovJobDetail() {
  const { job } = Route.useLoaderData();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Link
        to="/government-jobs"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All organisations
      </Link>

      <header className="mt-6">
        <span className="text-[11px] font-medium uppercase tracking-wider text-primary">
          {job.category}
        </span>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-foreground">{job.org}</h1>
        <p className="mt-1 text-muted-foreground">{job.full}</p>
        <p className="mt-4 text-foreground">{job.summary}</p>
        <p className="mt-4 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm font-medium text-foreground">
          Salary: {job.salary}
        </p>
        {job.lastDate && (
          <p className="mt-2 rounded-lg border border-border/70 bg-card/50 px-4 py-3 text-sm font-medium text-foreground">
            Last date to apply: {job.lastDate}
          </p>
        )}
      </header>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Section title="Eligibility" items={job.eligibility} />
        <Section title="Required skills" items={job.skills} />
        <Section title="Exam pattern" items={job.examPattern} />
        <Section title="Preparation roadmap" items={job.roadmap} />
      </div>

      <section className="mt-5 rounded-xl border border-border/70 bg-card/50 p-6 backdrop-blur-xl">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">Resources</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {job.resources.map((resource: { label: string; href: string }) => (
            <li key={resource.href}>
              <a
                href={resource.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary"
              >
                {resource.label}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <Link
        to="/luna-ai"
        className="mt-8 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
      >
        Ask Luna AI to plan your {job.org} preparation
      </Link>
    </div>
  );
}
