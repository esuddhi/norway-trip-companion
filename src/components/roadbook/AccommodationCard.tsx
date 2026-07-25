import type { AccommodationInfo, BookingInfo } from '../../types/roadbook-day'

interface AccommodationCardProps {
  accommodation: AccommodationInfo
  booking?: BookingInfo
}

/**
 * AccommodationCard renders accommodation details for multi-night stays (Days 4-6).
 * Displays name, address, booking status, parking, and charging info.
 */
export function AccommodationCard({ accommodation, booking }: AccommodationCardProps) {
  return (
    <section className="rb-card rb-accommodation-card" aria-labelledby="accommodation-card-title">
      <h2 className="rb-card__title" id="accommodation-card-title">
        🏨 Accommodation
      </h2>

      <div className="rb-accommodation-card__details">
        <div className="rb-accommodation-card__item">
          <span className="rb-accommodation-card__label">Name</span>
          <span className="rb-accommodation-card__value">{accommodation.name}</span>
        </div>

        <div className="rb-accommodation-card__item">
          <span className="rb-accommodation-card__label">Address</span>
          <span className="rb-accommodation-card__value">{accommodation.address}</span>
        </div>

        {accommodation.booking && (
          <div className="rb-accommodation-card__item">
            <span className="rb-accommodation-card__label">Booking</span>
            <span className="rb-accommodation-card__value">
              {accommodation.booking.confirmed ? '✓ Confirmed' : 'Pending'}
              {accommodation.booking.checkIn && ` · Check-in: ${accommodation.booking.checkIn}`}
              {accommodation.booking.checkOut && ` · Check-out: ${accommodation.booking.checkOut}`}
            </span>
          </div>
        )}

        {accommodation.parking && (
          <div className="rb-accommodation-card__item">
            <span className="rb-accommodation-card__label">Parking</span>
            <span className="rb-accommodation-card__value">
              {accommodation.parking.name}
              {accommodation.parking.confidence && ` (${accommodation.parking.confidence})`}
            </span>
          </div>
        )}

        {accommodation.charging?.overnight && (
          <div className="rb-accommodation-card__item">
            <span className="rb-accommodation-card__label">Overnight Charging</span>
            <span className="rb-accommodation-card__value">
              {accommodation.charging.overnight.status}
            </span>
          </div>
        )}

        {accommodation.charging?.backup && accommodation.charging.backup.length > 0 && (
          <div className="rb-accommodation-card__item">
            <span className="rb-accommodation-card__label">Backup Charging</span>
            <span className="rb-accommodation-card__value">
              {accommodation.charging.backup.join(', ')}
            </span>
          </div>
        )}
      </div>

      {booking && (
        <div className="rb-accommodation-card__booking">
          <h3 className="rb-accommodation-card__booking-title">🎫 {booking.activity}</h3>
          <div className="rb-accommodation-card__booking-details">
            <div className="rb-accommodation-card__item">
              <span className="rb-accommodation-card__label">Status</span>
              <span className="rb-accommodation-card__value">{booking.confirmationStatus}</span>
            </div>
            <div className="rb-accommodation-card__item">
              <span className="rb-accommodation-card__label">Departure</span>
              <span className="rb-accommodation-card__value">{booking.departureTime}</span>
            </div>
            <div className="rb-accommodation-card__item">
              <span className="rb-accommodation-card__label">Arrive By</span>
              <span className="rb-accommodation-card__value">{booking.recommendedArrival}</span>
            </div>
            <div className="rb-accommodation-card__item">
              <span className="rb-accommodation-card__label">Boarding Buffer</span>
              <span className="rb-accommodation-card__value">{booking.boardingBuffer}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
