import React from 'react';
import { 
  UserCheck, 
  WifiOff, 
  FileText, 
  UserPlus, 
  Stethoscope, 
  TestTubes, 
  MapPin, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  Truck,
  Building,
  RotateCcw
} from 'lucide-react';
import { SIMULATION_STATES } from '../../engine/stateMachine';
import { SURVEILLANCE_STATS } from '../../data/simulationData';

export function WorkflowBays({
  currentState,
  farmerVerified,
  offlineQueueSynced,
  caseCreated,
  paravetStatus,
  vetStatus,
  labStatus,
  labProgress,
  onReset
}) {
  // Renders contextual operational bay based on currentState
  const renderBayContent = () => {
    switch (currentState) {
      case SIMULATION_STATES.IDLE:
      case SIMULATION_STATES.DETECTING:
      case SIMULATION_STATES.SIGNAL_AGGREGATION:
        return (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
            <div>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#64748b', fontWeight: 600 }}>
                OPERATIONAL PIPELINE STANDBY
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-main)', marginTop: 4 }}>
                {currentState === SIMULATION_STATES.IDLE 
                  ? 'Awaiting Livestock Health Anomaly Detection'
                  : 'Multimodal Sensor Convergence in Progress...'}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginTop: 4 }}>
                Cross-referencing CV computer vision, IoT telemetry, and local herd baseline.
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="led-jewel led-blue led-pulse"></span>
              <span className="status-pill status-ready">MONITORING</span>
            </div>
          </div>
        );

      case SIMULATION_STATES.FARMER_VERIFICATION:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <UserCheck size={14} color="#2563eb" />
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-main)' }}>
                  FARMER VERIFICATION MODULE
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <WifiOff size={11} color="#64748b" />
                <span className="status-pill" style={{ fontSize: 9 }}>
                  {offlineQueueSynced ? 'OFFLINE QUEUE -> SYNCED' : 'OFFLINE BUFFER ACTIVE'}
                </span>
              </div>
            </div>

            <div style={{ 
              background: '#f8fafc', 
              padding: '6px 10px', 
              borderRadius: 'var(--radius-sm)', 
              border: '1px solid #e2e8f0',
              fontSize: 11
            }}>
              <span style={{ fontWeight: 600, color: '#1e293b' }}>Alert: </span>
              <span style={{ color: '#475569' }}>Possible livestock health anomaly detected at Farm #KA-1023 (Cattle #17).</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <button 
                  className={`tactile-btn ${farmerVerified ? 'is-depressed' : 'tactile-btn-primary'}`}
                  style={{ fontSize: 10, padding: '4px 10px' }}
                >
                  {farmerVerified ? '✓ CONFIRMED BY FARMER' : '[ CONFIRM ALERT ]'}
                </button>
                <button 
                  className="tactile-btn tactile-btn-secondary"
                  style={{ fontSize: 10, padding: '4px 10px' }}
                  disabled={farmerVerified}
                >
                  [ DISMISS ]
                </button>
              </div>

              {farmerVerified && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#15803d', fontWeight: 600, fontSize: 11 }}>
                  <CheckCircle2 size={13} />
                  <span>FARMER VERIFIED (GROUND TRUTH SEED)</span>
                </div>
              )}
            </div>
          </div>
        );

      case SIMULATION_STATES.CASE_CREATED:
      case SIMULATION_STATES.RISK_ASSESSMENT:
      case SIMULATION_STATES.PRIORITY_ASSIGNED:
        return (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <FileText size={14} color="#1e3a5f" />
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-main)' }}>
                  UNIFIED CASE CREATED
                </span>
                <span className="status-pill status-ready" style={{ fontSize: 9 }}>REPORTED</span>
              </div>
              <div style={{ fontSize: 14, fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#1e293b', marginTop: 2 }}>
                CASE #PS-2026-00421
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginTop: 2 }}>
                Farm: KA-1023 (Hassan) • Subject: Cattle #17 • Correlated Signals: 6
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, textAlign: 'center' }}>
              <div style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: 6, border: '1px solid #cbd5e1' }}>
                <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#64748b' }}>SIGNALS</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>6 BARS</div>
              </div>
              <div style={{ background: '#fef2f2', padding: '4px 10px', borderRadius: 6, border: '1px solid #fecaca' }}>
                <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#b91c1c' }}>PRIORITY</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#b91c1c' }}>P1 CRITICAL</div>
              </div>
            </div>
          </div>
        );

      case SIMULATION_STATES.PARAVET_ASSIGNED:
        return (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Truck size={14} color="#2563eb" />
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-main)' }}>
                  PARAVET ASSIGNMENT & DISPATCH
                </span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginTop: 2 }}>
                Field Worker: Ramesh Gowda (ID: PV-841)
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginTop: 2 }}>
                Hassan Central Mobile Unit • Action: Clinical inspection & PPE deployment
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#64748b' }}>DISPATCH STATUS</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: paravetStatus === 'ON_SITE' ? '#15803d' : '#2563eb' }}>
                  {paravetStatus === 'ON_SITE' ? '● ON SITE AT FARM' : (paravetStatus === 'ACCEPTED' ? '● DISPATCH ACCEPTED' : '● ASSIGNED')}
                </div>
              </div>
              <span className={`led-jewel ${paravetStatus === 'ON_SITE' ? 'led-green' : 'led-amber led-pulse'}`}></span>
            </div>
          </div>
        );

      case SIMULATION_STATES.VETERINARIAN_REVIEW:
        return (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Stethoscope size={14} color="#0284c7" />
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-main)' }}>
                  VETERINARIAN TELE-TRIAGE REVIEW
                </span>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#1e293b', marginTop: 2 }}>
                Dr. Ananya Rao, MVSc (District Epizootiologist)
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginTop: 2 }}>
                Correlated: Elevated Temp (38.5°C), Lameness, Feeding drop (-31%)
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#64748b' }}>DECISION</div>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#b91c1c' }}>
                {vetStatus === 'SAMPLE_ORDERED' ? '✓ LAB SAMPLE REQUIRED' : 'REVIEWING TELEMETRY...'}
              </div>
            </div>
          </div>
        );

      case SIMULATION_STATES.SAMPLE_COLLECTION:
      case SIMULATION_STATES.LAB_PROCESSING:
      case SIMULATION_STATES.LAB_CONFIRMED:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <TestTubes size={14} color="#7c3aed" />
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-main)' }}>
                  LABORATORY MOLECULAR DIAGNOSTICS
                </span>
              </div>
              <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: '#64748b' }}>
                SAMPLE: LAB-2026-8821
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11 }}>
              <div>
                <span style={{ fontWeight: 600, color: '#1e293b' }}>Assay: </span>
                <span style={{ color: '#475569' }}>Multiplex Real-Time RT-PCR (FMDV Type O / Vesicular Panel)</span>
              </div>
              <div style={{ fontWeight: 700, color: labStatus === 'CONFIRMED' ? '#15803d' : '#2563eb' }}>
                {labStatus === 'CONFIRMED' ? '✓ LAB CONFIRMED (GROUND TRUTH)' : `PROCESSING... ${labProgress}%`}
              </div>
            </div>

            {/* Laboratory Stepper Progress Bar */}
            <div className="analog-meter-track" style={{ height: 9 }}>
              <div 
                className={`analog-meter-bar ${labStatus === 'CONFIRMED' ? 'bar-green' : 'bar-amber'}`}
                style={{ width: `${labProgress}%` }}
              ></div>
            </div>

            {labStatus === 'CONFIRMED' && (
              <div style={{ 
                background: '#f0fdf4', 
                border: '1px solid #86efac', 
                padding: '4px 8px', 
                borderRadius: 4, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                fontSize: 10
              }}>
                <span style={{ color: '#166534', fontWeight: 700 }}>
                  DIAGNOSTIC RESULT: VERIFIED POSITIVE (FMDV Type O Isolate)
                </span>
                <span className="status-pill status-success" style={{ fontSize: 9 }}>GROUND TRUTH ACQUIRED</span>
              </div>
            )}
          </div>
        );

      case SIMULATION_STATES.GOVERNMENT_SURVEILLANCE:
        return (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            {/* India Tactical Map SVG */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 85, height: 75, background: '#1c2430', borderRadius: 6, position: 'relative', overflow: 'hidden', border: '1px solid #334155' }}>
                {/* Simplified India SVG outline representation */}
                <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                  <path 
                    d="M45 10 L60 20 L55 35 L75 40 L65 55 L55 70 L50 85 L45 75 L38 60 L25 45 L35 30 Z" 
                    fill="#334155" 
                    stroke="#475569" 
                    strokeWidth="1"
                  />
                  {/* Pulsing Hotspot Marker for Karnataka (Hassan) */}
                  <circle cx="44" cy="72" r="3" fill="#ef4444" />
                  <circle cx="44" cy="72" r="6" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.8">
                    <animate attributeName="r" values="3;10;3" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <MapPin size={13} color="#ef4444" />
                  <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-main)' }}>
                    GOVERNMENT SURVEILLANCE GRID
                  </span>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#1e293b', marginTop: 2 }}>
                  KARNATAKA — HASSAN DISTRICT CLUSTER
                </div>
                <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#64748b', marginTop: 2 }}>
                  Integrated with NADRES 2.0 & Bharat Pashudhan • SIMULATION DATA
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{ display: 'flex', gap: 6, textAlign: 'center' }}>
              <div style={{ background: '#f8fafc', padding: '3px 8px', borderRadius: 4, border: '1px solid #cbd5e1' }}>
                <div style={{ fontSize: 8, color: '#64748b' }}>ACTIVE CASES</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#1e293b' }}>{SURVEILLANCE_STATS.activeCases}</div>
              </div>
              <div style={{ background: '#fef2f2', padding: '3px 8px', borderRadius: 4, border: '1px solid #fecaca' }}>
                <div style={{ fontSize: 8, color: '#b91c1c' }}>HIGH RISK</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#b91c1c' }}>{SURVEILLANCE_STATS.highRisk}</div>
              </div>
              <div style={{ background: '#f0fdf4', padding: '3px 8px', borderRadius: 4, border: '1px solid #86efac' }}>
                <div style={{ fontSize: 8, color: '#166534' }}>TODAY</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#166534' }}>{SURVEILLANCE_STATS.confirmedToday}</div>
              </div>
            </div>
          </div>
        );

      case SIMULATION_STATES.GROUND_TRUTH:
        return (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <RefreshCw size={14} color="#15803d" className="spin-slow" />
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#15803d' }}>
                  GROUND TRUTH FEEDBACK LOOP ACTIVE
                </span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginTop: 2 }}>
                Confirmed Biological Evidence Recalibrating Decision Weights
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginTop: 2 }}>
                • Model / Rule Calibration (+4% prior) • Hassan Outbreak History Kernel Updated
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span className="status-pill status-success" style={{ fontSize: 9 }}>
                FEEDBACK LOOP CLOSED
              </span>
            </div>
          </div>
        );

      case SIMULATION_STATES.COMPLETED:
        return (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={15} color="#15803d" />
                <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#15803d' }}>
                  ✓ SIMULATION COMPLETE — CASE RESOLVED
                </span>
              </div>
              <div style={{ fontSize: 11, color: '#334155', marginTop: 3 }}>
                Case PS-2026-00421: Risk 87/100 • Priority P1 • Diagnostic CONFIRMED • Ground Truth RECORDED
              </div>
            </div>

            <button 
              onClick={onReset}
              className="tactile-btn tactile-btn-primary"
              style={{ fontSize: 10, padding: '5px 12px' }}
            >
              <RotateCcw size={12} />
              RUN NEW SIMULATION
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="stage-bay-container">
      {renderBayContent()}
    </div>
  );
}
