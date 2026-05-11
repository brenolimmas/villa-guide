'use client';

import { useState, useEffect, useRef, type ReactNode, Children } from 'react';

const TABS = [
  {
    id: 'rules', label: 'Hospedagem',
    icon: '<path d="M3 9.75L12 3l9 6.75V21a.75.75 0 0 1-.75.75H3.75A.75.75 0 0 1 3 21V9.75z"/><path d="M9 21V12h6v9"/>',
  },
  {
    id: 'commerce', label: 'Comércio',
    icon: '<path d="m15 11-1 9"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"/><path d="M4.5 15.5h15"/><path d="m5 11 4-7"/><path d="m9 11 1 9"/>',
  },
  {
    id: 'routes', label: 'Roteiros',
    icon: '<polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>',
  },
  {
    id: 'services', label: 'Serviços',
    icon: '<path d="M12 3V2"/><path d="m15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5"/><path d="M2 14h12a2 2 0 0 1 0 4h-2"/><path d="M4 10h16"/><path d="M5 10a7 7 0 0 1 14 0"/><path d="M5 14v6a1 1 0 0 1-1 1H2"/>',
  },
];

interface Props {
  children: ReactNode;
}

export function TabsController({ children }: Props) {
  const [active, setActive] = useState(0);
  const panels = Children.toArray(children);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!mainRef.current) return;
    const allPanels = mainRef.current.querySelectorAll<HTMLElement>('.panel');
    allPanels.forEach((panel, i) => {
      if (i === active) {
        panel.classList.add('panel--active');
        panel.removeAttribute('hidden');
        // retrigger animation
        const targets = panel.querySelectorAll<HTMLElement>('.panel, .rule-item, .rule-item__icon, .tip, .faq-item, .faq-item__icon, .help-card, .help-card__icon');
        targets.forEach(el => {
          el.style.animation = 'none';
          void el.offsetHeight;
          el.style.animation = '';
        });
      } else {
        panel.classList.remove('panel--active');
        panel.setAttribute('hidden', '');
      }
    });
  }, [active]);

  return (
    <>
      <nav className="tabs" id="js-tabs" aria-label="Seções do guia">
        <ul className="tabs__list" role="tablist">
          {TABS.map((tab, i) => (
            <li key={tab.id} className="tabs__item" role="presentation">
              <button
                className={`tabs__btn${i === active ? ' tabs__btn--active' : ''}`}
                role="tab"
                aria-selected={i === active}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                data-tab={tab.id}
                onClick={() => setActive(i)}
              >
                <span className="tabs__icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: tab.icon }} />
                </span>
                <span className="tabs__label">{tab.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main className="main" id="js-main" ref={mainRef}>
        {panels}
      </main>
    </>
  );
}
