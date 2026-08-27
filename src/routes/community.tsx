import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { MessagesSquare, CalendarDays, BookOpen, NotebookPen, Users } from "lucide-react";

const DESCRIPTION =
  "The LUNA learning community — doubt threads, study rooms, peer notes and guided study sprints for engineering students.";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — Study Rooms, Doubts & Peer Learning | LUNA" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "LUNA Community" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CommunityPage,
});

const SECTIONS = [
  {
    icon: MessagesSquare,
    title: "Doubt Threads",
    body: "Ask subject doubts and get answers from other engineering students and mentors.",
    status: "Opening soon",
  },
  {
    icon: Users,
    title: "Study Rooms",
    body: "Branch-wise rooms where you study together, share progress and stay accountable.",
    status: "Opening soon",
  },
  {
    icon: CalendarDays,
    title: "Study Sprints",
    body: "Time-boxed group sprints for exams, semester prep and skill roadmaps.",
    status: "Planned",
  },
  {
    icon: NotebookPen,
    title: "Peer Notes",
    body: "Shared notes, cheat sheets and summaries curated by students who cleared it.",
    status: "Planned",
  },
  {
    icon: BookOpen,
    title: "Learning Circles",
    body: "Small mentor-led circles that follow a roadmap end to end together.",
    status: "On the roadmap",
  },
];


function CommunityPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const participate = () => {
    if (loading) return;
    if (!user) {
      toast.info("Please log in to post or reply in the community.");
      void navigate({ to: "/auth", search: { redirect: "/community" } });
      return;
    }
    toast.info("Discussions open soon — you're on the list.");
  };

  return (
    <div className="container mx-auto px-4 py-14">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Community
        </h1>
        <p className="mt-3 text-muted-foreground">
          Learning is faster together. Here is what we are building for LUNA students.
        </p>
        <button
          type="button"
          onClick={participate}
          className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
        >
          {user ? "Start a discussion" : "Log in to post or reply"}
        </button>
        {!user && !loading ? (
          <p className="mt-3 text-xs text-muted-foreground">
            Browsing is open to everyone. Posting and replying need a free{" "}
            <Link to="/auth" search={{ redirect: "/community" }} className="text-primary hover:underline">
              LUNA account
            </Link>
            .
          </p>
        ) : null}
      </header>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((section) => (
          <div
            key={section.title}
            className="rounded-xl border border-border/70 bg-card/50 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/60"
          >
            <section.icon className="h-6 w-6 text-primary" />
            <h2 className="mt-3 text-lg font-bold text-foreground">{section.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{section.body}</p>
            <button
              type="button"
              onClick={participate}
              className="mt-4 mr-2 inline-block rounded-full border border-primary/50 px-2.5 py-1 text-[11px] font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              {user ? "Join" : "Log in to join"}
            </button>
            <span className="mt-4 inline-block rounded-full border border-border/70 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {section.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
