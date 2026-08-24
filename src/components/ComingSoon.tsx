import type { ReactNode } from "react";

interface ComingSoonProps {
  title: string;
  description?: ReactNode;
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-lg text-lg text-muted-foreground">
        {description ??
          "This page is under construction. Check back soon for updates!"}
      </p>
    </div>
  );
}
