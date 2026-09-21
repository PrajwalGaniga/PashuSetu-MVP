import React from 'react';
import { 
  Activity, 
  Thermometer, 
  Wind, 
  Footprints, 
  Utensils, 
  Eye, 
  Wifi, 
  AlertTriangle, 
  CheckCircle2, 
  WifiOff, 
  Smartphone,
  Play,
  Layers
} from 'lucide-react';

export function FarmerView({
  farm,
  animal,
  telemetry,
  anomalyDetected,
  farmerAlertGenerated,
  farmerConfirmed,
  offlineQueue,
  caseCreated,
  caseId,
  onSimulateAnomaly,
  onConfirmAlert
}) {
  const isTempHigh = telemetry.temperature >= 38.0;
  const isMovementLow = telemetry.movement <= -20;
  const isFeedingLow = telemetry.feeding <= -15;
  const isLame = telemetry.lameness === 'DETECTED';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 14, flex: 1, minHeight: 0 }}>
      {/* Left Column: Stylized Farm Twin & Sensor Telemetry Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>
        {/* Farm Environment Digital Twin Canvas */}
        <div className="tactile-panel" style={{ padding: 12 }}>
          <span className="screw screw-tl"></span>
          <span className="screw screw-tr"></span>
          <span className="screw screw-bl"></span>
          <span className="screw screw-br"></span>

          <div className="tactile-panel-header">
            <h2 className="tactile-panel-title">
              <Activity size={14} color="#1e3a5f" />
              LIVESTOCK ENVIRONMENT TWIN • {farm.id}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="led-jewel led-green"></span>
              <span className="tactile-panel-subtitle">{farm.district}, {farm.state}</span>
            </div>
          </div>

          <div className="farm-environment-canvas" style={{ marginTop: 8 }}>
            {/* SVG Digital Twin of Shed & Cattle */}
            <svg viewBox="0 0 600 240" style={{ width: '100%', height: '100%' }}>
              {/* Ground & Shed Structure */}
              <rect x="0" y="160" width="600" height="80" fill="#ebe4d6" />
              <line x1="0" y1="160" x2="600" y2="160" stroke="#d5ccbd" strokeWidth="2" />
              
              {/* Shed Columns & Roof */}
              <polygon points="40,70 560,70 520,30 80,30" fill="#475569" opacity="0.8" />
              <line x1="80" y1="70" x2="80" y2="160" stroke="#64748b" strokeWidth="4" />
              <line x1="280" y1="70" x2="280" y2="160" stroke="#64748b" strokeWidth="4" />
              <line x1="480" y1="70" x2="480" y2="160" stroke="#64748b" strokeWidth="4" />

              {/* Camera CV Visual Cone */}
              <polygon 
                points="80,70 180,180 340,180" 
                fill={anomalyDetected ? 'rgba(239, 68, 68, 0.12)' : 'rgba(59, 130, 246, 0.08)'} 
                stroke={anomalyDetected ? '#ef4444' : '#60a5fa'} 
                strokeWidth="1" 
                strokeDasharray="4 4" 
              />
              <circle cx="80" cy="70" r="6" fill="#1e293b" />
              <text x="92" y="74" fontSize="9" fontFamily="var(--font-mono)" fill="#475569">CAMERA / CV SENSOR</text>

              {/* Cattle #17 Representation */}
              <g transform="translate(230, 100)">
                <ellipse cx="40" cy="50" rx="35" ry="22" fill="#334155" />
                <ellipse cx="45" cy="46" rx="14" ry="10" fill="#ffffff" />
                <circle cx="8" cy="40" r="14" fill="#334155" />
                {/* Legs */}
                <rect x="15" y="65" width="6" height="25" fill="#1e293b" />
                <rect x="30" y="65" width="6" height="25" fill="#1e293b" />
                <rect x="50" y="65" width="6" height="25" fill="#1e293b" />
                <rect x="62" y="65" width="6" height="25" fill="#1e293b" />
                {/* IoT BLE Collar Beacon */}
                <circle cx="18" cy="42" r="5" fill={isTempHigh ? '#ef4444' : '#22c55e'} />
                {isTempHigh && (
                  <circle cx="18" cy="42" r="10" fill="none" stroke="#ef4444" strokeWidth="1">
                    <animate attributeName="r" values="5;14;5" dur="1.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0;1" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                )}
                <text x="-5" y="20" fontSize="10" fontFamily="var(--font-mono)" fontWeight="700" fill="#1e293b">
                  CATTLE #17 (HF CROSS)
                </text>
              </g>

              {/* Surrounding Herd Silhouette */}
              <g transform="translate(420, 115)" opacity="0.45">
                <ellipse cx="30" cy="40" rx="26" ry="16" fill="#64748b" />
                <circle cx="6" cy="32" r="10" fill="#64748b" />
              </g>
            </svg>

            {/* Overlay Sensor Beacons */}
            <div className={`sensor-beacon ${isTempHigh ? 'is-alert' : ''}`} style={{ top: 20, right: 20 }}>
              <Thermometer size={12} color={isTempHigh ? '#ef4444' : '#15803d'} />
              <span>IOT TEMP: {telemetry.temperature.toFixed(1)}°C</span>
            </div>

            <div className={`sensor-beacon ${isMovementLow ? 'is-alert' : ''}`} style={{ bottom: 20, left: 20 }}>
              <Activity size={12} color={isMovementLow ? '#ef4444' : '#2563eb'} />
              <span>CV GAIT: {telemetry.movement === 0 ? 'NORMAL' : `${telemetry.movement}% DEV`}</span>
            </div>
          </div>
        </div>

        {/* Live Farm Telemetry Gauges & Event Trigger */}
        <div className="tactile-panel" style={{ padding: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-main)' }}>
              LIVE TELEMETRY READINGS
            </span>

            {/* Offline-First Sync Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {offlineQueue === 'SYNCING' ? (
                <span className="status-pill status-active">SYNCING WITH CLOUD...</span>
              ) : offlineQueue === 'BUFFERED' ? (
                <span className="status-pill status-danger">OFFLINE QUEUE (1 EVENT)</span>
              ) : (
                <span className="status-pill status-success">✓ OFFLINE QUEUE SYNCED</span>
              )}
            </div>
          </div>

          {/* Sensor Gauges Grid */}
          <div className="sensor-gauges-grid">
            <div className={`gauge-card ${isTempHigh ? 'is-alert' : ''}`}>
              <div className="gauge-label">
                <Thermometer size={12} /> TEMPERATURE
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
            </div>

            <div className={`gauge-card ${isMovementLow ? 'is-alert' : ''}`}>
              <div className="gauge-label">
                <Activity size={12} /> MOVEMENT
              </div>
              <div className="gauge-value-row">
                <span className="gauge-value">{telemetry.movement === 0 ? 'NORMAL' : `${telemetry.movement}%`}</span>
              </div>
              <div className="analog-meter-track" style={{ marginTop: 4 }}>
                <div 
                  className={`analog-meter-bar ${isMovementLow ? 'bar-red' : ''}`} 
                  style={{ width: `${Math.min(100, Math.max(15, 100 - Math.abs(telemetry.movement) * 2))}%` }}
                ></div>
              </div>
            </div>

            <div className={`gauge-card ${isFeedingLow ? 'is-alert' : ''}`}>
              <div className="gauge-label">
                <Utensils size={12} /> FEEDING INTAKE
              </div>
              <div className="gauge-value-row">
                <span className="gauge-value">{telemetry.feeding === 0 ? 'NORMAL' : `${telemetry.feeding}%`}</span>
              </div>
              <div className="analog-meter-track" style={{ marginTop: 4 }}>
                <div 
                  className={`analog-meter-bar ${isFeedingLow ? 'bar-red' : ''}`} 
                  style={{ width: `${Math.min(100, Math.max(15, 100 - Math.abs(telemetry.feeding) * 2.5))}%` }}
                ></div>
              </div>
            </div>

            <div className={`gauge-card ${isLame ? 'is-alert' : ''}`}>
              <div className="gauge-label">
                <Footprints size={12} /> LAMENESS
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
            </div>
          </div>

          {/* Primary Action Button: Simulate Health Event */}
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>
              {anomalyDetected ? '• Anomaly detected in progress on Cattle #17' : '• Farm operating at standard baseline values'}
            </div>

            <button
              onClick={onSimulateAnomaly}
              disabled={anomalyDetected}
              className="tactile-btn tactile-btn-primary"
              style={{ padding: '8px 16px' }}
            >
              <Play size={13} fill="currentColor" />
              <span>{anomalyDetected ? 'EVENT IN PROGRESS...' : 'SIMULATE HEALTH EVENT'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Realistic Interactive Smartphone Mockup */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="phone-mockup-wrapper">
          {/* Top Notch Bar */}
          <div className="phone-notch-bar">
            <div className="phone-speaker"></div>
            <div className="phone-camera-dot"></div>
          </div>

          {/* Phone Screen Display */}
          <div className="phone-screen">
            {/* Status Bar */}
            <div className="phone-status-bar">
              <span>9:41</span>
              <span>📶 5G 🔋 98%</span>
            </div>

            {/* App Header */}
            <div className="phone-app-header">
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>PASHUSETU</div>
              <span style={{ fontSize: 8, fontFamily: 'var(--font-mono)', background: '#2563eb', padding: '2px 6px', borderRadius: 4 }}>
                FARMER
              </span>
            </div>

            {/* Phone Screen Content Body */}
            <div className="phone-content-body">
              {/* Farm Overview Card */}
              <div style={{ background: '#ffffff', padding: 10, borderRadius: 10, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: 9, color: '#64748b', fontWeight: 600 }}>MY FARM STATUS</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#1e293b', marginTop: 2 }}>
                  Farm #{farm.id} • {farm.farmerName}
                </div>
                <div style={{ fontSize: 10, color: '#16a34a', fontWeight: 600, marginTop: 4 }}>
                  {farmerAlertGenerated ? '⚠️ 1 Animal Flagged for Attention' : '✓ All 42 Animals Monitored'}
                </div>
              </div>

              {/* Dynamic Notification / Alert Card */}
              {!farmerAlertGenerated ? (
                <div style={{ 
                  background: '#f8fafc', 
                  border: '1px dashed #cbd5e1', 
                  borderRadius: 10, 
                  padding: 16, 
                  textAlign: 'center',
                  marginTop: 10
                }}>
                  <CheckCircle2 size={24} color="#16a34a" style={{ margin: '0 auto 6px auto' }} />
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#1e293b' }}>Herd Baseline Normal</div>
                  <div style={{ fontSize: 10, color: '#64748b', marginTop: 4 }}>
                    Automated IoT & camera sensors monitoring continuous vitals.
                  </div>
                </div>
              ) : (
                <div style={{ 
                  background: '#fef2f2', 
                  border: '1.5px solid #f87171', 
                  borderRadius: 12, 
                  padding: 12,
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.15)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#b91c1c' }}>
                    <AlertTriangle size={16} />
                    <span style={{ fontSize: 12, fontWeight: 800 }}>HEALTH ALERT</span>
                  </div>

                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginTop: 4 }}>
                    {animal.tag} Flagged
                  </div>

                  <div style={{ fontSize: 10, color: '#475569', marginTop: 4, lineHeight: 1.4 }}>
                    Unusual behaviour detected by field sensors:
                    <div style={{ marginTop: 4, fontWeight: 600, color: '#991b1b' }}>
                      • Temp: {telemetry.temperature.toFixed(1)}°C (Spike)<br />
                      • Movement: {telemetry.movement}% (Recumbent)<br />
                      • Feeding: {telemetry.feeding}% (Refusal)
                    </div>
                  </div>

                  {/* Farmer Action Buttons */}
                  {!farmerConfirmed ? (
                    <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <button
                        onClick={onConfirmAlert}
                        className="tactile-btn tactile-btn-primary"
                        style={{ width: '100%', fontSize: 11, padding: '7px 0', background: '#b91c1c', borderColor: '#991b1b' }}
                      >
                        [ CONFIRM ALERT ]
                      </button>
                      <button
                        className="tactile-btn tactile-btn-secondary"
                        style={{ width: '100%', fontSize: 10, padding: '5px 0' }}
                        onClick={() => alert('Marked as false anomaly.')}
                      >
                        [ NOT AN ISSUE ]
                      </button>
                    </div>
                  ) : (
                    <div style={{ 
                      marginTop: 10, 
                      background: '#f0fdf4', 
                      border: '1px solid #86efac', 
                      padding: 8, 
                      borderRadius: 8,
                      textAlign: 'center'
                    }}>
                      <div style={{ color: '#166534', fontWeight: 700, fontSize: 11 }}>
                        ✓ ALERT CONFIRMED
                      </div>
                      <div style={{ fontSize: 9, color: '#475569', marginTop: 2 }}>
                        Case: <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{caseId}</span> Created
                      </div>
                      <div style={{ fontSize: 9, color: '#15803d', fontWeight: 600, marginTop: 2 }}>
                        ✓ Paravet Notified & Dispatched
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Bar Home Indicator */}
            <div className="phone-home-indicator"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
