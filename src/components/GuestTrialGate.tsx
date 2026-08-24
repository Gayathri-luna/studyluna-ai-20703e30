import { Link } from "@tanstack/react-router";
import { Sparkles, LogIn } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GUEST_MESSAGE_LIMIT } from "@/lib/guest-trial";

/** Small counter shown near the chat input while a guest is on the free trial. */
export function GuestTrialBadge({ left, minutesLeft }: { left: number; minutesLeft: number }) {
  return (
    <div className="mb-2 flex flex-wrap items-center justify-center gap-2 text-[11px]">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-semibold text-primary">
        <Sparkles className="h-3.5 w-3.5" />
        Free Trial: {left} {left === 1 ? "message" : "messages"} left
      </span>
      <span className="text-muted-foreground">
        {minutesLeft > 0 ? `~${minutesLeft} min of trial time remaining` : "trial time is up"} ·{" "}
        <Link to="/auth" search={{ redirect: "/luna-ai" }} className="font-medium text-primary underline underline-offset-2">
          sign in for unlimited chat
        </Link>
      </span>
    </div>
  );
}

/** Non-intrusive prompt shown once the guest trial runs out. */
export function GuestTrialModal({
  open,
  onOpenChange,
  reason,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reason: "messages" | "time";
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" /> Your free trial is over
          </DialogTitle>
          <DialogDescription>
            {reason === "time"
              ? "Your 10-minute free trial of LunaAI has ended."
              : `You've used all ${GUEST_MESSAGE_LIMIT} free messages.`}{" "}
            Create a free account to keep chatting with unlimited messages, saved conversations,
            photo, audio and YouTube learning.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2 flex flex-col gap-2">
          <Link
            to="/auth"
            search={{ redirect: "/luna-ai" }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            <LogIn className="h-4 w-4" /> Sign in or sign up — free
          </Link>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Maybe later
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
