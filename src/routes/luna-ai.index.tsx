import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import { createThread, loadThreads, upsertThread } from "@/lib/luna-threads";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/luna-ai/")({
  component: LunaIndex,
});

function LunaIndex() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const search = useSearch({ from: "/luna-ai" }) as { topic?: string };
  const topic = search.topic;

  useEffect(() => {
    if (loading || !user) return;
    const existing = loadThreads();
    // A topic hand-off from Skills/Roadmaps/Projects always starts a fresh thread.
    const target = topic ? createThread() : (existing[0] ?? createThread());
    if (topic || !existing[0]) upsertThread(target);
    void navigate({
      to: "/luna-ai/$threadId",
      params: { threadId: target.id },
      search: topic ? { topic } : {},
      replace: true,
    });
  }, [navigate, user, loading, topic]);

  return <p className="text-sm text-muted-foreground">Opening LunaAI…</p>;
}
