import { useMemo } from "react";

/**
 * Lightweight decorative space backdrop: drifting nebula blobs plus a static
 * star pattern. Pure CSS, no canvas, and fully disabled for reduced motion
 * (the keyframes are neutralised globally in styles.css).
 */
export function Starfield({ className = "" }: { className?: string }) {
  const stars = useMemo(
    () =>
      Array.from({ length: 46 }, (_, i) => ({
        left: (i * 37.5) % 100,
        top: (i * 61.7) % 100,
        size: i % 5 === 0 ? 2.5 : 1.5,
        delay: (i % 9) * 0.7,
      })),
    [],
  );

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary/15 blur-3xl animate-drift" />
      <div
        className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-chart-2/15 blur-3xl animate-drift"
        style={{ animationDelay: "-6s" }}
      />
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-foreground/40 animate-float"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
