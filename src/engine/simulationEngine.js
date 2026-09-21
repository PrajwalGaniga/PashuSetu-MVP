// PASHUSETU CENTRAL EVENT-DRIVEN STATE ENGINE
// Manages shared global case (PS-2026-00421) across all roles: Farmer, Paravet, Vet, Lab, Government, Command Center.

import { DECISION_TRACE_ITEMS } from '../data/simulationData';

export const ROLES = {
  COMMAND_CENTER: 'COMMAND_CENTER',
  FARMER: 'FARMER',
  PARAVET: 'PARAVET',
  VETERINARIAN: 'VETERINARIAN',
  LAB: 'LAB',
  GOVERNMENT: 'GOVERNMENT'
};

export const CASE_WORKFLOW_STEPS = [
  { id: 'FARMER', label: 'FARMER', description: 'Field Sensing & Anomaly Confirmation' },
  { id: 'PARAVET', label: 'PARAVET', description: 'On-Site Physical Verification & Triage' },
  { id: 'VETERINARIAN', label: 'VETERINARIAN', description: 'Clinical Review & Diagnostic Authorization' },
  { id: 'LAB', label: 'LABORATORY', description: 'Molecular RT-PCR Ground Truth Verification' },
  { id: 'GOVERNMENT', label: 'SURVEILLANCE', description: 'National Grid Intelligence & Feedback Loop' }
];

class UnifiedSimulationEngine {
  constructor() {
    this.listeners = new Set();
    this.speed = 1.0;
    this.timer = null;
    this.subTimer = null;
    this.stateData = this.getInitialState();
  }

  getInitialState() {
    return {
      // Navigation & Operational Role
      currentRole: ROLES.COMMAND_CENTER,
      simulationMode: 'MANUAL', // 'MANUAL' or 'AUTO_DEMO'
      speed: this.speed,
      isAutoDemoRunning: false,
      isAutoDemoPaused: false,
      isCaseJourneyOpen: false,

      // Command Center Compatibility State
      currentState: 'IDLE',
      journeyNode: null,
      isRunning: false,
      isPaused: false,
      activeModules: [],
      particlesActive: false,
      feedbackLoopFlowing: false,

      // Shared Global Case: PS-2026-00421
      caseId: 'PS-2026-00421',
      farm: {
        id: 'KA-1023',
        district: 'Hassan District',
        taluk: 'Channarayapatna',
        state: 'Karnataka',
        farmerName: 'Suresh Patel',
        phone: '+91 98452-10234',
        herdSize: 42,
        coordinates: { lat: 13.0033, lng: 76.1004 }
      },
      animal: {
        id: 'CATTLE-17',
        tag: 'Cattle #17',
        species: 'Cattle (Bovine)',
        breed: 'HF Cross (Female)',
        age: '4.2 Years',
        weight: '430 kg',
        collarId: 'IOT-BLE-094'
      },

      // Sensor & Field Telemetry (Both top-level and nested for maximum compatibility)
      temperature: 37.2,
      ammonia: 7,
      airQuality: 21.0,
      movement: 0,
      feeding: 0,
      lameness: 'NOT DETECTED',
      cameraStatus: 'READY',
      iotStatus: 'READY',
      farmerStatus: 'READY',

      telemetry: {
        temperature: 37.2,
        ammonia: 7,
        airQuality: 21.0,
        movement: 0,
        feeding: 0,
        lameness: 'NOT DETECTED',
        cameraStatus: 'READY',
        iotStatus: 'READY',
        farmerStatus: 'READY'
      },

      // Anomaly & Alert State
      anomalyDetected: false,
      farmerAlertGenerated: false,
      farmerVerified: false,
      farmerConfirmed: false,
      offlineQueue: 'SYNCED', // 'IDLE', 'BUFFERED', 'SYNCING', 'SYNCED'
      offlineQueueSynced: true,

      // Case Creation & Risk
      caseCreated: false,
      riskScore: 0,
      priority: 'NORMAL',
      hardRuleTriggered: false,
      activeTraces: [],

      // Paravet State
      paravetNotified: false,
      paravetAssigned: false,
      paravetAccepted: false,
      paravetStatus: 'STANDBY', // STANDBY -> ASSIGNED -> ACCEPTED -> ON_SITE
      paravetChecklist: {
        animalIdentified: true,
        farmerReportReviewed: true,
        symptomsVerified: false,
        observationsRecorded: false
      },
      paravetVerified: false,
      paravetOfficer: {
        name: 'Ramesh Gowda',
        id: 'PV-841',
        phone: '+91 98452-88412',
        vehicle: 'Hassan Central Mobile Unit #4',
        distance: '3.8 km away'
      },

      // Veterinarian State
      vetNotified: false,
      vetReviewed: false,
      vetStatus: 'PENDING', // PENDING -> REVIEWING -> SAMPLE_ORDERED
      sampleRequested: false,
      vetOfficer: {
        name: 'Dr. Ananya Rao, MVSc',
        role: 'District Epizootiologist / Surgeon',
        facility: 'Hassan District Veterinary Hospital'
      },

      // Laboratory State
      labNotified: false,
      labReceived: false,
      labProgress: 0,
      labStatus: 'NO_REQUEST', // 'NO_REQUEST', 'REQUESTED', 'RECEIVED', 'PROCESSING', 'CONFIRMED'
      labConfirmed: false,
      sampleId: 'LAB-2026-8821',
      diagnosticResult: 'FMDV Type O Isolate (Positive)',
      labFacility: {
        name: 'Karnataka State Animal Health & Diagnostic Institute',
        location: 'Bengaluru / Regional Lab Hebbal'
      },

      // Government & Surveillance
      govSurveillanceUpdated: false,
      surveillanceActive: false,
      mapPulse: false,
      activeCasesCount: 127,
      highRiskCount: 18,
      confirmedTodayCount: 3,
      groundTruthRecorded: false,
      groundTruthActive: false,
      feedbackLoopActive: false,

      // Workflow Stage Progression
      currentStage: 'IDLE',
      workflowPassed: {
        farmer: false,
        paravet: false,
        veterinarian: false,
        laboratory: false,
        government: false,
        groundTruth: false
      },

      // Notifications Stack
      notifications: [],

      // System Event Stream Log
      eventLog: [
        { id: 1, time: '22:31:00', text: 'PashuSetu Surveillance Core online. Farm #KA-1023 calibrated.', type: 'normal' }
      ]
    };
  }

