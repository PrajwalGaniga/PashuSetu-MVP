import React, { useState } from 'react';
import { 
  Stethoscope, 
  Layers, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  TestTubes
} from 'lucide-react';
import { DECISION_TRACE_ITEMS } from '../../data/simulationData';

export function VeterinarianView({
  caseId,
  farm,
  animal,
  _telemetry,
  paravetVerified,
  _vetReviewed,
  sampleRequested,
  sampleId,
  vetOfficer,
  riskScore,
  priority,
  onRequestSample
}) {
  const [selectedMapPin, setSelectedMapPin] = useState('CURRENT_FARM');

  return (
    <div className="vet-3col-layout">
      {/* 1. LEFT: Case Information & Paravet Verification Dossier */}
      <div className="tactile-panel" id="tour-vet-case-summary" style={{ padding: 12 }}>
        <span className="screw screw-tl"></span>
        <span className="screw screw-tr"></span>
        <span className="screw screw-bl"></span>
        <span className="screw screw-br"></span>

        <div className="tactile-panel-header">
          <h2 className="tactile-panel-title">
            <Stethoscope size={14} color="#1e3a5f" />
            VETERINARY CLINICAL TRIAGE
          </h2>
          <span className="status-pill status-ready" style={{ fontSize: 9 }}>DISTRICT EPIZOOTIC</span>
        </div>

        {!paravetVerified ? (
          <div style={{ padding: 28, textAlign: 'center', color: '#64748b' }}>
            <Clock size={32} style={{ margin: '0 auto 8px auto', opacity: 0.5 }} />
            <div style={{ fontSize: 13, fontWeight: 700 }}>AWAITING FIELD VERIFICATION</div>
            <div style={{ fontSize: 10.5, marginTop: 4 }}>
              Case awaiting on-site physical inspection by Paravet Ramesh Gowda before clinical triage authorization.
            </div>
          </div>
        ) : (
          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* Field Verification Banner (Prominent Callout) */}
            <div style={{ 
              background: '#f0fdf4', 
              border: '1.5px solid #86efac', 
              borderRadius: 8, 
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 10
            }}>
              <CheckCircle2 size={20} color="#16a34a" />
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#166534' }}>
                  VERIFIED IN FIELD
                </div>
                <div style={{ fontSize: 9.5, color: '#14532d' }}>
                  On-site inspection completed by Paravet <strong>Ramesh Gowda</strong> (PV-841)
                </div>
              </div>
            </div>

            {/* Case Dossier Metadata Card */}
            <div style={{ background: '#f8fafc', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#64748b' }}>SHARED CASE NUMBER</div>
              <div style={{ fontSize: 16, fontFamily: 'var(--font-mono)', fontWeight: 900, color: '#1e3a8a', letterSpacing: '0.04em' }}>
                {caseId}
              </div>
              <div style={{ fontSize: 11, color: '#334155', marginTop: 4 }}>
                <strong>Holding:</strong> Farm #{farm.id} ({farm.taluk}, {farm.district})<br />
                <strong>Subject:</strong> {animal.tag} • {animal.breed} ({animal.collarId})<br />
                <strong>Triage Officer:</strong> {vetOfficer.name}
              </div>
            </div>

            {/* Paravet Physical Verification Findings */}
            <div style={{ background: 'var(--bg-panel-sunken)', border: '1px solid var(--border-subtle)', padding: 10, borderRadius: 8 }}>
              <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#1e3a5f', marginBottom: 4 }}>
                PARAVET GROUND FINDINGS:
              </div>
              <div style={{ fontSize: 10, color: '#334155', lineHeight: 1.5 }}>
                • Rectal temperature measured: <strong>38.5°C</strong> (Spike verified)<br />
                • Mucosal lesions: <strong>Interdigital erythema & vesicle detected</strong><br />
                • Grazing status: <strong>Prolonged recumbency & feed refusal</strong>
              </div>
            </div>

            {/* Clinical Decision & Lab Sample Order */}
            <div id="tour-vet-request-btn" style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 8 }}>
              <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--text-secondary)' }}>
                CLINICAL DECISION & AUTHORIZATION:
              </div>

              {!sampleRequested ? (
                <button
                  onClick={onRequestSample}
                  className="tactile-btn tactile-btn-primary"
                  style={{ width: '100%', marginTop: 8, padding: '10px 0', fontSize: 12, fontWeight: 800 }}
                >
                  <TestTubes size={14} />
                  <span>[ REQUEST LAB SAMPLE (PCR) ]</span>
                </button>
              ) : (
                <div style={{ background: '#eff6ff', border: '1.5px solid #93c5fd', padding: 10, borderRadius: 8, marginTop: 6, textAlign: 'center' }}>
                  <div style={{ color: '#1d4ed8', fontWeight: 800, fontSize: 12 }}>
                    ✓ PCR DIAGNOSTIC SAMPLE ORDERED
                  </div>
                  <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: '#334155', marginTop: 3 }}>
                    Sample ID: <strong>{sampleId}</strong>
                  </div>
                  <div style={{ fontSize: 9, color: '#64748b', marginTop: 2 }}>
                    Specimen cold chain routed to State Animal Health Diagnostic Institute.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 2. CENTER: Multimodal Clinical Evidence & Bayesian Risk Engine */}
      <div className="tactile-panel" id="tour-vet-evidence-panel" style={{ padding: 12 }}>
        <div className="tactile-panel-header">
          <h2 className="tactile-panel-title">
            <Layers size={14} color="#1e3a5f" />
            MULTIMODAL EVIDENCE MATRIX
          </h2>
          <span className="status-pill status-danger" style={{ fontSize: 9 }}>RISK: {riskScore}/100</span>
        </div>

        {/* Evidence Grid (High Presentation Clarity) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
          <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: 8, borderRadius: 6 }}>
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#64748b' }}>CAMERA / CV</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#1e293b', marginTop: 2 }}>✓ Gait Anomaly Detected</div>
            <div style={{ fontSize: 9, color: '#64748b' }}>Mobility -42% & recumbency</div>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: 8, borderRadius: 6 }}>
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#64748b' }}>IOT COLLAR VITALS</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#b91c1c', marginTop: 2 }}>✓ Pyrexia (38.5°C)</div>
            <div style={{ fontSize: 9, color: '#64748b' }}>+1.3°C above nominal baseline</div>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: 8, borderRadius: 6 }}>
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#64748b' }}>MICROCLIMATE / AIR</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#d97706', marginTop: 2 }}>✓ Ammonia Level 12 ppm</div>
            <div style={{ fontSize: 9, color: '#64748b' }}>Elevated environmental risk</div>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: 8, borderRadius: 6 }}>
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#64748b' }}>GROUND VERIFICATION</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#15803d', marginTop: 2 }}>✓ Dual Independent Witness</div>
            <div style={{ fontSize: 9, color: '#64748b' }}>Farmer Suresh Patel & Paravet</div>
          </div>
        </div>

        {/* Embedded Risk Engine Card */}
        <div id="tour-vet-risk-card" style={{ 
          marginTop: 10, 
          background: 'var(--bg-panel-sunken)', 
          border: '1px solid var(--border-subtle)', 
          borderRadius: 8, 
          padding: 10 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#64748b' }}>
                BAYESIAN RISK SYNTHESIS
              </span>
              <div style={{ fontSize: 26, fontFamily: 'var(--font-mono)', fontWeight: 900, color: '#b91c1c' }}>
                {riskScore.toString().padStart(2, '0')} <span style={{ fontSize: 12, color: '#64748b' }}>/ 100</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="status-pill status-danger" style={{ fontSize: 10, fontWeight: 800 }}>{priority}</span>
              <div style={{ fontSize: 9, color: '#b91c1c', fontWeight: 700, marginTop: 4 }}>
                HARD ESCALATION PROTOCOL
              </div>
            </div>
          </div>

          {/* Decision Trace Breakdown */}
          <div style={{ marginTop: 8, borderTop: '1px solid #cbd5e1', paddingTop: 6 }}>
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#475569', marginBottom: 4 }}>
              CONTRIBUTING DECISION TRACE FACTORS:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
              {DECISION_TRACE_ITEMS.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, fontFamily: 'var(--font-mono)', padding: '3px 6px', background: '#ffffff', borderRadius: 4, border: '1px solid #e2e8f0' }}>
                  <span>{item.label}</span>
                  <span style={{ color: '#b45309', fontWeight: 800 }}>{item.points}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. RIGHT: Interactive Spatial District Map */}
      <div className="tactile-panel" id="tour-vet-map" style={{ padding: 12 }}>
        <div className="tactile-panel-header">
          <h2 className="tactile-panel-title">
            <MapPin size={14} color="#1e3a5f" />
            HASSAN DISTRICT SURVEILLANCE
          </h2>
          <span className="tactile-panel-subtitle">EPICENTER ZONE</span>
        </div>

        {/* Spatial Map Graphic */}
        <div style={{ 
          marginTop: 8, 
          height: 200, 
          background: '#182232', 
          borderRadius: 8, 
          position: 'relative', 
          overflow: 'hidden',
          border: '1px solid #2e3d55'
        }}>
          <svg viewBox="0 0 300 200" style={{ width: '100%', height: '100%' }}>
            {/* Grid Lines */}
            <line x1="0" y1="50" x2="300" y2="50" stroke="#25354b" strokeWidth="0.5" />
            <line x1="0" y1="100" x2="300" y2="100" stroke="#25354b" strokeWidth="0.5" />
            <line x1="0" y1="150" x2="300" y2="150" stroke="#25354b" strokeWidth="0.5" />
            <line x1="75" y1="0" x2="75" y2="200" stroke="#25354b" strokeWidth="0.5" />
            <line x1="150" y1="0" x2="150" y2="200" stroke="#25354b" strokeWidth="0.5" />
            <line x1="225" y1="0" x2="225" y2="200" stroke="#25354b" strokeWidth="0.5" />

            {/* Simulated Containment Ring around Farm KA-1023 */}
            <circle cx="150" cy="100" r="45" fill="rgba(239, 68, 68, 0.12)" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="4 3" />

            {/* Current Case Farm Marker (KA-1023) */}
            <g 
              className="map-state-marker" 
              onClick={() => setSelectedMapPin('CURRENT_FARM')}
              transform="translate(150, 100)"
            >
              <circle cx="0" cy="0" r="8" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
              <circle cx="0" cy="0" r="16" fill="none" stroke="#f87171" strokeWidth="1.5">
                <animate attributeName="r" values="8;20;8" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <text x="14" y="4" fill="#ffffff" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="800">
                #KA-1023 (CURRENT)
              </text>
            </g>

            {/* Reference Farms in Surveillance Radius */}
            <g className="map-state-marker" onClick={() => setSelectedMapPin('DUMMY_1')} transform="translate(195, 65)">
              <circle cx="0" cy="0" r="5" fill="#f59e0b" />
              <text x="8" y="3" fill="#94a3b8" fontSize="8" fontFamily="var(--font-mono)">KA-0982</text>
            </g>
            <g className="map-state-marker" onClick={() => setSelectedMapPin('DUMMY_2')} transform="translate(105, 135)">
              <circle cx="0" cy="0" r="5" fill="#22c55e" />
              <text x="8" y="3" fill="#94a3b8" fontSize="8" fontFamily="var(--font-mono)">KA-1044</text>
            </g>
          </svg>
        </div>

        {/* Map Legend */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, fontFamily: 'var(--font-mono)', marginTop: 6, color: '#64748b' }}>
          <span>🔴 Primary Case (#KA-1023)</span>
          <span>🟠 Monitored Cluster</span>
          <span>🟢 Nominal</span>
        </div>

        {/* Selected Farm Detail Card */}
        <div style={{ background: '#f8fafc', padding: 8, borderRadius: 6, border: '1px solid #cbd5e1', marginTop: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: '#1e293b' }}>
            {selectedMapPin === 'CURRENT_FARM' ? `FARM #${farm.id} • ${farm.farmerName}` : 'REGIONAL REFERENCE HERD'}
          </div>
          <div style={{ fontSize: 9, color: '#64748b', marginTop: 2 }}>
            Coordinates: {farm.coordinates.lat}°N, {farm.coordinates.lng}°E • Risk Score: <strong>87/100</strong>
          </div>
          <div style={{ fontSize: 9, color: '#16a34a', fontWeight: 700, marginTop: 2 }}>
            Status: On-Site Paravet Inspection Confirmed
          </div>
        </div>
      </div>
    </div>
  );
}
