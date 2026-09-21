// PASHUSETU DETERMINISTIC STATE MACHINE DEFINITION

export const SIMULATION_STATES = {
  IDLE: 'IDLE',
  DETECTING: 'DETECTING',
  SIGNAL_AGGREGATION: 'SIGNAL_AGGREGATION',
  FARMER_VERIFICATION: 'FARMER_VERIFICATION',
  CASE_CREATED: 'CASE_CREATED',
  RISK_ASSESSMENT: 'RISK_ASSESSMENT',
  PRIORITY_ASSIGNED: 'PRIORITY_ASSIGNED',
  PARAVET_ASSIGNED: 'PARAVET_ASSIGNED',
  VETERINARIAN_REVIEW: 'VETERINARIAN_REVIEW',
  SAMPLE_COLLECTION: 'SAMPLE_COLLECTION',
  LAB_PROCESSING: 'LAB_PROCESSING',
  LAB_CONFIRMED: 'LAB_CONFIRMED',
  GOVERNMENT_SURVEILLANCE: 'GOVERNMENT_SURVEILLANCE',
  GROUND_TRUTH: 'GROUND_TRUTH',
  COMPLETED: 'COMPLETED'
};

export const STATE_SEQUENCE = [
  SIMULATION_STATES.IDLE,
  SIMULATION_STATES.DETECTING,
  SIMULATION_STATES.SIGNAL_AGGREGATION,
  SIMULATION_STATES.FARMER_VERIFICATION,
  SIMULATION_STATES.CASE_CREATED,
  SIMULATION_STATES.RISK_ASSESSMENT,
  SIMULATION_STATES.PRIORITY_ASSIGNED,
  SIMULATION_STATES.PARAVET_ASSIGNED,
  SIMULATION_STATES.VETERINARIAN_REVIEW,
  SIMULATION_STATES.SAMPLE_COLLECTION,
  SIMULATION_STATES.LAB_PROCESSING,
  SIMULATION_STATES.LAB_CONFIRMED,
  SIMULATION_STATES.GOVERNMENT_SURVEILLANCE,
  SIMULATION_STATES.GROUND_TRUTH,
  SIMULATION_STATES.COMPLETED
];

