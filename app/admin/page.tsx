import { Suspense } from 'react';
import { createAdminClient } from '@/lib/supabase/admin';
import { saveChanges } from './actions';
import { LocationSelect } from './LocationSelect';
import { HouseRulesManager } from './HouseRulesManager';
import { VillaSlidesManager } from './VillaSlidesManager';
import { FaqManager } from './FaqManager';
import { CollapsibleCard } from './CollapsibleCard';
import { AdminToast } from './AdminToast';
import './admin.css';

interface PageProps {
  searchParams: Promise<{ slug?: string; saved?: string; error?: string }>;
}

const DEFAULT_SLUG = 'villa-mariz';

export default async function AdminPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const slug = params.slug ?? DEFAULT_SLUG;

  const supabase = createAdminClient();

  const { data: property, error: propError } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', slug)
    .single();

  if (propError || !property) {
    return (
      <div style={{ fontFamily: 'sans-serif', padding: 40 }}>
        <h2>Erro ao carregar &quot;{slug}&quot;</h2>
        {propError && <pre style={{ background: '#fee', padding: 12, marginTop: 12, borderRadius: 6, fontSize: 13 }}>{JSON.stringify(propError, null, 2)}</pre>}
      </div>
    );
  }

  const { data: reservation } = await supabase
    .from('reservations')
    .select('*')
    .eq('property_id', property.id)
    .eq('active', true)
    .maybeSingle();

  const { data: rules } = await supabase
    .from('house_rules')
    .select('*')
    .eq('property_id', property.id)
    .order('sort_order');

  const { data: slides } = await supabase
    .from('villa_slides')
    .select('*')
    .eq('property_id', property.id)
    .order('sort_order');

  const { data: faqs } = await supabase
    .from('faqs')
    .select('*, faq_steps(*)')
    .eq('property_id', property.id)
    .order('sort_order');

  return (
    <div className="admin-page">

      {/* Header */}
      <header className="admin-header">
        <a href="/admin" className="admin-header__logo">
          <span className="admin-header__icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9.75L12 3l9 6.75V21a.75.75 0 0 1-.75.75H3.75A.75.75 0 0 1 3 21V9.75z"/>
              <path d="M9 21V12h6v9"/>
            </svg>
          </span>
          <span className="admin-header__wordmark">Villa Guide</span>
        </a>
        <span className="admin-header__divider" />
        <span className="admin-header__property">{property.name}</span>
        <span className="admin-header__spacer" />
        <a href={`/${slug}`} target="_blank" className="admin-header__preview">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          Ver site
        </a>
      </header>

      {/* Body */}
      <main className="admin-body">

        <Suspense>
          <AdminToast />
        </Suspense>

        <div className="admin-section">
          <h2 className="admin-section__title">Informações essenciais</h2>

        <form action={saveChanges}>
          <input type="hidden" name="property_id" value={property.id} />
          <input type="hidden" name="slug" value={slug} />
          {reservation && <input type="hidden" name="reservation_id" value={reservation.id} />}

          {/* Card: Informações gerais */}
          <CollapsibleCard
            title="Informações gerais"
            subtitle="Nome, visual e localização do imóvel"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9.75L12 3l9 6.75V21a.75.75 0 0 1-.75.75H3.75A.75.75 0 0 1 3 21V9.75z"/>
                <path d="M9 21V12h6v9"/>
              </svg>
            }
          >
            <div className="admin-card__body">
              <div className="admin-field">
                <label className="admin-field__label">Nome do local</label>
                <input className="admin-field__input" name="name" defaultValue={property.name} placeholder="Ex: Villa Mariz" />
              </div>
              <div className="admin-field">
                <label className="admin-field__label">Localização</label>
                <LocationSelect defaultValue={property.location ?? ''} />
              </div>
              <div className="admin-field">
                <label className="admin-field__label">URL da foto principal (hero)</label>
                <input className="admin-field__input" name="hero_image" defaultValue={property.hero_image ?? ''} placeholder="https://…" />
              </div>
              <div className="admin-field">
                <label className="admin-field__label">URL do logo / badge</label>
                <input className="admin-field__input" name="hero_badge_image" defaultValue={property.hero_badge_image ?? ''} placeholder="https://…" />
                {property.hero_badge_image && (
                  <img src={property.hero_badge_image} alt="logo preview" className="admin-img-preview" />
                )}
              </div>
            </div>
            <div className="admin-footer">
              <span className="admin-hint">Aparece no hero e no cabeçalho do guia</span>
              <button type="submit" className="admin-btn-save">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                  <polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
                </svg>
                Salvar
              </button>
            </div>
          </CollapsibleCard>

          {/* Card: Hóspede */}
          <CollapsibleCard
            title="Hóspede atual"
            subtitle="Dados da reserva ativa"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            }
          >
            <div className="admin-card__body">
              <div className="admin-field">
                <label className="admin-field__label">Nome do hóspede</label>
                <input className="admin-field__input" name="guest_name" defaultValue={reservation?.guest_name ?? ''} placeholder="Nome completo" />
              </div>
              <div className="admin-field-row">
                <div className="admin-field">
                  <label className="admin-field__label">Check-in</label>
                  <input className="admin-field__input" type="date" name="checkin_date" defaultValue={reservation?.checkin_date ?? ''} />
                </div>
                <div className="admin-field">
                  <label className="admin-field__label">Check-out</label>
                  <input className="admin-field__input" type="date" name="checkout_date" defaultValue={reservation?.checkout_date ?? ''} />
                </div>
              </div>
              <div className="admin-field">
                <label className="admin-field__label">Nº de hóspedes</label>
                <input className="admin-field__input" type="number" name="guests_count" min={1} defaultValue={reservation?.guests_count ?? 1} />
              </div>
            </div>
            <div className="admin-footer">
              <span className="admin-hint">Atualiza o contador de dias e o nome no site</span>
              <button type="submit" className="admin-btn-save">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                  <polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
                </svg>
                Salvar
              </button>
            </div>
          </CollapsibleCard>

          {/* Card: Wi-Fi */}
          <CollapsibleCard
            title="Wi-Fi"
            subtitle="Credenciais exibidas no painel do hóspede"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
                <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
                <line x1="12" y1="20" x2="12.01" y2="20"/>
              </svg>
            }
          >
            <div className="admin-card__body">
              <div className="admin-field">
                <label className="admin-field__label">Nome da rede (SSID)</label>
                <input className="admin-field__input" name="wifi_name" defaultValue={property.wifi_name ?? ''} placeholder="Nome da rede" />
              </div>
              <div className="admin-field">
                <label className="admin-field__label">Senha</label>
                <input className="admin-field__input" name="wifi_pass" defaultValue={property.wifi_pass ?? ''} placeholder="Senha do Wi-Fi" />
              </div>
            </div>
            <div className="admin-footer">
              <span className="admin-hint">Hóspede consegue copiar a senha com um toque</span>
              <button type="submit" className="admin-btn-save">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                  <polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
                </svg>
                Salvar
              </button>
            </div>
          </CollapsibleCard>

        </form>
        </div>

        <div className="admin-section">
          <h2 className="admin-section__title">Minha hospedagem</h2>
          <HouseRulesManager
            rules={rules ?? []}
            propertyId={property.id}
            slug={slug}
          />
          <VillaSlidesManager
            slides={slides ?? []}
            propertyId={property.id}
            slug={slug}
            storyEyebrow={property.villa_story_eyebrow ?? ''}
            storyText={property.villa_story_text ?? ''}
          />
          <FaqManager
            faqs={faqs ?? []}
            propertyId={property.id}
            slug={slug}
          />
        </div>

      </main>
    </div>
  );
}
