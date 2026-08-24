/**
 * Non-engineering programmes (Management, Computer Applications, Law,
 * Forensic Science, Emerging Tech).
 *
 * These use the EXACT same data structures as the engineering branches, so they
 * automatically appear in Roadmaps, Career Hub, Learning Hub, Skills, Projects,
 * Government Jobs and Career Updates. To add a programme, append an entry to
 * `extraBranches` and one with the same slug to `extraBranchDetails`.
 */
import type { Branch } from "./branches";
import type { BranchDetail } from "./branchDetails";

export const extraBranches: Branch[] = [
  {
    slug: "bba",
    name: "Bachelor of Business Administration",
    short: "BBA",
    tagline: "Business fundamentals, marketing, finance and people management.",
    fields: ["management"],
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: [
          "Principles of management, micro & macro economics",
          "Financial accounting and business mathematics",
          "Excel / Google Sheets to a working level",
          "Business communication and email etiquette",
        ],
      },
      {
        title: "Phase 2 — Core subjects",
        items: [
          "Marketing management and consumer behaviour",
          "Corporate finance, cost accounting, ratio analysis",
          "Human resource management and organisational behaviour",
          "Business statistics and basic SQL",
        ],
      },
      {
        title: "Phase 3 — Specialise",
        items: [
          "Pick one: Marketing, Finance, HR, Operations or Analytics",
          "Do two internships and one live market-research project",
          "Learn Power BI / Tableau and a CRM tool",
        ],
      },
      {
        title: "Phase 4 — Job ready",
        items: [
          "CAT / GMAT prep if targeting an MBA",
          "Case-interview and guesstimate practice",
          "Resume, LinkedIn and a portfolio of case studies",
        ],
      },
    ],
    coreSkills: ["Excel modelling", "Market research", "Financial analysis", "Power BI", "Presentation", "SQL"],
    projectIdeas: [
      "Market research report for a local D2C brand",
      "Financial statement analysis of a listed company",
      "Go-to-market plan for a student startup",
    ],
    careers: ["Business Analyst", "Marketing Executive", "Financial Analyst", "HR Associate", "Operations Trainee"],
  },
  {
    slug: "mba",
    name: "Master of Business Administration",
    short: "MBA",
    tagline: "Strategy, leadership and functional depth for management roles.",
    fields: ["management"],
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: [
          "Accounting, economics and quantitative methods refresher",
          "Structured problem solving and MECE thinking",
          "Advanced Excel and financial modelling",
        ],
      },
      {
        title: "Phase 2 — Core subjects",
        items: [
          "Corporate finance, valuation and capital budgeting",
          "Marketing strategy, brand and pricing",
          "Operations, supply chain and business analytics",
          "Strategy and competitive analysis frameworks",
        ],
      },
      {
        title: "Phase 3 — Specialise",
        items: [
          "Choose a track: Finance, Marketing, Product, Consulting, Operations",
          "Summer internship converted into a live business problem",
          "Build a domain point of view with 3 written case studies",
        ],
      },
      {
        title: "Phase 4 — Job ready",
        items: [
          "Case interviews, guesstimates and stress-tested resume bullets",
          "Networking with alumni and industry mentors",
          "Placement prep: personal narrative and PI questions",
        ],
      },
    ],
    coreSkills: ["Financial modelling", "Strategy frameworks", "Business analytics", "Negotiation", "Stakeholder management"],
    projectIdeas: [
      "Valuation model for a listed company",
      "Market-entry strategy for a foreign brand in India",
      "Supply-chain cost reduction case study",
    ],
    careers: ["Management Consultant", "Product Manager", "Investment Banking Analyst", "Brand Manager", "Operations Manager"],
  },
  {
    slug: "bca",
    name: "Bachelor of Computer Applications",
    short: "BCA",
    tagline: "Applied programming, web, databases and IT careers.",
    fields: ["computer-applications"],
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: [
          "C and Python programming fundamentals",
          "Computer fundamentals and operating systems",
          "HTML, CSS and JavaScript basics",
          "Git and GitHub from day one",
        ],
      },
      {
        title: "Phase 2 — Core subjects",
        items: [
          "Data structures and algorithms in one language",
          "DBMS and SQL, ER modelling and normalisation",
          "Object-oriented programming (Java or Python)",
          "Computer networks and web protocols",
        ],
      },
      {
        title: "Phase 3 — Specialise",
        items: [
          "Pick one: full-stack web, mobile, data or cloud",
          "Build 3 deployed projects with authentication and a database",
          "Learn one framework deeply (React, Django, Spring Boot)",
        ],
      },
      {
        title: "Phase 4 — Job ready",
        items: [
          "150+ DSA problems and mock technical interviews",
          "MCA / MSc entrance prep if going for higher studies",
          "Portfolio site, resume and active GitHub",
        ],
      },
    ],
    coreSkills: ["Python", "JavaScript", "SQL", "React", "Git", "REST APIs"],
    projectIdeas: [
      "Full-stack college attendance portal",
      "Expense tracker with charts and auth",
      "REST API with role-based access control",
    ],
    careers: ["Software Developer", "Web Developer", "QA Engineer", "Database Administrator", "IT Support Analyst"],
  },
  {
    slug: "mca",
    name: "Master of Computer Applications",
    short: "MCA",
    tagline: "Advanced software engineering, systems and product development.",
    fields: ["computer-applications"],
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: [
          "Advanced DSA and complexity analysis",
          "Object-oriented design and design patterns",
          "Linux, shell scripting and Git workflows",
        ],
      },
      {
        title: "Phase 2 — Core subjects",
        items: [
          "Software engineering, testing and system design",
          "Advanced DBMS, indexing and query tuning",
          "Distributed systems and cloud fundamentals",
          "Machine learning basics",
        ],
      },
      {
        title: "Phase 3 — Specialise",
        items: [
          "Choose: backend engineering, data engineering, cloud/DevOps or ML",
          "Ship one production-grade project with CI/CD and tests",
          "Contribute to an open-source repository",
        ],
      },
      {
        title: "Phase 4 — Job ready",
        items: [
          "System-design interview preparation",
          "300 DSA problems and 5 mock interviews",
          "Technical blog or documented case studies",
        ],
      },
    ],
    coreSkills: ["Java / Python", "System design", "SQL & NoSQL", "Docker", "Cloud basics", "Testing"],
    projectIdeas: [
      "Multi-tenant SaaS dashboard",
      "Real-time chat with WebSockets",
      "ETL pipeline with scheduled jobs",
    ],
    careers: ["Software Engineer", "Backend Developer", "Data Engineer", "Cloud Engineer", "Systems Analyst"],
  },
  {
    slug: "llb",
    name: "Bachelor of Laws (LLB)",
    short: "LLB",
    tagline: "Substantive law, procedure, drafting and courtroom practice.",
    fields: ["law"],
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: [
          "Constitution of India: structure, fundamental rights, writs",
          "Legal method, sources of law and legal reasoning",
          "How to read a judgment: facts, issues, ratio, obiter",
          "Legal research on SCC Online / Indian Kanoon",
        ],
      },
      {
        title: "Phase 2 — Core subjects",
        items: [
          "Contract law, torts and Bharatiya Nyaya Sanhita (criminal law)",
          "CPC and BNSS (procedure), Evidence Act",
          "Family law, property law and company law",
          "Drafting: plaints, written statements, notices",
        ],
      },
      {
        title: "Phase 3 — Specialise",
        items: [
          "Pick one: litigation, corporate, IPR, tax, criminal or policy",
          "Two internships — one chamber, one law firm or NGO",
          "Moot court, client counselling and paper publication",
        ],
      },
      {
        title: "Phase 4 — Job ready",
        items: [
          "AIBE (Bar exam) preparation",
          "Judicial services prelims + mains prep if targeting judgeship",
          "Portfolio of drafts, case briefs and moot memorials",
        ],
      },
    ],
    coreSkills: ["Legal research", "Case-law analysis", "Drafting", "Advocacy", "Statutory interpretation"],
    projectIdeas: [
      "Case brief series on landmark constitutional judgments",
      "Moot court memorial on a contemporary issue",
      "Empirical study of a local legal-aid clinic",
    ],
    careers: ["Litigation Advocate", "Corporate Counsel", "Judicial Services Officer", "Legal Researcher", "Compliance Officer"],
  },
  {
    slug: "ba-llb",
    name: "BA LLB (5-year Integrated Law)",
    short: "BA LLB",
    tagline: "Law with humanities — policy, politics and legal practice.",
    fields: ["law"],
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: [
          "Political science, sociology and economics fundamentals",
          "Legal method and English for legal writing",
          "Constitutional basics and current affairs habit",
        ],
      },
      {
        title: "Phase 2 — Core subjects",
        items: [
          "Contracts, torts, criminal law and constitutional law",
          "Procedure codes and law of evidence",
          "Corporate, IPR, labour and environmental law",
        ],
      },
      {
        title: "Phase 3 — Specialise",
        items: [
          "Choose litigation, corporate, policy or academia",
          "3–4 internships across chambers, firms and think tanks",
          "National moots, journals and legal-aid work",
        ],
      },
      {
        title: "Phase 4 — Job ready",
        items: [
          "Law-firm recruitment prep and AIBE",
          "Judicial services or LLM abroad (LSAT/GRE + IELTS)",
          "Publication and moot record on the CV",
        ],
      },
    ],
    coreSkills: ["Legal writing", "Research", "Public speaking", "Policy analysis", "Client counselling"],
    projectIdeas: [
      "Policy brief on data protection in India",
      "Comparative study of two constitutional doctrines",
      "Legal-aid awareness campaign with impact report",
    ],
    careers: ["Law Firm Associate", "Policy Analyst", "Judicial Services Officer", "In-house Counsel", "Legal Journalist"],
  },
  {
    slug: "forensic-science",
    name: "Forensic Science",
    short: "Forensics",
    tagline: "Scientific examination of evidence for criminal investigation.",
    fields: ["forensic-science"],
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: [
          "Chemistry, biology and basic physics revision",
          "Introduction to criminology and criminal law",
          "Crime-scene management and chain of custody",
          "Laboratory safety and documentation discipline",
        ],
      },
      {
        title: "Phase 2 — Core subjects",
        items: [
          "Forensic chemistry and toxicology",
          "Forensic biology, serology and DNA profiling",
          "Fingerprints, questioned documents and ballistics",
          "Instrumentation: microscopy, FTIR, GC-MS, PCR",
        ],
      },
      {
        title: "Phase 3 — Specialise",
        items: [
          "Pick one: DNA, toxicology, cyber forensics, ballistics or documents",
          "Internship at a state FSL or a private lab",
          "Case-study analysis and mock evidence reports",
        ],
      },
      {
        title: "Phase 4 — Job ready",
        items: [
          "Prepare for CFSL / state FSL and UPSC-linked recruitment",
          "Expert-witness and courtroom testimony practice",
          "NET/JRF or MSc/PhD route if aiming for research",
        ],
      },
    ],
    coreSkills: ["Evidence handling", "DNA profiling", "Chromatography", "Microscopy", "Report writing", "Cyber forensics"],
    projectIdeas: [
      "Comparative study of latent fingerprint development powders",
      "Analysis of ink samples in questioned documents",
      "Digital forensic recovery from a test disk image",
    ],
    careers: ["Forensic Scientist (FSL)", "Crime Scene Investigator", "Toxicology Analyst", "Cyber Forensic Examiner", "Forensic Lab Assistant"],
  },
  {
    slug: "ai-ml",
    name: "Artificial Intelligence & Machine Learning",
    short: "AI/ML",
    tagline: "Models, data and deployed intelligent systems.",
    fields: ["emerging-tech"],
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: [
          "Python, NumPy, Pandas and plotting",
          "Linear algebra, probability and statistics",
          "Clean data handling and exploratory analysis",
        ],
      },
      {
        title: "Phase 2 — Core subjects",
        items: [
          "Supervised and unsupervised learning with scikit-learn",
          "Model evaluation, cross-validation and leakage",
          "Deep learning: CNNs, RNNs, transformers with PyTorch",
        ],
      },
      {
        title: "Phase 3 — Specialise",
        items: [
          "Choose NLP/LLMs, computer vision or applied ML",
          "Fine-tune or build with an LLM API end to end",
          "Learn MLOps: tracking, versioning and serving",
        ],
      },
      {
        title: "Phase 4 — Job ready",
        items: [
          "3 deployed projects with a written model card",
          "ML system-design and coding interview prep",
          "Kaggle competition or open-source contribution",
        ],
      },
    ],
    coreSkills: ["Python", "PyTorch", "scikit-learn", "SQL", "MLOps", "Prompt engineering"],
    projectIdeas: ["Document Q&A app with retrieval", "Image classifier deployed as an API", "Time-series demand forecaster"],
    careers: ["ML Engineer", "Data Scientist", "AI Engineer", "Research Assistant", "MLOps Engineer"],
  },
  {
    slug: "data-science",
    name: "Data Science",
    short: "Data Sci",
    tagline: "Turning messy data into decisions and products.",
    fields: ["emerging-tech"],
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Python and SQL to a working level", "Descriptive statistics and probability", "Spreadsheet and dashboard basics"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: [
          "Data cleaning, feature engineering and EDA",
          "Inferential statistics, A/B testing",
          "Machine learning fundamentals and evaluation",
          "Visualisation with Power BI or Tableau",
        ],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Pick analytics, data engineering or applied ML", "Build a warehouse + dashboard project", "Learn dbt, Airflow or Spark"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["SQL case rounds and business case practice", "Portfolio of 3 analyses with clear recommendations", "Resume with quantified impact"],
      },
    ],
    coreSkills: ["SQL", "Python", "Statistics", "Power BI", "Storytelling", "ETL"],
    projectIdeas: ["Customer churn analysis with recommendations", "Sales dashboard from raw CSVs", "A/B test analysis write-up"],
    careers: ["Data Analyst", "Data Scientist", "Analytics Consultant", "BI Developer", "Data Engineer"],
  },
  {
    slug: "devops",
    name: "DevOps Engineering",
    short: "DevOps",
    tagline: "Automating build, deploy and reliability for software teams.",
    fields: ["emerging-tech"],
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Linux, networking and shell scripting", "Git branching and code review flow", "One programming language (Python or Go)"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: [
          "Docker images, registries and compose",
          "CI/CD with GitHub Actions or GitLab CI",
          "Infrastructure as code with Terraform",
          "Monitoring and logging with Prometheus and Grafana",
        ],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Kubernetes deployments, services and scaling", "Cloud platform depth (AWS, Azure or GCP)", "Security scanning and secrets management"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["Build a full pipeline from commit to production", "Practise incident and troubleshooting scenarios", "Cloud certification (AWS SAA or equivalent)"],
      },
    ],
    coreSkills: ["Linux", "Docker", "Kubernetes", "Terraform", "CI/CD", "Observability"],
    projectIdeas: ["Zero-downtime deploy pipeline", "Kubernetes cluster with autoscaling demo", "IaC-provisioned staging environment"],
    careers: ["DevOps Engineer", "Site Reliability Engineer", "Platform Engineer", "Cloud Engineer", "Build & Release Engineer"],
  },
  {
    slug: "cloud-computing",
    name: "Cloud Computing",
    short: "Cloud",
    tagline: "Designing and running workloads on cloud platforms.",
    fields: ["emerging-tech"],
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Networking, DNS, HTTP and Linux basics", "Cloud service models: IaaS, PaaS, SaaS", "One cloud console hands-on with a free tier"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: [
          "Compute, storage, VPC and IAM on your chosen cloud",
          "Managed databases and object storage",
          "Serverless functions and queues",
          "Cost management and well-architected principles",
        ],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Choose architecture, security or data on cloud", "Automate with Terraform and CI/CD", "Design a multi-tier app with high availability"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["Cloud certification (AWS/Azure/GCP associate)", "Architecture diagrams in your portfolio", "Scenario-based interview practice"],
      },
    ],
    coreSkills: ["AWS/Azure/GCP", "Networking", "IAM", "Terraform", "Serverless", "Cost optimisation"],
    projectIdeas: ["Serverless image-processing pipeline", "Highly available web app across zones", "Cloud cost audit of a sample workload"],
    careers: ["Cloud Engineer", "Solutions Architect", "Cloud Security Analyst", "Infrastructure Engineer", "FinOps Analyst"],
  },
];

