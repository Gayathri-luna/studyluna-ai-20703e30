import { createFileRoute } from "@tanstack/react-router";
import { Mail, Github, Linkedin, MessageSquare } from "lucide-react";

const DESCRIPTION =
  "Contact Gayathri Marasani, creator of LUNA — email, LinkedIn and GitHub for feedback, collaboration and support.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact the LUNA Team | LUNA" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Contact — LUNA" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const LINKS = [
  {
    icon: Mail,
    label: "Email",
    value: "Gayathriluna1234@gmail.com",
    href: "mailto:Gayathriluna1234@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Gayathri Marasani",
    href: "https://www.linkedin.com/in/gayathri-marasani",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "Gayathri-luna",
    href: "https://github.com/Gayathri-luna",
  },
];

function ContactPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-14">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Contact
        </h1>
        <p className="mt-3 text-muted-foreground">
          Feedback, collaboration ideas or a bug to report? Reach out directly.
        </p>
      </header>

      <div className="mt-10 rounded-2xl border border-border/70 bg-card/50 p-6 backdrop-blur-xl">
        <p className="text-[11px] font-medium uppercase tracking-wider text-primary">Creator</p>
        <h2 className="mt-1 text-2xl font-bold text-foreground">Gayathri Marasani</h2>
        <p className="mt-1 text-sm text-muted-foreground">Founder &amp; Developer of LUNA</p>

        <div className="mt-4 border-t border-border/70 pt-4">
          <p className="text-[11px] font-medium uppercase tracking-wider text-primary">Co-Founder</p>
          <h3 className="mt-1 text-xl font-bold text-foreground">Varshini Yarramsetty</h3>
          <a
            href="https://www.linkedin.com/in/varshini-yarramsetty"
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <Linkedin className="h-4 w-4" />
            Varshini Yarramsetty | LinkedIn
          </a>
          <a
            href="mailto:varshiniyarramsetty03@gmail.com"
            className="mt-1 flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <Mail className="h-4 w-4" />
            varshiniyarramsetty03@gmail.com
          </a>

        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group rounded-xl border border-border/70 bg-background/40 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/60"
            >
              <link.icon className="h-5 w-5 text-primary" />
              <span className="mt-2 block text-xs uppercase tracking-wider text-muted-foreground">
                {link.label}
              </span>
              <span className="mt-0.5 block break-words text-sm font-medium text-foreground">
                {link.value}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border/70 bg-card/50 p-6 backdrop-blur-xl">
        <MessageSquare className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <p className="text-sm text-muted-foreground">
          Quick questions about roadmaps, skills or projects are usually answered
          instantly by Luna AI — try it before emailing.
        </p>
      </div>
    </div>
  );
}
