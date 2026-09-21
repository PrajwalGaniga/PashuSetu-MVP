import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRight, Check, X, HelpCircle } from 'lucide-react';
import { ROLES } from '../../engine/simulationEngine';

export function RoleWalkthroughTour({
  role,
  isOpen,
  onClose,
  sim
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState(null);

  // Reset step index whenever role changes
  useEffect(() => {
    setStepIndex(0);
  }, [role]);

  // Tour step definitions for every role
  const tourConfigs = {
    [ROLES.FARMER]: [
      {
        target: '#tour-farmer-environment',
        title: 'FARM ENVIRONMENT',
        text: 'This is the simulated livestock environment. Healthy animals are shown in green, while an abnormal animal will be highlighted when a simulated event occurs.',
        badge: 'FARMER WALKTHROUGH'
      },
      {
        target: '#tour-farmer-cv',
        title: 'CAMERA / CV',
        text: 'The Camera/CV layer represents computer-vision monitoring of livestock behavior such as movement or gait.',
        badge: 'FARMER WALKTHROUGH'
      },
      {
        target: '#tour-farmer-iot',
        title: 'IoT SENSORS',
        text: 'These small sensors represent environmental and livestock telemetry. The animated radio waves visualize simulated sensor communication.',
        badge: 'FARMER WALKTHROUGH'
      },
      {
        target: '#tour-farmer-trigger',
        title: 'SIMULATION TRIGGER',
        text: 'Use this control to generate the simulated health event. Click the real button or click NEXT to explore.',
        interactiveHint: sim?.anomalyDetected ? '✓ Anomaly event triggered' : 'Tip: You can click the real button directly!',
        badge: 'FARMER WALKTHROUGH'
      },
      {
        target: '#tour-farmer-phone',
        title: 'FARMER PHONE',
        text: 'The farmer receives the health alert here and can verify the event.',
        badge: 'FARMER WALKTHROUGH'
      },
      {
        target: '#tour-farmer-confirm',
        title: 'ALERT CONFIRMATION',
        text: 'Confirming the alert creates the case and notifies the Paravet field unit.',
        interactiveHint: sim?.farmerConfirmed ? '✓ Alert verified by farmer' : null,
        badge: 'FARMER WALKTHROUGH'
      },
      {
        target: '#tour-case-lifecycle',
        title: 'CASE LIFECYCLE',
        text: 'This timeline shows where the case currently sits in the overall response workflow.',
        badge: 'FARMER WALKTHROUGH'
      }
    ],

    [ROLES.PARAVET]: [
      {
        target: '#tour-paravet-phone',
        title: 'PARAVET PHONE',
        text: 'This is the Paravet field application. It receives verified farmer cases requiring on-site attention.',
        badge: 'PARAVET WALKTHROUGH'
      },
      {
        target: '#tour-paravet-new-case',
        title: 'NEW CASE',
        text: 'This card contains the case received from the farmer with preliminary telemetry.',
        badge: 'PARAVET WALKTHROUGH'
      },
      {
        target: '#tour-paravet-accept-btn',
        title: 'ACCEPT CASE',
        text: 'Accept the case to begin field verification.',
        interactiveHint: sim?.paravetAccepted ? '✓ Case accepted on site' : null,
        badge: 'PARAVET WALKTHROUGH'
      },
      {
        target: '#tour-paravet-evidence',
        title: 'CASE EVIDENCE',
        text: 'Review the farmer report, telemetry, and detected anomaly in the field dossier.',
        badge: 'PARAVET WALKTHROUGH'
      },
      {
        target: '#tour-paravet-verify',
        title: 'VERIFY / REPORT',
        text: 'After field verification, report the case to the veterinarian.',
        interactiveHint: sim?.paravetVerified ? '✓ Verified & escalated to vet' : null,
        badge: 'PARAVET WALKTHROUGH'
      },
      {
        target: '#tour-case-lifecycle',
        title: 'LIFECYCLE',
        text: 'Once verified, the workflow advances toward veterinary assessment.',
        badge: 'PARAVET WALKTHROUGH'
      }
    ],

    [ROLES.VETERINARIAN]: [
      {
        target: '#tour-vet-case-summary',
        title: 'CASE SUMMARY',
        text: 'This is the clinical view of the current livestock-health case with verified field notes.',
        badge: 'VETERINARIAN WALKTHROUGH'
      },
      {
        target: '#tour-vet-risk-card',
        title: 'RISK SCORE',
        text: 'The risk score represents the simulated prioritization generated from available evidence.',
        badge: 'VETERINARIAN WALKTHROUGH'
      },
      {
        target: '#tour-vet-evidence-panel',
        title: 'EVIDENCE PANEL',
        text: 'Review camera, IoT, farmer, Paravet, weather, and historical signals.',
        badge: 'VETERINARIAN WALKTHROUGH'
      },
      {
        target: '#tour-vet-map',
        title: 'MAP',
        text: 'The map provides geographic context and containment radius for the simulated case.',
        badge: 'VETERINARIAN WALKTHROUGH'
      },
      {
        target: '#tour-vet-request-btn',
        title: 'LAB REQUEST',
        text: 'The veterinarian can request laboratory investigation when further confirmation is required.',
        interactiveHint: sim?.sampleRequested ? '✓ Molecular PCR sample requested' : null,
        badge: 'VETERINARIAN WALKTHROUGH'
      },
      {
        target: '#tour-case-lifecycle',
        title: 'CASE LIFECYCLE',
        text: 'This shows the case progression from detection toward laboratory confirmation.',
        badge: 'VETERINARIAN WALKTHROUGH'
      }
    ],

    [ROLES.LAB]: [
      {
        target: '#tour-lab-case-summary',
        title: 'LAB CASE / SAMPLE',
        text: 'This is the laboratory workspace for the incoming case and cold-chain logging.',
        badge: 'LAB WALKTHROUGH'
      },
      {
        target: '#tour-lab-sample-id',
        title: 'SAMPLE ID',
        text: 'This identifier connects the physical sample to the digital case across the chain.',
        badge: 'LAB WALKTHROUGH'
      },
      {
        target: '#tour-lab-status-stepper',
        title: 'SAMPLE STATUS',
        text: 'Follow sample progression: REQUESTED → RECEIVED → PROCESSING → RESULT.',
        badge: 'LAB WALKTHROUGH'
      },
      {
        target: '#tour-lab-process-action',
        title: 'PROCESS ACTION',
        text: 'Use this action to simulate laboratory processing and automated RT-PCR testing.',
        interactiveHint: sim?.labProgress > 0 ? `✓ Assay progress: ${sim.labProgress}%` : null,
        badge: 'LAB WALKTHROUGH'
      },
      {
        target: '#tour-lab-confirm-result',
        title: 'CONFIRM RESULT',
        text: 'Confirming the result provides the ground-truth signal for the case.',
        interactiveHint: sim?.labConfirmed ? '✓ Gold-standard result confirmed' : null,
        badge: 'LAB WALKTHROUGH'
      },
      {
        target: '#tour-lab-ground-truth',
        title: 'GROUND TRUTH',
        text: 'The confirmed result is passed into the broader national surveillance workflow.',
        badge: 'LAB WALKTHROUGH'
      }
    ],

    [ROLES.GOVERNMENT]: [
      {
        target: '#tour-gov-india-map',
        title: 'INDIA SURVEILLANCE MAP',
        text: 'This map represents the national surveillance view using simulated case data across 36 Indian states.',
        badge: 'GOVERNMENT WALKTHROUGH'
      },
      {
        target: '#tour-gov-case-marker',
        title: 'CASE MARKER',
        text: 'Markers represent simulated livestock-health events across the surveillance grid.',
        badge: 'GOVERNMENT WALKTHROUGH'
      },
      {
        target: '#tour-gov-case-audit',
        title: 'CASE AUDIT',
        text: 'This panel shows the complete chain of participants involved in the current case.',
        badge: 'GOVERNMENT WALKTHROUGH'
      },
      {
        target: '#tour-gov-ground-truth',
        title: 'GROUND TRUTH',
        text: 'Laboratory-confirmed evidence becomes part of the ground-truth record.',
        badge: 'GOVERNMENT WALKTHROUGH'
      },
      {
        target: '#tour-gov-stats-grid',
        title: 'SURVEILLANCE STATUS',
        text: 'This represents how confirmed case information can feed into wider disease intelligence.',
        badge: 'GOVERNMENT WALKTHROUGH'
      },
      {
        target: '#tour-case-lifecycle',
        title: 'CASE LIFECYCLE',
        text: 'The lifecycle shows the complete journey from farm-level detection to national surveillance.',
        badge: 'GOVERNMENT WALKTHROUGH'
      }
    ]
  };

  const currentSteps = tourConfigs[role] || [];
  const currentStep = currentSteps[stepIndex] || currentSteps[0];
  const totalSteps = currentSteps.length;

  // Measure target element geometry
  const updateTargetRect = useCallback(() => {
    if (!currentStep?.target) return;
    const el = document.querySelector(currentStep.target);
    if (el) {
      const rect = el.getBoundingClientRect();
      setTargetRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        bottom: rect.bottom,
        right: rect.right
      });
    } else {
      // If target element is not in DOM (e.g. before an event triggers), fall back gracefully
      setTargetRect(null);
    }
  }, [currentStep]);

  useEffect(() => {
    if (!isOpen) return;

    // Immediate calculation + delay to ensure rendering finished
    updateTargetRect();
    const timer = setTimeout(updateTargetRect, 80);

    window.addEventListener('resize', updateTargetRect);
    window.addEventListener('scroll', updateTargetRect, true);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateTargetRect);
      window.removeEventListener('scroll', updateTargetRect, true);
    };
  }, [isOpen, stepIndex, role, updateTargetRect]);

  // Reactive advancement if user clicks a real button in the underlying app!
  useEffect(() => {
    if (!isOpen || !sim) return;

    if (role === ROLES.FARMER) {
      if (stepIndex === 3 && sim.anomalyDetected) {
        setStepIndex(4); // Advance to phone
      } else if (stepIndex === 5 && sim.farmerConfirmed) {
        setStepIndex(6); // Advance to lifecycle
      }
    } else if (role === ROLES.PARAVET) {
      if (stepIndex === 2 && sim.paravetAccepted) {
        setStepIndex(3); // Advance to evidence
      } else if (stepIndex === 4 && sim.paravetVerified) {
        setStepIndex(5); // Advance to lifecycle
      }
    } else if (role === ROLES.VETERINARIAN) {
      if (stepIndex === 4 && sim.sampleRequested) {
        setStepIndex(5); // Advance to lifecycle
      }
    } else if (role === ROLES.LAB) {
      if (stepIndex === 3 && sim.labProgress > 0) {
        setStepIndex(4); // Advance to confirm result
      } else if (stepIndex === 4 && sim.labConfirmed) {
        setStepIndex(5); // Advance to ground truth
      }
    }
  }, [isOpen, sim, role, stepIndex]);

  if (!isOpen || !currentStep || totalSteps === 0) return null;

  // Intelligent Tooltip Card Positioning
  const computeCardStyle = () => {
    const cardWidth = 360;
    const cardHeight = 180;
    const margin = 14;

    // Mobile Phone Mode (< 768px): Dock cleanly at bottom (or top if target is near bottom)
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      if (targetRect && targetRect.bottom > window.innerHeight * 0.65) {
        return {
          top: '14px',
          left: '14px',
          right: '14px',
          width: 'auto',
          maxWidth: 'calc(100vw - 28px)',
          bottom: 'auto'
        };
      }
      return {
        bottom: '14px',
        left: '14px',
        right: '14px',
        width: 'auto',
        maxWidth: 'calc(100vw - 28px)',
        top: 'auto'
      };
    }

    if (!targetRect) {
      // Center on screen if target element not found
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      };
    }

    let top = targetRect.bottom + margin;
    let left = targetRect.left;

    // Check if bottom fits
    if (top + cardHeight > window.innerHeight - 20) {
      // Place above target
      if (targetRect.top - cardHeight - margin > 20) {
        top = targetRect.top - cardHeight - margin;
      } else {
        // Fall back to side or clamp
        top = Math.max(20, Math.min(window.innerHeight - cardHeight - 20, targetRect.top));
        if (targetRect.right + cardWidth + margin < window.innerWidth) {
          left = targetRect.right + margin;
        } else {
          left = Math.max(20, targetRect.left - cardWidth - margin);
        }
      }
    }

    // Clamp horizontal position so it never overflows off-screen
    left = Math.max(16, Math.min(window.innerWidth - cardWidth - 16, left));

    return {
      top: `${top}px`,
      left: `${left}px`
    };
  };

  const handleNext = () => {
    if (stepIndex < totalSteps - 1) {
      setStepIndex(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const isFinalStep = stepIndex === totalSteps - 1;

  return (
    <>
      {/* 1. Animated Spotlight Cutout Frame (pointer-events: none lets real button receive clicks!) */}
      {targetRect && (
        <div
          className="tour-spotlight-frame"
          style={{
            top: Math.max(0, targetRect.top - 6),
            left: Math.max(0, targetRect.left - 6),
            width: targetRect.width + 12,
            height: targetRect.height + 12
          }}
        />
      )}

      {/* 2. Instructional Card Tooltip */}
      <div 
        className="tour-card"
        style={computeCardStyle()}
      >
        {/* Card Header: Role Badge + Progress */}
        <div className="tour-card-header">
          <span className="tour-role-badge">
            {currentStep.badge}
          </span>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Dot indicators */}
            <div className="tour-progress-dots">
              {currentSteps.map((_, idx) => (
                <div 
                  key={idx}
                  className={`tour-dot ${idx === stepIndex ? 'is-active' : ''} ${idx < stepIndex ? 'is-passed' : ''}`}
                />
              ))}
            </div>

            <span className="tour-step-counter">
              Step {stepIndex + 1} of {totalSteps}
            </span>
          </div>
        </div>

        {/* Step Title & Explanation */}
        <h3 className="tour-card-title">
          <HelpCircle size={15} color="#2563eb" />
          {currentStep.title}
        </h3>

        <p className="tour-card-text">
          {currentStep.text}
        </p>

        {/* Interactive real-time hint if present */}
        {currentStep.interactiveHint && (
          <div className="tour-interactive-hint">
            <Check size={13} color="#16a34a" />
            <span>{currentStep.interactiveHint}</span>
          </div>
        )}

        {/* Card Footer Actions: SKIP and NEXT/DONE */}
        <div className="tour-card-footer">
          <button 
            className="tour-skip-btn"
            onClick={onClose}
            title="Close guide and interact freely"
          >
            [ SKIP ]
          </button>

          <button 
            className="tour-next-btn"
            onClick={handleNext}
          >
            {isFinalStep ? (
              <>
                <Check size={13} />
                <span>DONE</span>
              </>
            ) : (
              <>
                <span>NEXT</span>
                <ChevronRight size={13} />
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
