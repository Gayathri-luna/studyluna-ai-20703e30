import { useEffect, useMemo, useState } from "react";
import { branches, branchFields } from "@/data/branches";
import { studyFields, ALL_FIELDS } from "@/data/fields";
import { useAuth } from "@/lib/auth";
import { Check } from "lucide-react";

interface Props {
  /** Currently displayed branch slug (defaults to the user's saved branch). */
  value?: string | null;
  /** Called when a branch chip is clicked. Defaults to saving it as the user's branch. */
  onSelect?: (slug: string) => void;
  className?: string;
  label?: string;
  /** Hide the top-level field-of-study toggle. */
  hideFieldToggle?: boolean;
}

const FIELD_KEY = "luna.field";

/**
 * Reusable, data-driven selector: a top-level "Field of study" toggle above the
 * existing branch chips. Every branch in src/data/branches.ts appears here
 * automatically, whatever field it belongs to.
 */
export function BranchSwitcher({ value, onSelect, className, label = "Your branch", hideFieldToggle }: Props) {
  const { branch, setBranch } = useAuth();
  const active = value ?? branch;
  const choose = onSelect ?? setBranch;

  const activeBranchField = useMemo(() => {
    const found = branches.find((b) => b.slug === active);
    return found ? branchFields(found)[0]! : "engineering";
  }, [active]);

  const [field, setField] = useState<string>(activeBranchField);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem(FIELD_KEY) : null;
    setField(saved ?? activeBranchField);
    // Only on mount / when the saved branch changes field.
  }, [activeBranchField]);

  const selectField = (slug: string) => {
    setField(slug);
    try {
      window.localStorage.setItem(FIELD_KEY, slug);
    } catch {
      /* storage unavailable — selection still works for this session */
    }
  };

  const visible = useMemo(
    () => (field === ALL_FIELDS ? branches : branches.filter((b) => branchFields(b).includes(field))),
    [field],
  );

  return (
    <div className={className}>
      {!hideFieldToggle && (
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Field of study</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[...studyFields, { slug: ALL_FIELDS, label: "All", blurb: "" }].map((f) => {
              const selected = field === f.slug;
              return (
                <button
                  key={f.slug}
                  type="button"
                  onClick={() => selectField(f.slug)}
                  aria-pressed={selected}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 hover:scale-[1.04] active:scale-95 motion-reduce:hover:scale-100 ${
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border/70 bg-card/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {visible.map((b) => {
          const selected = active === b.slug;
          return (
            <button
              key={b.slug}
              type="button"
              onClick={() => choose(b.slug)}
              aria-pressed={selected}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 hover:scale-[1.04] active:scale-95 motion-reduce:hover:scale-100 ${
                selected
                  ? "border-primary/70 bg-primary/15 text-primary"
                  : "border-border/70 bg-card/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {selected && <Check className="h-3 w-3" />}
              {b.short}
            </button>
          );
        })}
      </div>
    </div>
  );
}
