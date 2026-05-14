'use client';

import { useState } from 'react';

interface Props {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function CollapsibleCard({ icon, title, subtitle, action, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`admin-card${open ? ' admin-card--open' : ''}`}>
      <div
        className="admin-card__header admin-card__header--toggle"
        onClick={() => setOpen(v => !v)}
      >
        <span className="admin-card__header-icon">{icon}</span>
        <div style={{ flex: 1 }}>
          <div className="admin-card__title">{title}</div>
          <div className="admin-card__subtitle">{subtitle}</div>
        </div>
        {action && (
          <div onClick={e => e.stopPropagation()}>{action}</div>
        )}
        <span className="admin-card__chevron" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
      </div>
      <div className="admin-collapsible">
        <div className="admin-collapsible__inner">
          {children}
        </div>
      </div>
    </div>
  );
}
