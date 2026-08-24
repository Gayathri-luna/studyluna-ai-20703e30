import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bot,
  Map as MapIcon,
  Code2,
  Rocket,
  Landmark,
  BookOpen,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import lunaLogo from "@/assets/luna-logo.png";
import { AnimatedButton, HoverLift, LunaGlow, Particles, Reveal, Stagger } from "@/components/motion";
import { HeroIntro } from "@/components/HeroIntro";


const DESCRIPTION =
  "LUNA is an AI-powered learning platform for engineering students — roadmaps, skills, projects, government jobs, resources and an AI mentor in one place.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LUNA | One Platform. Endless Learning." },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "LUNA | One Platform. Endless Learning." },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://studyluna-ai.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://studyluna-ai.lovable.app/" }],
  }),
  component: HomePage,
});

const FEATURES = [
  {
    to: "/luna-ai",
    icon: Bot,
    title: "LunaAI 7.0 🚀",
    text: "Your multimodal AI learning assistant — text, photos, audio and podcasts.",
  },
  {
    to: "/roadmaps",
    icon: MapIcon,
    title: "Learning Roadmaps",
    text: "A clear step-by-step path for your branch.",
  },
  {
    to: "/skills",
    icon: Code2,
    title: "Skills",
    text: "Technical and soft skills, each with its own guide.",
  },
  {
    to: "/projects",
    icon: Rocket,
    title: "Projects",
    text: "Beginner to advanced builds with full procedures.",
  },
  {
    to: "/government-jobs",
    icon: Landmark,
    title: "Government Jobs",
    text: "ISRO, DRDO, GATE, PSUs — eligibility to salary.",
  },
  {
    to: "/resources",
    icon: BookOpen,
    title: "Learning Resources",
    text: "Books, notes, courses and channels worth your time.",
  },
  {
    to: "/interests",
    icon: Sparkles,
    title: "Interests & Hobbies",
    text: "Explore hobbies with basics, free resources and progress tracking.",
  },
  {
    to: "/community",
    icon: Users,
    title: "Community",
    text: "Discussions, events, hackathons and announcements.",
  },
] as const;

function HomePage() {
  return (
    <div>
      <HeroIntro>
        <section className="circuit-grid relative overflow-hidden border-b border-border/60">
          <LunaGlow />
          <Particles count={22} />
          <div className="container mx-auto flex flex-col items-center px-4 py-20 text-center sm:py-28">
            <img
              data-hero-item
              src={lunaLogo}
              alt="LUNA logo"
              width={96}
              height={96}
              className="glow-primary h-24 w-24 rounded-full object-contain animate-float"
            />
            <h1
              data-hero-item
              className="mt-8 text-5xl font-extrabold tracking-tight text-gradient-animated sm:text-7xl"
            >
              LUNA
            </h1>
            <p data-hero-item className="mt-4 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              One Platform. Endless Learning.
            </p>
            <p data-hero-item className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              AI-powered learning platform for engineering students across every branch.
            </p>
            <div data-hero-item className="mt-9 flex flex-col gap-3 sm:flex-row">
              <AnimatedButton>
                <Link
                  to="/roadmaps"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground"
                >
                  Start Learning <ArrowRight className="h-4 w-4" />
                </Link>
              </AnimatedButton>
              <AnimatedButton>
                <Link
                  to="/platform"
                  className="inline-flex items-center justify-center rounded-full border border-border bg-card/60 px-7 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-accent/60"
                >
                  Explore Platform
                </Link>
              </AnimatedButton>
            </div>
          </div>
        </section>
      </HeroIntro>



      <section className="container mx-auto px-4 py-16 sm:py-20">
        <h2 className="sr-only">What you can do on LUNA</h2>
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ to, icon: Icon, title, text }) => (
            <Reveal key={to}>
            <HoverLift className="h-full rounded-2xl">
            <Link
              to={to}
              className="group block h-full rounded-2xl border border-border/70 bg-card/50 p-6 backdrop-blur-xl transition-colors duration-300 hover:border-primary/60"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-foreground">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Open <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
            </HoverLift>
            </Reveal>
          ))}
        </Stagger>
      </section>
    </div>
  );
}
