import type { Stop } from '../../types/roadbook-day'

interface RegroupCardProps {
  stop: Stop
}

/**
 * RegroupCard renders for stops of type "regroup".
 * Shows meeting location, lunch options, charging, restrooms, decision point, weather.
 */
export function RegroupCard({ stop }: RegroupCardProps) {
  return (
    <section className="rb-card rb-regroup-card" aria-labelledby={`regroup-${stop.id}`}>
      <h3 className="rb-card__title" id={`regroup-${stop.id}`}>
        📍 {stop.title}
      </h3>

      <div className="rb-regroup-card__timing">
        <span>
          {stop.schedule.arrival}
          {stop.schedule.departure ? ` – ${stop.schedule.departure}` : ''}
        </span>
        {stop.schedule.stayMinutes != null && (
          <span className="rb-regroup-card__duration">{stop.schedule.stayMinutes} min</span>
        )}
      </div>

      {stop.regroupPurpose && stop.regroupPurpose.length > 0 && (
        <div className="rb-regroup-card__purpose">
          <span className="rb-regroup-card__label">Meeting Purpose</span>
          <ul className="rb-regroup-card__list">
            {stop.regroupPurpose.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {stop.preferred && (
        <div className="rb-regroup-card__lunch">
          <span className="rb-regroup-card__label">Lunch</span>
          <div className="rb-regroup-card__option">
            <strong>{stop.preferred.type}</strong>
            {stop.preferred.recommendation.length > 0 && (
              <ul>
                {stop.preferred.recommendation.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            )}
          </div>
          {stop.alternative && (
            <div className="rb-regroup-card__option rb-regroup-card__option--alt">
              <strong>Alternative: {stop.alternative.type}</strong>
              {stop.alternative.recommendation.reason.length > 0 && (
                <ul>
                  {stop.alternative.recommendation.reason.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}

      {stop.charging?.philosophy && (
        <div className="rb-regroup-card__charging">
          <span className="rb-regroup-card__label">Charging</span>
          <p>{stop.charging.philosophy}</p>
        </div>
      )}

      {stop.weather && (
        <div className="rb-regroup-card__weather">
          <span className="rb-regroup-card__label">Weather Alternative</span>
          <p>
            <strong>☀️</strong> {stop.weather.good}
          </p>
          <p>
            <strong>🌧️</strong> {stop.weather.rain}
          </p>
        </div>
      )}
    </section>
  )
}
