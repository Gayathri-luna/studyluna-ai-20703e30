import { createFileRoute } from "@tanstack/react-router";

import { AnimatedCard, Stagger } from "@/components/motion";

import {
  Award,
  BookOpen,
  Cpu,
  Github,
  GraduationCap,
  Lightbulb,
  Linkedin,
  Mail,
  Twitter,
  Unlock,
  Users,
  Wrench,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Luna.io" },
      {
        name: "description",
        content:
          "Learn about Luna.io's mission, vision, core values, and the team behind the AI-powered learning platform for engineering students.",
      },
      { property: "og:title", content: "About Luna.io" },
      {
        property: "og:description",
        content:
          "Our mission is to make engineering education accessible, practical, and career-focused across every branch.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    title: "Learn by Building",
    description: "Turn theory into real-world projects and hands-on experience.",
    icon: Wrench,
  },
  {
    title: "Practical Knowledge",
    description: "Focus on skills that engineers actually use in the industry.",
    icon: BookOpen,
  },
  {
    title: "Innovation",
    description: "Encourage curiosity, experimentation, and new ideas.",
    icon: Lightbulb,
  },
  {
    title: "Open Learning",
    description: "Make quality engineering education accessible to everyone, everywhere.",
    icon: Unlock,
  },
  {
    title: "Community First",
    description: "Learn together, share knowledge, and grow as a network.",
    icon: Users,
  },
  {
    title: "Lifelong Learning",
    description: "Stay curious and keep evolving with the fast-moving tech landscape.",
    icon: GraduationCap,
  },
  {
    title: "Engineering Excellence",
    description: "Aim for high standards in every design, build, and solution.",
    icon: Award,
  },
];

const skills = [
  "Electronics & Communication",
  "Full-Stack Development",
  "AI Integration",
  "E-Learning Design",
  "Career Mentorship",
  "Community Building",
];

const socialLinks = [
  {
    label: "GitHub — Gayathri-luna (Gayathri Marasani)",
    href: "https://github.com/Gayathri-luna",
    icon: Github,
  },
  {
    label: "LinkedIn — Gayathri Marasani",
    href: "https://www.linkedin.com/in/gayathri-marasani",
    icon: Linkedin,
  },
  { label: "X", href: "https://x.com/gayathri", icon: Twitter },
  { label: "Email — Gayathriluna1234@gmail.com", href: "mailto:Gayathriluna1234@gmail.com", icon: Mail },
];


function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="circuit-grid relative overflow-hidden border-b border-border bg-card/40 py-20 sm:py-28">
        <div className="absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="container relative mx-auto px-4 text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <Cpu className="h-3.5 w-3.5" />
            Every Branch · Every Engineer · AI
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gradient-circuit sm:text-5xl">
            About Luna.io
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Empowering the next generation of engineers across every branch with
            AI-driven learning and career support.
          </p>
        </div>
      </section>


      <main className="container mx-auto px-4 py-16">
        <section className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
              <Cpu className="h-4 w-4" />
              Our Mission
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Luna.io is an AI-powered platform built to make engineering education
              accessible, practical, and career-focused for every branch.
              The goal is to help learners confidently navigate their degree by providing
              structured learning paths, career roadmaps, project guidance, AI
              mentorship, industry updates, and a collaborative community.
            </p>
          </div>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
              <Lightbulb className="h-4 w-4" />
              Our Vision
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              To become the world&apos;s most trusted AI-powered platform for
              engineering education, empowering learners,
              professionals, and innovators with the knowledge and tools they need
              to succeed.
            </p>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground">
            Core Values
          </h2>
          <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <AnimatedCard
                key={value.title}
                className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/20 hover:bg-accent"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <value.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-card-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </AnimatedCard>
            ))}
          </Stagger>
        </section>

        <section className="mt-24">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground">
            Meet the Team
          </h2>
          <div className="mt-10 mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex flex-col gap-8 p-8 md:flex-row md:items-start">
              <div className="flex flex-shrink-0 justify-center md:justify-start">
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-primary text-4xl font-bold text-primary-foreground">
                  G
                </div>
              </div>
              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold text-card-foreground">
                    Gayathri Marasani
                  </h3>
                  <p className="text-sm font-medium text-primary">
                    Founder & Developer of Luna.io
                  </p>
                </div>

                <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                  &ldquo;I created Luna.io to solve a problem faced by many
                  engineering students—knowing what to learn, where to start, and how to build a
                  successful career. My vision is to create a platform where every
                  engineering student can find
                  structured learning paths, practical projects, career guidance,
                  AI-powered mentorship, and the latest industry insights, all in one
                  place.&rdquo;
                </blockquote>

                <div>
                  <h4 className="text-sm font-semibold text-card-foreground">
                    Personal Mission
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    To make engineering education accessible, practical, and
                    career-focused for learners around the world.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-card-foreground">
                    Skills & Interests
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-card-foreground">
                    Contact
                  </h4>
                  <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                    <li>
                      Email:{" "}
                      <a
                        href="mailto:Gayathriluna1234@gmail.com"
                        className="font-medium text-primary hover:underline"
                      >
                        Gayathriluna1234@gmail.com
                      </a>
                    </li>
                    <li>
                      LinkedIn:{" "}
                      <a
                        href="https://www.linkedin.com/in/gayathri-marasani"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-primary hover:underline"
                      >
                        Gayathri Marasani | LinkedIn
                      </a>
                    </li>
                    <li>
                      GitHub:{" "}
                      <a
                        href="https://github.com/Gayathri-luna"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-primary hover:underline"
                      >
                        Gayathri-luna (Gayathri Marasani)
                      </a>
                    </li>
                  </ul>
                </div>


                <div className="flex items-center gap-3 pt-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={link.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                    >
                      <link.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-border p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="flex flex-shrink-0 justify-center md:justify-start">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary text-3xl font-bold text-secondary-foreground">
                    V
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold text-card-foreground">
                      Varshini Yarramsetty
                    </h3>
                    <p className="text-sm font-medium text-primary">
                      Co-Founder of Luna.io
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Co-Founder at Luna.io, working alongside the founder on
                    content, learning experience, and community growth for
                    engineering students.
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>
                      Email:{" "}
                      <a
                        href="mailto:varshiniyarramsetty03@gmail.com"
                        className="font-medium text-primary hover:underline"
                      >
                        varshiniyarramsetty03@gmail.com
                      </a>
                    </li>
                    <li>
                      LinkedIn:{" "}
                      <a
                        href="https://www.linkedin.com/in/varshini-yarramsetty"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-primary hover:underline"
                      >
                        Varshini Yarramsetty | LinkedIn
                      </a>
                    </li>
                  </ul>
                  <a
                    href="https://www.linkedin.com/in/varshini-yarramsetty"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn — Varshini Yarramsetty"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
