import React from 'react';
import { 
  TestTubes, 
  Barcode, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  ShieldCheck, 
  FlaskConical, 
  Dna,
  Play
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
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 14, flex: 1, minHeight: 0, overflowY: 'auto' }}>
      {/* Left Column: Sample Intake & Queue */}
      <div className="tactile-panel" style={{ padding: 12 }}>
        <span className="screw screw-tl"></span>
        <span className="screw screw-tr"></span>
        <span className="screw screw-bl"></span>
        <span className="screw screw-br"></span>

        <div className="tactile-panel-header">
          <h2 className="tactile-panel-title">
            <TestTubes size={14} color="#1e3a5f" />
            LAB SAMPLE INTAKE
          </h2>
          <span className="status-pill status-ready" style={{ fontSize: 9 }}>MOLECULAR</span>
        </div>

        {!sampleRequested ? (
          <div style={{ padding: 28, textAlign: 'center', color: '#64748b' }}>
            <Clock size={32} style={{ margin: '0 auto 8px auto', opacity: 0.5 }} />
            <div style={{ fontSize: 13, fontWeight: 700 }}>NO ACTIVE SAMPLE REQUEST</div>
            <div style={{ fontSize: 11, marginTop: 4 }}>
              Awaiting diagnostic authorization from District Epizootiologist.
            </div>
          </div>
        ) : (
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* Tube & Barcode Card */}
            <div className="lab-sample-tube-card">
              <FlaskConical size={32} color="#a78bfa" />
              <div>
                <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>SPECIMEN BARCODE</div>
                <div className="barcode-strip">{sampleId}</div>
                <div style={{ fontSize: 9, color: '#a78bfa', marginTop: 4 }}>
                  Active Cold Chain: 4°C Verified
                </div>
              </div>
            </div>

            {/* Specimen Context Information */}
            <div style={{ background: '#f8fafc', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 11 }}>
              <div><strong>Parent Case:</strong> {caseId}</div>
              <div><strong>Subject:</strong> {animal.tag} ({animal.species})</div>
              <div><strong>Origin:</strong> Farm #{farm.id} ({farm.district})</div>
              <div><strong>Facility:</strong> {labFacility.name}</div>
            </div>

            {/* Step 1: Receive Sample Button */}
            {!labReceived ? (
              <button
                onClick={onReceiveSample}
                className="tactile-btn tactile-btn-primary"
                style={{ width: '100%', padding: '10px 0', fontSize: 12 }}
              >
                [ RECEIVE SAMPLE & VERIFY COLD CHAIN ]
              </button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#166534', fontWeight: 700, fontSize: 11, padding: 8, background: '#f0fdf4', borderRadius: 6, border: '1px solid #86efac' }}>
                <CheckCircle2 size={14} />
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
          <span className="status-pill status-ready" style={{ fontSize: 9 }}>STATUS: {labStatus}</span>
        </div>

        {!labReceived ? (
          <div style={{ padding: 32, textAlign: 'center', color: '#94a3b8', fontSize: 11 }}>
            Receive the physical biological sample in the intake queue to initialize the thermal cycler.
          </div>
        ) : (
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Assay Overview Box */}
            <div style={{ background: 'var(--bg-panel-sunken)', padding: 10, borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#1e293b' }}>
                  Multiplex Foot-and-Mouth Disease (FMDV) & Vesicular Panel
                </div>
                <span className="status-pill status-ready" style={{ fontSize: 9 }}>PCR CYCLE 34/40</span>
              </div>
              <div style={{ fontSize: 10, color: '#64748b', marginTop: 4 }}>
                Target: VP1 Capsid Gene Amplification & Complement Fixation Testing
              </div>
            </div>

            {/* Stepper Progress Indicator */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
                <span>THERMAL CYCLING & FLUORESCENCE DETECTION:</span>
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
            {labProgress < 100 ? (
              <button
                onClick={onStartTest}
                disabled={labProgress > 0}
                className="tactile-btn tactile-btn-primary"
                style={{ width: '100%', padding: '10px 0', fontSize: 12 }}
              >
                <Play size={13} fill="currentColor" />
                <span>{labProgress > 0 ? 'ANALYZING FLUORESCENCE...' : 'START RT-PCR MOLECULAR ASSAY'}</span>
              </button>
            ) : !labConfirmed ? (
              <div style={{ background: '#fef2f2', border: '1px solid #f87171', padding: 12, borderRadius: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#b91c1c' }}>
                  AMPLIFICATION CURVE POSITIVE
                </div>
                <div style={{ fontSize: 11, color: '#475569', marginTop: 4 }}>
                  High-titer nucleic isolate identified: <strong>FMDV Type O (Vesicular Stomatitis Negative)</strong>
                </div>

                <button
                  onClick={onConfirmResult}
                  className="tactile-btn tactile-btn-primary"
                  style={{ width: '100%', marginTop: 10, padding: '10px 0', fontSize: 12, background: '#15803d', borderColor: '#166534' }}
                >
                  [ CONFIRM DIAGNOSTIC RESULT & RECORD GROUND TRUTH ]
                </button>
              </div>
            ) : (
              /* Ground Truth Acquired Card */
              <div style={{ 
                background: '#f0fdf4', 
                border: '1.5px solid #86efac', 
                padding: 14, 
                borderRadius: 10,
                boxShadow: '0 4px 12px rgba(34, 197, 94, 0.15)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#15803d' }}>
                  <ShieldCheck size={20} />
                  <span style={{ fontSize: 13, fontWeight: 800 }}>GROUND TRUTH ACQUIRED & RECORDED</span>
                </div>

                <div style={{ fontSize: 11, color: '#334155', marginTop: 6, lineHeight: 1.5 }}>
                  Case <strong>{caseId}</strong> verified with gold-standard laboratory signature.
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
                  <strong>GROUND TRUTH FED INTO:</strong><br />
                  • Regional Bayesian Risk Calibration (+4% prior weight)<br />
                  • Hassan Outbreak Spatial Kernel Update<br />
                  • National Epizootic Surveillance Repository (NADRES 2.0)
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
