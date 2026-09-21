import React from 'react';
import { Check, ArrowRight, User, Activity, Stethoscope, TestTubes, Building2 } from 'lucide-react';
import { ROLES, CASE_WORKFLOW_STEPS } from '../../engine/simulationEngine';

export function GlobalWorkflow({ currentRole, currentStage, workflowPassed, onSelectRole }) {
  const steps = [
    { role: ROLES.FARMER, key: 'farmer', label: '1. FARMER', icon: User },
    { role: ROLES.PARAVET, key: 'paravet', label: '2. PARAVET', icon: Activity },
    { role: ROLES.VETERINARIAN, key: 'veterinarian', label: '3. VET', icon: Stethoscope },
    { role: ROLES.LAB, key: 'laboratory', label: '4. LAB', icon: TestTubes },
    { role: ROLES.GOVERNMENT, key: 'government', label: '5. GOVT', icon: Building2 }
  ];

  return (
    <div className="global-workflow-bar">
      <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-muted)' }}>
        CASE WORKFLOW:
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, justifyContent: 'center' }}>
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isPassed = workflowPassed[step.key];
          const isActive = currentRole === step.role;

          return (
            <React.Fragment key={step.role}>
              <button
                onClick={() => onSelectRole(step.role)}
                className={`role-step-pill ${isActive ? 'is-active' : (isPassed ? 'is-completed' : '')}`}
              >
                {isPassed ? (
                  <Check size={11} color="#15803d" strokeWidth={3} />
                ) : (
                  <Icon size={11} color={isActive ? '#1e3a8a' : '#64748b'} />
                )}
                <span>{step.label}</span>
                {isActive && <span className="led-jewel led-blue led-pulse" style={{ width: 5, height: 5 }}></span>}
              </button>

              {idx < steps.length - 1 && (
                <ArrowRight size={10} color={isPassed ? '#22c55e' : '#cbd5e1'} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#64748b' }}>
        STAGE: <span style={{ fontWeight: 700, color: '#1e3a8a' }}>{currentStage}</span>
      </div>
    </div>
  );
}
