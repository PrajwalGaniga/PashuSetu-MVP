import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Layers, 
  RefreshCw, 
  ShieldCheck, 
  ListTree, 
  RotateCcw, 
  AlertCircle,
  TrendingUp,
  Activity
} from 'lucide-react';

export function GovernmentView({
  caseId,
  farm,
  animal,
  labConfirmed,
  govSurveillanceUpdated,
  groundTruthRecorded,
  feedbackLoopActive,
  activeCasesCount,
  highRiskCount,
  confirmedTodayCount,
  onOpenCaseJourney,
  onResetCase
}) {
  const [selectedCaseId, setSelectedCaseId] = useState(caseId);

  const mockCaseFeed = [
    { id: caseId, state: 'Karnataka', farm: farm.id, risk: 87, status: labConfirmed ? 'CONFIRMED' : 'INVESTIGATING', color: labConfirmed ? '#ef4444' : '#f59e0b' },
    { id: 'PS-2026-00418', state: 'Kerala', farm: 'KL-0422', risk: 74, status: 'HIGH RISK', color: '#f59e0b' },
    { id: 'PS-2026-00411', state: 'Maharashtra', farm: 'MH-1809', risk: 52, status: 'SUSPECTED', color: '#eab308' },
    { id: 'PS-2026-00399', state: 'Tamil Nadu', farm: 'TN-0631', risk: 82, status: 'CONFIRMED', color: '#ef4444' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, minHeight: 0, overflowY: 'auto' }}>
      {/* Top Metrics Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        <div className="tactile-panel" style={{ padding: '8px 12px' }}>
          <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#64748b' }}>TOTAL ACTIVE CASES</div>
          <div style={{ fontSize: 20, fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#1e293b' }}>
            {activeCasesCount}
          </div>
          <div style={{ fontSize: 8, color: '#64748b', marginTop: 2 }}>Across 14 Surveillance Zones</div>
        </div>

        <div className="tactile-panel" style={{ padding: '8px 12px' }}>
          <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#b91c1c' }}>HIGH RISK CLUSTERS</div>
          <div style={{ fontSize: 20, fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#b91c1c' }}>
            {highRiskCount}
          </div>
          <div style={{ fontSize: 8, color: '#b91c1c', marginTop: 2 }}>Priority P1 Escalated</div>
        </div>

        <div className="tactile-panel" style={{ padding: '8px 12px' }}>
          <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#15803d' }}>LAB CONFIRMED TODAY</div>
          <div style={{ fontSize: 20, fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#15803d' }}>
            {labConfirmed ? confirmedTodayCount : confirmedTodayCount - 1}
          </div>
          <div style={{ fontSize: 8, color: '#15803d', marginTop: 2 }}>Ground Truth Acquired</div>
        </div>

        <div className="tactile-panel" style={{ padding: '8px 12px', background: '#eff6ff' }}>
          <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#1d4ed8' }}>NATIONAL STATUS</div>
          <div style={{ fontSize: 16, fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#1e3a8a', marginTop: 2 }}>
            EPIDEMIC GRID ACTIVE
          </div>
          <div style={{ fontSize: 8, color: '#2563eb', marginTop: 2 }}>NADRES 2.0 Synchronized</div>
        </div>
      </div>

      {/* Main Row: National Map & Case Feed + Ground Truth Details */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 12, flex: 1, minHeight: 0 }}>
        {/* Left: National Disease Surveillance Map (India SVG) */}
        <div className="tactile-panel" style={{ padding: 12, display: 'flex', flexDirection: 'column' }}>
          <div className="tactile-panel-header">
            <h2 className="tactile-panel-title">
              <Building2 size={14} color="#1e3a5f" />
              NATIONAL LIVESTOCK SURVEILLANCE GRID
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="status-pill status-ready" style={{ fontSize: 9 }}>SIMULATION SURVEILLANCE DATA</span>
            </div>
          </div>

          <div className="national-map-card" style={{ flex: 1, minHeight: 260, marginTop: 8 }}>
            <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%' }}>
              {/* Tactical Lat/Lng Grid */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#223046" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Simplified India Territorial Outline */}
              <path 
                d="M170 30 L220 60 L210 110 L270 120 L280 160 L230 190 L195 270 L170 230 L150 170 L100 130 L130 90 Z" 
                fill="#243144" 
                stroke="#3e5270" 
                strokeWidth="1.5"
              />

              {/* Karnataka Outbreak Hotspot (Farm #KA-1023) */}
              <g 
                className="map-state-marker" 
                onClick={() => setSelectedCaseId(caseId)}
                transform="translate(175, 220)"
              >
                <circle cx="0" cy="0" r="7" fill={labConfirmed ? '#ef4444' : '#f59e0b'} />
                <circle cx="0" cy="0" r="14" fill="none" stroke={labConfirmed ? '#ef4444' : '#f59e0b'} strokeWidth="1.5">
                  <animate attributeName="r" values="7;22;7" dur="1.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0;1" dur="1.4s" repeatCount="indefinite" />
                </circle>
                <text x="12" y="4" fill="#ffffff" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">
                  KARNATAKA ({caseId})
                </text>
              </g>

              {/* Other Regional Simulated Indicators */}
              <g className="map-state-marker" transform="translate(170, 255)">
                <circle cx="0" cy="0" r="5" fill="#f59e0b" />
                <text x="8" y="3" fill="#94a3b8" fontSize="8" fontFamily="var(--font-mono)">KERALA</text>
              </g>
              <g className="map-state-marker" transform="translate(155, 175)">
                <circle cx="0" cy="0" r="5" fill="#eab308" />
                <text x="8" y="3" fill="#94a3b8" fontSize="8" fontFamily="var(--font-mono)">MAHARASHTRA</text>
              </g>
              <g className="map-state-marker" transform="translate(225, 230)">
                <circle cx="0" cy="0" r="5" fill="#ef4444" />
                <text x="8" y="3" fill="#94a3b8" fontSize="8" fontFamily="var(--font-mono)">TAMIL NADU</text>
              </g>

              {/* Ground Truth Recalibration Feedback Arc */}
              {feedbackLoopActive && (
                <g>
                  <path
                    d="M 175 220 C 130 160, 130 80, 180 50"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2"
                    strokeDasharray="6 3"
                    style={{ animation: 'circuitFlow 1.2s linear infinite' }}
                  />
                  <text x="70" y="70" fill="#4ade80" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">
                    ⟲ GROUND TRUTH RECALIBRATING PRIORS
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Map Footer Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, fontSize: 10, color: '#64748b' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span>🔴 Confirmed Outbreak</span>
              <span>🟠 Elevated Cluster</span>
              <span>🟡 Suspected Signal</span>
            </div>
            <span>Coordinates: Hassan Epicenter (13.00°N, 76.10°E)</span>
          </div>
        </div>

        {/* Right: Selected Case Details & Ground Truth Status */}
        <div className="tactile-panel" style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="tactile-panel-header">
            <h2 className="tactile-panel-title">
              <Activity size={14} color="#1e3a5f" />
              CASE AUDIT & GROUND TRUTH
            </h2>
            <span className="status-pill status-danger" style={{ fontSize: 9 }}>
              {labConfirmed ? 'CONFIRMED' : 'INVESTIGATING'}
            </span>
          </div>

          <div style={{ background: '#f8fafc', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#64748b' }}>ACTIVE SELECTION</div>
            <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#1e293b' }}>
              CASE #{caseId}
            </div>
            <div style={{ fontSize: 10, color: '#475569', marginTop: 2 }}>
              Origin: Farm #{farm.id} ({farm.district}) • {animal.tag}
            </div>
          </div>

          {/* Connected Workflow Verification Summary */}
          <div style={{ background: 'var(--bg-panel-sunken)', padding: 10, borderRadius: 8, border: '1px solid var(--border-subtle)', fontSize: 10 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 4 }}>
              ECOSYSTEM PARTICIPANT CHAIN:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Farmer Suresh Patel:</span>
                <strong style={{ color: '#15803d' }}>✓ Verified Anomaly</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Paravet Ramesh Gowda:</span>
                <strong style={{ color: '#15803d' }}>✓ On-Site Inspection</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Veterinarian Dr. Ananya Rao:</span>
                <strong style={{ color: '#15803d' }}>✓ Clinical Tele-Triage</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>State Molecular Lab:</span>
                <strong style={{ color: labConfirmed ? '#15803d' : '#d97706' }}>
                  {labConfirmed ? '✓ PCR Confirmed (FMDV)' : 'Processing...'}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Government Surveillance:</span>
                <strong style={{ color: labConfirmed ? '#15803d' : '#64748b' }}>
                  {labConfirmed ? '✓ Grid Synchronized' : 'Pending'}
                </strong>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 'auto' }}>
            <button
              onClick={onOpenCaseJourney}
              className="tactile-btn tactile-btn-primary"
              style={{ width: '100%', padding: '9px 0', fontSize: 11 }}
            >
              <ListTree size={13} />
              <span>VIEW COMPLETE CASE JOURNEY</span>
            </button>

            <button
              onClick={onResetCase}
              className="tactile-btn tactile-btn-secondary"
              style={{ width: '100%', padding: '8px 0', fontSize: 10 }}
            >
              <RotateCcw size={12} />
              <span>RUN NEW CASE SIMULATION</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
