'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export function AdminToast() {
  const searchParams = useSearchParams();
  const router       = useRouter();
  const pathname     = usePathname();

  const [visible,  setVisible]  = useState(false);
  const [exiting,  setExiting]  = useState(false);
  const [type,     setType]     = useState<'success' | 'error'>('success');
  const [message,  setMessage]  = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const saved = searchParams.get('saved');
    const error = searchParams.get('error');
    const slug  = searchParams.get('slug');

    if (!saved && !error) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    setType(saved ? 'success' : 'error');
    setMessage(saved
      ? 'Salvo com sucesso — o site já foi atualizado.'
      : decodeURIComponent(error ?? 'Erro ao salvar.')
    );
    setVisible(true);
    setExiting(false);

    router.replace(`${pathname}${slug ? `?slug=${slug}` : ''}`, { scroll: false });

    timerRef.current = setTimeout(dismiss, 4000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  function dismiss() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setExiting(true);
    setTimeout(() => { setVisible(false); setExiting(false); }, 280);
  }

  if (!visible) return null;

  return (
    <div
      className={`admin-toast-float admin-toast-float--${type}${exiting ? ' admin-toast-float--exit' : ''}`}
      role="status"
      aria-live="polite"
    >
      <span className="admin-toast-float__icon">
        {type === 'success' ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        )}
      </span>
      <span className="admin-toast-float__msg">{message}</span>
      <button
        type="button"
        className="admin-toast-float__close"
        onClick={dismiss}
        aria-label="Fechar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  );
}
