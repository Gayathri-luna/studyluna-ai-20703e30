import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { branchBySlug } from "@/data/branches";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your Dashboard | StudyLUNA" },
      {
        name: "description",
        content:
          "Your StudyLUNA dashboard: branch, saved progress and quick links to roadmaps, skills, projects and LunaAI 7.0.",
      },
      { property: "og:title", content: "Your StudyLUNA Dashboard" },
      {
        property: "og:description",
        content: "Track your engineering learning journey across roadmaps, skills and projects.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

const QUICK_LINKS = [
  { to: "/my-plan", label: "My Learning Plan", desc: "Your goals, reminders and progress" },
  { to: "/luna-ai", label: "LunaAI 7.0", desc: "Multimodal AI learning assistant" },
  { to: "/roadmaps", label: "Roadmaps", desc: "Branch-wise learning paths" },
  { to: "/skills", label: "Skills", desc: "Technical & soft skills" },
  { to: "/projects", label: "Projects", desc: "Hands-on mini projects" },
  { to: "/government-jobs", label: "Government Jobs", desc: "ISRO, DRDO, GATE & more" },
  { to: "/resources", label: "Resources", desc: "Curated books & channels" },
] as const;

function DashboardPage() {
  const { user, loading, branch } = useAuth();
  const branchName = (branch ? branchBySlug(branch)?.name : null) ?? "Not selected";

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        Dashboard
      </h1>

      {loading ? (
        <p className="mt-4 text-muted-foreground">Loading your profile…</p>
      ) : user ? (
        <div className="mt-6 rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Signed in as</p>
          <p className="text-lg font-semibold text-foreground">{user.email}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Branch: <span className="font-medium text-foreground">{branchName}</span>
          </p>
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-border bg-card p-6">
          <p className="text-muted-foreground">
            Sign in to save your branch, progress and bookmarks across devices.
          </p>
          <Button asChild className="mt-4">
            <Link to="/auth" search={{}}>Sign in</Link>
          </Button>
        </div>
      )}

      <h2 className="mt-10 text-xl font-bold text-foreground">Continue learning</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {QUICK_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="animate-rise rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-accent/40"
          >
            <p className="font-semibold text-foreground">{link.label}</p>
            <p className="mt-1 text-sm text-muted-foreground">{link.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
