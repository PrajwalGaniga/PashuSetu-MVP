import React from 'react';
import { useSimulation } from '../hooks/useSimulation';
import { TopBar } from '../components/TopBar/TopBar';
import { FieldMonitoring } from '../components/FieldMonitoring/FieldMonitoring';
import { IntelligenceCore } from '../components/IntelligenceCore/IntelligenceCore';
import { RiskEngine } from '../components/RiskEngine/RiskEngine';
import { WorkflowBays } from '../components/WorkflowBays/WorkflowBays';
import { EventStream } from '../components/EventStream/EventStream';
import { CaseJourney } from '../components/CaseJourney/CaseJourney';
import { SimulationControls } from '../components/SimulationControls/SimulationControls';

export function LiveCaseSimulation() {
  const {
    currentState,
    journeyNode,
    speed,
    isRunning,
    isPaused,
    caseId,
    temperature,
    movement,
    feeding,
    ammonia,
    airQuality,
    lameness,
    cameraStatus,
    iotStatus,
    farmerStatus,
    riskScore,
    priority,
    hardRuleTriggered,
    activeTraces,
    activeModules,
    particlesActive,
    farmerVerified,
    offlineQueueSynced,
    caseCreated,
    paravetStatus,
    vetStatus,
    labStatus,
    labProgress,
    feedbackLoopFlowing,
    eventLog,
    startSimulation,
    pauseSimulation,
    resumeSimulation,
    resetSimulation,
    setSpeed
  } = useSimulation();

  return (
    <div className="console-viewport">
      {/* Top Bar */}
      <TopBar 
        isRunning={isRunning} 
        isPaused={isPaused} 
        caseId={caseId} 
      />

      {/* Main Console Three-Column Grid */}
      <main className="console-main-grid">
        {/* Left Column: Field Monitoring Telemetry */}
        <FieldMonitoring
          temperature={temperature}
          movement={movement}
          feeding={feeding}
          ammonia={ammonia}
          airQuality={airQuality}
          lameness={lameness}
          cameraStatus={cameraStatus}
          iotStatus={iotStatus}
          farmerStatus={farmerStatus}
        />

        {/* Center Column: Intelligence Core, Risk Engine & Workflow Bay */}
        <div className="panel-center-engine">
          {/* Central Radial Intelligence Core */}
          <IntelligenceCore
            activeModules={activeModules}
            particlesActive={particlesActive}
            feedbackLoopFlowing={feedbackLoopFlowing}
            currentState={currentState}
          />

          {/* Risk Engine & Decision Trace Breakdown */}
          <RiskEngine
            riskScore={riskScore}
            priority={priority}
            hardRuleTriggered={hardRuleTriggered}
            activeTraces={activeTraces}
          />

          {/* Contextual Operational Stage Bay */}
          <WorkflowBays
            currentState={currentState}
            farmerVerified={farmerVerified}
            offlineQueueSynced={offlineQueueSynced}
            caseCreated={caseCreated}
            paravetStatus={paravetStatus}
            vetStatus={vetStatus}
            labStatus={labStatus}
            labProgress={labProgress}
            onReset={resetSimulation}
          />
        </div>

        {/* Right Column: System Event Stream Terminal */}
        <EventStream 
          eventLog={eventLog} 
        />
      </main>

      {/* Bottom Bar: Case Journey Timeline & Controls */}
      <footer className="console-bottombar">
        <CaseJourney 
          currentJourneyNode={journeyNode} 
        />

        <SimulationControls
          isRunning={isRunning}
          isPaused={isPaused}
          speed={speed}
          onStart={startSimulation}
          onPause={pauseSimulation}
          onResume={resumeSimulation}
          onReset={resetSimulation}
          onSpeedChange={setSpeed}
        />
      </footer>
    </div>
  );
}
