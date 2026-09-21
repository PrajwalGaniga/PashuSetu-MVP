import React from 'react';
import { ShieldAlert, AlertOctagon, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { DECISION_TRACE_ITEMS } from '../../data/simulationData';

export function RiskEngine({
  riskScore = 0,
  priority = 'NORMAL',
  hardRuleTriggered = false,
  activeTraces = []
}) {
  const [expanded, setExpanded] = React.useState(true);

  const isHighRisk = riskScore >= 70;
  const isElevated = riskScore >= 35 && riskScore < 70;

  const getPriorityStyle = () => {
    if (priority === 'PRIORITY 01' || priority === 'CRITICAL') {
      return { background: '#7f1d1d', color: '#fecaca', border: '1px solid #b91c1c' };
    }
    if (priority === 'HIGH') {
      return { background: '#78350f', color: '#fef3c7', border: '1px solid #d97706' };
    }
    if (priority === 'ELEVATED') {
      return { background: '#1e3a8a', color: '#dbeafe', border: '1px solid #3b82f6' };
    }
    return { background: '#1f2937', color: '#9ca3af', border: '1px solid #374151' };
  };

  return (
    <div className="risk-engine-row">
      {/* Left: Risk Score & Priority Meter */}
      <div className="risk-score-display">
        <span style={{ 
          fontSize: 9, 
          fontFamily: 'var(--font-mono)', 
          fontWeight: 700, 
          color: '#94a3b8', 
          letterSpacing: '0.08em' 
        }}>
          RISK ENGINE
        </span>

        <div className={`risk-score-num ${isHighRisk ? 'high-risk' : ''}`} style={{ margin: '4px 0' }}>
          {riskScore.toString().padStart(2, '0')}
          <span style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}> / 100</span>
        </div>

        <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: isHighRisk ? '#f87171' : (isElevated ? '#fbbf24' : '#34d399'), fontWeight: 700 }}>
          {isHighRisk ? 'HIGH RISK' : (isElevated ? 'ELEVATED RISK' : 'BASELINE RISK')}
        </div>

        <div className="risk-priority-tag" style={getPriorityStyle()}>
          {priority}
        </div>
      </div>

      {/* Right: Decision Trace & Rule Trigger */}
      <div className="decision-trace-container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Layers size={12} color="#475569" />
            <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-main)' }}>
              DECISION TRACE
            </span>
          </div>
          <button 
            onClick={() => setExpanded(!expanded)} 
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              color: '#64748b'
            }}
          >
            {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
        </div>

        {expanded && (
          <div className="trace-items-grid">
            {DECISION_TRACE_ITEMS.map(item => {
              const isActive = activeTraces.includes(item.id);
              return (
                <div key={item.id} className={`trace-item ${isActive ? 'is-active' : ''}`}>
                  <span style={{ color: isActive ? '#1e293b' : '#94a3b8' }}>{item.label}</span>
                  <span className="trace-points" style={{ color: isActive ? '#b45309' : '#cbd5e1' }}>
                    {item.points}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {hardRuleTriggered ? (
          <div className="rule-triggered-badge">
            <AlertOctagon size={13} color="#b91c1c" />
            <span>HARD ESCALATION RULE TRIGGERED: Acute Febrile Protocol</span>
          </div>
        ) : (
          <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#64748b', marginTop: 4 }}>
            ● Bayesian multi-factor weighted signal synthesis active
          </div>
        )}
      </div>
    </div>
  );
}
