import React from 'react';
import { 
  Truck, 
  CheckCircle2, 
  CheckSquare, 
  Square, 
  Clock 
} from 'lucide-react';

export function ParavetPhone({
  caseId,
  farm,
  animal,
  telemetry,
  farmerConfirmed,
  _paravetAssigned,
  paravetAccepted,
  paravetChecklist,
  paravetVerified,
  paravetOfficer,
  onAcceptCase,
  onToggleChecklist,
  onVerifyReport
}) {
  return (
    <div className="phone-mockup-wrapper" id="tour-paravet-phone">
      {/* Phone Notch Bar */}
      <div className="phone-notch-bar">
        <div className="phone-speaker"></div>
        <div className="phone-camera-dot"></div>
      </div>

      {/* Phone Screen Display */}
      <div className="phone-screen">
        {/* Status Bar */}
        <div className="phone-status-bar">
          <span>09:44</span>
          <span>📶 5G 🔋 94%</span>
        </div>

        {/* Paravet Mobile Header */}
        <div className="phone-app-header" style={{ background: '#1e3a5f' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.08em' }}>PASHUSETU</div>
            <div style={{ fontSize: 8, opacity: 0.8 }}>PARAVET FIELD OPERATIONS</div>
          </div>
          <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', background: '#16a34a', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
            FIELD AGENT
          </span>
        </div>

        {/* Mobile App Body */}
        <div className="phone-content-body">
          {/* Paravet Officer Identification Card */}
          <div style={{ background: '#ffffff', borderRadius: 8, padding: 8, border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3730a3', fontWeight: 800, fontSize: 11 }}>
                RG
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#1e293b' }}>{paravetOfficer.name}</div>
                <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#64748b' }}>ID: {paravetOfficer.id}</div>
              </div>
            </div>
            <span className="status-pill status-ready" style={{ fontSize: 8 }}>DISPATCH UNIT 4</span>
          </div>

          {!farmerConfirmed ? (
            <div style={{ padding: 30, textAlign: 'center', color: '#64748b' }}>
              <Clock size={32} style={{ margin: '0 auto 8px auto', opacity: 0.5 }} />
              <div style={{ fontSize: 12, fontWeight: 700 }}>NO FIELD DISPATCHES</div>
              <div style={{ fontSize: 10, marginTop: 4 }}>
                Waiting for farmer anomaly verification on Farm #{farm.id}.
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* Active Case Notification Banner */}
              <div id="tour-paravet-new-case" style={{ background: '#fef2f2', border: '1.5px solid #ef4444', borderRadius: 8, padding: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 10, fontWeight: 900, color: '#b91c1c' }}>NEW FIELD CASE</span>
                  <span style={{ fontSize: 8, background: '#ef4444', color: '#ffffff', padding: '1px 5px', borderRadius: 3, fontWeight: 700 }}>
                    HIGH PRIORITY
                  </span>
                </div>

                <div style={{ fontSize: 12, fontWeight: 900, color: '#1e293b', marginTop: 4 }}>
                  {caseId}
                </div>
                <div style={{ fontSize: 9, color: '#64748b' }}>
                  Holding: <strong>{farm.id}</strong> ({farm.district})
                </div>
                <div style={{ fontSize: 9, color: '#64748b' }}>
                  Subject: <strong>{animal.tag}</strong> ({animal.breed})
                </div>

                {/* Farmer Observations */}
                <div style={{ marginTop: 6, background: '#ffffff', borderRadius: 6, padding: 6, border: '1px solid #fecaca', fontSize: 9 }}>
                  <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 2 }}>Farmer Report:</div>
                  <div>• Movement: <strong style={{ color: '#b91c1c' }}>{telemetry.movement}%</strong></div>
                  <div>• Feeding: <strong style={{ color: '#b91c1c' }}>{telemetry.feeding}%</strong></div>
                  <div>• Lameness: <strong style={{ color: '#b91c1c' }}>{telemetry.lameness}</strong></div>
                </div>
              </div>

              {/* Step 1: Accept Dispatch */}
              {!paravetAccepted ? (
                <div id="tour-paravet-accept-btn">
                  <button
                    onClick={onAcceptCase}
                    className="tactile-btn tactile-btn-primary"
                    style={{ width: '100%', padding: '10px 0', fontSize: 11, fontWeight: 800 }}
                  >
                    <Truck size={13} />
                    <span>[ ACCEPT CASE DISPATCH ]</span>
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {/* On-Site Status Indicator */}
                  <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 6, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <CheckCircle2 size={13} color="#16a34a" />
                    <span style={{ fontSize: 10, fontWeight: 800, color: '#166534' }}>
                      ON-SITE AT FARM #{farm.id}
                    </span>
                  </div>

                  {/* Field Verification Checklist Inside Phone */}
                  <div style={{ background: '#ffffff', borderRadius: 8, padding: 8, border: '1px solid #cbd5e1' }}>
                    <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#1e3a5f', marginBottom: 6 }}>
                      PHYSICAL TRIAGE CHECKLIST:
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      <div 
                        onClick={() => onToggleChecklist('animalIdentified')}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 9.5, cursor: 'pointer' }}
                      >
                        {paravetChecklist.animalIdentified ? (
                          <CheckSquare size={13} color="#15803d" />
                        ) : (
                          <Square size={13} color="#94a3b8" />
                        )}
                        <span>Confirm ear tag: <strong>{animal.tag}</strong></span>
                      </div>

                      <div 
                        onClick={() => onToggleChecklist('farmerReportReviewed')}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 9.5, cursor: 'pointer' }}
                      >
                        {paravetChecklist.farmerReportReviewed ? (
                          <CheckSquare size={13} color="#15803d" />
                        ) : (
                          <Square size={13} color="#94a3b8" />
                        )}
                        <span>Review farmer feeding log</span>
                      </div>

                      <div 
                        onClick={() => onToggleChecklist('symptomsVerified')}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 9.5, cursor: 'pointer' }}
                      >
                        {paravetChecklist.symptomsVerified ? (
                          <CheckSquare size={13} color="#15803d" />
                        ) : (
                          <Square size={13} color="#94a3b8" />
                        )}
                        <span>Verify pyrexia & lameness</span>
                      </div>

                      <div 
                        onClick={() => onToggleChecklist('observationsRecorded')}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 9.5, cursor: 'pointer' }}
                      >
                        {paravetChecklist.observationsRecorded ? (
                          <CheckSquare size={13} color="#15803d" />
                        ) : (
                          <Square size={13} color="#94a3b8" />
                        )}
                        <span>Record digital vital signs</span>
                      </div>
                    </div>
                  </div>

                  {/* Verification Button */}
                  <div id="tour-paravet-verify">
                    {!paravetVerified ? (
                      <button
                        onClick={onVerifyReport}
                        className="tactile-btn tactile-btn-primary"
                        style={{ width: '100%', padding: '9px 0', fontSize: 11, fontWeight: 800 }}
                      >
                        [ VERIFY & REPORT TO VET ]
                      </button>
                    ) : (
                      <div style={{ background: '#eff6ff', border: '1.5px solid #93c5fd', borderRadius: 8, padding: 8, textAlign: 'center' }}>
                        <div style={{ color: '#1d4ed8', fontWeight: 800, fontSize: 11 }}>
                          ✓ REPORT VERIFIED & ESCALATED
                        </div>
                        <div style={{ fontSize: 9, color: '#475569', marginTop: 2 }}>
                          Veterinarian Dr. Ananya Rao notified.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Home Indicator */}
        <div className="phone-home-indicator"></div>
      </div>
    </div>
  );
}
