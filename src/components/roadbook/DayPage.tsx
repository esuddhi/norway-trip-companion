import type { RoadbookDayData } from '../../types/roadbook-day'
import { RoadbookHeader } from './RoadbookHeader'
import { DriverCard } from './DriverCard'
import { NavigatorCard } from './NavigatorCard'
import { RouteDecisionCard } from './RouteDecisionCard'
import { AccommodationCard } from './AccommodationCard'
import { Timeline } from './Timeline'
import { StopCard } from './StopCard'
import { ExperienceCard } from './ExperienceCard'
import { RegroupCard } from './RegroupCard'
import { ChargingCard } from './ChargingCard'
import { ArrivalCard } from './ArrivalCard'
import { RoadbookFooter } from './RoadbookFooter'

interface DayPageProps {
  day: RoadbookDayData
}

/**
 * DayPage is the main layout component for a single roadbook day.
 * Composes all cards in the correct order:
 *   Header → Driver → Navigator → RouteDecision (optional) → Timeline → Stops → Arrival → Footer
 *
 * No special cases except optional sections that conditionally render.
 */
export function DayPage({ day }: DayPageProps) {
  return (
    <div className="rb-day-page">
      <RoadbookHeader day={day} />

      <main className="rb-day-page__content">
        <DriverCard driver={day.driver} summary={day.summary} route={day.route} />

        <NavigatorCard navigator={day.navigator} />

        {/* Route Decision: only renders when enabled (Day 6) */}
        {day.routeDecision && <RouteDecisionCard routeDecision={day.routeDecision} />}

        {/* Accommodation info: only renders when present (Days 4-6) */}
        {day.accommodation && (
          <AccommodationCard accommodation={day.accommodation} booking={day.booking} />
        )}

        <Timeline day={day} />

        {/* Stops section */}
        <section className="rb-day-page__stops" aria-label="Stops">
          {day.stops.map((stop) => {
            // Use specialized card for regroup stops
            if (stop.type === 'regroup') {
              return <RegroupCard key={stop.id} stop={stop} />
            }
            // Use specialized card for charging stops
            if (stop.type === 'charging') {
              return (
                <div key={stop.id}>
                  <ChargingCard stop={stop} />
                </div>
              )
            }
            // Render experience card for attraction/experience stops with Signature/Major priority
            if (
              stop.experience &&
              (stop.experience.priority === 'Signature' || stop.experience.priority === 'Major')
            ) {
              return (
                <div key={stop.id}>
                  <ExperienceCard stop={stop} />
                  <StopCard stop={stop} />
                </div>
              )
            }
            // Default: use StopCard
            return <StopCard key={stop.id} stop={stop} />
          })}
        </section>

        <ArrivalCard arrival={day.arrival} tripSummary={day.tripSummary} />
      </main>

      <RoadbookFooter day={day} />
    </div>
  )
}
