import React, { useState, useEffect } from 'react';
import { Shield, ShieldAlert, Cpu, ArrowRight, CheckCircle2, ChevronRight, Activity } from 'lucide-react';

export function SimulationIntroSequence({ onComplete }) {
  const [phase, setPhase] = useState(1);
  const [isExiting, setIsExiting] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(true);

  // Automated phase progression
  useEffect(() => {
    if (!autoAdvance) return;

    const phaseDurations = {
      1: 2800, // Phase 1: THIS IS A SIMULATION
      2: 3000, // Phase 2: THE SYSTEM BEHIND THE STORY IS ALREADY BEING BUILT
      3: 3200, // Phase 3: THE SYSTEM CRASH TEAM HAS DEVELOPED THE PRODUCTION APPLICATION
      4: 3000, // Phase 4: THIS EXPERIENCE LETS YOU WALK THROUGH ITS INTENDED REAL-WORLD WORKFLOW
      5: 3200, // Phase 5: FARMER -> PARAVET -> VET -> LAB -> GOV
      6: 999999 // Phase 6: READY TO EXPLORE (Wait for click)
    };

    if (phase < 6) {
      const timer = setTimeout(() => {
        setPhase(prev => prev + 1);
      }, phaseDurations[phase] || 3000);

      return () => clearTimeout(timer);
    }
  }, [phase, autoAdvance]);

  const handleStart = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 550);
  };

  const handleSkipToStart = () => {
    setAutoAdvance(false);
    setPhase(6);
  };

  // Pipeline nodes for Phase 5
  const pipelineNodes = [
    { label: 'FARMER', role: 'Detection & Verification' },
    { label: 'PARAVET', role: 'Field Inspection' },
    { label: 'VETERINARIAN', role: 'Clinical Triage & Sampling' },
    { label: 'LABORATORY', role: 'Molecular Gold Standard' },
    { label: 'GOVERNMENT', role: 'National Surveillance' }
  ];

  return (
    <div className={`simulation-intro-overlay ${isExiting ? 'is-exiting' : ''}`}>
      {/* Background Engineering Technical Texture & Blueprint Grid */}
      <div className="simulation-intro-grid-bg"></div>

      {/* Decorative Corner Engineering Crosshairs */}
      <div className="intro-crosshair ch-tl">+ [00:00:00:01]</div>
      <div className="intro-crosshair ch-tr">PASHUSETU • ARCHITECTURE_CORE +</div>
      <div className="intro-crosshair ch-bl">+ LAT: 13.0033°N / LNG: 76.1004°E</div>
      <div className="intro-crosshair ch-br">SYSTEM CRASH CORP • 2026 +</div>

      {/* Top Header Bar */}
      <header className="simulation-intro-topbar">
        <div className="intro-brand-block">
          <div className="intro-logo-badge">
            <Shield size={18} color="#ffffff" />
          </div>
          <div>
            <div className="intro-brand-title">PASHUSETU</div>
            <div className="intro-brand-subtitle">EPIDEMIOLOGICAL SURVEILLANCE ECOSYSTEM</div>
          </div>
        </div>

        {/* Phase Stepper Pills */}
        <div className="intro-phase-indicators">
          {[1, 2, 3, 4, 5, 6].map(p => (
            <div 
              key={p} 
              className={`intro-phase-pip ${phase >= p ? 'is-reached' : ''} ${phase === p ? 'is-current' : ''}`}
              onClick={() => {
                setAutoAdvance(false);
                setPhase(p);
              }}
              title={`Jump to Phase 0${p}`}
            >
              <span>0{p}</span>
            </div>
          ))}
        </div>

        {/* Fast-forward Button */}
        {phase < 6 && (
          <button 
            className="intro-skip-button"
            onClick={handleSkipToStart}
          >
            <span>Skip to Start</span>
            <ChevronRight size={13} />
          </button>
        )}
      </header>

      {/* Central Interactive Content Display */}
      <main className="simulation-intro-stage">
        {/* PHASE 01: SIMULATION NOTICE */}
        {phase === 1 && (
          <div className="intro-phase-container intro-phase-1" key="phase1">
            <div className="intro-mode-pill">
              <span className="led-jewel led-amber led-pulse"></span>
              <span>SIMULATION MODE</span>
            </div>
            
            <div className="intro-drawn-line"></div>

            <h1 className="intro-heading-staggered">
              <span className="stagger-char" style={{ animationDelay: '0.05s' }}>T</span>
              <span className="stagger-char" style={{ animationDelay: '0.10s' }}>H</span>
              <span className="stagger-char" style={{ animationDelay: '0.15s' }}>I</span>
              <span className="stagger-char" style={{ animationDelay: '0.20s' }}>S</span>
              <span className="stagger-char" style={{ animationDelay: '0.25s' }}>&nbsp;</span>
              <span className="stagger-char" style={{ animationDelay: '0.30s' }}>I</span>
              <span className="stagger-char" style={{ animationDelay: '0.35s' }}>S</span>
              <span className="stagger-char" style={{ animationDelay: '0.40s' }}>&nbsp;</span>
              <span className="stagger-char" style={{ animationDelay: '0.45s' }}>A</span>
              <span className="stagger-char" style={{ animationDelay: '0.50s' }}>&nbsp;</span>
              <span className="stagger-char" style={{ animationDelay: '0.55s' }}>S</span>
              <span className="stagger-char" style={{ animationDelay: '0.60s' }}>I</span>
              <span className="stagger-char" style={{ animationDelay: '0.65s' }}>M</span>
              <span className="stagger-char" style={{ animationDelay: '0.70s' }}>U</span>
              <span className="stagger-char" style={{ animationDelay: '0.75s' }}>L</span>
              <span className="stagger-char" style={{ animationDelay: '0.80s' }}>A</span>
              <span className="stagger-char" style={{ animationDelay: '0.85s' }}>T</span>
              <span className="stagger-char" style={{ animationDelay: '0.90s' }}>I</span>
              <span className="stagger-char" style={{ animationDelay: '0.95s' }}>O</span>
              <span className="stagger-char" style={{ animationDelay: '1.00s' }}>N</span>
            </h1>

            <p className="intro-subtext-fade" style={{ animationDelay: '1.1s' }}>
              Interactive demonstration of the automated livestock disease response pipeline
            </p>
          </div>
        )}

        {/* PHASE 02: REAL SYSTEM EXPLANATION PART 1 */}
        {phase === 2 && (
          <div className="intro-phase-container intro-phase-2" key="phase2">
            <div className="intro-technical-badge">
              <Cpu size={13} color="#2563eb" />
              <span>SYSTEM ARCHITECTURE INTENT</span>
            </div>

            <h1 className="intro-heading-multiline">
              <span className="line-stagger" style={{ animationDelay: '0.1s' }}>
                THE SYSTEM BEHIND THE STORY
              </span>
              <span className="line-stagger highlight-blue" style={{ animationDelay: '0.4s' }}>
                IS ALREADY BEING BUILT.
              </span>
            </h1>

            <div className="intro-drawn-line" style={{ width: '120px' }}></div>

            <p className="intro-subtext-fade" style={{ animationDelay: '0.7s' }}>
              PashuSetu links edge sensor nodes, decentralized field workers, and state labs into a unified surveillance mesh.
            </p>
          </div>
        )}

        {/* PHASE 03: REAL SYSTEM EXPLANATION PART 2 */}
        {phase === 3 && (
          <div className="intro-phase-container intro-phase-3" key="phase3">
            <div className="intro-technical-badge">
              <span className="led-jewel led-green led-pulse"></span>
              <span>ENGINEERING & DEVELOPMENT TEAM</span>
            </div>

            <h1 className="intro-heading-multiline">
              <span className="line-stagger" style={{ animationDelay: '0.1s' }}>
                THE SYSTEM CRASH TEAM
              </span>
              <span className="line-stagger highlight-navy" style={{ animationDelay: '0.4s' }}>
                HAS DEVELOPED THE PRODUCTION APPLICATION.
              </span>
            </h1>

            <div className="intro-drawn-line" style={{ width: '160px' }}></div>

            <p className="intro-subtext-fade" style={{ animationDelay: '0.7s' }}>
              The real cloud infrastructure, edge computer-vision models, and laboratory LIMS integrations are active in production engineering.
            </p>
          </div>
        )}

        {/* PHASE 04: WORKFLOW DEMONSTRATOR PURPOSE */}
        {phase === 4 && (
          <div className="intro-phase-container intro-phase-4" key="phase4">
            <div className="intro-technical-badge">
              <Activity size={13} color="#2563eb" />
              <span>INTERACTIVE DEMONSTRATION PURPOSE</span>
            </div>

            <h1 className="intro-heading-multiline">
              <span className="line-stagger" style={{ animationDelay: '0.1s' }}>
                THIS EXPERIENCE LETS YOU
              </span>
              <span className="line-stagger highlight-blue" style={{ animationDelay: '0.35s' }}>
                WALK THROUGH ITS INTENDED
              </span>
              <span className="line-stagger" style={{ animationDelay: '0.6s' }}>
                REAL-WORLD WORKFLOW.
              </span>
            </h1>

            <div className="intro-drawn-line" style={{ width: '180px' }}></div>

            <p className="intro-subtext-fade" style={{ animationDelay: '0.85s' }}>
              Observe how a single bovine anomaly triggers automated triage, field verification, clinical diagnostics, and national epidemic alerts.
            </p>
          </div>
        )}

        {/* PHASE 05: THE 5-ROLE WORKFLOW PIPELINE */}
        {phase === 5 && (
          <div className="intro-phase-container intro-phase-5" key="phase5">
            <div className="intro-technical-badge">
              <span>END-TO-END MULTI-ROLE ESCALATION</span>
            </div>

            <div className="intro-pipeline-showcase">
              {pipelineNodes.map((node, index) => (
                <React.Fragment key={node.label}>
                  <div 
                    className="intro-pipeline-node"
                    style={{ animationDelay: `${0.15 + index * 0.2}s` }}
                  >
                    <div className="node-step-index">0{index + 1}</div>
                    <div className="node-label">{node.label}</div>
                    <div className="node-role-desc">{node.role}</div>
                  </div>

                  {index < pipelineNodes.length - 1 && (
                    <div 
                      className="intro-pipeline-arrow"
                      style={{ animationDelay: `${0.25 + index * 0.2}s` }}
                    >
                      <ArrowRight size={16} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="intro-drawn-line" style={{ width: '220px', marginTop: 24 }}></div>

            <p className="intro-subtext-fade" style={{ animationDelay: '1.2s' }}>
              Each stakeholder acts with real-time operational context, eliminating notification bottlenecks.
            </p>
          </div>
        )}

        {/* PHASE 06: FINAL CTA & ENTER SIMULATION */}
        {phase === 6 && (
          <div className="intro-phase-container intro-phase-6" key="phase6">
            {/* Pulsing Central PashuSetu Emblem */}
            <div className="intro-emblem-wrapper">
              <div className="intro-emblem-pulse-ring"></div>
              <div className="intro-emblem-pulse-ring ring-outer"></div>
              <div className="intro-emblem-core">
                <Shield size={36} color="#ffffff" strokeWidth={2.2} />
              </div>
            </div>

            <div className="intro-ready-tag">
              <span className="led-jewel led-green led-pulse"></span>
              <span>SIMULATION ENGINE READY</span>
            </div>

            <h1 className="intro-heading-callout">
              READY TO EXPLORE?
            </h1>

            <p className="intro-disclaimer-card">
              All displayed sensor telemetry, spatial maps, and laboratory findings are 
              <strong> simulated for demonstration purposes</strong> to illustrate the end-to-end PashuSetu operational lifecycle.
            </p>

            {/* Pulsing Primary Pill CTA */}
            <button 
              className="intro-cta-button"
              onClick={handleStart}
            >
              <span className="cta-dot-icon">◉</span>
              <span className="cta-text">START YOUR SIMULATION JOURNEY</span>
              <ArrowRight size={18} className="cta-arrow" />
            </button>

            <div className="intro-footer-hint">
              Press to launch the Farmer interface and interactive role walkthrough
            </div>
          </div>
        )}
      </main>

      {/* Footer Meta */}
      <footer className="simulation-intro-footer">
        <div>
          <span>STATUS: </span>
          <strong style={{ color: '#15803d' }}>INITIALIZED</strong>
        </div>
        <div className="intro-footer-middle">
          PashuSetu Live Prototype • Developed by System Crash
        </div>
        <div>
          <span>ENV: </span>
          <strong>SANDBOX_SIMULATION</strong>
        </div>
      </footer>
    </div>
  );
}
