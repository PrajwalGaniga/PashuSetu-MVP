import React from 'react';
import { 
  Thermometer, 
  Wind, 
  Activity, 
  Footprints, 
  Utensils, 
  Eye, 
  Wifi, 
  UserCheck, 
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { FARM_METADATA, ANIMAL_METADATA } from '../../data/simulationData';

export function FieldMonitoring({
  temperature,
  movement,
  feeding,
  ammonia,
  airQuality,
  lameness,
  cameraStatus,
  iotStatus,
  farmerStatus
}) {
  const isTempElevated = temperature >= 38.0;
  const isMovementAbnormal = movement <= -20;
  const isFeedingAbnormal = feeding <= -15;
  const isLamenessDetected = lameness === 'DETECTED';

  const getSourceBadge = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return <span className="status-pill status-success">● CONFIRMED</span>;
      case 'DETECTED':
        return <span className="status-pill status-danger">● DETECTED</span>;
      case 'ANALYZING':
        return <span className="status-pill status-active">● ANALYZING</span>;
      default:
        return <span className="status-pill status-ready">● READY</span>;
    }
  };

  return (
    <div className="tactile-panel panel-field-signals">
      <span className="screw screw-tl"></span>
      <span className="screw screw-tr"></span>
      <span className="screw screw-bl"></span>
      <span className="screw screw-br"></span>

      {/* Header */}
      <div className="tactile-panel-header">
        <h2 className="tactile-panel-title">
          <Activity size={14} color="#1e3a5f" />
          FIELD MONITORING
        </h2>
        <span className="tactile-panel-subtitle">FARM #{FARM_METADATA.id}</span>
      </div>

      {/* Farm & Animal Card Banner */}
      <div className="farm-badge-banner">
        <div>
          <div className="farm-badge-title">{FARM_METADATA.district}</div>
          <div className="farm-badge-sub">COORDINATES: 13.00° N, 76.10° E • HERD: 42</div>
        </div>
        <div className="animal-tag">
          {ANIMAL_METADATA.tag}
        </div>
      </div>

      {/* Live Sensor Telemetry Gauges */}
      <div className="sensor-gauges-grid">
        {/* Temperature Gauge */}
        <div className={`gauge-card ${isTempElevated ? 'is-alert' : ''}`}>
          <div className="gauge-label" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Thermometer size={12} color={isTempElevated ? '#ef4444' : '#64748b'} />
            TEMPERATURE
          </div>
          <div className="gauge-value-row">
            <span className="gauge-value">{temperature.toFixed(1)}</span>
            <span className="gauge-unit">°C</span>
          </div>
          <div className="analog-meter-track" style={{ marginTop: 6 }}>
            <div 
              className={`analog-meter-bar ${isTempElevated ? 'bar-red' : 'bar-green'}`}
              style={{ width: `${Math.min(100, Math.max(10, ((temperature - 36.5) / 3.0) * 100))}%` }}
            ></div>
          </div>
        </div>

        {/* Movement Gauge */}
        <div className={`gauge-card ${isMovementAbnormal ? 'is-alert' : ''}`}>
          <div className="gauge-label" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Activity size={12} color={isMovementAbnormal ? '#ef4444' : '#64748b'} />
            MOVEMENT
          </div>
          <div className="gauge-value-row">
            <span className="gauge-value">{movement === 0 ? 'NORMAL' : `${movement}%`}</span>
            {movement !== 0 && <span className="gauge-unit">DEV</span>}
          </div>
          <div className="analog-meter-track" style={{ marginTop: 6 }}>
            <div 
              className={`analog-meter-bar ${isMovementAbnormal ? 'bar-red' : ''}`}
              style={{ width: `${Math.min(100, Math.max(15, 100 - Math.abs(movement) * 2))}%` }}
            ></div>
          </div>
        </div>

        {/* Feeding Gauge */}
        <div className={`gauge-card ${isFeedingAbnormal ? 'is-alert' : ''}`}>
          <div className="gauge-label" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Utensils size={12} color={isFeedingAbnormal ? '#ef4444' : '#64748b'} />
            FEEDING
          </div>
          <div className="gauge-value-row">
            <span className="gauge-value">{feeding === 0 ? 'NORMAL' : `${feeding}%`}</span>
            {feeding !== 0 && <span className="gauge-unit">INTAKE</span>}
          </div>
          <div className="analog-meter-track" style={{ marginTop: 6 }}>
            <div 
              className={`analog-meter-bar ${isFeedingAbnormal ? 'bar-red' : ''}`}
              style={{ width: `${Math.min(100, Math.max(15, 100 - Math.abs(feeding) * 2.5))}%` }}
            ></div>
          </div>
        </div>

        {/* Lameness Gauge */}
        <div className={`gauge-card ${isLamenessDetected ? 'is-alert' : ''}`}>
          <div className="gauge-label" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Footprints size={12} color={isLamenessDetected ? '#ef4444' : '#64748b'} />
            LAMENESS
          </div>
          <div className="gauge-value-row">
            <span className="gauge-value" style={{ fontSize: isLamenessDetected ? 12 : 13 }}>
              {lameness}
            </span>
            {isLamenessDetected && <AlertTriangle size={12} color="#ef4444" />}
          </div>
          <div className="analog-meter-track" style={{ marginTop: 6 }}>
            <div 
              className={`analog-meter-bar ${isLamenessDetected ? 'bar-red' : 'bar-green'}`}
              style={{ width: isLamenessDetected ? '100%' : '15%' }}
            ></div>
          </div>
        </div>

        {/* Ammonia */}
        <div className="gauge-card">
          <div className="gauge-label" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Wind size={12} color="#64748b" />
            AMMONIA
          </div>
          <div className="gauge-value-row">
            <span className="gauge-value">{ammonia}</span>
            <span className="gauge-unit">ppm</span>
          </div>
          <div className="analog-meter-track" style={{ marginTop: 6 }}>
            <div className="analog-meter-bar bar-green" style={{ width: '35%' }}></div>
          </div>
        </div>

        {/* Air Quality */}
        <div className="gauge-card">
          <div className="gauge-label" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Wind size={12} color="#64748b" />
            AIR QUALITY
          </div>
          <div className="gauge-value-row">
            <span className="gauge-value">{airQuality}</span>
            <span className="gauge-unit">%</span>
          </div>
          <div className="analog-meter-track" style={{ marginTop: 6 }}>
            <div className="analog-meter-bar bar-green" style={{ width: '45%' }}></div>
          </div>
        </div>
      </div>

      {/* Signal Sources Block */}
      <div style={{ marginTop: 6 }}>
        <div style={{ 
          fontSize: 10, 
          fontFamily: 'var(--font-mono)', 
          fontWeight: 700, 
          color: 'var(--text-muted)', 
          letterSpacing: '0.08em',
          marginBottom: 6 
        }}>
          MULTIMODAL SIGNAL SOURCES
        </div>

        <div className="signal-sources-block">
          <div className="source-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Eye size={13} color="#475569" />
              <span className="source-name">CAMERA / CV</span>
            </div>
            {getSourceBadge(cameraStatus)}
          </div>

          <div className="source-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Wifi size={13} color="#475569" />
              <span className="source-name">IoT SENSORS</span>
            </div>
            {getSourceBadge(iotStatus)}
          </div>

          <div className="source-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <UserCheck size={13} color="#475569" />
              <span className="source-name">FARMER REPORT</span>
            </div>
            {getSourceBadge(farmerStatus)}
          </div>
        </div>
      </div>
    </div>
  );
}
