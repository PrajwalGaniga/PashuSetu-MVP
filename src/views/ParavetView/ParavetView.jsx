import React from 'react';
import { 
  Activity, 
  Truck, 
  CheckSquare, 
  Square, 
  Clock, 
  MapPin, 
  User, 
  ShieldAlert, 
  CheckCircle2, 
  FileCheck,
  AlertCircle
} from 'lucide-react';

export function ParavetView({
  caseId,
  farm,
  animal,
  telemetry,
  farmerConfirmed,
  paravetAssigned,
  paravetAccepted,
  paravetChecklist,
  paravetVerified,
  paravetOfficer,
  onAcceptCase,
  onToggleChecklist,
  onVerifyReport
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, flex: 1, minHeight: 0, overflowY: 'auto' }}>
      {/* Left Column: Field Dispatch & Case Dossier */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div className="tactile-panel" style={{ padding: 12 }}>
          <span className="screw screw-tl"></span>
          <span className="screw screw-tr"></span>
          <span className="screw screw-bl"></span>
          <span className="screw screw-br"></span>

          <div className="tactile-panel-header">
            <h2 className="tactile-panel-title">
              <Truck size={14} color="#1e3a5f" />
              PARAVET FIELD OPERATIONS
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className={`led-jewel ${paravetVerified ? 'led-green' : (paravetAccepted ? 'led-blue' : 'led-amber')}`}></span>
              <span className="tactile-panel-subtitle">OFFICER: {paravetOfficer.name} ({paravetOfficer.id})</span>
            </div>
          </div>

          {!farmerConfirmed ? (
            <div style={{ padding: 24, textAlign: 'center', color: '#64748b' }}>
              <Clock size={32} style={{ margin: '0 auto 8px auto', opacity: 0.5 }} />
              <div style={{ fontSize: 13, fontWeight: 700 }}>WAITING FOR FARMER CONFIRMATION</div>
              <div style={{ fontSize: 11, marginTop: 4 }}>
                No active field dispatch. Awaiting on-ground anomaly verification from Farm #{farm.id}.
              </div>
            </div>
          ) : (
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* Case Metadata Banner */}
              <div className="farm-badge-banner">
                <div>
                  <div className="farm-badge-title">CASE #{caseId}</div>
                  <div className="farm-badge-sub">
                    {farm.district} • {farm.farmerName} ({farm.phone})
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="status-pill status-danger">PRIORITY: HIGH</span>
                  <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#94a3b8', marginTop: 2 }}>
                    {paravetOfficer.distance}
                  </div>
                </div>
              </div>

              {/* Farmer's Report & Initial Observations */}
              <div style={{ background: 'var(--bg-panel-sunken)', padding: 10, borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  FARMER REPORTED OBSERVATIONS:
                </div>
                <div style={{ fontSize: 11, color: '#1e293b', marginTop: 4 }}>
                  • Acute reduction in mobility and prolonged recumbency<br />
                  • Refusal of concentrated feed intake<br />
                  • Suspected hind-limb lameness
                </div>
              </div>

              {/* Sensor Evidence Available to Paravet */}
              <div style={{ background: '#f8fafc', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#64748b' }}>
                  SENSOR EVIDENCE AT TIME OF DISPATCH:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 6, fontSize: 11 }}>
                  <div>• Temperature: <strong>{telemetry.temperature.toFixed(1)}°C</strong></div>
                  <div>• Ammonia: <strong>{telemetry.ammonia} ppm</strong></div>
                  <div>• Movement: <strong>{telemetry.movement}%</strong></div>
                  <div>• Feeding: <strong>{telemetry.feeding}%</strong></div>
                  <div style={{ gridColumn: 'span 2' }}>
                    • Camera CV: <strong>Gait asymmetry anomaly flagged</strong>
                  </div>
                </div>
              </div>

              {/* Paravet Accept Case Action */}
              {!paravetAccepted ? (
                <button
                  onClick={onAcceptCase}
                  className="tactile-btn tactile-btn-primary"
                  style={{ width: '100%', padding: '10px 0', fontSize: 12 }}
                >
                  [ ACCEPT CASE & DISPATCH TO FARM ]
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#f0fdf4', borderRadius: 8, border: '1px solid #86efac' }}>
                  <CheckCircle2 size={16} color="#16a34a" />
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#166534' }}>
                    CASE ACCEPTED — ON SITE AT FARM #{farm.id}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Column: On-Site Field Verification & Escalation */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div className="tactile-panel" style={{ padding: 12 }}>
          <div className="tactile-panel-header">
            <h2 className="tactile-panel-title">
              <FileCheck size={14} color="#1e3a5f" />
              FIELD TRIAGE VERIFICATION
            </h2>
            <span className="status-pill status-ready" style={{ fontSize: 9 }}>STAGE 2 OF 5</span>
          </div>

          {!paravetAccepted ? (
            <div style={{ padding: 24, textAlign: 'center', color: '#94a3b8', fontSize: 11 }}>
              Accept the dispatch request on the left to activate the field verification checklist.
            </div>
          ) : (
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="checklist-card">
                <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  CLINICAL PROTOCOL CHECKLIST:
                </div>

                <div className="checklist-item" onClick={() => onToggleChecklist('animalIdentified')}>
                  <div className={`checklist-box ${paravetChecklist.animalIdentified ? 'is-checked' : ''}`}>
                    {paravetChecklist.animalIdentified && <CheckSquare size={13} />}
                  </div>
                  <span>1. Animal tag confirmed: <strong>{animal.tag}</strong> ({animal.collarId})</span>
                </div>

                <div className="checklist-item" onClick={() => onToggleChecklist('farmerReportReviewed')}>
                  <div className={`checklist-box ${paravetChecklist.farmerReportReviewed ? 'is-checked' : ''}`}>
                    {paravetChecklist.farmerReportReviewed && <CheckSquare size={13} />}
                  </div>
                  <span>2. Farmer report & historical feeding logs reviewed</span>
                </div>

                <div className="checklist-item" onClick={() => onToggleChecklist('symptomsVerified')}>
                  <div className={`checklist-box ${paravetChecklist.symptomsVerified ? 'is-checked' : ''}`}>
                    {paravetChecklist.symptomsVerified && <CheckSquare size={13} />}
                  </div>
                  <span>3. Physical symptoms confirmed: Pyrexia & interdigital erythema</span>
                </div>

                <div className="checklist-item" onClick={() => onToggleChecklist('observationsRecorded')}>
                  <div className={`checklist-box ${paravetChecklist.observationsRecorded ? 'is-checked' : ''}`}>
                    {paravetChecklist.observationsRecorded && <CheckSquare size={13} />}
                  </div>
                  <span>4. Digital field observations & vital signs logged to dossier</span>
                </div>
              </div>

              {/* Note on Medical Role Constraint */}
              <div style={{ background: '#fefce8', padding: '8px 10px', borderRadius: 6, border: '1px solid #fef08a', fontSize: 10, color: '#854d0e' }}>
                <strong>Operational Constraint:</strong> Paravet protocol permits physical symptom verification and escalation only. Formal diagnostic classification is deferred to the Chief Epizootiologist.
              </div>

              {/* Verification & Escalation Button */}
              {!paravetVerified ? (
                <button
                  onClick={onVerifyReport}
                  className="tactile-btn tactile-btn-primary"
                  style={{ width: '100%', padding: '10px 0', fontSize: 12 }}
                >
                  [ VERIFY & ESCALATE TO VETERINARIAN ]
                </button>
              ) : (
                <div style={{ background: '#f0fdf4', padding: 12, borderRadius: 8, border: '1px solid #86efac', textAlign: 'center' }}>
                  <div style={{ color: '#15803d', fontWeight: 800, fontSize: 12 }}>
                    ✓ FIELD REPORT VERIFIED & ESCALATED
                  </div>
                  <div style={{ fontSize: 10, color: '#475569', marginTop: 4 }}>
                    Case #{caseId} successfully transferred to Veterinarian Command Console.
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
