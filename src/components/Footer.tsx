import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail } from "lucide-react";
import { Reveal, Stagger } from "@/components/motion";

const PLATFORM = [
  { to: "/platform", label: "Platform" },
  { to: "/hub", label: "Career Hub", search: { tab: "career" } },
  { to: "/hub", label: "Learning Hub", search: { tab: "learning" } },
  { to: "/projects", label: "Projects" },
  { to: "/luna-ai", label: "LunaAI 7.0" },
] as const;

const COMMUNITY = [
  { to: "/industry-news", label: "Career Updates" },
  { to: "/community", label: "Community" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const LEGAL = [
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/terms-of-service", label: "Terms of Service" },
  { to: "/", label: "Home" },
] as const;

const SOCIALS = [
  { href: "https://github.com/Gayathri-luna", label: "GitHub", icon: Github },
  { href: "https://www.linkedin.com/in/gayathri-marasani", label: "LinkedIn", icon: Linkedin },
  { href: "mailto:Gayathriluna1234@gmail.com", label: "Email", icon: Mail },
] as const;

const linkClass =
  "relative inline-block transition-colors duration-200 hover:text-foreground after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="circuit-scan relative overflow-hidden border-t border-border bg-muted/40">
      <div className="circuit-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <div
        className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-[110px] animate-drift"
        aria-hidden
      />

      <div className="container relative mx-auto px-4 py-12">
        <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal>
            <h3 className="text-lg font-extrabold tracking-tight text-gradient-animated">LUNA</h3>
            <p className="mt-2 text-sm text-muted-foreground">One Platform. Endless Learning.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Empowering the future of engineers across every branch.
            </p>
            <div className="mt-4 flex items-center gap-2">
              {SOCIALS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-all duration-200 hover:-translate-y-1 hover:border-primary/60 hover:text-primary hover:shadow-[var(--glow-primary)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <h4 className="text-sm font-semibold text-foreground">Platform</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {PLATFORM.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    search={("search" in item ? item.search : {}) as never}
                    className={linkClass}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <h4 className="text-sm font-semibold text-foreground">Community</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {COMMUNITY.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <h4 className="text-sm font-semibold text-foreground">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {LEGAL.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </Stagger>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">© {year} LUNA. All Rights Reserved.</p>
          <p className="text-sm text-muted-foreground">Built with ❤️ by Gayathri Marasani</p>
        </div>
      </div>
    </footer>
  );
}
