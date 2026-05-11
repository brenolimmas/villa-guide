'use client';

import { useState } from 'react';
import type { CommercePlace } from '@/types/property';

interface Props {
  commerce: CommercePlace[];
}

export function CommerceFilter({ commerce }: Props) {
  const categories = Array.from(new Set(commerce.map(p => p.category)));
  const [active, setActive] = useState(categories[0] ?? 'supermarkets');

  const LABELS: Record<string, string> = {
    supermarkets: 'Supermercados',
    pharmacies: 'Farmácias',
    laundries: 'Lavanderias',
    restaurants: 'Restaurantes',
  };

  const filtered = commerce.filter(p => p.category === active);

  return (
    <>
      <nav className="commerce-filters" aria-label="Filtrar por categoria">
        {categories.map(cat => (
          <button
            key={cat}
            className={`commerce-filter${cat === active ? ' commerce-filter--active' : ''}`}
            data-commerce={cat}
            aria-pressed={cat === active}
            onClick={() => setActive(cat)}
          >
            {LABELS[cat] ?? cat}
          </button>
        ))}
      </nav>

      <div className="commerce-content" data-commerce-section={active}>
        {filtered.length === 0 ? (
          <div className="card card--tinted">
            <p className="card__label">Em breve</p>
            <p className="card__body">Estamos mapeando os estabelecimentos próximos.</p>
          </div>
        ) : (
          filtered.map(place => (
            <PlaceCard key={place.id} place={place} />
          ))
        )}
      </div>
    </>
  );
}

function PlaceCard({ place }: { place: CommercePlace }) {
  const [hoursOpen, setHoursOpen] = useState(false);

  return (
    <article className="place-card">
      {place.image_url && (
        <div className="place-card__img-wrap">
          <img className="place-card__img" src={place.image_url} alt={place.name} loading="lazy" />
        </div>
      )}
      <div className="place-card__body">
        <div className="place-card__main">
          <div className="place-card__name">{place.name}</div>
          <button className="place-card__hours-btn" type="button" onClick={() => setHoursOpen(v => !v)}>
            {hoursOpen ? 'Fechar horários' : 'Ver horários'}
          </button>
        </div>
        {(place.drive_minutes || place.walk_minutes) && (
          <div className="place-card__travel">
            {place.drive_minutes && (
              <div className="place-card__travel-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
                  <circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>
                </svg>
                <span>{place.drive_minutes} min</span>
              </div>
            )}
            {place.walk_minutes && (
              <div className="place-card__travel-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="13" cy="4" r="1"/><path d="M7 21l3-6"/><path d="M13 21v-5l-2-3 4-4"/><path d="M9.5 9.5 7 13l3 1"/>
                </svg>
                <span>{place.walk_minutes} min</span>
              </div>
            )}
          </div>
        )}
      </div>

      {hoursOpen && place.commerce_hours.length > 0 && (
        <div className="place-card__hours-panel">
          <div className="place-card__hours-inner">
            <ul className="place-card__hours-list">
              {place.commerce_hours.map(h => (
                <li key={h.id}><span>{h.day_label}</span><span>{h.hours}</span></li>
              ))}
            </ul>
            <p className="place-card__hours-note">Em feriados os horários podem ser diferentes.</p>
          </div>
        </div>
      )}

      {place.maps_url && (
        <div className="place-card__footer">
          <a className="place-card__map-btn" href={place.maps_url} target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            Ver no mapa
          </a>
        </div>
      )}
    </article>
  );
}
