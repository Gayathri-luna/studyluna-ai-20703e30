import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { branchBySlug, branches } from "@/data/branches";
import { branchDetailBySlug } from "@/data/branchDetails";
import { BranchSwitcher } from "@/components/BranchSwitcher";
import { ChipList } from "@/components/BranchSection";
import { Briefcase, TrendingUp, ArrowRight } from "lucide-react";

const DESCRIPTION =
  "Branch-specific career updates: the domains hiring engineers from your branch, the skills each one expects, and the government and PSU routes that apply.";

export const Route = createFileRoute("/industry-news")({
  head: () => ({
    meta: [
      { title: "Branch-wise Career Updates | LUNA" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Branch-wise Career Updates — LUNA" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CareerUpdatesPage,
});

function CareerUpdatesPage() {
  const { branch } = useAuth();
  const slug = branch ?? branches[0]!.slug;
  const current = branchBySlug(slug);
  const detail = branchDetailBySlug(slug);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">Career Updates</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Priority domains for your branch, with the exact skills each one expects. Updated as the
          curriculum and hiring focus of each field evolves — no fake job listings, only real
          career directions.
        </p>
      </header>

      <BranchSwitcher className="mt-8 rounded-2xl border border-border/70 bg-card/40 p-4 backdrop-blur-xl" />

      {current && (
        <section className="mt-10">
          <div className="flex flex-wrap items-center gap-3">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Priority areas for {current.short}</h2>
          </div>

          <div className="mt-5 space-y-4">
            {(detail?.careerFocus ?? []).map((focus, index) => (
              <article
                key={focus.area}
                style={{ animationDelay: `${index * 70}ms` }}
                className="animate-rise rounded-2xl border border-border/70 bg-card/50 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 sm:p-6"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-foreground sm:text-lg">{focus.area}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{focus.detail}</p>
                    <div className="mt-3">
                      <ChipList items={focus.skills} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {detail && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border/70 bg-card/50 p-5 backdrop-blur-xl">
                <Briefcase className="h-5 w-5 text-primary" />
                <p className="mt-3 font-semibold text-foreground">Job roles to target</p>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  {detail.jobRoles.map((role) => (
                    <li key={role}>• {role}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border/70 bg-card/50 p-5 backdrop-blur-xl">
                <p className="font-semibold text-foreground">Industry technologies to watch</p>
                <div className="mt-3">
                  <ChipList items={detail.industryTech} />
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/roadmaps/$branch"
              params={{ branch: slug }}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Open {current.short} roadmap <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/government-jobs"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-accent/50"
            >
              Government & PSU exams
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
