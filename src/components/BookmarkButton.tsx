import { Bookmark, BookmarkCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBookmarks, type BookmarkInput } from "@/lib/bookmarks";
import { Link } from "@tanstack/react-router";

export function BookmarkButton({
  item,
  className,
  showLabel = false,
}: {
  item: BookmarkInput;
  className?: string;
  showLabel?: boolean;
}) {
  const { signedIn, isBookmarked, toggle } = useBookmarks(item.kind);
  const saved = isBookmarked(item);

  const base = cn(
    "inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3 py-1.5 text-xs font-semibold transition-colors",
    saved ? "border-primary/60 text-primary" : "text-muted-foreground hover:text-foreground",
    className,
  );

  if (!signedIn) {
    return (
      <Link to="/auth" search={{ redirect: item.href }} className={base} title="Sign in to save">
        <Bookmark className="h-3.5 w-3.5" />
        {showLabel ? "Sign in to save" : null}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${item.label} from saved` : `Save ${item.label}`}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void toggle(item);
      }}
      className={base}
    >
      {saved ? <BookmarkCheck className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
      {showLabel ? (saved ? "Saved" : "Save") : null}
    </button>
  );
}
