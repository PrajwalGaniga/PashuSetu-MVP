import React from 'react';
import { 
  Activity, 
  Thermometer, 
  Footprints, 
  Utensils, 
  Play,
  CheckCircle2, 
  AlertTriangle, 
  Radio
} from 'lucide-react';

export function FarmerView({
  farm,
  animal,
  telemetry,
  anomalyDetected,
  _farmerAlertGenerated,
  farmerConfirmed,
  offlineQueue,
  _caseCreated,
  caseId,
  onSimulateAnomaly,
  onConfirmAlert
}) {
  const isTempHigh = telemetry.temperature >= 38.0;
  const isMovementLow = telemetry.movement <= -20;
  const isFeedingLow = telemetry.feeding <= -15;
  const isLame = telemetry.lameness === 'DETECTED';

  // 10 Cattle in the herd: 9 healthy (green), 1 abnormal (Cattle #17)
  const herd = [
    { id: 'CATTLE-04', tag: '#04', x: 70, y: 135, status: 'NORMAL', scale: 0.75 },
    { id: 'CATTLE-08', tag: '#08', x: 130, y: 145, status: 'NORMAL', scale: 0.8 },
    { id: 'CATTLE-11', tag: '#11', x: 190, y: 138, status: 'NORMAL', scale: 0.78 },
    { id: 'CATTLE-17', tag: '#17', x: 270, y: 130, status: anomalyDetected ? 'ABNORMAL' : 'NORMAL', scale: 0.95, isSubject: true },
    { id: 'CATTLE-12', tag: '#12', x: 370, y: 142, status: 'NORMAL', scale: 0.8 },
    { id: 'CATTLE-15', tag: '#15', x: 430, y: 136, status: 'NORMAL', scale: 0.76 },
    { id: 'CATTLE-19', tag: '#19', x: 490, y: 144, status: 'NORMAL', scale: 0.82 },
    { id: 'CATTLE-23', tag: '#23', x: 550, y: 138, status: 'NORMAL', scale: 0.78 },
    { id: 'CATTLE-28', tag: '#28', x: 610, y: 146, status: 'NORMAL', scale: 0.8 },
    { id: 'CATTLE-31', tag: '#31', x: 660, y: 138, status: 'NORMAL', scale: 0.74 }
  ];

  // Distributed IoT sensors
  const sensors = [
    { id: 'S1', label: 'TEMP PROBE', x: 80, y: 85, alert: false },
    { id: 'S2', label: 'AMMONIA / AIR', x: 220, y: 75, alert: isTempHigh },
    { id: 'S3', label: 'COLLAR GATEWAY', x: 310, y: 90, alert: anomalyDetected },
    { id: 'S4', label: 'FEED TROUGH MON', x: 470, y: 85, alert: isFeedingLow },
    { id: 'S5', label: 'MICROCLIMATE STN', x: 600, y: 78, alert: false }
  ];

  return (
    <div className="farmer-view-grid">
      {/* Left Column: Living Herd Digital Twin & Telemetry Readings */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto' }}>
        
        {/* Farm Environment Twin Panel */}
        <div className="tactile-panel" id="tour-farmer-environment" style={{ padding: 12 }}>
          <span className="screw screw-tl"></span>
          <span className="screw screw-tr"></span>
          <span className="screw screw-bl"></span>
          <span className="screw screw-br"></span>

          <div className="tactile-panel-header">
            <h2 className="tactile-panel-title">
              <Activity size={14} color="#1e3a5f" />
              LIVESTOCK HERD DIGITAL TWIN • {farm.id}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="status-pill status-ready" style={{ fontSize: 9 }}>
                10 HERD SPECIMENS MONITORED
              </span>
              <span className="tactile-panel-subtitle">{farm.district}, {farm.state}</span>
            </div>
          </div>

          {/* SVG Canvas for Herd & Sensors */}
          <div className="farm-environment-canvas" style={{ height: 260, position: 'relative', marginTop: 8 }}>
            <svg viewBox="0 0 720 250" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
              <defs>
                {/* Straw bedding pattern */}
                <pattern id="bedding" width="20" height="20" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="10" x2="20" y2="10" stroke="#dfd6c4" strokeWidth="0.5" />
                  <line x1="10" y1="0" x2="10" y2="20" stroke="#dfd6c4" strokeWidth="0.5" />
                </pattern>

                {/* Radio wave pulse keyframe */}
                <radialGradient id="waveGlowBlue" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="waveGlowRed" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Background Shed Ground */}
              <rect x="0" y="140" width="720" height="110" fill="#ebe4d6" />
              <rect x="0" y="150" width="720" height="100" fill="url(#bedding)" />
              <line x1="0" y1="140" x2="720" y2="140" stroke="#c8bead" strokeWidth="2" />

              {/* Timber Shed Trusses & Beams */}
              <polygon points="20,50 700,50 670,25 50,25" fill="#334155" opacity="0.85" />
              <line x1="60" y1="50" x2="60" y2="150" stroke="#475569" strokeWidth="4" />
              <line x1="220" y1="50" x2="220" y2="150" stroke="#475569" strokeWidth="4" />
              <line x1="380" y1="50" x2="380" y2="150" stroke="#475569" strokeWidth="4" />
              <line x1="540" y1="50" x2="540" y2="150" stroke="#475569" strokeWidth="4" />
              <line x1="680" y1="50" x2="680" y2="150" stroke="#475569" strokeWidth="4" />

              {/* Feed Trough Along the Base */}
              <rect x="30" y="195" width="660" height="18" rx="4" fill="#a89f91" stroke="#8c8273" strokeWidth="1" />
              <text x="40" y="208" fontSize="8" fontFamily="var(--font-mono)" fill="#ffffff" opacity="0.8">
                CONTINUOUS FEED TROUGH & WATER SYSTEM (IOT MONITORED)
              </text>

              {/* Camera CV Visual Beam */}
              <g id="tour-farmer-cv">
                <polygon 
                  points="220,50 180,195 380,195" 
                  fill={anomalyDetected ? 'rgba(239, 68, 68, 0.14)' : 'rgba(59, 130, 246, 0.08)'} 
                  stroke={anomalyDetected ? '#ef4444' : '#60a5fa'} 
                  strokeWidth="1" 
                  strokeDasharray="4 4" 
                />
                {/* Animated Camera Scanning Line */}
                <line 
                  x1="180" 
                  y1={anomalyDetected ? "165" : "110"} 
                  x2="380" 
                  y2={anomalyDetected ? "165" : "110"} 
                  stroke={anomalyDetected ? "#ef4444" : "#38bdf8"} 
                  strokeWidth="1.5"
                >
                  <animate 
                    attributeName="y1" 
                    values="70;190;70" 
                    dur={anomalyDetected ? "1.5s" : "3s"} 
                    repeatCount="indefinite" 
                  />
                  <animate 
                    attributeName="y2" 
                    values="70;190;70" 
                    dur={anomalyDetected ? "1.5s" : "3s"} 
                    repeatCount="indefinite" 
                  />
                </line>

                {/* Camera Hardware Head */}
                <circle cx="220" cy="50" r="7" fill="#0f172a" />
                <circle cx="220" cy="50" r="3" fill="#38bdf8" />
                <text x="232" y="54" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700" fill="#1e293b">
                  CV CAM-01 {anomalyDetected ? '• ANOMALY CONFIRMED' : '• SCANNING HERD'}
                </text>
              </g>

              {/* Render 10 Cattle in the Herd */}
              {herd.map((c) => {
                const isAbnormal = c.status === 'ABNORMAL';
                const isTargetCattle17 = c.isSubject;

                return (
                  <g key={c.id} transform={`translate(${c.x}, ${c.y}) scale(${c.scale})`}>
                    {/* Bounding box for abnormal Cattle #17 */}
                    {isAbnormal && (
                      <g>
                        <rect 
                          x="-18" 
                          y="-2" 
                          width="85" 
                          height="85" 
                          rx="6" 
                          fill="rgba(239, 68, 68, 0.08)" 
                          stroke="#ef4444" 
                          strokeWidth="1.5" 
                          strokeDasharray="3 3"
                        >
                          <animate attributeName="stroke-opacity" values="1;0.4;1" dur="1s" repeatCount="indefinite" />
                        </rect>
                        <text x="-15" y="-6" fontSize="9" fontFamily="var(--font-mono)" fontWeight="800" fill="#b91c1c">
                          ⚠ ANOMALY: GAIT -42%
                        </text>
                      </g>
                    )}

                    {/* Cattle Body */}
                    <ellipse 
                      cx="25" 
                      cy="35" 
                      rx="26" 
                      ry="18" 
                      fill={isAbnormal ? '#451a1a' : (isTargetCattle17 ? '#334155' : '#475569')} 
                    />
                    {/* White patch on Holstein Friesian cattle */}
                    <ellipse cx="28" cy="32" rx="10" ry="7" fill="#ffffff" opacity={isAbnormal ? 0.6 : 0.85} />
                    
                    {/* Cattle Head */}
                    <circle 
                      cx="2" 
                      cy="26" 
                      r="12" 
                      fill={isAbnormal ? '#451a1a' : (isTargetCattle17 ? '#334155' : '#475569')} 
                    />
                    
                    {/* Legs */}
                    <rect x="7" y="48" width="5" height="22" fill="#1e293b" />
                    <rect x="18" y="48" width="5" height="22" fill="#1e293b" />
                    <rect x="32" y="48" width="5" height="22" fill="#1e293b" />
                    <rect x="42" y="48" width="5" height="22" fill="#1e293b" />

                    {/* IoT Collar Beacon on Cattle */}
                    <circle 
                      cx="10" 
                      cy="28" 
                      r="4.5" 
                      fill={isAbnormal ? '#ef4444' : '#22c55e'} 
                    />
                    
                    {/* Pulsing ring around collar */}
                    <circle 
                      cx="10" 
                      cy="28" 
                      r="8" 
                      fill="none" 
                      stroke={isAbnormal ? '#ef4444' : '#22c55e'} 
                      strokeWidth="1.2"
                    >
                      <animate 
                        attributeName="r" 
                        values="4.5;14;4.5" 
                        dur={isAbnormal ? "0.9s" : "2.2s"} 
                        repeatCount="indefinite" 
                      />
                      <animate 
                        attributeName="opacity" 
                        values="1;0;1" 
                        dur={isAbnormal ? "0.9s" : "2.2s"} 
                        repeatCount="indefinite" 
                      />
                    </circle>

                    {/* Tag label */}
                    <rect 
                      x="0" 
                      y="10" 
                      width="38" 
                      height="12" 
                      rx="3" 
                      fill={isAbnormal ? '#ef4444' : (isTargetCattle17 ? '#1e3a5f' : '#ffffff')} 
                    />
                    <text 
                      x="19" 
                      y="19" 
                      fontSize="8" 
                      fontFamily="var(--font-mono)" 
                      fontWeight="800" 
                      textAnchor="middle" 
                      fill={isAbnormal || isTargetCattle17 ? '#ffffff' : '#1e293b'}
                    >
                      {c.tag} {isAbnormal ? '🔴' : '🟢'}
                    </text>
                  </g>
                );
              })}

              {/* IoT Hardware Sensors with Radio Wave Signals */}
              {sensors.map((s) => (
                <g key={s.id} transform={`translate(${s.x}, ${s.y})`}>
                  {/* Physical node box */}
                  <rect x="-10" y="-8" width="20" height="16" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                  <circle cx="0" cy="0" r="3" fill={s.alert ? '#ef4444' : '#38bdf8'} />

                  {/* Concentric Animated Radio Waves */}
                  <path 
                    d="M 14 -10 A 15 15 0 0 1 14 10" 
                    fill="none" 
                    stroke={s.alert ? '#ef4444' : '#38bdf8'} 
                    strokeWidth="1.2"
                  >
                    <animate attributeName="opacity" values="0.2;1;0.2" dur="1.2s" repeatCount="indefinite" />
                  </path>
                  <path 
                    d="M 19 -15 A 22 22 0 0 1 19 15" 
                    fill="none" 
                    stroke={s.alert ? '#ef4444' : '#38bdf8'} 
                    strokeWidth="1.2"
                  >
                    <animate attributeName="opacity" values="0.1;0.8;0.1" dur="1.2s" begin="0.3s" repeatCount="indefinite" />
                  </path>
                  <path 
                    d="M 24 -20 A 28 28 0 0 1 24 20" 
                    fill="none" 
                    stroke={s.alert ? '#ef4444' : '#38bdf8'} 
                    strokeWidth="1.2"
                  >
                    <animate attributeName="opacity" values="0.05;0.6;0.05" dur="1.2s" begin="0.6s" repeatCount="indefinite" />
                  </path>

                  {/* Label */}
                  <text x="0" y="16" fontSize="7.5" fontFamily="var(--font-mono)" fill="#334155" textAnchor="middle" fontWeight="700">
                    {s.label}
                  </text>
                </g>
              ))}
            </svg>

            {/* Float Badges for Immediate Assessment */}
            <div className="sensor-beacon" id="tour-farmer-iot" style={{ top: 12, right: 14 }}>
              <Radio size={12} color="#2563eb" />
              <span>IOT MESH: 5 NODES BROADCASTING</span>
            </div>

            <div className={`sensor-beacon ${anomalyDetected ? 'is-alert' : ''}`} style={{ bottom: 12, left: 14 }}>
              <span className={`led-jewel ${anomalyDetected ? 'led-red led-pulse' : 'led-green'}`}></span>
              <span>
                {anomalyDetected ? 'CATTLE #17: FEBRILE & GAIT ANOMALY DETECTED' : 'HERD STATUS: 10/10 NOMINAL BASELINE'}
              </span>
            </div>
          </div>
        </div>

        {/* Live Farm Telemetry Readings & Event Trigger */}
        <div className="tactile-panel" style={{ padding: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--text-main)' }}>
                CATTLE #17 EDGE TELEMETRY
              </span>
              <span className="status-pill status-ready" style={{ fontSize: 9 }}>BLE COLLAR #IOT-BLE-094</span>
            </div>

            {/* Offline-First Sync Badge */}
            <div>
              {offlineQueue === 'SYNCING' ? (
                <span className="status-pill status-active">SYNCING WITH CLOUD...</span>
              ) : offlineQueue === 'BUFFERED' ? (
                <span className="status-pill status-danger">OFFLINE BUFFER (1 EVENT)</span>
              ) : (
                <span className="status-pill status-success">✓ OFFLINE QUEUE SYNCHRONIZED</span>
              )}
            </div>
          </div>

          {/* Sensor Gauges Grid */}
          <div className="sensor-gauges-grid">
            <div className={`gauge-card ${isTempHigh ? 'is-alert' : ''}`}>
              <div className="gauge-label">
                <Thermometer size={12} /> RECTAL / COLLAR TEMP
              </div>
              <div className="gauge-value-row">
                <span className="gauge-value">{telemetry.temperature.toFixed(1)}</span>
                <span className="gauge-unit">°C</span>
              </div>
              <div className="analog-meter-track" style={{ marginTop: 4 }}>
                <div 
                  className={`analog-meter-bar ${isTempHigh ? 'bar-red' : 'bar-green'}`} 
                  style={{ width: `${Math.min(100, Math.max(10, ((telemetry.temperature - 36.5) / 3.0) * 100))}%` }}
                ></div>
              </div>
              <div style={{ fontSize: 8, color: '#64748b', marginTop: 3 }}>
                Baseline: 37.2°C • {isTempHigh ? 'SPIKE +1.3°C' : 'Nominal'}
              </div>
            </div>

            <div className={`gauge-card ${isMovementLow ? 'is-alert' : ''}`}>
              <div className="gauge-label">
                <Activity size={12} /> MOBILITY & GAIT DEV
              </div>
              <div className="gauge-value-row">
                <span className="gauge-value">{telemetry.movement === 0 ? 'NOMINAL' : `${telemetry.movement}%`}</span>
              </div>
              <div className="analog-meter-track" style={{ marginTop: 4 }}>
                <div 
                  className={`analog-meter-bar ${isMovementLow ? 'bar-red' : ''}`} 
                  style={{ width: `${Math.min(100, Math.max(15, 100 - Math.abs(telemetry.movement) * 2))}%` }}
                ></div>
              </div>
              <div style={{ fontSize: 8, color: '#64748b', marginTop: 3 }}>
                {isMovementLow ? 'Prolonged Recumbency' : 'Standard Ambulation'}
              </div>
            </div>

            <div className={`gauge-card ${isFeedingLow ? 'is-alert' : ''}`}>
              <div className="gauge-label">
                <Utensils size={12} /> FEEDING & RUMINATION
              </div>
              <div className="gauge-value-row">
                <span className="gauge-value">{telemetry.feeding === 0 ? 'NOMINAL' : `${telemetry.feeding}%`}</span>
              </div>
              <div className="analog-meter-track" style={{ marginTop: 4 }}>
                <div 
                  className={`analog-meter-bar ${isFeedingLow ? 'bar-red' : ''}`} 
                  style={{ width: `${Math.min(100, Math.max(15, 100 - Math.abs(telemetry.feeding) * 2.5))}%` }}
                ></div>
              </div>
              <div style={{ fontSize: 8, color: '#64748b', marginTop: 3 }}>
                {isFeedingLow ? 'Refusal of Concentrate' : 'Regular Chewing Cycles'}
              </div>
            </div>

            <div className={`gauge-card ${isLame ? 'is-alert' : ''}`}>
              <div className="gauge-label">
                <Footprints size={12} /> CV LAMENESS SCORING
              </div>
              <div className="gauge-value-row">
                <span className="gauge-value" style={{ fontSize: 13 }}>{telemetry.lameness}</span>
                {isLame && <AlertTriangle size={12} color="#ef4444" />}
              </div>
              <div className="analog-meter-track" style={{ marginTop: 4 }}>
                <div 
                  className={`analog-meter-bar ${isLame ? 'bar-red' : 'bar-green'}`} 
                  style={{ width: isLame ? '100%' : '15%' }}
                ></div>
              </div>
              <div style={{ fontSize: 8, color: '#64748b', marginTop: 3 }}>
                {isLame ? 'Interdigital Asymmetry' : 'Posture Level 1 (Sound)'}
              </div>
            </div>
          </div>

          {/* Simulate Health Event Action Button */}
          <div id="tour-farmer-trigger" style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
              {anomalyDetected ? (
                <span style={{ color: '#b91c1c', fontWeight: 700 }}>
                  ● Step 1 Active: Cattle #17 anomaly detected. Review notification on Farmer mobile phone.
                </span>
              ) : (
                <span>• Farm operating under standard surveillance baseline</span>
              )}
            </div>

            <button
              onClick={onSimulateAnomaly}
              disabled={anomalyDetected}
              className="tactile-btn tactile-btn-primary"
              style={{ padding: '9px 18px', fontSize: 12, fontWeight: 800 }}
            >
              <Play size={13} fill="currentColor" />
              <span>{anomalyDetected ? 'SIMULATION IN PROGRESS...' : 'SIMULATE HEALTH EVENT'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Realistic Interactive Farmer Smartphone Mockup */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="phone-mockup-wrapper" id="tour-farmer-phone">
          {/* Top Speaker Notch & Camera Pin */}
          <div className="phone-notch-bar">
            <div className="phone-speaker"></div>
            <div className="phone-camera-dot"></div>
          </div>

          {/* Phone Screen Display */}
          <div className="phone-screen">
            {/* Status Bar */}
            <div className="phone-status-bar">
              <span>09:41</span>
              <span>📶 5G 🔋 98%</span>
            </div>

            {/* Mobile App Header */}
            <div className="phone-app-header">
              <div>
                <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.08em' }}>PASHUSETU</div>
                <div style={{ fontSize: 8, opacity: 0.8 }}>FARMER FIELD COMPANION</div>
              </div>
              <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', background: '#2563eb', padding: '2px 8px', borderRadius: 4 }}>
                FARMER
              </span>
            </div>

            {/* Mobile App Body */}
            <div className="phone-content-body">
              {/* Farm Badge */}
              <div style={{ background: '#ffffff', borderRadius: 8, padding: 10, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#64748b' }}>REGISTERED HOLDING</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#1e293b' }}>
                  Farm #{farm.id} • {farm.farmerName}
                </div>
                <div style={{ fontSize: 10, color: '#64748b', marginTop: 2 }}>
                  {farm.taluk}, {farm.district}
                </div>
              </div>

              {/* Alert Notification Card */}
              {!anomalyDetected ? (
                <div style={{ padding: 28, textAlign: 'center', color: '#64748b' }}>
                  <CheckCircle2 size={32} color="#16a34a" style={{ margin: '0 auto 8px auto' }} />
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#166534' }}>ALL LIVESTOCK NOMINAL</div>
                  <div style={{ fontSize: 10, marginTop: 4 }}>
                    Continuous BLE collar and CV video surveillance monitoring active.
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {/* Alert Header Box */}
                  <div style={{ 
                    background: '#fef2f2', 
                    border: '1.5px solid #ef4444', 
                    borderRadius: 8, 
                    padding: 10,
                    animation: farmerConfirmed ? 'none' : 'phoneAlertPulse 1.5s infinite' 
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 11, fontWeight: 900, color: '#b91c1c' }}>
                        ⚠ HEALTH ANOMALY ALERT
                      </span>
                      <span style={{ fontSize: 9, background: '#ef4444', color: '#ffffff', padding: '1px 5px', borderRadius: 3, fontWeight: 700 }}>
                        URGENT
                      </span>
                    </div>

                    <div style={{ fontSize: 11, fontWeight: 700, color: '#1e293b', marginTop: 4 }}>
                      Animal: {animal.tag}
                    </div>
                    <div style={{ fontSize: 9, color: '#64748b' }}>
                      {animal.breed} • Collar: {animal.collarId}
                    </div>

                    {/* Telemetry Summary on Phone */}
                    <div style={{ marginTop: 8, background: '#ffffff', borderRadius: 6, padding: 8, border: '1px solid #fecaca', fontSize: 10, display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Temperature:</span>
                        <strong style={{ color: '#b91c1c' }}>{telemetry.temperature.toFixed(1)}°C (+1.3°C)</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Mobility:</span>
                        <strong style={{ color: '#b91c1c' }}>{telemetry.movement}% Deviation</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Feeding Intake:</span>
                        <strong style={{ color: '#b91c1c' }}>{telemetry.feeding}% Reduction</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Lameness Detection:</span>
                        <strong style={{ color: '#b91c1c' }}>{telemetry.lameness}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Confirmation Action */}
                  <div id="tour-farmer-confirm">
                    {!farmerConfirmed ? (
                      <button
                        onClick={onConfirmAlert}
                        className="tactile-btn tactile-btn-primary"
                        style={{ 
                          width: '100%', 
                          padding: '10px 0', 
                          fontSize: 11, 
                          fontWeight: 800,
                          boxShadow: '0 4px 12px rgba(220, 38, 38, 0.35)' 
                        }}
                      >
                        [ VERIFY & NOTIFY PARAVET ]
                      </button>
                    ) : (
                      <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 8, padding: 10, textAlign: 'center' }}>
                        <div style={{ color: '#15803d', fontWeight: 800, fontSize: 11 }}>
                          ✓ ALERT VERIFIED & REGISTERED
                        </div>
                        <div style={{ fontSize: 10, color: '#166534', marginTop: 3 }}>
                          Unified Case: <strong>{caseId}</strong>
                        </div>
                        <div style={{ fontSize: 9, color: '#475569', marginTop: 2 }}>
                          Paravet Field Mobile Unit Dispatched.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Phone Home Bar Indicator */}
            <div className="phone-home-indicator"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
