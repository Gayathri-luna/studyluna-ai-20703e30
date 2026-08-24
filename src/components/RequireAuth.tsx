import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import { LogIn, Lock } from "lucide-react";
import { useAuth } from "@/lib/auth";

/** Remembers where the user was heading so /auth can send them back. */
export function loginHref(redirect: string) {
  return `/auth?redirect=${encodeURIComponent(redirect)}`;
}

/**
 * Gates a feature behind login. Browsing public pages stays open;
 * this is only used for LunaAI and community participation.
 */
export function RequireAuth({
  children,
  title = "Sign in to continue",
  message = "This feature is available to signed-in students.",
  redirect = true,
  redirectTo,
}: {
  children: ReactNode;
  title?: string;
  message?: string;
  /** Where to send the user back after login. Defaults to the current location. */
  redirectTo?: string;
  /** true = auto-redirect to /auth, false = show an inline prompt */
  redirect?: boolean;
}) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const href = useRouterState({ select: (s) => s.location.href });
  // Capture the first location so the redirect target never chains onto /auth.
  const target = useRef(href);
  const captured = redirectTo ?? target.current;
  const pathname = captured.startsWith("/auth") ? "/dashboard" : captured;

  useEffect(() => {
    if (!loading && !user && redirect) {
      void navigate({ to: "/auth", search: { redirect: pathname }, replace: true });
    }
  }, [loading, user, redirect, navigate, pathname]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Checking your session…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto flex min-h-[40vh] max-w-md flex-col items-center justify-center rounded-2xl border border-border/70 bg-card/40 p-8 text-center backdrop-blur-xl">
        <Lock className="h-8 w-8 text-primary" />
        <h2 className="mt-4 text-lg font-bold text-foreground">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
        <Link
          to="/auth"
          search={{ redirect: pathname }}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
        >
          <LogIn className="h-4 w-4" /> Log in or sign up
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
