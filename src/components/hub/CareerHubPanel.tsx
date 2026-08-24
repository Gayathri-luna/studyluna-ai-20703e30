import { Link } from "@tanstack/react-router";
import {
  careerUpdates,
  nonTechnicalSkills,
  roadmaps,
  technicalSkills,
} from "@/data/ece";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export function CareerHubPanel() {
  return (
    <div className="container mx-auto px-4 py-16">
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Career Hub
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Stage-by-stage roadmaps for core engineering
          jobs, the skills each one demands, and what the industry is hiring for
          right now.
        </p>
        <Link
          to="/luna-ai"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Sparkles className="h-4 w-4" />
          Ask Luna AI to personalise a roadmap
        </Link>
      </header>

      <section className="mt-16" aria-labelledby="roadmaps">
        <h2
          id="roadmaps"
          className="text-2xl font-bold tracking-tight text-foreground"
        >
          Core job roadmaps
        </h2>
        <p className="mt-2 text-muted-foreground">
          Eight core electronics and communication career tracks, each broken into foundation, core
          skills, specialisation, and job-ready stages.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {roadmaps.map((roadmap) => (
            <Card key={roadmap.slug} className="flex flex-col">
              <CardHeader>
                <CardTitle>{roadmap.title}</CardTitle>
                <CardDescription>{roadmap.summary}</CardDescription>
                <p className="pt-1 text-sm font-medium text-primary">
                  {roadmap.salary}
                </p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <Accordion type="single" collapsible className="w-full">
                  {roadmap.stages.map((stage) => (
                    <AccordionItem key={stage.stage} value={stage.stage}>
                      <AccordionTrigger className="text-left text-sm font-semibold">
                        {stage.stage}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                          {stage.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <div className="mt-4 flex flex-wrap gap-2">
                  {roadmap.tools.map((tool) => (
                    <Badge key={tool} variant="secondary">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-20" aria-labelledby="technical-skills">
        <h2
          id="technical-skills"
          className="text-2xl font-bold tracking-tight text-foreground"
        >
          Technical skills
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {technicalSkills.map((group) => (
            <Card key={group.group}>
              <CardHeader>
                <CardTitle className="text-lg">{group.group}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {group.skills.map((skill) => (
                    <li key={skill} className="flex gap-2">
                      <span aria-hidden className="text-primary">
                        •
                      </span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-20" aria-labelledby="soft-skills">
        <h2
          id="soft-skills"
          className="text-2xl font-bold tracking-tight text-foreground"
        >
          Non-technical skills
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {nonTechnicalSkills.map((skill) => (
            <Card key={skill.title}>
              <CardHeader>
                <CardTitle className="text-lg">{skill.title}</CardTitle>
                <CardDescription>{skill.detail}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-20" aria-labelledby="career-updates">
        <h2
          id="career-updates"
          className="text-2xl font-bold tracking-tight text-foreground"
        >
          Career updates
        </h2>
        <p className="mt-2 text-muted-foreground">
          Hiring trends shaping engineering roles and what to learn in response.
        </p>
        <div className="mt-6 space-y-4">
          {careerUpdates.map((update) => (
            <Card key={update.title}>
              <CardHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{update.category}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {update.period}
                  </span>
                </div>
                <CardTitle className="text-lg">{update.title}</CardTitle>
                <CardDescription>{update.detail}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-lg border border-border bg-muted/40 p-8 text-center">
        <h2 className="text-2xl font-bold text-foreground">
          Not sure which track fits you?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Tell Luna AI your semester, interests, and available time. It will
          shortlist a track and turn it into a weekly study plan.
        </p>
        <Link
          to="/luna-ai"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Sparkles className="h-4 w-4" />
          Open Luna AI
        </Link>
      </section>
    </div>
  );
}
