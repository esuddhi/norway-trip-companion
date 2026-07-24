import type { TripData } from '../data/schema'

export const dateLabel = (value: string) => new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }).format(new Date(`${value}T12:00:00`))
export const daysUntil = (date: string, now = new Date()) => Math.max(0, Math.ceil((new Date(`${date}T00:00:00`).getTime() - now.getTime()) / 86_400_000))
export const hotelFor = (data: TripData, id: string) => data.hotels.find((hotel) => hotel.id === id)
export const totalDistance = (data: TripData) => data.days.reduce((sum, day) => sum + day.distanceKm, 0)
