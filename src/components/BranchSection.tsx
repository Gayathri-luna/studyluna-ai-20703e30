import type { ReactNode } from "react";

interface Props {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function BranchSection({ title, description, icon, children, className }: Props) {
  return (
    <section className={`mt-10 ${className ?? ""}`}>
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
      </div>
      {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function BulletGrid({ items, columns = 2 }: { items: string[]; columns?: 1 | 2 | 3 }) {
  const cols = columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : columns === 2 ? "sm:grid-cols-2" : "";
  return (
    <ul className={`grid gap-2 text-sm text-muted-foreground ${cols}`}>
      {items.map((item) => (
        <li key={item} className="rounded-xl border border-border/70 bg-card/50 px-4 py-3 backdrop-blur-xl">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ChipList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-border/70 bg-card/50 px-3 py-1.5 text-xs font-medium text-foreground"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
