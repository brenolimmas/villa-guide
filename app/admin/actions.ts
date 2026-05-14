'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function saveChanges(formData: FormData) {
  const supabase = createAdminClient();
  const propertyId = formData.get('property_id') as string;
  const reservationId = formData.get('reservation_id') as string;
  const slug = formData.get('slug') as string;

  const errors: string[] = [];

  if (reservationId) {
    const { error } = await supabase
      .from('reservations')
      .update({
        guest_name:    formData.get('guest_name'),
        checkin_date:  formData.get('checkin_date'),
        checkout_date: formData.get('checkout_date'),
        guests_count:  Number(formData.get('guests_count')),
      })
      .eq('id', reservationId);
    if (error) errors.push('reserva: ' + error.message);
  }

  const propUpdate: Record<string, unknown> = {
    wifi_name: formData.get('wifi_name'),
    wifi_pass: formData.get('wifi_pass'),
  };
  if (formData.get('name'))            propUpdate.name             = formData.get('name');
  if (formData.get('location') != null) propUpdate.location        = formData.get('location');
  if (formData.get('hero_image') != null) propUpdate.hero_image    = formData.get('hero_image');
  if (formData.get('hero_badge_image') != null) propUpdate.hero_badge_image = formData.get('hero_badge_image');

  const { error: propError } = await supabase
    .from('properties')
    .update(propUpdate)
    .eq('id', propertyId);
  if (propError) errors.push('propriedade: ' + propError.message);

  revalidatePath(`/${slug}`);

  if (errors.length) {
    redirect(`/admin?slug=${slug}&error=${encodeURIComponent(errors.join('; '))}`);
  } else {
    redirect(`/admin?slug=${slug}&saved=1`);
  }
}

export async function addRule(formData: FormData) {
  const supabase = createAdminClient();
  const slug = formData.get('slug') as string;

  const { error } = await supabase.from('house_rules').insert({
    property_id: formData.get('property_id') as string,
    title:       formData.get('title') as string,
    description: (formData.get('description') as string) || null,
    category:    formData.get('category') as string,
    icon_svg:    (formData.get('icon_svg') as string) || null,
    sort_order:  Number(formData.get('sort_order') ?? 0),
  });

  revalidatePath(`/${slug}`);
  if (error) redirect(`/admin?slug=${slug}&error=${encodeURIComponent(error.message)}`);
  else redirect(`/admin?slug=${slug}&saved=1`);
}

export async function updateRule(formData: FormData) {
  const supabase = createAdminClient();
  const slug   = formData.get('slug') as string;
  const ruleId = formData.get('rule_id') as string;

  const { error } = await supabase.from('house_rules').update({
    title:       formData.get('title') as string,
    description: (formData.get('description') as string) || null,
    category:    formData.get('category') as string,
    icon_svg:    (formData.get('icon_svg') as string) || null,
  }).eq('id', ruleId);

  revalidatePath(`/${slug}`);
  if (error) redirect(`/admin?slug=${slug}&error=${encodeURIComponent(error.message)}`);
  else redirect(`/admin?slug=${slug}&saved=1`);
}

export async function reorderRules(
  orders: { id: string; sort_order: number }[],
  slug: string,
) {
  const supabase = createAdminClient();
  await Promise.all(
    orders.map(({ id, sort_order }) =>
      supabase.from('house_rules').update({ sort_order }).eq('id', id)
    )
  );
  revalidatePath(`/${slug}`);
}

export async function deleteRule(formData: FormData) {
  const supabase = createAdminClient();
  const slug   = formData.get('slug') as string;
  const ruleId = formData.get('rule_id') as string;

  const { error } = await supabase.from('house_rules').delete().eq('id', ruleId);

  revalidatePath(`/${slug}`);
  if (error) redirect(`/admin?slug=${slug}&error=${encodeURIComponent(error.message)}`);
  else redirect(`/admin?slug=${slug}&saved=1`);
}
