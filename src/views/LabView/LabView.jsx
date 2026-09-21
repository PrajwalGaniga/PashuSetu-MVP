import React from 'react';
import { 
  TestTubes, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  FlaskConical, 
  Dna, 
  Play, 
  ArrowRight, 
  Circle 
} from 'lucide-react';

export function LabView({
  caseId,
  farm,
  animal,
  sampleRequested,
  sampleId,
  labReceived,
  labProgress,
  labStatus,
  labConfirmed,
  diagnosticResult,
  labFacility,
  onReceiveSample,
  onStartTest,
  onConfirmResult
}) {
  const labSteps = [
    { label: 'REQUESTED', done: sampleRequested, active: sampleRequested && !labReceived },
    { label: 'RECEIVED', done: labReceived, active: labReceived && labProgress === 0 },
    { label: 'PROCESSING', done: labProgress === 100, active: labProgress > 0 && labProgress < 100 },
    { label: 'RESULT', done: labProgress === 100, active: labProgress === 100 && !labConfirmed },
    { label: 'CONFIRMED', done: labConfirmed, active: labConfirmed }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, minHeight: 0, overflowY: 'auto' }}>
      {/* Horizontal Laboratory Assay Pipeline Tracker */}
      <div id="tour-lab-status-stepper" style={{ 
        background: 'var(--bg-panel-sunken)', 
        border: '1px solid var(--border-subtle)', 
        borderRadius: 8, 
        padding: '8px 14px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
      }}>
        <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--text-secondary)' }}>
          ASSAY PROTOCOL PIPELINE:
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {labSteps.map((step, idx) => (
            <React.Fragment key={step.label}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 5, 
                padding: '3px 8px', 
                borderRadius: 4, 
                fontSize: 9, 
                fontFamily: 'var(--font-mono)', 
                fontWeight: 800,
                background: step.done ? '#f0fdf4' : (step.active ? '#eff6ff' : 'rgba(255,255,255,0.5)'),
                color: step.done ? '#15803d' : (step.active ? '#1d4ed8' : '#94a3b8'),
                border: step.done ? '1px solid #86efac' : (step.active ? '1px solid #93c5fd' : '1px solid #cbd5e1')
              }}>
                {step.done ? (
                  <CheckCircle2 size={11} color="#15803d" />
                ) : step.active ? (
                  <span className="led-jewel led-blue led-pulse" style={{ width: 5, height: 5 }}></span>
                ) : (
                  <Circle size={8} color="#94a3b8" />
                )}
                <span>{step.label}</span>
              </div>

              {idx < labSteps.length - 1 && (
                <ArrowRight size={10} color={step.done ? '#22c55e' : '#cbd5e1'} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#64748b' }}>
          ASSAY STATUS: <strong style={{ color: '#1e3a8a' }}>{labStatus}</strong>
        </div>
      </div>

      {/* Main Grid: Sample Intake on Left, Automated Thermal Cycler on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 12, flex: 1, minHeight: 0 }}>
        {/* Left Column: Sample Intake & Specimen Barcode Dossier */}
        <div className="tactile-panel" id="tour-lab-case-summary" style={{ padding: 12 }}>
          <span className="screw screw-tl"></span>
          <span className="screw screw-tr"></span>
          <span className="screw screw-bl"></span>
          <span className="screw screw-br"></span>

          <div className="tactile-panel-header">
            <h2 className="tactile-panel-title">
              <TestTubes size={14} color="#1e3a5f" />
              LAB SAMPLE INTAKE
            </h2>
            <span className="status-pill status-ready" style={{ fontSize: 9 }}>MOLECULAR CORE</span>
          </div>

          {!sampleRequested ? (
            <div style={{ padding: 30, textAlign: 'center', color: '#64748b' }}>
              <Clock size={32} style={{ margin: '0 auto 8px auto', opacity: 0.5 }} />
              <div style={{ fontSize: 13, fontWeight: 700 }}>AWAITING DIAGNOSTIC SAMPLE REQUEST</div>
              <div style={{ fontSize: 11, marginTop: 4 }}>
                Clinical authorization required from District Epizootiologist in Veterinarian View.
              </div>
            </div>
          ) : (
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* Tube & Barcode Card (High Visibility) */}
              <div className="lab-sample-tube-card" id="tour-lab-sample-id">
                <FlaskConical size={34} color="#a78bfa" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>SAMPLE IDENTIFIER</div>
                  <div className="barcode-strip" style={{ fontSize: 14, letterSpacing: '0.12em', margin: '2px 0' }}>
                    {sampleId}
                  </div>
                  <div style={{ fontSize: 9.5, color: '#a78bfa', marginTop: 2 }}>
                    Digital Cold Chain Verified (4°C In-Transit)
                  </div>
                </div>
              </div>

              {/* Specimen Context Information */}
              <div style={{ background: '#f8fafc', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 11 }}>
                <div><strong>Case Reference:</strong> {caseId}</div>
                <div><strong>Subject:</strong> {animal.tag} ({animal.species})</div>
                <div><strong>Holding Origin:</strong> Farm #{farm.id} ({farm.district})</div>
                <div><strong>Laboratory:</strong> {labFacility.name}</div>
              </div>

              {/* Step 1: Receive Sample Button */}
              {!labReceived ? (
                <button
                  onClick={onReceiveSample}
                  className="tactile-btn tactile-btn-primary"
                  style={{ width: '100%', padding: '10px 0', fontSize: 12, fontWeight: 800 }}
                >
                  [ RECEIVE SPECIMEN & VERIFY COLD CHAIN ]
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#166534', fontWeight: 800, fontSize: 11, padding: 8, background: '#f0fdf4', borderRadius: 6, border: '1px solid #86efac' }}>
                  <CheckCircle2 size={15} />
                  <span>✓ SPECIMEN LOGGED IN MOLECULAR REPOSITORY</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Molecular RT-PCR Diagnostic Station & Ground Truth */}
        <div className="tactile-panel" style={{ padding: 12 }}>
          <div className="tactile-panel-header">
            <h2 className="tactile-panel-title">
              <Dna size={14} color="#1e3a5f" />
              AUTOMATED REAL-TIME RT-PCR ASSAY
            </h2>
            <span className="status-pill status-ready" style={{ fontSize: 9 }}>STAGE 4 OF 5</span>
          </div>

          {!labReceived ? (
            <div style={{ padding: 36, textAlign: 'center', color: '#94a3b8', fontSize: 11 }}>
              Log specimen {sampleId} into the intake queue on the left to initialize automated thermal cycler.
            </div>
          ) : (
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Assay Overview Box */}
              <div style={{ background: 'var(--bg-panel-sunken)', padding: 10, borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#1e293b' }}>
                    Multiplex Foot-and-Mouth Disease (FMDV) Panel
                  </div>
                  <span className="status-pill status-ready" style={{ fontSize: 9 }}>THERMAL CYCLER #M-04</span>
                </div>
                <div style={{ fontSize: 10, color: '#64748b', marginTop: 4 }}>
                  Target: VP1 Capsid Gene Amplification & Microfluidic Fluorometry
                </div>
              </div>

              {/* Progress Indicator */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
                  <span>FLUORESCENCE DETECTION CYCLE:</span>
                  <span style={{ fontWeight: 800, color: labProgress === 100 ? '#15803d' : '#2563eb' }}>
                    {labProgress}% COMPLETE
                  </span>
                </div>
                <div className="analog-meter-track" style={{ height: 10 }}>
                  <div 
                    className={`analog-meter-bar ${labProgress === 100 ? 'bar-green' : 'bar-amber'}`}
                    style={{ width: `${labProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Lab Actions */}
              <div id="tour-lab-process-action">
                {labProgress < 100 ? (
                  <button
                    onClick={onStartTest}
                    disabled={labProgress > 0}
                    className="tactile-btn tactile-btn-primary"
                    style={{ width: '100%', padding: '10px 0', fontSize: 12, fontWeight: 800 }}
                  >
                    <Play size={13} fill="currentColor" />
                    <span>{labProgress > 0 ? 'ANALYZING FLUORESCENCE CURVES...' : 'START AUTOMATED RT-PCR ASSAY'}</span>
                  </button>
                ) : !labConfirmed ? (
                  <div id="tour-lab-confirm-result" style={{ background: '#fef2f2', border: '1.5px solid #f87171', padding: 12, borderRadius: 8 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: '#b91c1c' }}>
                      AMPLIFICATION CURVE POSITIVE
                    </div>
                    <div style={{ fontSize: 11, color: '#334155', marginTop: 4 }}>
                      Isolate Signature: <strong>FMDV Type O Positive (Vesicular Stomatitis Negative)</strong>
                    </div>

                    <button
                      onClick={onConfirmResult}
                      className="tactile-btn tactile-btn-primary"
                      style={{ width: '100%', marginTop: 10, padding: '10px 0', fontSize: 12, fontWeight: 800, background: '#15803d', borderColor: '#166534' }}
                    >
                      [ CONFIRM RESULT & ACQUIRE GROUND TRUTH ]
                    </button>
                  </div>
                ) : (
                  /* Ground Truth Acquired Card */
                  <div id="tour-lab-ground-truth" style={{ 
                    background: '#f0fdf4', 
                    border: '1.5px solid #86efac', 
                    padding: 14, 
                    borderRadius: 10,
                    boxShadow: '0 4px 12px rgba(34, 197, 94, 0.15)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#15803d' }}>
                      <ShieldCheck size={20} />
                      <span style={{ fontSize: 13, fontWeight: 900 }}>GROUND TRUTH ACQUIRED & VALIDATED</span>
                    </div>

                    <div style={{ fontSize: 11, color: '#334155', marginTop: 6, lineHeight: 1.5 }}>
                      Case <strong>{caseId}</strong> verified with laboratory gold-standard molecular signature.
                    </div>

                    <div style={{ 
                      marginTop: 10, 
                      background: '#ffffff', 
                      padding: 8, 
                      borderRadius: 6, 
                      border: '1px solid #bbf7d0',
                      fontSize: 10,
                      color: '#166534'
                    }}>
                      <strong>AUTOMATIC EPIDEMIOLOGICAL SYNCHRONIZATION:</strong><br />
                      • State & National Surveillance Grid Updated<br />
                      • Karnataka Hassan Outbreak Cluster Synchronized<br />
                      • Bayesian Epidemiological Priors Recalibrated
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
