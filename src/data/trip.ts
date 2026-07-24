import raw from './trip.json'
import { TripSchema } from './schema'
export const tripData = TripSchema.parse(raw)
