import React from 'react';
import { useSimulation } from '../hooks/useSimulation';
import { ROLES } from '../engine/simulationEngine';
import { GlobalHeader } from '../components/Navigation/GlobalHeader';
import { GlobalWorkflow } from '../components/Navigation/GlobalWorkflow';
import { RoleSwitcher } from '../components/Navigation/RoleSwitcher';
import { NotificationBanner } from '../components/Notification/NotificationBanner';
import { CaseJourneyModal } from '../components/CaseJourney/CaseJourneyModal';

// Dedicated Role Views
import { FarmerView } from '../views/FarmerView/FarmerView';
import { ParavetView } from '../views/ParavetView/ParavetView';
import { VeterinarianView } from '../views/VeterinarianView/VeterinarianView';
import { LabView } from '../views/LabView/LabView';
import { GovernmentView } from '../views/GovernmentView/GovernmentView';

// Command Center (Original Live Simulation Console) Components
import { FieldMonitoring } from '../components/FieldMonitoring/FieldMonitoring';
import { IntelligenceCore } from '../components/IntelligenceCore/IntelligenceCore';
import { RiskEngine } from '../components/RiskEngine/RiskEngine';
import { WorkflowBays } from '../components/WorkflowBays/WorkflowBays';
import { EventStream } from '../components/EventStream/EventStream';
import { CaseJourney } from '../components/CaseJourney/CaseJourney';
import { SimulationControls } from '../components/SimulationControls/SimulationControls';

