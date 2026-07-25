import type { Stop, RoadbookDayData } from '../../types/roadbook-day'

interface TimelineProps {
  day: RoadbookDayData
}

export interface TimelineEvent {
  id: string
  time: string
  title: string
  type: 'departure' | 'arrival' | 'driving' | 'regroup' | 'charging' | 'accommodation' | 'stop'
  icon: string
  duration?: string
}

const typeToTimelineType: Record<string, TimelineEvent['type']> = {
  departure: 'departure',
  charging: 'charging',
  regroup: 'regroup',
  accommodation: 'accommodation',
  destination: 'arrival',
  drive: 'driving',
  scenicDrive: 'driving',
}

/**
 * Sprint 2 icons:
 * 🏠 Departure  📍 Attraction  🍱 Regroup  🔋 Charging  ⛴ Ferry  🏡 Accommodation
 */
const typeIcons: Record<string, string> = {
  departure: '🏠',
  charging: '🔋',
  regroup: '🍱',
  accommodation: '🏡',
  arrival: '🏡',
  driving: '🚗',
  stop: '📍',
}

const stopTypeToIcon: Record<string, string> = {
  ferryTerminal: '⛴',
  experience: '⛴',
  viewpoint: '📍',
  attraction: '📍',
  picnic: '🍱',
  village: '📍',
  fjord: '📍',
  scenic: '📍',
  flexible: '📍',
  optional: '📍',
  meal: '🍱',
}

/**
 * Generate timeline events from the day's stops.
 * Exported for testability.
 */
export function generateTimelineEvents(day: RoadbookDayData): TimelineEvent[] {
  return day.stops.map((stop: Stop) => {
    const timelineType = typeToTimelineType[stop.type] || 'stop'
    const icon = stopTypeToIcon[stop.type] || typeIcons[timelineType]
    return {
      id: stop.id,
      time: stop.schedule.arrival,
      title: stop.title,
      type: timelineType,
      icon,
      duration:
        stop.schedule.stayMinutes != null && stop.schedule.stayMinutes > 0
          ? `${stop.schedule.stayMinutes} min`
          : undefined,
    }
  })
}

export function Timeline({ day }: TimelineProps) {
  const events = generateTimelineEvents(day)

  return (
    <section className="rb-timeline" aria-labelledby="timeline-title">
      <h2 className="rb-card__title" id="timeline-title">
        📅 Timeline
      </h2>
      <div className="rb-timeline__track">
        {events.map((event, index) => (
          <div
            key={event.id}
            className={`rb-timeline__event rb-timeline__event--${event.type}`}
          >
            <div className="rb-timeline__connector-area">
              <span className="rb-timeline__icon" aria-hidden="true">
                {event.icon}
              </span>
              {index < events.length - 1 && (
                <div className="rb-timeline__line" aria-hidden="true" />
              )}
            </div>
            <div className="rb-timeline__content">
              <span className="rb-timeline__time">{event.time}</span>
              <span className="rb-timeline__title">{event.title}</span>
              {event.duration && (
                <>
                  <span className="rb-timeline__recommended-stay">Recommended Stay</span>
                  <span className="rb-timeline__duration">{event.duration}</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
