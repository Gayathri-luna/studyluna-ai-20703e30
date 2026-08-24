/**
 * Healthcare programmes (Nursing, Pharmacy).
 *
 * Same data structures as every other branch, so they appear automatically in
 * Roadmaps, Skills, Projects, Government Jobs and Career Updates.
 */
import type { Branch } from "./branches";
import type { BranchDetail } from "./branchDetails";

export const healthBranches: Branch[] = [
  {
    slug: "nursing",
    name: "Nursing (GNM / B.Sc Nursing)",
    short: "Nursing",
    tagline: "Patient care, clinical skills and hospital practice.",
    fields: ["healthcare"],
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: [
          "Anatomy, physiology and biochemistry",
          "Fundamentals of nursing and patient hygiene",
          "Microbiology and infection control",
          "Nutrition, first aid and vital signs measurement",
        ],
      },
      {
        title: "Phase 2 — Core subjects",
        items: [
          "Medical-surgical nursing I & II",
          "Pharmacology and drug administration",
          "Community health nursing and public health programmes",
          "Child health (paediatric) and mental health nursing",
        ],
      },
      {
        title: "Phase 3 — Clinical practice",
        items: [
          "Ward postings: medicine, surgery, OT, ICU, emergency",
          "Midwifery and obstetric nursing with case records",
          "BLS / ACLS style emergency response training",
          "Nursing documentation, care plans and ethics",
        ],
      },
      {
        title: "Phase 4 — Job ready",
        items: [
          "Register with the State Nursing Council (RN/RM)",
          "Prepare for AIIMS / NORCET, ESIC, state staff nurse exams",
          "Optional: NCLEX / OET / IELTS for working abroad",
          "Resume, clinical logbook and interview practice",
        ],
      },
    ],
    coreSkills: [
      "Patient assessment",
      "Injection & IV therapy",
      "Wound care",
      "Emergency response",
      "Medication safety",
      "Clinical documentation",
    ],
    projectIdeas: [
      "Community health survey on anaemia in a village",
      "Patient education booklet on diabetes self-care",
      "Infection-control audit of a ward",
    ],
    careers: [
      "Staff Nurse",
      "ICU / Critical Care Nurse",
      "Community Health Nurse",
      "Nursing Officer (Government)",
      "Nurse Educator",
    ],
  },
  {
    slug: "pharmacy",
    name: "Pharmacy (D.Pharm / B.Pharm)",
    short: "Pharmacy",
    tagline: "Drugs, formulation, dispensing and regulatory practice.",
    fields: ["healthcare"],
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: [
          "Human anatomy & physiology",
          "Pharmaceutical inorganic and organic chemistry",
          "Pharmaceutics I — dosage forms and dispensing",
          "Basic mathematics and pharmaceutical calculations",
        ],
      },
      {
        title: "Phase 2 — Core subjects",
        items: [
          "Pharmacology I, II & III",
          "Pharmaceutical analysis and instrumental methods",
          "Pharmacognosy and phytochemistry",
          "Pharmaceutical microbiology and biotechnology",
        ],
      },
      {
        title: "Phase 3 — Specialise",
        items: [
          "Pick one: formulation R&D, quality control/QA, clinical research, regulatory affairs or community pharmacy",
          "Industrial training in a pharma unit or hospital pharmacy",
          "Learn HPLC/UV handling, GMP and documentation practice",
        ],
      },
      {
        title: "Phase 4 — Job ready",
        items: [
          "GPAT preparation if targeting M.Pharm with stipend",
          "State Pharmacy Council registration (Registered Pharmacist)",
          "Drug Inspector / ESIC / hospital pharmacist exam prep",
          "Resume with training reports and analytical skills",
        ],
      },
    ],
    coreSkills: [
      "Pharmacology",
      "Formulation development",
      "Pharmaceutical analysis (HPLC/UV)",
      "GMP & documentation",
      "Dispensing & prescription review",
      "Regulatory basics",
    ],
    projectIdeas: [
      "Formulation and evaluation of herbal ointment",
      "UV-spectroscopy assay of a marketed tablet",
      "Prescription audit in a community pharmacy",
    ],
    careers: [
      "Production / Formulation Pharmacist",
      "Quality Control & QA Analyst",
      "Clinical Research Associate",
      "Regulatory Affairs Executive",
      "Hospital / Community Pharmacist",
      "Drug Inspector (Government)",
    ],
  },
];

