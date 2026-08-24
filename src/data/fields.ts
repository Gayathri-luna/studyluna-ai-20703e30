/**
 * Top-level "Field of Study" configuration.
 *
 * Every branch belongs to one or more fields. To add a new programme later,
 * add a field here (optional) and a branch entry in src/data/fieldPrograms.ts.
 */
export interface StudyField {
  slug: string;
  label: string;
  blurb: string;
}

export const ALL_FIELDS = "all";

export const studyFields: StudyField[] = [
  { slug: "engineering", label: "Engineering", blurb: "18 core and emerging engineering branches." },
  { slug: "management", label: "Management", blurb: "BBA and MBA — business, finance and strategy." },
  { slug: "computer-applications", label: "Computer Applications", blurb: "BCA and MCA — applied software careers." },
  { slug: "law", label: "Law", blurb: "LLB and 5-year integrated BA LLB." },
  { slug: "forensic-science", label: "Forensic Science", blurb: "Lab science for criminal investigation." },
  { slug: "healthcare", label: "Healthcare", blurb: "Nursing and Pharmacy — clinical and pharma careers." },
  { slug: "emerging-tech", label: "Emerging Tech", blurb: "AI/ML, Data Science, DevOps, Cybersecurity, Cloud." },
];

export const fieldBySlug = (slug: string) => studyFields.find((f) => f.slug === slug);
