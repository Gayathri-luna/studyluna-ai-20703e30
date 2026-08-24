export interface ResourceCategory {
  slug: string;
  title: string;
  blurb: string;
  items: { label: string; href: string; note: string }[];
}

export const resourceCategories: ResourceCategory[] = [
  {
    slug: "books",
    title: "Books",
    blurb: "The standard texts engineers keep coming back to.",
    items: [
      { label: "Sedra & Smith — Microelectronic Circuits", href: "https://global.oup.com/", note: "Analog electronics foundation" },
      { label: "Morris Mano — Digital Design", href: "https://www.pearson.com/", note: "Digital logic and HDL" },
      { label: "Oppenheim — Signals and Systems", href: "https://www.pearson.com/", note: "Signals for ECE and EEE" },
      { label: "Cormen — Introduction to Algorithms", href: "https://mitpress.mit.edu/", note: "DSA reference for CSE/IT" },
    ],
  },
  {
    slug: "notes",
    title: "PDF Notes",
    blurb: "Free lecture notes and handouts from top institutes.",
    items: [
      { label: "NPTEL course notes", href: "https://nptel.ac.in/", note: "All branches, IIT/IISc faculty" },
      { label: "MIT OpenCourseWare", href: "https://ocw.mit.edu/", note: "Full course material and problem sets" },
      { label: "GATE syllabus PDFs", href: "https://gate.iitm.ac.in/", note: "Official branch-wise syllabus" },
    ],
  },
  {
    slug: "youtube",
    title: "YouTube",
    blurb: "Channels worth your watch time.",
    items: [
      { label: "NPTEL-NOC IITM", href: "https://www.youtube.com/@nptelhrd", note: "Core engineering lectures" },
      { label: "Neso Academy", href: "https://www.youtube.com/@nesoacademy", note: "Digital, signals, networks" },
      { label: "3Blue1Brown", href: "https://www.youtube.com/@3blue1brown", note: "Maths intuition" },
      { label: "GreatScott!", href: "https://www.youtube.com/@greatscottlab", note: "Practical electronics builds" },
    ],
  },
  {
    slug: "courses",
    title: "Free Courses",
    blurb: "Structured courses you can finish for free.",
    items: [
      { label: "NPTEL / SWAYAM", href: "https://swayam.gov.in/", note: "Credit-eligible Indian courses" },
      { label: "freeCodeCamp", href: "https://www.freecodecamp.org/", note: "Programming and web development" },
      { label: "Codedex", href: "https://www.codedex.io/", note: "Interactive, game-like coding lessons (Python, JavaScript, HTML/CSS) — great for beginners" },
      { label: "Kaggle Learn", href: "https://www.kaggle.com/learn", note: "Data science micro-courses" },
      { label: "MATLAB Onramp", href: "https://matlabacademy.mathworks.com/", note: "Free official MATLAB training" },
    ],
  },
  {
    slug: "github",
    title: "GitHub",
    blurb: "Repositories that teach by example.",
    items: [
      { label: "Awesome Embedded", href: "https://github.com/nhivp/Awesome-Embedded", note: "Embedded resources hub" },
      { label: "Awesome VLSI", href: "https://github.com/topics/vlsi", note: "Open silicon projects" },
      { label: "Build Your Own X", href: "https://github.com/codecrafters-io/build-your-own-x", note: "Learn by rebuilding tools" },
    ],
  },
  {
    slug: "docs",
    title: "Documentation",
    blurb: "Primary sources — always more accurate than tutorials.",
    items: [
      { label: "Espressif ESP32 docs", href: "https://docs.espressif.com/", note: "IoT and Wi-Fi MCUs" },
      { label: "ARM developer docs", href: "https://developer.arm.com/documentation", note: "Cortex-M architecture" },
      { label: "Python docs", href: "https://docs.python.org/3/", note: "Language reference" },
      { label: "KiCad docs", href: "https://docs.kicad.org/", note: "PCB design workflow" },
    ],
  },
  {
    slug: "blogs",
    title: "Blogs",
    blurb: "Stay current with industry thinking.",
    items: [
      { label: "IEEE Spectrum", href: "https://spectrum.ieee.org/", note: "Engineering news and analysis" },
      { label: "SemiAnalysis", href: "https://www.semianalysis.com/", note: "Semiconductor industry deep dives" },
      { label: "Hackaday", href: "https://hackaday.com/", note: "Daily hardware projects" },
    ],
  },
];

export const resourceBySlug = (slug: string) => resourceCategories.find((c) => c.slug === slug);