  subscribe(listener) {
    this.listeners.add(listener);
    listener(this.stateData);
    return () => this.listeners.delete(listener);
  }

  notify() {
    const copy = { ...this.stateData };
    this.listeners.forEach(fn => fn(copy));
  }

  addEventLog(text, type = 'normal', time = null) {
    const now = new Date();
    const formattedTime = time || `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    const newLog = {
      id: Date.now() + Math.random(),
      time: formattedTime,
      text,
      type
    };
    this.stateData.eventLog = [...this.stateData.eventLog, newLog];
  }

  addNotification(title, message, role = null) {
    const newNotif = {
      id: Date.now() + Math.random(),
      title,
      message,
      role,
      time: new Date().toLocaleTimeString()
    };
    this.stateData.notifications = [newNotif, ...this.stateData.notifications.slice(0, 3)];
    this.notify();

    setTimeout(() => {
      this.stateData.notifications = this.stateData.notifications.filter(n => n.id !== newNotif.id);
      this.notify();
    }, 5000);
  }

  setRole(role) {
    this.stateData.currentRole = role;
    this.notify();
  }

  setSpeed(speed) {
    this.speed = speed;
    this.stateData.speed = speed;
    this.addEventLog(`Simulation speed rate set to ${speed}x.`, 'normal');
    this.notify();
  }

  toggleCaseJourney(open = null) {
    this.stateData.isCaseJourneyOpen = open !== null ? open : !this.stateData.isCaseJourneyOpen;
    this.notify();
  }

  // Sync nested telemetry with top-level fields
  updateTelemetry(key, value) {
    this.stateData[key] = value;
    this.stateData.telemetry[key] = value;
  }

  // ==========================================
  // MANUAL WORKFLOW ACTIONS
  // ==========================================

  // Step 1: Farmer Simulates Health Event Anomaly
  simulateAnomaly() {
    if (this.stateData.anomalyDetected) return;
    this.stateData.anomalyDetected = true;
    this.stateData.currentState = 'DETECTING';
    this.stateData.journeyNode = 'REPORTED';
    this.stateData.currentStage = 'FARMER';
    this.updateTelemetry('cameraStatus', 'ANALYZING');
    this.updateTelemetry('iotStatus', 'ANALYZING');
    this.stateData.activeModules = ['camera', 'iot'];
    this.stateData.particlesActive = true;

    this.addEventLog('Field Observation: Camera CV detects unusual gait & recumbency on Cattle #17.', 'highlight');
    this.notify();

    let step = 0;
    const interval = 500 / this.speed;
    this.subTimer = setInterval(() => {
      step++;
      if (step === 1) {
        this.updateTelemetry('movement', -12);
        this.updateTelemetry('temperature', 37.6);
        this.updateTelemetry('feeding', -10);
        this.notify();
      } else if (step === 2) {
        this.updateTelemetry('movement', -25);
        this.updateTelemetry('temperature', 38.1);
        this.updateTelemetry('feeding', -20);
        this.updateTelemetry('ammonia', 10);
        this.updateTelemetry('cameraStatus', 'DETECTED');
        this.notify();
      } else if (step >= 3) {
        this.updateTelemetry('movement', -42);
        this.updateTelemetry('temperature', 38.5);
        this.updateTelemetry('feeding', -31);
        this.updateTelemetry('ammonia', 12);
        this.updateTelemetry('airQuality', 18.2);
        this.updateTelemetry('lameness', 'DETECTED');
        this.updateTelemetry('iotStatus', 'DETECTED');

        this.stateData.farmerAlertGenerated = true;
        this.stateData.offlineQueue = 'BUFFERED';
        this.stateData.offlineQueueSynced = false;
        clearInterval(this.subTimer);

        this.addEventLog('IoT Telemetry Alert: Temperature spiked to 38.5°C, Feeding drop 31%.', 'critical');
        this.addEventLog('Farmer Mobile Alert dispatched: Cattle #17 health anomaly.', 'highlight');
        this.addNotification('Farmer Health Alert', 'Cattle #17 unusual behaviour detected on Farm #KA-1023.', 'FARMER');
        this.notify();
      }
    }, interval);
  }

  // Step 2: Farmer Confirms Alert on Phone
  confirmFarmerAlert() {
    if (!this.stateData.farmerAlertGenerated || this.stateData.farmerConfirmed) return;
    this.stateData.farmerConfirmed = true;
    this.stateData.farmerVerified = true;
    this.stateData.workflowPassed.farmer = true;
    this.stateData.offlineQueue = 'SYNCING';
    this.updateTelemetry('farmerStatus', 'CONFIRMED');

    this.addEventLog('Farmer Suresh Patel verified anomaly on ground via mobile app.', 'success');
    this.notify();

    setTimeout(() => {
      this.stateData.offlineQueue = 'SYNCED';
      this.stateData.offlineQueueSynced = true;
      this.stateData.caseCreated = true;
      this.stateData.currentState = 'CASE_CREATED';
      this.stateData.riskScore = 87;
      this.stateData.priority = 'PRIORITY 01';
      this.stateData.hardRuleTriggered = true;
      this.stateData.activeTraces = DECISION_TRACE_ITEMS.map(i => i.id);

      // Notify Paravet
      this.stateData.paravetNotified = true;
      this.stateData.paravetAssigned = true;
      this.stateData.paravetStatus = 'ASSIGNED';
      this.stateData.currentStage = 'PARAVET';
      this.stateData.journeyNode = 'TRIAGED';

      this.addEventLog('Unified Case created: PS-2026-00421 bound to Cattle #17.', 'highlight');
      this.addEventLog('Bayesian Risk Engine calculated: Score 87 / 100 [Priority P1 Critical].', 'critical');
      this.addEventLog('Hard escalation rule triggered: Acute Febrile Anomaly Protocol.', 'critical');
      this.addEventLog('Paravet Ramesh Gowda (PV-841) notified & geo-dispatched.', 'highlight');
      this.addNotification('Paravet Dispatch', 'New Case PS-2026-00421 assigned for field verification.', 'PARAVET');
      this.notify();
    }, 800 / this.speed);
  }

  // Step 3: Paravet Accepts Case
  acceptParavetCase() {
    if (!this.stateData.paravetAssigned || this.stateData.paravetAccepted) return;
    this.stateData.paravetAccepted = true;
    this.stateData.paravetStatus = 'ACCEPTED';
    this.stateData.journeyNode = 'ESCALATED';
    this.addEventLog('Paravet Ramesh Gowda accepted dispatch. En route to Farm #KA-1023.', 'normal');
    this.notify();

    setTimeout(() => {
      this.stateData.paravetStatus = 'ON_SITE';
      this.addEventLog('Paravet arrived on site at Farm #KA-1023.', 'success');
      this.notify();
    }, 1200 / this.speed);
  }

  // Step 4: Paravet Toggles Checklist Items
  toggleParavetChecklist(itemKey) {
    this.stateData.paravetChecklist[itemKey] = !this.stateData.paravetChecklist[itemKey];
    this.notify();
  }

  // Step 5: Paravet Submits Field Verification Report
  verifyParavetReport() {
    if (!this.stateData.paravetAccepted || this.stateData.paravetVerified) return;
    this.stateData.paravetChecklist.symptomsVerified = true;
    this.stateData.paravetChecklist.observationsRecorded = true;
    this.stateData.paravetVerified = true;
    this.stateData.workflowPassed.paravet = true;

    // Escalate to Veterinarian
    this.stateData.vetNotified = true;
    this.stateData.vetStatus = 'REVIEWING';
    this.stateData.currentStage = 'VET';

    this.addEventLog('Paravet verified physical symptoms consistent with reported anomaly.', 'success');
    this.addEventLog('Case PS-2026-00421 escalated to District Veterinarian Dr. Ananya Rao.', 'highlight');
    this.addNotification('Veterinarian Triage', 'New Verified Case PS-2026-00421 awaiting clinical review.', 'VETERINARIAN');
    this.notify();
  }

  // Step 6: Veterinarian Reviews Case & Requests Lab Sample
  requestLabSample() {
    if (!this.stateData.paravetVerified || this.stateData.sampleRequested) return;
    this.stateData.vetReviewed = true;
    this.stateData.vetStatus = 'SAMPLE_ORDERED';
    this.stateData.sampleRequested = true;
    this.stateData.workflowPassed.veterinarian = true;
    this.stateData.journeyNode = 'SAMPLED';

    // Notify Laboratory
    this.stateData.labNotified = true;
    this.stateData.labStatus = 'REQUESTED';
    this.stateData.currentStage = 'LAB';

    this.addEventLog('Veterinarian Dr. Ananya Rao reviewed multimodal clinical evidence.', 'normal');
    this.addEventLog('Clinical Decision: Laboratory biological testing ordered. Sample ID: LAB-2026-8821.', 'critical');
    this.addNotification('Laboratory Request', 'New sample order LAB-2026-8821 received from Field Unit.', 'LAB');
    this.notify();
  }

  // Step 7: Lab Technician Receives Sample
  receiveLabSample() {
    if (!this.stateData.sampleRequested || this.stateData.labReceived) return;
    this.stateData.labReceived = true;
    this.stateData.labStatus = 'RECEIVED';
    this.addEventLog('Lab received specimen LAB-2026-8821. Digital cold chain verified (4°C).', 'normal');
    this.notify();
  }

  // Step 8: Lab Technician Starts RT-PCR Assay
  startLabTest() {
    if (!this.stateData.labReceived || this.stateData.labProgress > 0) return;
    this.stateData.labStatus = 'PROCESSING';
    this.addEventLog('Automated RT-PCR & ELISA assay initiated in microfluidic cycler.', 'highlight');
    this.notify();

    const progressMilestones = [25, 50, 75, 100];
    let pIdx = 0;
    const progressInterval = 800 / this.speed;

    this.subTimer = setInterval(() => {
      if (pIdx < progressMilestones.length) {
        this.stateData.labProgress = progressMilestones[pIdx];
        this.notify();
        pIdx++;
      } else {
        clearInterval(this.subTimer);
        this.addEventLog('Fluorescence detection complete: High-titer nucleic isolate identified.', 'highlight');
        this.notify();
      }
    }, progressInterval);
  }

  // Step 9: Lab Confirms Result & Acquires Ground Truth
  confirmLabResult() {
    if (this.stateData.labProgress < 100 || this.stateData.labConfirmed) return;
    this.stateData.labConfirmed = true;
    this.stateData.labStatus = 'CONFIRMED';
    this.stateData.workflowPassed.laboratory = true;
    this.stateData.journeyNode = 'CONFIRMED';

    // Update Government Surveillance & Record Ground Truth
    this.stateData.govSurveillanceUpdated = true;
    this.stateData.surveillanceActive = true;
    this.stateData.mapPulse = true;
    this.stateData.groundTruthRecorded = true;
    this.stateData.groundTruthActive = true;
    this.stateData.workflowPassed.government = true;
    this.stateData.workflowPassed.groundTruth = true;
    this.stateData.currentStage = 'GOV';

    this.addEventLog('Diagnostic result CONFIRMED: Positive FMDV Type O isolate.', 'critical');
    this.addEventLog('Ground Truth acquired and recorded in national epidemiological repository.', 'success');
    this.addEventLog('National Disease Surveillance Grid synchronized for Karnataka (Hassan Cluster).', 'highlight');
    this.addNotification('National Surveillance Alert', 'Confirmed FMDV event recorded in Karnataka cluster.', 'GOVERNMENT');
    this.notify();

    setTimeout(() => {
      this.stateData.feedbackLoopActive = true;
      this.stateData.feedbackLoopFlowing = true;
      this.stateData.journeyNode = 'SURVEILLANCE';
      this.stateData.currentStage = 'COMPLETED';
      this.addEventLog('Ground Truth feedback loop closed: Recalibrating Bayesian priors & outbreak history.', 'success');
      this.notify();
    }, 1500 / this.speed);
  }

  // ==========================================
  // AUTO DEMO MODE
  // ==========================================
  startAutoDemo() {
    this.resetCase();
    this.stateData.simulationMode = 'AUTO_DEMO';
    this.stateData.isAutoDemoRunning = true;
    this.stateData.isAutoDemoPaused = false;
    this.addEventLog('AUTO DEMO initiated: Watching case move across all roles.', 'highlight');
    this.notify();

    const runStep = (action, delay) => {
      return new Promise(resolve => {
        this.timer = setTimeout(() => {
          if (this.stateData.isAutoDemoRunning && !this.stateData.isAutoDemoPaused) {
            action();
            resolve();
          }
        }, delay / this.speed);
      });
    };

    (async () => {
      // Step 1: Farmer view & anomaly
      this.setRole(ROLES.FARMER);
      await runStep(() => this.simulateAnomaly(), 1200);

      // Step 2: Confirm alert
      await runStep(() => this.confirmFarmerAlert(), 3400);

      // Step 3: Paravet view
      await runStep(() => this.setRole(ROLES.PARAVET), 1800);
      await runStep(() => this.acceptParavetCase(), 1800);
      await runStep(() => this.verifyParavetReport(), 2600);

      // Step 4: Veterinarian view
      await runStep(() => this.setRole(ROLES.VETERINARIAN), 1800);
      await runStep(() => this.requestLabSample(), 3000);

      // Step 5: Lab view
      await runStep(() => this.setRole(ROLES.LAB), 1800);
      await runStep(() => this.receiveLabSample(), 1500);
      await runStep(() => this.startLabTest(), 1400);

      // Wait for 100% assay
      await runStep(() => this.confirmLabResult(), 4200);

      // Step 6: Government view
      await runStep(() => this.setRole(ROLES.GOVERNMENT), 1800);

      this.stateData.isAutoDemoRunning = false;
      this.notify();
    })();
  }

  pauseAutoDemo() {
    this.stateData.isAutoDemoPaused = true;
    this.addEventLog('AUTO DEMO paused.', 'normal');
    this.notify();
  }

  resumeAutoDemo() {
    this.stateData.isAutoDemoPaused = false;
    this.addEventLog('AUTO DEMO resumed.', 'normal');
    this.notify();
  }

  resetCase() {
    clearTimeout(this.timer);
    clearInterval(this.subTimer);
    const role = this.stateData.currentRole;
    this.stateData = this.getInitialState();
    this.stateData.currentRole = role;
    this.addEventLog('Case PS-2026-00421 reset to baseline state. System ready.', 'normal');
    this.notify();
  }

  // Backward compatibility alias for Command Center start button
  start() {
    this.startAutoDemo();
  }

  pause() {
    this.pauseAutoDemo();
  }

  resume() {
    this.resumeAutoDemo();
  }

  reset() {
    this.resetCase();
  }
}

export const unifiedSimulationEngine = new UnifiedSimulationEngine();
export const simulationEngine = unifiedSimulationEngine;
