import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { miniProjects, roadmaps } from "@/data/ece";

const InputSchema = z.object({
  level: z.string(),
  targetJob: z.string(),
  hoursPerWeek: z.number(),
  interests: z.string(),
});

const PlanSchema = z.object({
  summary: z.string(),
  totalDuration: z.string(),
  phases: z.array(
    z.object({
      title: z.string(),
      duration: z.string(),
      focus: z.string(),
      steps: z.array(z.string()),
      skills: z.array(z.string()),
    }),
  ),
  weeklyRoutine: z.array(z.string()),
  projectSlugs: z.array(z.string()),
  interviewTopics: z.array(z.string()),
});

export type RoadmapPlan = z.infer<typeof PlanSchema> & {
  projects: typeof miniProjects;
};

export const generateRoadmap = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }): Promise<RoadmapPlan> => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const gateway = createLovableAiGatewayProvider(key);

    const catalogue = miniProjects
      .map((p) => `${p.slug} | ${p.title} | ${p.domain} | ${p.level}`)
      .join("\n");
    const tracks = roadmaps.map((r) => `${r.slug}: ${r.title}`).join("\n");

    const prompt = `Build a personalised engineering learning roadmap for the learner's target role.

Learner profile:
- Current level: ${data.level}
- Target job/role: ${data.targetJob}
- Study time available: ${data.hoursPerWeek} hours per week
- Interests / notes: ${data.interests || "none given"}

Known Luna.io career tracks:
${tracks}

Available mini projects (slug | title | domain | level):
${catalogue}

Rules:
- Produce 4 to 5 phases ordered from fundamentals to job-ready, each with a realistic duration scaled to ${data.hoursPerWeek} hrs/week.
- Each phase: 4-6 concrete steps (topics, tools, deliverables) and 3-6 skills.
- weeklyRoutine: 3-5 lines describing how to split a typical week.
- interviewTopics: 5-8 topics specific to the target role.
- projectSlugs: choose 3-4 slugs EXACTLY from the list above, matched to the level and target role.
- Be concrete and practical; no filler.`;

    const { text } = await generateText({
      model: gateway("google/gemini-3.6-flash"),
      prompt: `${prompt}

Respond with ONLY a JSON object (no markdown fences, no commentary) shaped exactly like:
{"summary":string,"totalDuration":string,"phases":[{"title":string,"duration":string,"focus":string,"steps":[string],"skills":[string]}],"weeklyRoutine":[string],"projectSlugs":[string],"interviewTopics":[string]}`,
    });

    const cleaned = text
      .trim()
      .replace(/^```(?:json)?/i, "")
      .replace(/```$/, "")
      .trim();

    let parsed: unknown;
    try {
      parsed = JSON.parse(cleaned.slice(cleaned.indexOf("{"), cleaned.lastIndexOf("}") + 1));
    } catch {
      throw new Error("Luna AI returned an unexpected response. Please try again.");
    }

    const result = PlanSchema.safeParse(parsed);
    if (!result.success) {
      throw new Error("Luna AI returned an incomplete roadmap. Please try again.");
    }

    const projects = result.data.projectSlugs
      .map((slug) => miniProjects.find((p) => p.slug === slug))
      .filter((p): p is (typeof miniProjects)[number] => Boolean(p))
      .slice(0, 4);

    return { ...result.data, projects };
  });
