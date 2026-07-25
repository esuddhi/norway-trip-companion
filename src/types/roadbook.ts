export interface Route {
  start: string
  end: string
}

export interface DaySummary {
  title: string
  subtitle: string
  departureTime: string
  estimatedArrival: string
  distanceKm: number
  drivingTime: string
  totalStopTime: string
  weatherSummary: string
  highestElevation: string
  tripProgress: string
  heroImage?: string
  heroImageCredit?: string
}

export interface DriverDashboard {
  departureTime: string
  distanceKm: number
  drivingTime: string
  weather: string
  roadCondition: string
  highestElevation: string
  chargingStops: number
  sunrise: string
  sunset: string
  roadType: string
}

export interface JourneyItem {
  time: string
  title: string
  icon: string
  stopId: string
}

export interface MeetingPoint {
  name: string
  purpose: string
  meetingWindow?: string
  nextMeetingPoint?: string
}

export interface Parking {
  name: string
  latitude?: number
  longitude?: number
  address?: string
  walkingDistanceMeters?: number
  walkingTimeMinutes?: number
  googleMapsUrl?: string
  appleMapsUrl?: string
}

export interface Driver {
  roadNotes?: string
  speedLimitNotes?: string
  parkingNotes?: string
  departureRecommendation?: string
  roadHazards?: string
  restrooms?: string
  accessibility?: string
}

export interface Navigator {
  story?: string
  interestingFact?: string
  hiddenGem?: string
  nextDestination?: string
  recommendedOrder?: string[]
}

export interface Family {
  kidsFriendly?: boolean
  playground?: boolean
  babyChanging?: boolean
  picnicTables?: boolean
  strollerFriendly?: boolean
  dogFriendly?: boolean
  restrooms?: boolean
  waterAvailable?: boolean
  recommendation?: string
  bestUse?: string[]
}

export interface FoodStrategy {
  recommendedMeal?: string
  packedFoodRecommendation?: string
  coffeeRecommendation?: string
  dessertRecommendation?: string
  restaurantRecommendation?: string
  iceCreamRecommendation?: string
}

export interface LocalDiscovery {
  name: string
  category?: string
  whyFamous?: string
  history?: string
  signatureDish?: string
  vegetarianOptions?: string
  veganOptions?: string
  coffeeRating?: string
  worthStopping?: string
  ourRecommendation?: string
}

export interface Charging {
  chargerName?: string
  network: string
  compatibleVehicles: string[]
  numberOfStalls?: number
  maximumPowerKW: number
  arrivalSOC: number
  departureSOC: number
  estimatedChargeMinutes: number
  estimatedEnergyKWh: number
  estimatedPricePerKWh: number
  estimatedSessionCost: number
  paymentMethods?: string[]
  plugTypes?: string[]
  availabilityNotes?: string
  nearby?: {
    coffee?: boolean
    restaurant?: boolean
    grocery?: boolean
    playground?: boolean
    restrooms?: boolean
    shopping?: boolean
  }
}

export interface Experience {
  whyStopHere: string
  bestUse: string[]
  recommendedActivities?: string[]
  skipConditions?: string
  recommendedStayReason?: string
}

export interface Photography {
  bestView?: string
  familyPhotoSpot?: string
  lensRecommendation?: string
  goldenHour?: string
  droneAllowed?: boolean
  tripodFriendly?: boolean
  estimatedPhotoTime?: string
}

export interface Weather {
  planA: string
  planB: string
  rainAlternative?: string
  windAlternative?: string
  weatherNotes?: string
}

export interface TripIntelligence {
  message: string
  priority?: 'low' | 'medium' | 'high'
  reason?: string
}

export interface BeforeLeaving {
  items: string[]
}

export type StopType =
  | 'departure'
  | 'meeting'
  | 'charging'
  | 'coffee'
  | 'viewpoint'
  | 'waterfall'
  | 'restaurant'
  | 'bakery'
  | 'picnic'
  | 'activity'
  | 'fuel'
  | 'hotel'
  | 'destination'

export interface Stop {
  id: string
  sequence: number
  type: StopType
  title: string
  subtitle?: string
  plannedArrival: string
  arrivalWindowStart?: string
  arrivalWindowEnd?: string
  recommendedStayMinutes?: number | 'overnight'
  plannedDeparture?: string
  purpose?: string[]
  meetingPoint?: MeetingPoint
  parking?: Parking
  driver?: Driver
  navigator?: Navigator
  family?: Family
  food?: FoodStrategy
  localDiscovery?: LocalDiscovery
  charging?: Charging
  experience?: Experience
  photography?: Photography
  weather?: Weather
  tripIntelligence?: TripIntelligence
  beforeLeaving?: BeforeLeaving
}

export interface Arrival {
  accommodation: string
  checkIn: string
  parking: string
  overnightCharging?: string
  nearestGrocery?: string
  dinnerRecommendation?: string
  eveningActivities?: string[]
}

export interface Tomorrow {
  title: string
  route: string
  weather?: string
  departureTime: string
  highlights: string[]
  drivingTime?: string
}

export interface DayMetadata {
  created?: string
  updated?: string
  verified?: boolean
  verifiedBy?: string
  confidence?: 'confirmed' | 'verified' | 'community' | 'estimated'
}

export interface RoadbookDay {
  id: string
  dayNumber: number
  date: string
  title: string
  route: Route
  summary: DaySummary
  driverDashboard: DriverDashboard
  journey: JourneyItem[]
  stops: Stop[]
  arrival: Arrival
  tomorrow: Tomorrow
  metadata?: DayMetadata
}
