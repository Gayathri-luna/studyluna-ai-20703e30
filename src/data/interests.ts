/**
 * Hobbies & passions — short educational guides.
 *
 * Data driven: add an entry here and it appears on /interests automatically.
 */
export interface Interest {
  slug: string;
  name: string;
  /** lucide-react icon name used in the UI. */
  icon: "Palette" | "Crown" | "Music" | "Camera" | "PenLine" | "Trophy" | "Code2" | "Mic";
  summary: string;
  basics: string[];
  resources: { label: string; detail: string; href?: string }[];
  progress: string[];
}

export const interests: Interest[] = [
  {
    slug: "art-and-drawing",
    name: "Art & Drawing",
    icon: "Palette",
    summary: "Sketching, shading and digital illustration from the very first line.",
    basics: [
      "Start with line control: straight lines, ellipses and simple shapes, daily for 10 minutes.",
      "Learn construction — break any object into boxes, spheres and cylinders before detailing.",
      "Understand value before colour: light source, shadow, core shadow, reflected light.",
      "Perspective basics: one-point, two-point and horizon lines.",
    ],
    resources: [
      { label: "Draw a Box", detail: "Free structured drawing exercises for absolute beginners.", href: "https://drawabox.com" },
      { label: "Proko (YouTube)", detail: "Figure drawing, anatomy and portrait fundamentals.", href: "https://www.youtube.com/@ProkoTV" },
      { label: "Krita / Excalidraw", detail: "Free digital painting and sketching tools — no subscription needed.", href: "https://krita.org" },
      { label: "Line of Action", detail: "Timed gesture-drawing practice with reference photos.", href: "https://line-of-action.com" },
    ],
    progress: [
      "Do a 30-day sketch challenge and post daily — consistency beats talent.",
      "Join r/learnart or a campus art club for critique.",
      "Enter college fest art competitions and Inktober.",
      "Build a portfolio on Behance or Instagram; take small commission work.",
    ],
  },
  {
    slug: "chess",
    name: "Chess",
    icon: "Crown",
    summary: "Openings, tactics and endgames — the fastest game to improve at with practice.",
    basics: [
      "Piece values and how each piece moves; castling, en passant, promotion.",
      "Opening principles: control the centre, develop pieces, castle early, don't move one piece twice.",
      "Tactics are 90% of improvement below 1600: pins, forks, skewers, discovered attacks.",
      "Basic endgames: king + rook mate, king + pawn opposition.",
    ],
    resources: [
      { label: "Lichess", detail: "Completely free play, puzzles, and interactive lessons.", href: "https://lichess.org" },
      { label: "Chess.com Lessons", detail: "Structured beginner path with rated puzzles.", href: "https://www.chess.com/lessons" },
      { label: "GothamChess (YouTube)", detail: "Beginner-friendly openings and game reviews.", href: "https://www.youtube.com/@GothamChess" },
      { label: "ChessTempo", detail: "Tactics training with spaced repetition.", href: "https://chesstempo.com" },
    ],
    progress: [
      "Solve 10 puzzles a day and analyse every loss with the engine after playing.",
      "Pick one opening as White and two replies as Black; stick with them.",
      "Play rated classical games rather than only bullet.",
      "Join your college chess club and enter FIDE-rated open tournaments for a rating.",
    ],
  },
  {
    slug: "music",
    name: "Music",
    icon: "Music",
    summary: "Learn an instrument, understand theory and start producing your own tracks.",
    basics: [
      "Pick one instrument (guitar, keyboard or voice) and learn to tune and hold it correctly.",
      "Rhythm first: practise with a metronome at slow tempos.",
      "Music theory basics: notes, scales, intervals, chords and chord progressions.",
      "Ear training — recognise major vs minor and simple intervals.",
    ],
    resources: [
      { label: "musictheory.net", detail: "Free interactive theory lessons and ear-training exercises.", href: "https://www.musictheory.net" },
      { label: "Justin Guitar", detail: "The classic free beginner guitar course.", href: "https://www.justinguitar.com" },
      { label: "Ultimate Guitar / Chordify", detail: "Chords and tabs for songs you actually want to play.", href: "https://www.ultimate-guitar.com" },
      { label: "Bandlab / Audacity", detail: "Free DAWs for recording and producing your first track.", href: "https://www.bandlab.com" },
    ],
    progress: [
      "Learn 5 complete songs rather than 50 intros.",
      "Record yourself monthly to hear real progress.",
      "Play at open mics, college fests and cultural nights.",
      "Collaborate online, release on SoundCloud or Spotify via a free distributor.",
    ],
  },
  {
    slug: "photography",
    name: "Photography",
    icon: "Camera",
    summary: "Composition, light and the exposure triangle — even on a phone camera.",
    basics: [
      "Exposure triangle: aperture, shutter speed, ISO and how they trade off.",
      "Composition: rule of thirds, leading lines, framing, negative space.",
      "Light quality — golden hour, soft vs hard light, direction of light.",
      "Shoot RAW when possible and learn basic editing (exposure, contrast, white balance).",
    ],
    resources: [
      { label: "Photography Life", detail: "Deep, free written tutorials on every fundamental.", href: "https://photographylife.com" },
      { label: "Sean Tucker (YouTube)", detail: "Thoughtful lessons on seeing and composition.", href: "https://www.youtube.com/@seantucker" },
      { label: "Snapseed / Darktable", detail: "Free mobile and desktop editing tools.", href: "https://www.darktable.org" },
      { label: "Unsplash & 500px", detail: "Study great work and publish your own.", href: "https://unsplash.com" },
    ],
    progress: [
      "Do themed 52-week or 30-day photo projects.",
      "Get critique on r/photocritique instead of only likes.",
      "Shoot college events, portraits and small paid gigs.",
      "Enter national photo contests and build a tight 20-image portfolio.",
    ],
  },
  {
    slug: "writing",
    name: "Writing",
    icon: "PenLine",
    summary: "Essays, fiction, blogging and technical writing — a compounding career skill.",
    basics: [
      "Write short and clear: one idea per sentence, active voice, cut adverbs.",
      "Structure first — outline before drafting, then revise ruthlessly.",
      "Read in the genre you want to write; imitate structure, not words.",
      "Grammar and punctuation fundamentals, then style.",
    ],
    resources: [
      { label: "Purdue OWL", detail: "Free reference for grammar, citation and academic writing.", href: "https://owl.purdue.edu" },
      { label: "Hemingway Editor", detail: "Instantly shows over-long, passive and dense sentences.", href: "https://hemingwayapp.com" },
      { label: "Brandon Sanderson lectures (YouTube)", detail: "A full free university course on creative writing.", href: "https://www.youtube.com/@BrandonSandersonLectures" },
      { label: "Substack / Medium / Hashnode", detail: "Free places to publish and find readers.", href: "https://substack.com" },
    ],
    progress: [
      "Publish weekly, even if short — a public archive beats a private draft folder.",
      "Join NaNoWriMo or a writing group for deadlines and feedback.",
      "Enter essay and short-story competitions.",
      "Freelance: technical blogs and documentation pay well for engineers who write.",
    ],
  },
  {
    slug: "sports",
    name: "Sports",
    icon: "Trophy",
    summary: "Fitness fundamentals, one sport skill, and building a training habit.",
    basics: [
      "Warm-up, mobility and cool-down prevent most beginner injuries.",
      "Build a base: 3 sessions a week of cardio plus basic strength (squat, hinge, push, pull).",
      "Learn the rules and one core skill of your chosen sport deeply.",
      "Sleep, hydration and protein matter as much as the training itself.",
    ],
    resources: [
      { label: "NHS Couch to 5K", detail: "Free, well-designed beginner running programme.", href: "https://www.nhs.uk/live-well/exercise/get-running-with-couch-to-5k/" },
      { label: "r/Fitness wiki", detail: "Free, evidence-based beginner strength routines.", href: "https://thefitness.wiki" },
      { label: "Strava / Hevy", detail: "Track sessions and stay accountable with friends.", href: "https://www.strava.com" },
      { label: "Olympic Channel / federation channels", detail: "Technique breakdowns from official coaching sources." },
    ],
    progress: [
      "Set a measurable target: 5K time, a rep max, or a match win rate.",
      "Play in inter-department and inter-college tournaments.",
      "Join a district-level club or academy for coaching.",
      "Consider certifications (fitness trainer, referee) if you want to go professional.",
    ],
  },
  {
    slug: "coding-for-fun",
    name: "Coding for Fun",
    icon: "Code2",
    summary: "Side projects, game jams and automation — programming without the pressure.",
    basics: [
      "Pick one friendly language: Python or JavaScript.",
      "Learn variables, loops, functions and lists — enough to build something tiny.",
      "Automate something boring in your own life first (rename files, scrape marks, send reminders).",
      "Use Git from day one, even for toy projects.",
    ],
    resources: [
      { label: "freeCodeCamp", detail: "Free full curriculum with hands-on projects.", href: "https://www.freecodecamp.org" },
      { label: "Codédex", detail: "Game-styled beginner coding path — fun and structured.", href: "https://www.codedex.io" },
      { label: "Automate the Boring Stuff", detail: "Free online book of practical Python projects.", href: "https://automatetheboringstuff.com" },
      { label: "Replit / CodeSandbox", detail: "Code in the browser with zero setup.", href: "https://replit.com" },
    ],
    progress: [
      "Ship 5 small projects rather than one unfinished big one.",
      "Join Ludum Dare or a college hackathon.",
      "Contribute a small fix to an open-source repo you use.",
      "Write up each project on GitHub — it doubles as your portfolio.",
    ],
  },
  {
    slug: "public-speaking",
    name: "Public Speaking",
    icon: "Mic",
    summary: "Speak clearly, structure a talk and handle nerves in front of any audience.",
    basics: [
      "Structure beats memorising: hook, three points, close.",
      "Breathe from the diaphragm; pause instead of using filler words.",
      "Practise out loud and time yourself — reading silently does not count.",
      "Eye contact, posture and deliberate hand gestures carry half the message.",
    ],
    resources: [
      { label: "Toastmasters International", detail: "Local clubs with structured speech projects and feedback.", href: "https://www.toastmasters.org" },
      { label: "TED Masterclass / TED Talks", detail: "Study how strong talks open and close.", href: "https://www.ted.com" },
      { label: "Coursera — Public Speaking (Univ. of Washington)", detail: "Free to audit, assignment-driven.", href: "https://www.coursera.org" },
      { label: "Orai / Yoodli", detail: "Apps that analyse pace, filler words and clarity.", href: "https://yoodli.ai" },
    ],
    progress: [
      "Record and rewatch one 2-minute talk a week.",
      "Volunteer to present in class, seminars and project reviews.",
      "Enter debate, MUN, elocution and pitch competitions.",
      "Move up to conference talks, workshops and hosting college events.",
    ],
  },
];

export const interestBySlug = (slug: string) => interests.find((i) => i.slug === slug);
