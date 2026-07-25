/**
 * TypeScript types matching the canonical YAML schema for roadbook days.
 * Source of truth: trip data/SCHEMA.md
 */

// --- Top-level day structure ---

export interface RoadbookDayData {
  version: string
  status: string
  dayId: string
  metadata: DayMetadata
  route: DayRoute
  summary: DaySummary
  driver: DriverInfo
  navigator: NavigatorInfo
  accommodation?: AccommodationInfo
  booking?: BookingInfo
  routeDecision?: RouteDecision
  stops: Stop[]
  arrival: ArrivalInfo
  passingHighlights?: string[]
  decisionPoints?: DecisionPoint[]
  roadbookRules?: Record<string, unknown>
  routeAudit?: Record<string, unknown>
  editorialNotes?: EditorialNotes
  tripSummary?: TripSummary
  todos?: string[]
}

// --- Metadata ---

export interface DayMetadata {
  title: string
  subtitle: string
  theme: string
  date: string
}

// --- Route ---

export interface DayRoute {
  start: RoutePoint
  destination: RoutePoint
}

export interface RoutePoint {
  name: string
  city?: string
  country?: string
  address?: string
  village?: string
}

// --- Summary ---

export interface DaySummary {
  departureTime: string
  targetArrival: string
  distanceKm?: number
  estimatedDrivingTime: string
  plannedStopTime: string
  totalTravelTime: string
}

// --- Driver ---

export interface DriverInfo {
  dayType: string
  roadType?: string[]
  chargingStrategy: ChargingStrategy
  targetArrivalSOC?: number
  notes: string[]
}

export interface ChargingStrategy {
  philosophy: string
  preferredLocation: string | null
  backupLocations: string[]
  decisionRule: string
  breakfastCharge?: boolean
  overnightCharge?: boolean
  dcChargingRequired?: boolean
  overnightCharging?: boolean
}

// --- Navigator ---

export interface NavigatorInfo {
  regroupPoint: string
  weatherReminder: string
  chargingReminder: string
  notes: string[]
}

// --- Accommodation (Days 4-6) ---

export interface AccommodationInfo {
  name: string
  address: string
  booking?: {
    confirmed: boolean
    checkIn: string
    checkOut?: string
  }
  parking: ParkingInfo
  charging?: {
    overnight?: {
      status: string
    }
    backup?: string[]
  }
}

// --- Booking (Day 5 ferry) ---

export interface BookingInfo {
  required: boolean
  activity: string
  confirmationStatus: string
  departureTime: string
  recommendedArrival: string
  boardingBuffer: string
  notes?: string
}

// --- Route Decision (Day 6) ---

export interface RouteDecision {
  enabled: boolean
  selectedRoute: string
  recommendation: string
  options: RouteOption[]
}

export interface RouteOption {
  id: string
  title: string
  badge: string
  selected: boolean
  experienceOfTheDay?: string
  pros: string[]
  cons: string[]
}

// --- Stops ---

export type StopType =
  | 'departure'
  | 'charging'
  | 'picnic'
  | 'viewpoint'
  | 'village'
  | 'fjord'
  | 'attraction'
  | 'meal'
  | 'ferryTerminal'
  | 'experience'
  | 'scenic'
  | 'flexible'
  | 'regroup'
  | 'scenicDrive'
  | 'drive'
  | 'accommodation'
  | 'destination'
  | 'optional'

export interface Stop {
  id: string
  sequence: number
  type: StopType | string
  fixed: boolean
  optional?: boolean
  title: string

  // Timing
  schedule: StopSchedule

  // Purpose
  purpose?: string[]

  // Experience (attractions only)
  experience?: StopExperience

  // Navigation
  navigation?: StopNavigation

  // Family
  family?: StopFamily

  // Food
  food?: StopFood

  // Preferred/Alternative lunch
  preferred?: LunchOption
  alternative?: LunchAlternative

  // Local Discovery
  localDiscovery?: LocalDiscovery

  // Charging
  charging?: StopCharging

  // Weather
  weather?: WeatherInfo

  // Photography
  photography?: StopPhotography

  // Story
  story?: string

  // Before Leaving
  beforeLeaving?: string[]

  // Evening (accommodation stops)
  evening?: string[]

  // Flexible stop options
  options?: string[]
  recommendation?: string
  visitOnlyIf?: string[]
  decision?: StopDecision

  // Regroup
  regroupPurpose?: string[]

  // Charging strategy field (for optional charging stops)
  strategy?: string

  // Notes
  notes?: string[]
}

export interface StopSchedule {
  arrival: string
  departure: string | null
  stayMinutes: number | null
}

export interface StopExperience {
  priority: 'Signature' | 'Major' | 'Optional'
  estimatedMemory: string
  whyStopHere: string
}

export interface StopNavigation {
  required?: boolean
  destination?: {
    name: string
  }
  address?: string
  parking?: ParkingInfo
}

export interface ParkingInfo {
  name: string
  confidence: 'VERIFIED' | 'RECOMMENDED'
  gps: {
    latitude: number | null
    longitude: number | null
  }
  notes: string
}

export interface StopFamily {
  toilets?: boolean
  playground?: boolean
  grocery?: boolean
  coffee?: boolean
  walkingDifficulty?: string
  strollerFriendly?: boolean | string
  walkingDistanceMeters?: number
  restaurant?: boolean
  visitorCentre?: boolean
  babyChanging?: boolean
}

export interface StopFood {
  recommendation?: string
  packedLunch?: string
  restaurant?: string
  strategy?: {
    good: string
    rain: string
  }
}

export interface LunchOption {
  type: string
  recommendation: string[]
}

export interface LunchAlternative {
  type: string
  recommendation: {
    name?: string
    reason: string[]
  }
}

export interface LocalDiscovery {
  enabled: boolean
  business: string
  recommendation: string
  vegetarian?: string
  roadbookRating?: number
}

export interface StopCharging {
  network?: string
  compatible?: string[]
  stalls?: number
  maxPowerKW?: number
  arrivalSOC?: number
  departureSOC?: number
  estimatedChargeMinutes?: number
  estimatedEnergyKWh?: number
  estimatedPricePerKWhNOK?: number
  recommended?: boolean
  notes?: string
  philosophy?: string
}

export interface WeatherInfo {
  good: string
  rain: string
}

export interface StopPhotography {
  priority?: string
  recommendation: string
}

export interface StopDecision {
  preferred: { name: string }
  alternative: { name: string }
}

// --- Arrival ---

export interface ArrivalInfo {
  accommodation: string
  parking: string
  eveningPlan?: string[]
  tomorrowPreparation: string | null
}

// --- Decision Points ---

export interface DecisionPoint {
  id: string
  trigger: string
  ifGood?: string
  ifRain?: string
  ifAhead?: string
  ifBehind?: string
  ifRelaxed?: string
  ifTired?: string
  ifBatteryAbove50?: string
  ifBatteryAbove60?: string
  otherwise?: string
  ifNeeded?: string
}

// --- Editorial Notes ---

export interface EditorialNotes {
  pageMood: string
  heroImage: string
  designGuidance: string[]
}

// --- Trip Summary (Day 7 only) ---

export interface TripSummary {
  completed: string[]
  message: string
}
