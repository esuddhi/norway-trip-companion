import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DriverCard } from '../components/roadbook/DriverCard'
import { NavigatorCard } from '../components/roadbook/NavigatorCard'
import { StopCard } from '../components/roadbook/StopCard'
import { ExperienceCard } from '../components/roadbook/ExperienceCard'
import type { DriverInfo, DaySummary, DayRoute, NavigatorInfo, Stop } from '../types/roadbook-day'

const mockDriver: DriverInfo = {
  dayType: 'Long Transfer',
  chargingStrategy: {
    philosophy: 'Charge during breakfast.',
    preferredLocation: 'Vestby',
    backupLocations: ['Drammen', 'Kongsberg'],
    decisionRule: 'Breakfast charge to 80%.',
  },
  notes: ['Leave with 100% battery', 'Breakfast during charging'],
}

const mockSummary: DaySummary = {
  departureTime: '06:30',
  targetArrival: '17:00',
  estimatedDrivingTime: '7h 45m',
  plannedStopTime: '1h 45m',
  totalTravelTime: '9h 30m',
}

const mockRoute: DayRoute = {
  start: { name: 'Gothenburg' },
  destination: { name: 'Geilo' },
}

const mockNavigator: NavigatorInfo = {
  regroupPoint: 'Tesla Supercharger Vestby',
  weatherReminder: 'Check mountain weather.',
  chargingReminder: 'Charge at Vestby.',
  notes: ['Crossing into Norway is seamless.', 'Hardangervidda weather can change.'],
}

describe('DriverCard', () => {
  it('renders day type', () => {
    render(<DriverCard driver={mockDriver} summary={mockSummary} route={mockRoute} />)
    expect(screen.getByText('Long Transfer')).toBeInTheDocument()
  })

  it('renders departure time and location', () => {
    render(<DriverCard driver={mockDriver} summary={mockSummary} route={mockRoute} />)
    expect(screen.getByText(/06:30 · Gothenburg/)).toBeInTheDocument()
  })

  it('renders destination', () => {
    render(<DriverCard driver={mockDriver} summary={mockSummary} route={mockRoute} />)
    expect(screen.getByText('Geilo')).toBeInTheDocument()
  })

  it('renders estimated driving time', () => {
    render(<DriverCard driver={mockDriver} summary={mockSummary} route={mockRoute} />)
    expect(screen.getByText('7h 45m')).toBeInTheDocument()
  })

  it('renders charging strategy philosophy', () => {
    render(<DriverCard driver={mockDriver} summary={mockSummary} route={mockRoute} />)
    expect(screen.getByText('Charge during breakfast.')).toBeInTheDocument()
  })

  it('renders driver notes', () => {
    render(<DriverCard driver={mockDriver} summary={mockSummary} route={mockRoute} />)
    expect(screen.getByText('Leave with 100% battery')).toBeInTheDocument()
    expect(screen.getByText('Breakfast during charging')).toBeInTheDocument()
  })
})

describe('NavigatorCard', () => {
  it('renders regroup point', () => {
    render(<NavigatorCard navigator={mockNavigator} />)
    expect(screen.getByText('Tesla Supercharger Vestby')).toBeInTheDocument()
  })

  it('renders weather reminder', () => {
    render(<NavigatorCard navigator={mockNavigator} />)
    expect(screen.getByText('Check mountain weather.')).toBeInTheDocument()
  })

  it('renders charging reminder', () => {
    render(<NavigatorCard navigator={mockNavigator} />)
    expect(screen.getByText('Charge at Vestby.')).toBeInTheDocument()
  })

  it('renders important notes', () => {
    render(<NavigatorCard navigator={mockNavigator} />)
    expect(screen.getByText('Crossing into Norway is seamless.')).toBeInTheDocument()
  })
})