const cf = (area: string, detail: string, skills: string[]) => ({ area, detail, skills });

export const extraBranchDetails: Record<string, BranchDetail> = {
  bba: {
    subjects: ["Principles of Management", "Financial Accounting", "Microeconomics & Macroeconomics", "Marketing Management", "Organisational Behaviour", "Business Statistics", "Business Law", "Corporate Finance", "Operations Management", "Entrepreneurship"],
    technicalSkills: ["Financial statement analysis", "Market research design", "Data visualisation", "Budgeting & forecasting", "CRM usage", "Business writing"],
    programming: ["Excel formulas & pivot tables", "SQL for business queries", "Python (basic analytics)", "Google Apps Script (automation)"],
    tools: ["Microsoft Excel", "Power BI / Tableau", "Google Analytics", "HubSpot / Zoho CRM", "Canva", "Notion"],
    miniProjects: ["Consumer survey on a campus product", "Break-even analysis for a small business", "Social media audit of two competitors", "Personal finance planner in Excel"],
    majorProjects: ["Full business plan with financial projections", "Market-entry study for a new city", "Brand repositioning case study", "Supply-chain cost analysis of a local retailer"],
    careerPaths: ["Marketing", "Finance", "Human resources", "Operations & supply chain", "Business analytics", "Entrepreneurship"],
    jobRoles: ["Business Analyst", "Marketing Executive", "Financial Analyst", "HR Associate", "Sales Manager", "Operations Executive"],
    govOpportunities: ["UPSC Civil Services", "IBPS PO / SBI PO", "SSC CGL", "RBI Grade B", "State PSC administrative posts"],
    higherStudies: ["MBA via CAT / XAT / GMAT", "MSc Management abroad", "CFA / FRM for finance", "PGDM in analytics"],
    certifications: ["Google Analytics Certification", "HubSpot Inbound Marketing", "Financial Modelling & Valuation", "Microsoft Power BI Data Analyst"],
    industryTech: ["AI in marketing automation", "Self-serve analytics", "D2C and quick commerce", "ESG reporting", "Fintech and UPI ecosystem"],
    careerFocus: [
      cf("Business Analytics", "Every function now hires analysts who can query data and explain it. SQL plus a BI tool is the fastest differentiator for a BBA graduate.", ["SQL", "Excel modelling", "Power BI", "Storytelling"]),
      cf("Marketing & Growth", "Performance marketing and brand roles hire early and reward measurable campaign results.", ["Google Ads", "SEO basics", "Analytics", "Copywriting"]),
      cf("Finance & Banking", "Banking, NBFC and fintech roles look for accounting fluency and modelling accuracy.", ["Financial modelling", "Valuation", "Accounting", "Excel"]),
      cf("Government & Banking Exams", "IBPS, SBI, RBI Grade B and SSC CGL are structured, predictable routes for commerce and management graduates.", ["Quantitative aptitude", "Reasoning", "English", "Current affairs"]),
    ],
  },
  mba: {
    subjects: ["Corporate Finance", "Marketing Strategy", "Operations & Supply Chain", "Business Analytics", "Strategic Management", "Organisational Design", "Managerial Economics", "Business Ethics & Governance"],
    technicalSkills: ["Financial modelling", "Valuation", "Market sizing", "Case structuring", "Dashboarding", "Project management"],
    programming: ["Advanced Excel / VBA", "SQL", "Python for analytics", "R (optional, for research)"],
    tools: ["Excel", "PowerPoint", "Power BI / Tableau", "Bloomberg / Capital IQ", "Jira", "Notion"],
    miniProjects: ["Guesstimate deck on a market size", "Unit-economics model for a startup", "Competitive teardown of two brands", "Process improvement study in an internship"],
    majorProjects: ["Full DCF valuation with sensitivity analysis", "Go-to-market plan for a new product line", "Operations turnaround case with cost model", "Consulting-style strategy report for a real client"],
    careerPaths: ["Consulting", "Product management", "Investment banking & finance", "Marketing & brand", "Operations & supply chain", "General management"],
    jobRoles: ["Management Consultant", "Product Manager", "Investment Banking Analyst", "Brand Manager", "Strategy Associate", "Operations Manager"],
    govOpportunities: ["RBI Grade B", "SIDBI / NABARD Grade A", "UPSC Civil Services", "PSU management trainee schemes"],
    higherStudies: ["Executive MBA later in career", "CFA charter", "PhD in management", "Specialised MS abroad"],
    certifications: ["CFA Level I", "PMP / CAPM", "Google Project Management", "Tableau Desktop Specialist"],
    industryTech: ["Generative AI in enterprise workflows", "Analytics-led decision making", "Digital supply chains", "Climate and ESG strategy", "Platform business models"],
    careerFocus: [
      cf("Consulting", "Case interviews decide entry. Structure, arithmetic under pressure and clear communication matter more than theory.", ["Case structuring", "Market sizing", "Excel", "Executive communication"]),
      cf("Product Management", "Tech companies hire MBAs who understand users, data and delivery trade-offs.", ["User research", "SQL", "Roadmapping", "A/B testing"]),
      cf("Finance & Banking", "Valuation accuracy and market awareness drive IB and corporate finance recruitment.", ["DCF & comps", "Accounting", "Modelling", "Market news"]),
      cf("General Management", "Leadership development programmes rotate you through functions — show ownership and people skills.", ["Stakeholder management", "Operations", "Analytics", "Leadership"]),
    ],
  },
  bca: {
    subjects: ["Programming in C", "Data Structures", "Database Management Systems", "Operating Systems", "Computer Networks", "Web Technologies", "Object Oriented Programming", "Software Engineering", "Python Programming", "Cloud Fundamentals"],
    technicalSkills: ["Full-stack web development", "Database design", "API development", "Debugging", "Version control", "Basic testing"],
    programming: ["Python", "JavaScript / TypeScript", "Java", "C", "SQL", "PHP (legacy stacks)"],
    tools: ["VS Code", "Git & GitHub", "Postman", "MySQL / PostgreSQL", "Figma", "Vercel / Netlify"],
    miniProjects: ["Todo app with authentication", "Student result management system", "Weather dashboard using a public API", "Portfolio website with a blog"],
    majorProjects: ["Full-stack e-commerce app with payments", "College ERP module with role-based access", "Real-time chat application", "Inventory system with reporting dashboards"],
    careerPaths: ["Web development", "Software engineering", "Quality assurance", "Data & reporting", "IT support & administration", "Cloud support"],
    jobRoles: ["Software Developer", "Frontend Developer", "Backend Developer", "QA Engineer", "Support Engineer", "Junior Data Analyst"],
    govOpportunities: ["NIC Scientific Assistant", "SSC CGL (Assistant / Inspector posts)", "IBPS Specialist Officer (IT)", "State IT department recruitment", "UGC NET (Computer Science) for teaching"],
    higherStudies: ["MCA", "MSc Computer Science", "MS abroad with GRE + IELTS", "PG diploma in data science or cloud"],
    certifications: ["AWS Cloud Practitioner", "Microsoft Azure Fundamentals", "Meta Front-End Developer", "Oracle Database SQL"],
    industryTech: ["AI-assisted development", "Serverless web apps", "Progressive web apps", "Low-code platforms", "Edge deployment"],
    careerFocus: [
      cf("Web & Product Engineering", "Product companies hire BCA graduates who can ship deployed apps, not just coursework.", ["React", "Node / Django", "SQL", "Git"]),
      cf("Quality & Automation", "QA automation is a reliable entry point with strong growth into SDET roles.", ["Selenium / Playwright", "Test design", "Python", "CI basics"]),
      cf("Cloud & Support", "Managed service providers hire heavily for cloud support and administration.", ["Linux", "AWS/Azure basics", "Networking", "Ticketing tools"]),
      cf("Data & Reporting", "Analyst roles value SQL fluency plus a BI tool more than a specific degree.", ["SQL", "Excel", "Power BI", "Python"]),
    ],
  },
  mca: {
    subjects: ["Advanced Data Structures & Algorithms", "Advanced DBMS", "Distributed Systems", "Software Engineering & Testing", "Machine Learning", "Cloud Computing", "Computer Networks", "System Design"],
    technicalSkills: ["System design", "Backend engineering", "Containerisation", "Performance tuning", "Automated testing", "Data modelling"],
    programming: ["Java", "Python", "TypeScript", "SQL", "Go (optional)", "Bash"],
    tools: ["IntelliJ / VS Code", "Docker", "Kubernetes (basics)", "PostgreSQL & MongoDB", "GitHub Actions", "Grafana"],
    miniProjects: ["REST API with JWT auth and tests", "Caching layer benchmark", "CLI tool published to a package registry", "ML model exposed via an API"],
    majorProjects: ["Microservices application with CI/CD", "Distributed job scheduler", "Data pipeline with warehouse and dashboards", "SaaS product with multi-tenancy"],
    careerPaths: ["Backend engineering", "Data engineering", "Cloud & DevOps", "Machine learning engineering", "Solution architecture"],
    jobRoles: ["Software Engineer", "Backend Developer", "Data Engineer", "DevOps Engineer", "Systems Analyst", "Technical Consultant"],
    govOpportunities: ["NIC Scientist-B", "DRDO / ISRO computer science posts via GATE", "IBPS SO (IT Officer)", "UGC NET / JRF for academia", "State e-governance projects"],
    higherStudies: ["MTech / MS in Computer Science", "PhD in systems or ML", "Specialised cloud or security certifications"],
    certifications: ["AWS Solutions Architect Associate", "CKA (Kubernetes)", "Google Professional Data Engineer", "Oracle Java Professional"],
    industryTech: ["LLM-powered applications", "Event-driven architecture", "Platform engineering", "Vector databases", "Observability tooling"],
    careerFocus: [
      cf("Backend & System Design", "Product companies test system design early for MCA graduates; depth beats breadth here.", ["Java/Python", "Databases", "Caching", "API design"]),
      cf("Data Engineering", "Pipelines, warehouses and orchestration skills are in short supply across Indian tech.", ["SQL", "Airflow", "Spark", "Cloud warehouses"]),
      cf("Cloud & DevOps", "Platform teams hire for automation and reliability, not manual operations.", ["Docker", "Kubernetes", "Terraform", "CI/CD"]),
      cf("Applied ML", "ML engineering roles need software rigour plus modelling fundamentals.", ["PyTorch", "MLOps", "Feature engineering", "Deployment"]),
    ],
  },
  llb: {
    subjects: ["Constitutional Law", "Law of Contract", "Law of Torts", "Bharatiya Nyaya Sanhita (Criminal Law)", "Civil Procedure Code", "Bharatiya Nagarik Suraksha Sanhita", "Law of Evidence", "Family Law", "Property Law", "Company Law", "Labour Law", "Professional Ethics"],
    technicalSkills: ["Legal research", "Case-law analysis", "Drafting pleadings", "Contract review", "Statutory interpretation", "Courtroom advocacy"],
    programming: ["Legal database query syntax (SCC Online, Manupatra)", "Basic spreadsheet case tracking", "Document automation tools", "AI research tools used responsibly"],
    tools: ["SCC Online", "Manupatra", "Indian Kanoon", "Microsoft Word (styles & track changes)", "Casemine", "e-Courts services"],
    miniProjects: ["Case brief series on 10 landmark judgments", "Draft a legal notice and reply", "Compare two High Court positions on one issue", "Client counselling role-play transcript"],
    majorProjects: ["National moot court memorial (both sides)", "Empirical research paper on access to justice", "Full contract drafting and negotiation exercise", "Policy submission on a pending bill"],
    careerPaths: ["Litigation", "Corporate & transactional law", "Judicial services", "Policy & research", "Compliance & in-house", "Academia"],
    jobRoles: ["Advocate", "Law Firm Associate", "Legal Counsel", "Judicial Magistrate", "Legal Researcher", "Compliance Analyst"],
    govOpportunities: ["State Judicial Services (Civil Judge)", "UPSC Civil Services", "Assistant Public Prosecutor", "Law Officer in PSUs and banks", "Legal posts in NHRC / Law Commission"],
    higherStudies: ["LLM in India or abroad", "PhD in law", "Company Secretary (CS)", "Diploma in cyber law, IPR or taxation"],
    certifications: ["AIBE (mandatory to practise)", "Certificate in Arbitration", "Data Protection & Privacy certification", "Contract drafting certifications"],
    industryTech: ["Digital Personal Data Protection Act compliance", "AI regulation and liability", "e-Courts and virtual hearings", "Legal tech and contract automation", "Cross-border data and cyber law"],
    careerFocus: [
      cf("Litigation Practice", "Chamber work builds drafting and courtcraft fast. Start with a senior in your target court and read every brief you touch.", ["Drafting", "Procedure (CPC/BNSS)", "Oral advocacy", "Case management"]),
      cf("Corporate & Transactional", "Law firms recruit for contract precision, diligence stamina and commercial awareness.", ["Contract drafting", "Due diligence", "Company law", "Commercial reading"]),
      cf("Judicial Services", "Judgeship exams are subject-heavy and time-bound; disciplined bare-act revision decides results.", ["Bare acts", "Answer writing", "Local language paper", "Current judgments"]),
      cf("Policy & Compliance", "Regulators, think tanks and corporates hire for data protection, ESG and sectoral compliance.", ["Regulatory research", "Policy writing", "DPDP Act", "Risk assessment"]),
    ],
  },
  "ba-llb": {
    subjects: ["Political Science", "Sociology", "Economics", "Constitutional Law", "Law of Contract", "Criminal Law", "Procedure Codes", "Law of Evidence", "International Law", "Environmental Law", "Intellectual Property Law", "Legal Writing"],
    technicalSkills: ["Legal research", "Policy analysis", "Moot advocacy", "Legal drafting", "Comparative law study", "Client counselling"],
    programming: ["Legal database search", "Data tools for empirical legal research", "Citation management", "Document automation"],
    tools: ["SCC Online", "Indian Kanoon", "Zotero", "Google Scholar", "Microsoft Word", "Canva (for policy briefs)"],
    miniProjects: ["Op-ed on a current legal controversy", "Case comment on a recent Supreme Court judgment", "Survey-based study on legal awareness", "Mock client interview and advice note"],
    majorProjects: ["International moot competition memorial", "Comparative constitutional law dissertation", "Legal-aid clinic project with field data", "Draft model legislation with explanatory notes"],
    careerPaths: ["Law firms", "Litigation", "Public policy", "International law & organisations", "Academia", "Judicial services"],
    jobRoles: ["Law Firm Associate", "Policy Analyst", "Litigation Associate", "Legal Consultant", "Research Fellow", "Judicial Officer"],
    govOpportunities: ["State Judicial Services", "UPSC Civil Services", "Legal officer posts in ministries", "Public prosecutor roles", "Positions in statutory commissions"],
    higherStudies: ["LLM abroad (LSAT/GRE + IELTS)", "Masters in public policy", "PhD in law or political science", "Specialised diplomas"],
    certifications: ["AIBE", "International arbitration certificates", "Human rights law certificates", "IPR certifications"],
    industryTech: ["AI governance", "Platform regulation", "Climate litigation", "Digital privacy", "Online dispute resolution"],
    careerFocus: [
      cf("Law Firms", "Tier-1 firms recruit from moots, internships and consistent academics. Build a paper trail of drafts.", ["Contract drafting", "Diligence", "Research", "Commercial awareness"]),
      cf("Public Policy", "Think tanks and regulators value writing clarity and evidence-backed argument.", ["Policy writing", "Empirical methods", "Regulatory analysis", "Stakeholder mapping"]),
      cf("International Law", "UN bodies, arbitration and trade practice reward language skills and specialised coursework.", ["Public international law", "Arbitration", "Academic writing", "Languages"]),
      cf("Judiciary", "Judicial services remain the most respected route; start structured prep by the fourth year.", ["Bare acts", "Answer writing", "Procedure", "Speed revision"]),
    ],
  },
  "forensic-science": {
    subjects: ["Introduction to Forensic Science", "Criminology & Criminal Law", "Forensic Chemistry", "Forensic Biology & Serology", "DNA Fingerprinting", "Toxicology", "Questioned Documents", "Fingerprint Science", "Ballistics", "Digital & Cyber Forensics", "Forensic Instrumentation", "Crime Scene Management"],
    technicalSkills: ["Evidence collection & preservation", "Chain of custody documentation", "Microscopy", "Chromatography & spectroscopy", "DNA extraction and PCR", "Expert report writing"],
    programming: ["Excel / statistical analysis of results", "Python for data handling (optional)", "Forensic imaging tool scripting", "Database search of records"],
    tools: ["Comparison microscope", "GC-MS and FTIR", "PCR thermal cycler", "UV / ALS light sources", "Autopsy & FTK Imager (digital forensics)", "AFIS-style fingerprint software"],
    miniProjects: ["Latent fingerprint development powder comparison", "Ink chromatography on questioned documents", "Blood-spatter pattern interpretation exercise", "Hair and fibre microscopic comparison"],
    majorProjects: ["Simulated crime-scene investigation with full report", "DNA profiling workflow on mock samples", "Toxicological screening of simulated samples", "Digital forensic recovery and timeline reconstruction"],
    careerPaths: ["Government forensic laboratories", "Police & investigation agencies", "Private forensic consultancy", "Cyber forensics", "Academia & research", "Insurance and corporate fraud investigation"],
    jobRoles: ["Forensic Scientist", "Scientific Assistant (FSL)", "Crime Scene Investigator", "Toxicologist", "Cyber Forensic Analyst", "Document Examiner"],
    govOpportunities: ["CFSL (Central Forensic Science Laboratory) via SSC / UPSC", "State FSL Scientific Officer / Assistant", "NIA & CBI forensic units", "Police department scientific posts", "DRDO / NCRB research roles"],
    higherStudies: ["MSc Forensic Science", "PhD in forensic or analytical chemistry", "MSc Cyber Forensics", "Specialised DNA or toxicology courses"],
    certifications: ["Certified Forensic Computer Examiner", "Crime scene investigation certificates", "Analytical instrumentation training", "Quality systems (ISO 17025) awareness"],
    industryTech: ["Rapid DNA analysis", "AI-assisted image and face comparison", "Digital device and cloud forensics", "Forensic genealogy", "Portable field spectroscopy"],
    careerFocus: [
      cf("Government Forensic Labs", "CFSL and state FSLs are the largest recruiters; recruitment is exam-based with a strong science syllabus.", ["Core forensic subjects", "Instrumentation", "Report writing", "Exam preparation"]),
      cf("Cyber Forensics", "Device and cloud investigations are the fastest growing area, and demand outstrips supply.", ["Disk imaging", "Mobile forensics", "Networking", "Chain of custody"]),
      cf("DNA & Biology", "DNA units need clean lab technique and absolute documentation discipline.", ["PCR", "STR analysis", "Contamination control", "Statistics"]),
      cf("Expert Testimony", "Casework is only as strong as its courtroom presentation; practise clear, non-technical explanation.", ["Report writing", "Cross-examination practice", "Legal procedure", "Ethics"]),
    ],
  },
  "ai-ml": {
    subjects: ["Linear Algebra & Probability", "Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision", "Optimisation", "Data Engineering Basics", "MLOps"],
    technicalSkills: ["Model training & evaluation", "Feature engineering", "Deep learning architectures", "Prompt engineering & RAG", "Experiment tracking", "Model deployment"],
    programming: ["Python", "SQL", "PyTorch", "NumPy / Pandas", "Bash", "TypeScript (for app layers)"],
    tools: ["PyTorch", "scikit-learn", "Hugging Face", "Weights & Biases", "Docker", "Vector databases"],
    miniProjects: ["Spam classifier with proper validation", "Sentiment analysis on real reviews", "Image classifier with transfer learning", "RAG chatbot over your own notes"],
    majorProjects: ["End-to-end ML service with monitoring", "Fine-tuned domain LLM with evaluation suite", "Computer-vision quality inspection prototype", "Recommendation engine with A/B testing plan"],
    careerPaths: ["Machine learning engineering", "Data science", "Applied research", "MLOps", "AI product engineering"],
    jobRoles: ["ML Engineer", "Data Scientist", "AI Engineer", "Research Assistant", "MLOps Engineer", "Applied Scientist"],
    govOpportunities: ["ISRO / DRDO AI research posts", "NIC and IndiaAI mission projects", "CSIR labs", "UGC NET for teaching", "Defence analytics roles"],
    higherStudies: ["MTech / MS in AI or Data Science", "PhD in machine learning", "Specialised LLM and MLOps programmes"],
    certifications: ["DeepLearning.AI specialisations", "Google Professional ML Engineer", "AWS Machine Learning Specialty", "Hugging Face NLP course"],
    industryTech: ["Large language models and agents", "Retrieval-augmented generation", "Model evaluation and safety", "Edge and on-device inference", "Synthetic data"],
    careerFocus: [
      cf("Applied ML Engineering", "Companies hire for deployed models, not notebooks. Show serving, monitoring and cost awareness.", ["PyTorch", "APIs", "Docker", "Monitoring"]),
      cf("LLM & GenAI Products", "RAG, evaluation and guardrails are the most in-demand practical skills right now.", ["Prompt design", "Vector search", "Evaluation", "Latency/cost tuning"]),
      cf("Data Science", "Business-facing DS roles need statistics and communication as much as modelling.", ["Statistics", "SQL", "Experimentation", "Storytelling"]),
      cf("Research", "Labs and research groups look for reproducible work and paper-reading depth.", ["Maths foundations", "Paper reproduction", "Writing", "Experiment rigour"]),
    ],
  },
  "data-science": {
    subjects: ["Statistics & Probability", "Data Wrangling", "Machine Learning", "Data Visualisation", "Experiment Design", "Databases & SQL", "Business Analytics", "Big Data Basics"],
    technicalSkills: ["SQL querying", "EDA", "Statistical inference", "Dashboard design", "A/B testing", "ETL"],
    programming: ["SQL", "Python", "R (optional)", "DAX (Power BI)", "Bash"],
    tools: ["PostgreSQL", "Pandas", "Power BI / Tableau", "dbt", "Airflow", "Jupyter"],
    miniProjects: ["Cleaning and profiling a messy public dataset", "Cohort retention analysis", "Sales dashboard with drilldowns", "A/B test result write-up"],
    majorProjects: ["Warehouse + dbt models + BI dashboard", "Churn prediction with business recommendations", "Forecasting model for demand planning", "Automated reporting pipeline"],
    careerPaths: ["Business analytics", "Data science", "Data engineering", "Product analytics", "Consulting"],
    jobRoles: ["Data Analyst", "Data Scientist", "BI Developer", "Product Analyst", "Data Engineer"],
    govOpportunities: ["NITI Aayog / ministry data cells", "RBI and SEBI research roles", "NSSO / MoSPI statistical posts", "UGC NET for academia", "IndiaAI mission projects"],
    higherStudies: ["MSc Data Science", "MS abroad in analytics", "PG diploma in business analytics", "PhD in statistics"],
    certifications: ["Google Data Analytics Certificate", "Microsoft Power BI Data Analyst", "Databricks Data Engineer Associate", "SQL certifications"],
    industryTech: ["Modern data stack", "Real-time analytics", "AI-assisted analysis", "Data contracts and governance", "Self-serve BI"],
    careerFocus: [
      cf("Product & Business Analytics", "Analyst interviews are SQL-heavy plus a business case. Practise both weekly.", ["SQL", "Metrics design", "Experimentation", "Communication"]),
      cf("Data Engineering", "Pipelines and warehouse modelling scale your value beyond dashboards.", ["dbt", "Airflow", "Cloud warehouse", "Python"]),
      cf("Applied Modelling", "Forecasting and churn models are the most common production use cases.", ["scikit-learn", "Time series", "Validation", "Deployment"]),
      cf("Consulting & Research", "Client-facing analytics rewards structured writing and clean visuals.", ["Storytelling", "Slide craft", "Statistics", "Domain reading"]),
    ],
  },
  devops: {
    subjects: ["Linux Administration", "Networking", "Version Control & Branching", "Containers", "CI/CD", "Infrastructure as Code", "Observability", "Cloud Platforms", "DevSecOps"],
    technicalSkills: ["Pipeline design", "Container orchestration", "Infrastructure automation", "Monitoring & alerting", "Incident response", "Secrets management"],
    programming: ["Bash", "Python", "Go (optional)", "YAML (heavy use)", "HCL (Terraform)"],
    tools: ["Docker", "Kubernetes", "Terraform", "GitHub Actions", "Prometheus & Grafana", "ArgoCD"],
    miniProjects: ["Dockerise an app and publish the image", "GitHub Actions pipeline with tests and linting", "Terraform a VPC and a VM", "Grafana dashboard for a sample service"],
    majorProjects: ["Full GitOps deployment to Kubernetes", "Blue-green deployment with automated rollback", "Multi-environment IaC with remote state", "Observability stack with SLOs and alerts"],
    careerPaths: ["DevOps engineering", "Site reliability engineering", "Platform engineering", "Cloud infrastructure", "DevSecOps"],
    jobRoles: ["DevOps Engineer", "SRE", "Platform Engineer", "Cloud Engineer", "Release Engineer"],
    govOpportunities: ["NIC infrastructure teams", "PSU digital transformation projects", "Defence IT infrastructure roles", "State e-governance cloud teams"],
    higherStudies: ["MTech in cloud computing", "Advanced cloud architecture programmes", "Security specialisations"],
    certifications: ["AWS Solutions Architect Associate", "CKA / CKAD", "HashiCorp Terraform Associate", "Azure DevOps Engineer Expert"],
    industryTech: ["Platform engineering and internal developer portals", "GitOps", "eBPF observability", "FinOps", "Supply-chain security (SBOM)"],
    careerFocus: [
      cf("CI/CD & Automation", "Interviewers ask you to describe a pipeline you built end to end — have one you can draw.", ["GitHub Actions", "Testing gates", "Artifact management", "Scripting"]),
      cf("Kubernetes & Platforms", "Container orchestration is the core skill separating juniors from mid-level engineers.", ["Kubernetes", "Helm", "Networking", "Troubleshooting"]),
      cf("Reliability Engineering", "SRE roles want error budgets, SLOs and calm incident handling.", ["Monitoring", "Alerting", "Postmortems", "Capacity planning"]),
      cf("DevSecOps", "Security scanning and secrets hygiene are now part of every pipeline.", ["SAST/DAST", "Secrets management", "IAM", "Policy as code"]),
    ],
  },
  "cloud-computing": {
    subjects: ["Cloud Fundamentals", "Networking", "Compute & Storage Services", "Identity & Access Management", "Serverless Architecture", "Cloud Security", "Cost Management", "High Availability & DR"],
    technicalSkills: ["Cloud architecture design", "IAM policy design", "Networking (VPC, DNS, load balancing)", "Serverless development", "Cost optimisation", "Migration planning"],
    programming: ["Python", "Bash", "HCL (Terraform)", "YAML / JSON", "SQL"],
    tools: ["AWS / Azure / GCP consoles", "Terraform", "CloudFormation / Bicep", "CloudWatch / Azure Monitor", "Docker", "Cost explorer tooling"],
    miniProjects: ["Static site on object storage with CDN", "Serverless API with a managed database", "Auto-scaling group behind a load balancer", "IAM policy audit of a sample account"],
    majorProjects: ["Highly available three-tier application", "Serverless data-processing pipeline", "Hybrid migration plan for a legacy app", "Disaster recovery design with tested failover"],
    careerPaths: ["Cloud engineering", "Solution architecture", "Cloud security", "Infrastructure operations", "FinOps"],
    jobRoles: ["Cloud Engineer", "Solutions Architect", "Cloud Security Analyst", "Infrastructure Engineer", "FinOps Analyst"],
    govOpportunities: ["MeghRaj (GI Cloud) projects", "NIC cloud teams", "PSU cloud migration programmes", "Defence and space cloud infrastructure roles"],
    higherStudies: ["MTech / MS in cloud or distributed systems", "Professional-level cloud certifications", "Security masters programmes"],
    certifications: ["AWS Solutions Architect (Associate → Professional)", "Azure Administrator AZ-104", "Google Associate Cloud Engineer", "CCSP (security)"],
    industryTech: ["Multi-cloud and sovereign cloud", "Serverless-first architecture", "Confidential computing", "AI workloads on cloud GPUs", "FinOps automation"],
    careerFocus: [
      cf("Cloud Engineering", "Hands-on console plus IaC experience beats certification alone — build in a free tier.", ["Core services", "Terraform", "Networking", "Linux"]),
      cf("Solution Architecture", "Architects are hired to justify trade-offs: cost, availability, latency and security.", ["Well-architected framework", "Diagramming", "Cost modelling", "Communication"]),
      cf("Cloud Security", "IAM misconfiguration is the top real-world risk; specialise here for fast growth.", ["IAM", "Encryption", "Compliance", "Threat modelling"]),
      cf("Migration & FinOps", "Enterprises pay for people who can move workloads and then cut the bill.", ["Assessment tooling", "Cost analysis", "Rightsizing", "Reporting"]),
    ],
  },
};
