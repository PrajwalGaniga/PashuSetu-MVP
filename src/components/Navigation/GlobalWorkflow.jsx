import React from 'react';
import { Check, ArrowRight, User, Activity, Stethoscope, TestTubes, Building2 } from 'lucide-react';
import { ROLES } from '../../engine/simulationEngine';

export function GlobalWorkflow({ currentRole, currentStage, workflowPassed, onSelectRole }) {
  const steps = [
    { 
      role: ROLES.FARMER, 
      key: 'farmer', 
      stepNum: 1, 
      label: 'FARMER', 
      sublabel: 'Field Sensing',
      icon: User 
    },
    { 
      role: ROLES.PARAVET, 
      key: 'paravet', 
      stepNum: 2, 
      label: 'PARAVET', 
      sublabel: 'On-Site Verification',
      icon: Activity 
    },
    { 
      role: ROLES.VETERINARIAN, 
      key: 'veterinarian', 
      stepNum: 3, 
      label: 'VETERINARIAN', 
      sublabel: 'Clinical Triage',
      icon: Stethoscope 
    },
    { 
      role: ROLES.LAB, 
      key: 'laboratory', 
      stepNum: 4, 
      label: 'LABORATORY', 
      sublabel: 'RT-PCR Ground Truth',
      icon: TestTubes 
    },
    { 
      role: ROLES.GOVERNMENT, 
      key: 'government', 
      stepNum: 5, 
      label: 'GOVERNMENT', 
      sublabel: 'National Grid Surveillance',
      icon: Building2 
    }
  ];

  return (
    <nav className="global-workflow-bar" aria-label="Ecosystem Role Progression">
      <div className="workflow-title-label">
        <span className="workflow-prefix">CASE WORKFLOW</span>
        <span className="workflow-subprefix">5-STAGE ECOSYSTEM</span>
      </div>

      <div className="workflow-pill-row">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isPassed = workflowPassed[step.key];
          const isActive = currentRole === step.role;

          let statusState = 'WAITING';
          if (isActive) statusState = 'ACTIVE';
          else if (isPassed) statusState = 'COMPLETED';

          return (
            <React.Fragment key={step.role}>
              <button
                onClick={() => onSelectRole(step.role)}
                className={`role-step-pill-large ${isActive ? 'is-active' : (isPassed ? 'is-completed' : 'is-waiting')}`}
                title={`Switch view to ${step.label} (${statusState})`}
              >
                {/* Status Indicator Icon or Number */}
                <div className="role-pill-icon-box">
                  {isPassed ? (
                    <Check size={13} strokeWidth={3.5} color="#15803d" />
                  ) : isActive ? (
                    <span className="pill-active-pulse"></span>
                  ) : (
                    <span className="pill-step-number">{step.stepNum}</span>
                  )}
                </div>

                {/* Role Identity & Status Badge */}
                <div className="role-pill-content">
                  <div className="role-pill-heading">
                    <Icon size={13} className="role-pill-svg" />
                    <span className="role-pill-name">{step.stepNum}. {step.label}</span>
                  </div>
                  
                  <div className="role-pill-status-tag">
                    {isPassed ? (
                      <span className="status-tag tag-completed">✓ COMPLETED</span>
                    ) : isActive ? (
                      <span className="status-tag tag-active">● ACTIVE ROLE</span>
                    ) : (
                      <span className="status-tag tag-waiting">○ WAITING</span>
                    )}
                  </div>
                </div>
              </button>

              {idx < steps.length - 1 && (
                <div className={`workflow-arrow-divider ${isPassed ? 'is-passed' : ''}`}>
                  <ArrowRight size={14} strokeWidth={2.5} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="workflow-stage-meta">
        <span className="stage-meta-label">CURRENT PIPELINE STAGE:</span>
        <span className="stage-meta-value">{currentStage}</span>
      </div>
    </nav>
  );
}
