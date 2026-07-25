import type { ParkingInfo } from '../../types/roadbook-day'

interface ParkingSectionProps {
  parking: ParkingInfo
}

export function ParkingSection({ parking }: ParkingSectionProps) {
  const hasGps = parking.gps.latitude != null && parking.gps.longitude != null

  return (
    <div className="rb-parking">
      <span className="rb-parking__label">Parking</span>
      <div className="rb-parking__details">
        <span className="rb-parking__name">{parking.name}</span>
        <span className="rb-parking__confidence rb-parking__confidence--{parking.confidence.toLowerCase()}">
          {parking.confidence}
        </span>
        {hasGps && (
          <div className="rb-parking__gps">
            <span className="rb-parking__coords">
              {parking.gps.latitude}, {parking.gps.longitude}
            </span>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${parking.gps.latitude},${parking.gps.longitude}`}
              target="_blank"
              rel="noreferrer"
              className="rb-parking__nav-btn"
              aria-label={`Navigate to ${parking.name}`}
            >
              Open in Maps ↗
            </a>
          </div>
        )}
        {parking.notes && <p className="rb-parking__notes">{parking.notes}</p>}
      </div>
    </div>
  )
}
