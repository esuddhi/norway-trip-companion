import type { RoadbookDayData } from '../../types/roadbook-day'
import { parseRoadbookYaml } from './parser'

import day1Raw from './day1.yaml?raw'
import day2Raw from './day2.yaml?raw'
import day3Raw from './day3.yaml?raw'
import day4Raw from './day4.yaml?raw'
import day5Raw from './day5.yaml?raw'
import day6Raw from './day6.yaml?raw'
import day7Raw from './day7.yaml?raw'

export const day1 = parseRoadbookYaml(day1Raw)
export const day2 = parseRoadbookYaml(day2Raw)
export const day3 = parseRoadbookYaml(day3Raw)
export const day4 = parseRoadbookYaml(day4Raw)
export const day5 = parseRoadbookYaml(day5Raw)
export const day6 = parseRoadbookYaml(day6Raw)
export const day7 = parseRoadbookYaml(day7Raw)

export const allDays: RoadbookDayData[] = [day1, day2, day3, day4, day5, day6, day7]

export const daysById: Record<string, RoadbookDayData> = {
  'day-1': day1,
  'day-2': day2,
  'day-3': day3,
  'day-4': day4,
  'day-5': day5,
  'day-6': day6,
  'day-7': day7,
}

/**
 * Get a roadbook day by its ID (e.g., "day-1").
 * Returns undefined if the day does not exist.
 */
export function getRoadbookDay(dayId: string): RoadbookDayData | undefined {
  return daysById[dayId]
}

/**
 * Get a roadbook day by its number (1-7).
 * Returns undefined if the day does not exist.
 */
export function getRoadbookDayByNumber(dayNumber: number): RoadbookDayData | undefined {
  return allDays[dayNumber - 1]
}
