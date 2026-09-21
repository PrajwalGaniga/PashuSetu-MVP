import React from 'react';
import { 
  Camera, 
  Activity, 
  UserCheck, 
  CloudRain, 
  Database, 
  ShieldCheck, 
  Landmark,
  Cpu,
  RotateCw
} from 'lucide-react';

export function IntelligenceCore({ 
  activeModules = [], 
  particlesActive = false,
  feedbackLoopFlowing = false,
  currentState
}) {
  const isCoreActive = activeModules.length > 0;

  // Node positions relative to SVG viewBox 600 x 300
  const nodes = [
    { id: 'camera', label: 'CAMERA / CV', x: 75, y: 55, icon: Camera },
    { id: 'iot', label: 'IoT SENSORS', x: 65, y: 150, icon: Activity },
    { id: 'farmer', label: 'FARMER REPORT', x: 80, y: 245, icon: UserCheck },
    { id: 'weather', label: 'WEATHER', x: 520, y: 55, icon: CloudRain },
    { id: 'outbreak', label: 'OUTBREAK HISTORY', x: 520, y: 150, icon: Database },
    { id: 'nadres', label: 'NADRES 2.0', x: 510, y: 245, icon: ShieldCheck },
    { id: 'pashudhan', label: 'BHARAT PASHUDHAN', x: 300, y: 265, icon: Landmark }
  ];

  const centerX = 300;
  const centerY = 145;

  return (
    <div className="intelligence-core-wrapper">
      <span className="screw screw-tl"></span>
      <span className="screw screw-tr"></span>
      <span className="screw screw-bl"></span>
      <span className="screw screw-br"></span>

      {/* SVG Canvas for Circuit Lines & Moving Particles */}
      <svg className="core-svg-overlay" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid meet">
        <defs>
          {/* Gradients for animated pulses */}
          <linearGradient id="packetGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.3" />
          </linearGradient>

          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Connecting circuit lines */}
        {nodes.map(node => {
          const isActive = activeModules.includes(node.id);
          return (
            <g key={node.id}>
              {/* Background trace line */}
              <line
                x1={node.x}
                y1={node.y}
                x2={centerX}
                y2={centerY}
                className={`circuit-path ${isActive && particlesActive ? 'active-path' : ''}`}
              />

              {/* Animated travelling packet particle when active */}
              {isActive && particlesActive && (
                <circle r="3.5" fill="#2563eb" filter="url(#glowFilter)">
                  <animateMotion
                    path={`M ${node.x} ${node.y} L ${centerX} ${centerY}`}
                    dur="1.2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* Large Curved Ground Truth Feedback Arc */}
        {feedbackLoopFlowing && (
          <g>
            <path
              d="M 520 220 C 580 80, 420 10, 310 80"
              fill="none"
              stroke="#15803d"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              style={{ animation: 'circuitFlow 1.2s linear infinite' }}
            />
            <circle r="4" fill="#16a34a" filter="url(#glowFilter)">
              <animateMotion
                path="M 520 220 C 580 80, 420 10, 310 80"
                dur="1.6s"
                repeatCount="indefinite"
              />
            </circle>
            <text x="350" y="32" fill="#166534" fontSize="10" fontFamily="var(--font-mono)" fontWeight="700">
              ⟲ GROUND TRUTH RECALIBRATION LOOP
            </text>
          </g>
        )}
      </svg>

      {/* Center Dial & Orbiting Modules Container */}
      <div className="core-canvas-area">
        {/* Orbiting peripheral nodes */}
        {nodes.map(node => {
          const Icon = node.icon;
          const isActive = activeModules.includes(node.id);
          return (
            <div
              key={node.id}
              className={`orbit-node ${isActive ? 'is-firing' : ''}`}
              style={{
                left: `${(node.x / 600) * 100}%`,
                top: `${(node.y / 300) * 100}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <Icon size={12} color={isActive ? '#1d4ed8' : '#64748b'} />
              <span>{node.label}</span>
              <span className={`led-jewel ${isActive ? 'led-blue led-pulse' : 'led-off'}`} style={{ width: 6, height: 6 }}></span>
            </div>
          );
        })}

        {/* Central Physical Dial / Reactor */}
        <div className={`pashusetu-core-reactor ${isCoreActive ? 'is-active' : ''}`}>
          <div className="core-inner-ring">
            <Cpu size={22} color="#60a5fa" style={{ marginBottom: 4 }} />
            <h3 className="core-title">PASHUSETU</h3>
            <span className="core-subtitle">INTELLIGENCE CORE</span>
            <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span className={`led-jewel ${isCoreActive ? 'led-green led-pulse' : 'led-amber'}`} style={{ width: 6, height: 6 }}></span>
              <span style={{ fontSize: 8, fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>
                {isCoreActive ? 'PROCESSING' : 'IDLE'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
