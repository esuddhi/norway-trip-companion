import { useState } from 'react'
import { Link } from 'react-router-dom'
import { allDays, getRoadbookDayByNumber } from '../../data/days'
import { DayPage } from './DayPage'

/**
 * RoadbookPage provides navigation between Day 1–7 and renders the DayPage for the selected day.
 */
export function RoadbookPage() {
  const [selectedDay, setSelectedDay] = useState(1)
  const day = getRoadbookDayByNumber(selectedDay)

  if (!day) {
    return (
      <div className="rb-error">
        <p>Day {selectedDay} not found.</p>
        <Link to="/">← Back to Dashboard</Link>
      </div>
    )
  }

  return (
    <div className="rb-roadbook">
      <nav className="rb-day-nav" aria-label="Day navigation">
        <div className="rb-day-nav__tabs" role="tablist">
          {allDays.map((d, index) => {
            const dayNum = index + 1
            return (
              <button
                key={d.dayId}
                className={`rb-day-nav__tab ${dayNum === selectedDay ? 'rb-day-nav__tab--active' : ''}`}
                onClick={() => setSelectedDay(dayNum)}
                role="tab"
                aria-selected={dayNum === selectedDay}
                aria-controls="day-content"
                aria-label={`Day ${dayNum}: ${d.metadata.title}`}
              >
                <span className="rb-day-nav__tab-number">{dayNum}</span>
                <span className="rb-day-nav__tab-title">{d.metadata.subtitle}</span>
              </button>
            )
          })}
        </div>

        <div className="rb-day-nav__arrows">
          <button
            className="rb-day-nav__arrow"
            onClick={() => setSelectedDay(Math.max(1, selectedDay - 1))}
            disabled={selectedDay === 1}
            aria-label="Previous day"
          >
            ← Prev
          </button>
          <span className="rb-day-nav__current">Day {selectedDay} of 7</span>
          <button
            className="rb-day-nav__arrow"
            onClick={() => setSelectedDay(Math.min(7, selectedDay + 1))}
            disabled={selectedDay === 7}
            aria-label="Next day"
          >
            Next →
          </button>
        </div>
      </nav>

      <div id="day-content" role="tabpanel" aria-label={`Day ${selectedDay} content`}>
        <DayPage day={day} />
      </div>
    </div>
  )
}