describe('StopCard', () => {
  const mockStop: Stop = {
    id: 'vestby',
    sequence: 2,
    type: 'charging',
    fixed: true,
    title: 'Tesla Supercharger Vestby',
    schedule: { arrival: '08:40', departure: '09:05', stayMinutes: 25 },
    purpose: ['Breakfast', 'Coffee', 'Charging'],
    weather: { good: 'Outdoor seating', rain: 'Indoor café' },
  }

  it('renders stop title', () => {
    render(<StopCard stop={mockStop} />)
    expect(screen.getByText('Tesla Supercharger Vestby')).toBeInTheDocument()
  })

  it('renders arrival time', () => {
    render(<StopCard stop={mockStop} />)
    expect(screen.getByText('08:40')).toBeInTheDocument()
  })

  it('renders departure time', () => {
    render(<StopCard stop={mockStop} />)
    expect(screen.getByText('09:05')).toBeInTheDocument()
  })

  it('renders stay duration', () => {
    render(<StopCard stop={mockStop} />)
    expect(screen.getByText('25 min')).toBeInTheDocument()
  })

  it('renders purpose tags', () => {
    render(<StopCard stop={mockStop} />)
    expect(screen.getByText('Breakfast')).toBeInTheDocument()
    expect(screen.getByText('Coffee')).toBeInTheDocument()
    expect(screen.getByText('Charging')).toBeInTheDocument()
  })

  it('renders weather section when present', () => {
    render(<StopCard stop={mockStop} />)
    expect(screen.getByText('Outdoor seating')).toBeInTheDocument()
    expect(screen.getByText('Indoor café')).toBeInTheDocument()
  })

  it('does not render weather when absent', () => {
    const stopNoWeather: Stop = { ...mockStop, weather: undefined }
    render(<StopCard stop={stopNoWeather} />)
    expect(screen.queryByText('Weather Plan')).not.toBeInTheDocument()
  })

  it('does not render empty purpose when absent', () => {
    const stopNoPurpose: Stop = { ...mockStop, purpose: undefined }
    const { container } = render(<StopCard stop={stopNoPurpose} />)
    expect(container.querySelector('.rb-stop-card__purpose')).not.toBeInTheDocument()
  })

  it('shows optional badge when stop is optional', () => {
    const optionalStop: Stop = { ...mockStop, optional: true }
    render(<StopCard stop={optionalStop} />)
    expect(screen.getByText('Optional')).toBeInTheDocument()
  })
})

describe('ExperienceCard - conditional rendering', () => {
  it('renders for Signature priority', () => {
    const stop: Stop = {
      id: 'borgund',
      sequence: 2,
      type: 'attraction',
      fixed: true,
      title: 'Borgund Stave Church',
      schedule: { arrival: '11:00', departure: '12:00', stayMinutes: 60 },
      experience: {
        priority: 'Signature',
        estimatedMemory: '5/5',
        whyStopHere: 'Best preserved medieval stave church',
      },
    }
    render(<ExperienceCard stop={stop} />)
    expect(screen.getByText('Borgund Stave Church')).toBeInTheDocument()
    expect(screen.getByText(/Experience of the Day/)).toBeInTheDocument()
  })

  it('renders for Major priority', () => {
    const stop: Stop = {
      id: 'loen',
      sequence: 3,
      type: 'attraction',
      fixed: true,
      title: 'Loen Skylift',
      schedule: { arrival: '11:00', departure: '13:00', stayMinutes: 120 },
      experience: {
        priority: 'Major',
        estimatedMemory: '4/5',
        whyStopHere: 'Cable car to mountaintop',
      },
    }
    render(<ExperienceCard stop={stop} />)
    expect(screen.getByText('Loen Skylift')).toBeInTheDocument()
    expect(screen.getByText(/Major Experience/)).toBeInTheDocument()
  })

  it('does NOT render for Optional priority', () => {
    const stop: Stop = {
      id: 'optional-1',
      sequence: 4,
      type: 'viewpoint',
      fixed: false,
      title: 'Optional Viewpoint',
      schedule: { arrival: '14:00', departure: '14:20', stayMinutes: 20 },
      experience: {
        priority: 'Optional',
        estimatedMemory: '2/5',
        whyStopHere: 'Nice if time allows',
      },
    }
    const { container } = render(<ExperienceCard stop={stop} />)
    expect(container.innerHTML).toBe('')
  })

  it('does NOT render when no experience data', () => {
    const stop: Stop = {
      id: 'plain-stop',
      sequence: 5,
      type: 'picnic',
      fixed: true,
      title: 'Picnic Spot',
      schedule: { arrival: '12:00', departure: '12:45', stayMinutes: 45 },
    }
    const { container } = render(<ExperienceCard stop={stop} />)
    expect(container.innerHTML).toBe('')
  })
})
