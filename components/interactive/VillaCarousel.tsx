'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { VillaSlide } from '@/types/property';

const AUTOPLAY_MS = 6000;

interface Props {
  slides: VillaSlide[];
}

export function VillaCarousel({ slides }: Props) {
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const indicatorEls = useRef<(HTMLButtonElement | null)[]>([]);
  const dragStartX = useRef(0);
  const isDragging = useRef(false);

  const goTo = useCallback((idx: number) => {
    const next = ((idx % slides.length) + slides.length) % slides.length;
    const prevFill = indicatorEls.current[currentRef.current]?.querySelector<HTMLElement>('.villa-indicator__fill');
    if (prevFill) {
      prevFill.style.animation = 'none';
      void prevFill.offsetHeight;
      prevFill.style.animation = '';
    }
    currentRef.current = next;
    setCurrent(next);
  }, [slides.length]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (slides.length < 2) return;
    timerRef.current = setInterval(() => goTo(currentRef.current + 1), AUTOPLAY_MS);
  }, [goTo, slides.length]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  if (!slides.length) return null;

  return (
    <div className="villa-card">
      <div className="villa-carousel">
        <div
          className="villa-carousel__track"
          id="js-villa-track"
          onPointerDown={e => {
            isDragging.current = true;
            dragStartX.current = e.clientX;
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          }}
          onPointerUp={e => {
            if (!isDragging.current) return;
            isDragging.current = false;
            const dx = e.clientX - dragStartX.current;
            if (Math.abs(dx) > 40) {
              goTo(dx < 0 ? currentRef.current + 1 : currentRef.current - 1);
              startTimer();
            }
          }}
          onPointerCancel={() => { isDragging.current = false; }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className={`villa-slide${i === current ? ' villa-slide--active' : ''}`}
              data-villa-slide=""
            >
              <img className="villa-slide__img" src={slide.image_url} alt={slide.caption_title ?? ''} draggable={false} />
              <div className="villa-slide__overlay" aria-hidden="true" />
              {(slide.caption_title || slide.caption_desc) && (
                <div className="villa-slide__caption">
                  {slide.caption_title && <p className="villa-slide__caption-title">{slide.caption_title}</p>}
                  {slide.caption_desc && <p className="villa-slide__caption-desc">{slide.caption_desc}</p>}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="villa-carousel__indicators" id="js-villa-indicators" aria-hidden="true">
          {slides.map((_, i) => (
            <button
              key={i}
              ref={el => { indicatorEls.current[i] = el; }}
              className={`villa-indicator${i === current ? ' villa-indicator--active' : ''}`}
              type="button"
              onClick={() => { goTo(i); startTimer(); }}
            >
              <div className="villa-indicator__fill" />
            </button>
          ))}
        </div>
      </div>

      <div className="villa-story">
        <div className="villa-story__accent" aria-hidden="true" />
        <p className="villa-story__eyebrow">Um espaço pensado para receber momentos especiais.</p>
        <p className="villa-story__text">Desde 2024, a Villa Mariz nasceu do sonho de uma família apaixonada por acolher bem. Cada detalhe do espaço foi pensado para proporcionar conforto, qualidade e tranquilidade aos nossos hóspedes.</p>
      </div>
    </div>
  );
}
