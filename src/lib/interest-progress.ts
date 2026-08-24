import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export type ProgressSection = "basics" | "progress";

const key = (section: ProgressSection, index: number) => `${section}:${index}`;

/** Per-guide step completion for signed-in users. */
export function useInterestProgress(slug: string) {
  const { user } = useAuth();
  const [done, setDone] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setDone(new Set());
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    void supabase
      .from("interest_progress")
      .select("section, step_index")
      .eq("user_id", user.id)
      .eq("slug", slug)
      .then(({ data }) => {
        if (cancelled) return;
        setDone(new Set((data ?? []).map((r) => key(r.section as ProgressSection, r.step_index))));
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user, slug]);

  const toggle = useCallback(
    async (section: ProgressSection, index: number) => {
      if (!user) return;
      const k = key(section, index);
      const isDone = done.has(k);
      setDone((prev) => {
        const next = new Set(prev);
        if (isDone) next.delete(k);
        else next.add(k);
        return next;
      });
      if (isDone) {
        await supabase
          .from("interest_progress")
          .delete()
          .eq("user_id", user.id)
          .eq("slug", slug)
          .eq("section", section)
          .eq("step_index", index);
      } else {
        await supabase
          .from("interest_progress")
          .insert({ user_id: user.id, slug, section, step_index: index });
      }
    },
    [user, slug, done],
  );

  return {
    signedIn: Boolean(user),
    loading,
    isDone: (section: ProgressSection, index: number) => done.has(key(section, index)),
    completed: done.size,
    toggle,
  };
}
