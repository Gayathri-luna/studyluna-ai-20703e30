import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/Navbar";
import { BranchWelcome } from "@/components/BranchWelcome";
import { AuthProvider } from "@/lib/auth";
import { LearningReminders } from "@/components/LearningReminders";
import { MotionPage, FloatingBackground } from "@/components/motion";
import { AnimatePresence } from "framer-motion";




function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const SITE_TITLE = "LUNA | One Platform. Endless Learning";
const SITE_DESCRIPTION =
  "LUNA is an AI-powered learning platform that helps engineering students with roadmaps, AI guidance, projects, skills, career preparation, and learning resources.";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { property: "og:site_name", content: "LUNA" },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { title: "LUNA | One Platform. Endless Learning." },
      { property: "og:title", content: "LUNA | One Platform. Endless Learning." },
      { name: "twitter:title", content: "LUNA | One Platform. Endless Learning." },
      { name: "description", content: "We founded Luna AI with a shared vision to build a unified, AI-powered ecosystem for engineering students across every branch. Our goal is to make learning more" },
      { property: "og:description", content: "We founded Luna AI with a shared vision to build a unified, AI-powered ecosystem for engineering students across every branch. Our goal is to make learning more" },
      { name: "twitter:description", content: "We founded Luna AI with a shared vision to build a unified, AI-powered ecosystem for engineering students across every branch. Our goal is to make learning more" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/04b2959e61258e9a92c5eea1640689f2/id-preview-1b0e053c--b2249bb6-cc8c-4a44-8977-6cfa205e2b7d.lovable.app-1786704148023.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/04b2959e61258e9a92c5eea1640689f2/id-preview-1b0e053c--b2249bb6-cc8c-4a44-8977-6cfa205e2b7d.lovable.app-1786704148023.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "LUNA",
          alternateName: "LUNA — One Platform. Endless Learning",
          url: "https://studyluna-ai.lovable.app",
          description: SITE_DESCRIPTION,
        }),
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const themeInitScript = `(function(){try{var t=localStorage.getItem('luna-theme')||'circuit';var r=document.documentElement;r.classList.remove('theme-circuit','dark');if(t==='circuit')r.classList.add('theme-circuit');if(t==='dark')r.classList.add('dark');}catch(e){document.documentElement.classList.add('theme-circuit');}})();`;

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="theme-circuit">
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FloatingBackground />
        <div className="flex min-h-screen flex-col">
          <Navbar />


          <main className="flex-1">
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <PageTransition />
          </main>
          <Footer />
        </div>
        <BranchWelcome />
        <LearningReminders />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}


/** Fades route content in on navigation. Reduced-motion users see no animation. */
function PageTransition() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return (
    <AnimatePresence mode="wait" initial={false}>
      <MotionPage key={pathname}>
        <Outlet />
      </MotionPage>
    </AnimatePresence>
  );
}
