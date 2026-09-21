import React, { useState } from 'react';
import { 
  ShieldAlert, 
  User, 
  Stethoscope, 
  TestTubes, 
  Building2, 
  ChevronUp, 
  ChevronDown,
  Activity,
  Layers
} from 'lucide-react';
import { ROLES } from '../../engine/simulationEngine';

export function RoleSwitcher({ currentRole, onSelectRole, notifications = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  const roleItems = [
    { id: ROLES.COMMAND_CENTER, label: 'Command Center', icon: Layers, desc: 'Central System Brain' },
    { id: ROLES.FARMER, label: 'Farmer View', icon: User, desc: 'Mobile App & Farm Sensing' },
    { id: ROLES.PARAVET, label: 'Paravet View', icon: Activity, desc: 'Field Triage & Verification' },
    { id: ROLES.VETERINARIAN, label: 'Veterinarian View', icon: Stethoscope, desc: 'Clinical Evidence & Map' },
    { id: ROLES.LAB, label: 'Laboratory View', icon: TestTubes, desc: 'Molecular RT-PCR Ground Truth' },
    { id: ROLES.GOVERNMENT, label: 'Government View', icon: Building2, desc: 'National Surveillance Grid' }
  ];

  const currentRoleObj = roleItems.find(r => r.id === currentRole) || roleItems[0];
  const CurrentIcon = currentRoleObj.icon;

  return (
    <div className="floating-role-switcher">
      {isOpen && (
        <div className="role-switcher-menu">
          <div style={{ 
            fontSize: 9, 
            fontFamily: 'var(--font-mono)', 
            fontWeight: 700, 
            color: 'var(--text-muted)', 
            padding: '4px 8px', 
            letterSpacing: '0.08em' 
          }}>
            SWITCH OPERATIONAL ROLE
          </div>

          {roleItems.map(item => {
            const Icon = item.icon;
            const isActive = currentRole === item.id;
            return (
              <button
                key={item.id}
                className={`role-switcher-item ${isActive ? 'is-active' : ''}`}
                onClick={() => {
                  onSelectRole(item.id);
                  setIsOpen(false);
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon size={14} color={isActive ? '#1d4ed8' : '#64748b'} />
                  <div style={{ textAlign: 'left' }}>
                    <div>{item.label}</div>
                    <div style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 400 }}>{item.desc}</div>
                  </div>
                </div>
                {isActive && <span className="led-jewel led-blue" style={{ width: 6, height: 6 }}></span>}
              </button>
            );
          })}
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button 
        className="role-switcher-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Toggle Operational Role Switcher"
      >
        <span className="led-jewel led-green led-pulse" style={{ width: 8, height: 8 }}></span>
        <CurrentIcon size={14} color="#93c5fd" />
        <span>ROLE: {currentRoleObj.label.toUpperCase()}</span>
        {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </button>
    </div>
  );
}
