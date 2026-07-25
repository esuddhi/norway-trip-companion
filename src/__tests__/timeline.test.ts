import { describe, it, expect } from 'vitest'
import { generateTimelineEvents } from '../components/roadbook/Timeline'
import type { RoadbookDayData } from '../types/roadbook-day'

const mockDay: RoadbookDayData = {
  version: '1.0',
  status: 'LOCKED',
  dayId: 'day-1',
  metadata: { title: 'Day 1', subtitle: 'Test', theme: 'Test', date: '2026-07-26' },
  route: { start: { name: 'A' }, destination: { name: 'B' } },
  summary: {
    departureTime: '06:30',
    targetArrival: '17:00',
    estimatedDrivingTime: '5h',
    plannedStopTime: '2h',
    totalTravelTime: '7h',
  },
  driver: {
    dayType: 'Transfer',
    chargingStrategy: {
      philosophy: 'test',
      preferredLocation: null,
      backupLocations: [],
      decisionRule: 'test',
    },
    notes: [],
  },
  navigator: {
    regroupPoint: 'X',
    weatherReminder: 'test',
    chargingReminder: 'test',
    notes: [],
  },
  stops: [
    {
      id: 'departure',
      sequence: 1,
      type: 'departure',
      fixed: true,
      title: 'Home',
      schedule: { arrival: '06:30', departure: '06:30', stayMinutes: 0 },
    },
    {
      id: 'charging-1',
      sequence: 2,
      type: 'charging',
      fixed: true,
      title: 'Tesla Supercharger',
      schedule: { arrival: '08:40', departure: '09:05', stayMinutes: 25 },
    },
    {
      id: 'regroup-1',
      sequence: 3,
      type: 'regroup',
      fixed: true,
      title: 'Lunch Regroup',
      schedule: { arrival: '12:00', departure: '13:00', stayMinutes: 60 },
    },
    {
      id: 'hotel',
      sequence: 4,
      type: 'accommodation',
      fixed: true,
      title: 'Hotel',
      schedule: { arrival: '17:00', departure: null, stayMinutes: null },
    },
  ],
  arrival: { accommodation: 'Hotel', parking: 'At hotel', tomorrowPreparation: null },
}

describe('generateTimelineEvents', () => {
  it('generates events from stops', () => {
    const events = generateTimelineEvents(mockDay)
    expect(events).toHaveLength(4)
  })

  it('maps departure type correctly', () => {
    const events = generateTimelineEvents(mockDay)
    expect(events[0].type).toBe('departure')
    expect(events[0].time).toBe('06:30')
    expect(events[0].title).toBe('Home')
  })

  it('maps charging type correctly', () => {
    const events = generateTimelineEvents(mockDay)
    expect(events[1].type).toBe('charging')
    expect(events[1].duration).toBe('25 min')
  })

  it('maps regroup type correctly', () => {
    const events = generateTimelineEvents(mockDay)
    expect(events[2].type).toBe('regroup')
    expect(events[2].duration).toBe('60 min')
  })

  it('maps accommodation type correctly', () => {
    const events = generateTimelineEvents(mockDay)
    expect(events[3].type).toBe('accommodation')
    expect(events[3].duration).toBeUndefined()
  })

  it('assigns icons to all events', () => {
    const events = generateTimelineEvents(mockDay)
    events.forEach((event) => {
      expect(event.icon).toBeTruthy()
    })
  })
})
