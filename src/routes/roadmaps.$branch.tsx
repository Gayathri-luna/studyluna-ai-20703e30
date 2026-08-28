import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { branchBySlug, type Branch } from "@/data/branches";
import { branchDetailBySlug } from "@/data/branchDetails";
import { BranchSwitcher } from "@/components/BranchSwitcher";
import { BranchSection, BulletGrid, ChipList } from "@/components/BranchSection";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Sparkles, Newspaper } from "lucide-react";

export const Route = createFileRoute("/roadmaps/$branch")({
  loader: ({ params }): { branch: Branch } => {
    const branch = branchBySlug(params.branch);
    if (!branch) throw notFound();
    return { branch };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Roadmap not found | LUNA" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.branch.name} Roadmap, Subjects & Careers | LUNA`;
    const description = `${loaderData.branch.tagline} Complete ${loaderData.branch.short} subjects, skills, tools, projects, careers, PSU options and learning roadmap.`;
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
      <h1 className="text-2xl font-bold text-foreground">Roadmap not found</h1>
      <Link to="/roadmaps" className="mt-4 inline-block text-primary hover:underline">
        Back to all branches
      </Link>
    </div>
  ),
  component: BranchRoadmapPage,
});

function BranchRoadmapPage() {
  const { branch } = Route.useLoaderData() as { branch: Branch };
  const detail = branchDetailBySlug(branch.slug);
  const navigate = useNavigate();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Link to="/roadmaps" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All branches
      </Link>

      <header className="mt-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">{branch.short}</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{branch.name}</h1>
        <p className="mt-3 text-muted-foreground">{branch.tagline}</p>
      </header>

      <BranchSwitcher
        className="mt-8 rounded-2xl border border-border/70 bg-card/40 p-4 backdrop-blur-xl"
        label="Switch branch"
        value={branch.slug}
        onSelect={(slug) => void navigate({ to: "/roadmaps/$branch", params: { branch: slug } })}
      />

      {detail && (
        <BranchSection
          title="Core subjects"
          description={`Subjects you actually study in ${branch.short} — with notes, PDFs and video links.`}
        >
          <ul className="grid gap-3 sm:grid-cols-2">
            {detail.subjects.map((subject) => (
              <li
                key={subject}
                className="rounded-xl border border-border/70 bg-card/50 p-3 backdrop-blur-xl"
              >
                <p className="text-sm font-medium text-foreground">{subject}</p>
                <TopicLinks topic={subject} className="mt-2" />
              </li>
            ))}
          </ul>
          <Link
            to="/subjects"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Browse all subject notes & PDFs →
          </Link>
        </BranchSection>
      )}

      <BranchSection title="Learning roadmap" description="Phase by phase, with a resource link on every step.">
        <div className="space-y-4">
          {branch.phases.map((phase, index) => (
            <Card key={phase.title} className="border-border/70 bg-card/50 backdrop-blur-xl">
              <CardHeader className="flex-row items-center gap-3 space-y-0">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                  {index + 1}
                </span>
                <CardTitle className="text-base sm:text-lg">{phase.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {phase.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden className="text-primary">•</span>
                      <span>
                        {item}
                        <TopicLinks topic={item} className="ml-2" />
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </BranchSection>


      <section className="mt-10 grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-lg font-bold text-foreground">Technical skills</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {(detail?.technicalSkills ?? branch.coreSkills).map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        {detail && detail.programming.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-foreground">Programming skills</h2>
            <div className="mt-3">
              <ChipList items={detail.programming} />
            </div>
          </div>
        )}
      </section>

      {detail && (
        <BranchSection title="Tools & technologies">
          <ChipList items={detail.tools} />
        </BranchSection>
      )}

      <BranchSection title="Mini projects" description="Short, buildable projects to start with.">
        <BulletGrid items={detail?.miniProjects ?? branch.projectIdeas} columns={3} />
      </BranchSection>

      {detail && (
        <BranchSection title="Major projects" description="Final-year scale projects that stand out in interviews.">
          <BulletGrid items={detail.majorProjects} columns={2} />
        </BranchSection>
      )}

      <section className="mt-10 grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-lg font-bold text-foreground">Career paths</h2>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {(detail?.careerPaths ?? branch.careers).map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">Job roles</h2>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {(detail?.jobRoles ?? branch.careers).map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </section>

      {detail && (
        <>
          <BranchSection title="Government & PSU opportunities" description="Exams and organisations that recruit from this branch.">
            <BulletGrid items={detail.govOpportunities} columns={2} />
          </BranchSection>

          <section className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="text-lg font-bold text-foreground">Higher studies</h2>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {detail.higherStudies.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Certifications</h2>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {detail.certifications.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </section>

          <BranchSection title="Industry-relevant technologies" description="What companies in this field are actively working on.">
            <ChipList items={detail.industryTech} />
          </BranchSection>
        </>
      )}

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <Link
          to="/industry-news"
          className="rounded-2xl border border-border/70 bg-card/50 p-6 backdrop-blur-xl transition-colors hover:border-primary/60"
        >
          <Newspaper className="h-5 w-5 text-primary" />
          <p className="mt-3 font-semibold text-foreground">{branch.short} career updates</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Domains hiring from this branch and the skills each one expects.
          </p>
        </Link>
        <div className="rounded-2xl border border-border/70 bg-card/50 p-6 text-center backdrop-blur-xl">
          <h2 className="text-lg font-bold text-foreground">Want this tailored to you?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tell Luna AI your semester and hours per week for a personalised plan.
          </p>
          <Link
            to="/luna-ai"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            <Sparkles className="h-4 w-4" /> Ask Luna AI
          </Link>
        </div>
      </div>
    </div>
  );
}
