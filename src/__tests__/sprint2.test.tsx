import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StopCard } from '../components/roadbook/StopCard'
import { Timeline } from '../components/roadbook/Timeline'
import { RoadbookPage } from '../components/roadbook/RoadbookPage'
import type { Stop, RoadbookDayData } from '../types/roadbook-day'
import { allDays } from '../data/days'

describe('Sprint 2: Arrival/Departure Terminology', () => {
  it('departure stops show "Leave" label', () => {
    const stop: Stop = {
      id: 'dep',
      sequence: 1,
      type: 'departure',
      fixed: true,
      title: 'Home',
      schedule: { arrival: '06:30', departure: '06:30', stayMinutes: 0 },
    }
    render(<StopCard stop={stop} />)
    expect(screen.getByText('Leave')).toBeInTheDocument()
    expect(screen.queryByText('Arrival')).not.toBeInTheDocument()
    expect(screen.queryByText('Departure')).not.toBeInTheDocument()
  })

  it('accommodation stops show "Expected Arrival" label', () => {
    const stop: Stop = {
      id: 'hotel',
      sequence: 5,
      type: 'accommodation',
      fixed: true,
      title: 'Hotel Geilo',
      schedule: { arrival: '16:45', departure: null, stayMinutes: null },
    }
    render(<StopCard stop={stop} />)
    expect(screen.getByText('Expected Arrival')).toBeInTheDocument()
  })

  it('intermediate stops show Arrive / Recommended Stay / Leave', () => {
    const stop: Stop = {
      id: 'vestby',
      sequence: 2,
      type: 'charging',
      fixed: true,
      title: 'Tesla Supercharger',
      schedule: { arrival: '08:40', departure: '09:05', stayMinutes: 25 },
    }
    render(<StopCard stop={stop} />)
    expect(screen.getByText('Arrive')).toBeInTheDocument()
    expect(screen.getByText('Recommended Stay')).toBeInTheDocument()
    expect(screen.getByText('25 min')).toBeInTheDocument()
    expect(screen.getByText('Leave')).toBeInTheDocument()
  })

  it('never shows Arrival and Departure when identical', () => {
    const stop: Stop = {
      id: 'dep',
      sequence: 1,
      type: 'departure',
      fixed: true,
      title: 'Start',
      schedule: { arrival: '06:30', departure: '06:30', stayMinutes: 0 },
    }
    render(<StopCard stop={stop} />)
    // Should NOT show "06:30" twice
    const timeValues = screen.getAllByText('06:30')
    expect(timeValues.length).toBe(1)
  })
})

describe('Sprint 2: Timeline Recommended Stay', () => {
  it('shows "Recommended Stay" label in timeline for stops with duration', () => {
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
        chargingStrategy: { philosophy: 'test', preferredLocation: null, backupLocations: [], decisionRule: 'test' },
        notes: [],
      },
      navigator: { regroupPoint: 'X', weatherReminder: 'test', chargingReminder: 'test', notes: [] },
      stops: [
        { id: 'dep', sequence: 1, type: 'departure', fixed: true, title: 'Home', schedule: { arrival: '06:30', departure: '06:30', stayMinutes: 0 } },
        { id: 'stop1', sequence: 2, type: 'viewpoint', fixed: true, title: 'Stegastein Viewpoint', schedule: { arrival: '09:30', departure: '09:55', stayMinutes: 25 } },
      ],
      arrival: { accommodation: 'Hotel', parking: 'At hotel', tomorrowPreparation: null },
    }
    render(<Timeline day={mockDay} />)
    expect(screen.getByText('Stegastein Viewpoint')).toBeInTheDocument()
    expect(screen.getByText('Recommended Stay')).toBeInTheDocument()
    expect(screen.getByText('25 min')).toBeInTheDocument()
  })

  it('does NOT show "Recommended Stay" for departure (0 min stay)', () => {
    const mockDay: RoadbookDayData = {
      version: '1.0',
      status: 'LOCKED',
      dayId: 'day-1',
      metadata: { title: 'Day 1', subtitle: 'Test', theme: 'Test', date: '2026-07-26' },
      route: { start: { name: 'A' }, destination: { name: 'B' } },
      summary: { departureTime: '06:30', targetArrival: '17:00', estimatedDrivingTime: '5h', plannedStopTime: '2h', totalTravelTime: '7h' },
      driver: { dayType: 'Transfer', chargingStrategy: { philosophy: 'test', preferredLocation: null, backupLocations: [], decisionRule: 'test' }, notes: [] },
      navigator: { regroupPoint: 'X', weatherReminder: 'test', chargingReminder: 'test', notes: [] },
      stops: [
        { id: 'dep', sequence: 1, type: 'departure', fixed: true, title: 'Home', schedule: { arrival: '06:30', departure: '06:30', stayMinutes: 0 } },
      ],
      arrival: { accommodation: 'Hotel', parking: 'At hotel', tomorrowPreparation: null },
    }
    render(<Timeline day={mockDay} />)
    expect(screen.queryByText('Recommended Stay')).not.toBeInTheDocument()
  })
})

describe('Sprint 2: Mobile Navigation', () => {
  it('renders day selector with all 7 days', () => {
    render(<RoadbookPage />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs.length).toBe(7)
  })

  it('highlights current day', () => {
    render(<RoadbookPage />)
    const activeTab = screen.getByRole('tab', { selected: true })
    expect(activeTab).toBeInTheDocument()
    expect(activeTab).toHaveAttribute('aria-selected', 'true')
  })

  it('shows prev/next navigation', () => {
    render(<RoadbookPage />)
    expect(screen.getByRole('button', { name: 'Previous day' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next day' })).toBeInTheDocument()
  })

  it('disables prev button on day 1', () => {
    render(<RoadbookPage />)
    const prevBtn = screen.getByRole('button', { name: 'Previous day' })
    expect(prevBtn).toBeDisabled()
  })
})

describe('Sprint 2: Premium icons in timeline', () => {
  it('uses 🏠 for departure', () => {
    render(<Timeline day={allDays[0]} />)
    // Departure icon is rendered
    const icons = document.querySelectorAll('.rb-timeline__icon')
    expect(icons[0].textContent).toBe('🏠')
  })

  it('uses 🔋 for charging stops', () => {
    render(<Timeline day={allDays[0]} />)
    const icons = document.querySelectorAll('.rb-timeline__icon')
    // Day 1 has a charging stop at index 1
    expect(icons[1].textContent).toBe('🔋')
  })
})
