'use client';

import { useState } from 'react';
import type { Faq } from '@/types/property';

interface Props {
  faqs: Faq[];
}

export function FaqAccordion({ faqs }: Props) {
  const [open, setOpen] = useState<string | null>(null);

  if (!faqs.length) return null;

  return (
    <div className="faq-list" id="js-faq-list">
      {faqs.map(faq => (
        <div key={faq.id} className="faq-item">
          <button
            className="faq-item__trigger"
            aria-expanded={open === faq.id}
            onClick={() => setOpen(prev => prev === faq.id ? null : faq.id)}
          >
            <span className="faq-item__icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </span>
            <span className="faq-item__question">{faq.question}</span>
            <span className="faq-item__chevron" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </span>
          </button>
          <div className="faq-item__body" style={{ display: open === faq.id ? '' : 'none' }}>
            <div className="faq-item__inner">
              <div className="faq-item__answer">
                {faq.faq_steps.map((step, i) => (
                  <div key={step.id} className="faq-item__step">
                    <span className="faq-item__step-num">{i + 1}</span>
                    <p className="faq-item__step-text" dangerouslySetInnerHTML={{ __html: step.step_text }} />
                  </div>
                ))}
                {faq.answer && <p>{faq.answer}</p>}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
