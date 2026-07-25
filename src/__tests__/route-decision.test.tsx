import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { RouteDecisionCard } from '../components/roadbook/RouteDecisionCard'
import type { RouteDecision } from '../types/roadbook-day'

const mockRouteDecision: RouteDecision = {
  enabled: true,
  selectedRoute: 'Option A',
  recommendation: 'Selected as the official Roadbook route.',
  options: [
    {
      id: 'optionA',
      title: 'Scenic Heritage Route',
      badge: 'Recommended',
      selected: true,
      experienceOfTheDay: 'Borgund Stave Church',
      pros: ['Historic landmark', 'Scenic mountain crossing'],
      cons: ['Slightly longer journey'],
    },
    {
      id: 'optionB',
      title: 'Direct Route',
      badge: 'Alternative',
      selected: false,
      pros: ['Earlier arrival'],
      cons: ['Misses Borgund Stave Church'],
    },
  ],
}

describe('RouteDecisionCard', () => {
  it('renders when enabled is true', () => {
    render(<RouteDecisionCard routeDecision={mockRouteDecision} />)
    expect(screen.getByText('🔀 Route Decision')).toBeInTheDocument()
  })

  it('does NOT render when enabled is false', () => {
    const disabled: RouteDecision = { ...mockRouteDecision, enabled: false }
    const { container } = render(<RouteDecisionCard routeDecision={disabled} />)
    expect(container.innerHTML).toBe('')
  })

  it('shows Option A selected by default', () => {
    render(<RouteDecisionCard routeDecision={mockRouteDecision} />)
    const optionA = screen.getByRole('radio', { name: 'Scenic Heritage Route' })
    expect(optionA).toHaveAttribute('aria-checked', 'true')
  })

  it('shows pros and cons of selected option', () => {
    render(<RouteDecisionCard routeDecision={mockRouteDecision} />)
    expect(screen.getByText(/Historic landmark/)).toBeInTheDocument()
    expect(screen.getByText(/Slightly longer journey/)).toBeInTheDocument()
  })

  it('switches to Option B when clicked', () => {
    render(<RouteDecisionCard routeDecision={mockRouteDecision} />)
    const optionB = screen.getByRole('radio', { name: 'Direct Route' })
    fireEvent.click(optionB)
    expect(optionB).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByText(/Earlier arrival/)).toBeInTheDocument()
    expect(screen.getByText(/Misses Borgund Stave Church/)).toBeInTheDocument()
  })

  it('shows experience of the day for Option A', () => {
    render(<RouteDecisionCard routeDecision={mockRouteDecision} />)
    expect(screen.getByText('Borgund Stave Church')).toBeInTheDocument()
  })
})
