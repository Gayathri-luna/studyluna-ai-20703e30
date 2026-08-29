import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { subjects, type Subject } from "@/data/subjects";

export interface ScribdResource {
  id: string;
  branch: string;
  subject_slug: string;
  subject_name: string;
  title: string;
  description: string | null;
  unit: string | null;
  topic: string | null;
  scribd_url: string;
  /** True for the built-in Scribd search entries generated from subject data. */
  builtin?: boolean;
}

/** Real Scribd search URL — never a fabricated document id. */
export const scribdSearch = (query: string) =>
  `https://www.scribd.com/search?query=${encodeURIComponent(query)}`;

/** Built-in Scribd study-material entries for a subject, one per branch/topic. */
export function builtinScribdResources(subject: Subject): ScribdResource[] {
  const items: ScribdResource[] = [];
  for (const branch of subject.branches) {
    items.push({
      id: `builtin:${subject.slug}:${branch}:all`,
      branch,
      subject_slug: subject.slug,
      subject_name: subject.name,
      title: `${subject.name} — complete notes & question banks`,
      description: `Full-syllabus ${subject.name} notes, unit-wise PDFs and previous year question papers shared on Scribd.`,
      unit: "All units",
      topic: "Full syllabus",
      scribd_url: scribdSearch(`${subject.name} engineering notes`),
      builtin: true,
    });
    subject.topics.forEach((topic, i) => {
      items.push({
        id: `builtin:${subject.slug}:${branch}:${i}`,
        branch,
        subject_slug: subject.slug,
        subject_name: subject.name,
        title: `${topic} — ${subject.name} notes`,
        description: `Scribd documents covering ${topic}: handwritten notes, unit PDFs and solved examples.`,
        unit: `Unit ${i + 1}`,
        topic,
        scribd_url: scribdSearch(`${subject.name} ${topic} notes`),
        builtin: true,
      });
    });
  }
  return items;
}

export const subjectsForBranch = (branch: string) =>
  subjects.filter((s) => s.branches.includes(branch));

/** All branch labels used across the core subjects data. */
export const scribdBranches = Array.from(
  new Set(subjects.flatMap((s) => s.branches)),
).sort((a, b) => (a.startsWith("Core") ? -1 : b.startsWith("Core") ? 1 : a.localeCompare(b)));

async function fetchStored(subjectSlug?: string) {
  let query = supabase
    .from("scribd_resources")
    .select("id, branch, subject_slug, subject_name, title, description, unit, topic, scribd_url")
    .order("created_at", { ascending: false });
  if (subjectSlug) query = query.eq("subject_slug", subjectSlug);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as ScribdResource[];
}

/** Admin-curated Scribd rows merged with the built-in search entries. */
export function useScribdResources(subject?: Subject) {
  const [stored, setStored] = useState<ScribdResource[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      setStored(await fetchStored(subject?.slug));
    } catch {
      setStored([]);
    } finally {
      setLoading(false);
    }
  }, [subject?.slug]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const builtin = subject ? builtinScribdResources(subject) : [];
  return { resources: [...stored, ...builtin], stored, loading, reload };
}

/** True when the signed-in user has the admin role. */
export function useIsAdmin() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    void supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        setIsAdmin(Boolean(data));
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  return { isAdmin, loading };
}

export interface ScribdInput {
  branch: string;
  subject_slug: string;
  subject_name: string;
  title: string;
  description: string;
  unit: string;
  topic: string;
  scribd_url: string;
}

export const createScribdResource = (input: ScribdInput, userId: string) =>
  supabase.from("scribd_resources").insert({ ...input, created_by: userId });

export const updateScribdResource = (id: string, input: ScribdInput) =>
  supabase.from("scribd_resources").update(input).eq("id", id);

export const deleteScribdResource = (id: string) =>
  supabase.from("scribd_resources").delete().eq("id", id);
