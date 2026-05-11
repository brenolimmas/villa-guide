'use client';

import { useState, useEffect } from 'react';

interface Props {
  checkinDate?: string;
  checkoutDate?: string;
  lat?: number;
  lon?: number;
}

interface Weather {
  temp: number;
  isDay: boolean;
}

export function StayStatus({ checkinDate, checkoutDate, lat, lon }: Props) {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [wifiOpen, setWifiOpen] = useState(false);

  useEffect(() => {
    if (checkoutDate) {
      const out = new Date(checkoutDate + 'T12:00:00');
      const now = new Date();
      const diff = Math.ceil((out.getTime() - now.getTime()) / 86400000);
      setDaysLeft(diff > 0 ? diff : 0);
    }
  }, [checkoutDate]);

  useEffect(() => {
    if (!lat || !lon) return;
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
      .then(r => r.json())
      .then(d => {
        if (d.current_weather) {
          setWeather({ temp: Math.round(d.current_weather.temperature), isDay: d.current_weather.is_day === 1 });
        }
      })
      .catch(() => {});
  }, [lat, lon]);

  const handleWifiShortcut = () => {
    const panel = document.getElementById('js-wifi-panel');
    if (panel) {
      panel.classList.add('wifi-panel--visible');
      panel.setAttribute('aria-hidden', 'false');
    }
  };

  return (
    <div className="stay-status" aria-label="Status da estadia">
      <div className="status-card">
        <span className="status-card__icon status-card__icon--gold" id="js-clima-icon" aria-hidden="true">
          {weather?.isDay ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </span>
        <span className="status-card__value">{weather ? `${weather.temp}°C` : '—'}</span>
        <span className="status-card__label">Agora</span>
      </div>

      <div className="status-card">
        <span className="status-card__icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </span>
        <span className="status-card__value" id="js-days-val">{daysLeft ?? '—'}</span>
        <span className="status-card__label" id="js-days-label">Restantes</span>
      </div>

      <button className="status-card status-card--interactive" id="js-wifi-shortcut" aria-label="Ver senha do Wi-Fi" onClick={handleWifiShortcut}>
        <span className="status-card__icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
            <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
            <line x1="12" y1="20" x2="12.01" y2="20"/>
          </svg>
        </span>
        <span className="status-card__value">Wi&#8209;Fi</span>
        <span className="status-card__label">Toque para ver</span>
      </button>
    </div>
  );
}
