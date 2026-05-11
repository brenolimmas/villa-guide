import type { CommercePlace } from '@/types/property';
import { CommerceFilter } from '@/components/interactive/CommerceFilter';

interface Props {
  commerce: CommercePlace[];
}

export function CommerceSection({ commerce }: Props) {
  return (
    <section className="panel" id="panel-commerce" role="tabpanel" aria-labelledby="tab-commerce" tabIndex={0} hidden>
      <div className="panel__inner">

        <div className="panel__hero">
          <div className="panel__hero-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 11-1 9"/><path d="m19 11-4-7"/><path d="M2 11h20"/>
              <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"/>
              <path d="M4.5 15.5h15"/><path d="m5 11 4-7"/><path d="m9 11 1 9"/>
            </svg>
          </div>
          <div>
            <div className="panel__hero-title">Comércio próximo</div>
            <div className="panel__hero-desc">O que há perto da Villa Mariz</div>
          </div>
        </div>

        <CommerceFilter commerce={commerce} />

      </div>
    </section>
  );
}
