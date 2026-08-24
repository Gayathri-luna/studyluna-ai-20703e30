import { Link, createFileRoute } from "@tanstack/react-router";
import { projectsForBranch } from "@/data/branchProjects";
import { ProjectGuide } from "@/components/ProjectGuide";
import { branches } from "@/data/branches";
import { branchDetails } from "@/data/branchDetails";
import { BranchSwitcher } from "@/components/BranchSwitcher";
import { BranchSection, BulletGrid } from "@/components/BranchSection";
import { useAuth } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const DESCRIPTION =
  "Branch-wise engineering mini and major project ideas, plus detailed build guides with objectives, components and step-by-step procedures.";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Engineering Mini Projects with Procedures | LUNA" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Engineering Mini Projects with Procedures" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

const levelVariant: Record<string, "secondary" | "default" | "destructive"> = {
  Beginner: "secondary",
  Intermediate: "default",
  Advanced: "destructive",
};

function ProjectsPage() {
  const { branch } = useAuth();
  const active = branch && branchDetails[branch] ? branch : "ece";
  const detail = branchDetails[active]!;
  const branchName = branches.find((b) => b.slug === active)?.name ?? "your branch";
  const guides = projectsForBranch(active);

  return (
    <div className="container mx-auto px-4 py-16">
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Mini Projects
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Project ideas for your branch, plus detailed build guides with clear
          objectives, component lists and ordered procedures.
        </p>
        <Link
          to="/luna-ai"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Sparkles className="h-4 w-4" />
          Ask Luna AI to debug or extend a project
        </Link>
      </header>

      <BranchSwitcher className="mx-auto mt-10 max-w-3xl" label="Show projects for" />

      <div className="mx-auto max-w-4xl">
        <BranchSection title={`Mini project ideas — ${branchName}`}>
          <BulletGrid items={detail.miniProjects} />
        </BranchSection>
        <BranchSection title={`Major project ideas — ${branchName}`}>
          <BulletGrid items={detail.majorProjects} />
        </BranchSection>
      </div>

      <h2 className="mt-16 text-center text-2xl font-bold text-foreground">
        Detailed build guides — {branchName}
      </h2>
      <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted-foreground">
        Aim, tools, components, ordered procedure and outcome — expand any section.
      </p>

      <div className="mx-auto mt-10 max-w-4xl space-y-6">
        {guides.length > 0 ? (
          guides.map((project) => <ProjectGuide key={project.slug} project={project} />)
        ) : (
          <p className="text-center text-sm text-muted-foreground">
            Detailed guides for this branch are coming soon — meanwhile use the project ideas above
            and ask Luna AI for a full procedure.
          </p>
        )}
      </div>
    </div>
  );
}
