import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { branches } from "@/data/branches";
import { skills } from "@/data/skills";
import { govJobs } from "@/data/govJobs";
import { resourceCategories } from "@/data/resources";
import { subjects } from "@/data/subjects";
import { miniProjects } from "@/data/ece";


interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GlobalSearch({ open, onOpenChange }: Props) {
  const navigate = useNavigate();

  const go = (href: string) => {
    onOpenChange(false);
    void navigate({ to: href });
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search roadmaps, skills, projects, jobs, resources…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Roadmaps">
          {branches.map((b) => (
            <CommandItem key={b.slug} value={`${b.name} ${b.short} roadmap`} onSelect={() => go(`/roadmaps/${b.slug}`)}>
              {b.name} roadmap
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Skills">
          {skills.map((s) => (
            <CommandItem key={s.slug} value={`${s.name} skill`} onSelect={() => go(`/skills/${s.slug}`)}>
              {s.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Government Jobs">
          {govJobs.map((j) => (
            <CommandItem key={j.slug} value={`${j.org} ${j.full}`} onSelect={() => go(`/government-jobs/${j.slug}`)}>
              {j.org} — {j.full}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Projects">
          {miniProjects.map((p) => (
            <CommandItem key={p.slug} value={`${p.title} ${p.domain} project`} onSelect={() => go(`/projects#${p.slug}`)}>
              {p.title}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Subjects">
          {subjects.map((s) => (
            <CommandItem key={s.slug} value={`${s.name} ${s.topics.join(" ")} notes pdf`} onSelect={() => go(`/subjects/${s.slug}`)}>
              {s.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Resources">
          {resourceCategories.map((c) => (
            <CommandItem key={c.slug} value={`${c.title} resources`} onSelect={() => go(`/resources/${c.slug}`)}>
              {c.title}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Luna AI">
          <CommandItem value="luna ai chat conversations" onSelect={() => go("/luna-ai")}>
            Open Luna AI chat
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
