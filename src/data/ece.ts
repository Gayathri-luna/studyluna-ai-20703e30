export interface Roadmap {
  slug: string;
  title: string;
  summary: string;
  salary: string;
  stages: { stage: string; items: string[] }[];
  tools: string[];
}

export const roadmaps: Roadmap[] = [
  {
    slug: "vlsi",
    title: "VLSI Design & Verification",
    summary:
      "Design and verify digital chips — RTL design, functional verification, and physical design for semiconductor companies.",
    salary: "₹6–14 LPA entry · ₹25 LPA+ with 5 years",
    stages: [
      {
        stage: "Foundation (0–3 months)",
        items: [
          "Digital electronics: number systems, K-maps, FSMs, timing",
          "CMOS basics: MOSFET operation, inverter, propagation delay",
          "Verilog/SystemVerilog syntax and simulation with Icarus/ModelSim",
        ],
      },
      {
        stage: "Core skills (3–8 months)",
        items: [
          "RTL coding: ALU, FIFO, UART, AXI-Lite slave, cache controller",
          "Static timing analysis: setup/hold, clock domain crossing",
          "Verification: testbenches, assertions, UVM fundamentals",
        ],
      },
      {
        stage: "Specialisation (8–14 months)",
        items: [
          "Physical design flow: synthesis, floorplan, CTS, routing, signoff",
          "Low-power design: clock gating, multi-Vt, power domains",
          "Scripting automation with TCL and Python",
        ],
      },
      {
        stage: "Job ready",
        items: [
          "2–3 GitHub RTL projects with waveforms and coverage reports",
          "Practice interview topics: metastability, FIFO depth, arbiters",
          "Target roles: RTL Design Engineer, Design Verification Engineer, PD Engineer",
        ],
      },
    ],
    tools: ["Verilog", "SystemVerilog", "UVM", "Cadence", "Synopsys", "TCL"],
  },
  {
    slug: "embedded",
    title: "Embedded Systems & Firmware",
    summary:
      "Write firmware that drives microcontrollers, sensors, and real-time products across automotive, robotics, and consumer devices.",
    salary: "₹4.5–10 LPA entry · ₹20 LPA+ with 5 years",
    stages: [
      {
        stage: "Foundation (0–3 months)",
        items: [
          "Embedded C: pointers, bit manipulation, memory layout, volatile",
          "Microcontroller architecture: ARM Cortex-M registers, memory map",
          "Bare-metal GPIO, timers, interrupts on STM32 or ESP32",
        ],
      },
      {
        stage: "Core skills (3–8 months)",
        items: [
          "Communication protocols: UART, SPI, I2C, CAN, Modbus",
          "Sensor and actuator interfacing, ADC/DAC, PWM motor control",
          "Debugging with oscilloscope, logic analyser, JTAG/SWD",
        ],
      },
      {
        stage: "Specialisation (8–14 months)",
        items: [
          "RTOS: FreeRTOS tasks, queues, semaphores, priority inversion",
          "Linux device drivers or Zephyr for higher-end products",
          "Firmware quality: unit tests, MISRA C, OTA updates, bootloaders",
        ],
      },
      {
        stage: "Job ready",
        items: [
          "Portfolio of 3 hardware projects with schematics and code",
          "Interview topics: ISR design, stack vs heap, watchdogs, endianness",
          "Target roles: Firmware Engineer, Embedded Software Engineer, IoT Engineer",
        ],
      },
    ],
    tools: ["Embedded C", "STM32/ESP32", "FreeRTOS", "Git", "Logic analyser"],
  },
  {
    slug: "rf",
    title: "RF, Antenna & Microwave",
    summary:
      "Design antennas, RF front-ends, and wireless links for telecom, defence, satellite, and consumer radio products.",
    salary: "₹5–12 LPA entry · ₹22 LPA+ with 5 years",
    stages: [
      {
        stage: "Foundation (0–3 months)",
        items: [
          "Transmission lines, Smith chart, S-parameters, impedance matching",
          "EM fields revision: Maxwell's equations, wave propagation",
          "Antenna fundamentals: gain, radiation pattern, VSWR, bandwidth",
        ],
      },
      {
        stage: "Core skills (3–9 months)",
        items: [
          "Simulation in HFSS/CST: patch, dipole, monopole, array design",
          "RF circuit blocks: LNA, mixer, PA, filters, oscillators",
          "Link budget analysis and noise figure calculations",
        ],
      },
      {
        stage: "Specialisation (9–15 months)",
        items: [
          "mmWave and 5G NR front-end design, beamforming basics",
          "PCB layout for RF: grounding, via stitching, controlled impedance",
          "Lab measurement: VNA, spectrum analyser, anechoic chamber testing",
        ],
      },
      {
        stage: "Job ready",
        items: [
          "Published simulation results or an IEEE-style paper",
          "Interview topics: matching networks, Friis equation, antenna arrays",
          "Target roles: RF Design Engineer, Antenna Engineer, EMC Engineer",
        ],
      },
    ],
    tools: ["HFSS", "CST", "ADS", "MATLAB", "VNA"],
  },
  {
    slug: "dsp",
    title: "Signal Processing & Communication",
    summary:
      "Build algorithms for audio, image, radar, and wireless communication systems.",
    salary: "₹5–12 LPA entry · ₹24 LPA+ with 5 years",
    stages: [
      {
        stage: "Foundation (0–3 months)",
        items: [
          "Signals & systems: convolution, Fourier, Laplace, Z-transform",
          "Sampling, aliasing, quantisation, filter design (FIR/IIR)",
          "MATLAB and Python (NumPy, SciPy) for numerical experiments",
        ],
      },
      {
        stage: "Core skills (3–9 months)",
        items: [
          "Digital communication: modulation schemes, BER analysis, channel coding",
          "Adaptive filters, spectral estimation, multirate DSP",
          "Fixed-point implementation on DSP processors or FPGA",
        ],
      },
      {
        stage: "Specialisation (9–15 months)",
        items: [
          "Choose a domain: wireless (OFDM, MIMO), radar, audio, or biomedical",
          "Machine learning on signals: CNNs for spectrograms, denoising models",
          "Software-defined radio experiments with RTL-SDR/GNU Radio",
        ],
      },
      {
        stage: "Job ready",
        items: [
          "Simulation notebooks with plots and quantified results",
          "Interview topics: Nyquist, PSD, equalisation, Viterbi decoding",
          "Target roles: DSP Engineer, Modem Engineer, Algorithm Engineer",
        ],
      },
    ],
    tools: ["MATLAB", "Python", "GNU Radio", "Simulink", "FPGA"],
  },
  {
    slug: "semiconductor",
    title: "Semiconductor Devices & Fabrication",
    summary:
      "Work on device physics, process integration, and yield in fabs and semiconductor R&D labs.",
    salary: "₹5–11 LPA entry · ₹20 LPA+ with 5 years",
    stages: [
      {
        stage: "Foundation (0–3 months)",
        items: [
          "Semiconductor physics: carrier transport, PN junction, MOS capacitor",
          "Device characteristics: I-V, C-V, short-channel effects",
          "Fabrication steps: oxidation, lithography, etching, doping, deposition",
        ],
      },
      {
        stage: "Core skills (3–9 months)",
        items: [
          "TCAD simulation with Sentaurus or Silvaco",
          "Process integration and cleanroom safety practices",
          "Statistical process control, yield analysis, DOE",
        ],
      },
      {
        stage: "Specialisation (9–15 months)",
        items: [
          "FinFET/GAA device modelling, reliability (NBTI, HCI, TDDB)",
          "Advanced packaging: 2.5D/3D IC, chiplets, thermal management",
          "Failure analysis techniques: SEM, TEM, EBIC",
        ],
      },
      {
        stage: "Job ready",
        items: [
          "Lab or TCAD project report with measured/simulated device curves",
          "Interview topics: threshold voltage, mobility degradation, scaling",
          "Target roles: Process Engineer, Device Engineer, Yield Engineer",
        ],
      },
    ],
    tools: ["Sentaurus", "Silvaco", "MATLAB", "JMP", "Cleanroom tools"],
  },
  {
    slug: "telecom",
    title: "Telecom, 5G & Network Engineering",
    summary:
      "Plan, deploy, and optimise mobile and optical networks for operators and equipment vendors.",
    salary: "₹4–9 LPA entry · ₹18 LPA+ with 5 years",
    stages: [
      {
        stage: "Foundation (0–3 months)",
        items: [
          "Cellular evolution: GSM to LTE to 5G NR architecture",
          "OSI/TCP-IP stack, IP routing, switching fundamentals",
          "Optical fibre basics: attenuation, dispersion, WDM",
        ],
      },
      {
        stage: "Core skills (3–9 months)",
        items: [
          "RAN planning: coverage, capacity, KPI analysis, drive testing",
          "Core network: EPC, 5GC, network slicing, virtualisation",
          "Automation with Python and network telemetry tools",
        ],
      },
      {
        stage: "Specialisation (9–15 months)",
        items: [
          "O-RAN, cloud-native network functions, Kubernetes for telco",
          "Certifications: CCNA, 5G specialist tracks",
          "Field optimisation projects and troubleshooting case studies",
        ],
      },
      {
        stage: "Job ready",
        items: [
          "Network design case study with KPIs before/after optimisation",
          "Interview topics: handover, MIMO, latency budgets, QoS",
          "Target roles: RF Planning Engineer, Core Network Engineer, NOC Engineer",
        ],
      },
    ],
    tools: ["Atoll", "Wireshark", "Python", "Linux", "Kubernetes"],
  },
  {
    slug: "iot",
    title: "IoT & Edge AI",
    summary:
      "Connect sensors to the cloud and run intelligence on constrained edge devices.",
    salary: "₹4.5–10 LPA entry · ₹20 LPA+ with 5 years",
    stages: [
      {
        stage: "Foundation (0–3 months)",
        items: [
          "Sensor interfacing and low-power microcontroller programming",
          "Wireless stacks: BLE, Wi-Fi, LoRaWAN, Zigbee trade-offs",
          "MQTT, HTTP, CoAP messaging and JSON payload design",
        ],
      },
      {
        stage: "Core skills (3–9 months)",
        items: [
          "Cloud pipelines: device provisioning, telemetry ingest, dashboards",
          "Power budgeting and battery-life optimisation",
          "Device security: secure boot, TLS, key storage",
        ],
      },
      {
        stage: "Specialisation (9–15 months)",
        items: [
          "TinyML: quantised models with TensorFlow Lite Micro / Edge Impulse",
          "Edge inference on ESP32-S3, Raspberry Pi, or Jetson Nano",
          "Fleet management and OTA update strategy",
        ],
      },
      {
        stage: "Job ready",
        items: [
          "End-to-end deployed IoT product demo with live dashboard",
          "Interview topics: duty cycling, network reliability, edge vs cloud",
          "Target roles: IoT Engineer, Edge AI Engineer, Solutions Engineer",
        ],
      },
    ],
    tools: ["ESP32", "MQTT", "AWS IoT", "TensorFlow Lite", "Grafana"],
  },
  {
    slug: "test",
    title: "Hardware Test & Validation",
    summary:
      "Validate boards, chips, and systems against specification before they ship.",
    salary: "₹4–9 LPA entry · ₹16 LPA+ with 5 years",
    stages: [
      {
        stage: "Foundation (0–3 months)",
        items: [
          "Lab instruments: DSO, function generator, DMM, power supply",
          "Reading schematics, datasheets, and test specifications",
          "Basic Python scripting for measurement automation",
        ],
      },
      {
        stage: "Core skills (3–8 months)",
        items: [
          "Test plan writing, bring-up procedures, failure logging",
          "Signal integrity checks, eye diagrams, jitter measurement",
          "ATE concepts, boundary scan (JTAG), in-circuit test",
        ],
      },
      {
        stage: "Specialisation (8–14 months)",
        items: [
          "Automation frameworks with PyVISA and LabVIEW",
          "Environmental and compliance testing: EMI/EMC, thermal, HALT",
          "Root cause analysis and 8D reporting",
        ],
      },
      {
        stage: "Job ready",
        items: [
          "A documented automated test bench project",
          "Interview topics: DFT, coverage, debug methodology",
          "Target roles: Test Engineer, Validation Engineer, Product Engineer",
        ],
      },
    ],
    tools: ["PyVISA", "LabVIEW", "Oscilloscope", "JTAG", "Excel/JMP"],
  },
];

