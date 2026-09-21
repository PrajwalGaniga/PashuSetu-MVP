import React from 'react';
import { Bell, ShieldAlert, CheckCircle2 } from 'lucide-react';

export function NotificationBanner({ notifications = [] }) {
  if (!notifications || notifications.length === 0) return null;

  return (
    <div className="notification-toast-container">
      {notifications.map(notif => (
        <div key={notif.id} className="notification-toast">
          <Bell size={16} color="#38bdf8" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#ffffff' }}>
              {notif.title}
            </div>
            <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 1 }}>
              {notif.message}
            </div>
          </div>
          <span style={{ fontSize: 8, fontFamily: 'var(--font-mono)', color: '#64748b' }}>
            {notif.time}
          </span>
        </div>
      ))}
    </div>
  );
}
