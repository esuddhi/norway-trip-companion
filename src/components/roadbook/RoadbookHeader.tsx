import type { RoadbookDayData } from '../../types/roadbook-day'

interface RoadbookHeaderProps {
  day: RoadbookDayData
}

export function RoadbookHeader({ day }: RoadbookHeaderProps) {
  const { metadata, route, summary } = day
  const dayNumber = day.dayId.replace('day-', '')

  return (
    <header className="rb-header">
      <span className="rb-header__eyebrow">
        Day {dayNumber} · {metadata.theme}
      </span>
      <h1 className="rb-header__title">{metadata.subtitle}</h1>
      <div className="rb-header__route">
        <span className="rb-header__route-point">{route.start.name}</span>
        <span className="rb-header__route-arrow" aria-hidden="true">→</span>
        <span className="rb-header__route-point">{route.destination.name}</span>
      </div>
      <div className="rb-header__stats">
        <div className="rb-header__stat">
          <span className="rb-header__stat-value">{summary.departureTime}</span>
          <span className="rb-header__stat-label">Departure</span>
        </div>
        <div className="rb-header__stat">
          <span className="rb-header__stat-value">{summary.estimatedDrivingTime}</span>
          <span className="rb-header__stat-label">Drive Time</span>
        </div>
        <div className="rb-header__stat">
          <span className="rb-header__stat-value">{summary.targetArrival}</span>
          <span className="rb-header__stat-label">Arrival</span>
        </div>
        {summary.distanceKm && (
          <div className="rb-header__stat">
            <span className="rb-header__stat-value">{summary.distanceKm} km</span>
            <span className="rb-header__stat-label">Distance</span>
          </div>
        )}
      </div>
    </header>
  )
}
