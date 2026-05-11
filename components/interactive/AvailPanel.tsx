'use client';

import { useState, useEffect } from 'react';

interface Props {
  whatsapp?: string;
}

export function AvailPanel({ whatsapp }: Props) {
  const [open, setOpen] = useState(false);
  const [nights, setNights] = useState(1);
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener('avail-panel-open', handleOpen);
    return () => window.removeEventListener('avail-panel-open', handleOpen);
  }, []);

  const close = () => setOpen(false);

  const submit = () => {
    const phone = whatsapp ?? '5573991547018';
    const msg = encodeURIComponent(`Olá! Gostaria de consultar disponibilidade para ${nights} noite${nights > 1 ? 's' : ''} adicionais com ${guests} hóspede${guests > 1 ? 's' : ''}.`);
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank', 'noopener,noreferrer');
    close();
  };

  if (!open) return null;

  return (
    <div className="avail-panel" id="js-avail-panel" role="dialog" aria-modal={true} aria-labelledby="avail-panel-title" aria-hidden={!open}>
      <div className="avail-panel__backdrop" id="js-avail-backdrop" onClick={close} />
      <div className="avail-panel__card">
        <div className="avail-panel__header">
          <div className="avail-panel__header-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/>
              <path d="M3 10h18"/><path d="M11 14h6"/><path d="M14 11v6"/>
            </svg>
          </div>
          <div className="avail-panel__header-text">
            <h2 className="avail-panel__title" id="avail-panel-title">Consultar disponibilidade</h2>
            <p className="avail-panel__sub">Configure sua estadia adicional</p>
          </div>
        </div>

        <div className="avail-panel__body">
          <div className="avail-panel__row">
            <div className="avail-panel__row-info">
              <span className="avail-panel__row-title">Noites adicionais</span>
              <span className="avail-panel__row-sub">Diárias a acrescentar</span>
            </div>
            <div className="avail-panel__stepper">
              <button className="avail-panel__step-btn" type="button" onClick={() => setNights(n => Math.max(1, n - 1))}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <span className="avail-panel__step-val">{nights}</span>
              <button className="avail-panel__step-btn" type="button" onClick={() => setNights(n => n + 1)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
          </div>

          <div className="avail-panel__divider" />

          <div className="avail-panel__row">
            <div className="avail-panel__row-info">
              <span className="avail-panel__row-title">Hóspedes</span>
              <span className="avail-panel__row-sub">Pessoas durante a estadia</span>
            </div>
            <div className="avail-panel__stepper">
              <button className="avail-panel__step-btn" type="button" onClick={() => setGuests(g => Math.max(1, g - 1))}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <span className="avail-panel__step-val">{guests}</span>
              <button className="avail-panel__step-btn" type="button" onClick={() => setGuests(g => g + 1)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div className="avail-panel__footer">
          <button className="avail-panel__submit" type="button" id="js-avail-submit" onClick={submit}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/>
              <path d="M21.854 2.147 10.914 13.086"/>
            </svg>
            Enviar consulta
          </button>
        </div>
      </div>
    </div>
  );
}
