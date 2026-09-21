import React from 'react';
import { JOURNEY_STEPS } from '../../data/simulationData';

export function CaseJourney({ currentJourneyNode }) {
  const stepOrder = ['REPORTED', 'TRIAGED', 'ESCALATED', 'SAMPLED', 'CONFIRMED', 'SURVEILLANCE'];
  const currentIndex = stepOrder.indexOf(currentJourneyNode);

  return (
    <div className="case-journey-stepper">
      {JOURNEY_STEPS.map((step, idx) => {
        const isActive = step.id === currentJourneyNode;
        const isPassed = currentIndex > idx;
        const isConnectorFilled = currentIndex > idx;
        const isConnectorPulse = currentIndex === idx;

        return (
          <div key={step.id} className="stepper-node-wrapper">
            <div className={`stepper-node ${isActive ? 'is-active' : (isPassed ? 'is-passed' : '')}`}>
              <span 
                className={`led-jewel ${
                  isActive ? 'led-blue led-pulse' : (isPassed ? 'led-green' : 'led-off')
                }`}
                style={{ width: 8, height: 8 }}
              ></span>
              <span>{step.label}</span>
            </div>

            {idx < JOURNEY_STEPS.length - 1 && (
              <div 
                className={`stepper-connector ${
                  isConnectorFilled ? 'is-filled' : (isConnectorPulse ? 'is-active-pulse' : '')
                }`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
