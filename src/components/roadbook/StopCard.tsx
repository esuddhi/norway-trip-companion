import type { Stop } from '../../types/roadbook-day'
import { ParkingSection } from './ParkingSection'
import { WeatherSection } from './WeatherSection'

interface StopCardProps {
  stop: Stop
}

const typeIcons: Record<string, string> = {
  departure: '🏠',
  charging: '🔋',
  picnic: '🍱',
  viewpoint: '📍',
  village: '📍',
  fjord: '📍',
  attraction: '📍',
  meal: '🍱',
  ferryTerminal: '⛴',
  experience: '⛴',
  scenic: '📍',
  flexible: '📍',
  regroup: '🍱',
  scenicDrive: '🚗',
  drive: '🚗',
  accommodation: '🏡',
  destination: '🏡',
  optional: '📍',
}

/**
 * Determines context-aware timing labels based on stop type.
 *
 * - Departure: shows "Leave" only
 * - Accommodation/Destination: shows "Expected Arrival"
 * - Intermediate: shows "Arrive" / "Recommended Stay" / "Leave"
 * - Never shows Arrival + Departure when identical
 */
function getTimingDisplay(stop: Stop) {
  const { schedule, type } = stop
  const isDeparture = type === 'departure'
  const isAccommodation = type === 'accommodation' || type === 'destination'
  const arrivalAndDepartureIdentical =
    schedule.arrival && schedule.departure && schedule.arrival === schedule.departure

  if (isDeparture) {
    return [{ label: 'Leave', value: schedule.arrival }]
  }

  if (isAccommodation) {
    return [{ label: 'Expected Arrival', value: schedule.arrival }]
  }

  const items: { label: string; value: string }[] = []

  if (schedule.arrival && !arrivalAndDepartureIdentical) {
    items.push({ label: 'Arrive', value: schedule.arrival })
  }

  if (schedule.stayMinutes != null && schedule.stayMinutes > 0) {
    items.push({ label: 'Recommended Stay', value: `${schedule.stayMinutes} min` })
  }

  if (schedule.departure && !arrivalAndDepartureIdentical) {
    items.push({ label: 'Leave', value: schedule.departure })
  }

  // Fallback: if arrival === departure, just show "Arrive"
  if (arrivalAndDepartureIdentical) {
    items.unshift({ label: 'Arrive', value: schedule.arrival })
  }

  return items
}

export function StopCard({ stop }: StopCardProps) {
  const icon = typeIcons[stop.type] || '📍'
  const timing = getTimingDisplay(stop)

  return (
    <article
      className={`rb-stop-card rb-stop-card--${stop.type}`}
      aria-labelledby={`stop-${stop.id}`}
    >
      <div className="rb-stop-card__header">
        <span className="rb-stop-card__icon" aria-hidden="true">
          {icon}
        </span>
        <div className="rb-stop-card__title-group">
          <h3 className="rb-stop-card__title" id={`stop-${stop.id}`}>
            {stop.title}
          </h3>
          {stop.optional && <span className="rb-stop-card__badge">Optional</span>}
        </div>
      </div>

      {timing.length > 0 && (
        <div className="rb-stop-card__timing">
          {timing.map((t) => (
            <div key={t.label} className="rb-stop-card__time">
              <span className="rb-stop-card__time-label">{t.label}</span>
              <span className="rb-stop-card__time-value">{t.value}</span>
            </div>
          ))}
        </div>
      )}

      {stop.purpose && stop.purpose.length > 0 && (
        <div className="rb-stop-card__purpose">
          {stop.purpose.map((p) => (
            <span key={p} className="rb-stop-card__purpose-tag">
              {p}
            </span>
          ))}
        </div>
      )}

      {stop.navigation?.parking && <ParkingSection parking={stop.navigation.parking} />}

      {stop.weather && <WeatherSection weather={stop.weather} />}

      {stop.story && <p className="rb-stop-card__story">{stop.story}</p>}

      {stop.food?.recommendation && (
        <div className="rb-stop-card__food">
          <span className="rb-stop-card__section-label">Food</span>
          <p>{stop.food.recommendation}</p>
        </div>
      )}

      {stop.visitOnlyIf && stop.visitOnlyIf.length > 0 && (
        <div className="rb-stop-card__conditions">
          <span className="rb-stop-card__section-label">Visit only if</span>
          <ul>
            {stop.visitOnlyIf.map((condition) => (
              <li key={condition}>{condition}</li>
            ))}
          </ul>
        </div>
      )}

      {stop.beforeLeaving && stop.beforeLeaving.length > 0 && (
        <div className="rb-stop-card__before-leaving">
          <span className="rb-stop-card__section-label">Before Leaving</span>
          <ul>
            {stop.beforeLeaving.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}
