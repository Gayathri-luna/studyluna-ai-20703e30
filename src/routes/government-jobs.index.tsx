import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { govJobsByField } from "@/data/govJobs";
import { studyFields, ALL_FIELDS } from "@/data/fields";
import { AskLunaButton } from "@/components/AskLunaButton";
import { ArrowRight, Landmark } from "lucide-react";

const DESCRIPTION =
  "UPSC, Banking, SSC, Judicial Services, Forensic labs, teaching routes, ISRO, DRDO, GATE and PSUs — eligibility, salary, exam pattern and preparation roadmaps.";

export const Route = createFileRoute("/government-jobs/")({
  head: () => ({
    meta: [
      { title: "Government Jobs — UPSC, Banking, SSC, Judiciary, PSU | LUNA" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Engineering Government Jobs — LUNA" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GovJobsPage,
});

function GovJobsPage() {
  const [field, setField] = useState<string>(ALL_FIELDS);
  const jobs = useMemo(() => govJobsByField(field), [field]);

  return (
    <div className="container mx-auto px-4 py-14">
      <header className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/50 px-3 py-1 text-xs font-medium text-muted-foreground">
          <Landmark className="h-3.5 w-3.5 text-primary" /> Government Careers
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Government Jobs
        </h1>
        <p className="mt-3 text-muted-foreground">
          Pick an organisation to see eligibility, salary, exam pattern and a
          preparation roadmap.
        </p>
      </header>

      <div className="mx-auto mt-10 max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Field of study</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {[{ slug: ALL_FIELDS, label: "Browse everything" }, ...studyFields].map((f) => (
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

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Link
            key={job.slug}
            to="/government-jobs/$slug"
            params={{ slug: job.slug }}
            className="group rounded-xl border border-border/70 bg-card/50 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 active:scale-[0.98]"
          >
            <span className="text-[11px] font-medium uppercase tracking-wider text-primary">
              {job.category}
            </span>
            <h2 className="mt-2 flex items-center gap-2 text-lg font-bold text-foreground">
              {job.org}
              <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">{job.full}</p>
            <p className="mt-3 text-sm text-muted-foreground">{job.summary}</p>
            <p className="mt-3 text-xs font-medium text-foreground">{job.salary}</p>
          </Link>
        ))}
      </div>

      <AskLunaButton topic="government job exams and preparation strategy" />
    </div>
  );
}
