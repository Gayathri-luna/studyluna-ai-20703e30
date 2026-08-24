import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

interface Props {
  /** The skill, roadmap, project or career topic currently being viewed. */
  topic: string;
  /** Floating bubble (bottom-right) or an inline pill. */
  variant?: "floating" | "inline";
  label?: string;
  className?: string;
}

/**
 * Small quick-access entry point to the existing LunaAI 7.0 assistant,
 * pre-contextualised with whatever the student is reading right now.
 * Reusable on Skills, Roadmaps, Projects and Career Hub detail pages.
 */
export function AskLunaButton({ topic, variant = "floating", label, className }: Props) {
  const text = label ?? `Ask Luna AI about ${topic}`;

  if (variant === "inline") {
    return (
      <Link
        to="/luna-ai"
        search={{ topic }}
        aria-label={text}
        className={`inline-flex items-center gap-1.5 rounded-full border border-primary/50 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-all duration-200 hover:scale-[1.04] hover:bg-primary/20 active:scale-95 motion-reduce:hover:scale-100 ${className ?? ""}`}
      >
        <Sparkles className="h-3.5 w-3.5 animate-pulse motion-reduce:animate-none" />
        {label ?? "Ask Luna AI"}
      </Link>
    );
  }

  return (
    <Link
      to="/luna-ai"
      search={{ topic }}
      aria-label={text}
      title={text}
      className={`fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/50 bg-primary/15 text-primary shadow-lg backdrop-blur-xl transition-all duration-200 hover:scale-110 hover:bg-primary/25 active:scale-95 motion-reduce:hover:scale-100 sm:h-auto sm:w-auto sm:gap-2 sm:px-4 sm:py-2.5 ${className ?? ""}`}
    >
      <Sparkles className="h-5 w-5 animate-pulse motion-reduce:animate-none sm:h-4 sm:w-4" />
      <span className="hidden text-xs font-semibold sm:inline">Ask Luna AI</span>
    </Link>
  );
}
