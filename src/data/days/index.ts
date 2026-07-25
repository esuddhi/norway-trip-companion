import { day1 } from './day1'
import type { RoadbookDay } from '../../types/roadbook'

export const roadbookDays: Record<string, RoadbookDay> = {
  'day-1': day1,
}

export function getRoadbookDay(id: string): RoadbookDay | undefined {
  return roadbookDays[id]
}
