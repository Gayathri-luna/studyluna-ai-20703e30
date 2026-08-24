import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Sparkles, Target, CalendarClock, Wrench } from "lucide-react";
import { generateRoadmap, type RoadmapPlan } from "@/lib/roadmap.functions";
import { roadmaps } from "@/data/ece";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LEVELS = [
  "Complete beginner (1st year)",
  "Basics done (2nd year)",
  "Intermediate (3rd year)",
  "Final year / graduating",
  "Graduate switching into core roles",
  "Working professional upskilling",
];

export function LearningHubPanel() {
  const [level, setLevel] = useState<string>(LEVELS[2]!);
  const [targetJob, setTargetJob] = useState<string>(roadmaps[0]!.title);
  const [hours, setHours] = useState(10);
  const [interests, setInterests] = useState("");

  const generate = useServerFn(generateRoadmap);
  const { mutate, data: plan, isPending } = useMutation<RoadmapPlan>({
    mutationFn: () =>
      generate({
        data: { level, targetJob, hoursPerWeek: hours, interests },
      }),
    onError: (error: Error) =>
      toast.error(error.message || "Could not generate your roadmap."),
  });

  return (
    <div className="container mx-auto px-4 py-16">
      <header className="mx-auto max-w-3xl text-center">
        <Badge variant="secondary" className="mb-4">
          <Sparkles className="mr-1 size-3" /> AI-powered
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Your personalised learning roadmap
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Tell Luna AI where you are and where you want to land. You get a phased
          study plan, a weekly routine, interview topics, and mini projects
          matched to your level.
        </p>
      </header>

      <Card className="mx-auto mt-10 max-w-3xl">
        <CardHeader>
          <CardTitle>Build my roadmap</CardTitle>
          <CardDescription>Takes about 15 seconds to generate.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Current level</Label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LEVELS.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Target job</Label>
              <Select value={targetJob} onValueChange={setTargetJob}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roadmaps.map((r) => (
                    <SelectItem key={r.slug} value={r.title}>
                      {r.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Study time: {hours} hours / week</Label>
            <Slider
              value={[hours]}
              min={2}
              max={40}
              step={1}
              onValueChange={(v) => setHours(v[0] ?? hours)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interests">Interests or constraints (optional)</Label>
            <Textarea
              id="interests"
              value={interests}
              maxLength={500}
              placeholder="e.g. I like hardware more than coding, campus placements in 8 months, comfortable with C."
              onChange={(e) => setInterests(e.target.value)}
            />
          </div>

          <Button
            onClick={() => mutate()}
            disabled={isPending}
            size="lg"
            className="w-full"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" /> Generating your
                roadmap…
              </>
            ) : (
              <>
                <Sparkles className="mr-2 size-4" /> Generate my roadmap
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {plan && (
        <section className="mx-auto mt-16 max-w-4xl space-y-10">
          <div className="rounded-xl border bg-muted/40 p-6">
            <div className="flex flex-wrap items-center gap-3">
              <Target className="size-5 text-primary" />
              <h2 className="text-2xl font-bold">{targetJob} roadmap</h2>
              <Badge variant="outline">{plan.totalDuration}</Badge>
            </div>
            <p className="mt-3 text-muted-foreground">{plan.summary}</p>
          </div>

          <div className="space-y-6">
            {plan.phases.map((phase, i) => (
              <Card key={phase.title}>
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <CardTitle>{phase.title}</CardTitle>
                    <Badge variant="secondary">{phase.duration}</Badge>
                  </div>
                  <CardDescription className="pt-2">{phase.focus}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {phase.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {phase.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CalendarClock className="size-4" /> Weekly routine
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {plan.weeklyRoutine.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Wrench className="size-4" /> Interview topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {plan.interviewTopics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Recommended mini projects</h2>
            <p className="mt-2 text-muted-foreground">
              Build these alongside the phases above — each includes components
              and a full procedure.
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {plan.projects.map((project) => (
                <Card key={project.slug}>
                  <CardHeader>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{project.domain}</Badge>
                      <Badge variant="outline">{project.level}</Badge>
                      <Badge variant="outline">{project.duration}</Badge>
                    </div>
                    <CardTitle className="pt-2 text-lg">{project.title}</CardTitle>
                    <CardDescription>{project.objective}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div>
                      <p className="font-semibold text-foreground">Components</p>
                      <p className="text-muted-foreground">
                        {project.components.join(", ")}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Procedure</p>
                      <ol className="mt-1 list-decimal space-y-1 pl-5 text-muted-foreground">
                        {project.procedure.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
