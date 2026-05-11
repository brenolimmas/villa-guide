import type { Property, Reservation } from '@/types/property';
import { ReservationCard } from '@/components/ui/ReservationCard';

interface Props {
  property: Property;
  reservation: Reservation | null;
}

export function HeroSection({ property, reservation }: Props) {
  return (
    <>
      <div className="hero">
        <img
          className="hero__img"
          src={property.hero_image ?? '/assets/villa-mariz-property.png'}
          alt={property.location ?? 'Villa'}
          loading="eager"
        />
        <div className="hero__gradient" aria-hidden="true"></div>

        {property.hero_badge_image && (
          <div className="hero__badge" aria-hidden="true">
            <img src={property.hero_badge_image} alt="" />
          </div>
        )}

        <div className="hero__content">
          <h1 className="hero__greeting">
            {reservation ? `Olá, ${reservation.guest_name.split(' ')[0]}!` : `Olá!`}
          </h1>
          <p className="hero__subtitle">Seja bem-vindo à {property.name}</p>
        </div>
      </div>

      {reservation && <ReservationCard reservation={reservation} />}
    </>
  );
}
