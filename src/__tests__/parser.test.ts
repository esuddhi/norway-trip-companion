import { describe, it, expect } from 'vitest'
import { parseRoadbookYaml } from '../data/days/parser'

describe('parseRoadbookYaml', () => {
  it('parses valid YAML into RoadbookDayData', () => {
    const yaml = `
version: "1.0"
status: LOCKED
dayId: day-1
metadata:
  title: "Day 1"
  subtitle: "Test"
  theme: "Test Theme"
  date: "2026-07-26"
route:
  start:
    name: "A"
  destination:
    name: "B"
summary:
  departureTime: "06:30"
  targetArrival: "17:00"
  estimatedDrivingTime: "5h"
  plannedStopTime: "2h"
  totalTravelTime: "7h"
driver:
  dayType: "Transfer"
  chargingStrategy:
    philosophy: "Charge at breakfast"
    preferredLocation: "Vestby"
    backupLocations: []
    decisionRule: "Charge to 80%"
  notes:
    - "Test note"
navigator:
  regroupPoint: "Vestby"
  weatherReminder: "Check weather"
  chargingReminder: "Charge at Vestby"
  notes:
    - "Nav note"
stops:
  - id: departure
    sequence: 1
    type: departure
    fixed: true
    title: "Home"
    schedule:
      arrival: "06:30"
      departure: "06:30"
      stayMinutes: 0
arrival:
  accommodation: "Hotel"
  parking: "At hotel"
  eveningPlan:
    - "Check in"
  tomorrowPreparation: "Breakfast early"
`
    const result = parseRoadbookYaml(yaml)
    expect(result.dayId).toBe('day-1')
    expect(result.metadata.title).toBe('Day 1')
    expect(result.stops).toHaveLength(1)
    expect(result.stops[0].id).toBe('departure')
    expect(result.arrival.accommodation).toBe('Hotel')
  })

  it('throws on invalid YAML missing required fields', () => {
    expect(() => parseRoadbookYaml('invalid: true')).toThrow('Invalid roadbook YAML')
  })

  it('throws on empty input', () => {
    expect(() => parseRoadbookYaml('')).toThrow()
  })

  it('preserves optional sections when present', () => {
    const yaml = `
version: "1.0"
status: LOCKED
dayId: day-6
metadata:
  title: "Day 6"
  subtitle: "Heritage"
  theme: "Historic"
  date: "2026-07-31"
route:
  start:
    name: "A"
  destination:
    name: "B"
summary:
  departureTime: "09:00"
  targetArrival: "17:15"
  estimatedDrivingTime: "5h"
  plannedStopTime: "2h"
  totalTravelTime: "7h"
driver:
  dayType: "Scenic"
  chargingStrategy:
    philosophy: "test"
    preferredLocation: null
    backupLocations: []
    decisionRule: "test"
  notes: []
navigator:
  regroupPoint: "Borgund"
  weatherReminder: "test"
  chargingReminder: "test"
  notes: []
routeDecision:
  enabled: true
  selectedRoute: "Option A"
  recommendation: "Recommended"
  options:
    - id: optionA
      title: "Scenic Route"
      badge: "Recommended"
      selected: true
      pros:
        - "Beautiful"
      cons:
        - "Longer"
    - id: optionB
      title: "Direct Route"
      badge: "Alternative"
      selected: false
      pros:
        - "Faster"
      cons:
        - "Misses scenery"
stops:
  - id: departure
    sequence: 1
    type: departure
    fixed: true
    title: "Camp"
    schedule:
      arrival: "09:00"
      departure: "09:00"
      stayMinutes: 0
arrival:
  accommodation: "Destination"
  parking: "At place"
`
    const result = parseRoadbookYaml(yaml)
    expect(result.routeDecision).toBeDefined()
    expect(result.routeDecision!.enabled).toBe(true)
    expect(result.routeDecision!.options).toHaveLength(2)
  })
})
