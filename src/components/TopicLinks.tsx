import { Link } from "@tanstack/react-router";
import { topicLinks } from "@/lib/learn-links";
import { ExternalLink, FileText, Youtube } from "lucide-react";

const ICONS: Record<string, typeof Youtube> = {
  YouTube: Youtube,
  Notes: FileText,
  NPTEL: ExternalLink,
};

const chipClass =
  "inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/50 px-2 py-0.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary";

/** Small row of "Notes / YouTube / NPTEL" links for any learning topic. */
export function TopicLinks({ topic, className = "" }: { topic: string; className?: string }) {
  return (
    <span className={`inline-flex flex-wrap gap-1.5 align-middle ${className}`}>
      {topicLinks(topic).map((link) => {
        const Icon = ICONS[link.label] ?? ExternalLink;
        if (link.internal) {
          return (
            <Link key={link.label} to={link.href} className={chipClass}>
              <Icon className="h-3 w-3" /> {link.label}
            </Link>
          );
        }
        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className={chipClass}
          >
            <Icon className="h-3 w-3" /> {link.label}
          </a>
        );
      })}
    </span>
  );
}
