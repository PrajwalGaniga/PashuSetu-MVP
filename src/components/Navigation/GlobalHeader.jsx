import React from 'react';
import { 
  ShieldAlert, 
  Clock, 
  Map, 
  Play, 
  Pause, 
  RotateCcw, 
  ListTree 
} from 'lucide-react';

export function GlobalHeader({
  caseId,
  currentRole,
  isAutoDemoRunning,
  isAutoDemoPaused,
  speed,
  onStartAutoDemo,
  onPauseAutoDemo,
  onResumeAutoDemo,
  onResetCase,
  onOpenCaseJourney,
  onSpeedChange
}) {
  return (
    <header className="global-header-bar">
      {/* Brand & Subtitle */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <div className="brand-title">
          <ShieldAlert size={20} color="#1e3a5f" strokeWidth={2.5} />
          <span>PASHUSETU</span>
        </div>
        <span className="brand-subtitle">LIVE DISEASE INTELLIGENCE</span>
      </div>

      {/* Center Status Indicators */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div className="topbar-center">
          <span className="led-jewel led-green led-pulse"></span>
          <span className="system-online-text">SYSTEM ONLINE</span>
        </div>

        <div className="telemetry-item">
          <span className="telemetry-label">CURRENT CASE:</span>
          <span className="telemetry-value" style={{ color: '#1e3a8a' }}>{caseId}</span>
        </div>

        <span className="status-pill status-ready" style={{ fontSize: 9 }}>
          ROLE: {currentRole.replace('_', ' ')}
        </span>

        <span className="status-pill" style={{ fontSize: 9, background: '#fef3c7', color: '#b45309', borderColor: '#fde68a' }}>
          SIMULATION DATA
        </span>
      </div>

      {/* Global Action Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Speed Selector */}
        <div className="tactile-toggle-group">
          {[0.5, 1.0, 2.0].map(s => (
            <button
              key={s}
              className={`tactile-toggle-item ${speed === s ? 'is-active' : ''}`}
              onClick={() => onSpeedChange(s)}
            >
              {s}×
            </button>
          ))}
        </div>

        {/* View Case Journey Drawer Button */}
        <button 
          onClick={onOpenCaseJourney}
          className="tactile-btn tactile-btn-secondary"
          style={{ fontSize: 10, padding: '6px 10px' }}
        >
          <ListTree size={12} color="#1e3a5f" />
          <span>CASE JOURNEY</span>
        </button>

        {/* Auto Demo Play/Pause */}
        {!isAutoDemoRunning || isAutoDemoPaused ? (
          <button 
            onClick={isAutoDemoRunning && isAutoDemoPaused ? onResumeAutoDemo : onStartAutoDemo}
            className="tactile-btn tactile-btn-primary"
            style={{ fontSize: 10, padding: '6px 12px' }}
          >
            <Play size={11} fill="currentColor" />
            <span>{isAutoDemoRunning && isAutoDemoPaused ? 'RESUME DEMO' : 'RUN AUTO DEMO'}</span>
          </button>
        ) : (
          <button 
            onClick={onPauseAutoDemo}
            className="tactile-btn tactile-btn-secondary"
            style={{ fontSize: 10, padding: '6px 12px' }}
          >
            <Pause size={11} />
            <span>PAUSE</span>
          </button>
        )}

        {/* Reset Case */}
        <button 
          onClick={onResetCase}
          className="tactile-btn tactile-btn-secondary"
          style={{ fontSize: 10, padding: '6px 10px' }}
          title="Reset entire workflow back to initial calm state"
        >
          <RotateCcw size={12} />
          <span>RESET</span>
        </button>
      </div>
    </header>
  );
}
