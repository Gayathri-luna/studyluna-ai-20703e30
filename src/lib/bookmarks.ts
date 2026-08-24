import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export interface BookmarkInput {
  kind: string;
  slug: string;
  label: string;
  href: string;
}

/** Bookmarks for the signed-in user, optionally filtered to one kind. */
export function useBookmarks(kind?: string) {
  const { user } = useAuth();
  const [slugs, setSlugs] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setSlugs(new Set());
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    let query = supabase.from("bookmarks").select("kind, slug").eq("user_id", user.id);
    if (kind) query = query.eq("kind", kind);
    void query.then(({ data }) => {
      if (cancelled) return;
      setSlugs(new Set((data ?? []).map((r) => `${r.kind}:${r.slug}`)));
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [user, kind]);

  const isBookmarked = useCallback(
    (item: Pick<BookmarkInput, "kind" | "slug">) => slugs.has(`${item.kind}:${item.slug}`),
    [slugs],
  );

  const toggle = useCallback(
    async (item: BookmarkInput) => {
      if (!user) return;
      const k = `${item.kind}:${item.slug}`;
      const existed = slugs.has(k);
      setSlugs((prev) => {
        const next = new Set(prev);
        if (existed) next.delete(k);
        else next.add(k);
        return next;
      });
      if (existed) {
        await supabase
          .from("bookmarks")
          .delete()
          .eq("user_id", user.id)
          .eq("kind", item.kind)
          .eq("slug", item.slug);
      } else {
        await supabase.from("bookmarks").insert({ user_id: user.id, ...item });
      }
    },
    [user, slugs],
  );

  return { signedIn: Boolean(user), loading, isBookmarked, toggle, count: slugs.size };
}
