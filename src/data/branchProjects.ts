/**
 * Detailed, branch-wise project build guides.
 *
 * To add a project: append an entry with an existing branch slug
 * (see src/data/branches.ts). The UI renders every field automatically.
 */

export type ProjectDifficulty = "beginner" | "intermediate" | "advanced";

export interface BranchProject {
  slug: string;
  branch: string;
  title: string;
  difficulty: ProjectDifficulty;
  /** One-line objective. */
  aim: string;
  description: string;
  toolsRequired: string[];
  /** Empty for pure-software projects. */
  componentsRequired: string[];
  steps: string[];
  outcome: string;
  estimatedDuration: string;
}

const P = (p: BranchProject) => p;

export const branchProjects: BranchProject[] = [
  // ── ECE ───────────────────────────────────────────────────────────────
  P({
    slug: "ece-iot-weather-station",
    branch: "ece",
    title: "IoT Weather Monitoring Station",
    difficulty: "beginner",
    aim: "Measure temperature, humidity and pressure and publish them to a live cloud dashboard.",
    description:
      "An ESP32 reads environmental sensors over I2C, formats the readings as JSON and pushes them to a cloud broker every minute. A simple web dashboard plots the history.",
    toolsRequired: ["Arduino IDE / PlatformIO", "ESP32 board package", "ThingSpeak or MQTT broker", "Serial monitor"],
    componentsRequired: ["ESP32 DevKit v1", "DHT22 temperature & humidity sensor", "BMP280 pressure sensor", "Breadboard + jumper wires", "5V micro-USB supply"],
    steps: [
      "Install the Arduino IDE and add the ESP32 board URL in Preferences, then install the ESP32 core.",
      "Wire DHT22 data to GPIO4 and BMP280 SDA/SCL to GPIO21/GPIO22 with 3.3V and GND common.",
      "Write a sketch that initialises both sensors and prints readings to the serial monitor; confirm sane values.",
      "Connect the ESP32 to Wi-Fi using WiFi.begin() and verify the IP address in the serial log.",
      "Create a ThingSpeak channel (or MQTT topic) and push the three fields every 60 seconds.",
      "Add reconnect logic and a watchdog so a dropped network does not freeze the loop.",
      "Enclose the build, run it for 24 hours and export the CSV to check for drift or dropouts.",
    ],
    outcome:
      "You learn I2C sensor interfacing, Wi-Fi networking on microcontrollers, and end-to-end IoT data pipelines.",
    estimatedDuration: "1–2 weeks",
  }),
  P({
    slug: "ece-fpga-traffic-controller",
    branch: "ece",
    title: "FPGA Traffic Light Controller (Verilog FSM)",
    difficulty: "advanced",
    aim: "Design and verify a four-way traffic signal controller as a synthesizable finite state machine.",
    description:
      "A Moore FSM in Verilog sequences the signals of a four-way junction with pedestrian request handling, simulated in a testbench and deployed to an FPGA board.",
    toolsRequired: ["Xilinx Vivado or Intel Quartus", "ModelSim / Vivado Simulator", "Verilog HDL"],
    componentsRequired: ["FPGA board (Basys 3 / DE10-Lite)", "LEDs and resistors (or on-board LEDs)", "Push buttons for pedestrian request"],
    steps: [
      "Draw the state diagram: NS-green, NS-yellow, EW-green, EW-yellow plus a pedestrian-all-red state.",
      "Write the state register, next-state logic and output logic in three separate always blocks.",
      "Add a clock divider that turns the 100 MHz board clock into a 1 Hz tick.",
      "Write a testbench that drives reset, clock and the pedestrian button; check waveforms for illegal transitions.",
      "Create the XDC/QSF constraint file mapping outputs to LEDs and inputs to buttons.",
      "Synthesise, implement and inspect the timing report; fix any negative slack.",
      "Program the board and validate every transition physically, including the pedestrian override.",
    ],
    outcome:
      "You gain practical RTL design, FSM modelling, simulation-based verification and FPGA implementation flow experience.",
    estimatedDuration: "3–4 weeks",
  }),

  // ── CSE ───────────────────────────────────────────────────────────────
  P({
    slug: "cse-url-shortener",
    branch: "cse",
    title: "Full-Stack URL Shortener with Analytics",
    difficulty: "beginner",
    aim: "Build a web service that shortens URLs and tracks click analytics per link.",
    description:
      "A REST API issues short codes, stores mappings in a database and records each redirect with timestamp and referrer, surfaced in a small dashboard.",
    toolsRequired: ["Node.js + TypeScript", "PostgreSQL", "Postman or curl", "Git & GitHub", "Any cloud host"],
    componentsRequired: [],
    steps: [
      "Model the schema: links(id, code, target_url, created_at) and clicks(id, link_id, ts, referrer).",
      "Implement POST /api/links that validates the URL and generates a collision-free base62 code.",
      "Implement GET /:code to look up the target, insert a click row and issue a 302 redirect.",
      "Add an index on links.code and measure lookup latency with 100k seeded rows.",
      "Build a dashboard page listing links with total clicks and a 7-day sparkline.",
      "Add rate limiting and URL blocklisting to prevent abuse.",
      "Write integration tests, then deploy and verify with real traffic.",
    ],
    outcome:
      "You learn REST API design, relational modelling, indexing for performance, and deployment of a real service.",
    estimatedDuration: "2 weeks",
  }),
  P({
    slug: "cse-distributed-cache",
    branch: "cse",
    title: "Distributed In-Memory Cache with Consistent Hashing",
    difficulty: "advanced",
    aim: "Implement a multi-node key-value cache that distributes keys using consistent hashing.",
    description:
      "Several cache nodes form a ring; a client library routes GET/SET to the correct node, replicates to a successor and handles node join/leave with minimal key movement.",
    toolsRequired: ["Go or Java", "Docker & docker-compose", "wrk or hey (load testing)", "Prometheus + Grafana (optional)"],
    componentsRequired: [],
    steps: [
      "Implement an LRU store with TTL eviction as the single-node engine.",
      "Expose a TCP or HTTP protocol supporting GET, SET, DEL and STATS.",
      "Build a consistent-hash ring with virtual nodes and unit-test key distribution balance.",
      "Write a client that resolves a key to its node and retries the successor on failure.",
      "Add replication factor 2 with asynchronous write propagation.",
      "Run three nodes in docker-compose; kill one under load and measure hit-rate degradation.",
      "Benchmark throughput and latency, then document the consistency trade-offs you accepted.",
    ],
    outcome:
      "You understand distributed systems fundamentals: partitioning, replication, failure handling and performance measurement.",
    estimatedDuration: "4–6 weeks",
  }),

  // ── IT ────────────────────────────────────────────────────────────────
  P({
    slug: "it-ci-cd-pipeline",
    branch: "it",
    title: "End-to-End CI/CD Pipeline for a Containerised App",
    difficulty: "intermediate",
    aim: "Automate build, test, containerisation and deployment of a web app on every push.",
    description:
      "A GitHub Actions workflow lints, tests and builds a Docker image, pushes it to a registry and rolls it out to a cloud host with health checks and rollback.",
    toolsRequired: ["Git & GitHub", "GitHub Actions", "Docker", "A container registry", "Terraform (optional)"],
    componentsRequired: [],
    steps: [
      "Containerise the app with a multi-stage Dockerfile and verify the image runs locally.",
      "Add a workflow triggered on pull_request that installs dependencies, lints and runs tests.",
      "Add a build job that tags the image with the commit SHA and pushes it to the registry.",
      "Store registry and host credentials as encrypted repository secrets — never in the repo.",
      "Add a deploy job gated on the main branch that pulls the new tag and restarts the service.",
      "Add a health-check step and automatic rollback to the previous tag on failure.",
      "Document the pipeline and measure lead time from commit to production.",
    ],
    outcome:
      "You learn DevOps automation, container workflows, secret management and safe deployment practices.",
    estimatedDuration: "2–3 weeks",
  }),
  P({
    slug: "it-siem-log-pipeline",
    branch: "it",
    title: "Log Aggregation & Alerting Pipeline",
    difficulty: "advanced",
    aim: "Collect logs from multiple services into a searchable store with automated alerts.",
    description:
      "Agents ship structured logs into OpenSearch through a parsing layer; dashboards visualise error rates and alert rules notify on anomalies.",
    toolsRequired: ["Docker Compose", "Fluent Bit / Logstash", "OpenSearch + Dashboards", "Python (log generator)"],
    componentsRequired: [],
    steps: [
      "Stand up OpenSearch and Dashboards with docker-compose and secure the admin user.",
      "Emit structured JSON logs from two sample services with request IDs and severity.",
      "Configure Fluent Bit to tail, parse and enrich logs before forwarding.",
      "Define an index template with correct field mappings and a retention policy.",
      "Build dashboards for error rate, p95 latency and top failing endpoints.",
      "Create alert rules (for example error rate > 5% for 5 minutes) with a webhook destination.",
      "Simulate an incident, confirm the alert fires and write a short post-mortem.",
    ],
    outcome:
      "You gain observability engineering skills: structured logging, indexing, dashboarding and alert design.",
    estimatedDuration: "3–4 weeks",
  }),

  // ── EEE ───────────────────────────────────────────────────────────────
  P({
    slug: "eee-smart-energy-meter",
    branch: "eee",
    title: "Smart Energy Meter with Cloud Logging",
    difficulty: "intermediate",
    aim: "Measure real household power consumption and log kWh usage to the cloud.",
    description:
      "A current transformer and voltage sensor feed an ESP32, which computes RMS values, real power and energy, then uploads readings and raises a threshold alert.",
    toolsRequired: ["Arduino IDE", "EmonLib library", "Multimeter", "ThingSpeak / Firebase"],
    componentsRequired: ["ESP32", "SCT-013 current transformer", "ZMPT101B voltage sensor", "Burden resistor & bias network", "16x2 I2C LCD", "Insulated enclosure"],
    steps: [
      "Study AC safety rules and have a lab supervisor verify your wiring before mains connection.",
      "Build the CT burden and bias circuit so the AC waveform sits mid-rail at 1.65V.",
      "Calibrate the current and voltage channels against a multimeter using known loads.",
      "Compute Vrms, Irms, real power and power factor with EmonLib; display on the LCD.",
      "Integrate power over time to accumulate energy in kWh and persist it to flash.",
      "Upload readings every 30 seconds and chart daily consumption in the cloud dashboard.",
      "Add an over-consumption alert and validate accuracy against the utility meter for a week.",
    ],
    outcome:
      "You learn AC measurement, sensor calibration, power computation and safe mains-side instrumentation.",
    estimatedDuration: "3 weeks",
  }),
  P({
    slug: "eee-solar-mppt",
    branch: "eee",
    title: "Solar MPPT Charge Controller",
    difficulty: "advanced",
    aim: "Extract maximum power from a solar panel using a perturb-and-observe MPPT buck converter.",
    description:
      "A synchronous buck converter driven by PWM tracks the panel's maximum power point while safely charging a 12V battery with current and voltage limits.",
    toolsRequired: ["MATLAB/Simulink or LTspice", "STM32CubeIDE", "Oscilloscope", "Electronic load"],
    componentsRequired: ["Solar panel (20–50W)", "STM32 or Arduino Nano", "MOSFETs + gate driver", "Inductor, capacitors", "INA219 current sensor", "12V lead-acid or LiFePO4 battery"],
    steps: [
      "Simulate the buck stage in LTspice/Simulink and size the inductor and capacitors for your ripple target.",
      "Assemble the power stage on a PCB or perfboard with short, thick current loops.",
      "Verify open-loop PWM control and measure switching waveforms on the scope.",
      "Add panel voltage and current sensing, then compute instantaneous power in firmware.",
      "Implement the perturb-and-observe loop adjusting duty cycle every 100 ms.",
      "Add battery protection: bulk/absorb/float stages, over-voltage and over-temperature cutoff.",
      "Compare harvested energy against a direct PWM controller over a full sunny day.",
    ],
    outcome:
      "You gain power-electronics design, control-loop implementation and embedded firmware skills for renewable systems.",
    estimatedDuration: "5–6 weeks",
  }),

  // ── Mechanical ────────────────────────────────────────────────────────
  P({
    slug: "mech-gearbox-design",
    branch: "mechanical",
    title: "Two-Stage Reduction Gearbox — Design & FEA",
    difficulty: "intermediate",
    aim: "Design a two-stage spur gearbox for a given torque and validate it with finite element analysis.",
    description:
      "Starting from a power and reduction requirement, you size gears and shafts analytically, model the assembly in CAD and confirm stresses with FEA before producing drawings.",
    toolsRequired: ["SolidWorks or Fusion 360", "ANSYS or SolidWorks Simulation", "MS Excel / MATLAB", "AGMA standards reference"],
    componentsRequired: [],
    steps: [
      "Fix the design brief: input power, input speed, required reduction ratio and service factor.",
      "Select module and tooth counts; check bending and contact stress using AGMA equations in a spreadsheet.",
      "Size the shafts for combined bending and torsion, then select bearings from a manufacturer catalogue.",
      "Model each gear, shaft, housing and bearing seat in CAD and mate the full assembly.",
      "Run an interference and motion study to confirm the ratio and clearance.",
      "Perform static FEA on the most loaded gear tooth and shaft; refine the mesh until results converge.",
      "Produce manufacturing drawings with GD&T, tolerances, surface finish and a bill of materials.",
    ],
    outcome:
      "You learn machine-element design, CAD assembly modelling, FEA validation and production drawing standards.",
    estimatedDuration: "4 weeks",
  }),
  P({
    slug: "mech-cfd-heat-exchanger",
    branch: "mechanical",
    title: "CFD Analysis of a Shell-and-Tube Heat Exchanger",
    difficulty: "advanced",
    aim: "Predict and improve the thermal effectiveness of a heat exchanger using CFD.",
    description:
      "A baseline exchanger geometry is meshed and solved for conjugate heat transfer, then baffle spacing is varied to study the effectiveness versus pressure-drop trade-off.",
    toolsRequired: ["ANSYS Fluent or OpenFOAM", "SpaceClaim / SolidWorks", "ANSYS Meshing", "Excel for post-processing"],
    componentsRequired: [],
    steps: [
      "Calculate the baseline design by the LMTD and effectiveness-NTU methods as a sanity reference.",
      "Model the shell, tube bundle and baffles, then extract the fluid domains.",
      "Mesh with inflation layers sized for the target y+ and run a mesh-independence study.",
      "Set boundary conditions: mass-flow inlets, pressure outlet, conjugate walls and the k-omega SST model.",
      "Solve to convergence and monitor outlet temperatures as the stopping criterion.",
      "Post-process temperature and velocity fields; compute effectiveness and shell-side pressure drop.",
      "Repeat for three baffle spacings and plot effectiveness against pumping power to pick the best design.",
    ],
    outcome:
      "You gain CFD workflow competence — meshing, turbulence modelling, convergence judgement and design trade-off analysis.",
    estimatedDuration: "5 weeks",
  }),

  // ── Civil ─────────────────────────────────────────────────────────────
  P({
    slug: "civil-g3-building-design",
    branch: "civil",
    title: "G+3 RCC Building — Analysis, Design & Estimation",
    difficulty: "intermediate",
    aim: "Analyse, design and cost a four-storey reinforced concrete residential building to IS codes.",
    description:
      "An architectural plan is converted into a structural model, analysed for gravity and seismic loads, designed member by member and finally quantified into a BOQ.",
    toolsRequired: ["AutoCAD", "STAAD.Pro or ETABS", "MS Excel", "IS 456, IS 875, IS 1893 codes"],
    componentsRequired: [],
    steps: [
      "Draw the architectural and structural grid plans in AutoCAD and fix column positions.",
      "Build the 3D frame model with correct member sizes, supports and slab meshing.",
      "Apply dead, live, wind and seismic loads per IS 875 and IS 1893, then define load combinations.",
      "Run the analysis and check drift, deflection and support reactions against code limits.",
      "Design beams, columns, slabs and footings; prepare reinforcement detailing sheets.",
      "Extract quantities of concrete, steel and formwork into a measurement sheet.",
      "Apply current SOR rates to produce a full estimate and abstract of cost.",
    ],
    outcome:
      "You learn structural modelling, IS-code design checks, reinforcement detailing and quantity estimation.",
    estimatedDuration: "5–6 weeks",
  }),
  P({
    slug: "civil-water-quality-gis",
    branch: "civil",
    title: "GIS-Based Groundwater Quality Mapping",
    difficulty: "advanced",
    aim: "Map spatial variation of groundwater quality across a study area and identify unsafe zones.",
    description:
      "Field or published water samples are geo-referenced, interpolated across the region and combined into a water quality index rendered as thematic maps.",
    toolsRequired: ["QGIS or ArcGIS", "Excel / Python (pandas)", "GPS app", "Survey of India / open datasets"],
    componentsRequired: ["Water sampling bottles", "pH and TDS meters", "GPS-enabled phone"],
    steps: [
      "Define the study boundary and select 25–30 sampling points on a grid.",
      "Collect samples with GPS coordinates and test pH, TDS, hardness, fluoride and nitrate.",
      "Tabulate results and compute a Water Quality Index against IS 10500 limits.",
      "Import the boundary shapefile and the sample CSV into QGIS as a point layer.",
      "Interpolate each parameter with IDW or kriging and clip the rasters to the boundary.",
      "Reclassify into safe / marginal / unsafe zones and overlay land use for interpretation.",
      "Compose print layouts with legend, scale bar and north arrow, and write recommendations.",
    ],
    outcome:
      "You gain field sampling discipline, GIS spatial interpolation skills and environmental data interpretation.",
    estimatedDuration: "4 weeks",
  }),

  // ── Chemical ──────────────────────────────────────────────────────────
  P({
    slug: "chem-distillation-simulation",
    branch: "chemical",
    title: "Distillation Column Design & Simulation",
    difficulty: "intermediate",
    aim: "Design a binary distillation column and validate the design in a process simulator.",
    description:
      "A methanol–water separation is designed by the McCabe–Thiele method, then modelled rigorously in a simulator to compare stage count, reflux and energy duty.",
    toolsRequired: ["Aspen Plus or DWSIM", "MATLAB / Excel", "Perry's Handbook"],
    componentsRequired: [],
    steps: [
      "Fix feed composition, flow rate and required distillate and bottoms purities.",
      "Plot the equilibrium curve and apply McCabe–Thiele to get minimum reflux and theoretical stages.",
      "Choose an operating reflux ratio (typically 1.2–1.5 times minimum) and finalise stage count.",
      "Build the same case in DWSIM/Aspen with the NRTL property package and a RadFrac column.",
      "Compare simulated stages and duties against your hand calculation and explain the gap.",
      "Run sensitivity analysis on reflux ratio versus reboiler duty and stage count.",
      "Size the column diameter and select tray type, then summarise the final design sheet.",
    ],
    outcome:
      "You learn separation-process design, thermodynamic property selection and simulator-based validation.",
    estimatedDuration: "4 weeks",
  }),
  P({
    slug: "chem-biodiesel-reactor",
    branch: "chemical",
    title: "Biodiesel Production from Waste Cooking Oil",
    difficulty: "advanced",
    aim: "Produce and characterise biodiesel by transesterification and optimise the reaction yield.",
    description:
      "Waste oil is pre-treated, transesterified with methanol and KOH at varied conditions, then washed, dried and tested against fuel standards.",
    toolsRequired: ["Lab fume hood", "Design of Experiments (Minitab/Excel)", "GC or titration setup"],
    componentsRequired: ["Waste cooking oil", "Methanol", "KOH catalyst", "Three-neck flask with condenser", "Magnetic stirrer hotplate", "Separating funnel", "Viscometer"],
    steps: [
      "Filter and dry the feedstock, then titrate to find free fatty acid content.",
      "If FFA exceeds 2%, run acid esterification pre-treatment before the main reaction.",
      "Set up the reflux apparatus and react at 60°C with a 6:1 methanol-to-oil molar ratio and 1% KOH.",
      "Vary catalyst loading and reaction time in a small factorial design to map yield.",
      "Settle and separate glycerol, then water-wash and dry the biodiesel phase.",
      "Measure density, kinematic viscosity, flash point and acid value against ASTM D6751.",
      "Report the optimum condition with yield and quality data, plus a simple cost estimate.",
    ],
    outcome:
      "You learn reaction engineering, experimental design, separation practice and fuel characterisation.",
    estimatedDuration: "6 weeks",
  }),

  // ── Biotechnology ─────────────────────────────────────────────────────
  P({
    slug: "biotech-plasmid-cloning",
    branch: "biotechnology",
    title: "Gene Cloning and Expression in E. coli",
    difficulty: "intermediate",
    aim: "Clone a target gene into an expression vector and confirm protein expression.",
    description:
      "A gene of interest is amplified, ligated into a plasmid, transformed into competent cells and induced, with expression checked on SDS-PAGE.",
    toolsRequired: ["SnapGene / Benchling", "Thermocycler", "Gel electrophoresis unit", "Spectrophotometer"],
    componentsRequired: ["Template DNA and primers", "Taq/Phusion polymerase mix", "Restriction enzymes and ligase", "pET expression vector", "Competent E. coli BL21", "IPTG, antibiotics, LB media"],
    steps: [
      "Design primers with restriction sites in SnapGene and check for hairpins and dimers.",
      "Amplify the insert by PCR, then confirm the band size on a 1% agarose gel.",
      "Digest insert and vector with the same enzyme pair, gel-purify and ligate overnight.",
      "Transform into competent cells, plate on selective media and count colonies against controls.",
      "Screen colonies by colony PCR and confirm a positive clone by sequencing.",
      "Induce expression with IPTG, sample at intervals and lyse the cells.",
      "Run SDS-PAGE to confirm the induced band and estimate expression level.",
    ],
    outcome:
      "You gain core molecular-biology technique: primer design, cloning, transformation and protein analysis.",
    estimatedDuration: "4–5 weeks",
  }),
  P({
    slug: "biotech-bioinformatics-pipeline",
    branch: "biotechnology",
    title: "RNA-Seq Differential Expression Pipeline",
    difficulty: "advanced",
    aim: "Identify differentially expressed genes between two conditions from public RNA-seq data.",
    description:
      "Raw reads from a public dataset are quality-checked, aligned or pseudo-aligned, quantified and analysed statistically, ending in enrichment interpretation.",
    toolsRequired: ["Linux shell", "FastQC, Trimmomatic", "HISAT2 or Salmon", "R with DESeq2", "g:Profiler / DAVID"],
    componentsRequired: [],
    steps: [
      "Download a paired-condition dataset from SRA/GEO and record the experimental design.",
      "Run FastQC on raw reads and trim adapters and low-quality tails with Trimmomatic.",
      "Build the reference index and quantify transcripts with Salmon (or align with HISAT2 + featureCounts).",
      "Import counts into R, filter low-count genes and normalise with DESeq2.",
      "Inspect PCA and sample-distance plots to detect batch effects or outliers.",
      "Extract significant genes at adjusted p < 0.05 and plot volcano and heatmap figures.",
      "Run GO and pathway enrichment on the gene list and interpret the biology.",
    ],
    outcome:
      "You learn reproducible bioinformatics workflows, statistical testing on omics data and biological interpretation.",
    estimatedDuration: "4 weeks",
  }),

  // ── Aerospace ─────────────────────────────────────────────────────────
  P({
    slug: "aero-airfoil-cfd",
    branch: "aerospace",
    title: "Airfoil Aerodynamic Analysis (XFOIL + CFD)",
    difficulty: "intermediate",
    aim: "Characterise lift and drag of an airfoil across angle of attack and validate CFD against panel results.",
    description:
      "A NACA airfoil is analysed with a panel method and then with RANS CFD, comparing polars, stall behaviour and pressure distributions.",
    toolsRequired: ["XFOIL", "ANSYS Fluent or OpenFOAM", "Python/Matplotlib", "Airfoil Tools database"],
    componentsRequired: [],
    steps: [
      "Select an airfoil and Reynolds number matching a real UAV wing section.",
      "Run XFOIL sweeps from -5° to 20° and export Cl, Cd and Cm polars.",
      "Create the 2D C-grid domain around the airfoil with 20-chord far-field extent.",
      "Mesh with a first-cell height for y+ ≈ 1 and run mesh independence at one angle.",
      "Solve steady RANS with the Spalart–Allmaras model at each angle of attack.",
      "Plot CFD versus XFOIL polars and pressure coefficient distributions and explain differences near stall.",
      "Summarise the usable operating range and recommended cruise angle of attack.",
    ],
    outcome:
      "You learn aerodynamic analysis methods, meshing for external flow and critical comparison of numerical models.",
    estimatedDuration: "4 weeks",
  }),
  P({
    slug: "aero-model-rocket",
    branch: "aerospace",
    title: "Model Rocket with Telemetry and Recovery",
    difficulty: "advanced",
    aim: "Design, simulate, build and fly a model rocket that logs flight data and recovers safely.",
    description:
      "A single-stage rocket is simulated for stability and apogee, built from composite tubing, instrumented with an altimeter-logger and flown under supervision.",
    toolsRequired: ["OpenRocket", "Fusion 360", "Arduino IDE", "Python for data analysis"],
    componentsRequired: ["Body tube, nose cone and fins", "Certified motor (class as permitted)", "Arduino Nano + BMP280 + MPU6050", "SD card module and LiPo cell", "Parachute, shock cord and ejection charge"],
    steps: [
      "Simulate the airframe in OpenRocket; iterate fin size until the stability margin is 1.5–2 calibres.",
      "Design and 3D-print the nose cone and fin can, then bond them to the body tube.",
      "Build the avionics bay: log altitude and acceleration at 50 Hz to the SD card.",
      "Bench-test the recovery deployment and confirm the ejection timing against simulated apogee.",
      "Do a full pre-flight checklist including centre-of-gravity and centre-of-pressure verification.",
      "Launch from an approved field with supervision and recover the airframe.",
      "Post-process the logged data and compare measured apogee and velocity with the simulation.",
    ],
    outcome:
      "You gain flight-vehicle design, simulation validation, embedded telemetry and safety-critical test discipline.",
    estimatedDuration: "6–8 weeks",
  }),

  // ── AI & DS ───────────────────────────────────────────────────────────
  P({
    slug: "aids-churn-prediction",
    branch: "ai-ds",
    title: "Customer Churn Prediction with Explainability",
    difficulty: "beginner",
    aim: "Predict which customers will churn and explain the drivers behind each prediction.",
    description:
      "A tabular dataset is cleaned and engineered, several models are compared with proper validation, and SHAP is used to explain global and per-customer behaviour.",
    toolsRequired: ["Python", "pandas, scikit-learn, XGBoost", "SHAP", "Jupyter / Colab", "Streamlit"],
    componentsRequired: [],
    steps: [
      "Load the dataset, profile missing values and check the class imbalance ratio.",
      "Engineer tenure buckets, usage ratios and contract features; encode categoricals.",
      "Split with stratified train/validation/test and fix the random seed for reproducibility.",
      "Baseline with logistic regression, then compare random forest and XGBoost using ROC-AUC and PR-AUC.",
      "Tune hyperparameters with cross-validated search and handle imbalance with class weights.",
      "Compute SHAP values for global importance and individual waterfall explanations.",
      "Wrap the best model in a Streamlit app that scores a customer and shows the top three reasons.",
    ],
    outcome:
      "You learn the complete supervised ML workflow, honest evaluation and model explainability.",
    estimatedDuration: "2–3 weeks",
  }),
  P({
    slug: "aids-rag-assistant",
    branch: "ai-ds",
    title: "RAG Study Assistant over Your Own Notes",
    difficulty: "advanced",
    aim: "Build a retrieval-augmented chatbot that answers questions strictly from your course material.",
    description:
      "PDFs are chunked and embedded into a vector store; a retriever feeds an LLM with citations, and answers are evaluated for faithfulness.",
    toolsRequired: ["Python", "LangChain or LlamaIndex", "pgvector / FAISS", "An LLM API", "FastAPI + React"],
    componentsRequired: [],
    steps: [
      "Ingest PDFs, extract text and split into 500–800 token chunks with overlap and metadata.",
      "Generate embeddings and store them with source page numbers in the vector database.",
      "Implement hybrid retrieval (vector + keyword) and rerank the top candidates.",
      "Prompt the LLM to answer only from retrieved context and to cite page numbers.",
      "Add refusal behaviour when retrieval confidence is low to prevent hallucination.",
      "Build a small evaluation set and score answer faithfulness and retrieval recall.",
      "Ship a chat UI showing the cited chunks alongside each answer.",
    ],
    outcome:
      "You learn embeddings, retrieval design, prompt grounding and evaluation of generative systems.",
    estimatedDuration: "4–5 weeks",
  }),

  // ── Cyber Security ────────────────────────────────────────────────────
  P({
    slug: "cyber-vuln-lab",
    branch: "cyber-security",
    title: "Vulnerable Web App Lab & Penetration Test Report",
    difficulty: "intermediate",
    aim: "Exploit a deliberately vulnerable application in an isolated lab and document the findings professionally.",
    description:
      "An intentionally vulnerable app runs in a private VM network; you enumerate, exploit and then write remediation guidance in a standard report format.",
    toolsRequired: ["VirtualBox / VMware", "Kali Linux", "Burp Suite Community", "Nmap, sqlmap", "OWASP Top 10 reference"],
    componentsRequired: [],
    steps: [
      "Build a host-only virtual network so nothing you do can reach the public internet.",
      "Deploy OWASP Juice Shop or DVWA as the target and snapshot the VM.",
      "Enumerate services with Nmap and map the application surface with Burp's crawler.",
      "Test each OWASP Top 10 category methodically and record reproducible evidence.",
      "Exploit at least one injection, one broken-access-control and one XSS issue.",
      "Rate each finding with CVSS and write clear remediation steps for developers.",
      "Apply a fix to one vulnerability in the source and retest to confirm closure.",
    ],
    outcome:
      "You learn ethical, scoped security testing, tooling workflow and professional vulnerability reporting.",
    estimatedDuration: "3–4 weeks",
  }),
  P({
    slug: "cyber-ids-ml",
    branch: "cyber-security",
    title: "Machine-Learning Network Intrusion Detection System",
    difficulty: "advanced",
    aim: "Detect malicious network flows in near real time using a trained classifier.",
    description:
      "Flow features are extracted from captured traffic, a model is trained on a labelled dataset and deployed as a live detector with alerting.",
    toolsRequired: ["Python (scikit-learn)", "CICFlowMeter / Zeek", "Wireshark", "Docker", "Grafana"],
    componentsRequired: [],
    steps: [
      "Study the CIC-IDS or UNSW-NB15 dataset schema and the attack categories it labels.",
      "Clean the data, remove leakage-prone identifier columns and normalise numeric features.",
      "Train and compare random forest and gradient boosting with time-aware splits.",
      "Tune the decision threshold explicitly for a low false-positive rate, not just accuracy.",
      "Capture live traffic in your lab and convert packets into the same flow features.",
      "Serve the model in a container that scores flows continuously and emits alerts.",
      "Replay a simulated attack and measure detection rate and alert latency.",
    ],
    outcome:
      "You combine network security fundamentals with practical ML deployment and threshold tuning.",
    estimatedDuration: "5 weeks",
  }),

  // ── Robotics ──────────────────────────────────────────────────────────
  P({
    slug: "robotics-line-follower",
    branch: "robotics",
    title: "PID Line-Following Robot",
    difficulty: "beginner",
    aim: "Build a differential-drive robot that follows a track accurately using a PID controller.",
    description:
      "An IR sensor array estimates line position; a PID loop converts the error into differential motor speeds, tuned for speed without oscillation.",
    toolsRequired: ["Arduino IDE", "Serial plotter", "Soldering station"],
    componentsRequired: ["Arduino Nano", "5-channel IR sensor array", "L298N or TB6612 motor driver", "2 × N20 geared motors + wheels", "7.4V LiPo battery", "Chassis and caster"],
    steps: [
      "Assemble the chassis and mount the sensor array 5–10 mm above the surface at the front.",
      "Calibrate each IR channel on black and white and compute a weighted position error.",
      "Implement open-loop driving first to verify motor direction and PWM mapping.",
      "Add the proportional term and tune Kp until the robot tracks with mild oscillation.",
      "Add derivative to damp oscillation, then a small integral term for steady-state offset.",
      "Log error over serial and plot it while adjusting speed to find the stability limit.",
      "Time three laps on a test track and record the best tuned constants.",
    ],
    outcome:
      "You learn sensor calibration, closed-loop PID control and practical tuning on real hardware.",
    estimatedDuration: "2 weeks",
  }),
  P({
    slug: "robotics-ros-slam-bot",
    branch: "robotics",
    title: "ROS 2 Autonomous Navigation Robot with SLAM",
    difficulty: "advanced",
    aim: "Make a mobile robot map an unknown room and navigate autonomously to goal points.",
    description:
      "A LiDAR-equipped differential robot runs ROS 2 with SLAM Toolbox for mapping and Nav2 for path planning and obstacle avoidance.",
    toolsRequired: ["Ubuntu + ROS 2 Humble", "SLAM Toolbox, Nav2", "RViz2, Gazebo", "Python/C++"],
    componentsRequired: ["Raspberry Pi 4", "RPLiDAR A1", "Motor driver + encoders", "Differential-drive chassis", "IMU (MPU6050)", "Battery pack"],
    steps: [
      "Set up ROS 2 on the Pi and create the robot description (URDF) with correct link frames.",
      "Write the base controller node publishing odometry from encoder ticks and subscribing to cmd_vel.",
      "Bring up the LiDAR driver and confirm the scan topic renders correctly in RViz2.",
      "Validate the whole stack in Gazebo simulation before touching hardware.",
      "Run SLAM Toolbox while teleoperating the robot to build and save a room map.",
      "Configure Nav2 costmaps, footprint and controller parameters for your robot size.",
      "Send goal poses in RViz2 and tune inflation radius and velocity limits until navigation is reliable.",
    ],
    outcome:
      "You gain ROS 2 system integration, sensor fusion, SLAM and autonomous navigation experience.",
    estimatedDuration: "8 weeks",
  }),

  // ── Mechatronics ──────────────────────────────────────────────────────
  P({
    slug: "mechatronics-pick-place",
    branch: "mechatronics",
    title: "PLC-Controlled Pick-and-Place Conveyor",
    difficulty: "intermediate",
    aim: "Automate sorting of objects on a conveyor using a PLC, sensors and a pneumatic actuator.",
    description:
      "A ladder-logic program reads proximity and colour sensors on a moving conveyor and triggers a pusher to divert selected parts, with an HMI for counts.",
    toolsRequired: ["TIA Portal / CODESYS", "Ladder logic", "HMI editor", "Multimeter"],
    componentsRequired: ["PLC (S7-1200 or equivalent)", "Conveyor with DC/AC motor", "Inductive & colour sensors", "Pneumatic cylinder + solenoid valve", "24V supply", "Emergency stop switch"],
    steps: [
      "Draw the process flow and I/O list, assigning every sensor and actuator to a PLC address.",
      "Wire the sensors as sinking/sourcing per the PLC spec and verify each input LED.",
      "Write ladder logic for conveyor start/stop with interlocks and an emergency-stop rung.",
      "Add part detection with a debounce timer and a shift register to track position.",
      "Trigger the pneumatic pusher at the right dwell time and confirm repeatability.",
      "Build an HMI screen showing counts, current mode and fault status.",
      "Run 100 parts, measure sorting accuracy and log any missed detections.",
    ],
    outcome:
      "You learn industrial automation: PLC programming, sensor wiring, actuator control and safety interlocks.",
    estimatedDuration: "4 weeks",
  }),
  P({
    slug: "mechatronics-digital-twin",
    branch: "mechatronics",
    title: "Digital Twin of a Motorised Test Rig",
    difficulty: "advanced",
    aim: "Mirror a physical motor rig in real time with a simulation model for monitoring and fault detection.",
    description:
      "A physical DC motor rig streams sensor data to a Simulink/Python model running in parallel; residuals between model and reality flag faults early.",
    toolsRequired: ["MATLAB/Simulink or Python", "MQTT broker", "InfluxDB + Grafana", "System identification toolbox"],
    componentsRequired: ["DC motor with encoder", "Current sensor (INA219)", "ESP32 or STM32", "Load brake / flywheel", "Bench power supply"],
    steps: [
      "Instrument the rig to stream speed, current and voltage at 100 Hz over MQTT.",
      "Run step and chirp excitation tests and record the input–output data.",
      "Identify a first- or second-order motor model and validate it on held-out data.",
      "Run the model in real time next to the live stream and compute residual signals.",
      "Define residual thresholds for healthy operation using baseline runs.",
      "Introduce a controlled fault (added friction or reduced supply) and confirm detection.",
      "Visualise live twin versus physical values and fault alarms in a Grafana dashboard.",
    ],
    outcome:
      "You learn system identification, real-time data pipelines and model-based fault diagnosis.",
    estimatedDuration: "6 weeks",
  }),

  // ── Environmental ─────────────────────────────────────────────────────
  P({
    slug: "env-air-quality-network",
    branch: "environmental",
    title: "Low-Cost Air Quality Monitoring Network",
    difficulty: "intermediate",
    aim: "Measure PM2.5 and gas pollutants at multiple sites and compare them to reference data.",
    description:
      "Three low-cost sensor nodes log AQI parameters to the cloud; readings are calibrated against a government reference station and mapped.",
    toolsRequired: ["Arduino IDE", "Python (pandas)", "QGIS", "CPCB reference data"],
    componentsRequired: ["3 × ESP32", "PMS5003 particulate sensor", "MQ-135 gas sensor", "BME280", "Weatherproof enclosures", "Power banks / solar panels"],
    steps: [
      "Assemble one node, verify sensor warm-up behaviour and log raw values for 24 hours.",
      "Co-locate the node beside a reference monitor for a week to collect a calibration pair.",
      "Fit a linear or multivariate correction using humidity and temperature as covariates.",
      "Replicate the calibrated build for the remaining nodes and deploy at chosen sites.",
      "Stream data to the cloud every 5 minutes with timestamps and node IDs.",
      "Analyse diurnal patterns and traffic correlation in Python.",
      "Produce an AQI heat map in QGIS and write site-level recommendations.",
    ],
    outcome:
      "You learn environmental sensing, field calibration, time-series analysis and spatial reporting.",
    estimatedDuration: "5 weeks",
  }),
  P({
    slug: "env-greywater-treatment",
    branch: "environmental",
    title: "Constructed Wetland for Greywater Treatment",
    difficulty: "advanced",
    aim: "Design and test a small subsurface-flow wetland that treats household greywater for reuse.",
    description:
      "A pilot wetland cell with gravel media and reed plants is loaded with greywater; influent and effluent quality is tracked over several weeks.",
    toolsRequired: ["Water testing kit / lab access", "Excel or R", "AutoCAD for the layout", "IS 3025 test procedures"],
    componentsRequired: ["Lined tank or drum", "Graded gravel and sand media", "Canna or reed plants", "Inlet distribution pipe", "Outlet control standpipe", "Sampling bottles"],
    steps: [
      "Estimate greywater generation and required surface area from a first-order BOD removal model.",
      "Build the cell with correct media grading, a level inlet manifold and adjustable outlet.",
      "Plant the macrophytes and run clean water for two weeks to establish the system.",
      "Characterise raw greywater for BOD, COD, TSS, pH and surfactants as the baseline.",
      "Feed at the designed hydraulic loading rate and sample influent and effluent weekly.",
      "Compute removal efficiencies and check against reuse standards for gardening.",
      "Vary the retention time once and report the effect on treatment performance.",
    ],
    outcome:
      "You learn nature-based treatment design, water quality testing and performance evaluation.",
    estimatedDuration: "8 weeks",
  }),

  // ── Food Technology ───────────────────────────────────────────────────
  P({
    slug: "food-shelf-life-study",
    branch: "food-technology",
    title: "Shelf-Life Study of a Value-Added Food Product",
    difficulty: "intermediate",
    aim: "Develop a food product and determine its shelf life under different packaging conditions.",
    description:
      "A formulated snack or beverage is stored under varied packaging and temperature, with periodic microbial, chemical and sensory evaluation.",
    toolsRequired: ["Sensory evaluation forms", "Excel / SPSS", "Incubator and lab glassware", "FSSAI standards reference"],
    componentsRequired: ["Raw ingredients", "Packaging films (LDPE, metallised, vacuum)", "Water activity meter", "pH meter", "Plate count agar media"],
    steps: [
      "Standardise the product formulation and process, documenting every critical parameter.",
      "Measure initial moisture, water activity, pH and total plate count as day-zero data.",
      "Pack identical samples in three packaging types and store at ambient and 37°C.",
      "Test each set at fixed intervals for microbial load, peroxide value and texture.",
      "Run a 9-point hedonic sensory panel at each interval with at least 15 panellists.",
      "Plot quality attributes over time and identify the failure criterion for each.",
      "Estimate shelf life, apply the accelerated-storage relationship, and draft the label claim.",
    ],
    outcome:
      "You learn product development, food-quality analysis, packaging selection and sensory statistics.",
    estimatedDuration: "6 weeks",
  }),
  P({
    slug: "food-solar-dryer",
    branch: "food-technology",
    title: "Solar Dryer for Fruits and Vegetables",
    difficulty: "advanced",
    aim: "Design a solar dryer and quantify its drying performance against open sun drying.",
    description:
      "An indirect solar dryer with a collector and drying chamber is built and instrumented, and drying kinetics are compared with the traditional method.",
    toolsRequired: ["AutoCAD / SketchUp", "Data logger software", "Excel for kinetics modelling"],
    componentsRequired: ["Glazed solar collector panel", "Plywood/metal drying chamber", "Perforated trays", "DHT22 sensors and data logger", "DC exhaust fan", "Weighing balance"],
    steps: [
      "Calculate the required collector area from the moisture load and local solar insolation.",
      "Fabricate the collector and insulated chamber with a chimney or fan-assisted airflow.",
      "Install temperature and humidity sensors at inlet, chamber and outlet with logging.",
      "Prepare uniform slices of the chosen produce and record the initial moisture content.",
      "Dry in the unit and in open sun simultaneously, weighing samples hourly.",
      "Plot moisture ratio versus time and fit Page or Newton thin-layer drying models.",
      "Compute drying efficiency, time saved and product colour/rehydration quality versus open sun.",
    ],
    outcome:
      "You learn thermal system design, instrumentation and drying-kinetics modelling of food processes.",
    estimatedDuration: "6–7 weeks",
  }),

  // ── Agricultural ──────────────────────────────────────────────────────
  P({
    slug: "agri-smart-irrigation",
    branch: "agricultural",
    title: "Automated Soil-Moisture Based Irrigation System",
    difficulty: "beginner",
    aim: "Irrigate a plot automatically only when soil moisture drops below the crop threshold.",
    description:
      "Capacitive moisture sensors trigger a relay-driven pump when the field falls below a set point, with a mobile dashboard and manual override.",
    toolsRequired: ["Arduino IDE", "Blynk or MQTT dashboard", "Multimeter"],
    componentsRequired: ["ESP32", "2 × capacitive soil moisture sensors", "Relay module", "12V water pump / solenoid valve", "DHT22", "Waterproof enclosure"],
    steps: [
      "Calibrate the moisture sensors in dry soil and fully saturated soil to fix the raw range.",
      "Determine the crop's field capacity and wilting point to set the irrigation threshold.",
      "Wire the relay to the pump with correct isolation and a flyback-protected supply.",
      "Program hysteresis so the pump does not chatter around the threshold value.",
      "Add a maximum daily runtime safety limit and a manual override switch.",
      "Publish readings and pump events to a dashboard with historical charts.",
      "Run for two weeks and compare water used against a fixed-schedule control plot.",
    ],
    outcome:
      "You learn sensor calibration for soil, actuator control and measurable water-saving automation.",
    estimatedDuration: "2 weeks",
  }),
  P({
    slug: "agri-drone-crop-health",
    branch: "agricultural",
    title: "Drone Imagery Crop Health Mapping (NDVI)",
    difficulty: "advanced",
    aim: "Generate NDVI maps of a field from drone imagery to locate stressed crop zones.",
    description:
      "Aerial images captured on a planned flight are stitched into an orthomosaic, converted to NDVI and ground-truthed against field scouting.",
    toolsRequired: ["Mission Planner / DroneDeploy", "WebODM or Pix4D", "QGIS", "Python (rasterio)"],
    componentsRequired: ["Drone with camera (NDVI-converted or multispectral)", "Calibration reflectance panel", "GPS ground control markers", "Spare batteries"],
    steps: [
      "Obtain flight permissions and plan a grid mission with 75% front and side overlap.",
      "Place and log ground control points across the field for georeferencing accuracy.",
      "Capture the reflectance panel before and after flight for radiometric calibration.",
      "Process the imagery into an orthomosaic in WebODM and check the reprojection error.",
      "Compute the NDVI raster and apply a colour ramp with meaningful class breaks.",
      "Scout five low-NDVI and five high-NDVI points on the ground and record actual crop condition.",
      "Deliver a zone map with recommended variable-rate input actions.",
    ],
    outcome:
      "You learn precision-agriculture workflows: mission planning, photogrammetry, vegetation indices and ground truthing.",
    estimatedDuration: "5 weeks",
  }),

  // ── Mining ────────────────────────────────────────────────────────────
  P({
    slug: "mining-slope-stability",
    branch: "mining",
    title: "Open-Pit Slope Stability Analysis",
    difficulty: "intermediate",
    aim: "Assess the factor of safety of a pit slope and recommend a safe bench geometry.",
    description:
      "Rock mass properties are classified, the slope is analysed with limit equilibrium and numerical methods, and geometry is optimised against safety criteria.",
    toolsRequired: ["Slide2 / GeoStudio SLOPE-W", "RS2 or FLAC (optional)", "Dips for stereonets", "Excel"],
    componentsRequired: [],
    steps: [
      "Compile geological data: joint orientations, RQD, UCS and groundwater conditions.",
      "Classify the rock mass using RMR and GSI and derive Hoek–Brown / Mohr–Coulomb parameters.",
      "Plot discontinuities on a stereonet in Dips to identify planar, wedge or toppling modes.",
      "Model the slope section in Slide2 and run Bishop and Morgenstern–Price analyses.",
      "Add pore pressure scenarios including a fully saturated worst case.",
      "Iterate bench height, face angle and berm width until the factor of safety exceeds 1.3.",
      "Recommend monitoring and drainage measures with a short risk register.",
    ],
    outcome:
      "You learn rock-mass characterisation, limit-equilibrium analysis and geotechnical risk-based design.",
    estimatedDuration: "4 weeks",
  }),
  P({
    slug: "mining-ventilation-network",
    branch: "mining",
    title: "Underground Mine Ventilation Network Simulation",
    difficulty: "advanced",
    aim: "Design a ventilation network that delivers required airflow to every working face.",
    description:
      "The mine layout is modelled as a resistance network, solved for airflow distribution, and fan and regulator settings are optimised for power and compliance.",
    toolsRequired: ["VentSim or Ventgraph (or a Hardy Cross spreadsheet)", "AutoCAD", "DGMS statutory guidelines"],
    componentsRequired: [],
    steps: [
      "Draw the mine network schematic and list airway lengths, cross-sections and friction factors.",
      "Compute the resistance of each airway using the Atkinson equation.",
      "Set the airflow requirement per working face from manpower, equipment and gas emission.",
      "Solve the network with Hardy Cross iterations or the simulator and check flow at each face.",
      "Select a main fan from a real fan curve matching the system operating point.",
      "Add regulators and booster fans to balance under-ventilated branches.",
      "Test emergency scenarios such as fan failure or fire reversal and report the power cost.",
    ],
    outcome:
      "You learn mine ventilation theory, network solution methods and statutory compliance-driven design.",
    estimatedDuration: "5 weeks",
  }),

  // ── Petroleum ─────────────────────────────────────────────────────────
  P({
    slug: "petro-nodal-analysis",
    branch: "petroleum",
    title: "Well Performance Nodal Analysis",
    difficulty: "intermediate",
    aim: "Predict a well's production rate by matching inflow and outflow performance.",
    description:
      "Reservoir inflow (IPR) and tubing outflow (VLP) curves are constructed and intersected to find the operating point, then optimised by changing tubing size and lift.",
    toolsRequired: ["PROSPER / Pipesim (or Excel + correlations)", "MATLAB / Python", "Reservoir and PVT data"],
    componentsRequired: [],
    steps: [
      "Collect reservoir pressure, PVT data, tubing geometry and wellhead conditions.",
      "Build the IPR curve with Vogel's or Fetkovich's method for the fluid type.",
      "Construct the VLP curve using a multiphase flow correlation such as Hagedorn–Brown.",
      "Intersect IPR and VLP to determine the natural flowing rate and bottomhole pressure.",
      "Run sensitivity on tubing diameter, wellhead pressure and water cut.",
      "Evaluate gas lift or ESP options and compare incremental production against cost.",
      "Recommend the optimum completion and document the assumptions and uncertainty.",
    ],
    outcome:
      "You learn production engineering fundamentals, multiphase flow behaviour and artificial-lift selection.",
    estimatedDuration: "4 weeks",
  }),
  P({
    slug: "petro-reservoir-simulation",
    branch: "petroleum",
    title: "Waterflood Reservoir Simulation Study",
    difficulty: "advanced",
    aim: "Simulate a waterflood and identify the injection pattern that maximises recovery.",
    description:
      "A synthetic reservoir model is built and history-matched, then several injection patterns and rates are compared on recovery factor and economics.",
    toolsRequired: ["Eclipse / CMG / OPM Flow", "Petrel or open-source gridding", "Python for post-processing", "Excel for economics"],
    componentsRequired: [],
    steps: [
      "Build the static model: grid, porosity, permeability distribution and fluid contacts.",
      "Assign PVT tables and relative permeability curves consistent with the rock type.",
      "Initialise the model and verify the volumetric in-place calculation independently.",
      "Run primary depletion and history-match against provided production data.",
      "Simulate five-spot and line-drive injection patterns at multiple injection rates.",
      "Compare recovery factor, water cut evolution and breakthrough time across cases.",
      "Run a simple discounted cash flow to select the recommended development plan.",
    ],
    outcome:
      "You learn reservoir modelling, history matching, secondary recovery design and economic screening.",
    estimatedDuration: "8 weeks",
  }),
];

export const projectsForBranch = (branch: string) =>
  branchProjects.filter((p) => p.branch === branch);

export const projectBySlug = (slug: string) =>
  branchProjects.find((p) => p.slug === slug);