export const technicalSkills = [
  {
    group: "Core fundamentals",
    skills: [
      "Analog & digital electronics",
      "Signals & systems",
      "Electromagnetics",
      "Microprocessors & microcontrollers",
      "Control systems",
      "Communication systems",
    ],
  },
  {
    group: "Programming & tooling",
    skills: [
      "Embedded C / C++",
      "Python for automation & data",
      "Verilog / SystemVerilog / VHDL",
      "MATLAB & Simulink",
      "Git and version control",
      "Linux command line",
    ],
  },
  {
    group: "Design & simulation",
    skills: [
      "PCB design (KiCad, Altium)",
      "SPICE circuit simulation",
      "HFSS / CST EM simulation",
      "TCAD device simulation",
      "FPGA development (Vivado, Quartus)",
      "CAD for enclosures & assemblies",
    ],
  },
  {
    group: "Lab & measurement",
    skills: [
      "Oscilloscope & logic analyser debugging",
      "Spectrum & network analyser use",
      "Soldering and rework",
      "Protocol decoding (UART/SPI/I2C/CAN)",
      "Power measurement & battery profiling",
      "EMI/EMC pre-compliance testing",
    ],
  },
  {
    group: "Emerging",
    skills: [
      "Edge AI / TinyML",
      "5G & O-RAN",
      "Automotive electronics (AUTOSAR, ISO 26262)",
      "Hardware security & secure boot",
      "Robotics & ROS 2",
      "Quantum and photonic devices (intro)",
    ],
  },
];

