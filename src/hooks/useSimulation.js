import { useState, useEffect } from 'react';
import { simulationEngine } from '../engine/simulationEngine';

export function useSimulation() {
  const [simState, setSimState] = useState(simulationEngine.stateData);

  useEffect(() => {
    // Subscribe to engine state updates
    const unsubscribe = simulationEngine.subscribe((updatedState) => {
      setSimState(updatedState);
    });

    return () => unsubscribe();
  }, []);

  return {
    ...simState,
    startSimulation: () => simulationEngine.start(),
    pauseSimulation: () => simulationEngine.pause(),
    resumeSimulation: () => simulationEngine.resume(),
    resetSimulation: () => simulationEngine.reset(),
    setSpeed: (speed) => simulationEngine.setSpeed(speed),
    transitionToState: (idx) => simulationEngine.transitionTo(idx)
  };
}
