import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { DayPage } from '../components/roadbook/DayPage'
import { allDays } from '../data/days'

describe('Snapshot tests: Day pages', () => {
  it('Day 1 matches snapshot', () => {
    const { container } = render(<DayPage day={allDays[0]} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('Day 2 matches snapshot', () => {
    const { container } = render(<DayPage day={allDays[1]} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('Day 3 matches snapshot', () => {
    const { container } = render(<DayPage day={allDays[2]} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('Day 4 matches snapshot', () => {
    const { container } = render(<DayPage day={allDays[3]} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('Day 5 matches snapshot', () => {
    const { container } = render(<DayPage day={allDays[4]} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('Day 6 matches snapshot', () => {
    const { container } = render(<DayPage day={allDays[5]} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('Day 7 matches snapshot', () => {
    const { container } = render(<DayPage day={allDays[6]} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
