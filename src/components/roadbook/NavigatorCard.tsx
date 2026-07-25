import type { NavigatorInfo } from '../../types/roadbook-day'

interface NavigatorCardProps {
  navigator: NavigatorInfo
}

export function NavigatorCard({ navigator }: NavigatorCardProps) {
  return (
    <section className="rb-card rb-navigator-card" aria-labelledby="navigator-card-title">
      <h2 className="rb-card__title" id="navigator-card-title">
        🧭 Navigator
      </h2>

      <div className="rb-navigator-card__grid">
        <div className="rb-navigator-card__item">
          <span className="rb-navigator-card__label">Regroup Point</span>
          <span className="rb-navigator-card__value">{navigator.regroupPoint}</span>
        </div>

        <div className="rb-navigator-card__item">
          <span className="rb-navigator-card__label">Weather</span>
          <span className="rb-navigator-card__value">{navigator.weatherReminder}</span>
        </div>

        <div className="rb-navigator-card__item">
          <span className="rb-navigator-card__label">Charging</span>
          <span className="rb-navigator-card__value">{navigator.chargingReminder}</span>
        </div>
      </div>

      {navigator.notes.length > 0 && (
        <div className="rb-navigator-card__notes">
          <span className="rb-navigator-card__label">Notes</span>
          <ul className="rb-navigator-card__notes-list">
            {navigator.notes.map((note) => (
              <li key={note} className="rb-navigator-card__note">
                {note}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