// Configuration for each state including duration (in ms at 1x speed),
// journey node, telemetry, and event messages
export const STATE_CONFIG = {
  [SIMULATION_STATES.IDLE]: {
    duration: 0,
    journeyNode: null,
    title: 'SYSTEM READY',
    description: 'Surveillance sensors calibrated. Monitoring herd baseline.',
    events: [
      { time: '22:31:00', text: 'System initialized. Multi-sensor bus calibrated.', type: 'normal' }
    ]
  },
  [SIMULATION_STATES.DETECTING]: {
    duration: 5200,
    journeyNode: 'REPORTED',
    title: 'ANOMALY DETECTED',
    description: 'Field sensors detect deviations in bovine vital metrics.',
    events: [
      { time: '22:31:04', text: 'Camera CV anomaly detected: Gait asymmetry & reduced mobility', type: 'highlight' },
      { time: '22:31:05', text: 'IoT telemetry alert: Core body temperature spiked to 38.5°C', type: 'critical' }
    ]
  },
  [SIMULATION_STATES.SIGNAL_AGGREGATION]: {
    duration: 4000,
    journeyNode: 'REPORTED',
    title: 'MULTIMODAL AGGREGATION',
    description: 'Converging computer vision, IoT telemetry, and microclimate feeds.',
    events: [
      { time: '22:31:06', text: 'Multi-sensor data packets routed to Intelligence Core', type: 'highlight' },
      { time: '22:31:06', text: 'Ingesting microclimate (ammonia 12 ppm, humidity index elevated)', type: 'normal' }
    ]
  },
  [SIMULATION_STATES.FARMER_VERIFICATION]: {
    duration: 4500,
    journeyNode: 'REPORTED',
    title: 'FARMER VERIFICATION',
    description: 'Offline-first field prompt dispatched to farmer mobile device.',
    events: [
      { time: '22:31:07', text: 'Farmer alert dispatched via offline-first messaging queue', type: 'normal' },
      { time: '22:31:08', text: 'Farmer verification received: Anomaly confirmed by caretaker', type: 'success' },
      { time: '22:31:08', text: 'Offline queue synced with cloud registry', type: 'normal' }
    ]
  },
  [SIMULATION_STATES.CASE_CREATED]: {
    duration: 3500,
    journeyNode: 'REPORTED',
    title: 'UNIFIED CASE CREATED',
    description: 'Multi-source signals bound into unified dossier PS-2026-00421.',
    events: [
      { time: '22:31:09', text: 'Unified case created: Case ID PS-2026-00421', type: 'highlight' },
      { time: '22:31:09', text: 'Bound 6 field signals to Cattle #17 (Farm #KA-1023)', type: 'normal' }
    ]
  },
  [SIMULATION_STATES.RISK_ASSESSMENT]: {
    duration: 5200,
    journeyNode: 'TRIAGED',
    title: 'BAYESIAN RISK ENGINE',
    description: 'Evaluating decision trace across clinical and environmental factors.',
    events: [
      { time: '22:31:10', text: 'Risk engine calculating composite epidemiological score', type: 'normal' },
      { time: '22:31:11', text: 'Risk score synthesized: 87 / 100 [HIGH RISK]', type: 'critical' }
    ]
  },
  [SIMULATION_STATES.PRIORITY_ASSIGNED]: {
    duration: 4000,
    journeyNode: 'TRIAGED',
    title: 'PRIORITY ESCALATION',
    description: 'Hard escalation rule triggered due to febrile cluster profile.',
    events: [
      { time: '22:31:11', text: 'Priority assigned: P1 (Critical Immediate Action)', type: 'critical' },
      { time: '22:31:12', text: 'Hard escalation rule triggered: Acute Febrile Anomaly Protocol', type: 'critical' }
    ]
  },
  [SIMULATION_STATES.PARAVET_ASSIGNED]: {
    duration: 5500,
    journeyNode: 'ESCALATED',
    title: 'PARAVET DISPATCH',
    description: 'Field agent geolocated and routed for biological sample collection.',
    events: [
      { time: '22:31:13', text: 'Paravet Ramesh Gowda (PV-841) assigned (3.8 km away)', type: 'highlight' },
      { time: '22:31:15', text: 'Paravet accepted dispatch on mobile terminal', type: 'normal' },
      { time: '22:31:18', text: 'Paravet arrived on site at Farm #KA-1023', type: 'success' }
    ]
  },
  [SIMULATION_STATES.VETERINARIAN_REVIEW]: {
    duration: 4800,
    journeyNode: 'ESCALATED',
    title: 'VETERINARIAN TELE-REVIEW',
    description: 'Medical triage officer verifies symptom constellation.',
    events: [
      { time: '22:31:25', text: 'Veterinarian Dr. Ananya Rao reviewing case telemetry', type: 'normal' },
      { time: '22:31:27', text: 'Clinical decision: Laboratory biological sampling authorized', type: 'highlight' }
    ]
  },
  [SIMULATION_STATES.SAMPLE_COLLECTION]: {
    duration: 4500,
    journeyNode: 'SAMPLED',
    title: 'BIOLOGICAL SAMPLING',
    description: 'Specimen collected with verified digital chain of custody.',
    events: [
      { time: '22:31:40', text: 'Cold chain secured: Active cold container #C-12 verified at 4°C', type: 'normal' },
      { time: '22:31:48', text: 'Sample LAB-2026-8821 sealed & dispatched to State Institute', type: 'highlight' }
    ]
  },
  [SIMULATION_STATES.LAB_PROCESSING]: {
    duration: 6500,
    journeyNode: 'SAMPLED',
    title: 'LABORATORY PCR PROCESSING',
    description: 'Automated molecular assay undergoing thermal cycling.',
    events: [
      { time: '22:32:05', text: 'Sample received at State Animal Health & Diagnostic Institute', type: 'normal' },
      { time: '22:32:19', text: 'Multiplex RT-PCR & ELISA assay processing in progress', type: 'highlight' }
    ]
  },
  [SIMULATION_STATES.LAB_CONFIRMED]: {
    duration: 4500,
    journeyNode: 'CONFIRMED',
    title: 'DIAGNOSTIC CONFIRMED',
    description: 'High-titer isolate identified. Ground truth verification established.',
    events: [
      { time: '22:32:41', text: 'Diagnostic result confirmed: Positive FMDV Type O isolate', type: 'critical' },
      { time: '22:32:41', text: 'Ground truth acquired: Verified biological benchmark', type: 'success' }
    ]
  },
  [SIMULATION_STATES.GOVERNMENT_SURVEILLANCE]: {
    duration: 5500,
    journeyNode: 'SURVEILLANCE',
    title: 'GOVERNMENT SURVEILLANCE',
    description: 'Synchronized with National Disease Surveillance Grid & Bharat Pashudhan.',
    events: [
      { time: '22:32:42', text: 'Government surveillance updated: Karnataka epicenter alerted', type: 'highlight' },
      { time: '22:32:43', text: 'Regional ring-containment advisory broadcast to District Officers', type: 'normal' }
    ]
  },
  [SIMULATION_STATES.GROUND_TRUTH]: {
    duration: 5200,
    journeyNode: 'SURVEILLANCE',
    title: 'GROUND TRUTH FEEDBACK',
    description: 'Verified clinical outcome feeds back to recalibrate system intelligence.',
    events: [
      { time: '22:32:43', text: 'Ground truth feedback loop initiated: Returning to Core', type: 'highlight' },
      { time: '22:32:44', text: 'Model weights & Bayesian priors calibrated for Hassan cluster', type: 'success' },
      { time: '22:32:45', text: 'Epidemiological outbreak graph updated with confirmed isolate', type: 'normal' }
    ]
  },
  [SIMULATION_STATES.COMPLETED]: {
    duration: 0,
    journeyNode: 'SURVEILLANCE',
    title: 'CASE RESOLVED & SIMULATION COMPLETE',
    description: 'Full field-to-lab surveillance lifecycle executed successfully.',
    events: [
      { time: '22:32:46', text: 'Case PS-2026-00421 complete. Intelligence loop closed.', type: 'success' }
    ]
  }
};
