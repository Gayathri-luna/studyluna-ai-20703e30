import { extraBranches } from "./fieldPrograms";
import { healthBranches } from "./healthPrograms";

export interface Branch {
  slug: string;
  name: string;
  short: string;
  tagline: string;
  /** Field(s) of study this branch belongs to. Defaults to ["engineering"]. */
  fields?: string[];
  phases: { title: string; items: string[] }[];
  coreSkills: string[];
  projectIdeas: string[];
  careers: string[];
}

const engineeringBranches: Branch[] = [

  {
    slug: "ece",
    name: "Electronics & Communication",
    short: "ECE",
    tagline: "Chips, signals, embedded systems and wireless communication.",
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: [
          "Basic electronics: resistors, capacitors, diodes, transistors",
          "Digital logic and number systems",
          "C programming and problem solving",
          "Circuit simulation in LTspice or Multisim",
        ],
      },
      {
        title: "Phase 2 — Core subjects",
        items: [
          "Signals & systems, analog and digital communication",
          "Microcontrollers (8051, AVR, ARM Cortex-M)",
          "Verilog / VHDL basics with FPGA boards",
          "MATLAB for signal processing",
        ],
      },
      {
        title: "Phase 3 — Specialise",
        items: [
          "Pick one: VLSI, Embedded, RF, DSP, or IoT",
          "Build 2 domain projects end to end",
          "Learn industry tools (Cadence, Vivado, Keil, ADS)",
        ],
      },
      {
        title: "Phase 4 — Job ready",
        items: [
          "Aptitude + core interview preparation",
          "GATE or PSU exam prep if targeting government roles",
          "Portfolio, resume and LinkedIn polish",
        ],
      },
    ],
    coreSkills: ["Verilog", "Embedded C", "MATLAB", "PCB Design", "DSP", "RF"],
    projectIdeas: [
      "IoT weather monitoring station",
      "FPGA-based traffic light controller",
      "Smart energy meter",
    ],
    careers: ["VLSI Design Engineer", "Embedded Engineer", "RF Engineer", "ISRO / DRDO Scientist"],
  },
  {
    slug: "cse",
    name: "Computer Science Engineering",
    short: "CSE",
    tagline: "Software, algorithms, systems and AI.",
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: [
          "One language deeply: Python, C++ or Java",
          "Data structures and algorithms",
          "Git & GitHub, Linux command line",
          "Basic web: HTML, CSS, JavaScript",
        ],
      },
      {
        title: "Phase 2 — Core subjects",
        items: [
          "Operating systems, DBMS, computer networks",
          "SQL and database design",
          "OOP and system design fundamentals",
          "Build 3 full projects with a real backend",
        ],
      },
      {
        title: "Phase 3 — Specialise",
        items: [
          "Pick one: full-stack, AI/ML, cloud & DevOps, or cybersecurity",
          "Contribute to open source",
          "Learn Docker and one cloud provider",
        ],
      },
      {
        title: "Phase 4 — Job ready",
        items: [
          "300+ DSA problems and mock interviews",
          "System design basics for entry level",
          "Portfolio site + strong GitHub README's",
        ],
      },
    ],
    coreSkills: ["DSA", "Python", "SQL", "Git", "Linux", "Cloud"],
    projectIdeas: ["Full-stack task manager", "AI chat assistant", "URL shortener with analytics"],
    careers: ["Software Engineer", "Data Engineer", "ML Engineer", "DevOps Engineer"],
  },
  {
    slug: "it",
    name: "Information Technology",
    short: "IT",
    tagline: "Applications, data, networks and cloud infrastructure.",
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Programming in Python or Java", "Web fundamentals", "Databases and SQL", "Networking basics"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: ["Software engineering & testing", "Cloud fundamentals (AWS/Azure)", "APIs and integration", "Cybersecurity basics"],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Pick one: cloud, data analytics, QA automation, or security", "Earn one entry-level certification", "Two deployed projects"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["Aptitude + coding rounds", "Resume with measurable impact", "Internship or freelance experience"],
      },
    ],
    coreSkills: ["Python", "SQL", "Cloud", "Networking", "Automation"],
    projectIdeas: ["Cloud-deployed inventory app", "Log analytics dashboard", "CI/CD pipeline demo"],
    careers: ["Cloud Engineer", "Data Analyst", "QA Automation Engineer", "IT Support Specialist"],
  },
  {
    slug: "eee",
    name: "Electrical & Electronics",
    short: "EEE",
    tagline: "Power systems, machines, drives and renewable energy.",
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Circuit theory and network analysis", "Electrical machines basics", "Measurement instruments", "MATLAB basics"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: ["Power systems and protection", "Power electronics and drives", "Control systems", "PLC & SCADA"],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Pick one: power systems, renewables, EV, or automation", "Simulation in MATLAB/Simulink or ETAP", "Two hardware projects"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["GATE / PSU preparation", "Site and safety knowledge", "Interview prep on core subjects"],
      },
    ],
    coreSkills: ["MATLAB", "PLC", "Power Electronics", "ETAP", "Control Systems"],
    projectIdeas: ["Solar MPPT charge controller", "Automatic power factor correction", "EV battery management"],
    careers: ["Power Systems Engineer", "EV Engineer", "Automation Engineer", "PSU Executive"],
  },
  {
    slug: "mechanical",
    name: "Mechanical Engineering",
    short: "Mechanical",
    tagline: "Design, manufacturing, thermal systems and robotics.",
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Engineering drawing and GD&T", "Thermodynamics and mechanics", "Materials science", "AutoCAD basics"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: ["Machine design", "Fluid mechanics and heat transfer", "Manufacturing processes", "SolidWorks / CATIA"],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Pick one: design, CFD/FEA, manufacturing, or robotics", "ANSYS simulation projects", "Build a physical prototype"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["GATE / PSU preparation", "Portfolio of CAD models and analysis reports", "Core interview preparation"],
      },
    ],
    coreSkills: ["SolidWorks", "ANSYS", "AutoCAD", "GD&T", "CFD"],
    projectIdeas: ["Go-kart chassis design", "Heat exchanger analysis", "Pick-and-place robotic arm"],
    careers: ["Design Engineer", "CAE Analyst", "Production Engineer", "Automotive Engineer"],
  },
  {
    slug: "civil",
    name: "Civil Engineering",
    short: "Civil",
    tagline: "Structures, construction, transport and water systems.",
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Engineering mechanics", "Building materials", "Surveying", "AutoCAD drafting"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: ["Structural analysis and RCC design", "Geotechnical engineering", "Transportation engineering", "STAAD.Pro / ETABS"],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Pick one: structures, construction management, transport, or environment", "Learn BIM (Revit)", "Site internship"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["GATE / SSC JE preparation", "Estimation and costing practice", "Portfolio of drawings and reports"],
      },
    ],
    coreSkills: ["AutoCAD", "STAAD.Pro", "Revit", "Estimation", "Surveying"],
    projectIdeas: ["Multi-storey building design", "Smart traffic study", "Rainwater harvesting plan"],
    careers: ["Structural Engineer", "Site Engineer", "Transport Planner", "SSC JE / Railways"],
  },
  {
    slug: "chemical",
    name: "Chemical Engineering",
    short: "Chemical",
    tagline: "Process design, reactions, safety and plant operations.",
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Mass and energy balances", "Chemistry fundamentals", "Fluid flow", "Excel for process calculations"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: ["Heat and mass transfer", "Reaction engineering", "Process control", "Aspen Plus / DWSIM"],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Pick one: petrochemicals, pharma, energy, or environment", "Process safety (HAZOP)", "Simulation projects"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["GATE / PSU preparation", "Plant internship", "Technical interview practice"],
      },
    ],
    coreSkills: ["Aspen Plus", "Process Control", "HAZOP", "Thermodynamics"],
    projectIdeas: ["Distillation column simulation", "Biodiesel production study", "Effluent treatment design"],
    careers: ["Process Engineer", "Production Engineer", "Safety Engineer", "PSU Executive"],
  },
  {
    slug: "biotechnology",
    name: "Biotechnology",
    short: "Biotech",
    tagline: "Bioprocesses, genetics, bioinformatics and healthcare tech.",
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Cell and molecular biology", "Biochemistry", "Lab techniques and safety", "Basic statistics"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: ["Genetic engineering", "Bioprocess engineering", "Immunology and microbiology", "Bioinformatics with Python/R"],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Pick one: pharma, bioinformatics, agri-biotech, or medical devices", "Lab or research internship", "Publish or present a study"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["GATE BT / CSIR preparation", "Research portfolio", "Industry interview practice"],
      },
    ],
    coreSkills: ["PCR", "Bioinformatics", "Python", "Bioprocess", "Lab Techniques"],
    projectIdeas: ["Gene sequence analysis pipeline", "Bioplastic from waste", "Enzyme activity optimisation"],
    careers: ["Research Associate", "Bioprocess Engineer", "Bioinformatician", "QC Analyst"],
  },
  {
    slug: "aerospace",
    name: "Aerospace Engineering",
    short: "Aerospace",
    tagline: "Aerodynamics, propulsion, structures and space systems.",
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Engineering mechanics and materials", "Basic aerodynamics", "Thermodynamics", "MATLAB basics"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: ["Flight mechanics", "Propulsion systems", "Aerospace structures", "CFD with ANSYS Fluent"],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Pick one: aerodynamics, propulsion, avionics, or space systems", "Build a UAV or rocket model", "CubeSat or drone team"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["ISRO / DRDO exam preparation", "GATE AE preparation", "Technical portfolio of simulations"],
      },
    ],
    coreSkills: ["CFD", "CATIA", "MATLAB", "Propulsion", "Avionics"],
    projectIdeas: ["Fixed-wing UAV design", "Airfoil CFD analysis", "Model rocket telemetry"],
    careers: ["Aerospace Design Engineer", "CFD Analyst", "ISRO Scientist", "Avionics Engineer"],
  },
  {
    slug: "ai-ds",
    name: "AI & Data Science",
    short: "AI & DS",
    tagline: "Machine learning, data engineering and applied AI.",
    fields: ["engineering", "emerging-tech"],

    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Python and NumPy/Pandas", "Statistics and probability", "Linear algebra basics", "SQL"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: ["Machine learning algorithms", "Data visualisation", "Deep learning with PyTorch", "Model evaluation and MLOps basics"],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Pick one: NLP/LLMs, computer vision, data engineering, or analytics", "Kaggle competitions", "Deploy 2 models as apps"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["Case-study interview practice", "Portfolio with notebooks and dashboards", "DSA basics for coding rounds"],
      },
    ],
    coreSkills: ["Python", "Machine Learning", "PyTorch", "SQL", "Statistics"],
    projectIdeas: ["LLM-powered study assistant", "Image classification web app", "Sales forecasting dashboard"],
    careers: ["Data Scientist", "ML Engineer", "Data Analyst", "AI Researcher"],
  },
  {
    slug: "cyber-security",
    name: "Cyber Security",
    short: "Cyber Sec",
    tagline: "Securing networks, applications, cloud and data against attacks.",
    fields: ["engineering", "emerging-tech"],

    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Networking (TCP/IP, DNS, HTTP)", "Linux and Windows internals", "Python or Bash scripting", "Security fundamentals: CIA triad, threat models"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: ["Cryptography basics", "Web application security (OWASP Top 10)", "Network security and firewalls", "Operating system and endpoint hardening"],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Pick one: offensive security, SOC/blue team, cloud security, or forensics", "Practise on TryHackMe / HackTheBox labs", "Learn SIEM tooling and incident response"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["Entry certification (CompTIA Security+, CEH or eJPT)", "Write-ups and a public lab portfolio", "Interview prep on networking + scenarios"],
      },
    ],
    coreSkills: ["Networking", "Linux", "Python", "OWASP", "SIEM", "Cryptography"],
    projectIdeas: ["Home SOC with ELK stack", "Vulnerable web app + pentest report", "Automated phishing detector"],
    careers: ["Security Analyst", "Penetration Tester", "SOC Analyst", "Cloud Security Engineer"],
  },
  {
    slug: "robotics",
    name: "Robotics & Automation",
    short: "Robotics",
    tagline: "Robots, motion control, industrial automation and perception.",
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Basic electronics and sensors", "C/C++ and Python", "Engineering mechanics and kinematics", "Arduino / Raspberry Pi prototyping"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: ["Control systems and PID tuning", "Robot kinematics and dynamics", "ROS 2 fundamentals", "PLC, SCADA and industrial automation"],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Pick one: industrial automation, mobile robots, robotic vision, or drones", "Simulation in Gazebo or CoppeliaSim", "Build two working robots"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["Portfolio videos of working robots", "GATE / core interview preparation", "Learn one industrial robot brand (ABB, FANUC, KUKA)"],
      },
    ],
    coreSkills: ["ROS", "C++", "Python", "PLC", "Control Systems", "Computer Vision"],
    projectIdeas: ["Line-following and obstacle-avoiding robot", "6-DOF robotic arm with inverse kinematics", "Autonomous warehouse bot in ROS"],
    careers: ["Robotics Engineer", "Automation Engineer", "Controls Engineer", "Field Application Engineer"],
  },
  {
    slug: "mechatronics",
    name: "Mechatronics Engineering",
    short: "Mechatronics",
    tagline: "Where mechanical design, electronics, control and software meet.",
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Engineering mechanics and materials", "Basic electronics and circuits", "C programming and microcontrollers", "CAD with SolidWorks"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: ["Sensors and actuators", "Control systems", "Hydraulics and pneumatics", "Embedded systems and PLC programming"],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Pick one: automation, automotive mechatronics, medical devices, or robotics", "System-level simulation in MATLAB/Simulink", "Design and build one integrated machine"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["GATE / PSU preparation", "Portfolio of CAD + firmware + control work", "Industry internship on a shop floor"],
      },
    ],
    coreSkills: ["SolidWorks", "Embedded C", "PLC", "Simulink", "Sensors", "Pneumatics"],
    projectIdeas: ["Automated sorting conveyor", "Self-balancing robot", "CNC pen plotter"],
    careers: ["Mechatronics Engineer", "Automation Engineer", "Product Design Engineer", "Maintenance Engineer"],
  },
  {
    slug: "environmental",
    name: "Environmental Engineering",
    short: "Environmental",
    tagline: "Water, air, waste, climate and sustainable infrastructure.",
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Environmental chemistry and microbiology", "Fluid mechanics", "Ecology and pollution basics", "Excel and basic statistics"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: ["Water and wastewater treatment", "Air pollution control", "Solid and hazardous waste management", "Environmental impact assessment (EIA)"],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Pick one: water treatment, air quality, waste management, or climate & ESG", "Learn GIS (QGIS/ArcGIS) and modelling tools", "Field or plant internship"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["GATE (Civil/Environmental) preparation", "Regulatory knowledge: CPCB/SPCB norms", "Report-writing and audit practice"],
      },
    ],
    coreSkills: ["Water Treatment", "GIS", "EIA", "Air Quality Modelling", "Waste Management"],
    projectIdeas: ["Low-cost greywater treatment unit", "Air quality monitoring network", "Campus waste audit and plan"],
    careers: ["Environmental Engineer", "EHS Officer", "Sustainability Analyst", "Pollution Control Board Engineer"],
  },
  {
    slug: "food-technology",
    name: "Food Technology",
    short: "Food Tech",
    tagline: "Food processing, preservation, safety and product development.",
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Food chemistry and biochemistry", "Food microbiology", "Unit operations basics", "Lab hygiene and safety"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: ["Food processing and preservation", "Food packaging technology", "Quality control and sensory evaluation", "Food safety standards (FSSAI, HACCP, ISO 22000)"],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Pick one: product development, quality assurance, dairy, or beverages", "Plant internship in a processing unit", "Develop and test one new product"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["FSSAI / HACCP certification", "GATE (Food Technology / XL) if going for PG", "Portfolio of product and QA reports"],
      },
    ],
    coreSkills: ["HACCP", "Food Microbiology", "Processing", "Quality Control", "Packaging"],
    projectIdeas: ["Shelf-life study of a bakery product", "Millet-based health snack development", "Low-cost solar food dryer"],
    careers: ["Food Technologist", "Quality Assurance Officer", "Product Development Executive", "FSSAI / FCI Officer"],
  },
  {
    slug: "agricultural",
    name: "Agricultural Engineering",
    short: "Agri Engg",
    tagline: "Farm machinery, irrigation, soil, post-harvest and agri-tech.",
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Soil science and crop basics", "Engineering mechanics and thermodynamics", "Surveying", "AutoCAD basics"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: ["Farm machinery and power", "Irrigation and drainage engineering", "Soil and water conservation", "Post-harvest and food process engineering"],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Pick one: farm machinery, irrigation, agri-tech/precision farming, or post-harvest", "Learn GIS and remote sensing", "Field project with a farm or FPO"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["ICAR / GATE (AG) preparation", "Government scheme and subsidy knowledge", "Portfolio of field studies and designs"],
      },
    ],
    coreSkills: ["Farm Machinery", "Irrigation Design", "GIS", "Remote Sensing", "AutoCAD"],
    projectIdeas: ["Sensor-based drip irrigation controller", "Low-cost multi-crop thresher", "Drone-based crop health survey"],
    careers: ["Agricultural Engineer", "Irrigation Engineer", "Agri-Tech Product Engineer", "ICAR / NABARD Officer"],
  },
  {
    slug: "mining",
    name: "Mining Engineering",
    short: "Mining",
    tagline: "Extraction, mine planning, safety and mineral processing.",
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Geology and mineralogy", "Engineering mechanics", "Surveying", "Mine terminology and safety basics"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: ["Surface and underground mining methods", "Rock mechanics and ground control", "Drilling, blasting and mine ventilation", "Mineral processing"],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Pick one: mine planning, geotechnics, mineral processing, or mine safety", "Learn Surpac / Datamine / MineSched", "Mine site internship"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["GATE (MN) and PSU preparation (Coal India, NMDC)", "DGMS statutory knowledge", "Site reports and survey portfolio"],
      },
    ],
    coreSkills: ["Mine Planning", "Rock Mechanics", "Surpac", "Blasting", "Mine Safety"],
    projectIdeas: ["Open-pit mine design in Surpac", "Ventilation network simulation", "Slope stability analysis of a bench"],
    careers: ["Mining Engineer", "Mine Planner", "Geotechnical Engineer", "Coal India / NMDC Executive"],
  },
  {
    slug: "petroleum",
    name: "Petroleum Engineering",
    short: "Petroleum",
    tagline: "Drilling, reservoirs, production and energy transition.",
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Petroleum geology", "Fluid mechanics and thermodynamics", "Mathematics for reservoir problems", "Excel / Python for calculations"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: ["Drilling engineering", "Reservoir engineering", "Production and well completion", "Petroleum refining basics"],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Pick one: drilling, reservoir simulation, production, or energy transition", "Learn Eclipse / CMG / PIPESIM", "Rig or refinery internship"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["GATE (PE) and PSU preparation (ONGC, OIL, IOCL)", "HSE and well-control fundamentals", "Simulation case-study portfolio"],
      },
    ],
    coreSkills: ["Reservoir Simulation", "Drilling", "PIPESIM", "Thermodynamics", "HSE"],
    projectIdeas: ["Decline curve analysis of a well", "Drilling fluid property study", "CO2 storage feasibility study"],
    careers: ["Drilling Engineer", "Reservoir Engineer", "Production Engineer", "ONGC / OIL Executive"],
  },
];

export const branches: Branch[] = [...engineeringBranches, ...extraBranches, ...healthBranches];

export const branchFields = (b: Branch): string[] => b.fields ?? ["engineering"];

export const branchesByField = (field: string): Branch[] =>
  field === "all" ? branches : branches.filter((b) => branchFields(b).includes(field));

export const branchBySlug = (slug: string) => branches.find((b) => b.slug === slug);

