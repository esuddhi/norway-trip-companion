import type { ArrivalInfo, TripSummary } from '../../types/roadbook-day'

interface ArrivalCardProps {
  arrival: ArrivalInfo
  tripSummary?: TripSummary
}

/**
 * ArrivalCard renders the end-of-day arrival info.
 * Shows accommodation, parking, evening plan, and tomorrow preparation.
 * On Day 7, also shows the trip summary.
 */
export function ArrivalCard({ arrival, tripSummary }: ArrivalCardProps) {
  return (
    <section className="rb-card rb-arrival-card" aria-labelledby="arrival-card-title">
      <h2 className="rb-card__title" id="arrival-card-title">
        🏁 Arrival
      </h2>

      <div className="rb-arrival-card__details">
        <div className="rb-arrival-card__item">
          <span className="rb-arrival-card__label">Accommodation</span>
          <span className="rb-arrival-card__value">{arrival.accommodation}</span>
        </div>

        <div className="rb-arrival-card__item">
          <span className="rb-arrival-card__label">Parking</span>
          <span className="rb-arrival-card__value">{arrival.parking}</span>
        </div>
      </div>

      {arrival.eveningPlan && arrival.eveningPlan.length > 0 && (
        <div className="rb-arrival-card__evening">
          <span className="rb-arrival-card__label">Evening Plan</span>
          <ul className="rb-arrival-card__list">
            {arrival.eveningPlan.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {arrival.tomorrowPreparation && (
        <div className="rb-arrival-card__tomorrow">
          <span className="rb-arrival-card__label">Tomorrow</span>
          <p className="rb-arrival-card__value">{arrival.tomorrowPreparation}</p>
        </div>
      )}

      {tripSummary && (
        <div className="rb-arrival-card__trip-summary">
          <h3 className="rb-arrival-card__summary-title">🎉 {tripSummary.message}</h3>
          <ul className="rb-arrival-card__completed">
            {tripSummary.completed.map((day) => (
              <li key={day}>✓ {day}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