export const nonTechnicalSkills = [
  {
    title: "Technical communication",
    detail:
      "Write clear design documents, test reports, and commit messages. Explain a circuit or algorithm to a non-specialist in under two minutes.",
  },
  {
    title: "Problem decomposition",
    detail:
      "Break a failing system into measurable sub-blocks, form a hypothesis, and test it — the core habit interviewers screen for.",
  },
  {
    title: "Documentation discipline",
    detail:
      "Maintain schematics, BOMs, revision history, and README files so others can reproduce your work.",
  },
  {
    title: "Teamwork across disciplines",
    detail:
      "Hardware, firmware, mechanical, and QA teams share deadlines. Learn to negotiate interfaces and freeze specs early.",
  },
  {
    title: "Time & project management",
    detail:
      "Estimate tasks, track them on a board, and flag slips early. Familiarity with Agile ceremonies helps in product teams.",
  },
  {
    title: "Presentation & demo skills",
    detail:
      "Show working hardware with a crisp story: problem, approach, result, next step. Practise a 5-minute demo of every project.",
  },
  {
    title: "Continuous learning",
    detail:
      "Follow IEEE Spectrum, EDN, app notes, and standards updates. Semiconductor and wireless roles change fast.",
  },
  {
    title: "Professional networking",
    detail:
      "Keep LinkedIn and GitHub current, join IEEE student chapters, and attend meetups or hackathons for referrals.",
  },
];

