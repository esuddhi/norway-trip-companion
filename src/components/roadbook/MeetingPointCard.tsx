import type { MeetingPoint, Parking } from '../../types/roadbook'

interface MeetingPointCardProps {
  meetingPoint: MeetingPoint
  parking?: Parking
  plannedArrival: string
  recommendedStayMinutes?: number | 'overnight'
}

export function MeetingPointCard({
  meetingPoint,
  parking,
  plannedArrival,
  recommendedStayMinutes,
}: MeetingPointCardProps) {
  return (
    <div className="meeting-point-card">
      <div className="meeting-point-card__header">
        <span className="meeting-point-card__icon">📍</span>
        <div>
          <h4 className="meeting-point-card__name">{meetingPoint.name}</h4>
          <p className="meeting-point-card__purpose">{meetingPoint.purpose}</p>
        </div>
      </div>

      <div className="meeting-point-card__details">
        <div className="meeting-point-card__detail">
          <span className="meeting-point-card__label">Arrival window</span>
          <span className="meeting-point-card__value">
            {meetingPoint.meetingWindow || plannedArrival}
          </span>
        </div>

        {recommendedStayMinutes !== undefined && (
          <div className="meeting-point-card__detail">
            <span className="meeting-point-card__label">Recommended stay</span>
            <span className="meeting-point-card__value">
              {recommendedStayMinutes === 'overnight'
                ? 'Overnight'
                : `${recommendedStayMinutes} min`}
            </span>
          </div>
        )}

        {meetingPoint.nextMeetingPoint && (
          <div className="meeting-point-card__detail">
            <span className="meeting-point-card__label">Next meeting point</span>
            <span className="meeting-point-card__value">{meetingPoint.nextMeetingPoint}</span>
          </div>
        )}
      </div>

      {parking && parking.name && (
        <div className="meeting-point-card__parking">
          <span className="meeting-point-card__label">Parking</span>
          <span className="meeting-point-card__parking-name">{parking.name}</span>
          {parking.walkingDistanceMeters !== undefined && parking.walkingDistanceMeters > 0 && (
            <span className="meeting-point-card__walking">
              {parking.walkingDistanceMeters}m walk
              {parking.walkingTimeMinutes ? ` · ${parking.walkingTimeMinutes} min` : ''}
            </span>
          )}
          <div className="meeting-point-card__nav-buttons">
            {parking.googleMapsUrl && (
              <a
                href={parking.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="meeting-point-card__nav-btn"
                aria-label="Open in Google Maps"
              >
                Google Maps ↗
              </a>
            )}
            {parking.appleMapsUrl && (
              <a
                href={parking.appleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="meeting-point-card__nav-btn"
                aria-label="Open in Apple Maps"
              >
                Apple Maps ↗
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
