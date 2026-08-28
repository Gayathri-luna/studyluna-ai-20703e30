import { subjects } from "@/data/subjects";

/** Safe, always-valid search links for any learning topic. */
export const youtubeSearch = (topic: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + " tutorial")}`;

export const nptelSearch = (topic: string) =>
  `https://nptel.ac.in/courses?search=${encodeURIComponent(topic)}`;

export const notesSearch = (topic: string) =>
  `https://www.google.com/search?q=${encodeURIComponent(topic + " lecture notes pdf")}`;

export const ocwSearch = (topic: string) =>
  `https://ocw.mit.edu/search/?q=${encodeURIComponent(topic)}`;

export interface TopicLink {
  label: string;
  href: string;
  /** Internal router paths start with "/" and open in the same tab. */
  internal?: boolean;
}

const normalise = (value: string) =>
  value.toLowerCase().replace(/\(.*?\)/g, " ").replace(/[^a-z0-9]+/g, " ").trim();

/** Finds a matching /subjects page for a roadmap topic, if one exists. */
export function matchSubjectSlug(topic: string): string | undefined {
  const t = normalise(topic);
  if (!t) return undefined;
  const hit = subjects.find((s) => {
    const n = normalise(s.name);
    return t.includes(n) || n.includes(t);
  });
  return hit?.slug;
}

/** Link set shown next to a roadmap item / subject. */
export function topicLinks(topic: string): TopicLink[] {
  const links: TopicLink[] = [];
  const slug = matchSubjectSlug(topic);
  if (slug) links.push({ label: "Notes", href: `/subjects/${slug}`, internal: true });
  else links.push({ label: "Notes", href: notesSearch(topic) });
  links.push({ label: "YouTube", href: youtubeSearch(topic) });
  links.push({ label: "NPTEL", href: nptelSearch(topic) });
  return links;
}
