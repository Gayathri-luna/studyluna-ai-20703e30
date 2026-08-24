import type { ReactNode } from "react";

export interface LegalSection {
  heading: string;
  body: ReactNode;
}

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-14">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{title}</h1>
        <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
          Last updated: {updated}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{intro}</p>
      </header>

      <div className="mt-10 space-y-8">
        {sections.map((section, index) => (
          <section key={section.heading} className="rounded-2xl border border-border/70 bg-card/40 p-6 backdrop-blur-xl">
            <h2 className="text-lg font-bold text-foreground">
              {index + 1}. {section.heading}
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground [&_li]:ml-4 [&_li]:list-disc [&_ul]:space-y-1.5">
              {section.body}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
