import { useState, useEffect } from 'react';
import { unifiedSimulationEngine } from '../engine/simulationEngine';

export function useSimulation() {
  const [state, setState] = useState(unifiedSimulationEngine.stateData);

  useEffect(() => {
    const unsubscribe = unifiedSimulationEngine.subscribe((updated) => {
      setState(updated);
    });
    return () => unsubscribe();
  }, []);

  return {
    ...state,
    // Navigation
    setRole: (role) => unifiedSimulationEngine.setRole(role),
    toggleCaseJourney: (open) => unifiedSimulationEngine.toggleCaseJourney(open),
    setSpeed: (speed) => unifiedSimulationEngine.setSpeed(speed),

    // Manual Actions
    simulateAnomaly: () => unifiedSimulationEngine.simulateAnomaly(),
    confirmFarmerAlert: () => unifiedSimulationEngine.confirmFarmerAlert(),
    acceptParavetCase: () => unifiedSimulationEngine.acceptParavetCase(),
    toggleParavetChecklist: (key) => unifiedSimulationEngine.toggleParavetChecklist(key),
    verifyParavetReport: () => unifiedSimulationEngine.verifyParavetReport(),
    requestLabSample: () => unifiedSimulationEngine.requestLabSample(),
    receiveLabSample: () => unifiedSimulationEngine.receiveLabSample(),
    startLabTest: () => unifiedSimulationEngine.startLabTest(),
    confirmLabResult: () => unifiedSimulationEngine.confirmLabResult(),

    // Auto Demo & Reset
    startAutoDemo: () => unifiedSimulationEngine.startAutoDemo(),
    pauseAutoDemo: () => unifiedSimulationEngine.pauseAutoDemo(),
    resumeAutoDemo: () => unifiedSimulationEngine.resumeAutoDemo(),
    resetCase: () => unifiedSimulationEngine.resetCase()
  };
}
