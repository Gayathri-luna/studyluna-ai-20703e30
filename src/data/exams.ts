export type ExamCategory = "management" | "international";

export interface Exam {
  slug: string;
  name: string;
  /** "Management/Entrance" or "International" */
  category: ExamCategory;
  /** Conducting body (Indian exams). Optional for international exams. */
  conductingBody?: string;
  purpose: string;
  /** Exam date or window. Use "Check official website" when unknown. */
  examDate: string;
  /** Official website. */
  website: string;
  /** Optional syllabus / preparation link. */
  syllabus?: string;
  /** Optional roadmap route to link to, e.g. "/roadmaps/gate". */
  roadmapSlug?: string;
  /** Short description / blurb shown on the card. */
  summary: string;
}

export const exams: Exam[] = [
  // ---------------- Management / Entrance Exams ----------------
  {
    slug: "cat",
    name: "CAT",
    category: "management",
    conductingBody: "IIM",
    purpose: "MBA Admission",
    examDate: "Check official website",
    website: "https://iimcat.ac.in/",
    syllabus: "https://iimcat.ac.in/",
    summary:
      "Common Admission Test — the gateway to the IIMs and 1,000+ B-schools across India.",
  },
  {
    slug: "xat",
    name: "XAT",
    category: "management",
    conductingBody: "XLRI",
    purpose: "MBA / PGDM Admission",
    examDate: "Check official website",
    website: "https://xatonline.in/",
    syllabus: "https://xatonline.in/",
    summary:
      "Xavier Aptitude Test — accepted by XLRI and 160+ member B-schools for MBA/PGDM.",
  },
  {
    slug: "mat",
    name: "MAT",
    category: "management",
    conductingBody: "AIMA",
    purpose: "MBA Admission",
    examDate: "Check official website",
    website: "https://mat.aima.in/",
    syllabus: "https://mat.aima.in/",
    summary:
      "Management Aptitude Test by AIMA — accepted by 600+ B-schools, held multiple times a year.",
  },
  {
    slug: "snap",
    name: "SNAP",
    category: "management",
    conductingBody: "Symbiosis International (Deemed) University",
    purpose: "MBA Admission (Symbiosis institutes)",
    examDate: "Check official website",
    website: "https://snap.testbag.com/",
    syllabus: "https://snap.testbag.com/",
    summary:
      "Symbiosis National Aptitude — entry to Symbiosis institutes' MBA programmes.",
  },
  {
    slug: "nmat",
    name: "NMAT",
    category: "management",
    conductingBody: "GMAC",
    purpose: "MBA Admission (NMIMS & global schools)",
    examDate: "Check official website",
    website: "https://www.mba.com/exams/nmat",
    syllabus: "https://www.mba.com/exams/nmat",
    summary:
      "NMIMS Management Aptitude Test by GMAC — accepted by NMIMS and 50+ schools globally.",
  },
  {
    slug: "cmat",
    name: "CMAT",
    category: "management",
    conductingBody: "AICTE / NTA",
    purpose: "MBA Admission",
    examDate: "Check official website",
    website: "https://exams.nta.ac.in/CMAT/",
    syllabus: "https://exams.nta.ac.in/CMAT/",
    summary:
      "Common Management Admission Test by NTA — for AICTE-approved MBA/PGDM institutes.",
  },
  {
    slug: "iift",
    name: "IIFT",
    category: "management",
    conductingBody: "NTA (for IIFT)",
    purpose: "MBA Admission (IIFT)",
    examDate: "Check official website",
    website: "https://iift.ac.in/",
    syllabus: "https://iift.ac.in/",
    summary:
      "Indian Institute of Foreign Trade MBA entrance, now conducted by NTA.",
  },
  {
    slug: "gate-exam",
    name: "GATE",
    category: "management",
    conductingBody: "IISc Bangalore / IITs",
    purpose: "PSU / M.Tech Admission",
    examDate: "Check official website",
    website: "https://gate.iitm.ac.in/",
    syllabus: "https://gate.iitm.ac.in/",
    roadmapSlug: "gate",
    summary:
      "Graduate Aptitude Test in Engineering — unlocks M.Tech, PSUs and research roles.",
  },
  {
    slug: "clat",
    name: "CLAT",
    category: "management",
    conductingBody: "Consortium of NLUs",
    purpose: "Law Admission (UG & PG)",
    examDate: "Check official website",
    website: "https://consortiumofnlus.ac.in/",
    syllabus: "https://consortiumofnlus.ac.in/",
    summary:
      "Common Law Admission Test — entry to National Law Universities for UG and PG law.",
  },
  {
    slug: "ipmat",
    name: "IPMAT",
    category: "management",
    conductingBody: "IIM Indore / IIM Rohtak",
    purpose: "Integrated MBA (IPM) Admission",
    examDate: "Check official website",
    website: "https://www.iimidr.ac.in/",
    syllabus: "https://www.iimidr.ac.in/",
    summary:
      "Integrated Programme in Management Aptitude Test — 5-year IPM entry at select IIMs.",
  },

  // ---------------- International Exams ----------------
  {
    slug: "gre",
    name: "GRE",
    category: "international",
    purpose: "US / Global Masters Admission",
    examDate: "Check official website",
    website: "https://www.ets.org/gre",
    syllabus: "https://www.ets.org/gre",
    summary:
      "Graduate Record Examinations — required by many US and global graduate programmes.",
  },
  {
    slug: "gmat",
    name: "GMAT",
    category: "international",
    purpose: "Global MBA Admission",
    examDate: "Check official website",
    website: "https://www.mba.com/exams/gmat",
    syllabus: "https://www.mba.com/exams/gmat",
    summary:
      "Graduate Management Admission Test — the standard for global MBA and business programmes.",
  },
  {
    slug: "toefl",
    name: "TOEFL",
    category: "international",
    purpose: "English Proficiency",
    examDate: "Check official website",
    website: "https://www.ets.org/toefl",
    syllabus: "https://www.ets.org/toefl",
    summary:
      "Test of English as a Foreign Language — widely accepted by US and global universities.",
  },
  {
    slug: "ielts",
    name: "IELTS",
    category: "international",
    purpose: "English Proficiency",
    examDate: "Check official website",
    website: "https://www.ielts.org/",
    syllabus: "https://www.ielts.org/",
    summary:
      "International English Language Testing System — accepted in the UK, Australia, Canada and beyond.",
  },
  {
    slug: "sat",
    name: "SAT",
    category: "international",
    purpose: "US Undergraduate Admission",
    examDate: "Check official website",
    website: "https://satsuite.collegeboard.org/sat",
    syllabus: "https://satsuite.collegeboard.org/sat",
    summary:
      "Scholastic Assessment Test — used by US colleges for undergraduate admissions.",
  },
  {
    slug: "usmle",
    name: "USMLE",
    category: "international",
    purpose: "Medical Licensing Abroad (USA)",
    examDate: "Check official website",
    website: "https://www.usmle.org/",
    syllabus: "https://www.usmle.org/",
    summary:
      "United States Medical Licensing Examination — required to practise medicine in the USA.",
  },
  {
    slug: "plab",
    name: "PLAB",
    category: "international",
    purpose: "Medical Licensing Abroad (UK)",
    examDate: "Check official website",
    website: "https://www.gmc-uk.org/registration-and-licensing/join-the-register/plab",
    syllabus: "https://www.gmc-uk.org/registration-and-licensing/join-the-register/plab",
    summary:
      "Professional and Linguistic Assessments Board — for international doctors seeking UK registration.",
  },
  {
    slug: "nclex",
    name: "NCLEX",
    category: "international",
    purpose: "Nursing Licensing Abroad (USA / Canada)",
    examDate: "Check official website",
    website: "https://www.ncsbn.org/exams/nclex",
    syllabus: "https://www.ncsbn.org/exams/nclex",
    summary:
      "National Council Licensure Examination — for nurses seeking registration in the US and Canada.",
  },
  {
    slug: "pte",
    name: "PTE Academic",
    category: "international",
    purpose: "English Proficiency",
    examDate: "Check official website",
    website: "https://www.pearsonpte.com/",
    syllabus: "https://www.pearsonpte.com/",
    summary:
      "Pearson Test of English Academic — computer-based English test accepted worldwide.",
  },
  {
    slug: "duolingo-english-test",
    name: "Duolingo English Test",
    category: "international",
    purpose: "English Proficiency",
    examDate: "Check official website",
    website: "https://englishtest.duolingo.com/",
    syllabus: "https://englishtest.duolingo.com/",
    summary:
      "A convenient, online English proficiency test accepted by thousands of institutions.",
  },
];

export const EXAM_CATEGORIES: {
  key: ExamCategory | "all";
  label: string;
  blurb: string;
}[] = [
  {
    key: "all",
    label: "All",
    blurb: "Every management, entrance and international exam in one list.",
  },
  {
    key: "management",
    label: "Management / Entrance",
    blurb: "Indian entrance exams for MBA, law, M.Tech and integrated programmes.",
  },
  {
    key: "international",
    label: "International",
    blurb: "Global exams for masters, MBA, English proficiency and licensing abroad.",
  },
];

export function filterExams(category: ExamCategory | "all", query: string): Exam[] {
  const q = query.trim().toLowerCase();
  return exams.filter((e) => {
    if (category !== "all" && e.category !== category) return false;
    if (!q) return true;
    return [e.name, e.purpose, e.conductingBody ?? "", e.summary]
      .join(" ")
      .toLowerCase()
      .includes(q);
  });
}
