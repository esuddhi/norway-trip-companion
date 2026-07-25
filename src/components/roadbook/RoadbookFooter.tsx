import type { RoadbookDayData } from '../../types/roadbook-day'

interface RoadbookFooterProps {
  day: RoadbookDayData
  totalDays?: number
}

export function RoadbookFooter({ day, totalDays = 7 }: RoadbookFooterProps) {
  const dayNumber = parseInt(day.dayId.replace('day-', ''), 10)

  return (
    <footer className="rb-footer">
      {day.passingHighlights && day.passingHighlights.length > 0 && (
        <div className="rb-footer__highlights">
          <h3 className="rb-footer__section-title">Passing Highlights</h3>
          <ul className="rb-footer__list">
            {day.passingHighlights.map((highlight) => (
              <li key={highlight} className="rb-footer__list-item">
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      )}

      {day.decisionPoints && day.decisionPoints.length > 0 && (
        <div className="rb-footer__decisions">
          <h3 className="rb-footer__section-title">Decision Points</h3>
          {day.decisionPoints.map((dp) => (
            <div key={dp.id} className="rb-footer__decision">
              <span className="rb-footer__decision-trigger">{dp.trigger}</span>
              {dp.ifGood && (
                <p className="rb-footer__decision-option">
                  <strong>Good weather:</strong> {dp.ifGood}
                </p>
              )}
              {dp.ifRain && (
                <p className="rb-footer__decision-option">
                  <strong>Rain:</strong> {dp.ifRain}
                </p>
              )}
              {dp.ifBatteryAbove50 && (
                <p className="rb-footer__decision-option">
                  <strong>Battery &gt; 50%:</strong> {dp.ifBatteryAbove50}
                </p>
              )}
              {dp.ifBatteryAbove60 && (
                <p className="rb-footer__decision-option">
                  <strong>Battery &gt; 60%:</strong> {dp.ifBatteryAbove60}
                </p>
              )}
              {dp.otherwise && (
                <p className="rb-footer__decision-option">
                  <strong>Otherwise:</strong> {dp.otherwise}
                </p>
              )}
              {dp.ifNeeded && (
                <p className="rb-footer__decision-option">
                  <strong>If needed:</strong> {dp.ifNeeded}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="rb-footer__nav">
        <span className="rb-footer__progress">
          Day {dayNumber} of {totalDays}
        </span>
      </div>
    </footer>
  )
}
