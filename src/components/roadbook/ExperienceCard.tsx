import type { Stop } from '../../types/roadbook-day'

interface ExperienceCardProps {
  stop: Stop
}

/**
 * ExperienceCard renders only for stops with experience.priority of "Signature" or "Major".
 * Shows the experience details prominently.
 */
export function ExperienceCard({ stop }: ExperienceCardProps) {
  const { experience } = stop

  if (!experience) return null
  if (experience.priority !== 'Signature' && experience.priority !== 'Major') return null

  const isSignature = experience.priority === 'Signature'

  return (
    <section
      className={`rb-experience-card ${isSignature ? 'rb-experience-card--signature' : 'rb-experience-card--major'}`}
      aria-labelledby={`experience-${stop.id}`}
    >
      <div className="rb-experience-card__badge">
        {isSignature ? '⭐ Experience of the Day' : '🌟 Major Experience'}
      </div>
      <h3 className="rb-experience-card__title" id={`experience-${stop.id}`}>
        {stop.title}
      </h3>
      <p className="rb-experience-card__why">{experience.whyStopHere}</p>
      <div className="rb-experience-card__meta">
        <span className="rb-experience-card__memory">Memory: {experience.estimatedMemory}</span>
        {stop.schedule.stayMinutes != null && (
          <span className="rb-experience-card__duration">
            Recommended: {stop.schedule.stayMinutes} min
          </span>
        )}
      </div>

      {stop.purpose && stop.purpose.length > 0 && (
        <div className="rb-experience-card__purpose">
          {stop.purpose.map((p) => (
            <span key={p} className="rb-experience-card__purpose-tag">
              {p}
            </span>
          ))}
        </div>
      )}
    </section>
  )
}
