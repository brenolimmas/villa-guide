import type { Property, Reservation, HouseRule, Faq, VillaSlide, EmergencyContact } from '@/types/property';
import { StayStatus } from '@/components/interactive/StayStatus';
import { RulesToggle } from '@/components/interactive/RulesToggle';
import { FaqAccordion } from '@/components/interactive/FaqAccordion';
import { VillaCarousel } from '@/components/interactive/VillaCarousel';
import { HelpCards } from '@/components/interactive/HelpCards';
import { FarewellSection } from '@/components/sections/FarewellSection';

interface Props {
  property: Property;
  reservation: Reservation | null;
  rules: HouseRule[];
  faqs: Faq[];
  villaSlides: VillaSlide[];
  emergencyContacts: EmergencyContact[];
}

export function RulesSection({ property, reservation, rules, faqs, villaSlides, emergencyContacts }: Props) {
  return (
    <section className="panel panel--active" id="panel-rules" role="tabpanel" aria-labelledby="tab-rules" tabIndex={0}>
      <div className="panel__inner">

        <div className="panel__hero">
          <div className="panel__hero-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9.75L12 3l9 6.75V21a.75.75 0 0 1-.75.75H3.75A.75.75 0 0 1 3 21V9.75z"/>
              <path d="M9 21V12h6v9"/>
            </svg>
          </div>
          <div>
            <div className="panel__hero-title">Minha hospedagem</div>
            <div className="panel__hero-desc">Dados gerais de minha Hospedagem</div>
          </div>
        </div>

        <StayStatus
          checkinDate={reservation?.checkin_date}
          checkoutDate={reservation?.checkout_date}
          lat={property.lat}
          lon={property.lon}
        />

        <div className="rules-section-header">
          <div className="panel__hero-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
              <polyline points="3 6 4 7 6 5"/><polyline points="3 12 4 13 6 11"/><polyline points="3 18 4 19 6 17"/>
            </svg>
          </div>
          <div>
            <div className="panel__hero-title">Regras da casa</div>
            <div className="panel__hero-desc">Para que todos se sintam bem</div>
          </div>
        </div>

        <RulesToggle rules={rules} />

        <div className="villa-section">
          <div className="rules-section-header">
            <div className="panel__hero-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </div>
            <div>
              <div className="panel__hero-title">Conheça a Villa</div>
              <div className="panel__hero-desc">Momentos que tornam este lugar especial</div>
            </div>
          </div>
          <VillaCarousel
            slides={villaSlides}
            storyEyebrow={property.villa_story_eyebrow}
            storyText={property.villa_story_text}
          />
        </div>

        <div className="rules-section-header">
          <div className="panel__hero-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <div>
            <div className="panel__hero-title">Como usar</div>
            <div className="panel__hero-desc">Tudo que você precisa saber</div>
          </div>
        </div>

        <FaqAccordion faqs={faqs} />

        <div className="rules-section-header">
          <div className="panel__hero-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/>
            </svg>
          </div>
          <div>
            <div className="panel__hero-title">Ajuda</div>
            <div className="panel__hero-desc">Estamos aqui durante toda sua estadia</div>
          </div>
        </div>

        <HelpCards emergencyContacts={emergencyContacts} />

        <div className="tip">
          <div className="tip__icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <p className="tip__text">Dúvidas? Estamos aqui para ajudar a tornar sua estadia ainda mais especial.</p>
        </div>

        <FarewellSection
          googleReviewUrl={property.google_review_url}
          instagramUrl={property.instagram_url}
        />

      </div>
    </section>
  );
}
