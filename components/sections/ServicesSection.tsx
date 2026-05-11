import type { Service } from '@/types/property';

interface Props {
  services: Service[];
  whatsapp?: string;
}

export function ServicesSection({ services, whatsapp }: Props) {
  return (
    <section className="panel" id="panel-services" role="tabpanel" aria-labelledby="tab-services" tabIndex={0} hidden>
      <div className="panel__inner">

        <div className="panel__hero">
          <div className="panel__hero-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3V2"/>
              <path d="m15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5"/>
              <path d="M2 14h12a2 2 0 0 1 0 4h-2"/>
              <path d="M4 10h16"/><path d="M5 10a7 7 0 0 1 14 0"/>
              <path d="M5 14v6a1 1 0 0 1-1 1H2"/>
            </svg>
          </div>
          <div className="panel__hero-text">
            <h2 className="panel__hero-title">Serviços</h2>
            <p className="panel__hero-sub">O que podemos fazer por você</p>
          </div>
        </div>

        <div className="service-list">
          <div className="service-card">
            <div className="service-card__header">
              <div className="service-card__icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/>
                  <path d="M3 10h18"/><path d="M11 14h6"/><path d="M14 11v6"/>
                </svg>
              </div>
              <div className="service-card__meta">
                <div className="service-card__top">
                  <span className="service-card__label">Estadia</span>
                  <span className="service-card__badge service-card__badge--available">Consulta</span>
                </div>
                <h3 className="service-card__title">Adicionar mais diárias</h3>
                <p className="service-card__desc">Quer ficar mais um pouco? Solicite diárias adicionais diretamente pela plataforma, sujeito à disponibilidade do calendário.</p>
              </div>
            </div>
            <div className="service-card__footer">
              <button className="service-card__btn" id="js-avail-btn" type="button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6"/><path d="M10 14 21 3"/>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                </svg>
                Consultar disponibilidade
              </button>
            </div>
          </div>

          <div className="service-card service-card--soon">
            <div className="service-card__header">
              <div className="service-card__icon service-card__icon--muted">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
                </svg>
              </div>
              <div className="service-card__meta">
                <div className="service-card__top">
                  <span className="service-card__label">Serviço</span>
                  <span className="service-card__badge service-card__badge--soon">Em breve</span>
                </div>
                <h3 className="service-card__title">Limpeza adicional</h3>
                <p className="service-card__desc">Solicite uma limpeza extra durante a estadia. Realizada pela nossa equipe e agendada de acordo com sua preferência.</p>
              </div>
            </div>
            <div className="service-card__footer">
              <button className="service-card__btn service-card__btn--muted" type="button" disabled>Em breve</button>
            </div>
          </div>
        </div>

        <div className="tip">
          <div className="tip__icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <p className="tip__text">Serviços opcionais para tornar sua estadia ainda mais confortável. Solicite com antecedência quando possível.</p>
        </div>

      </div>
    </section>
  );
}
