import React, { useEffect, useRef } from 'react';
import { Terminal, CircleDot } from 'lucide-react';

export function EventStream({ eventLog = [] }) {
  const scrollRef = useRef(null);

  // Auto-scroll to the bottom when new logs appear
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [eventLog]);

  return (
    <div className="tactile-panel panel-event-stream">
      <span className="screw screw-tl"></span>
      <span className="screw screw-tr"></span>
      <span className="screw screw-bl"></span>
      <span className="screw screw-br"></span>

      {/* Header */}
      <div className="tactile-panel-header">
        <h2 className="tactile-panel-title">
          <Terminal size={14} color="#1e3a5f" />
          SYSTEM EVENT STREAM
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="led-jewel led-green led-pulse" style={{ width: 6, height: 6 }}></span>
          <span className="tactile-panel-subtitle">LIVE BUFFER</span>
        </div>
      </div>

      {/* Hardware LCD Terminal Display */}
      <div className="lcd-screen" style={{ margin: 10, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="stream-terminal-body" ref={scrollRef}>
          {eventLog.length === 0 ? (
            <div style={{ color: '#64748b', fontStyle: 'italic', padding: 8 }}>
              Awaiting system events...
            </div>
          ) : (
            eventLog.map(item => (
              <div 
                key={item.id} 
                className={`stream-log-entry ${
                  item.type === 'critical' 
                    ? 'is-critical' 
                    : (item.type === 'highlight' ? 'is-highlight' : (item.type === 'success' ? 'is-success' : ''))
                }`}
              >
                <span className="stream-time">[{item.time}]</span>
                <span className="stream-msg">{item.text}</span>
              </div>
            ))
          )}
        </div>

        {/* Terminal Footer Info */}
        <div style={{ 
          padding: '4px 10px', 
          borderTop: '1px solid #283548', 
          background: 'rgba(0,0,0,0.2)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          fontSize: 9,
          color: '#64748b'
        }}>
          <span>WS: /api/v1/stream/events</span>
          <span>BUFFER: {eventLog.length} EVENTS</span>
        </div>
      </div>
    </div>
  );
}
