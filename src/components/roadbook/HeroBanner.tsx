import type { RoadbookDay } from '../../types/roadbook'

interface HeroBannerProps {
  day: RoadbookDay
}

export function HeroBanner({ day }: HeroBannerProps) {
  const { summary, route, dayNumber, date } = day

  return (
    <section className="roadbook-hero">
      <div className="roadbook-hero__overlay">
        <span className="roadbook-hero__eyebrow">
          DAY {String(dayNumber).padStart(2, '0')} · {formatDate(date)} · {summary.tripProgress}
        </span>
        <h1 className="roadbook-hero__title">{summary.title}</h1>
        <p className="roadbook-hero__subtitle">{summary.subtitle}</p>
        <div className="roadbook-hero__route">
          <span className="roadbook-hero__route-point">{route.start}</span>
          <span className="roadbook-hero__route-arrow">→</span>
          <span className="roadbook-hero__route-point">{route.end}</span>
        </div>
        <div className="roadbook-hero__stats">
          <div className="roadbook-hero__stat">
            <span className="roadbook-hero__stat-value">{summary.departureTime}</span>
            <span className="roadbook-hero__stat-label">Departure</span>
          </div>
          <div className="roadbook-hero__stat">
            <span className="roadbook-hero__stat-value">{summary.estimatedArrival}</span>
            <span className="roadbook-hero__stat-label">ETA</span>
          </div>
          <div className="roadbook-hero__stat">
            <span className="roadbook-hero__stat-value">{summary.distanceKm} km</span>
            <span className="roadbook-hero__stat-label">Distance</span>
          </div>
          <div className="roadbook-hero__stat">
            <span className="roadbook-hero__stat-value">{summary.drivingTime}</span>
            <span className="roadbook-hero__stat-label">Driving</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date(`${dateStr}T12:00:00`))
}
