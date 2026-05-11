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

      </div>
    </section>
  );
}
