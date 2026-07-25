import * as yaml from 'js-yaml'
import type { RoadbookDayData } from '../../types/roadbook-day'

/**
 * Parse a raw YAML string into a typed RoadbookDayData object.
 * Throws if the YAML is malformed.
 */
export function parseRoadbookYaml(raw: string): RoadbookDayData {
  const parsed = yaml.load(raw) as RoadbookDayData
  if (!parsed || !parsed.dayId || !parsed.stops) {
    throw new Error('Invalid roadbook YAML: missing required fields (dayId, stops)')
  }
  return parsed
}
