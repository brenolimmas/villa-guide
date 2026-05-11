'use client';

import { useState } from 'react';
import type { VillaSlide } from '@/types/property';

interface Props {
  slides: VillaSlide[];
}

export function VillaCarousel({ slides }: Props) {
  const [current, setCurrent] = useState(0);

  if (!slides.length) return null;

  return (
    <div className="villa-card">
      <div className="villa-carousel">
        <div className="villa-carousel__track" id="js-villa-track">
          {slides.map((slide, i) => (
            <div key={slide.id} className={`villa-slide${i === current ? ' villa-slide--active' : ''}`} data-villa-slide>
              <img className="villa-slide__img" src={slide.image_url} alt={slide.caption_title ?? ''} draggable={false} />
              <div className="villa-slide__overlay" aria-hidden="true"></div>
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
              className={`villa-indicator${i === current ? ' villa-indicator--active' : ''}`}
              onClick={() => setCurrent(i)}
            >
              <div className="villa-indicator__fill"></div>
            </button>
          ))}
        </div>
      </div>

      <div className="villa-story">
        <div className="villa-story__accent" aria-hidden="true"></div>
        <p className="villa-story__eyebrow">Um espaço pensado para receber momentos especiais.</p>
        <p className="villa-story__text">Desde 2024, a Villa Mariz nasceu do sonho de uma família apaixonada por acolher bem. Cada detalhe do espaço foi pensado para proporcionar conforto, qualidade e tranquilidade aos nossos hóspedes.</p>
      </div>
    </div>
  );
}
