import { useEffect, useState } from "react";
import { CircuitBoard, Moon, Sun } from "lucide-react";

export type Theme = "circuit" | "light" | "dark";

const THEMES: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "circuit", label: "Circuit board theme", icon: CircuitBoard },
  { value: "light", label: "Light theme", icon: Sun },
  { value: "dark", label: "Dark theme", icon: Moon },
];

export const THEME_STORAGE_KEY = "luna-theme";

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("theme-circuit", "dark");
  if (theme === "circuit") root.classList.add("theme-circuit");
  if (theme === "dark") root.classList.add("dark");
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("circuit");

  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    if (stored === "circuit" || stored === "light" || stored === "dark") {
      setTheme(stored);
    }
  }, []);

  const select = (next: Theme) => {
    setTheme(next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
    applyTheme(next);
  };

  return (
    <div
      role="group"
      aria-label="Theme"
      className="inline-flex items-center gap-1 rounded-full border border-border bg-card/80 p-1 backdrop-blur"
    >
      {THEMES.map((option) => {
        const active = option.value === theme;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => select(option.value)}
            aria-label={option.label}
            aria-pressed={active}
            title={option.label}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <option.icon className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
}
