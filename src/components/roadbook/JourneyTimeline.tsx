import type { JourneyItem } from '../../types/roadbook'

interface JourneyTimelineProps {
  journey: JourneyItem[]
}

const iconMap: Record<string, string> = {
  car: '🚗',
  bolt: '⚡',
  camera: '📷',
  sandwich: '🥪',
  coffee: '☕',
  home: '🏠',
  ferry: '⛴',
  hiking: '🥾',
  fuel: '⛽',
}

export function JourneyTimeline({ journey }: JourneyTimelineProps) {
  return (
    <section className="journey-timeline">
      <h2 className="journey-timeline__title">Today's Journey</h2>
      <div className="journey-timeline__track">
        {journey.map((item, index) => (
          <div className="journey-timeline__item" key={item.stopId}>
            <span className="journey-timeline__icon">{iconMap[item.icon] || '📍'}</span>
            <div className="journey-timeline__details">
              <span className="journey-timeline__time">{item.time}</span>
              <span className="journey-timeline__label">{item.title}</span>
            </div>
            {index < journey.length - 1 && (
              <div className="journey-timeline__connector" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
