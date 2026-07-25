import type { RoadbookDayData } from '../../types/roadbook-day'
import { generateTimelineEvents } from './timeline-utils'

interface TimelineProps {
  day: RoadbookDayData
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
