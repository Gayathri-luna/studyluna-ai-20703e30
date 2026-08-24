import { createFileRoute, Link, Outlet, useNavigate, useParams } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { MessageSquare, Plus, Trash2, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequireAuth } from "@/components/RequireAuth";
import { LunaModelSelector } from "@/components/LunaModelSelector";
import { LUNA_CAPABILITIES, getLunaModel, useLunaModel } from "@/lib/luna-models";
import {
  LUNA_SUBTITLE,

  createThread,
  deleteThread,
  loadThreads,
  upsertThread,
  type LunaThread,
} from "@/lib/luna-threads";

const DESCRIPTION =
  "LunaAI 7.0 is a multimodal AI learning assistant for engineering students — chat, photos, audio, podcasts and documents turned into explanations, notes and questions.";

export const Route = createFileRoute("/luna-ai")({
  validateSearch: (search: Record<string, unknown>): { topic?: string } => {
    const topic = search["topic"];
    return typeof topic === "string" && topic ? { topic } : {};
  },


  head: () => ({
    meta: [
      { title: "LunaAI 7.0 — Multimodal AI Learning Assistant | StudyLUNA" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "LunaAI 7.0 — Multimodal AI Learning Assistant" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LunaLayout,
});

function LunaLayout() {
  const navigate = useNavigate();
  const params = useParams({ strict: false }) as { threadId?: string };
  const [threads, setThreads] = useState<LunaThread[]>([]);
  const { model } = useLunaModel();
  const activeModel = getLunaModel(model);

  const refresh = useCallback(() => setThreads(loadThreads()), []);

  useEffect(() => {
    refresh();
    const onChange = () => refresh();
    window.addEventListener("luna-threads-changed", onChange);
    return () => window.removeEventListener("luna-threads-changed", onChange);
  }, [refresh]);

  const startNewChat = () => {
    const thread = createThread();
    setThreads(upsertThread(thread));
    void navigate({ to: "/luna-ai/$threadId", params: { threadId: thread.id } });
  };

  const removeThread = (id: string) => {
    const next = deleteThread(id);
    setThreads(next);
    if (params.threadId === id) void navigate({ to: "/luna-ai" });
  };

  return (
    <RequireAuth
      redirectTo="/luna-ai"
      title="Sign in to use LunaAI"
      message="LunaAI conversations are tied to your account, so please log in or create a free account to continue."
    >
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <header className="mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="flex items-center gap-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            <Rocket className="h-7 w-7 text-primary" />
            {activeModel.name}
          </h1>
          <LunaModelSelector />
        </div>
        <p className="mt-2 text-muted-foreground">
          {activeModel.tagline} · {LUNA_SUBTITLE}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {LUNA_CAPABILITIES.map((capability) => (
            <span
              key={capability}
              className="rounded-full border border-border bg-card/60 px-3 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            >
              {capability}
            </span>
          ))}
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Button className="w-full" onClick={startNewChat}>
            <Plus className="mr-1 h-4 w-4" />
            New chat
          </Button>
          <div className="mt-3 max-h-[50vh] space-y-1 overflow-y-auto rounded-lg border border-border bg-card p-2 lg:max-h-[60vh]">
            {threads.length === 0 ? (
              <p className="px-2 py-3 text-xs text-muted-foreground">No conversations yet.</p>
            ) : (
              threads.map((thread) => (
                <div
                  key={thread.id}
                  className={`flex items-center gap-1 rounded-md px-1 ${
                    params.threadId === thread.id ? "bg-accent" : "hover:bg-accent/60"
                  }`}
                >
                  <Link
                    to="/luna-ai/$threadId"
                    params={{ threadId: thread.id }}
                    className="flex min-w-0 flex-1 items-center gap-2 py-2 text-xs text-foreground"
                  >
                    <MessageSquare className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <span className="truncate">{thread.title}</span>
                  </Link>
                  <button
                    type="button"
                    aria-label={`Delete ${thread.title}`}
                    onClick={() => removeThread(thread.id)}
                    className="rounded p-1 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </aside>

        <Outlet />
      </div>
    </div>
    </RequireAuth>
  );
}
