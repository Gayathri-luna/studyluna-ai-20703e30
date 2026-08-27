import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import lunaLogo from "@/assets/luna-logo.png";

const DESCRIPTION =
  "Sign in to LUNA to save your Luna AI chats, bookmarks and learning progress across devices.";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Login or Sign Up | LUNA" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Login or Sign Up — LUNA" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): { redirect?: string } =>
    typeof search["redirect"] === "string" ? { redirect: search["redirect"] as string } : {},

  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();
  const destination = redirect && redirect.startsWith("/") ? redirect : "/dashboard";

  useEffect(() => {
    if (!loading && user) void navigate({ to: destination, replace: true });
  }, [user, loading, navigate, destination]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: name },
          },
        });
        if (error) throw error;
        if (!data.session) {
          toast.success("Check your email to confirm your account.");
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      void navigate({ to: destination });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setGoogleBusy(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: `${window.location.origin}/auth${
          destination === "/dashboard" ? "" : `?redirect=${encodeURIComponent(destination)}`
        }`,
      });
      if (result.error) {
        const message =
          result.error instanceof Error ? result.error.message : String(result.error);
        toast.error(`Google sign-in failed: ${message}`);
        return;
      }
      if (result.redirected) return;
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        toast.error("Google sign-in did not complete. Please try again.");
        return;
      }
      void navigate({ to: destination, replace: true });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Google sign-in failed. Please try again.",
      );
    } finally {
      setGoogleBusy(false);
    }
  };

  return (
    <div className="circuit-grid flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-14">
      <div className="w-full max-w-md rounded-2xl border border-border/70 bg-card/60 p-8 backdrop-blur-xl">
        <div className="flex flex-col items-center text-center">
          <img src={lunaLogo} alt="LUNA logo" width={56} height={56} className="h-14 w-14 object-contain" />
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-foreground">
            {mode === "login" ? "Welcome back" : "Create your LUNA account"}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Save your AI chats, bookmarks and progress.
          </p>
        </div>

        <button
          type="button"
          onClick={google}
          disabled={googleBusy}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent disabled:opacity-60"
        >
          <svg aria-hidden="true" viewBox="0 0 48 48" className="h-4 w-4">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.3 17.7 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h12.7c-.6 3-2.3 5.5-4.9 7.2l7.6 5.9c4.4-4.1 7.1-10.2 7.1-17.4z" />
            <path fill="#FBBC05" d="M10.4 28.7a14.6 14.6 0 0 1 0-9.4l-7.8-6.1a24 24 0 0 0 0 21.6l7.8-6.1z" />
            <path fill="#34A853" d="M24 48c6.5 0 12-2.1 16-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.7-3.8-13.6-9.1l-7.8 6.1C6.5 42.6 14.6 48 24 48z" />
          </svg>
          {googleBusy ? "Connecting to Google…" : "Continue with Google"}
        </button>


        <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-widest text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
        </div>

        <form className="space-y-4" onSubmit={submit}>
          {mode === "signup" && (
            <div className="space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? "Please wait…" : mode === "login" ? "Log in" : "Sign up"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          {mode === "login" ? "New to LUNA?" : "Already have an account?"}{" "}
          <button
            type="button"
            className="font-semibold text-primary underline-offset-4 hover:underline"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
          >
            {mode === "login" ? "Create an account" : "Log in"}
          </button>
        </p>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