export const healthBranchDetails: Record<string, BranchDetail> = {
  nursing: {
    subjects: [
      "Anatomy & Physiology",
      "Biochemistry & Nutrition",
      "Fundamentals of Nursing",
      "Microbiology & Infection Control",
      "Pharmacology for Nurses",
      "Medical-Surgical Nursing I & II",
      "Child Health (Paediatric) Nursing",
      "Mental Health Nursing",
      "Obstetrics & Midwifery",
      "Community Health Nursing",
      "Nursing Management & Ethics",
      "Nursing Research & Statistics",
    ],
    technicalSkills: [
      "Vital signs & patient assessment",
      "IV cannulation and injections",
      "Wound dressing and sterile technique",
      "Catheterisation and tube feeding",
      "Emergency & CPR response",
      "Medication calculation and administration",
    ],
    programming: [
      "Hospital Information System (HIS) data entry",
      "Electronic Medical Records (EMR) usage",
      "MS Excel for health data",
      "Basic biostatistics tools (SPSS / Excel)",
    ],
    tools: [
      "Sphygmomanometer & pulse oximeter",
      "Glucometer and ECG machine basics",
      "Infusion and syringe pumps",
      "Ventilator and monitor familiarity (ICU)",
      "Nursing care plan templates",
      "HIS / EMR software",
    ],
    miniProjects: [
      "Community health survey on anaemia or hypertension",
      "Patient education booklet on diabetes self-care",
      "Hand-hygiene compliance audit in a ward",
      "Case study presentation on a admitted patient",
    ],
    majorProjects: [
      "Comprehensive family health study over a semester",
      "Ward infection-control improvement project",
      "Health awareness campaign in a rural PHC area",
      "Evidence-based nursing research on pain management",
    ],
    careerPaths: [
      "Hospital bedside nursing",
      "Critical care & emergency",
      "Community and public health",
      "Nursing education",
      "Nursing administration",
      "International nursing (NCLEX / OET route)",
    ],
    jobRoles: [
      "Staff Nurse",
      "ICU / Emergency Nurse",
      "OT Nurse",
      "Community Health Nurse",
      "Nursing Officer",
      "Nurse Educator / Tutor",
    ],
    govOpportunities: [
      "AIIMS NORCET — Nursing Officer",
      "ESIC Nursing Officer",
      "Railway Recruitment Board — Staff Nurse",
      "State Government Staff Nurse recruitment (through state PSC / NHM)",
      "Military Nursing Service (MNS)",
      "PHC / CHC posts under National Health Mission",
    ],
    higherStudies: [
      "Post Basic B.Sc Nursing (after GNM)",
      "M.Sc Nursing (specialisation: medical-surgical, paediatric, psychiatric, community, OBG)",
      "Nurse Practitioner in Critical Care (NPCC)",
      "PhD in Nursing / hospital administration (MHA)",
    ],
    certifications: [
      "BLS and ACLS certification",
      "Infection control certification",
      "NCLEX-RN (for USA) / OET or IELTS (for UK, Gulf)",
      "Certified Diabetes Educator",
    ],
    industryTech: [
      "Electronic medical records and paperless wards",
      "Telemedicine and remote patient monitoring",
      "Smart infusion pumps and alarm management",
      "AI-based early-warning scores in ICUs",
      "Wearables for chronic-disease follow-up",
    ],
    careerFocus: [
      {
        area: "Government Nursing Officer",
        detail:
          "AIIMS NORCET, ESIC and state staff nurse exams are the highest-value routes. Preparation is syllabus-driven: nursing fundamentals, medical-surgical nursing and current health programmes.",
        skills: ["Core nursing subjects", "Health programmes of India", "Aptitude", "Exam speed practice"],
      },
      {
        area: "Critical Care & Emergency",
        detail:
          "Multi-speciality hospitals pay a premium for ICU, OT and emergency nurses who are confident with ventilators, monitors and codes.",
        skills: ["ACLS/BLS", "Ventilator basics", "ABG interpretation", "Rapid triage"],
      },
      {
        area: "Community & Public Health",
        detail:
          "NHM, PHC and NGO roles focus on maternal health, immunisation and non-communicable disease screening at scale.",
        skills: ["Field survey", "Health education", "Immunisation schedule", "Record keeping"],
      },
      {
        area: "International Nursing",
        detail:
          "The UK, Gulf and USA actively recruit Indian nurses. Clear the language test and licensing exam while gaining 1-2 years of clinical experience.",
        skills: ["NCLEX / OET prep", "English communication", "Clinical documentation", "Cultural competence"],
      },
    ],
  },
  pharmacy: {
    subjects: [
      "Human Anatomy & Physiology",
      "Pharmaceutical Inorganic Chemistry",
      "Pharmaceutical Organic Chemistry",
      "Pharmaceutics I & II",
      "Pharmacology I, II & III",
      "Pharmaceutical Analysis",
      "Pharmacognosy & Phytochemistry",
      "Pharmaceutical Microbiology",
      "Medicinal Chemistry",
      "Industrial Pharmacy",
      "Pharmaceutical Jurisprudence",
      "Biopharmaceutics & Pharmacokinetics",
    ],
    technicalSkills: [
      "Dosage form formulation",
      "Instrumental analysis (HPLC, UV, IR)",
      "Quality control testing",
      "GMP and SOP documentation",
      "Prescription handling and dispensing",
      "Stability and dissolution studies",
    ],
    programming: [
      "MS Excel for analytical data",
      "LIMS (Laboratory Information Management System)",
      "Basic statistics for validation",
      "ChemDraw / molecular drawing tools",
    ],
    tools: [
      "HPLC and UV-Visible spectrophotometer",
      "Dissolution and disintegration apparatus",
      "Tablet compression machine",
      "Autoclave and laminar air flow",
      "pH meter and Karl Fischer titrator",
      "LIMS / eBMR software",
    ],
    miniProjects: [
      "Formulation and evaluation of a herbal ointment",
      "UV assay of paracetamol in a marketed tablet",
      "Antimicrobial testing of a plant extract",
      "Prescription audit in a community pharmacy",
    ],
    majorProjects: [
      "Development and evaluation of a sustained-release tablet",
      "Method development and validation by HPLC",
      "Nanoparticle-based drug delivery study",
      "Pharmacovigilance study of ADRs in a hospital",
    ],
    careerPaths: [
      "Formulation R&D",
      "Quality control & quality assurance",
      "Regulatory affairs",
      "Clinical research & pharmacovigilance",
      "Production and manufacturing",
      "Community / hospital pharmacy",
    ],
    jobRoles: [
      "Formulation Scientist",
      "QC Analyst",
      "QA Executive",
      "Regulatory Affairs Associate",
      "Clinical Research Associate",
      "Medical Representative",
      "Hospital Pharmacist",
    ],
    govOpportunities: [
      "Drug Inspector (UPSC / State PSC)",
      "Drugs Control Officer",
      "ESIC / Railway Pharmacist",
      "Government hospital pharmacist (state health department)",
      "CDSCO Technical Data Associate",
      "Scientist posts in CSIR, ICMR and NIPER-linked labs",
    ],
    higherStudies: [
      "M.Pharm via GPAT (pharmaceutics, pharmacology, pharma analysis, regulatory affairs)",
      "Pharm.D or Post Baccalaureate Pharm.D",
      "MBA in pharmaceutical management",
      "MS abroad in pharmaceutical sciences / regulatory science",
    ],
    certifications: [
      "GPAT qualification",
      "Good Manufacturing Practice (GMP) training",
      "Clinical research and pharmacovigilance certification",
      "Regulatory affairs certification (RAC basics)",
    ],
    industryTech: [
      "Continuous manufacturing in pharma",
      "AI-assisted drug discovery",
      "Biosimilars and biologics",
      "Serialisation and track-and-trace",
      "Digital therapeutics and e-pharmacy",
    ],
    careerFocus: [
      {
        area: "Drug Inspector & Regulatory Government Roles",
        detail:
          "Drug Inspector and Drugs Control Officer posts are recruited by UPSC and state PSCs. The syllabus leans on pharmaceutics, pharmacology, analysis and the Drugs & Cosmetics Act.",
        skills: ["Pharmaceutical jurisprudence", "Pharmacology", "Analysis", "Current pharma affairs"],
      },
      {
        area: "Formulation R&D",
        detail:
          "Generic and speciality companies hire M.Pharm graduates who can design, scale and troubleshoot dosage forms.",
        skills: ["Preformulation", "Excipient science", "Scale-up", "Stability studies"],
      },
      {
        area: "Quality Control & QA",
        detail:
          "The largest hiring pool in Indian pharma. Instrument handling plus audit-ready documentation gets you in.",
        skills: ["HPLC/GC", "Method validation", "GDP/GMP", "Deviation handling"],
      },
      {
        area: "Clinical Research & Pharmacovigilance",
        detail:
          "CROs and global capability centres recruit for safety reporting, trial monitoring and medical writing.",
        skills: ["ICH-GCP", "Argus / safety databases", "Medical writing", "Data review"],
      },
      {
        area: "GPAT & Higher Studies",
        detail:
          "GPAT unlocks AICTE stipends and NIPER admission; it is the strongest single lever for a B.Pharm student.",
        skills: ["GPAT syllabus revision", "Mock tests", "Pharmacology recall", "Numerical practice"],
      },
    ],
  },
};
