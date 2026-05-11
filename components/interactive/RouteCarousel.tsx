'use client';

import { useState, useRef, useEffect } from 'react';
import type { Route } from '@/types/property';

interface Props {
  routes: Route[];
}

export function RouteCarousel({ routes }: Props) {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Array.from(track.children).indexOf(entry.target as HTMLElement);
            if (idx >= 0) setCurrent(idx);
          }
        });
      },
      { root: track.parentElement, threshold: 0.5 }
    );
    Array.from(track.children).forEach(child => observer.observe(child));
    return () => observer.disconnect();
  }, [routes]);

  if (!routes.length) return null;

  return (
    <div className="routes-carousel">
      <div className="routes-track" id="js-routes-track" ref={trackRef}>
        {routes.map(route => (
          <RouteCard key={route.id} route={route} />
        ))}
      </div>
      <div className="routes-dots" id="js-routes-dots" aria-hidden="true">
        {routes.map((_, i) => (
          <div key={i} className={`routes-dot${i === current ? ' routes-dot--active' : ''}`} />
        ))}
      </div>
    </div>
  );
}

function RouteCard({ route }: { route: Route }) {
  const [ratingOpen, setRatingOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="route-card">
      {route.image_url && (
        <div className="route-card__img-wrap">
          <img className="route-card__img" src={route.image_url} alt={route.title} loading="lazy" />
        </div>
      )}
      <div className="route-card__body">
        <h3 className="route-card__title">{route.title}</h3>
        <div className="route-card__meta">
          {route.distance_km && (
            <div className="route-card__distance">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
                <circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>
              </svg>
              <span>{route.distance_km} km</span>
            </div>
          )}
        </div>
        {route.description && (
          <p className="route-card__desc">{route.description}</p>
        )}
        <div className="route-card__actions">
          <button className="route-card__more-btn" type="button" onClick={() => setExpanded(v => !v)}>
            {expanded ? 'Ver menos' : 'Saiba mais'}
          </button>
          <button className="route-card__rate-btn" type="button" onClick={() => setRatingOpen(v => !v)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            Avaliar
          </button>
        </div>
      </div>

      {ratingOpen && (
        <div className="route-card__rating-panel">
          <div className="route-card__rating-inner">
            <span className="route-card__rating-label">Como foi sua visita?</span>
            <div className="route-card__rating-hearts" role="group" aria-label="Selecione de 1 a 5 corações">
              {[1, 2, 3, 4, 5].map(v => (
                <button key={v} className="rating-heart" type="button" data-value={v} aria-label={`${v} coração${v > 1 ? 'ões' : ''}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
              ))}
            </div>
            <textarea className="route-card__comment" placeholder="Deixe um comentário (opcional)..." rows={3} aria-label="Comentário opcional" />
            <button className="route-card__submit-btn" type="button">Enviar avaliação</button>
          </div>
        </div>
      )}
    </article>
  );
}
