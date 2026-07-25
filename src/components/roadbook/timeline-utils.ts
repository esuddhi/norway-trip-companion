import type { Stop, RoadbookDayData } from '../../types/roadbook-day'

export interface TimelineEvent {
  id: string
  time: string
  title: string
  type: 'departure' | 'arrival' | 'driving' | 'regroup' | 'charging' | 'accommodation' | 'stop'
  icon: string
  duration?: string
}

const typeToTimelineType: Record<string, TimelineEvent['type']> = {
  departure: 'departure',
  charging: 'charging',
  regroup: 'regroup',
  accommodation: 'accommodation',
  destination: 'arrival',
  drive: 'driving',
  scenicDrive: 'driving',
}

/**
 * Sprint 2 icons:
 * 🏠 Departure  📍 Attraction  🍱 Regroup  🔋 Charging  ⛴ Ferry  🏡 Accommodation
 */
const typeIcons: Record<string, string> = {
  departure: '🏠',
  charging: '🔋',
  regroup: '🍱',
  accommodation: '🏡',
  arrival: '🏡',
  driving: '🚗',
  stop: '📍',
}

const stopTypeToIcon: Record<string, string> = {
  ferryTerminal: '⛴',
  experience: '⛴',
  viewpoint: '📍',
  attraction: '📍',
  picnic: '🍱',
  village: '📍',
  fjord: '📍',
  scenic: '📍',
  flexible: '📍',
  optional: '📍',
  meal: '🍱',
}

/**
 * Generate timeline events from the day's stops.
 */
export function generateTimelineEvents(day: RoadbookDayData): TimelineEvent[] {
  return day.stops.map((stop: Stop) => {
    const timelineType = typeToTimelineType[stop.type] || 'stop'
    const icon = stopTypeToIcon[stop.type] || typeIcons[timelineType]
    return {
      id: stop.id,
      time: stop.schedule.arrival,
      title: stop.title,
      type: timelineType,
      icon,
      duration:
        stop.schedule.stayMinutes != null && stop.schedule.stayMinutes > 0
          ? `${stop.schedule.stayMinutes} min`
          : undefined,
    }
  })
}
