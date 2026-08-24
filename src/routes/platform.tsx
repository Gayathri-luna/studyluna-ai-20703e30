import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Bot,
  Briefcase,
  Building2,
  CircuitBoard,
  Compass,
  GraduationCap,
  Library,
  Newspaper,
  Route as RouteIcon,
  Users,
  Wrench,
} from "lucide-react";

const TITLE = "Platform — LUNA | One Platform. Endless Learning.";
const DESCRIPTION =
  "LUNA is an AI-powered learning platform for engineering students: roadmaps, technical and non-technical skills, mini projects, career guidance, government jobs, industry updates and community.";
const URL = "https://studyluna-ai.lovable.app/platform";

export const Route = createFileRoute("/platform")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: PlatformPage,
});

const FEATURES = [
  {
    icon: Bot,
    title: "LunaAI 7.0 — Multimodal AI Learning Assistant",
    text: "LunaAI understands text, photos, audio and podcasts, answers concept doubts, explains circuits and code, and mentors you like a senior engineer.",
  },
  {
    icon: RouteIcon,
    title: "Learning Roadmaps",
    text: "Phase-by-phase roadmaps generated for your current level, target role and weekly study hours.",
  },
  {
    icon: CircuitBoard,
    title: "Technical Skills",
    text: "Programming, embedded, VLSI, PCB design, MATLAB, FPGA, Linux, Git, cloud and AI fundamentals.",
  },
  {
    icon: Users,
    title: "Non-Technical Skills",
    text: "Communication, resume building, aptitude, interviews, leadership and personal branding.",
  },
  {
    icon: Wrench,
    title: "Mini Projects",
    text: "Buildable projects with objectives, component lists, step-by-step procedures and outcomes.",
  },
  {
    icon: Compass,
    title: "Career Guidance",
    text: "Role-wise guidance on what to learn, what to build and how to present it to recruiters.",
  },
  {
    icon: Building2,
    title: "Government Jobs",
    text: "ISRO, DRDO, BEL, BHEL, HAL, GATE, PSUs and more with eligibility, salary and preparation paths.",
  },
  {
    icon: Newspaper,
    title: "Industry Updates",
    text: "Semiconductor, telecom, automotive and AI hiring trends that change what you should learn next.",
  },
  {
    icon: Library,
    title: "Learning Resources",
    text: "Curated books, courses, datasheets, simulators and toolchains — no more endless searching.",
  },
  {
    icon: GraduationCap,
    title: "Community",
    text: "Learn alongside other engineering students, share builds and get unstuck faster.",
  },
];

const AUDIENCE = [
  {
    title: "First-year students",
    text: "Start from fundamentals with a clear order of topics instead of random tutorials.",
  },
  {
    title: "Pre-final & final year",
    text: "Turn coursework into placement-ready projects, resumes and interview preparation.",
  },
  {
    title: "Government job aspirants",
    text: "Prepare for GATE, PSU and defence technical exams with structured roadmaps.",
  },
  {
    title: "Early-career engineers",
    text: "Upskill into VLSI, embedded, RF, IoT, AI and other in-demand specialisations.",
  },
];

function PlatformPage() {
  return (
    <div className="bg-background">
      <section className="circuit-grid relative overflow-hidden px-4 py-20">
        <div className="pointer-events-none absolute -top-28 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            The Platform
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            What is LUNA?
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            LUNA is an AI-powered learning platform for engineering students. It
            brings roadmaps, skills, projects, career preparation and mentorship
            into one place, so you always know what to learn next and why it
            matters. One platform. Endless learning.
          </p>
        </div>
      </section>

      <section className="container mx-auto grid gap-6 px-4 pb-16 md:grid-cols-2">
        <article className="rounded-2xl border border-border bg-card p-7">
          <h2 className="text-xl font-semibold text-card-foreground">
            Why LUNA was created
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Most engineering students do not struggle because of a lack of
            content — they struggle because content is scattered. Roadmaps live
            on one site, projects on another, career advice on a third, and none
            of them talk to each other. LUNA was created to remove that
            confusion: one guided path from fundamentals to a job-ready
            portfolio, with an AI mentor that adapts to where you actually are.
          </p>
        </article>
        <article className="rounded-2xl border border-border bg-card p-7">
          <h2 className="text-xl font-semibold text-card-foreground">
            How LUNA helps you
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li>• A personalised roadmap instead of a generic syllabus.</li>
            <li>• Projects with real components and full procedures.</li>
            <li>• Skills split into technical and non-technical tracks.</li>
            <li>• Career and government job preparation in the same place.</li>
            <li>• An AI mentor available whenever you get stuck.</li>
          </ul>
        </article>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Everything inside LUNA
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card/80 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/50"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-card-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Who can use LUNA
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCE.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-muted/30 p-6"
            >
              <h3 className="text-sm font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
          <p className="w-full text-lg font-semibold text-foreground">
            Ready to start? Build your roadmap in under a minute.
          </p>
          <Link
            to="/hub"
            search={{ tab: "learning" as const }}
            className="glow-primary inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Generate My Roadmap
          </Link>
          <Link
            to="/luna-ai"
            className="inline-flex items-center justify-center rounded-md border border-primary/40 bg-card/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            Ask Luna AI
          </Link>
        </div>
      </section>
    </div>
  );
}
