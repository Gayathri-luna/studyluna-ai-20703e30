/**
 * Healthcare education guides.
 *
 * Educational content only — every guide carries a disclaimer and points
 * readers to qualified professionals. External resources are real, verifiable
 * organisation pages (WHO, CDC, NHS, MoHFW, AHA, NIMHANS).
 */

export interface HealthFaq {
  q: string;
  a: string;
}

export interface HealthGuide {
  slug: string;
  title: string;
  category: string;
  summary: string;
  tags: string[];
  detail: string;
  keyConcepts: string[];
  signs?: string[];
  riskFactors?: string[];
  prevention: string[];
  selfCare: string[];
  seekHelp: string[];
  faqs: HealthFaq[];
  warning: string;
  resources: { label: string; href: string }[];
}

export const healthCategories = [
  "General Healthcare",
  "Preventive Healthcare",
  "Nutrition & Wellness",
  "Fitness & Lifestyle",
  "Mental Wellness",
  "Women's Health",
  "Children's Health",
  "Elderly Care",
  "Chronic Disease Education",
  "First Aid & Emergency Awareness",
  "Medication Safety",
  "Healthcare Technology",
  "Medical AI",
  "Telemedicine",
  "Health Monitoring",
  "Patient Education",
] as const;

const STD_WARNING =
  "This guide is educational information, not medical advice, diagnosis or treatment. It cannot replace a qualified doctor. In an emergency call your local emergency number (112 in India) or go to the nearest hospital.";