export interface MiniProject {
  slug: string;
  title: string;
  domain: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  objective: string;
  components: string[];
  procedure: string[];
  outcome: string;
}

export const miniProjects: MiniProject[] = [
  {
    slug: "iot-weather-station",
    title: "IoT Weather Monitoring Station",
    domain: "IoT",
    level: "Beginner",
    duration: "1–2 weeks",
    objective:
      "Measure temperature, humidity, and pressure and stream readings to a live cloud dashboard.",
    components: [
      "ESP32 dev board",
      "DHT22 sensor",
      "BMP280 sensor",
      "0.96\" OLED display",
      "Breadboard, jumper wires, 5V supply",
    ],
    procedure: [
      "Wire DHT22 data to GPIO4 and BMP280 over I2C (SDA GPIO21, SCL GPIO22); share 3.3V and GND.",
      "Install ESP32 board support plus DHT, Adafruit BMP280, and OLED libraries in the Arduino IDE.",
      "Write a sketch that reads all three values every 10 seconds and prints them to serial for validation.",
      "Render the readings on the OLED to confirm the sensors work without a network.",
      "Connect to Wi-Fi and publish a JSON payload to an MQTT broker or ThingSpeak channel.",
      "Build a dashboard with charts for each metric and set an alert threshold.",
      "Calibrate against a reference thermometer, then log 24 hours of data and note drift.",
    ],
    outcome:
      "A deployed sensor node with live charts — proof of sensor interfacing, networking, and cloud integration.",
  },
  {
    slug: "smart-energy-meter",
    title: "Smart Energy Meter",
    domain: "Embedded",
    level: "Intermediate",
    duration: "3 weeks",
    objective:
      "Measure real-time AC voltage, current, power factor, and energy consumption of a household load.",
    components: [
      "ESP32 or STM32 board",
      "ZMPT101B voltage sensor",
      "SCT-013 current transformer",
      "Burden resistor network",
      "16x2 LCD, SD card module",
    ],
    procedure: [
      "Study safety rules for mains work; use an isolation transformer and never probe live nodes directly.",
      "Design the burden and bias network so the CT output sits mid-rail for the ADC.",
      "Sample voltage and current at ~2 kHz and compute RMS values over whole cycles.",
      "Derive real power, apparent power, and power factor from instantaneous products.",
      "Integrate power over time to accumulate kWh and store it to the SD card every minute.",
      "Calibrate against a commercial meter and apply gain/offset correction constants.",
      "Add a Wi-Fi dashboard showing daily consumption and estimated cost.",
    ],
    outcome:
      "A calibrated metering device demonstrating analog front-end design, DSP maths, and data logging.",
  },
  {
    slug: "gesture-robot",
    title: "Gesture-Controlled Robotic Car",
    domain: "Embedded / Robotics",
    level: "Beginner",
    duration: "2 weeks",
    objective:
      "Drive a robot car wirelessly using hand gestures captured by an accelerometer glove.",
    components: [
      "2x Arduino Nano",
      "MPU6050 IMU",
      "nRF24L01 transceiver pair",
      "L298N motor driver, 4 BO motors, chassis",
      "7.4V Li-ion pack",
    ],
    procedure: [
      "Assemble the chassis and verify each motor direction with a direct battery test.",
      "Read pitch and roll from the MPU6050 on the transmitter Nano and print the angles.",
      "Map angle ranges to five commands: forward, reverse, left, right, stop.",
      "Set up the nRF24L01 link with a fixed pipe address and confirm packet delivery.",
      "On the receiver, decode the command byte and drive the L298N inputs accordingly.",
      "Add a failsafe that stops the motors if no packet arrives for 500 ms.",
      "Tune the angle thresholds and add PWM ramping for smoother acceleration.",
    ],
    outcome:
      "A responsive wireless robot showing IMU sensing, RF communication, and motor control.",
  },
  {
    slug: "uart-fpga",
    title: "UART Transmitter/Receiver on FPGA",
    domain: "VLSI",
    level: "Intermediate",
    duration: "2 weeks",
    objective:
      "Implement a parameterisable UART core in Verilog and validate it on hardware against a PC terminal.",
    components: [
      "Basys 3 / DE10-Lite FPGA board",
      "USB-UART bridge",
      "Vivado or Quartus",
      "Simulator (Icarus/ModelSim)",
    ],
    procedure: [
      "Define the spec: 8-N-1 framing, parameterised baud rate, and a 16x oversampling clock.",
      "Write a baud-rate generator module and verify its tick period in simulation.",
      "Code the transmitter FSM (idle, start, data, stop) and the receiver FSM with mid-bit sampling.",
      "Build a self-checking testbench that loops TX into RX and compares random bytes.",
      "Check waveforms for framing errors and confirm functional coverage of all states.",
      "Synthesise, add pin constraints, and program the board.",
      "Echo typed characters from a serial terminal and measure timing margin at 115200 baud.",
    ],
    outcome:
      "A reusable, verified RTL IP block — exactly the artefact VLSI interviewers ask to see.",
  },
  {
    slug: "patch-antenna",
    title: "2.4 GHz Microstrip Patch Antenna",
    domain: "RF",
    level: "Intermediate",
    duration: "3 weeks",
    objective:
      "Design, simulate, fabricate, and measure a patch antenna for the 2.4 GHz ISM band.",
    components: [
      "FR4 substrate (1.6 mm)",
      "SMA edge connector",
      "HFSS or CST licence",
      "VNA for measurement",
    ],
    procedure: [
      "Compute patch width and length from the transmission-line model for εr = 4.4 at 2.45 GHz.",
      "Model the patch with an inset feed in HFSS and sweep 2.0–3.0 GHz.",
      "Optimise the inset depth until S11 drops below -10 dB at the target frequency.",
      "Record gain, radiation pattern, and bandwidth from the simulation.",
      "Export the layout, fabricate on FR4, and solder the SMA connector to the feed line.",
      "Calibrate the VNA and measure S11; compare the resonance shift against simulation.",
      "Document the discrepancy sources: substrate tolerance, connector parasitics, etching accuracy.",
    ],
    outcome:
      "A measured antenna with a simulation-vs-measurement report — strong evidence for RF roles.",
  },
  {
    slug: "ecg-denoising",
    title: "ECG Signal Denoising and Peak Detection",
    domain: "DSP",
    level: "Intermediate",
    duration: "2 weeks",
    objective:
      "Clean a noisy biomedical signal and extract heart rate reliably.",
    components: [
      "MIT-BIH arrhythmia dataset",
      "Python with NumPy, SciPy, Matplotlib",
      "Optional AD8232 ECG module for live capture",
    ],
    procedure: [
      "Load a record and plot the raw waveform with its spectrum to identify noise sources.",
      "Remove baseline wander with a high-pass filter at 0.5 Hz.",
      "Suppress powerline interference using a 50/60 Hz notch filter.",
      "Apply the Pan-Tompkins pipeline: bandpass, differentiate, square, moving-window integrate.",
      "Detect R-peaks with adaptive thresholding and compute RR intervals.",
      "Score sensitivity and positive predictivity against the dataset annotations.",
      "Package the pipeline as a reusable function and plot before/after comparisons.",
    ],
    outcome:
      "A quantified DSP pipeline with accuracy metrics, ideal for algorithm-engineer portfolios.",
  },
  {
    slug: "solar-mppt",
    title: "Solar MPPT Charge Controller",
    domain: "Power Electronics",
    level: "Advanced",
    duration: "4 weeks",
    objective:
      "Extract maximum power from a PV panel using a buck converter with perturb-and-observe control.",
    components: [
      "50W solar panel",
      "Buck converter (MOSFET, inductor, diode, caps)",
      "INA219 current/voltage sensors",
      "STM32 board, gate driver",
      "12V lead-acid or Li-ion pack",
    ],
    procedure: [
      "Size the inductor and capacitors for the target switching frequency and ripple limits.",
      "Build the power stage on a PCB with short high-current loops and a solid ground plane.",
      "Drive the MOSFET with a gate driver from an STM32 timer PWM channel; verify with a scope.",
      "Read panel voltage and current with the INA219 and compute instantaneous power.",
      "Implement perturb-and-observe: adjust duty cycle, compare power, reverse direction on drop.",
      "Add battery protection: over-voltage cutoff, temperature check, and reverse-current blocking.",
      "Log efficiency across irradiance conditions and compare against direct-connect charging.",
    ],
    outcome:
      "A working power converter with measured efficiency curves — a standout hardware project.",
  },
  {
    slug: "tinyml-keyword",
    title: "TinyML Keyword Spotting on Microcontroller",
    domain: "Edge AI",
    level: "Advanced",
    duration: "3–4 weeks",
    objective:
      "Run an always-on voice keyword detector entirely on a microcontroller.",
    components: [
      "ESP32-S3 or Arduino Nano 33 BLE Sense",
      "MEMS microphone (INMP441)",
      "Edge Impulse or TensorFlow Lite Micro",
    ],
    procedure: [
      "Collect at least 300 samples per keyword plus a noise/unknown class.",
      "Extract MFCC features with a 1-second window and 20 ms frames.",
      "Train a small 1D-CNN and check the confusion matrix on a held-out split.",
      "Quantise the model to int8 and confirm accuracy loss stays under a few percent.",
      "Deploy the C++ library to the board and stream mic audio into the inference buffer.",
      "Measure latency, RAM/flash usage, and current draw during continuous listening.",
      "Trigger an action (LED or relay) on detection and add a confidence threshold to cut false positives.",
    ],
    outcome:
      "An on-device AI demo covering data collection, model compression, and embedded deployment.",
  },
];

