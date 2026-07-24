import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import type { TripData } from '../data/schema'
import { dateLabel } from '../lib/trip'
export function DayCard({ day, index }: { day: TripData['days'][number]; index: number }) { return <Link className="day-card" to={`/planner/${day.id}`}><div><span className="eyebrow">DAY {String(index + 1).padStart(2, '0')} · {dateLabel(day.date)}</span><h3>{day.title}</h3><p>{day.summary}</p></div><div className="day-meta"><b>{day.distanceKm} km</b><span>{day.weather}</span><ArrowRightIcon /></div></Link> }
