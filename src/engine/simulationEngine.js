// PASHUSETU EVENT-DRIVEN SIMULATION ENGINE
// Decoupled architecture allowing seamless drop-in replacement with FastAPI/WebSocket backend

import { SIMULATION_STATES, STATE_SEQUENCE, STATE_CONFIG } from './stateMachine';
import { DECISION_TRACE_ITEMS } from '../data/simulationData';

class SimulationEngine {
  constructor() {
    this.listeners = new Set();
    this.speed = 1.0;
    this.stateIndex = 0;
    this.isRunning = false;
    this.isPaused = false;
    this.timer = null;
    this.subStepTimer = null;
    this.remainingDuration = 0;
    this.stepStartTime = 0;

    // Internal telemetry state
    this.stateData = this.getInitialState();
  }

  getInitialState() {
    return {
      currentState: SIMULATION_STATES.IDLE,
      stateIndex: 0,
      journeyNode: null,
      speed: this.speed,
      isRunning: false,
      isPaused: false,

      // Live Field Telemetry
      temperature: 37.2,
      movement: 0,
      feeding: 0,
      ammonia: 12,
      airQuality: 18.2,
      lameness: 'NORMAL',

      // Sensor Statuses
      cameraStatus: 'READY',
      iotStatus: 'READY',
      farmerStatus: 'READY',

      // Central Risk Engine
      riskScore: 0,
      priority: 'NORMAL',
      hardRuleTriggered: false,
      activeTraces: [],

      // Active Modules & Particles
      activeModules: [],
      particlesActive: false,

      // Farmer Verification Stage
      farmerModalOpen: false,
      farmerVerified: false,
      offlineQueueSynced: false,

      // Case Creation
      caseCreated: false,
      caseId: 'PS-2026-00421',

      // Paravet Stage
      paravetAssigned: false,
      paravetStatus: 'STANDBY', // STANDBY -> ASSIGNED -> ACCEPTED -> ON_SITE

      // Veterinarian Stage
      vetReviewed: false,
      vetStatus: 'PENDING', // PENDING -> REVIEWING -> SAMPLE_ORDERED

      // Laboratory Stage
      labSampleId: 'LAB-2026-8821',
      labProgress: 0,
      labStatus: 'WAITING', // WAITING -> RECEIVED -> PROCESSING -> CONFIRMED

      // Government Surveillance
      surveillanceActive: false,
      mapPulse: false,

      // Ground Truth Feedback Loop
      groundTruthActive: false,
      feedbackLoopFlowing: false,

      // System Event Log
      eventLog: [
        { id: 1, time: '22:31:00', text: 'PashuSetu Surveillance Core calibrated. Systems online.', type: 'normal' }
      ]
    };
  }

