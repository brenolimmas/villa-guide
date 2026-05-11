import type { Metadata, Viewport } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: 'Villa Mariz — Hospedagem com Amor',
  description: 'Guia completo para a sua estadia perfeita na Villa Mariz.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Villa Mariz',
  },
  openGraph: {
    type: 'website',
    title: 'Villa Mariz — Hospedagem com Amor',
    description: 'Tudo que você precisa para uma estadia perfeita.',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={dmSans.variable}>
      <body>{children}</body>
    </html>
  );
}
