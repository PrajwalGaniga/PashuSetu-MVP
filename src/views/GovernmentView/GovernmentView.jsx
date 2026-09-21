import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  ListTree 
} from 'lucide-react';
import { INDIA_STATES_DATA, REGIONAL_SURVEILLANCE_MARKERS } from '../../data/indiaMapData';

export function GovernmentView({
  caseId,
  farm,
  animal,
  labConfirmed,
  govSurveillanceUpdated,
  _groundTruthRecorded,
  feedbackLoopActive,
  activeCasesCount,
  highRiskCount,
  confirmedTodayCount,
  onOpenCaseJourney,
  _onResetCase
}) {
  // Currently selected state or marker for interactive drilldown
  const [selectedStateId, setSelectedStateId] = useState('INKA');
  const [selectedMarkerId, setSelectedMarkerId] = useState('KA-HASSAN');
  const [hoveredState, setHoveredState] = useState(null);

  const selectedState = INDIA_STATES_DATA.find(s => s.id === selectedStateId) || INDIA_STATES_DATA.find(s => s.id === 'INKA');
  const selectedMarker = REGIONAL_SURVEILLANCE_MARKERS.find(m => m.id === selectedMarkerId) || REGIONAL_SURVEILLANCE_MARKERS[0];
  const isPrimaryCaseSelected = selectedMarker.id === 'KA-HASSAN';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, minHeight: 0, overflowY: 'auto' }}>
      {/* Top Metrics Row with Clear Simulation Disclaimer Badge */}
      <div id="tour-gov-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        <div className="tactile-panel" style={{ padding: '10px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#64748b', fontWeight: 800 }}>
              TOTAL ACTIVE CASES
            </span>
            <span style={{ fontSize: 8, background: '#fef3c7', color: '#b45309', padding: '1px 5px', borderRadius: 3, fontWeight: 700 }}>
              SIMULATED
            </span>
          </div>
          <div style={{ fontSize: 24, fontFamily: 'var(--font-mono)', fontWeight: 900, color: '#1e293b', marginTop: 2 }}>
            {activeCasesCount}
          </div>
          <div style={{ fontSize: 8.5, color: '#64748b', marginTop: 2 }}>Across 14 Surveillance Zones</div>
        </div>

        <div className="tactile-panel" style={{ padding: '10px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#b91c1c', fontWeight: 800 }}>
              HIGH RISK CLUSTERS
            </span>
            <span style={{ fontSize: 8, background: '#fee2e2', color: '#b91c1c', padding: '1px 5px', borderRadius: 3, fontWeight: 700 }}>
              PRIORITY P1
            </span>
          </div>
          <div style={{ fontSize: 24, fontFamily: 'var(--font-mono)', fontWeight: 900, color: '#b91c1c', marginTop: 2 }}>
            {highRiskCount}
          </div>
          <div style={{ fontSize: 8.5, color: '#b91c1c', marginTop: 2 }}>Containment Protocols Triggered</div>
        </div>

        <div className="tactile-panel" style={{ padding: '10px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#15803d', fontWeight: 800 }}>
              LAB CONFIRMED TODAY
            </span>
            <span style={{ fontSize: 8, background: '#dcfce7', color: '#15803d', padding: '1px 5px', borderRadius: 3, fontWeight: 700 }}>
              GROUND TRUTH
            </span>
          </div>
          <div style={{ fontSize: 24, fontFamily: 'var(--font-mono)', fontWeight: 900, color: '#15803d', marginTop: 2 }}>
            {labConfirmed ? confirmedTodayCount : confirmedTodayCount - 1}
          </div>
          <div style={{ fontSize: 8.5, color: '#15803d', marginTop: 2 }}>Molecular Signatures Recorded</div>
        </div>

        <div className="tactile-panel" style={{ padding: '10px 14px', background: '#eff6ff', borderColor: '#bfdbfe' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#1d4ed8', fontWeight: 800 }}>
              NATIONAL STATUS
            </span>
            <span className="led-jewel led-blue led-pulse" style={{ width: 6, height: 6 }}></span>
          </div>
          <div style={{ fontSize: 16, fontFamily: 'var(--font-mono)', fontWeight: 900, color: '#1e3a8a', marginTop: 4 }}>
            EPIDEMIC GRID ACTIVE
          </div>
          <div style={{ fontSize: 8.5, color: '#2563eb', marginTop: 2 }}>NADRES 2.0 Synchronized</div>
        </div>
      </div>

      {/* Main Grid: Actual India Map on Left, Case Audit & Ground Truth on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 12, flex: 1, minHeight: 0 }}>
        
        {/* Left: Authentic India Geographic Map Card */}
        <div className="tactile-panel" id="tour-gov-india-map" style={{ padding: 12, display: 'flex', flexDirection: 'column' }}>
          <div className="tactile-panel-header">
            <h2 className="tactile-panel-title">
              <Building2 size={14} color="#1e3a5f" />
              ACTUAL INDIA LIVESTOCK DISEASE SURVEILLANCE MAP
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="status-pill status-ready" style={{ fontSize: 9, background: '#fef3c7', color: '#b45309', borderColor: '#fde68a' }}>
                SIMULATED SURVEILLANCE DATA
              </span>
            </div>
          </div>

          {/* Authentic India Vector Map Container */}
          <div className="national-map-card" style={{ flex: 1, minHeight: 380, position: 'relative', marginTop: 8 }}>
            <svg 
              viewBox="50 30 900 900" 
              style={{ width: '100%', height: '100%' }}
            >
              {/* Tactical Surveillance Coordinate Grid */}
              <defs>
                <pattern id="tacticalGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#25354b" strokeWidth="0.5" />
                </pattern>
                {/* Radial Glow for Confirmed Marker */}
                <radialGradient id="hotspotGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                </radialGradient>
              </defs>

              <rect width="100%" height="100%" fill="url(#tacticalGrid)" />

              {/* Render All 36 Real Indian State Administrative Boundaries */}
              <g id="india-states-layer">
                {INDIA_STATES_DATA.map((state) => {
                  const isSelected = selectedStateId === state.id;
                  const isHovered = hoveredState === state.id;
                  const isKarnataka = state.id === 'INKA';

                  // Dynamic fill based on state role in simulation
                  let fillColor = '#1c2838';
                  if (isSelected) fillColor = '#2a3d58';
                  else if (isKarnataka) fillColor = labConfirmed ? '#3d252b' : '#332938';
                  else if (isHovered) fillColor = '#243448';

                  let strokeColor = '#3c4e68';
                  let strokeWidth = 0.8;
                  if (isSelected) {
                    strokeColor = '#60a5fa';
                    strokeWidth = 1.8;
                  } else if (isKarnataka) {
                    strokeColor = labConfirmed ? '#ef4444' : '#f59e0b';
                    strokeWidth = 1.5;
                  }

                  return (
                    <path
                      key={state.id}
                      d={state.d}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      style={{ transition: 'all 0.2s ease', cursor: 'pointer' }}
                      onMouseEnter={() => {
                        setHoveredState(state.id);
                        setSelectedStateId(state.id);
                      }}
                      onMouseLeave={() => setHoveredState(null)}
                      onClick={() => {
                        setSelectedStateId(state.id);
                        if (state.id === 'INKA') setSelectedMarkerId('KA-HASSAN');
                        else if (state.id === 'INKL') setSelectedMarkerId('KL-WAYANAD');
                        else if (state.id === 'INMH') setSelectedMarkerId('MH-KOLHAPUR');
                        else if (state.id === 'INTN') setSelectedMarkerId('TN-SALEM');
                      }}
                    >
                      <title>{state.name} (Click for surveillance details)</title>
                    </path>
                  );
                })}
              </g>

              {/* Ground Truth Recalibration Feedback Arc (Animated SVG Loop) */}
              {feedbackLoopActive && (
                <g>
                  <path
                    d="M 324 730 C 220 550, 260 250, 344 321"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2.5"
                    strokeDasharray="8 4"
                    style={{ animation: 'circuitFlow 1.2s linear infinite' }}
                  />
                  <rect x="230" y="460" width="220" height="20" rx="4" fill="#0f291e" stroke="#22c55e" strokeWidth="1" />
                  <text x="240" y="474" fill="#4ade80" fontSize="9" fontFamily="var(--font-mono)" fontWeight="800">
                    ⟲ GROUND TRUTH RECALIBRATING PRIORS
                  </text>
                </g>
              )}

              {/* Regional Surveillance Markers (STABLE - NO TRANSFORM JITTER) */}
              {REGIONAL_SURVEILLANCE_MARKERS.map((marker) => {
                const isCurrentCase = marker.id === 'KA-HASSAN';
                const isSelected = selectedMarkerId === marker.id;
                const markerColor = isCurrentCase 
                  ? (labConfirmed ? '#ef4444' : '#f59e0b') 
                  : (marker.status === 'CONFIRMED' ? '#ef4444' : (marker.status === 'HIGH_RISK' ? '#f59e0b' : '#eab308'));

                return (
                  <g 
                    key={marker.id}
                    id={isCurrentCase ? "tour-gov-case-marker" : undefined}
                    className={`map-state-marker ${isSelected ? 'is-active' : ''}`}
                    transform={`translate(${marker.x}, ${marker.y})`}
                    onMouseEnter={() => {
                      setSelectedMarkerId(marker.id);
                      setSelectedStateId(marker.stateId);
                    }}
                    onClick={() => {
                      setSelectedMarkerId(marker.id);
                      setSelectedStateId(marker.stateId);
                    }}
                  >
                    {/* Pulsing Concentric Outer Ring */}
                    <circle cx="0" cy="0" r={isCurrentCase ? 10 : 7} fill="none" stroke={markerColor} strokeWidth="1.5">
                      <animate 
                        attributeName="r" 
                        values={isCurrentCase ? "10;24;10" : "7;18;7"} 
                        dur={isCurrentCase ? "1.4s" : "2s"} 
                        repeatCount="indefinite" 
                      />
                      <animate 
                        attributeName="opacity" 
                        values="1;0;1" 
                        dur={isCurrentCase ? "1.4s" : "2s"} 
                        repeatCount="indefinite" 
                      />
                    </circle>

                    {/* Marker Core */}
                    <circle 
                      cx="0" 
                      cy="0" 
                      r={isCurrentCase ? 7 : 5} 
                      fill={markerColor} 
                      stroke="#ffffff" 
                      strokeWidth={isSelected ? 2 : 1} 
                    />

                    {/* Marker Label Box */}
                    <rect 
                      x="12" 
                      y="-11" 
                      width={isCurrentCase ? 140 : 105} 
                      height="18" 
                      rx="3" 
                      fill={isSelected ? '#1e3a5f' : '#0f172a'} 
                      stroke={isSelected ? '#60a5fa' : '#334155'} 
                      strokeWidth={isSelected ? 1.5 : 1} 
                    />
                    <text 
                      x="16" 
                      y="1" 
                      fill="#ffffff" 
                      fontSize="9.5" 
                      fontFamily="var(--font-mono)" 
                      fontWeight="800"
                    >
                      {marker.stateName.toUpperCase()}: {marker.caseId}
                    </text>

                    {/* Tactical Popover Details Card (Visible When Hovered or Selected) */}
                    {isSelected && (
                      <g transform="translate(12, 14)">
                        <rect 
                          x="0" 
                          y="0" 
                          width="170" 
                          height="50" 
                          rx="5" 
                          fill="#0f172a" 
                          stroke="#3b82f6" 
                          strokeWidth="1.5" 
                          style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.7))' }}
                        />
                        <text x="8" y="14" fill="#60a5fa" fontSize="9" fontFamily="var(--font-mono)" fontWeight="800">
                          {marker.caseId} • {marker.label}
                        </text>
                        <text x="8" y="28" fill="#e2e8f0" fontSize="8.5" fontFamily="var(--font-sans)">
                          {marker.farm} • {marker.animal}
                        </text>
                        <text 
                          x="8" 
                          y="42" 
                          fill={isCurrentCase ? (labConfirmed ? '#4ade80' : '#f59e0b') : (marker.status === 'CONFIRMED' ? '#f87171' : '#fbbf24')} 
                          fontSize="8.5" 
                          fontFamily="var(--font-mono)" 
                          fontWeight="700"
                        >
                          Risk: {marker.risk}/100 • {isCurrentCase ? (labConfirmed ? 'PCR CONFIRMED' : 'INVESTIGATING') : marker.status}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Float Tooltip / Selected State Quick Badge */}
            <div style={{ 
              position: 'absolute', 
              top: 14, 
              left: 14, 
              background: 'rgba(15, 23, 42, 0.92)', 
              border: '1px solid #334155', 
              borderRadius: 6, 
              padding: '6px 12px',
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: '#ffffff'
            }}>
              <div>SURVEILLANCE GRID • <strong>{selectedState ? selectedState.name.toUpperCase() : 'INDIA'}</strong></div>
              <div style={{ fontSize: 8.5, color: '#94a3b8', marginTop: 1 }}>
                Hover or click any case marker to instantly inspect real-time dossier details.
              </div>
            </div>
          </div>

          {/* Map Footer Bar Legend */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, fontSize: 9.5, color: '#64748b' }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <span>🔴 Confirmed Outbreak (#PS-2026-00421)</span>
              <span>🟠 Elevated Cluster</span>
              <span>🟡 Under Investigation</span>
            </div>
            <span>Dataset: Survey of India Administrative Boundaries</span>
          </div>
        </div>

        {/* Right Column: Case Audit & Ecosystem Participant Chain + State Inspection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Case Audit & Ground Truth Dossier */}
          <div className="tactile-panel" id="tour-gov-case-audit" style={{ padding: 12 }}>
            <span className="screw screw-tl"></span>
            <span className="screw screw-tr"></span>
            <span className="screw screw-bl"></span>
            <span className="screw screw-br"></span>

            <div className="tactile-panel-header">
              <h2 className="tactile-panel-title">
                <ShieldCheck size={14} color="#1e3a5f" />
                CASE AUDIT & DETAILS
              </h2>
              <span className={`status-pill ${isPrimaryCaseSelected ? (labConfirmed ? 'status-danger' : 'status-ready') : 'status-ready'}`} style={{ fontSize: 9 }}>
                {isPrimaryCaseSelected ? (labConfirmed ? 'PCR CONFIRMED' : 'INVESTIGATING') : selectedMarker.status}
              </span>
            </div>

            {/* Dynamic Selected Case Reference Box (Updates on hover or click) */}
            <div style={{ background: '#f8fafc', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0', marginTop: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#64748b', fontWeight: 700 }}>
                  {isPrimaryCaseSelected ? 'PRIMARY EPICENTER CASE' : 'REGIONAL SURVEILLANCE EVENT'}
                </span>
                <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#b91c1c' }}>
                  RISK: {isPrimaryCaseSelected ? 87 : selectedMarker.risk}/100
                </span>
              </div>
              <div style={{ fontSize: 16, fontFamily: 'var(--font-mono)', fontWeight: 900, color: '#1e293b', marginTop: 2 }}>
                {selectedMarker.caseId}
              </div>
              <div style={{ fontSize: 10.5, color: '#475569', marginTop: 2 }}>
                Holding: <strong>{isPrimaryCaseSelected ? `Farm #${farm.id}` : selectedMarker.farm}</strong> ({selectedMarker.stateName}) • Subject: <strong>{isPrimaryCaseSelected ? animal.tag : selectedMarker.animal}</strong>
              </div>
            </div>

            {/* Connected Ecosystem Participant Chain */}
            <div id="tour-gov-ground-truth" style={{ 
              background: 'var(--bg-panel-sunken)', 
              padding: 10, 
              borderRadius: 8, 
              border: '1px solid var(--border-subtle)', 
              marginTop: 8 
            }}>
              <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#1e3a5f', marginBottom: 6 }}>
                ECOSYSTEM PARTICIPANT CHAIN:
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 10 }}>
                {/* Farmer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 6px', background: '#ffffff', borderRadius: 4, border: '1px solid #e2e8f0' }}>
                  <span>Farmer:</span>
                  <strong style={{ color: '#15803d' }}>✓ Verified Anomaly</strong>
                </div>

                {/* Paravet */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 6px', background: '#ffffff', borderRadius: 4, border: '1px solid #e2e8f0' }}>
                  <span>Paravet Inspection:</span>
                  <strong style={{ color: '#15803d' }}>✓ On-Site Verified</strong>
                </div>

                {/* Veterinarian */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 6px', background: '#ffffff', borderRadius: 4, border: '1px solid #e2e8f0' }}>
                  <span>Veterinarian Triage:</span>
                  <strong style={{ color: '#15803d' }}>✓ Clinical Review</strong>
                </div>

                {/* Laboratory */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 6px', background: '#ffffff', borderRadius: 4, border: '1px solid #e2e8f0' }}>
                  <span>Molecular Lab:</span>
                  <strong style={{ color: (isPrimaryCaseSelected && labConfirmed) || selectedMarker.status === 'CONFIRMED' ? '#15803d' : '#d97706' }}>
                    {(isPrimaryCaseSelected && labConfirmed) || selectedMarker.status === 'CONFIRMED' ? '✓ PCR Confirmed' : '○ Assay Queued'}
                  </strong>
                </div>

                {/* Government */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 6px', background: '#ffffff', borderRadius: 4, border: '1px solid #e2e8f0' }}>
                  <span>National Grid Sync:</span>
                  <strong style={{ color: govSurveillanceUpdated ? '#15803d' : '#64748b' }}>
                    {govSurveillanceUpdated ? '✓ Grid Synchronized' : '○ Standby'}
                  </strong>
                </div>
              </div>
            </div>

            {/* Selected State Drilldown Panel */}
            <div style={{ 
              background: '#f8fafc', 
              padding: 10, 
              borderRadius: 8, 
              border: '1px solid #cbd5e1', 
              marginTop: 8 
            }}>
              <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#64748b' }}>
                STATE JURISDICTION INSPECTION:
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#1e293b', marginTop: 2 }}>
                {selectedState ? selectedState.name.toUpperCase() : 'KARNATAKA'}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 6, fontSize: 10 }}>
                <div>Active Cases: <strong>{selectedState ? selectedState.activeCases : 12}</strong></div>
                <div>Risk Clusters: <strong>{selectedState ? selectedState.clusters : 3}</strong></div>
                <div>Lab Confirmed: <strong>{selectedState ? selectedState.confirmed : 1}</strong></div>
                <div>Status: <strong style={{ color: '#b91c1c' }}>{selectedState ? selectedState.status : 'HIGH RISK'}</strong></div>
              </div>
            </div>

            {/* Case Journey Trigger Button */}
            <div style={{ marginTop: 10 }}>
              <button
                onClick={onOpenCaseJourney}
                className="tactile-btn tactile-btn-primary"
                style={{ width: '100%', padding: '9px 0', fontSize: 11, fontWeight: 800 }}
              >
                <ListTree size={13} />
                <span>[ OPEN COMPLETE CASE JOURNEY DRAWER ]</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
