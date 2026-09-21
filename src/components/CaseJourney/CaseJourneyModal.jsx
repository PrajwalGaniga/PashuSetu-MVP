import React from 'react';
import { X, CheckCircle2, Clock, ShieldCheck, MapPin, Database, Activity } from 'lucide-react';

export function CaseJourneyModal({ isOpen, onClose, caseId, workflowPassed, eventLog = [] }) {
  if (!isOpen) return null;

  const milestones = [
    { key: 'farmer', title: 'Farmer Field Anomaly Detected & Verified', actor: 'Suresh Patel (Farm #KA-1023)', time: '22:31:08' },
    { key: 'paravet', title: 'Paravet Field Inspection & Physical Verification', actor: 'Ramesh Gowda (PV-841)', time: '22:31:18' },
    { key: 'veterinarian', title: 'Veterinarian Clinical Tele-Triage & Diagnostic Order', actor: 'Dr. Ananya Rao, MVSc', time: '22:31:27' },
    { key: 'laboratory', title: 'Molecular RT-PCR Ground Truth Verification', actor: 'State Diagnostic Institute', time: '22:32:41' },
    { key: 'government', title: 'National Disease Surveillance Synchronization', actor: 'Central Epizootic Registry', time: '22:32:42' },
    { key: 'groundTruth', title: 'Ground Truth Feedback Loop & Model Recalibration', actor: 'PashuSetu Intelligence Core', time: '22:32:43' }
  ];

  return (
    <div className="case-journey-modal-overlay" onClick={onClose}>
      <div className="case-journey-drawer" onClick={e => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div>
            <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#1e293b' }}>
              CASE JOURNEY: {caseId}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>
              End-to-End Livestock Disease Audit Trail
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Chronological Milestones */}
        <div className="drawer-content">
          <div style={{ 
            background: '#f8fafc', 
            padding: '8px 12px', 
            borderRadius: 6, 
            border: '1px solid #e2e8f0', 
            fontSize: 11 
          }}>
            <span style={{ fontWeight: 700, color: '#1e3a8a' }}>Subject: </span>
            <span style={{ color: '#475569' }}>Cattle #17 (Farm #KA-1023, Hassan, Karnataka)</span>
          </div>

          <div style={{ marginTop: 8 }}>
            {milestones.map((m, idx) => {
              const isPassed = workflowPassed[m.key];
              return (
                <div key={m.key} className="journey-timeline-item">
                  <div className={`journey-timeline-icon ${isPassed ? 'is-done' : ''}`}>
                    {isPassed ? <CheckCircle2 size={13} /> : <span style={{ fontSize: 9 }}>{idx + 1}</span>}
                  </div>
                  <div style={{ flex: 1, paddingBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: isPassed ? '#1e293b' : '#94a3b8' }}>
                        {m.title}
                      </span>
                      {isPassed && (
                        <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#64748b' }}>
                          [{m.time}]
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 10, color: isPassed ? '#64748b' : '#cbd5e1', marginTop: 2 }}>
                      {m.actor}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Real-time System Event Log Feed */}
          <div style={{ marginTop: 12, borderTop: '1px solid #e2e8f0', paddingTop: 10 }}>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#475569', marginBottom: 6 }}>
              SYSTEM EVENT STREAM AUDIT ({eventLog.length} EVENTS)
            </div>
            <div style={{ 
              background: '#0f172a', 
              color: '#cbd5e1', 
              fontFamily: 'var(--font-mono)', 
              fontSize: 10, 
              padding: 10, 
              borderRadius: 6, 
              maxHeight: 180, 
              overflowY: 'auto' 
            }}>
              {eventLog.map(item => (
                <div key={item.id} style={{ marginBottom: 4, lineHeight: 1.4 }}>
                  <span style={{ color: '#64748b' }}>[{item.time}]</span> {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
