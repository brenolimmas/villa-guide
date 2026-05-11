import type { Reservation } from '@/types/property';

interface Props {
  reservation: Reservation;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function ReservationCard({ reservation }: Props) {
  return (
    <div className="reservation">
      <div className="reservation__row">
        <div className="reservation__block">
          <span className="reservation__label">Check-in</span>
          <div className="reservation__block-row">
            <div className="reservation__icon reservation__icon--done" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div>
              <div className="reservation__date">{formatDate(reservation.checkin_date)}</div>
              <div className="reservation__time">15:00 (GMT-3)</div>
            </div>
          </div>
        </div>
        <div className="reservation__divider" aria-hidden="true"></div>
        <div className="reservation__block">
          <span className="reservation__label">Check-out</span>
          <div className="reservation__block-row">
            <div className="reservation__icon reservation__icon--out" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </div>
            <div>
              <div className="reservation__date">{formatDate(reservation.checkout_date)}</div>
              <div className="reservation__time">11:00 (GMT-3)</div>
            </div>
          </div>
        </div>
      </div>
      <div className="reservation__status">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        Tudo certo para sua estadia!
      </div>
    </div>
  );
}
