import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPropertyPageData } from '@/lib/queries/property';
import { GuestGuide } from '@/components/template/GuestGuide';

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPropertyPageData(slug);
  if (!data) return {};
  return {
    title: `${data.property.name} — Hospedagem com Amor`,
    description: data.property.subtitle ?? 'Guia completo para a sua estadia perfeita.',
  };
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  const data = await getPropertyPageData(slug);
  if (!data) notFound();
  return <GuestGuide data={data} />;
}
