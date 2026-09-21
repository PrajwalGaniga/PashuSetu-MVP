import React, { useState, useEffect } from 'react';
import { ShieldAlert, Radio, Activity, Clock } from 'lucide-react';

export function TopBar({ isRunning, isPaused, caseId }) {
  const [timeString, setTimeString] = useState('22:31:00 IST');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const h = d.getHours().toString().padStart(2, '0');
      const m = d.getMinutes().toString().padStart(2, '0');
      const s = d.getSeconds().toString().padStart(2, '0');
      setTimeString(`${h}:${m}:${s} IST`);
    };
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="console-topbar">
      <div className="topbar-branding">
        <div className="brand-title">
          <ShieldAlert size={20} color="#1e3a5f" strokeWidth={2.5} />
          <span>PASHUSETU</span>
        </div>
        <span className="brand-subtitle">LIVE DISEASE INTELLIGENCE</span>
      </div>

      <div className="topbar-center">
        <span className="led-jewel led-green led-pulse"></span>
        <span className="system-online-text">● SYSTEM ONLINE</span>
      </div>

      <div className="topbar-telemetry">
        <div className="telemetry-item">
          <span className="telemetry-label">CASE ID:</span>
          <span className="telemetry-value">{caseId || 'PS-2026-00421'}</span>
        </div>

        <div className="telemetry-item">
          <Clock size={12} color="#64748b" />
          <span className="telemetry-value">{timeString}</span>
        </div>

        <div className="telemetry-item" style={{ marginLeft: 6 }}>
          <span className={`led-jewel ${isRunning ? (isPaused ? 'led-amber' : 'led-blue led-pulse') : 'led-off'}`}></span>
          <span className="status-pill status-ready" style={{ fontSize: 9, padding: '2px 7px' }}>
            {isRunning ? (isPaused ? 'PAUSED' : 'LIVE SIMULATION') : 'STANDBY'}
          </span>
        </div>
      </div>
    </header>
  );
}
