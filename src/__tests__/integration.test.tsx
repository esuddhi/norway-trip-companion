import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DayPage } from '../components/roadbook/DayPage'
import { allDays } from '../data/days'

describe('Integration: All day pages render from YAML', () => {
  it('loads all 7 days', () => {
    expect(allDays).toHaveLength(7)
  })

  describe('Day 1 - Gothenburg → Geilo', () => {
    it('renders without errors', () => {
      const { container } = render(<DayPage day={allDays[0]} />)
      expect(container.querySelector('.rb-day-page')).toBeInTheDocument()
    })

    it('displays correct metadata', () => {
      render(<DayPage day={allDays[0]} />)
      expect(screen.getAllByText(/Day 1/).length).toBeGreaterThan(0)
      expect(screen.getByText(/Leaving Everyday Life Behind/)).toBeInTheDocument()
    })

    it('renders driver card with day type', () => {
      render(<DayPage day={allDays[0]} />)
      expect(screen.getByText('Long Transfer')).toBeInTheDocument()
    })

    it('renders navigator regroup point', () => {
      render(<DayPage day={allDays[0]} />)
      expect(screen.getAllByText('Tesla Supercharger Vestby').length).toBeGreaterThan(0)
    })

    it('renders stops from YAML', () => {
      render(<DayPage day={allDays[0]} />)
      expect(screen.getAllByText('Home').length).toBeGreaterThan(0)
    })

    it('does not show route decision (not Day 6)', () => {
      const { container } = render(<DayPage day={allDays[0]} />)
      expect(container.querySelector('.rb-route-decision')).not.toBeInTheDocument()
    })
  })

  describe('Day 2 - Geilo → Voss', () => {
    it('renders without errors', () => {
      const { container } = render(<DayPage day={allDays[1]} />)
      expect(container.querySelector('.rb-day-page')).toBeInTheDocument()
    })

    it('displays correct route start', () => {
      render(<DayPage day={allDays[1]} />)
      expect(screen.getAllByText(/Havsdalsgrenda/).length).toBeGreaterThan(0)
    })

    it('displays correct route destination', () => {
      render(<DayPage day={allDays[1]} />)
      expect(screen.getAllByText(/Flatlandsmo/).length).toBeGreaterThan(0)
    })
  })

  describe('Day 3 - Voss Exploration', () => {
    it('renders without errors', () => {
      const { container } = render(<DayPage day={allDays[2]} />)
      expect(container.querySelector('.rb-day-page')).toBeInTheDocument()
    })

    it('displays correct subtitle', () => {
      render(<DayPage day={allDays[2]} />)
      expect(screen.getAllByText(/Relax/).length).toBeGreaterThan(0)
    })
  })

  describe('Day 4 - Voss → Hjelle', () => {
    it('renders without errors', () => {
      const { container } = render(<DayPage day={allDays[3]} />)
      expect(container.querySelector('.rb-day-page')).toBeInTheDocument()
    })

    it('renders accommodation card (multi-night stay)', () => {
      const { container } = render(<DayPage day={allDays[3]} />)
      expect(container.querySelector('.rb-accommodation-card')).toBeInTheDocument()
    })
  })

  describe('Day 5 - Geirangerfjord', () => {
    it('renders without errors', () => {
      const { container } = render(<DayPage day={allDays[4]} />)
      expect(container.querySelector('.rb-day-page')).toBeInTheDocument()
    })

    it('renders ferry booking info', () => {
      render(<DayPage day={allDays[4]} />)
      expect(screen.getAllByText(/Hellesylt/).length).toBeGreaterThan(0)
    })

    it('renders accommodation card', () => {
      const { container } = render(<DayPage day={allDays[4]} />)
      expect(container.querySelector('.rb-accommodation-card')).toBeInTheDocument()
    })
  })

  describe('Day 6 - Heritage Route', () => {
    it('renders without errors', () => {
      const { container } = render(<DayPage day={allDays[5]} />)
      expect(container.querySelector('.rb-day-page')).toBeInTheDocument()
    })

    it('renders route decision card', () => {
      const { container } = render(<DayPage day={allDays[5]} />)
      expect(container.querySelector('.rb-route-decision')).toBeInTheDocument()
    })

    it('shows Scenic Heritage Route as selected option', () => {
      render(<DayPage day={allDays[5]} />)
      expect(screen.getByText('Scenic Heritage Route')).toBeInTheDocument()
    })
  })

  describe('Day 7 - Homeward Bound', () => {
    it('renders without errors', () => {
      const { container } = render(<DayPage day={allDays[6]} />)
      expect(container.querySelector('.rb-day-page')).toBeInTheDocument()
    })

    it('renders trip summary', () => {
      render(<DayPage day={allDays[6]} />)
      expect(screen.getByText(/Trip Complete/)).toBeInTheDocument()
    })

    it('does not show route decision', () => {
      const { container } = render(<DayPage day={allDays[6]} />)
      expect(container.querySelector('.rb-route-decision')).not.toBeInTheDocument()
    })
  })
})
