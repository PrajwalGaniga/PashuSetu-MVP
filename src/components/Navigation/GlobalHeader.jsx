import React from 'react';
import { 
  ShieldAlert, 
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div className="brand-title">
          <ShieldAlert size={22} color="#1e3a5f" strokeWidth={2.5} />
          <span>PASHUSETU</span>
        </div>
        <div style={{ borderLeft: '1.5px solid var(--border-subtle)', paddingLeft: 12, display: 'flex', flexDirection: 'column' }}>
          <span className="brand-subtitle">LIVE DISEASE INTELLIGENCE</span>
          <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            EPIDEMIC EARLY WARNING ARCHITECTURE
          </span>
        </div>
      </div>

      {/* Center Presentation Badges (Prominent & High Readability) */}
      <div className="header-status-center">
        {/* System Online Badge */}
        <div className="topbar-center" style={{ padding: '5px 10px', background: '#f0fdf4', borderRadius: 6, border: '1px solid #bbf7d0' }}>
          <span className="led-jewel led-green led-pulse"></span>
          <span className="system-online-text" style={{ fontSize: 11, fontWeight: 800, color: '#166534' }}>
            SYSTEM ONLINE
          </span>
        </div>

        {/* Current Case Badge */}
        <div className="header-case-badge">
          <span className="header-badge-label">CURRENT CASE:</span>
          <span className="header-badge-value">{caseId}</span>
        </div>

        {/* Active Role Badge */}
        <div className="header-role-badge">
          <span className="header-badge-label">ROLE:</span>
          <span className="header-role-value">{currentRole.replace('_', ' ')}</span>
        </div>

        {/* Simulation Notice Tag */}
        <div className="header-simulation-badge" title="All telemetry, scores, and data in this MVP demonstrator are simulated">
          <span className="led-jewel led-amber"></span>
          <span>SIMULATION DATA</span>
        </div>
      </div>

      {/* Global Action Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Speed Selector */}
        <div className="tactile-toggle-group" title="Adjust simulation progression speed">
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
          style={{ fontSize: 11, padding: '7px 12px', fontWeight: 700 }}
          title="Open complete 10-step end-to-end case journey"
        >
          <ListTree size={13} color="#1e3a5f" />
          <span>CASE JOURNEY</span>
        </button>

        {/* Auto Demo Play/Pause */}
        {!isAutoDemoRunning || isAutoDemoPaused ? (
          <button 
            onClick={isAutoDemoRunning && isAutoDemoPaused ? onResumeAutoDemo : onStartAutoDemo}
            className="tactile-btn tactile-btn-primary"
            style={{ fontSize: 11, padding: '7px 14px', fontWeight: 800 }}
          >
            <Play size={12} fill="currentColor" />
            <span>{isAutoDemoRunning && isAutoDemoPaused ? 'RESUME DEMO' : 'RUN AUTO DEMO'}</span>
          </button>
        ) : (
          <button 
            onClick={onPauseAutoDemo}
            className="tactile-btn tactile-btn-secondary"
            style={{ fontSize: 11, padding: '7px 14px', fontWeight: 800, color: '#b45309' }}
          >
            <Pause size={12} />
            <span>PAUSE DEMO</span>
          </button>
        )}

        {/* Reset Case */}
        <button 
          onClick={onResetCase}
          className="tactile-btn tactile-btn-secondary"
          style={{ fontSize: 11, padding: '7px 12px', fontWeight: 700 }}
          title="Reset entire workflow back to initial calm state"
        >
          <RotateCcw size={13} />
          <span>RESET</span>
        </button>
      </div>
    </header>
  );
}
