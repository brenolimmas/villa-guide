'use client';

import { useState } from 'react';
import type { EmergencyContact } from '@/types/property';

interface Props {
  emergencyContacts: EmergencyContact[];
}

export function HelpCards({ emergencyContacts }: Props) {
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  const handleHost = () => {
    const msg = encodeURIComponent('Olá! Estou hospedado na Villa Mariz e gostaria de falar com o anfitrião.');
    window.open(`https://wa.me/5573991547018?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="help-cards">
      <div className="help-card help-card--assistant">
        <div className="help-card__header">
          <span className="help-card__icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
            </svg>
          </span>
          <div className="help-card__meta">
            <span className="help-card__tag">Em breve</span>
            <div className="help-card__title">Assistente da villa</div>
            <div className="help-card__desc">Tire dúvidas instantaneamente, 24h por dia</div>
          </div>
        </div>
      </div>

      <button className="help-card help-card--host" id="js-help-host-btn" type="button" onClick={handleHost}>
        <div className="help-card__header">
          <span className="help-card__icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
            </svg>
          </span>
          <div className="help-card__meta">
            <span className="help-card__tag">Disponível</span>
            <div className="help-card__title">Falar com o anfitrião</div>
            <div className="help-card__desc">Resposta rápida durante sua estadia</div>
          </div>
          <span className="help-card__chevron help-card__chevron--send" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </span>
        </div>
      </button>

      <div className={`help-card help-card--emergency${emergencyOpen ? ' help-card--open' : ''}`} id="js-help-emergency">
        <div className="help-card__header" onClick={() => setEmergencyOpen(v => !v)} style={{ cursor: 'pointer' }}>
          <span className="help-card__icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
              <path d="M12 8v4"/><path d="M12 16h.01"/>
            </svg>
          </span>
          <div className="help-card__meta">
            <span className="help-card__tag">Emergência</span>
            <div className="help-card__title">Números de emergência</div>
            <div className="help-card__desc">Toque para ver os contatos importantes</div>
          </div>
          <span className="help-card__chevron" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </span>
        </div>
        <div className="help-card__body">
          <div className="help-card__body-inner">
            <div className="help-contacts">
              {emergencyContacts.map(contact => (
                <a key={contact.id} href={`tel:${contact.phone}`} className="help-contact">
                  <span className="help-contact__icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18a2 2 0 0 1 2-2.18H6.93a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </span>
                  <div className="help-contact__info">
                    <div className="help-contact__name">{contact.label}</div>
                    {contact.sub_label && <div className="help-contact__sub">{contact.sub_label}</div>}
                  </div>
                  <span className="help-contact__number">{contact.phone}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