export interface CareerUpdate {
  title: string;
  category: string;
  period: string;
  detail: string;
}

export const careerUpdates: CareerUpdate[] = [
  {
    title: "India Semiconductor Mission expands fab and ATMP hiring",
    category: "Semiconductor",
    period: "2026",
    detail:
      "New fabrication and assembly-test plants are recruiting process, equipment, and yield engineers at scale. Coursework in device physics plus cleanroom internships is the fastest entry route.",
  },
  {
    title: "Chip design roles shift toward verification and DFT",
    category: "VLSI",
    period: "2026",
    detail:
      "Verification headcount now exceeds RTL design in most teams. SystemVerilog, UVM, and Python-based flows carry the highest hiring weight for fresh graduates.",
  },
  {
    title: "Automotive electronics demand keeps climbing",
    category: "Embedded",
    period: "2026",
    detail:
      "EV and ADAS programmes need firmware engineers with CAN, AUTOSAR, and ISO 26262 functional-safety exposure. Safety certification training is a strong differentiator.",
  },
  {
    title: "Edge AI becomes a standard ECE skill",
    category: "AI + Hardware",
    period: "2026",
    detail:
      "Product teams expect engineers who can quantise a model and deploy it to an MCU or NPU. TinyML projects now appear in entry-level job descriptions.",
  },
  {
    title: "5G-Advanced and O-RAN rollouts create network roles",
    category: "Telecom",
    period: "2026",
    detail:
      "Operators are hiring for RAN optimisation, network automation, and cloud-native core functions. Python plus Linux plus a CCNA-level networking base opens these doors.",
  },
  {
    title: "Hardware security moves into mainstream requirements",
    category: "Security",
    period: "2026",
    detail:
      "Secure boot, key provisioning, and side-channel awareness are now listed in embedded job postings driven by new IoT regulation.",
  },
];
