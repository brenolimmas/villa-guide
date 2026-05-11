import { createServerClient } from '@/lib/supabase/server';
import type { PropertyPageData } from '@/types/property';

export async function getPropertyPageData(slug: string): Promise<PropertyPageData | null> {
  const supabase = await createServerClient();

  const { data: property, error: propError } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', slug)
    .single();

  if (propError || !property) return null;

  const [rules, faqs, slides, commerce, routes, services, contacts, reservation] =
    await Promise.all([
      supabase
        .from('house_rules')
        .select('*')
        .eq('property_id', property.id)
        .order('sort_order'),
      supabase
        .from('faqs')
        .select('*, faq_steps(*)')
        .eq('property_id', property.id)
        .order('sort_order'),
      supabase
        .from('villa_slides')
        .select('*')
        .eq('property_id', property.id)
        .order('sort_order'),
      supabase
        .from('commerce_places')
        .select('*, commerce_hours(*)')
        .eq('property_id', property.id)
        .order('sort_order'),
      supabase
        .from('routes')
        .select('*')
        .eq('property_id', property.id)
        .order('sort_order'),
      supabase
        .from('services')
        .select('*')
        .eq('property_id', property.id)
        .order('sort_order'),
      supabase
        .from('emergency_contacts')
        .select('*')
        .eq('property_id', property.id)
        .order('sort_order'),
      supabase
        .from('reservations')
        .select('*')
        .eq('property_id', property.id)
        .eq('active', true)
        .maybeSingle(),
    ]);

  return {
    property,
    reservation: reservation.data ?? null,
    rules: rules.data ?? [],
    faqs: faqs.data ?? [],
    villa_slides: slides.data ?? [],
    commerce: commerce.data ?? [],
    routes: routes.data ?? [],
    services: services.data ?? [],
    emergency_contacts: contacts.data ?? [],
  };
}
