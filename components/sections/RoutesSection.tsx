import type { Route } from '@/types/property';
import { RouteCarousel } from '@/components/interactive/RouteCarousel';

interface Props {
  routes: Route[];
}

export function RoutesSection({ routes }: Props) {
  return (
    <section className="panel" id="panel-routes" role="tabpanel" aria-labelledby="tab-routes" tabIndex={0} hidden>
      <div className="panel__inner">

        <div className="panel__hero">
          <div className="panel__hero-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
              <line x1="9" y1="3" x2="9" y2="18"/>
              <line x1="15" y1="6" x2="15" y2="21"/>
            </svg>
          </div>
          <div>
            <div className="panel__hero-title">Roteiros</div>
            <div className="panel__hero-desc">Passeios perto da Villa Mariz</div>
          </div>
        </div>

        <RouteCarousel routes={routes} />

        <div className="rules-section-header" style={{ marginTop: 'var(--s-8)' }}>
          <div className="panel__hero-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/>
              <path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/>
              <path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/>
            </svg>
          </div>
          <div>
            <div className="panel__hero-title">Eventos</div>
            <div className="panel__hero-desc">Agenda da região</div>
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: 'var(--s-8) var(--s-4)' }}>
          <p style={{ color: 'var(--c-muted)', fontSize: 'var(--text-sm)' }}>Em breve — eventos locais aparecerão aqui.</p>
        </div>

        <div className="tip">
          <div className="tip__icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <p className="tip__text">Conheça as trilhas e praias ao redor da Villa. Distâncias aproximadas a partir da propriedade.</p>
        </div>

      </div>
    </section>
  );
}
