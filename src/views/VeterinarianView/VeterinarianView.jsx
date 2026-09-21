import React, { useState } from 'react';
import { 
  Stethoscope, 
  Layers, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  TestTubes, 
  Activity, 
  Info,
  ChevronRight
} from 'lucide-react';
import { DECISION_TRACE_ITEMS } from '../../data/simulationData';

export function VeterinarianView({
  caseId,
  farm,
  animal,
  telemetry,
  paravetVerified,
  vetReviewed,
  sampleRequested,
  sampleId,
  vetOfficer,
  riskScore,
  priority,
  onRequestSample
}) {
  const [selectedMapPin, setSelectedMapPin] = useState('CURRENT_FARM');

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 320px', gap: 12, flex: 1, minHeight: 0, overflowY: 'auto' }}>
      {/* 1. LEFT: Case Information & Paravet Verification Dossier */}
      <div className="tactile-panel" style={{ padding: 12 }}>
        <span className="screw screw-tl"></span>
        <span className="screw screw-tr"></span>
        <span className="screw screw-bl"></span>
        <span className="screw screw-br"></span>

        <div className="tactile-panel-header">
          <h2 className="tactile-panel-title">
            <Stethoscope size={14} color="#1e3a5f" />
            CASE DOSSIER
          </h2>
          <span className="status-pill status-ready" style={{ fontSize: 9 }}>EPIZOOTIC</span>
        </div>

        {!paravetVerified ? (
          <div style={{ padding: 24, textAlign: 'center', color: '#64748b' }}>
            <Clock size={30} style={{ margin: '0 auto 8px auto', opacity: 0.5 }} />
            <div style={{ fontSize: 12, fontWeight: 700 }}>WAITING FOR FIELD VERIFICATION</div>
            <div style={{ fontSize: 10, marginTop: 4 }}>
              Case awaiting physical on-site inspection by Paravet before veterinary assessment.
            </div>
          </div>
        ) : (
          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ background: '#f8fafc', padding: 8, borderRadius: 6, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#64748b' }}>CASE NUMBER</div>
              <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#1e293b' }}>
                {caseId}
              </div>
            </div>

            <div style={{ fontSize: 11, lineHeight: 1.5, color: '#334155' }}>
              <div><strong>Farm:</strong> {farm.id} ({farm.district})</div>
              <div><strong>Subject:</strong> {animal.tag} • {animal.breed}</div>
              <div><strong>Triage Officer:</strong> {vetOfficer.name}</div>
            </div>

            {/* Paravet Physical Verification Findings */}
            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', padding: 8, borderRadius: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#166534', fontWeight: 700, fontSize: 10 }}>
                <CheckCircle2 size={12} />
                <span>PARAVET FIELD OBSERVATIONS VERIFIED:</span>
              </div>
              <div style={{ fontSize: 10, color: '#334155', marginTop: 4 }}>
                • Rectal temperature measured: 38.5°C<br />
                • Interdigital mucosal tenderness<br />
                • Acute reduction in grazing posture
              </div>
            </div>

            {/* Clinical Decision Box */}
            <div style={{ marginTop: 6, borderTop: '1px solid var(--border-subtle)', paddingTop: 8 }}>
              <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-secondary)' }}>
                CLINICAL ACTION:
              </div>

              {!sampleRequested ? (
                <button
                  onClick={onRequestSample}
                  className="tactile-btn tactile-btn-primary"
                  style={{ width: '100%', marginTop: 8, padding: '9px 0', fontSize: 11 }}
                >
                  [ REQUEST LAB SAMPLE (PCR) ]
                </button>
              ) : (
                <div style={{ background: '#eff6ff', border: '1px solid #93c5fd', padding: 8, borderRadius: 6, marginTop: 6, textAlign: 'center' }}>
                  <div style={{ color: '#1d4ed8', fontWeight: 700, fontSize: 11 }}>
                    ✓ SAMPLE ORDERED
                  </div>
                  <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#475569', marginTop: 2 }}>
                    ID: <strong>{sampleId}</strong> • Routed to State Diagnostic Institute
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 2. CENTER: Multimodal Clinical Evidence & Bayesian Risk Engine */}
      <div className="tactile-panel" style={{ padding: 12 }}>
        <div className="tactile-panel-header">
          <h2 className="tactile-panel-title">
            <Layers size={14} color="#1e3a5f" />
            MULTIMODAL EVIDENCE MATRIX
          </h2>
          <span className="status-pill status-danger" style={{ fontSize: 9 }}>PROTOTYPE RISK ENGINE</span>
        </div>

        {/* Evidence Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
          <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: 8, borderRadius: 6 }}>
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#64748b' }}>CAMERA / CV</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#1e293b', marginTop: 2 }}>✓ Behavioural Anomaly</div>
            <div style={{ fontSize: 9, color: '#64748b' }}>Gait asymmetry & recumbency</div>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: 8, borderRadius: 6 }}>
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#64748b' }}>IoT COLLAR VITAL</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#b91c1c', marginTop: 2 }}>✓ Core Temp Spike (38.5°C)</div>
            <div style={{ fontSize: 9, color: '#64748b' }}>+1.3°C above herd baseline</div>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: 8, borderRadius: 6 }}>
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#64748b' }}>MICROCLIMATE / AIR</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#d97706', marginTop: 2 }}>✓ Ammonia Elevated (12 ppm)</div>
            <div style={{ fontSize: 9, color: '#64748b' }}>Shed ventilation suboptimal</div>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: 8, borderRadius: 6 }}>
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#64748b' }}>GROUND VERIFICATION</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#15803d', marginTop: 2 }}>✓ Farmer & Paravet Confirmed</div>
            <div style={{ fontSize: 9, color: '#64748b' }}>Dual independent witnesses</div>
          </div>
        </div>

        {/* Embedded Risk Engine Card */}
        <div style={{ 
          marginTop: 10, 
          background: 'var(--bg-panel-sunken)', 
          border: '1px solid var(--border-subtle)', 
          borderRadius: 8, 
          padding: 10 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#64748b' }}>
                BAYESIAN RISK SYNTHESIS
              </span>
              <div style={{ fontSize: 24, fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#b91c1c' }}>
                {riskScore.toString().padStart(2, '0')} <span style={{ fontSize: 12, color: '#64748b' }}>/ 100</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="status-pill status-danger" style={{ fontSize: 10 }}>{priority}</span>
              <div style={{ fontSize: 9, color: '#b91c1c', fontWeight: 600, marginTop: 4 }}>
                HARD ESCALATION RULE ACTIVE
              </div>
            </div>
          </div>

          {/* Decision Trace Breakdown */}
          <div style={{ marginTop: 8, borderTop: '1px solid #cbd5e1', paddingTop: 6 }}>
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#475569', marginBottom: 4 }}>
              DECISION TRACE CONTRIBUTION FACTORS:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
              {DECISION_TRACE_ITEMS.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, fontFamily: 'var(--font-mono)', padding: '2px 4px', background: '#ffffff', borderRadius: 3, border: '1px solid #e2e8f0' }}>
                  <span>{item.label}</span>
                  <span style={{ color: '#b45309', fontWeight: 700 }}>{item.points}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. RIGHT: Interactive Spatial District Map */}
      <div className="tactile-panel" style={{ padding: 12 }}>
        <div className="tactile-panel-header">
          <h2 className="tactile-panel-title">
            <MapPin size={14} color="#1e3a5f" />
            DISTRICT SPATIAL MAP
          </h2>
          <span className="tactile-panel-subtitle">HASSAN CLUSTER</span>
        </div>

        {/* Spatial Map Graphic */}
        <div style={{ 
          marginTop: 8, 
          height: 200, 
          background: '#1a2230', 
          borderRadius: 8, 
          position: 'relative', 
          overflow: 'hidden',
          border: '1px solid #334155'
        }}>
          <svg viewBox="0 0 300 200" style={{ width: '100%', height: '100%' }}>
            {/* Grid Lines */}
            <line x1="0" y1="50" x2="300" y2="50" stroke="#2a364a" strokeWidth="0.5" />
            <line x1="0" y1="100" x2="300" y2="100" stroke="#2a364a" strokeWidth="0.5" />
            <line x1="0" y1="150" x2="300" y2="150" stroke="#2a364a" strokeWidth="0.5" />
            <line x1="75" y1="0" x2="75" y2="200" stroke="#2a364a" strokeWidth="0.5" />
            <line x1="150" y1="0" x2="150" y2="200" stroke="#2a364a" strokeWidth="0.5" />
            <line x1="225" y1="0" x2="225" y2="200" stroke="#2a364a" strokeWidth="0.5" />

            {/* Simulated 5km Containment Ring around Farm KA-1023 */}
            <circle cx="150" cy="100" r="45" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" />

            {/* Current Case Farm Marker (KA-1023) */}
            <g 
              className="map-state-marker" 
              onClick={() => setSelectedMapPin('CURRENT_FARM')}
              transform="translate(150, 100)"
            >
              <circle cx="0" cy="0" r="7" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
              <circle cx="0" cy="0" r="14" fill="none" stroke="#60a5fa" strokeWidth="1.5">
                <animate attributeName="r" values="7;18;7" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <text x="12" y="4" fill="#ffffff" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">
                #KA-1023 (CURRENT)
              </text>
            </g>

            {/* Dummy Nearby Reference Farms */}
            <g className="map-state-marker" onClick={() => setSelectedMapPin('DUMMY_1')} transform="translate(190, 70)">
              <circle cx="0" cy="0" r="5" fill="#f59e0b" />
              <text x="8" y="3" fill="#94a3b8" fontSize="8" fontFamily="var(--font-mono)">KA-0982</text>
            </g>
            <g className="map-state-marker" onClick={() => setSelectedMapPin('DUMMY_2')} transform="translate(110, 130)">
              <circle cx="0" cy="0" r="5" fill="#22c55e" />
              <text x="8" y="3" fill="#94a3b8" fontSize="8" fontFamily="var(--font-mono)">KA-1044</text>
            </g>
          </svg>
        </div>

        {/* Map Legend */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, fontFamily: 'var(--font-mono)', marginTop: 6, color: '#64748b' }}>
          <span>🔵 Current Case</span>
          <span>🟠 Elevated Risk</span>
          <span>🟢 Clear</span>
        </div>

        {/* Selected Farm Detail Card */}
        <div style={{ background: '#f8fafc', padding: 8, borderRadius: 6, border: '1px solid #cbd5e1', marginTop: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#1e293b' }}>
            {selectedMapPin === 'CURRENT_FARM' ? `FARM #${farm.id} • ${farm.farmerName}` : 'REGIONAL REFERENCE HERD'}
          </div>
          <div style={{ fontSize: 9, color: '#64748b', marginTop: 2 }}>
            Coordinates: {farm.coordinates.lat}°N, {farm.coordinates.lng}°E • Risk: <strong>87/100</strong>
          </div>
          <div style={{ fontSize: 9, color: '#16a34a', fontWeight: 600, marginTop: 2 }}>
            Status: Paravet Verified on Site
          </div>
        </div>
      </div>
    </div>
  );
}
