import React from 'react';
import { Play, Pause, RotateCcw, FastForward } from 'lucide-react';

export function SimulationControls({
  isRunning,
  isPaused,
  speed,
  onStart,
  onPause,
  onResume,
  onReset,
  onSpeedChange
}) {
  return (
    <div className="console-controls-area">
      {/* Speed Selector Toggle Group */}
      <div className="tactile-toggle-group" title="Simulation Clock Rate Multiplier">
        <button 
          className={`tactile-toggle-item ${speed === 0.5 ? 'is-active' : ''}`}
          onClick={() => onSpeedChange(0.5)}
        >
          0.5×
        </button>
        <button 
          className={`tactile-toggle-item ${speed === 1.0 ? 'is-active' : ''}`}
          onClick={() => onSpeedChange(1.0)}
        >
          1×
        </button>
        <button 
          className={`tactile-toggle-item ${speed === 2.0 ? 'is-active' : ''}`}
          onClick={() => onSpeedChange(2.0)}
        >
          2×
        </button>
      </div>

      {/* Main Start / Pause / Resume Controls */}
      {!isRunning || isPaused ? (
        <button 
          onClick={isRunning && isPaused ? onResume : onStart}
          className="tactile-btn tactile-btn-primary"
        >
          <Play size={13} fill="currentColor" />
          <span>{isRunning && isPaused ? 'CONTINUE SIMULATION' : 'START LIVE SIMULATION'}</span>
        </button>
      ) : (
        <button 
          onClick={onPause}
          className="tactile-btn tactile-btn-secondary"
        >
          <Pause size={13} />
          <span>PAUSE</span>
        </button>
      )}

      {/* Reset Button */}
      <button 
        onClick={onReset}
        className="tactile-btn tactile-btn-secondary"
        title="Reset simulation to initial state"
      >
        <RotateCcw size={13} />
        <span>RESET</span>
      </button>
    </div>
  );
}
