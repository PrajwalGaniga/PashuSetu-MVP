# PashuSetu-MVP

> **PashuSetu — Live Disease Intelligence & Surveillance System**  
> *Production-Grade Interactive Prototype Screen: Live Case Simulation Console*

---

## 🌟 Overview

**PashuSetu** is a real-time, multimodal livestock disease surveillance and outbreak intelligence system. 

This repository contains the interactive **Live Case Simulation Console**, designed to demonstrate the complete background lifecycle of a suspected livestock disease event to technical evaluators:

```
Farm Sensing (IoT + CV) 
  ↳ Anomaly Detection 
    ↳ Multimodal Signal Aggregation 
      ↳ Farmer Verification (Offline-First) 
        ↳ Unified Case Creation 
          ↳ Bayesian Risk Scoring 
            ↳ P1 Priority & Hard Escalation 
              ↳ Paravet Geo-Dispatch 
                ↳ Veterinarian Tele-Review 
                  ↳ Biological Sample Collection 
                    ↳ Molecular PCR Lab Confirmation 
                      ↳ National Disease Surveillance Grid 
                        ↳ Ground-Truth Recalibration Feedback Loop
```

---

## 🎛️ Design Language: Tactile Skeuomorphic Console

Inspired by classic aerospace mission control consoles, Braun/Dieter Rams physical instrumentation, and classic Apple interfaces:
- **Warm Ivory / Sand Surfaces** (`#f6f4ee` / `#ede7db` / `#faf8f5`) with subtle paper/noise microtexture.
- **Physical Controls**: Milled aluminum pushbuttons with tactile 3D depress travel, knurled toggles, rotary mechanical reactor dial, and slotted metallic corner screws.
- **Convex LED Jewel Lenses**: Internal specular highlights and realistic diffused glow rings (green, amber, red, blue).
- **Recessed LCD / CRT Telemetry Bays**: Hardware-style monospaced real-time event logs with micro-scanlines.
- **No Neon Cyberpunk / No Generic SaaS**: Restrained semantic accents focused on operational clarity.

---

## ⚙️ Architecture

The prototype is built with a **decoupled, event-driven state machine** so it can later be connected directly to a **FastAPI + WebSocket** backend without modifying the visual React components:

```
src/
├── components/
│   ├── TopBar/               # Status, simulated clock, case ID
│   ├── FieldMonitoring/      # Farm #KA-1023, Cattle #17 gauges & sensors
│   ├── IntelligenceCore/     # Mechanical core, orbiting modules & particle bus
│   ├── RiskEngine/           # Bayesian 00-87 risk meter & Decision Trace
│   ├── WorkflowBays/         # Dynamic contextual stage cards (Farmer, Vet, Lab, Map)
│   ├── CaseJourney/          # Stepped horizontal pipeline timeline
│   ├── EventStream/          # Autoscrolling hardware terminal event logger
│   └── SimulationControls/   # Play, Pause, Reset, and 0.5x/1x/2x speed selector
├── data/
│   └── simulationData.js     # Domain telemetry constants and trace weights
├── engine/
│   ├── stateMachine.js       # 14 deterministic states & metadata definitions
│   └── simulationEngine.js   # Clock rate controller, subscriber bus & transitions
├── hooks/
│   └── useSimulation.js      # React hook subscribing to simulation events
├── pages/
│   └── LiveCaseSimulation.jsx
└── styles/
    ├── design-tokens.css     # Color palette, shadows, LED tokens
    ├── skeuomorphic.css      # Tactile buttons, screws, bezels, gauges
    └── simulation.css        # Responsive console layout (1440x900 target)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/PrajwalGaniga/PashuSetu-MVP.git

# Navigate into project directory
cd PashuSetu-MVP

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open `http://localhost:5173/` in your desktop browser.

---

## 🎬 How to Experience the Demo

1. Click **▶ START LIVE SIMULATION** (or select **2×** speed for a faster run).
2. Watch the field telemetry on the left elevate (Temperature to 38.5°C, movement drop, lameness alert).
3. Observe data packets travel via animated SVG conduits into the **PashuSetu Intelligence Core**.
4. Witness the **Farmer Verification** prompt sync via the offline-first queue.
5. Watch the **Risk Engine** synthesize the 6-factor **Decision Trace** up to **87 / 100** and trigger the **P1 Hard Escalation Rule**.
6. Follow the operational journey: **Paravet Assigned** → **Veterinarian Review** → **Laboratory PCR Analysis** (0% to 100%) → **Lab Confirmed**.
7. See the **National Surveillance Map** update with the Karnataka alert zone.
8. Follow the curved **Ground-Truth Feedback Arc** as verified laboratory evidence recalibrates the core intelligence models.
