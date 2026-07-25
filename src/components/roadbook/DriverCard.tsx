import type { DriverInfo, DaySummary, DayRoute } from '../../types/roadbook-day'

interface DriverCardProps {
  driver: DriverInfo
  summary: DaySummary
  route: DayRoute
}

export function DriverCard({ driver, summary, route }: DriverCardProps) {
  const { chargingStrategy } = driver

  return (
    <section className="rb-card rb-driver-card" aria-labelledby="driver-card-title">
      <h2 className="rb-card__title" id="driver-card-title">
        🚗 Driver
      </h2>

      <div className="rb-driver-card__grid">
        <div className="rb-driver-card__item">
          <span className="rb-driver-card__label">Today's Goal</span>
          <span className="rb-driver-card__value rb-driver-card__value--hero">
            {driver.dayType}
          </span>
        </div>

        <div className="rb-driver-card__item">
          <span className="rb-driver-card__label">Drive Time</span>
          <span className="rb-driver-card__value rb-driver-card__value--hero">
            {summary.estimatedDrivingTime}
          </span>
        </div>

        <div className="rb-driver-card__item">
          <span className="rb-driver-card__label">Departure</span>
          <span className="rb-driver-card__value">
            {summary.departureTime} · {route.start.name}
          </span>
        </div>

        <div className="rb-driver-card__item">
          <span className="rb-driver-card__label">Destination</span>
          <span className="rb-driver-card__value">{route.destination.name}</span>
        </div>

        <div className="rb-driver-card__item rb-driver-card__item--full">
          <span className="rb-driver-card__label">Charging Strategy</span>
          <span className="rb-driver-card__value">{chargingStrategy.philosophy}</span>
        </div>

        <div className="rb-driver-card__item rb-driver-card__item--full">
          <span className="rb-driver-card__label">Decision Rule</span>
          <span className="rb-driver-card__value">{chargingStrategy.decisionRule}</span>
        </div>
      </div>

      {driver.notes.length > 0 && (
        <ul className="rb-driver-card__notes">
          {driver.notes.map((note) => (
            <li key={note} className="rb-driver-card__note">
              {note}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
