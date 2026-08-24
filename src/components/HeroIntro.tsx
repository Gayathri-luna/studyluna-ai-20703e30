import { useEffect, useRef, type ReactNode } from "react";

/**
 * GSAP entrance + scroll fade for the home hero only.
 * GSAP (and ScrollTrigger) are loaded lazily on the client so SSR stays clean.
 * Users who prefer reduced motion get the static hero.
 */
export function HeroIntro({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.from("[data-hero-item]", {
          opacity: 0,
          scale: 0.9,
          y: 18,
          duration: 0.5,
          ease: "back.out(1.7)",
          stagger: 0.08,
        });

        gsap.to(root, {
          opacity: 0.25,
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "bottom 90%",
            end: "bottom 20%",
            scrub: true,
          },
        });
      }, root);

      cleanup = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <div ref={scope}>{children}</div>;
}
