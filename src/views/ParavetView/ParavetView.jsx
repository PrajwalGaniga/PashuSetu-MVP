import React from 'react';
import { 
  Truck, 
  CheckSquare, 
  FileCheck,
  Clock
} from 'lucide-react';
import { ParavetPhone } from './ParavetPhone';

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
    <div className="paravet-3col-layout">
      {/* 1. LEFT COLUMN: Field Dispatch Context & Officer Credentials */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Officer Card */}
        <div className="tactile-panel" style={{ padding: 12 }}>
          <span className="screw screw-tl"></span>
          <span className="screw screw-tr"></span>
          <span className="screw screw-bl"></span>
          <span className="screw screw-br"></span>

          <div className="tactile-panel-header">
            <h2 className="tactile-panel-title">
              <Truck size={14} color="#1e3a5f" />
              FIELD OPERATIONS DESK
            </h2>
            <span className="status-pill status-ready" style={{ fontSize: 9 }}>ACTIVE UNIT</span>
          </div>

          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 10 }}>
              <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#64748b' }}>DISPATCHED PARAVET</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#1e293b' }}>
                {paravetOfficer.name}
              </div>
              <div style={{ fontSize: 10, color: '#334155', marginTop: 2 }}>
                Officer ID: <strong>{paravetOfficer.id}</strong> • {paravetOfficer.phone}
              </div>
              <div style={{ fontSize: 9, color: '#64748b', marginTop: 3 }}>
                Vehicle: {paravetOfficer.vehicle}
              </div>
            </div>

            {/* Field Queue List */}
            <div style={{ background: 'var(--bg-panel-sunken)', borderRadius: 8, padding: 8, border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#64748b', marginBottom: 4 }}>
                DISPATCH QUEUE (HASSAN TALUK):
              </div>
              
              <div style={{ 
                background: farmerConfirmed ? '#ffffff' : 'transparent', 
                border: farmerConfirmed ? '1px solid #93c5fd' : '1px dashed #cbd5e1', 
                borderRadius: 6, 
                padding: 8 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: farmerConfirmed ? '#1e3a8a' : '#94a3b8' }}>
                    {caseId}
                  </span>
                  <span className={`status-pill ${farmerConfirmed ? (paravetVerified ? 'status-success' : 'status-danger') : 'status-ready'}`} style={{ fontSize: 8 }}>
                    {farmerConfirmed ? (paravetVerified ? 'VERIFIED' : (paravetAccepted ? 'ON SITE' : 'ASSIGNED')) : 'STANDBY'}
                  </span>
                </div>
                <div style={{ fontSize: 10, color: '#475569', marginTop: 2 }}>
                  Farm #{farm.id} • {animal.tag}
                </div>
                <div style={{ fontSize: 9, color: '#64748b' }}>
                  {paravetOfficer.distance}
                </div>
              </div>
            </div>

            {/* Operational Role Note */}
            <div style={{ background: '#fefce8', padding: '8px 10px', borderRadius: 6, border: '1px solid #fef08a', fontSize: 9.5, color: '#854d0e', lineHeight: 1.4 }}>
              <strong>Operational Scope:</strong> Paravet protocol permits physical symptom verification, tag validation, and triage escalation. Diagnostic classification is reserved for the District Veterinarian.
            </div>
          </div>
        </div>
      </div>

      {/* 2. CENTER COLUMN: Paravet Mobile Smartphone Simulation */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <ParavetPhone
          caseId={caseId}
          farm={farm}
          animal={animal}
          telemetry={telemetry}
          farmerConfirmed={farmerConfirmed}
          paravetAssigned={paravetAssigned}
          paravetAccepted={paravetAccepted}
          paravetChecklist={paravetChecklist}
          paravetVerified={paravetVerified}
          paravetOfficer={paravetOfficer}
          onAcceptCase={onAcceptCase}
          onToggleChecklist={onToggleChecklist}
          onVerifyReport={onVerifyReport}
        />
      </div>

      {/* 3. RIGHT COLUMN: Field Dossier, Telemetry & Clinical Evidence */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div className="tactile-panel" id="tour-paravet-evidence" style={{ padding: 12 }}>
          <span className="screw screw-tl"></span>
          <span className="screw screw-tr"></span>
          <span className="screw screw-bl"></span>
          <span className="screw screw-br"></span>

          <div className="tactile-panel-header">
            <h2 className="tactile-panel-title">
              <FileCheck size={14} color="#1e3a5f" />
              FIELD TRIAGE DOSSIER
            </h2>
            <span className="status-pill status-ready" style={{ fontSize: 9 }}>STAGE 2 OF 5</span>
          </div>

          {!farmerConfirmed ? (
            <div style={{ padding: 30, textAlign: 'center', color: '#94a3b8', fontSize: 11 }}>
              <Clock size={28} style={{ margin: '0 auto 8px auto', opacity: 0.5 }} />
              Awaiting Farmer Anomaly Verification before initializing field triage dossier.
            </div>
          ) : (
            <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* Sensor Readings Available to Paravet */}
              <div style={{ background: '#ffffff', borderRadius: 8, padding: 10, border: '1px solid #cbd5e1' }}>
                <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#1e3a5f', marginBottom: 4 }}>
                  SENSOR EVIDENCE AT TIME OF DISPATCH:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 10.5 }}>
                  <div>• Temperature: <strong>{telemetry.temperature.toFixed(1)}°C</strong></div>
                  <div>• Ammonia: <strong>{telemetry.ammonia} ppm</strong></div>
                  <div>• Movement: <strong>{telemetry.movement}%</strong></div>
                  <div>• Feeding: <strong>{telemetry.feeding}%</strong></div>
                  <div style={{ gridColumn: 'span 2', color: '#b91c1c' }}>
                    • Camera CV: <strong>Gait Asymmetry Alert Flagged</strong>
                  </div>
                </div>
              </div>

              {/* Protocol Checklist Summary */}
              <div className="checklist-card">
                <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--text-secondary)' }}>
                  DETAILED CLINICAL PROTOCOL:
                </div>

                <div className="checklist-item" onClick={() => onToggleChecklist('animalIdentified')}>
                  <div className={`checklist-box ${paravetChecklist.animalIdentified ? 'is-checked' : ''}`}>
                    {paravetChecklist.animalIdentified && <CheckSquare size={13} />}
                  </div>
                  <span>1. Ear Tag: <strong>{animal.tag}</strong> ({animal.collarId})</span>
                </div>

                <div className="checklist-item" onClick={() => onToggleChecklist('farmerReportReviewed')}>
                  <div className={`checklist-box ${paravetChecklist.farmerReportReviewed ? 'is-checked' : ''}`}>
                    {paravetChecklist.farmerReportReviewed && <CheckSquare size={13} />}
                  </div>
                  <span>2. Farmer Feeding Logs & Drop Reviewed</span>
                </div>

                <div className="checklist-item" onClick={() => onToggleChecklist('symptomsVerified')}>
                  <div className={`checklist-box ${paravetChecklist.symptomsVerified ? 'is-checked' : ''}`}>
                    {paravetChecklist.symptomsVerified && <CheckSquare size={13} />}
                  </div>
                  <span>3. Physical Symptoms: Pyrexia & Lameness</span>
                </div>

                <div className="checklist-item" onClick={() => onToggleChecklist('observationsRecorded')}>
                  <div className={`checklist-box ${paravetChecklist.observationsRecorded ? 'is-checked' : ''}`}>
                    {paravetChecklist.observationsRecorded && <CheckSquare size={13} />}
                  </div>
                  <span>4. Digital Vitals Logged to Mobile App</span>
                </div>
              </div>

              {/* Escalation Status */}
              {paravetVerified ? (
                <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, padding: 10, textAlign: 'center' }}>
                  <div style={{ color: '#15803d', fontWeight: 800, fontSize: 11 }}>
                    ✓ ON-SITE VERIFICATION COMPLETED
                  </div>
                  <div style={{ fontSize: 10, color: '#334155', marginTop: 3 }}>
                    Case escalated to Chief Epizootiologist <strong>Dr. Ananya Rao</strong> for clinical triage.
                  </div>
                </div>
              ) : (
                <div style={{ fontSize: 10, color: '#64748b', textAlign: 'center' }}>
                  Complete checklist on smartphone to escalate case to Veterinarian.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
