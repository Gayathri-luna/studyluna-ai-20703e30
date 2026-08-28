export interface SubjectResource {
  label: string;
  href: string;
  type: "Notes/PDF" | "Video" | "Book" | "Practice";
  note: string;
}

export interface Subject {
  slug: string;
  name: string;
  branches: string[];
  semester: string;
  blurb: string;
  topics: string[];
  resources: SubjectResource[];
}

const NPTEL = (q: string) => `https://nptel.ac.in/courses?search=${encodeURIComponent(q)}`;
const OCW = (q: string) => `https://ocw.mit.edu/search/?q=${encodeURIComponent(q)}`;
const YT = (q: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;

export const subjects: Subject[] = [
  {
    slug: "engineering-mathematics",
    name: "Engineering Mathematics",
    branches: ["Core (All Branches)"],
    semester: "Sem 1–4",
    blurb: "Calculus, linear algebra, differential equations and probability — the language every branch runs on.",
    topics: ["Matrices & eigenvalues", "Multivariable calculus", "ODE & PDE", "Laplace & Fourier", "Probability"],
    resources: [
      { label: "NPTEL Engineering Mathematics courses", href: NPTEL("engineering mathematics"), type: "Notes/PDF", note: "Lecture PDFs + assignments from IIT faculty" },
      { label: "MIT OCW 18.06 Linear Algebra", href: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", type: "Notes/PDF", note: "Strang's full notes, problem sets and exams" },
      { label: "Paul's Online Math Notes", href: "https://tutorial.math.lamar.edu/", type: "Notes/PDF", note: "Printable calculus & differential equations notes" },
      { label: "3Blue1Brown — Essence of Linear Algebra", href: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", type: "Video", note: "Visual intuition before the formulas" },
    ],
  },
  {
    slug: "engineering-physics",
    name: "Engineering Physics",
    branches: ["Core (All Branches)"],
    semester: "Sem 1–2",
    blurb: "Waves, optics, quantum basics and solid state — the physics behind devices.",
    topics: ["Oscillations & waves", "Interference & diffraction", "Lasers & fibre optics", "Quantum mechanics basics", "Semiconductor physics"],
    resources: [
      { label: "NPTEL Engineering Physics", href: NPTEL("engineering physics"), type: "Notes/PDF", note: "Course PDFs and transcripts" },
      { label: "MIT OCW 8.02 Electricity & Magnetism", href: "https://ocw.mit.edu/courses/8-02-physics-ii-electricity-and-magnetism-spring-2007/", type: "Notes/PDF", note: "Full lecture notes and exams" },
      { label: "HyperPhysics concept map", href: "http://hyperphysics.phy-astr.gsu.edu/hbase/index.html", type: "Notes/PDF", note: "Quick revision for every formula" },
    ],
  },
  {
    slug: "basic-electrical-engineering",
    name: "Basic Electrical Engineering",
    branches: ["Core (All Branches)", "EEE", "ECE"],
    semester: "Sem 1–2",
    blurb: "DC/AC circuits, network theorems and machines — the first-year electrical foundation.",
    topics: ["KCL/KVL", "Network theorems", "AC fundamentals", "Transformers", "DC & AC machines"],
    resources: [
      { label: "NPTEL Basic Electrical Technology", href: NPTEL("basic electrical"), type: "Notes/PDF", note: "Module-wise PDFs" },
      { label: "MIT OCW 6.002 Circuits and Electronics", href: "https://ocw.mit.edu/courses/6-002-circuits-and-electronics-spring-2007/", type: "Notes/PDF", note: "Notes, labs, solved exams" },
      { label: "All About Circuits textbook", href: "https://www.allaboutcircuits.com/textbook/", type: "Book", note: "Free online DC/AC volumes" },
    ],
  },
  {
    slug: "programming-in-c",
    name: "Programming Fundamentals (C)",
    branches: ["Core (All Branches)", "CSE", "IT"],
    semester: "Sem 1",
    blurb: "First programming course — syntax, pointers, arrays, files and structured problem solving.",
    topics: ["Control flow", "Functions & recursion", "Pointers", "Structures", "File I/O"],
    resources: [
      { label: "NPTEL Problem Solving through C", href: NPTEL("programming in c"), type: "Notes/PDF", note: "Weekly PDFs and quizzes" },
      { label: "Beej's Guide to C Programming", href: "https://beej.us/guide/bgc/", type: "Notes/PDF", note: "Free full-length C book (HTML + PDF)" },
      { label: "HackerRank C practice track", href: "https://www.hackerrank.com/domains/c", type: "Practice", note: "Graded problems from basics up" },
    ],
  },
  {
    slug: "data-structures-algorithms",
    name: "Data Structures & Algorithms",
    branches: ["CSE", "IT", "ECE"],
    semester: "Sem 3",
    blurb: "The single highest-leverage subject for placements and higher studies.",
    topics: ["Arrays & linked lists", "Stacks, queues, trees", "Graphs", "Sorting & searching", "Complexity analysis"],
    resources: [
      { label: "MIT OCW 6.006 Introduction to Algorithms", href: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/", type: "Notes/PDF", note: "Lecture notes, recitations, exams" },
      { label: "CLRS reference (MIT Press)", href: "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/", type: "Book", note: "Standard algorithms text" },
      { label: "NPTEL Data Structures and Algorithms", href: NPTEL("data structures"), type: "Notes/PDF", note: "Indian-syllabus aligned PDFs" },
      { label: "LeetCode Top Interview 150", href: "https://leetcode.com/studyplan/top-interview-150/", type: "Practice", note: "Placement-focused problem set" },
    ],
  },
  {
    slug: "digital-electronics",
    name: "Digital Electronics & Logic Design",
    branches: ["ECE", "EEE", "CSE"],
    semester: "Sem 3",
    blurb: "Boolean algebra to sequential circuits and HDL — the gateway to VLSI and embedded.",
    topics: ["Number systems", "K-maps", "Combinational circuits", "Flip-flops & counters", "Verilog/VHDL basics"],
    resources: [
      { label: "NPTEL Digital Circuits", href: NPTEL("digital circuits"), type: "Notes/PDF", note: "Full PDF notes + assignments" },
      { label: "Neso Academy Digital Electronics", href: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRjMH3mWf6kwqiTbT798eAOm", type: "Video", note: "Board-style teaching, exam friendly" },
      { label: "Morris Mano — Digital Design", href: "https://www.pearson.com/en-us/subject-catalog/p/digital-design/P200000003324", type: "Book", note: "Standard textbook" },
      { label: "EDA Playground (Verilog online)", href: "https://www.edaplayground.com/", type: "Practice", note: "Simulate HDL without installs" },
    ],
  },
  {
    slug: "signals-and-systems",
    name: "Signals & Systems",
    branches: ["ECE", "EEE"],
    semester: "Sem 3–4",
    blurb: "Transforms and system behaviour — the base for DSP, control and communications.",
    topics: ["LTI systems", "Convolution", "Fourier series & transform", "Laplace transform", "Z-transform"],
    resources: [
      { label: "MIT OCW 6.003 Signals and Systems", href: "https://ocw.mit.edu/courses/6-003-signals-and-systems-fall-2011/", type: "Notes/PDF", note: "Full notes and problem sets" },
      { label: "NPTEL Signals and Systems", href: NPTEL("signals and systems"), type: "Notes/PDF", note: "IIT lecture PDFs" },
      { label: "Oppenheim — Signals and Systems", href: "https://www.pearson.com/en-us/subject-catalog/p/signals-and-systems/P200000003360", type: "Book", note: "Reference text" },
    ],
  },
  {
    slug: "analog-electronics",
    name: "Analog Electronics",
    branches: ["ECE", "EEE"],
    semester: "Sem 3–4",
    blurb: "Diodes, BJTs, MOSFETs, amplifiers and op-amps — hands-on circuit design.",
    topics: ["Diode circuits", "BJT & MOSFET biasing", "Small-signal analysis", "Op-amp applications", "Oscillators & filters"],
    resources: [
      { label: "NPTEL Analog Electronic Circuits", href: NPTEL("analog electronic circuits"), type: "Notes/PDF", note: "Detailed module PDFs" },
      { label: "Sedra & Smith — Microelectronic Circuits", href: "https://global.oup.com/academic/product/microelectronic-circuits-9780190853464", type: "Book", note: "The analog bible" },
      { label: "Falstad circuit simulator", href: "https://www.falstad.com/circuit/", type: "Practice", note: "See currents move in real time" },
    ],
  },
  {
    slug: "microprocessors-microcontrollers",
    name: "Microprocessors & Microcontrollers",
    branches: ["ECE", "EEE", "CSE"],
    semester: "Sem 5",
    blurb: "8085/8051 to ARM Cortex-M — architecture, assembly and peripheral interfacing.",
    topics: ["8085/8086 architecture", "8051 programming", "Interrupts & timers", "ARM Cortex-M", "Peripheral interfacing"],
    resources: [
      { label: "NPTEL Microprocessors and Microcontrollers", href: NPTEL("microprocessors"), type: "Notes/PDF", note: "Complete PDF course pack" },
      { label: "ARM Developer documentation", href: "https://developer.arm.com/documentation", type: "Notes/PDF", note: "Official Cortex-M reference manuals" },
      { label: "STM32 / ESP32 getting started", href: "https://docs.espressif.com/", type: "Practice", note: "Real hardware projects" },
    ],
  },
  {
    slug: "communication-systems",
    name: "Communication Systems",
    branches: ["ECE"],
    semester: "Sem 5",
    blurb: "Analog and digital modulation, noise and information theory.",
    topics: ["AM/FM", "Sampling & quantisation", "ASK/FSK/PSK", "Noise analysis", "Information theory & coding"],
    resources: [
      { label: "NPTEL Principles of Communication Systems", href: NPTEL("communication systems"), type: "Notes/PDF", note: "Two-part IIT course with notes" },
      { label: "MIT OCW 6.02 Digital Communication Systems", href: "https://ocw.mit.edu/courses/6-02-introduction-to-eecs-ii-digital-communication-systems-fall-2012/", type: "Notes/PDF", note: "Notes and labs" },
      { label: "GNU Radio tutorials", href: "https://wiki.gnuradio.org/index.php/Tutorials", type: "Practice", note: "Software-defined radio hands-on" },
    ],
  },
  {
    slug: "digital-signal-processing",
    name: "Digital Signal Processing",
    branches: ["ECE", "EEE"],
    semester: "Sem 5–6",
    blurb: "Discrete-time processing, DFT/FFT and digital filter design.",
    topics: ["DTFT & DFT", "FFT algorithms", "FIR filter design", "IIR filter design", "Multirate DSP"],
    resources: [
      { label: "NPTEL Digital Signal Processing", href: NPTEL("digital signal processing"), type: "Notes/PDF", note: "Notes + solved assignments" },
      { label: "DSP Guide (free online book)", href: "https://www.dspguide.com/", type: "Book", note: "Smith's practical DSP handbook, free PDF chapters" },
      { label: "SciPy signal processing docs", href: "https://docs.scipy.org/doc/scipy/reference/signal.html", type: "Practice", note: "Implement filters in Python" },
    ],
  },
  {
    slug: "control-systems",
    name: "Control Systems",
    branches: ["ECE", "EEE", "Mechanical"],
    semester: "Sem 5",
    blurb: "Feedback, stability and controller design across electrical and mechanical systems.",
    topics: ["Transfer functions", "Time & frequency response", "Root locus", "Bode & Nyquist", "PID design", "State space"],
    resources: [
      { label: "NPTEL Control Systems", href: NPTEL("control systems"), type: "Notes/PDF", note: "IIT lecture notes" },
      { label: "Control Tutorials for MATLAB & Simulink", href: "https://ctms.engin.umich.edu/CTMS/index.php?aux=Home", type: "Notes/PDF", note: "Michigan's classic worked tutorials" },
      { label: "Brian Douglas — Control System Lectures", href: "https://www.youtube.com/@BrianBDouglas", type: "Video", note: "Best intuition-first explanations" },
    ],
  },
  {
    slug: "vlsi-design",
    name: "VLSI Design",
    branches: ["ECE"],
    semester: "Sem 6–7",
    blurb: "CMOS logic, layout, timing and the RTL-to-GDSII flow.",
    topics: ["MOS fundamentals", "CMOS combinational & sequential", "Layout & DRC/LVS", "Timing analysis", "RTL to GDSII"],
    resources: [
      { label: "NPTEL VLSI Design courses", href: NPTEL("vlsi"), type: "Notes/PDF", note: "Digital VLSI + analog VLSI PDFs" },
      { label: "OpenLane / Skywater 130 flow", href: "https://openlane.readthedocs.io/", type: "Practice", note: "Free open-source tapeout flow" },
      { label: "VLSI System Design (VSD) resources", href: "https://www.vlsisystemdesign.com/", type: "Notes/PDF", note: "Practical labs and workshops" },
    ],
  },
  {
    slug: "embedded-systems",
    name: "Embedded Systems & IoT",
    branches: ["ECE", "EEE", "CSE"],
    semester: "Sem 6",
    blurb: "Firmware, RTOS and connected devices — the most job-dense hardware skill.",
    topics: ["Bare-metal firmware", "RTOS concepts", "I2C/SPI/UART", "Low-power design", "MQTT & IoT cloud"],
    resources: [
      { label: "NPTEL Embedded Systems Design", href: NPTEL("embedded systems"), type: "Notes/PDF", note: "Course notes + assignments" },
      { label: "FreeRTOS documentation & book", href: "https://www.freertos.org/Documentation/RTOS_book.html", type: "Book", note: "Free official RTOS book (PDF)" },
      { label: "Awesome Embedded resources", href: "https://github.com/nhivp/Awesome-Embedded", type: "Notes/PDF", note: "Curated repos, books and tools" },
    ],
  },
  {
    slug: "operating-systems",
    name: "Operating Systems",
    branches: ["CSE", "IT"],
    semester: "Sem 4–5",
    blurb: "Processes, memory, scheduling and file systems — core CS and GATE heavy.",
    topics: ["Processes & threads", "CPU scheduling", "Synchronisation", "Deadlocks", "Virtual memory", "File systems"],
    resources: [
      { label: "Operating Systems: Three Easy Pieces (free PDF)", href: "https://pages.cs.wisc.edu/~remzi/OSTEP/", type: "Book", note: "Chapter-wise free PDFs — best OS book" },
      { label: "NPTEL Operating System Fundamentals", href: NPTEL("operating system"), type: "Notes/PDF", note: "Exam-oriented notes" },
      { label: "MIT 6.1810 xv6 labs", href: "https://pdos.csail.mit.edu/6.828/2023/xv6.html", type: "Practice", note: "Build a real OS kernel" },
    ],
  },
  {
    slug: "database-management-systems",
    name: "Database Management Systems",
    branches: ["CSE", "IT"],
    semester: "Sem 5",
    blurb: "Relational modelling, SQL, normalisation, transactions and indexing.",
    topics: ["ER modelling", "SQL", "Normal forms", "Transactions & ACID", "Indexing & query plans"],
    resources: [
      { label: "CMU 15-445 Database Systems", href: "https://15445.courses.cs.cmu.edu/", type: "Notes/PDF", note: "Slides, notes and projects — gold standard" },
      { label: "NPTEL DBMS", href: NPTEL("database management system"), type: "Notes/PDF", note: "IIT lecture PDFs" },
      { label: "PostgreSQL documentation", href: "https://www.postgresql.org/docs/", type: "Notes/PDF", note: "Primary source for real SQL" },
      { label: "SQLZoo practice", href: "https://sqlzoo.net/", type: "Practice", note: "Interactive query drills" },
    ],
  },
  {
    slug: "computer-networks",
    name: "Computer Networks",
    branches: ["CSE", "IT", "ECE"],
    semester: "Sem 5–6",
    blurb: "The layered internet — from Ethernet frames to HTTP and security.",
    topics: ["OSI & TCP/IP", "Routing", "TCP & congestion control", "DNS/HTTP", "Network security"],
    resources: [
      { label: "Computer Networks: A Systems Approach (free book)", href: "https://book.systemsapproach.org/", type: "Book", note: "Open textbook, full online + PDF" },
      { label: "NPTEL Computer Networks", href: NPTEL("computer networks"), type: "Notes/PDF", note: "Notes and weekly quizzes" },
      { label: "Wireshark packet analysis labs", href: "https://www.wireshark.org/docs/", type: "Practice", note: "See real protocol traffic" },
    ],
  },
  {
    slug: "theory-of-computation",
    name: "Theory of Computation",
    branches: ["CSE", "IT"],
    semester: "Sem 5",
    blurb: "Automata, grammars, Turing machines and decidability.",
    topics: ["Finite automata", "Regular expressions", "CFG & PDA", "Turing machines", "P vs NP basics"],
    resources: [
      { label: "MIT OCW 18.404J Theory of Computation", href: "https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/", type: "Notes/PDF", note: "Sipser's own course notes and exams" },
      { label: "NPTEL Theory of Computation", href: NPTEL("theory of computation"), type: "Notes/PDF", note: "GATE-aligned PDFs" },
      { label: "JFLAP automata simulator", href: "https://www.jflap.org/", type: "Practice", note: "Build and test automata visually" },
    ],
  },
  {
    slug: "software-engineering",
    name: "Software Engineering",
    branches: ["CSE", "IT"],
    semester: "Sem 6",
    blurb: "Requirements, design patterns, testing and delivery practices.",
    topics: ["SDLC models", "Agile & Scrum", "UML & design patterns", "Testing strategies", "CI/CD"],
    resources: [
      { label: "NPTEL Software Engineering", href: NPTEL("software engineering"), type: "Notes/PDF", note: "Complete course PDFs" },
      { label: "Refactoring Guru — patterns catalog", href: "https://refactoring.guru/design-patterns", type: "Notes/PDF", note: "Every pattern with diagrams and code" },
      { label: "Google Testing Blog & guides", href: "https://testing.googleblog.com/", type: "Notes/PDF", note: "Industry testing practice" },
    ],
  },
  {
    slug: "machine-learning",
    name: "Machine Learning",
    branches: ["CSE", "IT", "ECE"],
    semester: "Sem 6–7",
    blurb: "Supervised and unsupervised learning with real datasets.",
    topics: ["Regression & classification", "Trees & ensembles", "Clustering", "Model evaluation", "Neural networks intro"],
    resources: [
      { label: "Stanford CS229 notes", href: "https://cs229.stanford.edu/", type: "Notes/PDF", note: "The classic ML lecture notes PDF" },
      { label: "NPTEL Introduction to Machine Learning", href: NPTEL("machine learning"), type: "Notes/PDF", note: "IIT Madras course with notes" },
      { label: "Kaggle Learn micro-courses", href: "https://www.kaggle.com/learn", type: "Practice", note: "Hands-on notebooks with datasets" },
      { label: "scikit-learn user guide", href: "https://scikit-learn.org/stable/user_guide.html", type: "Notes/PDF", note: "Algorithm reference you'll actually use" },
    ],
  },
  {
    slug: "power-systems",
    name: "Power Systems",
    branches: ["EEE"],
    semester: "Sem 5–6",
    blurb: "Generation, transmission, distribution, protection and load flow.",
    topics: ["Transmission line modelling", "Load flow", "Fault analysis", "Protection & relays", "Power quality"],
    resources: [
      { label: "NPTEL Power System Analysis", href: NPTEL("power system"), type: "Notes/PDF", note: "Module-wise notes and problems" },
      { label: "IEEE PES resources", href: "https://www.ieee-pes.org/", type: "Notes/PDF", note: "Standards and technical papers" },
      { label: "MATPOWER load-flow toolkit", href: "https://matpower.org/", type: "Practice", note: "Run real load-flow cases" },
    ],
  },
  {
    slug: "power-electronics",
    name: "Power Electronics",
    branches: ["EEE", "ECE"],
    semester: "Sem 6",
    blurb: "Converters, inverters and drives — the backbone of EVs and renewables.",
    topics: ["Diode/thyristor rectifiers", "Buck & boost converters", "Inverters & PWM", "Motor drives", "Thermal design"],
    resources: [
      { label: "NPTEL Power Electronics", href: NPTEL("power electronics"), type: "Notes/PDF", note: "Full lecture PDFs" },
      { label: "Texas Instruments power design guides", href: "https://www.ti.com/power-management/overview.html", type: "Notes/PDF", note: "App notes and reference designs" },
      { label: "PLECS / LTspice simulation", href: "https://www.analog.com/en/resources/design-tools-and-calculators/ltspice-simulator.html", type: "Practice", note: "Simulate converters for free" },
    ],
  },
  {
    slug: "thermodynamics",
    name: "Thermodynamics",
    branches: ["Mechanical", "Civil", "Chemical"],
    semester: "Sem 3",
    blurb: "Energy, entropy and cycles — the core mechanical subject.",
    topics: ["Laws of thermodynamics", "Entropy", "Power cycles", "Refrigeration cycles", "Psychrometry"],
    resources: [
      { label: "NPTEL Engineering Thermodynamics", href: NPTEL("thermodynamics"), type: "Notes/PDF", note: "IIT notes with solved problems" },
      { label: "MIT OCW Thermodynamics & Kinetics", href: OCW("thermodynamics"), type: "Notes/PDF", note: "Lecture notes and exams" },
      { label: "Steam tables & property calculators", href: "https://www.irc.wisc.edu/properties/", type: "Practice", note: "Property lookup for problem solving" },
    ],
  },
  {
    slug: "fluid-mechanics",
    name: "Fluid Mechanics",
    branches: ["Mechanical", "Civil", "Chemical"],
    semester: "Sem 4",
    blurb: "Statics, dynamics, flow through pipes and boundary layers.",
    topics: ["Fluid statics", "Bernoulli & momentum", "Pipe flow & losses", "Boundary layer", "Turbomachinery basics"],
    resources: [
      { label: "NPTEL Fluid Mechanics", href: NPTEL("fluid mechanics"), type: "Notes/PDF", note: "Complete notes and tutorials" },
      { label: "MIT OCW Fluid Mechanics", href: OCW("fluid mechanics"), type: "Notes/PDF", note: "Problem sets with solutions" },
      { label: "NASA Beginner's Guide to Aerodynamics", href: "https://www.grc.nasa.gov/www/k-12/airplane/short.html", type: "Notes/PDF", note: "Clear concept refreshers" },
    ],
  },
  {
    slug: "strength-of-materials",
    name: "Strength of Materials",
    branches: ["Mechanical", "Civil"],
    semester: "Sem 3",
    blurb: "Stress, strain, bending and torsion — design safety fundamentals.",
    topics: ["Stress & strain", "Shear force & bending moment", "Torsion", "Columns & struts", "Mohr's circle"],
    resources: [
      { label: "NPTEL Strength of Materials", href: NPTEL("strength of materials"), type: "Notes/PDF", note: "Chapter PDFs with worked examples" },
      { label: "MIT OCW Mechanics of Materials", href: OCW("mechanics of materials"), type: "Notes/PDF", note: "Notes and exams" },
      { label: "SkyCiv free beam calculator", href: "https://skyciv.com/free-beam-calculator/", type: "Practice", note: "Check SFD/BMD answers instantly" },
    ],
  },
  {
    slug: "structural-analysis",
    name: "Structural Analysis",
    branches: ["Civil"],
    semester: "Sem 4–5",
    blurb: "Trusses, frames and indeterminate structures.",
    topics: ["Determinate structures", "Slope deflection", "Moment distribution", "Influence lines", "Matrix methods"],
    resources: [
      { label: "NPTEL Structural Analysis", href: NPTEL("structural analysis"), type: "Notes/PDF", note: "IIT Kharagpur PDF modules" },
      { label: "IS codes reference (BIS)", href: "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/standard_review/Standard_review/Indian_standards", type: "Notes/PDF", note: "Official Indian design standards" },
      { label: "OpenSees / SAP2000 tutorials", href: YT("structural analysis software tutorial"), type: "Video", note: "Software workflows for projects" },
    ],
  },
  {
    slug: "engineering-mechanics",
    name: "Engineering Mechanics",
    branches: ["Core (All Branches)", "Mechanical", "Civil"],
    semester: "Sem 1–2",
    blurb: "Statics and dynamics of rigid bodies.",
    topics: ["Force systems", "Equilibrium", "Friction", "Centroid & moment of inertia", "Kinematics & kinetics"],
    resources: [
      { label: "NPTEL Engineering Mechanics", href: NPTEL("engineering mechanics"), type: "Notes/PDF", note: "Lecture notes and tutorials" },
      { label: "MIT OCW 8.01 Classical Mechanics", href: "https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/", type: "Notes/PDF", note: "Complete notes with video" },
    ],
  },
  {
    slug: "environmental-engineering",
    name: "Environmental Engineering",
    branches: ["Civil", "Chemical"],
    semester: "Sem 5",
    blurb: "Water supply, wastewater treatment, air pollution and solid waste.",
    topics: ["Water quality", "Water treatment", "Wastewater treatment", "Air pollution control", "Solid waste management"],
    resources: [
      { label: "NPTEL Environmental Engineering", href: NPTEL("environmental engineering"), type: "Notes/PDF", note: "Full course PDFs" },
      { label: "CPCB standards & reports", href: "https://cpcb.nic.in/", type: "Notes/PDF", note: "Indian pollution norms" },
      { label: "EPA technical guidance", href: "https://www.epa.gov/research", type: "Notes/PDF", note: "Treatment design references" },
    ],
  },
];

export const subjectBySlug = (slug: string) => subjects.find((s) => s.slug === slug);

export const subjectBranches = Array.from(
  new Set(subjects.flatMap((s) => s.branches)),
).sort((a, b) => (a.startsWith("Core") ? -1 : b.startsWith("Core") ? 1 : a.localeCompare(b)));
