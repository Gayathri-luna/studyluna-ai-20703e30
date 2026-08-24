import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AskLunaButton } from "@/components/AskLunaButton";
import type { BranchProject } from "@/data/branchProjects";
import { Clock, Cpu, ListOrdered, Target, Trophy, Wrench } from "lucide-react";

const difficultyVariant: Record<BranchProject["difficulty"], "secondary" | "default" | "destructive"> = {
  beginner: "secondary",
  intermediate: "default",
  advanced: "destructive",
};

function SectionTitle({ icon: Icon, children }: { icon: typeof Target; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-semibold">
      <Icon className="h-4 w-4 text-primary" />
      {children}
    </span>
  );
}

/** Structured, collapsible build guide for a single project. */
export function ProjectGuide({ project }: { project: BranchProject }) {
  const hasComponents = project.componentsRequired.length > 0;

  return (
    <Card id={project.slug} className="overflow-hidden">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={difficultyVariant[project.difficulty]} className="capitalize">
            {project.difficulty}
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Clock className="h-3 w-3" /> {project.estimatedDuration}
          </Badge>
          {hasComponents ? <Badge variant="outline">Hardware</Badge> : <Badge variant="outline">Software</Badge>}
        </div>
        <CardTitle className="pt-1 text-xl">{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
        <div className="pt-2">
          <AskLunaButton
            variant="inline"
            topic={`building the project "${project.title}" (${project.aim})`}
            label="Ask Luna AI about this project"
          />
        </div>
      </CardHeader>

      <Accordion type="multiple" defaultValue={[`${project.slug}-aim`]} className="border-t border-border/60 px-6">
        <AccordionItem value={`${project.slug}-aim`}>
          <AccordionTrigger>
            <SectionTitle icon={Target}>Aim</SectionTitle>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-muted-foreground">{project.aim}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value={`${project.slug}-tools`}>
          <AccordionTrigger>
            <SectionTitle icon={Wrench}>Tools / software required</SectionTitle>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {project.toolsRequired.map((tool) => (
                <Badge key={tool} variant="secondary">
                  {tool}
                </Badge>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {hasComponents && (
          <AccordionItem value={`${project.slug}-components`}>
            <AccordionTrigger>
              <SectionTitle icon={Cpu}>Components required</SectionTitle>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="grid gap-1.5 text-sm text-muted-foreground sm:grid-cols-2">
                {project.componentsRequired.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden className="text-primary">
                      •
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        )}

        <AccordionItem value={`${project.slug}-steps`}>
          <AccordionTrigger>
            <SectionTitle icon={ListOrdered}>Step-by-step procedure</SectionTitle>
          </AccordionTrigger>
          <AccordionContent>
            <ol className="space-y-2.5 text-sm text-muted-foreground">
              {project.steps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value={`${project.slug}-outcome`} className="border-b-0">
          <AccordionTrigger>
            <SectionTitle icon={Trophy}>Outcome</SectionTitle>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-muted-foreground">{project.outcome}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="h-2" />
    </Card>
  );
}
