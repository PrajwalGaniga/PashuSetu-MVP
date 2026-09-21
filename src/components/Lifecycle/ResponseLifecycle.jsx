import React, { useState } from 'react';
import { 
  Check, 
  Circle, 
  RotateCw, 
  Camera, 
  Bell, 
  UserCheck, 
  Activity, 
  Stethoscope, 
  TestTubes, 
  CheckCircle2, 
  Building2, 
  RefreshCw,
  ChevronDown
} from 'lucide-react';

export function ResponseLifecycle({
  anomalyDetected,
  farmerAlertGenerated,
  farmerConfirmed,
  paravetVerified,
  caseCreated,
  riskScore,
  sampleRequested,
  labReceived,
  labConfirmed,
  govSurveillanceUpdated,
  feedbackLoopActive
}) {
  // Determine state of each of the 9 stages: 'COMPLETED', 'ACTIVE', or 'WAITING'
  const stages = [
    {
      id: 'DETECT',
      title: 'DETECT',
      subtitle: 'Camera + IoT',
      status: (anomalyDetected && farmerAlertGenerated) ? 'COMPLETED' : (anomalyDetected ? 'ACTIVE' : 'WAITING'),
      icon: Camera
    },
    {
      id: 'ALERT',
      title: 'ALERT',
      subtitle: 'Farmer Notified',
      status: farmerConfirmed ? 'COMPLETED' : (farmerAlertGenerated ? 'ACTIVE' : 'WAITING'),
      icon: Bell
    },
    {
      id: 'VERIFY',
      title: 'VERIFY',
      subtitle: 'Farmer + Paravet',
      status: paravetVerified ? 'COMPLETED' : (farmerConfirmed ? 'ACTIVE' : 'WAITING'),
      icon: UserCheck
    },
    {
      id: 'ASSESS',
      title: 'ASSESS',
      subtitle: 'Risk Engine (87/100)',
      status: (caseCreated || riskScore > 0) ? 'COMPLETED' : (farmerConfirmed ? 'ACTIVE' : 'WAITING'),
      icon: Activity
    },
    {
      id: 'ESCALATE',
      title: 'ESCALATE',
      subtitle: 'Veterinarian Triage',
      status: sampleRequested ? 'COMPLETED' : (paravetVerified ? 'ACTIVE' : 'WAITING'),
      icon: Stethoscope
    },
    {
      id: 'DIAGNOSE',
      title: 'DIAGNOSE',
      subtitle: 'Laboratory PCR',
      status: labConfirmed ? 'COMPLETED' : (sampleRequested ? 'ACTIVE' : 'WAITING'),
      icon: TestTubes
    },
    {
      id: 'CONFIRM',
      title: 'CONFIRM',
      subtitle: 'Ground Truth Validated',
      status: (labConfirmed && govSurveillanceUpdated) ? 'COMPLETED' : (labConfirmed ? 'ACTIVE' : 'WAITING'),
      icon: CheckCircle2
    },
    {
      id: 'SURVEILLANCE',
      title: 'SURVEILLANCE',
      subtitle: 'National Grid Sync',
      status: (govSurveillanceUpdated && feedbackLoopActive) ? 'COMPLETED' : (govSurveillanceUpdated ? 'ACTIVE' : 'WAITING'),
      icon: Building2
    },
    {
      id: 'FEEDBACK',
      title: 'FEEDBACK',
      subtitle: 'Intelligence Update',
      status: feedbackLoopActive ? 'ACTIVE' : 'WAITING',
      icon: RefreshCw
    }
  ];

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const activeStage = stages.find(s => s.status === 'ACTIVE') || stages.find(s => s.status === 'WAITING') || stages[stages.length - 1];

  return (
    <aside className="response-lifecycle-panel" id="tour-case-lifecycle">
      {/* Corner hardware screws */}
      <span className="screw screw-tl"></span>
      <span className="screw screw-tr"></span>
      <span className="screw screw-bl"></span>
      <span className="screw screw-br"></span>

      {/* Panel Header (Tappable on mobile to expand/collapse) */}
      <div 
        className="lifecycle-header"
        onClick={() => setIsMobileOpen(prev => !prev)}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="led-jewel led-blue led-pulse" style={{ width: 6, height: 6 }}></span>
            <span className="lifecycle-title">CASE RESPONSE LIFECYCLE</span>
          </div>

          {/* Mobile Collapse/Expand Trigger Badge */}
          <div className="lifecycle-mobile-toggle">
            <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#2563eb', fontWeight: 800 }}>
              {isMobileOpen ? 'CLOSE ▴' : '9 STAGES ▾'}
            </span>
          </div>
        </div>

        <div className="lifecycle-subtitle">REAL-TIME PROGRESSION</div>

        {/* Mobile-only compact active status row */}
        {!isMobileOpen && (
          <div className="lifecycle-mobile-active-strip">
            <span className="led-jewel led-green"></span>
            <span>Current: <strong>{activeStage.title}</strong> ({activeStage.subtitle})</span>
          </div>
        )}
      </div>

      {/* Timeline Steps (Visible on desktop, toggled on mobile) */}
      <div className={`lifecycle-timeline ${isMobileOpen ? 'is-mobile-open' : ''}`}>
        {stages.map((stage, idx) => {
          const isCompleted = stage.status === 'COMPLETED';
          const isActive = stage.status === 'ACTIVE';
          const isWaiting = stage.status === 'WAITING';

          return (
            <div key={stage.id} className={`lifecycle-step ${isActive ? 'is-active' : (isCompleted ? 'is-completed' : 'is-waiting')}`}>
              {/* Connector line between steps */}
              {idx < stages.length - 1 && (
                <div className={`lifecycle-connector ${isCompleted ? 'is-completed' : (isActive ? 'is-active' : '')}`}></div>
              )}

              {/* Status node */}
              <div className="lifecycle-node">
                {isCompleted ? (
                  <Check size={11} strokeWidth={3.5} color="#ffffff" />
                ) : isActive ? (
                  <span className="lifecycle-active-dot"></span>
                ) : (
                  <Circle size={8} color="#94a3b8" />
                )}
              </div>

              {/* Step info */}
              <div className="lifecycle-text-col">
                <div className="lifecycle-stage-name">
                  <span>{stage.title}</span>
                  {isActive && <span className="lifecycle-badge">ACTIVE</span>}
                </div>
                <div className="lifecycle-stage-desc">{stage.subtitle}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Panel Footer: System Indicator */}
      <div className="lifecycle-footer">
        <div style={{ fontSize: 8, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          PROTOCOL: <strong>NADRES-2026/L3</strong>
        </div>
      </div>
    </aside>
  );
}
