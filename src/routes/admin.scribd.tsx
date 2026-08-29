import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { subjects } from "@/data/subjects";
import { useAuth } from "@/lib/auth";
import {
  createScribdResource,
  deleteScribdResource,
  scribdBranches,
  updateScribdResource,
  useIsAdmin,
  useScribdResources,
  type ScribdInput,
} from "@/lib/scribd";

export const Route = createFileRoute("/admin/scribd")({
  head: () => ({
    meta: [
      { title: "Scribd Resources Admin | LUNA" },
      { name: "description", content: "Manage Scribd study materials for every branch and core subject." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Scribd Resources Admin | LUNA" },
      { property: "og:description", content: "Add, edit and remove Scribd study materials per branch and subject." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ScribdAdminPage,
});

const emptyForm: ScribdInput = {
  branch: scribdBranches[0] ?? "CSE",
  subject_slug: subjects[0]?.slug ?? "",
  subject_name: subjects[0]?.name ?? "",
  title: "",
  description: "",
  unit: "",
  topic: "",
  scribd_url: "",
};

function ScribdAdminPage() {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useIsAdmin();
  const { stored, loading, reload } = useScribdResources();
  const [form, setForm] = useState<ScribdInput>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const branchSubjects = useMemo(
    () => subjects.filter((s) => s.branches.includes(form.branch)),
    [form.branch],
  );

  useEffect(() => {
    if (branchSubjects.length && !branchSubjects.some((s) => s.slug === form.subject_slug)) {
      const first = branchSubjects[0]!;
      setForm((f) => ({ ...f, subject_slug: first.slug, subject_name: first.name }));
    }
  }, [branchSubjects, form.subject_slug]);

  if (authLoading || roleLoading) {
    return (
      <div className="container mx-auto flex justify-center px-4 py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="container mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-foreground">Admins only</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This page manages Scribd study materials and is restricted to administrators.
        </p>
        <Link to="/subjects" className="mt-6 inline-block text-sm text-primary hover:underline">
          Back to Core Subjects
        </Link>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^https:\/\/(www\.)?scribd\.com\//i.test(form.scribd_url.trim())) {
      toast.error("Enter a real scribd.com URL");
      return;
    }
    setSaving(true);
    const payload = { ...form, scribd_url: form.scribd_url.trim() };
    const { error } = editingId
      ? await updateScribdResource(editingId, payload)
      : await createScribdResource(payload, user.id);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(editingId ? "Resource updated" : "Resource added");
    setForm({ ...emptyForm, branch: form.branch, subject_slug: form.subject_slug, subject_name: form.subject_name });
    setEditingId(null);
    void reload();
  };

  const remove = async (id: string) => {
    const { error } = await deleteScribdResource(id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Resource deleted");
    void reload();
  };

  const field = "w-full rounded-lg border border-border/70 bg-card/50 px-3 py-2 text-sm text-foreground outline-none focus:border-primary/60";

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Scribd resources</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Add verified Scribd links for any branch and core subject. Students see them on the subject page.
      </p>

      <form onSubmit={submit} className="mt-8 grid gap-4 rounded-2xl border border-border/70 bg-card/40 p-6 backdrop-blur-xl sm:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1 block font-medium text-foreground">Branch</span>
          <select
            className={field}
            value={form.branch}
            onChange={(e) => setForm({ ...form, branch: e.target.value })}
          >
            {scribdBranches.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-medium text-foreground">Core subject</span>
          <select
            className={field}
            value={form.subject_slug}
            onChange={(e) => {
              const s = subjects.find((x) => x.slug === e.target.value);
              if (s) setForm({ ...form, subject_slug: s.slug, subject_name: s.name });
            }}
          >
            {branchSubjects.map((s) => (
              <option key={s.slug} value={s.slug}>{s.name}</option>
            ))}
          </select>
        </label>
        <label className="text-sm sm:col-span-2">
          <span className="mb-1 block font-medium text-foreground">Title</span>
          <input className={field} required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </label>
        <label className="text-sm sm:col-span-2">
          <span className="mb-1 block font-medium text-foreground">Description</span>
          <textarea className={field} rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-medium text-foreground">Unit</span>
          <input className={field} value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} />
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-medium text-foreground">Topic</span>
          <input className={field} value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} />
        </label>
        <label className="text-sm sm:col-span-2">
          <span className="mb-1 block font-medium text-foreground">Scribd URL</span>
          <input
            className={field}
            required
            placeholder="https://www.scribd.com/document/..."
            value={form.scribd_url}
            onChange={(e) => setForm({ ...form, scribd_url: e.target.value })}
          />
        </label>
        <div className="flex gap-3 sm:col-span-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            {editingId ? "Save changes" : "Add resource"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="rounded-lg border border-border/70 px-4 py-2 text-sm text-muted-foreground"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="mt-12 text-xl font-bold text-foreground">Existing resources ({stored.length})</h2>
      {loading && <p className="mt-3 text-sm text-muted-foreground">Loading…</p>}
      <ul className="mt-4 space-y-3">
        {stored.map((r) => (
          <li key={r.id} className="flex flex-col gap-3 rounded-xl border border-border/70 bg-card/40 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-foreground">{r.title}</p>
              <p className="text-xs text-muted-foreground">
                {r.branch} · {r.subject_name}{r.unit ? ` · ${r.unit}` : ""}
              </p>
              <a
                href={r.scribd_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                Read on Scribd <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setEditingId(r.id);
                  setForm({
                    branch: r.branch,
                    subject_slug: r.subject_slug,
                    subject_name: r.subject_name,
                    title: r.title,
                    description: r.description ?? "",
                    unit: r.unit ?? "",
                    topic: r.topic ?? "",
                    scribd_url: r.scribd_url,
                  });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1 rounded-lg border border-border/70 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                <Pencil className="h-3.5 w-3.5" /> Edit
              </button>
              <button
                type="button"
                onClick={() => void remove(r.id)}
                className="inline-flex items-center gap-1 rounded-lg border border-destructive/50 px-3 py-1.5 text-xs text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