export const healthGuides: HealthGuide[] = [
  {
    slug: "primary-health-basics",
    title: "Primary Health Basics",
    category: "General Healthcare",
    summary: "How primary care works, what a routine visit covers and how to use health services well.",
    tags: ["primary care", "checkup", "health system"],
    detail:
      "Primary health care is the first point of contact with the health system — a family doctor, a PHC medical officer or a general physician. Most health problems are diagnosed and managed here, and only a minority need specialist referral. Understanding what primary care can do helps people get treated earlier, spend less and avoid unnecessary tests.",
    keyConcepts: [
      "Continuity of care: one clinician who knows your history makes better decisions",
      "Referral pathway: PHC / GP → specialist → tertiary hospital",
      "Health records: keeping prescriptions and reports together improves every consultation",
      "Rational testing: tests are ordered to answer a question, not as a routine ritual",
    ],
    riskFactors: [
      "No regular doctor or health record",
      "Self-medication instead of consultation",
      "Skipping follow-up after an abnormal result",
    ],
    prevention: [
      "Register with a nearby PHC, clinic or family doctor",
      "Keep an annual health check schedule appropriate for your age",
      "Maintain a simple folder or digital copy of prescriptions and reports",
      "Complete recommended adult vaccinations",
    ],
    selfCare: [
      "Write down your symptoms, their duration and your questions before a visit",
      "Carry your current medicine list, including supplements",
      "Ask the doctor to explain the diagnosis and next step in plain language",
    ],
    seekHelp: [
      "Symptoms lasting longer than expected or getting worse",
      "Any new symptom in someone with a chronic condition",
      "Abnormal test results that have not been explained to you",
    ],
    faqs: [
      { q: "Do I need a specialist first?", a: "Usually not. A general physician can diagnose most conditions and will refer you when a specialist is genuinely needed." },
      { q: "How often should adults have a checkup?", a: "For most healthy adults, once a year is reasonable; people with chronic conditions need the schedule their doctor sets." },
    ],
    warning: STD_WARNING,
    resources: [
      { label: "WHO — Primary health care", href: "https://www.who.int/health-topics/primary-health-care" },
      { label: "Ministry of Health & Family Welfare (India)", href: "https://mohfw.gov.in/" },
    ],
  },
  {
    slug: "adult-immunisation-and-screening",
    title: "Adult Immunisation & Screening",
    category: "Preventive Healthcare",
    summary: "Which vaccines and screening tests adults need, and how prevention beats treatment.",
    tags: ["vaccines", "screening", "prevention"],
    detail:
      "Preventive health has two pillars: immunisation, which stops infections before they start, and screening, which finds disease before it causes symptoms. Screening only helps when the test is accurate, the disease is common enough and early treatment changes the outcome — which is why guidelines recommend specific tests at specific ages rather than whole-body scans.",
    keyConcepts: [
      "Herd immunity protects those who cannot be vaccinated",
      "Screening ≠ diagnosis: an abnormal screen needs a confirmatory test",
      "Risk-based screening: family history and lifestyle change the schedule",
      "False positives and over-diagnosis are real costs of unnecessary tests",
    ],
    prevention: [
      "Tetanus-diphtheria booster every 10 years",
      "Annual influenza vaccine for high-risk groups; hepatitis B for health workers",
      "HPV vaccination as recommended for eligible age groups",
      "Blood pressure, blood sugar and lipid checks as advised by your doctor",
    ],
    selfCare: [
      "Keep a vaccination card and note booster due dates",
      "Track blood pressure and weight at home between visits",
      "Discuss family history of cancer, diabetes or heart disease with your doctor",
    ],
    seekHelp: [
      "You are due for a screening test and have not had one",
      "A screening result is abnormal or borderline",
      "You are pregnant, immunocompromised or travelling and need vaccine advice",
    ],
    faqs: [
      { q: "Is a full-body checkup package worth it?", a: "Not usually. Targeted, guideline-based tests for your age and risk profile give better value than large untargeted panels." },
      { q: "Can adults take vaccines they missed as children?", a: "Many can be given later as catch-up doses — a doctor will advise the correct schedule." },
    ],
    warning: STD_WARNING,
    resources: [
      { label: "WHO — Immunization", href: "https://www.who.int/health-topics/vaccines-and-immunization" },
      { label: "CDC — Adult immunization schedule", href: "https://www.cdc.gov/vaccines/schedules/hcp/imz/adult.html" },
    ],
  },
  {
    slug: "balanced-nutrition",
    title: "Balanced Nutrition & Healthy Eating",
    category: "Nutrition & Wellness",
    summary: "Macronutrients, portion sense, micronutrient gaps and how to build a realistic daily plate.",
    tags: ["diet", "nutrition", "food"],
    detail:
      "A balanced diet supplies energy, building blocks and micronutrients without excess salt, sugar or ultra-processed fat. Practical eating patterns matter more than any single 'superfood': whole grains, pulses, vegetables and fruit, adequate protein, and limits on added sugar and salt are consistently linked with lower rates of heart disease and diabetes.",
    keyConcepts: [
      "Macronutrients: carbohydrate, protein and fat, each with a role",
      "Micronutrients: iron, calcium, vitamin D, B12, iodine and folate",
      "Energy balance: intake versus expenditure drives weight change",
      "Fibre and water support digestion and satiety",
    ],
    riskFactors: [
      "High intake of ultra-processed and deep-fried foods",
      "Sugary drinks as a routine habit",
      "Skipping meals followed by large late-night eating",
      "Restrictive fad diets without professional guidance",
    ],
    prevention: [
      "Half the plate vegetables and fruit, a quarter whole grains, a quarter protein",
      "Keep added sugar low and salt under about 5 g a day",
      "Choose home-cooked meals more often than packaged ones",
      "Include a protein source at every meal, especially for vegetarians",
    ],
    selfCare: [
      "Plan meals weekly so healthy choices are the easy ones",
      "Read food labels for sodium, added sugar and trans fat",
      "Drink water rather than sweetened beverages",
    ],
    seekHelp: [
      "Unintentional weight loss or gain",
      "Suspected anaemia, persistent fatigue or hair loss",
      "Any diet change while pregnant, diabetic or on kidney treatment",
    ],
    faqs: [
      { q: "Are supplements necessary?", a: "Most people meeting their needs through food do not need them; deficiencies should be confirmed by testing before supplementing." },
      { q: "Are carbohydrates bad?", a: "No. Quality matters — whole grains and pulses behave very differently from refined flour and sugar." },
    ],
    warning: STD_WARNING,
    resources: [
      { label: "WHO — Healthy diet", href: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet" },
      { label: "NIN-ICMR dietary guidelines", href: "https://www.nin.res.in/" },
    ],
  },
  {
    slug: "physical-activity-and-lifestyle",
    title: "Physical Activity & Everyday Lifestyle",
    category: "Fitness & Lifestyle",
    summary: "How much activity adults need, how to start safely and how sleep and sitting time fit in.",
    tags: ["exercise", "fitness", "sleep"],
    detail:
      "Regular movement lowers the risk of heart disease, type 2 diabetes, several cancers, anxiety and depression. Global guidance for adults is 150–300 minutes of moderate aerobic activity a week plus muscle-strengthening on two days. Reducing long uninterrupted sitting matters independently of workout time.",
    keyConcepts: [
      "Moderate versus vigorous intensity, judged by the talk test",
      "Progressive overload: increase load or duration gradually",
      "Recovery and sleep are part of training, not a break from it",
      "NEAT: everyday movement such as walking and stairs adds up",
    ],
    riskFactors: [
      "Sedentary work with long unbroken sitting",
      "Sudden intense exercise after months of inactivity",
      "Poor sleep and high chronic stress",
    ],
    prevention: [
      "Aim for 150 minutes of brisk activity a week, split any way that fits",
      "Add two strengthening sessions covering major muscle groups",
      "Break up sitting every 30–45 minutes",
      "Protect 7–9 hours of sleep with a consistent schedule",
    ],
    selfCare: [
      "Warm up and cool down; increase intensity by about 10% a week",
      "Hydrate and adjust outdoor activity in extreme heat",
      "Track steps or sessions to keep the habit visible",
    ],
    seekHelp: [
      "Chest pain, severe breathlessness or fainting during exertion — urgent",
      "Joint pain that persists after rest",
      "Before starting intense exercise with a heart, lung or metabolic condition",
    ],
    faqs: [
      { q: "Is walking enough?", a: "Brisk walking counts as moderate activity and is enough for major health benefits when done regularly, ideally with some strength work added." },
      { q: "Best time to exercise?", a: "The time you will do consistently. Timing matters far less than regularity." },
    ],
    warning: STD_WARNING,
    resources: [
      { label: "WHO — Physical activity", href: "https://www.who.int/news-room/fact-sheets/detail/physical-activity" },
      { label: "NHS — Exercise guidelines", href: "https://www.nhs.uk/live-well/exercise/" },
    ],
  },
  {
    slug: "mental-wellness-basics",
    title: "Mental Wellness & Stress Management",
    category: "Mental Wellness",
    summary: "Stress, anxiety and low mood explained, with coping skills and when to reach out for help.",
    tags: ["mental health", "stress", "anxiety"],
    detail:
      "Mental health is part of overall health. Stress is a normal response, but when low mood, anxiety or sleeplessness lasts for weeks and interferes with study, work or relationships, it is a health condition that responds to treatment. Talking therapies, structured routines and, when indicated, medication prescribed by a professional are all effective.",
    keyConcepts: [
      "Acute stress versus persistent distress",
      "Sleep, activity and social connection as protective factors",
      "Cognitive patterns: thoughts influence mood and behaviour",
      "Stigma delays help-seeking and worsens outcomes",
    ],
    signs: [
      "Low mood or loss of interest most days for two weeks or more",
      "Persistent worry, restlessness or panic episodes",
      "Sleep and appetite change, difficulty concentrating",
      "Withdrawal from friends, studies or work",
    ],
    riskFactors: [
      "Chronic academic or work pressure and isolation",
      "Family history of mental illness",
      "Substance use, including alcohol as a coping tool",
    ],
    prevention: [
      "Keep a regular sleep and meal routine",
      "Exercise regularly and limit late-night screen use",
      "Maintain at least one supportive relationship you can talk to",
      "Learn a simple breathing or grounding technique",
    ],
    selfCare: [
      "Break large tasks into small, scheduled steps",
      "Use structured journaling to separate facts from worries",
      "Reduce caffeine and avoid alcohol as a sleep aid",
    ],
    seekHelp: [
      "Any thought of self-harm or suicide — seek help immediately",
      "Symptoms lasting more than two weeks or worsening",
      "Inability to carry out daily responsibilities",
    ],
    faqs: [
      { q: "Is therapy only for severe illness?", a: "No. Brief counselling helps with ordinary stress, study pressure and relationship difficulties too." },
      { q: "Do I need medication?", a: "Many people improve with therapy and lifestyle change alone. Only a qualified clinician can decide if medication is appropriate." },
    ],
    warning:
      "Educational information only. If you or someone you know is at risk of self-harm, contact the Tele-MANAS helpline (14416 in India) or your local emergency number immediately.",
    resources: [
      { label: "WHO — Mental health", href: "https://www.who.int/health-topics/mental-health" },
      { label: "Tele-MANAS (India)", href: "https://telemanas.mohfw.gov.in/" },
      { label: "NIMHANS", href: "https://nimhans.ac.in/" },
    ],
  },
  {
    slug: "womens-health-essentials",
    title: "Women's Health Essentials",
    category: "Women's Health",
    summary: "Menstrual health, anaemia, reproductive care and screening every woman should know about.",
    tags: ["women", "menstrual health", "screening"],
    detail:
      "Women's health spans menstrual and reproductive care, nutrition (especially iron and calcium), screening for cervical and breast cancer, and care during pregnancy and menopause. Many common problems — heavy periods, iron-deficiency anaemia, PCOS — are treatable but under-reported because of stigma.",
    keyConcepts: [
      "Normal menstrual cycle range and what counts as irregular",
      "Iron-deficiency anaemia is common and correctable",
      "Cervical cancer screening and HPV vaccination",
      "Antenatal care visits and folic acid before conception",
    ],
    signs: [
      "Very heavy or prolonged bleeding, or cycles shorter than 21 / longer than 35 days",
      "Severe pain that stops daily activity",
      "Persistent fatigue, breathlessness or pallor",
      "A new breast lump or nipple discharge",
    ],
    riskFactors: [
      "Low dietary iron and calcium",
      "Untreated PCOS or thyroid disorder",
      "Missed screening and antenatal visits",
    ],
    prevention: [
      "Iron- and calcium-rich diet with vitamin C for absorption",
      "HPV vaccination for eligible age groups",
      "Cervical screening as per national guidance",
      "Folic acid before and during early pregnancy on medical advice",
    ],
    selfCare: [
      "Track cycles with a simple app or diary",
      "Use safe, clean menstrual products and change them regularly",
      "Include weight-bearing exercise for bone health",
    ],
    seekHelp: [
      "Bleeding after menopause or between periods",
      "Severe abdominal pain, fever or foul discharge — urgent",
      "Any breast lump or change in skin over the breast",
    ],
    faqs: [
      { q: "Are irregular periods always serious?", a: "Not always, but persistent irregularity should be evaluated — thyroid disorder, PCOS and anaemia are common treatable causes." },
      { q: "When should cervical screening start?", a: "Follow your national programme; in India screening is generally advised for women from 30 years of age." },
    ],
    warning: STD_WARNING,
    resources: [
      { label: "WHO — Women's health", href: "https://www.who.int/health-topics/women-s-health" },
      { label: "NHS — Women's health", href: "https://www.nhs.uk/womens-health/" },
    ],
  },
  {
    slug: "child-health-and-growth",
    title: "Children's Health & Growth",
    category: "Children's Health",
    summary: "Immunisation, growth monitoring, nutrition and common childhood illnesses.",
    tags: ["paediatrics", "children", "vaccination"],
    detail:
      "Childhood health rests on immunisation, adequate nutrition and monitored growth. Most childhood fevers and colds are viral and self-limiting, but dehydration, breathing difficulty and poor feeding are warning signs that need prompt medical attention. Growth charts detect problems long before they are visible.",
    keyConcepts: [
      "National immunisation schedule and catch-up doses",
      "Growth monitoring using weight-for-age and height-for-age charts",
      "Exclusive breastfeeding for the first six months",
      "Oral rehydration solution for diarrhoea",
    ],
    signs: [
      "Refusal to feed or drink",
      "Fast or difficult breathing, chest indrawing",
      "Lethargy, sunken eyes or reduced urine output",
      "Convulsion or persistent high fever",
    ],
    riskFactors: [
      "Missed or delayed vaccinations",
      "Unsafe drinking water and poor sanitation",
      "Inadequate complementary feeding after six months",
    ],
    prevention: [
      "Complete the national immunisation schedule on time",
      "Exclusive breastfeeding to six months, then safe complementary foods",
      "Handwashing, safe water and clean food handling",
      "Regular growth and development checks",
    ],
    selfCare: [
      "Use ORS and zinc for diarrhoea as advised",
      "Keep a vaccination and growth record book",
      "Limit screen time and encourage active play",
    ],
    seekHelp: [
      "Any warning sign above — see a doctor urgently",
      "Fever in an infant under three months",
      "Faltering growth or missed developmental milestones",
    ],
    faqs: [
      { q: "Do all fevers need antibiotics?", a: "No. Most childhood fevers are viral; antibiotics do not help and cause harm when misused." },
      { q: "Is a delayed vaccine dose wasted?", a: "No. Catch-up schedules exist — consult a paediatrician rather than skipping the dose." },
    ],
    warning: STD_WARNING,
    resources: [
      { label: "WHO — Child health", href: "https://www.who.int/health-topics/child-health" },
      { label: "UNICEF India — Health", href: "https://www.unicef.org/india/what-we-do/health" },
    ],
  },
  {
    slug: "elderly-care-basics",
    title: "Elderly Care Essentials",
    category: "Elderly Care",
    summary: "Fall prevention, polypharmacy, nutrition and dignity in the care of older adults.",
    tags: ["geriatrics", "elderly", "falls"],
    detail:
      "Ageing brings reduced reserve: medicines act differently, falls cause fractures that change lives, and several conditions coexist. Good elderly care focuses on function and independence — mobility, nutrition, medication review, vision and hearing, and social connection — rather than on any single disease.",
    keyConcepts: [
      "Polypharmacy: more medicines means more interactions",
      "Frailty and sarcopenia (muscle loss) with ageing",
      "Delirium can be the first sign of infection in older adults",
      "Caregiver burden is a health issue in itself",
    ],
    signs: [
      "New confusion or sudden behavioural change",
      "Repeated falls or unsteady walking",
      "Unintentional weight loss",
      "Social withdrawal or low mood",
    ],
    riskFactors: [
      "Multiple chronic conditions and many medicines",
      "Poor lighting, loose rugs and slippery bathrooms",
      "Isolation and inadequate protein intake",
    ],
    prevention: [
      "Home safety: grab bars, non-slip mats, good lighting",
      "Annual medication review with a doctor or pharmacist",
      "Vision and hearing checks",
      "Protein-adequate diet, vitamin D and balance exercises",
    ],
    selfCare: [
      "Keep a single updated medicine list",
      "Encourage daily walking and simple strength exercises",
      "Maintain regular social contact and routine",
    ],
    seekHelp: [
      "Any fall with head injury or inability to bear weight — urgent",
      "Sudden confusion, chest pain or breathlessness — urgent",
      "Ongoing weight loss, incontinence or memory decline",
    ],
    faqs: [
      { q: "Is memory loss a normal part of ageing?", a: "Mild slowing is common, but progressive memory loss affecting daily life should be assessed by a doctor." },
      { q: "Can medicines be stopped to reduce load?", a: "Only under medical supervision — deprescribing is a clinical decision, never a self-decision." },
    ],
    warning: STD_WARNING,
    resources: [
      { label: "WHO — Ageing and health", href: "https://www.who.int/health-topics/ageing" },
      { label: "NHS — Falls", href: "https://www.nhs.uk/conditions/falls/" },
    ],
  },
  {
    slug: "diabetes-and-hypertension",
    title: "Diabetes & Hypertension Education",
    category: "Chronic Disease Education",
    summary: "How the two commonest chronic conditions work, and what long-term control involves.",
    tags: ["diabetes", "blood pressure", "chronic"],
    detail:
      "Type 2 diabetes and hypertension are lifelong conditions that are usually silent until they damage the heart, kidneys, eyes and nerves. Both respond strongly to diet, activity, weight and, where needed, medication. Control means keeping numbers in an agreed target range consistently, not only when symptoms appear.",
    keyConcepts: [
      "HbA1c reflects average glucose over about three months",
      "Blood pressure targets are individualised by age and comorbidity",
      "Complications: retinopathy, nephropathy, neuropathy, cardiovascular disease",
      "Adherence matters more than any single medicine choice",
    ],
    signs: [
      "Excess thirst, frequent urination, unexplained weight loss (diabetes)",
      "Usually no symptoms at all with high blood pressure",
      "Blurred vision, slow-healing wounds or tingling feet",
    ],
    riskFactors: [
      "Family history, central obesity and inactivity",
      "High salt intake, alcohol and tobacco use",
      "Chronic stress and poor sleep",
    ],
    prevention: [
      "Maintain a healthy waist circumference",
      "Reduce refined carbohydrate and salt intake",
      "150 minutes of activity weekly plus strength work",
      "Screen from mid-adulthood, earlier with family history",
    ],
    selfCare: [
      "Home BP or glucose logging with dates, shown at each visit",
      "Never stop or change a dose without medical advice",
      "Annual eye, kidney and foot checks for diabetes",
    ],
    seekHelp: [
      "Chest pain, weakness on one side or sudden vision loss — emergency",
      "Very high or very low glucose readings",
      "Foot ulcer, numbness or non-healing wound",
    ],
    faqs: [
      { q: "Can type 2 diabetes be reversed?", a: "Some people achieve remission with substantial weight loss and lifestyle change, but this must be managed and monitored medically." },
      { q: "Is medication lifelong?", a: "Often, but doses can change. Only your doctor should adjust or stop treatment." },
    ],
    warning: STD_WARNING,
    resources: [
      { label: "WHO — Diabetes", href: "https://www.who.int/health-topics/diabetes" },
      { label: "WHO — Hypertension", href: "https://www.who.int/health-topics/hypertension" },
    ],
  },
  {
    slug: "first-aid-essentials",
    title: "First Aid & Emergency Awareness",
    category: "First Aid & Emergency Awareness",
    summary: "Recognising emergencies and giving safe first aid until professional help arrives.",
    tags: ["first aid", "emergency", "CPR"],
    detail:
      "First aid buys time. The priorities are the same everywhere: make the scene safe, call for help, check response and breathing, control bleeding, and keep the person warm and monitored. Bystander CPR can double survival in cardiac arrest, and correct pressure stops most external bleeding.",
    keyConcepts: [
      "DRSABC: danger, response, send for help, airway, breathing, circulation",
      "Chest compressions: centre of chest, 100–120 per minute, allow full recoil",
      "Direct firm pressure is the first step for bleeding",
      "Recovery position for an unresponsive person who is breathing",
    ],
    signs: [
      "Unresponsiveness or abnormal breathing — cardiac arrest",
      "Face drooping, arm weakness, speech difficulty — stroke",
      "Crushing chest pain radiating to arm or jaw — heart attack",
      "Severe bleeding, burns or suspected fracture",
    ],
    prevention: [
      "Learn accredited CPR and basic first aid",
      "Keep a stocked first-aid kit at home, in the car and in the lab",
      "Store emergency numbers in every family phone",
      "Know your nearest 24-hour hospital",
    ],
    selfCare: [
      "Cool burns with running water for 20 minutes; do not apply toothpaste or oil",
      "Do not move someone with a suspected spine injury unless in danger",
      "Do not give food or water to an unconscious person",
    ],
    seekHelp: [
      "Call 112 immediately for any suspected cardiac arrest, stroke, heart attack or severe bleeding",
      "Any loss of consciousness, seizure or difficulty breathing",
      "Poisoning, drowning, electrical injury or major burn",
    ],
    faqs: [
      { q: "Can I harm someone by doing CPR?", a: "Doing nothing is far more dangerous. Compression-only CPR is recommended for untrained bystanders." },
      { q: "Do I need to check the pulse first?", a: "No — for untrained rescuers, unresponsive plus abnormal breathing is enough to start compressions." },
    ],
    warning:
      "This is awareness material, not a substitute for hands-on certified first-aid training. In any emergency call 112 (India) or your local emergency number first.",
    resources: [
      { label: "Indian Red Cross Society", href: "https://indianredcross.org/" },
      { label: "American Heart Association — CPR", href: "https://cpr.heart.org/" },
    ],
  },
  {
    slug: "medication-safety",
    title: "Medication Safety & Rational Use",
    category: "Medication Safety",
    summary: "Avoiding self-medication errors, antibiotic misuse, interactions and storage mistakes.",
    tags: ["medicines", "antibiotics", "pharmacy"],
    detail:
      "Medicines help only when the right drug is taken at the right dose, for the right duration, by the right person. Self-medication, sharing prescriptions and stopping antibiotics early are three of the commonest causes of avoidable harm and of antimicrobial resistance.",
    keyConcepts: [
      "Generic versus brand names — same active ingredient",
      "Drug interactions, including with supplements and herbal products",
      "Adverse drug reactions and how to report them",
      "Antimicrobial resistance from incomplete or unnecessary courses",
    ],
    riskFactors: [
      "Buying antibiotics without a prescription",
      "Taking multiple products containing the same ingredient",
      "Using leftover or expired medicines",
      "Not telling the doctor about all medicines being taken",
    ],
    prevention: [
      "Take antibiotics only when prescribed, and complete the course as advised",
      "Keep one updated list of all medicines and supplements",
      "Check expiry dates and store medicines away from heat and children",
      "Confirm dose and timing with the pharmacist before leaving",
    ],
    selfCare: [
      "Use a pill organiser or reminder for long-term medicines",
      "Report suspected side effects to your doctor or the national pharmacovigilance programme",
      "Never share prescription medicines with family members",
    ],
    seekHelp: [
      "Rash, swelling of face or lips, or breathing difficulty after a medicine — emergency",
      "Suspected overdose — go to hospital immediately",
      "New symptoms after starting or changing a medicine",
    ],
    faqs: [
      { q: "Are generics less effective?", a: "Approved generics contain the same active ingredient and must meet equivalence standards." },
      { q: "Can I stop antibiotics once I feel better?", a: "Only if your doctor says so — follow the prescribed duration to avoid relapse and resistance." },
    ],
    warning: STD_WARNING,
    resources: [
      { label: "WHO — Antimicrobial resistance", href: "https://www.who.int/news-room/fact-sheets/detail/antimicrobial-resistance" },
      { label: "Pharmacovigilance Programme of India", href: "https://www.ipc.gov.in/PvPI/pv_home.html" },
    ],
  },
  {
    slug: "healthcare-technology-overview",
    title: "Healthcare Technology Overview",
    category: "Healthcare Technology",
    summary: "EMRs, hospital information systems, interoperability and digital health in India.",
    tags: ["EMR", "digital health", "ABDM"],
    detail:
      "Health technology now underpins clinical work: electronic medical records store history, hospital information systems manage workflow, and national digital health missions aim to connect them. Good implementations reduce duplicate tests and medication errors; bad ones add clicks and burnout, which is why usability and interoperability matter.",
    keyConcepts: [
      "EMR / EHR and structured clinical documentation",
      "Interoperability standards such as HL7 FHIR",
      "Privacy, consent and data protection in health records",
      "Clinical decision support and alert fatigue",
    ],
    prevention: [
      "Use unique patient identifiers to avoid record mix-ups",
      "Role-based access so staff see only what they need",
      "Regular backups and audit logs",
      "Train staff before go-live, not after",
    ],
    selfCare: [
      "Patients: keep digital copies of prescriptions and discharge summaries",
      "Verify what you consent to share when linking health records",
      "Ask for your records — you have a right to them",
    ],
    seekHelp: [
      "Suspected error in your medical record — ask the hospital to correct it",
      "Any suspicion your health data has been misused",
    ],
    faqs: [
      { q: "What is ABDM?", a: "The Ayushman Bharat Digital Mission is India's programme to create interoperable digital health IDs and records." },
      { q: "Is an EMR safer than paper?", a: "Generally yes for legibility, backup and alerts — provided access controls and training are in place." },
    ],
    warning: STD_WARNING,
    resources: [
      { label: "Ayushman Bharat Digital Mission", href: "https://abdm.gov.in/" },
      { label: "HL7 FHIR", href: "https://www.hl7.org/fhir/" },
    ],
  },
  {
    slug: "medical-ai-basics",
    title: "Medical AI — What It Can and Cannot Do",
    category: "Medical AI",
    summary: "How AI is used in imaging, triage and documentation — plus limits, bias and regulation.",
    tags: ["AI", "machine learning", "imaging"],
    detail:
      "AI in medicine is strongest at pattern tasks: detecting diabetic retinopathy in retinal photos, flagging suspicious chest X-rays, or drafting clinical notes. It is weakest where context, examination and accountability matter. Models can inherit bias from their training data and degrade when used on populations they were not trained on, so clinical validation and human oversight are mandatory.",
    keyConcepts: [
      "Sensitivity, specificity and why they trade off",
      "Training, validation and external test datasets",
      "Dataset bias and generalisation failure",
      "Regulatory approval and human-in-the-loop accountability",
    ],
    riskFactors: [
      "Deploying a model without local validation",
      "Automation bias — trusting the model over the examination",
      "Using general chatbots for diagnosis",
    ],
    prevention: [
      "Validate models on local patient data before clinical use",
      "Keep a qualified clinician responsible for every decision",
      "Monitor performance after deployment for drift",
      "Document data provenance and consent",
    ],
    selfCare: [
      "Patients: use AI tools for understanding terms, not for diagnosis",
      "Always confirm AI-generated health information with a clinician",
    ],
    seekHelp: [
      "Any symptom you are worried about — see a doctor rather than an AI tool",
      "Never delay emergency care to consult an app",
    ],
    faqs: [
      { q: "Can an AI diagnose me?", a: "No. AI tools can inform and triage, but diagnosis is a clinical act requiring a qualified professional." },
      { q: "Will AI replace radiologists?", a: "Current evidence suggests augmentation rather than replacement — AI handles screening volume while clinicians handle judgement and accountability." },
    ],
    warning:
      "AI tools, including this platform's assistant, provide educational information only. They cannot diagnose, prescribe or replace a qualified healthcare professional.",
    resources: [
      { label: "WHO — Ethics and governance of AI for health", href: "https://www.who.int/publications/i/item/9789240029200" },
      { label: "FDA — AI-enabled medical devices", href: "https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-enabled-medical-devices" },
    ],
  },
  {
    slug: "telemedicine-guide",
    title: "Telemedicine — Using Remote Care Well",
    category: "Telemedicine",
    summary: "When a video consult is appropriate, how to prepare and what the Indian guidelines say.",
    tags: ["telemedicine", "teleconsultation", "remote care"],
    detail:
      "Telemedicine works well for follow-ups, medicine reviews, reports discussion, mental health counselling and rural access. It works poorly when examination is essential or when the situation is an emergency. India's Telemedicine Practice Guidelines set out what registered medical practitioners may prescribe remotely and how consent and records must be handled.",
    keyConcepts: [
      "Synchronous (video/phone) versus asynchronous (store-and-forward) care",
      "Consent, identification and record-keeping requirements",
      "Prescription categories permitted in teleconsultation",
      "Escalation pathway to in-person care",
    ],
    prevention: [
      "Choose platforms used by registered practitioners",
      "Keep reports, medicine list and vitals ready before the call",
      "Ensure a quiet, private space with a stable connection",
      "Save the prescription and consultation summary",
    ],
    selfCare: [
      "Measure BP, temperature or glucose before the consult if relevant",
      "Write your three main questions in advance",
      "Confirm the follow-up plan before ending the call",
    ],
    seekHelp: [
      "Chest pain, breathlessness, severe bleeding or trauma — go to hospital, do not teleconsult",
      "Symptoms that need physical examination",
      "No improvement after a remote consultation",
    ],
    faqs: [
      { q: "Is a teleconsultation prescription valid?", a: "Yes, when issued by a registered medical practitioner within the categories allowed by the national telemedicine guidelines." },
      { q: "Is telemedicine cheaper?", a: "Often, and it saves travel time — but it is not appropriate for every problem." },
    ],
    warning: STD_WARNING,
    resources: [
      { label: "Telemedicine Practice Guidelines (India)", href: "https://www.mohfw.gov.in/pdf/Telemedicine.pdf" },
      { label: "WHO — Digital health", href: "https://www.who.int/health-topics/digital-health" },
    ],
  },
  {
    slug: "home-health-monitoring",
    title: "Home Health Monitoring",
    category: "Health Monitoring",
    summary: "Measuring BP, glucose, SpO2 and weight correctly, and interpreting trends not single readings.",
    tags: ["monitoring", "wearables", "vitals"],
    detail:
      "Home monitoring improves control of hypertension and diabetes — but only when devices are validated and technique is correct. A single reading rarely matters; the trend across days does. Consumer wearables are useful for activity and sleep patterns and are not diagnostic instruments.",
    keyConcepts: [
      "Validated devices and periodic calibration",
      "Correct technique: cuff size, arm position, rest before measuring",
      "Trend analysis versus single-value anxiety",
      "Wearables measure estimates, not clinical-grade values",
    ],
    prevention: [
      "Buy clinically validated BP monitors and glucometers",
      "Measure BP after 5 minutes rest, back supported, arm at heart level",
      "Log readings with date, time and context",
      "Take the device to your appointment to check accuracy",
    ],
    selfCare: [
      "Measure at consistent times of day",
      "Do not adjust medication based on one reading",
      "Share your log with the doctor rather than a verbal summary",
    ],
    seekHelp: [
      "BP above 180/120 with symptoms — emergency",
      "SpO2 persistently below 94% at rest — urgent assessment",
      "Repeated very high or very low glucose readings",
    ],
    faqs: [
      { q: "Are smartwatch ECGs reliable?", a: "They can flag possible atrial fibrillation but need confirmation with a clinical ECG." },
      { q: "How often should I measure BP at home?", a: "Follow your doctor's plan — commonly twice daily for a week before a review, rather than continuously." },
    ],
    warning: STD_WARNING,
    resources: [
      { label: "WHO — Hypertension fact sheet", href: "https://www.who.int/news-room/fact-sheets/detail/hypertension" },
      { label: "NHS — Blood pressure test", href: "https://www.nhs.uk/conditions/blood-pressure-test/" },
    ],
  },
  {
    slug: "patient-education-and-rights",
    title: "Patient Education & Rights",
    category: "Patient Education",
    summary: "Informed consent, asking the right questions, health literacy and your rights as a patient.",
    tags: ["patient rights", "consent", "health literacy"],
    detail:
      "Patients who understand their condition adhere better and have better outcomes. Health literacy is a shared responsibility: clinicians must explain in plain language, and patients should ask until they understand. Informed consent, access to records and a second opinion are rights, not favours.",
    keyConcepts: [
      "Informed consent: benefits, risks, alternatives and the option to decline",
      "Teach-back: repeat the plan in your own words to confirm understanding",
      "Right to medical records and to a second opinion",
      "Confidentiality of health information",
    ],
    prevention: [
      "Ask: what is my diagnosis, what are my options, what happens if I wait?",
      "Bring a family member for important consultations",
      "Request written instructions for medicines and follow-up",
      "Keep discharge summaries and reports organised",
    ],
    selfCare: [
      "Use trusted sources — WHO, NHS, CDC, MoHFW — not social media forums",
      "Check that health information is dated and referenced",
      "Track questions between visits in a notebook",
    ],
    seekHelp: [
      "You do not understand your treatment plan",
      "You want a second opinion before major surgery",
      "You believe your rights or privacy have been breached",
    ],
    faqs: [
      { q: "Can I refuse a treatment?", a: "Yes. A competent adult can decline treatment after being informed of the consequences." },
      { q: "Can I get copies of my records?", a: "Yes — hospitals are expected to provide medical records on request within a reasonable time." },
    ],
    warning: STD_WARNING,
    resources: [
      { label: "WHO — Patient safety", href: "https://www.who.int/news-room/fact-sheets/detail/patient-safety" },
      { label: "NHS — Your health records", href: "https://www.nhs.uk/nhs-services/gps/health-records/" },
    ],
  },
];

export const healthGuideBySlug = (slug: string) =>
  healthGuides.find((guide) => guide.slug === slug);

export const relatedHealthGuides = (guide: HealthGuide, limit = 3) =>
  healthGuides
    .filter((g) => g.slug !== guide.slug)
    .map((g) => ({
      guide: g,
      score:
        (g.category === guide.category ? 3 : 0) +
        g.tags.filter((t) => guide.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.guide);
