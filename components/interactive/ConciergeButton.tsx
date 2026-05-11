'use client';

import { useState, useEffect, useRef } from 'react';

interface Props {
  propertyName?: string;
  guestName?: string;
}

export function ConciergeButton({ propertyName, guestName }: Props) {
  const [panelOpen, setPanelOpen] = useState(false);
  const [input, setInput] = useState('');
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!labelRef.current) return;
      labelRef.current.classList.add('concierge-bubble__text--fading');
      setTimeout(() => {
        if (labelRef.current) {
          labelRef.current.textContent = 'Posso ajudar?';
          labelRef.current.classList.remove('concierge-bubble__text--fading');
        }
      }, 240);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const openPanel = () => setPanelOpen(true);
  const closePanel = () => setPanelOpen(false);

  const sendToWhatsApp = (text: string) => {
    const msg = encodeURIComponent(`Olá! Tenho uma dúvida: ${text}`);
    window.open(`https://wa.me/5573991547018?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sendToWhatsApp(input.trim());
    setInput('');
  };

  return (
    <>
      <button className="concierge-float" id="js-concierge-btn" aria-label="Abrir assistente da Villa" onClick={openPanel}>
        <div className="concierge-bubble">
          <span className="concierge-bubble__text" id="js-concierge-label" ref={labelRef}>Posso ajudar?</span>
        </div>
        <div className="concierge-avatar-ring">
          <img className="concierge-btn__avatar" src="/assets/concierge-avatar.png" alt="" aria-hidden="true" draggable={false} />
        </div>
      </button>

      {panelOpen && (
        <div className="concierge-panel concierge-panel--visible" id="js-concierge-panel" aria-hidden={!panelOpen} role="dialog" aria-modal={true} aria-label="Assistente da Villa" onKeyDown={e => e.key === 'Escape' && closePanel()}>
          <div className="concierge-panel__backdrop" id="js-concierge-backdrop" onClick={closePanel} />
          <div className="concierge-panel__sheet">
            <div className="concierge-panel__handle" aria-hidden="true" />

            <div className="concierge-panel__header">
              <div className="concierge-panel__avatar">
                <img className="concierge-panel__avatar-img" src="/assets/concierge-avatar.png" alt="Assistente da Villa" draggable={false} />
                <span className="concierge-panel__online" aria-hidden="true" />
              </div>
              <div className="concierge-panel__header-info">
                <p className="concierge-panel__title">Assistente da Villa</p>
                <p className="concierge-panel__subtitle">Ajuda inteligente durante sua estadia</p>
              </div>
              <button className="concierge-panel__close" id="js-concierge-close" aria-label="Fechar assistente" onClick={closePanel}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="concierge-panel__messages" id="js-concierge-messages">
              <div className="concierge-msg">
                <p className="concierge-msg__text">
                  {guestName ? `Olá, ${guestName.split(' ')[0]} 👋` : 'Olá 👋'}<br />Posso ajudar com:
                </p>
                <ul className="concierge-msg__list">
                  <li>Wi-Fi e conexão</li>
                  <li>Horários de check-out</li>
                  <li>Comércio próximo</li>
                  <li>Roteiros locais</li>
                  <li>Equipamentos da casa</li>
                </ul>
              </div>
            </div>

            <div className="concierge-panel__input-row">
              <input
                className="concierge-panel__input"
                id="js-concierge-input"
                type="text"
                placeholder="Escreva sua dúvida…"
                autoComplete="off"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
              />
              <button className="concierge-panel__send" id="js-concierge-send" aria-label="Enviar" onClick={handleSend}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