export function MainContainer() {
  const sim = useSimulation();

  const renderActiveView = () => {
    switch (sim.currentRole) {
      case ROLES.FARMER:
        return (
          <FarmerView
            farm={sim.farm}
            animal={sim.animal}
            telemetry={sim.telemetry}
            anomalyDetected={sim.anomalyDetected}
            farmerAlertGenerated={sim.farmerAlertGenerated}
            farmerConfirmed={sim.farmerConfirmed}
            offlineQueue={sim.offlineQueue}
            caseCreated={sim.caseCreated}
            caseId={sim.caseId}
            onSimulateAnomaly={sim.simulateAnomaly}
            onConfirmAlert={sim.confirmFarmerAlert}
          />
        );

      case ROLES.PARAVET:
        return (
          <ParavetView
            caseId={sim.caseId}
            farm={sim.farm}
            animal={sim.animal}
            telemetry={sim.telemetry}
            farmerConfirmed={sim.farmerConfirmed}
            paravetAssigned={sim.paravetAssigned}
            paravetAccepted={sim.paravetAccepted}
            paravetChecklist={sim.paravetChecklist}
            paravetVerified={sim.paravetVerified}
            paravetOfficer={sim.paravetOfficer}
            onAcceptCase={sim.acceptParavetCase}
            onToggleChecklist={sim.toggleParavetChecklist}
            onVerifyReport={sim.verifyParavetReport}
          />
        );

      case ROLES.VETERINARIAN:
        return (
          <VeterinarianView
            caseId={sim.caseId}
            farm={sim.farm}
            animal={sim.animal}
            telemetry={sim.telemetry}
            paravetVerified={sim.paravetVerified}
            vetReviewed={sim.vetReviewed}
            sampleRequested={sim.sampleRequested}
            sampleId={sim.sampleId}
            vetOfficer={sim.vetOfficer}
            riskScore={sim.riskScore}
            priority={sim.priority}
            onRequestSample={sim.requestLabSample}
          />
        );

      case ROLES.LAB:
        return (
          <LabView
            caseId={sim.caseId}
            farm={sim.farm}
            animal={sim.animal}
            sampleRequested={sim.sampleRequested}
            sampleId={sim.sampleId}
            labReceived={sim.labReceived}
            labProgress={sim.labProgress}
            labStatus={sim.labStatus}
            labConfirmed={sim.labConfirmed}
            diagnosticResult={sim.diagnosticResult}
            labFacility={sim.labFacility}
            onReceiveSample={sim.receiveLabSample}
            onStartTest={sim.startLabTest}
            onConfirmResult={sim.confirmLabResult}
          />
        );

      case ROLES.GOVERNMENT:
        return (
          <GovernmentView
            caseId={sim.caseId}
            farm={sim.farm}
            animal={sim.animal}
            labConfirmed={sim.labConfirmed}
            govSurveillanceUpdated={sim.govSurveillanceUpdated}
            groundTruthRecorded={sim.groundTruthRecorded}
            feedbackLoopActive={sim.feedbackLoopActive}
            activeCasesCount={sim.activeCasesCount}
            highRiskCount={sim.highRiskCount}
            confirmedTodayCount={sim.confirmedTodayCount}
            onOpenCaseJourney={() => sim.toggleCaseJourney(true)}
            onResetCase={sim.resetCase}
          />
        );

      case ROLES.COMMAND_CENTER:
      default:
        // Original Complete Live Simulation Console View
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, minHeight: 0 }}>
            <main className="console-main-grid">
              <FieldMonitoring
                temperature={sim.temperature}
                movement={sim.movement}
                feeding={sim.feeding}
                ammonia={sim.ammonia}
                airQuality={sim.airQuality}
                lameness={sim.lameness}
                cameraStatus={sim.cameraStatus}
                iotStatus={sim.iotStatus}
                farmerStatus={sim.farmerStatus}
              />

              <div className="panel-center-engine">
                <IntelligenceCore
                  activeModules={sim.activeModules}
                  particlesActive={sim.particlesActive}
                  feedbackLoopFlowing={sim.feedbackLoopFlowing}
                  currentState={sim.currentState}
                />

                <RiskEngine
                  riskScore={sim.riskScore}
                  priority={sim.priority}
                  hardRuleTriggered={sim.hardRuleTriggered}
                  activeTraces={sim.activeTraces}
                />

                <WorkflowBays
                  currentState={sim.currentState}
                  farmerVerified={sim.farmerVerified}
                  offlineQueueSynced={sim.offlineQueueSynced}
                  caseCreated={sim.caseCreated}
                  paravetStatus={sim.paravetStatus}
                  vetStatus={sim.vetStatus}
                  labStatus={sim.labStatus}
                  labProgress={sim.labProgress}
                  onReset={sim.resetCase}
                />
              </div>

              <EventStream 
                eventLog={sim.eventLog} 
              />
            </main>

            <footer className="console-bottombar">
              <CaseJourney 
                currentJourneyNode={sim.journeyNode} 
              />

              <SimulationControls
                isRunning={sim.isAutoDemoRunning}
                isPaused={sim.isAutoDemoPaused}
                speed={sim.speed}
                onStart={sim.startAutoDemo}
                onPause={sim.pauseAutoDemo}
                onResume={sim.resumeAutoDemo}
                onReset={sim.resetCase}
                onSpeedChange={sim.setSpeed}
              />
            </footer>
          </div>
        );
    }
  };

  return (
    <div className="console-viewport">
      {/* 1. Global Header Bar */}
      <GlobalHeader
        caseId={sim.caseId}
        currentRole={sim.currentRole}
        isAutoDemoRunning={sim.isAutoDemoRunning}
        isAutoDemoPaused={sim.isAutoDemoPaused}
        speed={sim.speed}
        onStartAutoDemo={sim.startAutoDemo}
        onPauseAutoDemo={sim.pauseAutoDemo}
        onResumeAutoDemo={sim.resumeAutoDemo}
        onResetCase={sim.resetCase}
        onOpenCaseJourney={() => sim.toggleCaseJourney(true)}
        onSpeedChange={sim.setSpeed}
      />

      {/* 2. Global Stepped Workflow Pipeline Bar */}
      <GlobalWorkflow
        currentRole={sim.currentRole}
        currentStage={sim.currentStage}
        workflowPassed={sim.workflowPassed}
        onSelectRole={sim.setRole}
      />

      {/* 3. Role View Container */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        {renderActiveView()}
      </div>

      {/* 4. Floating Tactical Role Switcher */}
      <RoleSwitcher
        currentRole={sim.currentRole}
        onSelectRole={sim.setRole}
        notifications={sim.notifications}
      />

      {/* 5. Interactive Notifications Toast Banner */}
      <NotificationBanner 
        notifications={sim.notifications} 
      />

      {/* 6. Complete End-to-End Case Journey Modal Drawer */}
      <CaseJourneyModal
        isOpen={sim.isCaseJourneyOpen}
        onClose={() => sim.toggleCaseJourney(false)}
        caseId={sim.caseId}
        workflowPassed={sim.workflowPassed}
        eventLog={sim.eventLog}
      />
    </div>
  );
}
