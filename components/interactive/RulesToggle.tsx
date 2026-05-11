'use client';

import { useState } from 'react';
import type { HouseRule } from '@/types/property';

interface Props {
  rules: HouseRule[];
}

const CATEGORY_CLASS: Record<string, string> = {
  critical: 'rule-item--critical',
  warning: 'rule-item--warning',
  info: '',
};

export function RulesToggle({ rules }: Props) {
  const [expanded, setExpanded] = useState(false);

  if (!rules.length) return null;

  return (
    <>
      <div className={`rules-wrap${expanded ? ' rules-wrap--expanded' : ''}`} id="js-rules-wrap">
        <div className="card">
          <ul className="rule-list">
            {rules.map(rule => (
              <li key={rule.id} className={`rule-item ${CATEGORY_CLASS[rule.category] ?? ''}`}>
                <div className="rule-item__icon">
                  {rule.icon_svg ? (
                    <span dangerouslySetInnerHTML={{ __html: rule.icon_svg }} />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                  )}
                </div>
                <p
                  className="rule-item__text"
                  dangerouslySetInnerHTML={{ __html: rule.title }}
                />
              </li>
            ))}
          </ul>
        </div>
        {!expanded && <div className="rules-wrap__fade" aria-hidden="true"></div>}
      </div>

      <button
        className="rules-toggle-btn"
        id="js-rules-toggle"
        aria-expanded={expanded}
        aria-controls="js-rules-wrap"
        onClick={() => setExpanded(v => !v)}
      >
        <span className="rules-toggle-btn__label">{expanded ? 'Ver menos' : 'Ver tudo'}</span>
        <span className={`rules-toggle-btn__chevron${expanded ? ' rules-toggle-btn__chevron--up' : ''}`} aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
      </button>
    </>
  );
}
