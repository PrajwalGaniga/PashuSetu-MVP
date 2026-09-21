import React from 'react';
import { ShieldAlert, Info, ArrowRight, CheckCircle2 } from 'lucide-react';

export function SimulationNoticeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const simulatedItems = [
    'IoT Sensor Telemetry (Temperature, Ammonia, Feeding, Movement)',
    'Computer Vision / Camera Gait & Anomaly Detections',
    'Bayesian Epidemic Risk Engine & Priority Calculations',
    'Case Records, IDs & Multi-Role Dispatch Workflows',
    'National Geographic Surveillance Map Markers & Clusters',
    'Molecular Diagnostic Laboratory RT-PCR Assay Results',
    'State & National Epidemiological Surveillance Metrics'
  ];

  return (
    <div className="simulation-modal-overlay">
      <div className="simulation-modal-card">
        {/* Top Hardware Screws for Tactile Aesthetic */}
        <span className="screw screw-tl"></span>
        <span className="screw screw-tr"></span>
        <span className="screw screw-bl"></span>
        <span className="screw screw-br"></span>

        {/* Top Header Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ 
              width: 32, 
              height: 32, 
              borderRadius: 8, 
              background: '#1e3a5f', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <ShieldAlert size={20} color="#60a5fa" strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '0.08em', color: '#111827', fontFamily: 'var(--font-sans)' }}>
                PASHUSETU
              </div>
              <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#1e3a8a', letterSpacing: '0.04em' }}>
                LIVE DISEASE INTELLIGENCE ARCHITECTURE
              </div>
            </div>
          </div>

          <div style={{ 
            background: '#fef3c7', 
            border: '1px solid #fde68a', 
            color: '#b45309', 
            borderRadius: 6, 
            padding: '3px 8px', 
            fontSize: 9, 
            fontFamily: 'var(--font-mono)', 
            fontWeight: 800,
            letterSpacing: '0.04em'
          }}>
            SIMULATION / MVP
          </div>
        </div>

        {/* Notice Title */}
        <div style={{ 
          borderBottom: '1px solid var(--border-subtle)', 
          paddingBottom: 10, 
          marginBottom: 12 
        }}>
          <h1 style={{ 
            fontSize: 16, 
            fontWeight: 800, 
            color: '#1e3a5f', 
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <Info size={16} color="#2563eb" />
            MVP SIMULATION NOTICE
          </h1>
          <p style={{ fontSize: 11, color: '#64748b', margin: '4px 0 0 0' }}>
            Please read this advisory prior to evaluating the interactive system prototype.
          </p>
        </div>

        {/* Body Text */}
        <div style={{ fontSize: 12, lineHeight: 1.6, color: '#334155', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p style={{ margin: 0 }}>
            This interface is an interactive prototype created to demonstrate the intended <strong>PashuSetu workflow, system architecture, and role-to-role case progression</strong> across the livestock health ecosystem.
          </p>
          <p style={{ margin: 0 }}>
            The data, sensor readings, risk scores, maps, case counts, notifications, and surveillance events shown in this MVP are <strong>simulated for demonstration purposes</strong>.
          </p>
          <p style={{ margin: 0 }}>
            The production PashuSetu application and underlying edge systems are being developed separately. This interface is intended to visually demonstrate how the complete end-to-end workflow operates in real-time.
          </p>
        </div>

        {/* Simulated in this MVP List */}
        <div style={{ 
          background: 'var(--bg-panel-sunken)', 
          borderRadius: 8, 
          border: '1px solid var(--border-subtle)', 
          padding: '10px 14px', 
          marginTop: 14 
        }}>
          <div style={{ 
            fontSize: 10, 
            fontFamily: 'var(--font-mono)', 
            fontWeight: 800, 
            color: '#1e3a5f', 
            letterSpacing: '0.06em', 
            marginBottom: 6 
          }}>
            SIMULATED IN THIS MVP:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {simulatedItems.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#334155' }}>
                <CheckCircle2 size={12} color="#2563eb" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Button */}
        <div style={{ marginTop: 18, display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            className="tactile-btn tactile-btn-primary"
            style={{ 
              padding: '10px 24px', 
              fontSize: 12, 
              fontWeight: 800, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8,
              boxShadow: '0 4px 12px rgba(30, 58, 95, 0.3)'
            }}
          >
            <span>ENTER PASHUSETU MVP</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
