import { useEffect, useState } from "react";
import { branches } from "@/data/branches";
import { useAuth } from "@/lib/auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function BranchWelcome() {
  const { branch, setBranch } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = localStorage.getItem("luna-welcome-seen");
    if (!seen && !localStorage.getItem("luna-branch")) setOpen(true);
  }, []);

  const choose = (slug: string) => {
    setBranch(slug);
    localStorage.setItem("luna-welcome-seen", "1");
    setOpen(false);
  };

  const skip = (next: boolean) => {
    if (!next) localStorage.setItem("luna-welcome-seen", "1");
    setOpen(next);
  };

  if (branch && !open) return null;

  return (
    <Dialog open={open} onOpenChange={skip}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to LUNA</DialogTitle>
          <DialogDescription>
            Choose your engineering branch. We'll personalise roadmaps, projects and resources for you.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {branches.map((b) => (
            <button
              key={b.slug}
              type="button"
              onClick={() => choose(b.slug)}
              className="rounded-xl border border-border bg-card/60 px-3 py-3 text-left text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:bg-accent/50"
            >
              {b.short}
              <span className="mt-0.5 block text-[11px] font-normal text-muted-foreground">{b.name}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => skip(false)}
          className="mt-1 text-xs text-muted-foreground underline-offset-4 hover:underline"
        >
          Skip for now
        </button>
      </DialogContent>
    </Dialog>
  );
}
