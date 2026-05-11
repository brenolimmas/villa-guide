'use client';

import { useState, useEffect } from 'react';

interface Props {
  wifiName?: string;
  wifiPass?: string;
}

export function WifiPanel({ wifiName, wifiPass }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const open = () => { setOpen(true); };
    window.addEventListener('wifi-panel-open', open);
    return () => window.removeEventListener('wifi-panel-open', open);
  }, []);

  const close = () => setOpen(false);

  const copy = async () => {
    if (!wifiPass) return;
    try {
      await navigator.clipboard.writeText(wifiPass);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  if (!open) return null;

  return (
    <div
      className="wifi-panel wifi-panel--visible"
      id="js-wifi-panel"
      role="dialog"
      aria-modal={true}
      aria-hidden={!open}
      onKeyDown={e => e.key === 'Escape' && close()}
    >
      <div className="wifi-panel__backdrop" id="js-wifi-backdrop" onClick={close} />
      <div className="wifi-panel__inner">
        <div className="wifi-card">
          <div className="wifi-card__rings" aria-hidden="true">
            <svg viewBox="0 0 320 220" fill="none" preserveAspectRatio="xMaxYMax slice">
              <circle cx="290" cy="190" r="70"  stroke="rgba(255,255,255,0.1)"  strokeWidth="1"/>
              <circle cx="290" cy="190" r="115" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
              <circle cx="290" cy="190" r="160" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
              <circle cx="290" cy="190" r="205" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
            </svg>
          </div>
          <div className="wifi-card__header">
            <div className="wifi-card__icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
                <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
                <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </div>
            <span className="wifi-card__status">Conexão ativa</span>
          </div>
          <div className="wifi-card__network">
            <span className="wifi-card__label">Rede Wi&#8209;Fi</span>
            <span className="wifi-card__network-name">{wifiName ?? '—'}</span>
          </div>
          <div className="wifi-card__password-wrap">
            <div>
              <span className="wifi-card__label">Senha</span>
              <span className="wifi-card__password">{wifiPass ?? '—'}</span>
            </div>
            <button className="wifi-card__copy-btn" type="button" aria-label="Copiar senha" onClick={copy}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        <div className="tip">
          <div className="tip__icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <p className="tip__text">Problemas na conexão? O roteador fica na sala — reinicie aguardando 10 segundos.</p>
        </div>
      </div>
    </div>
  );
}
