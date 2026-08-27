import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X, Search, LogIn, LayoutDashboard, LogOut } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GlobalSearch } from "@/components/GlobalSearch";
import { useAuth } from "@/lib/auth";
import lunaLogo from "@/assets/luna-logo.png";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/luna-ai", label: "LunaAI" },
  { to: "/roadmaps", label: "Roadmaps" },
  { to: "/skills", label: "Skills" },
  { to: "/exams", label: "Exams" },
  { to: "/resources", label: "Resources" },
  { to: "/interests", label: "Interests" },
  { to: "/health", label: "Healthcare" },
  { to: "/hub", label: "Hub", search: { tab: "learning" } },
  { to: "/projects", label: "Projects" },
  { to: "/platform", label: "Platform" },
  { to: "/career-hub", label: "Career Hub", search: { kind: "all" } },
  { to: "/government-jobs", label: "Government Jobs" },
  { to: "/industry-news", label: "Career Updates" },
  { to: "/community", label: "Community" },
  { to: "/my-plan", label: "My Plan" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

type NavItem = { to: string; label: string; search?: Record<string, unknown> };

const NAV_GROUPS: { label: string; to?: string; search?: Record<string, unknown>; items?: NavItem[] }[] = [
  { label: "LunaAI", to: "/luna-ai" },
  {
    label: "Learn",
    items: [
      { to: "/roadmaps", label: "Roadmaps" },
      { to: "/skills", label: "Skills" },
      { to: "/exams", label: "Exams & Preparation" },
      { to: "/resources", label: "Resources" },
      { to: "/interests", label: "Interests & Hobbies" },
      { to: "/health", label: "Healthcare Education" },
      { to: "/hub", label: "Learning Hub", search: { tab: "learning" } },
    ],
  },
  {
    label: "Build",
    items: [
      { to: "/projects", label: "Project Builder" },
      { to: "/platform", label: "Platform" },
    ],
  },
  {
    label: "Career Hub",
    items: [
      { to: "/career-hub", label: "All Opportunities", search: { kind: "all" } },
      { to: "/career-hub", label: "Internships", search: { kind: "internship" } },
      { to: "/career-hub", label: "Hackathons", search: { kind: "hackathon" } },
      { to: "/career-hub", label: "Competitions", search: { kind: "competition" } },
      { to: "/government-jobs", label: "Government Jobs" },
      { to: "/industry-news", label: "Career Updates" },
    ],
  },
  {
    label: "Community",
    items: [
      { to: "/community", label: "Community" },
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
    ],
  },
  { label: "My Plan", to: "/my-plan" },
];


export function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    setAccountOpen(false);
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    await navigate({ to: "/auth", search: {}, replace: true });
  }

  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  // Subtle background/shadow change once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the account menu on outside click / Escape.
  useEffect(() => {
    if (!accountOpen) return;
    const close = () => setAccountOpen(false);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setAccountOpen(false); };
    window.addEventListener("click", close);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("click", close);
      window.removeEventListener("keydown", onKey);
    };
  }, [accountOpen]);

  return (
    <motion.header
      initial={reduced ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-border/80 bg-background/85 shadow-[0_8px_30px_-18px_var(--color-primary)]"
          : "border-border/40 bg-background/60"
      }`}
    >
      <nav className="container mx-auto flex items-center gap-3 px-4 py-3">
        <Link to="/" className="group flex shrink-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src={lunaLogo} alt="LUNA logo" width={36} height={36} className="h-9 w-9 rounded-full object-contain glow-primary transition-transform duration-300 group-hover:scale-110 animate-float" />
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold tracking-tight text-foreground">LUNA</span>
            <span className="hidden text-[9px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:block">
              One Platform. Endless Learning.
            </span>
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-0.5 xl:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              search={("search" in link ? link.search : {}) as never}
              activeOptions={{ exact: link.to === "/" }}
              activeProps={{
                className:
                  "text-foreground bg-accent/60 after:scale-x-100 shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-primary)_35%,transparent)]",
              }}
              className="relative rounded-full px-2.5 py-2 text-[13px] font-medium text-muted-foreground transition-all duration-200 after:absolute after:inset-x-2.5 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:-translate-y-0.5 hover:bg-accent/60 hover:text-foreground hover:after:scale-x-100"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1.5 xl:ml-2">
          <button
            type="button"
            aria-label="Search LUNA"
            onClick={() => setSearchOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            <Search className="h-4 w-4" />
          </button>
          <ThemeToggle />
          {user ? (
            <div className="relative hidden sm:block">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={accountOpen}
                onClick={(e) => { e.stopPropagation(); setAccountOpen((v) => !v); }}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-foreground/20 text-[11px] uppercase">
                  {(user.email ?? "U").charAt(0)}
                </span>
                Account
              </button>
              {accountOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-lg"
                >
                  <p className="truncate px-3 py-2 text-xs text-muted-foreground">{user.email}</p>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setAccountOpen(false);
                      void navigate({ to: "/dashboard" });
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-foreground hover:bg-accent/60"
                  >
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => void handleSignOut()}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-foreground hover:bg-accent/60"
                  >
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/auth"
              search={{}}
              className="hidden items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              <LogIn className="h-4 w-4" /> Login
            </Link>
          )}
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground xl:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="mobile-menu"
          initial={reduced ? false : { height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden border-t border-border/60 xl:hidden"
        >
          <div className="container mx-auto grid grid-cols-2 gap-1 px-4 py-3">
            {[...NAV_LINKS, { to: "/luna-ai", label: "LunaAI 7.0" } as const, { to: user ? "/dashboard" : "/auth", label: user ? "Dashboard" : "Login" } as const].map(
              (link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  search={("search" in link ? link.search : {}) as never}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>
        </motion.div>
      )}
      </AnimatePresence>

      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </motion.header>
  );
}
