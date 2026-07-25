import { describe, expect, it } from 'vitest'
import { daysUntil, hotelFor, totalDistance } from './trip'
import { tripData } from '../data/trip'

describe('trip helpers', () => {
  it('calculates distance from the supplied itinerary', () =>
    expect(totalDistance(tripData)).toBe(1920))
  it('uses Gothenburg as the correct first-day departure', () =>
    expect(tripData.days[0]?.title).toBe('Gothenburg → Geilo'))
  it('finds a hotel by data relation', () =>
    expect(hotelFor(tripData, 'flatlandsmo')?.location).toBe('Voss'))
  it('does not return negative countdowns', () =>
    expect(daysUntil('2026-01-01', new Date('2026-02-01'))).toBe(0))
})
