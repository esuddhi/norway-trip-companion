import type { Stop } from '../../types/roadbook-day'

interface ChargingCardProps {
  stop: Stop
}

/**
 * ChargingCard renders for stops of type "charging".
 * Displays strategy, preferred/backup locations, and charging details.
 */
export function ChargingCard({ stop }: ChargingCardProps) {
  const { charging } = stop

  return (
    <section className="rb-card rb-charging-card" aria-labelledby={`charging-${stop.id}`}>
      <h3 className="rb-card__title" id={`charging-${stop.id}`}>
        ⚡ {stop.title}
      </h3>

      <div className="rb-charging-card__timing">
        <span>
          {stop.schedule.arrival}
          {stop.schedule.departure ? ` – ${stop.schedule.departure}` : ''}
        </span>
        {stop.schedule.stayMinutes != null && (
          <span className="rb-charging-card__duration">{stop.schedule.stayMinutes} min</span>
        )}
      </div>

      {stop.strategy && (
        <div className="rb-charging-card__strategy">
          <span className="rb-charging-card__label">Strategy</span>
          <p>{stop.strategy}</p>
        </div>
      )}

      {charging && (
        <div className="rb-charging-card__details">
          {charging.network && (
            <div className="rb-charging-card__item">
              <span className="rb-charging-card__label">Network</span>
              <span className="rb-charging-card__value">{charging.network}</span>
            </div>
          )}
          {charging.maxPowerKW != null && (
            <div className="rb-charging-card__item">
              <span className="rb-charging-card__label">Max Power</span>
              <span className="rb-charging-card__value">{charging.maxPowerKW} kW</span>
            </div>
          )}
          {charging.stalls != null && (
            <div className="rb-charging-card__item">
              <span className="rb-charging-card__label">Stalls</span>
              <span className="rb-charging-card__value">{charging.stalls}</span>
            </div>
          )}
          {charging.arrivalSOC != null && charging.departureSOC != null && (
            <div className="rb-charging-card__item">
              <span className="rb-charging-card__label">SOC</span>
              <span className="rb-charging-card__value">
                {charging.arrivalSOC}% → {charging.departureSOC}%
              </span>
            </div>
          )}
          {charging.estimatedChargeMinutes != null && (
            <div className="rb-charging-card__item">
              <span className="rb-charging-card__label">Est. Time</span>
              <span className="rb-charging-card__value">
                {charging.estimatedChargeMinutes} min
              </span>
            </div>
          )}
          {charging.compatible && charging.compatible.length > 0 && (
            <div className="rb-charging-card__item rb-charging-card__item--full">
              <span className="rb-charging-card__label">Compatible</span>
              <span className="rb-charging-card__value">
                {charging.compatible.join(', ')}
              </span>
            </div>
          )}
        </div>
      )}

      {stop.purpose && stop.purpose.length > 0 && (
        <div className="rb-charging-card__purpose">
          {stop.purpose.map((p) => (
            <span key={p} className="rb-charging-card__purpose-tag">
              {p}
            </span>
          ))}
        </div>
      )}
    </section>
  )
}
