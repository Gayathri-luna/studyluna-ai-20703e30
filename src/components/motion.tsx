import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Shared Framer Motion layer for LUNA.
 * Every helper collapses to a no-op transition when the user prefers reduced motion.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fades + lifts route content on navigation. */
export function MotionPage({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Wrap a list/grid so its direct <Reveal> children animate in sequence on scroll. */
export function Stagger({
  children,
  className,
  delay = 0,
  ...rest
}: { children: ReactNode; delay?: number } & HTMLMotionProps<"div">) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduced ? 0 : 0.07, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** A single scroll-triggered reveal. Works standalone or inside <Stagger>. */
export function Reveal({
  children,
  className,
  y = 16,
  ...rest
}: { children: ReactNode; y?: number } & HTMLMotionProps<"div">) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : y },
        visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.45, ease: EASE } },
      }}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Subtle lift + glow on hover, for cards and tiles. */
export function HoverLift({
  children,
  className,
  ...rest
}: { children: ReactNode } & HTMLMotionProps<"div">) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      whileHover={reduced ? {} : { y: -4, boxShadow: "var(--glow-primary)" }}
      whileTap={reduced ? {} : { scale: 0.99 }}
      transition={{ duration: 0.2, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Ambient breathing glow behind hero/brand elements. Purely decorative. */
export function LunaGlow({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className={
        className ??
        "pointer-events-none absolute left-1/2 top-0 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[110px]"
      }
      initial={{ opacity: reduced ? 0.35 : 0.25, scale: 1 }}
      animate={reduced ? { opacity: 0.35 } : { opacity: [0.22, 0.45, 0.22], scale: [1, 1.08, 1] }}
      transition={reduced ? { duration: 0 } : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/* ------------------------------------------------------------------ *
 * Reusable LUNA animation architecture.
 * These wrappers are used site-wide so every page shares one language.
 * ------------------------------------------------------------------ */

/** Alias kept for readability at call sites: a scroll-revealed block. */
export const ScrollReveal = Reveal;
/** Alias: a container whose children reveal in sequence. */
export const StaggerContainer = Stagger;

/** A page section that fades/slides in when scrolled into view. */
export function AnimatedSection({
  children,
  className,
  ...rest
}: { children: ReactNode } & HTMLMotionProps<"section">) {
  const reduced = useReducedMotion();
  return (
    <motion.section
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.section>
  );
}

/** Interactive card surface: reveal on scroll, lift + glow on hover. */
export function AnimatedCard({
  children,
  className,
  reveal = true,
  ...rest
}: { children: ReactNode; reveal?: boolean } & HTMLMotionProps<"div">) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : 18 },
        visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.45, ease: EASE } },
      }}
      initial={reveal && !reduced ? "hidden" : false}
      whileInView={reveal ? "visible" : "visible"}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={reduced ? {} : { y: -5, boxShadow: "var(--glow-primary)" }}
      whileTap={reduced ? {} : { scale: 0.995 }}
      transition={{ duration: 0.22, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Micro-interaction wrapper for buttons and links. */
export function AnimatedButton({
  children,
  className,
  ...rest
}: { children: ReactNode } & HTMLMotionProps<"div">) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      whileHover={reduced ? {} : { y: -2, scale: 1.03 }}
      whileTap={reduced ? {} : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Soft coloured glow you can drop behind any element. */
export function GlowEffect({
  className = "",
  color = "bg-primary/20",
  size = "h-72 w-72",
}: {
  className?: string;
  color?: string;
  size?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute -z-10 rounded-full blur-[100px] animate-drift ${color} ${size} ${className}`}
    />
  );
}

/**
 * Ambient site background: drifting gradient blobs over a circuit grid.
 * Rendered once in the root layout. Purely decorative and CSS-driven.
 */
export function FloatingBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="circuit-grid absolute inset-0 opacity-[0.35]" />
      <div className="absolute -left-24 top-[-6rem] h-[26rem] w-[26rem] rounded-full bg-primary/15 blur-[120px] animate-drift" />
      <div
        className="absolute right-[-8rem] top-1/3 h-[22rem] w-[22rem] rounded-full bg-chart-2/15 blur-[120px] animate-drift"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute bottom-[-10rem] left-1/3 h-[24rem] w-[24rem] rounded-full bg-chart-1/10 blur-[130px] animate-drift"
        style={{ animationDelay: "-12s" }}
      />
    </div>
  );
}

/** Decorative floating particle field (CSS transforms only). */
export function Particles({ count = 18, className = "" }: { count?: number; className?: string }) {
  const dots = Array.from({ length: count }, (_, i) => {
    const seed = (i * 37) % 100;
    const seed2 = (i * 61) % 100;
    return {
      left: `${seed}%`,
      top: `${seed2}%`,
      delay: `${-(i % 7)}s`,
      duration: `${5 + (i % 5)}s`,
      size: i % 3 === 0 ? 3 : 2,
    };
  });
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {dots.map((dot, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-primary/50 animate-float"
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
            animationDelay: dot.delay,
            animationDuration: dot.duration,
          }}
        />
      ))}
    </div>
  );
}