  subscribe(listener) {
    this.listeners.add(listener);
    // Immediately emit current state
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

  start() {
    if (this.isRunning && !this.isPaused) return;
    if (this.isPaused) {
      this.resume();
      return;
    }

    this.isRunning = true;
    this.isPaused = false;
    this.stateIndex = 0;
    this.stateData = this.getInitialState();
    this.stateData.isRunning = true;
    this.addEventLog('Live Simulation started. Initiating continuous field observation.', 'highlight');
    this.notify();

    // Transition from IDLE to first active state (DETECTING)
    this.transitionTo(1);
  }

  pause() {
    if (!this.isRunning || this.isPaused) return;
    this.isPaused = true;
    this.stateData.isPaused = true;
    clearTimeout(this.timer);
    clearInterval(this.subStepTimer);

    // Record elapsed time to resume cleanly
    const elapsed = Date.now() - this.stepStartTime;
    const nominal = (STATE_CONFIG[STATE_SEQUENCE[this.stateIndex]]?.duration || 4000) / this.speed;
    this.remainingDuration = Math.max(0, nominal - elapsed);

    this.addEventLog(`Simulation PAUSED at state [${STATE_SEQUENCE[this.stateIndex]}].`, 'normal');
    this.notify();
  }

  resume() {
    if (!this.isRunning || !this.isPaused) return;
    this.isPaused = false;
    this.stateData.isPaused = false;
    this.addEventLog(`Simulation RESUMED.`, 'normal');
    this.notify();

    const duration = this.remainingDuration || 2000;
    this.stepStartTime = Date.now();
    this.timer = setTimeout(() => {
      this.nextState();
    }, duration);
  }

  reset() {
    clearTimeout(this.timer);
    clearInterval(this.subStepTimer);
    this.isRunning = false;
    this.isPaused = false;
    this.stateIndex = 0;
    this.stateData = this.getInitialState();
    this.addEventLog('Simulation reset to initial calm state. System ready.', 'normal');
    this.notify();
  }

  setSpeed(speed) {
    this.speed = speed;
    this.stateData.speed = speed;
    this.addEventLog(`Simulation clock rate adjusted to ${speed}x.`, 'normal');
    this.notify();

    // If running, adjust current timer with new speed
    if (this.isRunning && !this.isPaused) {
      clearTimeout(this.timer);
      clearInterval(this.subStepTimer);
      const elapsed = (Date.now() - this.stepStartTime);
      const originalDuration = STATE_CONFIG[STATE_SEQUENCE[this.stateIndex]]?.duration || 4000;
      const remainingAtNewSpeed = Math.max(200, (originalDuration / this.speed) - (elapsed * (this.speed)));
      this.stepStartTime = Date.now();
      this.timer = setTimeout(() => {
        this.nextState();
      }, remainingAtNewSpeed);
    }
  }

  nextState() {
    if (this.stateIndex >= STATE_SEQUENCE.length - 1) {
      this.completeSimulation();
      return;
    }
    this.transitionTo(this.stateIndex + 1);
  }

  transitionTo(index) {
    clearTimeout(this.timer);
    clearInterval(this.subStepTimer);

    this.stateIndex = index;
    const state = STATE_SEQUENCE[index];
    const config = STATE_CONFIG[state];

    this.stateData.currentState = state;
    this.stateData.stateIndex = index;
    this.stateData.journeyNode = config.journeyNode;

    // Apply state-specific transitions & animations
    this.applyStatePayload(state);

    // Push state config events to event stream
    if (config.events && config.events.length > 0) {
      config.events.forEach(evt => {
        this.addEventLog(evt.text, evt.type, evt.time);
      });
    }

    this.notify();

    if (state === SIMULATION_STATES.COMPLETED) {
      this.completeSimulation();
      return;
    }

    const duration = (config.duration || 4000) / this.speed;
    this.stepStartTime = Date.now();
    this.remainingDuration = duration;

    this.timer = setTimeout(() => {
      this.nextState();
    }, duration);
  }

  applyStatePayload(state) {
    switch (state) {
      case SIMULATION_STATES.DETECTING:
        // Animate metrics gradually: Temp 37.2 -> 38.5, Movement 0 -> -42%, Feeding 0 -> -31%
        this.stateData.cameraStatus = 'ANALYZING';
        this.stateData.iotStatus = 'ANALYZING';
        this.stateData.activeModules = ['camera', 'iot'];

        let detectStep = 0;
        const subInterval = 600 / this.speed;
        this.subStepTimer = setInterval(() => {
          detectStep++;
          if (detectStep === 1) {
            this.stateData.temperature = 37.6;
            this.stateData.movement = -12;
            this.stateData.feeding = -10;
            this.notify();
          } else if (detectStep === 2) {
            this.stateData.temperature = 38.1;
            this.stateData.movement = -27;
            this.stateData.feeding = -22;
            this.stateData.cameraStatus = 'DETECTED';
            this.notify();
          } else if (detectStep >= 3) {
            this.stateData.temperature = 38.5;
            this.stateData.movement = -42;
            this.stateData.feeding = -31;
            this.stateData.lameness = 'DETECTED';
            this.stateData.iotStatus = 'DETECTED';
            clearInterval(this.subStepTimer);
            this.notify();
          }
        }, subInterval);
        break;

      case SIMULATION_STATES.SIGNAL_AGGREGATION:
        this.stateData.activeModules = ['camera', 'iot', 'weather', 'outbreak'];
        this.stateData.particlesActive = true;
        break;

      case SIMULATION_STATES.FARMER_VERIFICATION:
        this.stateData.farmerModalOpen = true;
        this.stateData.farmerStatus = 'ANALYZING';
        this.stateData.activeModules = ['farmer'];

        // Automatically simulate farmer clicking confirm alert after a brief pause
        setTimeout(() => {
          if (this.isRunning) {
            this.stateData.farmerVerified = true;
            this.stateData.farmerStatus = 'CONFIRMED';
            this.stateData.offlineQueueSynced = true;
            this.notify();
          }
        }, 1800 / this.speed);
        break;

      case SIMULATION_STATES.CASE_CREATED:
        this.stateData.farmerModalOpen = false;
        this.stateData.caseCreated = true;
        this.stateData.activeModules = ['camera', 'iot', 'farmer', 'weather', 'outbreak', 'nadres', 'pashudhan'];
        break;

      case SIMULATION_STATES.RISK_ASSESSMENT:
        // Animate risk score from 00 -> 18 -> 34 -> 51 -> 69 -> 87
        const riskSteps = [18, 34, 51, 69, 87];
        let stepIdx = 0;
        const riskInterval = 800 / this.speed;

        this.subStepTimer = setInterval(() => {
          if (stepIdx < riskSteps.length) {
            this.stateData.riskScore = riskSteps[stepIdx];
            this.stateData.activeTraces = DECISION_TRACE_ITEMS.slice(0, stepIdx + 2).map(i => i.id);
            if (this.stateData.riskScore >= 50) {
              this.stateData.priority = 'HIGH';
            }
            if (this.stateData.riskScore >= 80) {
              this.stateData.priority = 'CRITICAL';
            }
            this.notify();
            stepIdx++;
          } else {
            clearInterval(this.subStepTimer);
          }
        }, riskInterval);
        break;

      case SIMULATION_STATES.PRIORITY_ASSIGNED:
        this.stateData.riskScore = 87;
        this.stateData.priority = 'PRIORITY 01';
        this.stateData.hardRuleTriggered = true;
        this.stateData.activeTraces = DECISION_TRACE_ITEMS.map(i => i.id);
        break;

      case SIMULATION_STATES.PARAVET_ASSIGNED:
        this.stateData.paravetAssigned = true;
        this.stateData.paravetStatus = 'ASSIGNED';
        setTimeout(() => {
          if (this.isRunning) {
            this.stateData.paravetStatus = 'ACCEPTED';
            this.notify();
          }
        }, 1800 / this.speed);
        setTimeout(() => {
          if (this.isRunning) {
            this.stateData.paravetStatus = 'ON_SITE';
            this.notify();
          }
        }, 3600 / this.speed);
        break;

      case SIMULATION_STATES.VETERINARIAN_REVIEW:
        this.stateData.vetReviewed = true;
        this.stateData.vetStatus = 'REVIEWING';
        setTimeout(() => {
          if (this.isRunning) {
            this.stateData.vetStatus = 'SAMPLE_ORDERED';
            this.notify();
          }
        }, 2200 / this.speed);
        break;

      case SIMULATION_STATES.SAMPLE_COLLECTION:
        this.stateData.labStatus = 'RECEIVED';
        break;

      case SIMULATION_STATES.LAB_PROCESSING:
        this.stateData.labStatus = 'PROCESSING';
        const progressSteps = [20, 45, 67, 84, 100];
        let pIdx = 0;
        const labInterval = 900 / this.speed;
        this.subStepTimer = setInterval(() => {
          if (pIdx < progressSteps.length) {
            this.stateData.labProgress = progressSteps[pIdx];
            this.notify();
            pIdx++;
          } else {
            clearInterval(this.subStepTimer);
          }
        }, labInterval);
        break;

      case SIMULATION_STATES.LAB_CONFIRMED:
        this.stateData.labProgress = 100;
        this.stateData.labStatus = 'CONFIRMED';
        break;

      case SIMULATION_STATES.GOVERNMENT_SURVEILLANCE:
        this.stateData.surveillanceActive = true;
        this.stateData.mapPulse = true;
        break;

      case SIMULATION_STATES.GROUND_TRUTH:
        this.stateData.groundTruthActive = true;
        this.stateData.feedbackLoopFlowing = true;
        break;

      case SIMULATION_STATES.COMPLETED:
        this.stateData.isRunning = false;
        this.stateData.isPaused = false;
        this.stateData.particlesActive = false;
        this.stateData.feedbackLoopFlowing = false;
        break;

      default:
        break;
    }
  }

  completeSimulation() {
    this.isRunning = false;
    this.isPaused = false;
    this.stateData.currentState = SIMULATION_STATES.COMPLETED;
    this.stateData.isRunning = false;
    this.stateData.isPaused = false;
    this.notify();
  }
}

// Singleton instance for application runtime
export const simulationEngine = new SimulationEngine();
