# SCHEMA.md — Canonical Itinerary Day Schema

Version: 1.0
Status: LOCKED
Last Updated: 2026-07-25

---

## Purpose

This document defines the canonical schema for every itinerary YAML file in the Norway Road Trip Companion.

Every day (day1.yaml through day7.yaml) follows this structure.

The UI renders all days using the same reusable components without special-case logic.

---

## Top-Level Structure

```yaml
version: '1.0'
status: LOCKED
dayId: day-N

metadata:
route:
summary:
driver:
navigator:
accommodation: # Days 4–6 only (multi-night stays)
booking: # Day 5 only (ferry booking)
routeDecision: # Day 6 only (route alternatives)
stops:
arrival:
passingHighlights:
decisionPoints:
roadbookRules:
routeAudit:
editorialNotes:
tripSummary: # Day 7 only
todos:
```

---

## metadata

```yaml
metadata:
  title: 'Day N'
  subtitle: string
  theme: string
  date: 'YYYY-MM-DD'
```

---

## route

```yaml
route:
  start:
    name: string
    city: string # or country/address/village as appropriate
  destination:
    name: string
    city: string # or address/village as appropriate
```

---

## summary

```yaml
summary:
  departureTime: "HH:MM"
  targetArrival: "HH:MM" or "HH:MM-HH:MM"
  distanceKm: number                    # Day 1 only
  estimatedDrivingTime: "Xh XXm"
  plannedStopTime: "Xh XXm"
  totalTravelTime: "Xh XXm"
```

---

## driver

```yaml
driver:
  dayType: string
  roadType: # Day 1 only (preserved, day-specific)
    - string
  chargingStrategy:
    philosophy: string
    preferredLocation: string or null
    backupLocations:
      - string
    decisionRule: string
    # Day-specific fields preserved:
    breakfastCharge: boolean # Day 1 only
    overnightCharge: boolean # Day 1, 3 only
    dcChargingRequired: boolean # Day 3 only
  targetArrivalSOC: number # Day 1, 2 only
  notes:
    - string
```

---

## navigator

```yaml
navigator:
  regroupPoint: string
  weatherReminder: string
  chargingReminder: string
  notes:
    - string
```

---

## stops (array)

Every stop follows this structure:

```yaml
- id: string
  sequence: number
  type: string
  fixed: boolean
  optional: boolean                     # Only on flexible/optional stops
  title: string

  # Timing
  schedule:
    arrival: "HH:MM"
    departure: "HH:MM" or null
    stayMinutes: number or null

  # Purpose
  purpose:
    - string

  # Experience (attractions only)
  experience:
    priority: Signature | Major | Optional
    estimatedMemory: "N/5"
    whyStopHere: string

  # Navigation
  navigation:
    required: boolean                   # Departure only
    destination:
      name: string
    address: string                     # If known
    parking:
      name: string
      confidence: VERIFIED | RECOMMENDED
      gps:
        latitude: number or empty
        longitude: number or empty
      notes: string

  # Family
  family:
    toilets: boolean
    playground: boolean
    grocery: boolean
    coffee: boolean
    walkingDifficulty: string
    strollerFriendly: boolean or string
    walkingDistanceMeters: number
    restaurant: boolean
    visitorCentre: boolean
    babyChanging: boolean

  # Food
  food:
    recommendation: string
    packedLunch: string
    restaurant: string
    strategy:
      good: string
      rain: string

  # Lunch Decision (meal type stops)
  preferred:
    type: string
    recommendation:
      - string
  alternative:
    type: string
    recommendation:
      name: string
      reason:
        - string

  # Local Discovery
  localDiscovery:
    enabled: boolean
    business: string
    recommendation: string or object
    vegetarian: string
    roadbookRating: number

  # Charging
  charging:
    network: string
    compatible:
      - string
    stalls: number
    maxPowerKW: number
    arrivalSOC: number
    departureSOC: number
    estimatedChargeMinutes: number
    estimatedEnergyKWh: number
    estimatedPricePerKWhNOK: number
    recommended: boolean
    notes: string
    philosophy: string

  # Weather
  weather:
    good: string
    rain: string

  # Photography
  photography:
    priority: string
    recommendation: string

  # Story
  story: string

  # Before Leaving
  beforeLeaving:
    - string

  # Evening (accommodation stops only)
  evening:
    - string

  # Flexible stop options
  options:
    - string
  recommendation: string
  visitOnlyIf:
    - string
  decision:
    preferred:
      name: string
    alternative:
      name: string

  # Regroup (regroup type only)
  regroupPurpose:
    - string
```

---

## arrival

```yaml
arrival:
  accommodation: string
  parking: string
  eveningPlan:
    - string
  tomorrowPreparation: string or null
```

---

## decisionPoints

```yaml
decisionPoints:
  - id: string
    trigger: string
    ifGood: string # Weather-based decisions
    ifRain: string
    ifAhead: string # Time-based decisions
    ifBehind: string
    ifRelaxed: string # Energy-based decisions
    ifTired: string
    ifBatteryAbove50: string # Battery-based decisions
    ifBatteryAbove60: string
    otherwise: string
    ifNeeded: string
```

---

## passingHighlights

```yaml
passingHighlights:
  - string
```

---

## roadbookRules

```yaml
roadbookRules:
  targetArrival: string # Day 1 only
  maximumRecommendedDetourMinutes: number
  homemadeFoodPriority: boolean
  avoidBacktracking: boolean
  parkingFirstNavigation: boolean
  weatherAdaptive: boolean
  noRush: boolean # Day 3 only
  avoidUnnecessaryDriving: boolean
  regroupAfterLunch: boolean # Day 6 only
  regroupAtKarlstad: boolean # Day 7 only
  avoidUnnecessaryStops: boolean # Day 7 only
```

---

## routeAudit

```yaml
routeAudit:
  experienceOfTheDay: string
  unnecessaryDetours: boolean
  chargingIntegrated: boolean
  weatherBackup: boolean
  arrivalBefore1700: boolean # varies per day
  drivingDistance: string # Day 3 only
  stressLevel: string
  repeatedRoad: string # Day 2 only
  lunchIntegrated: boolean
  driving: string # Day 6 star ratings
  scenery: string
  culturalValue: string
  familyFriendly: string
```

---

## editorialNotes

```yaml
editorialNotes:
  pageMood: string
  heroImage: string
  designGuidance:
    - string
```

---

## Day-Specific Sections

| Section         | Days Present | Purpose                                    |
| --------------- | ------------ | ------------------------------------------ |
| `accommodation` | 4, 5, 6      | Multi-night stay details with booking info |
| `booking`       | 5            | Ferry booking confirmation                 |
| `routeDecision` | 6            | Route A/B alternative selection            |
| `tripSummary`   | 7            | Trip completion message                    |

These sections are NOT required on every day. They appear only where contextually meaningful.

---

## Stop Types

| Type            | Usage                                 |
| --------------- | ------------------------------------- |
| `departure`     | First stop of every day               |
| `charging`      | EV charging stop                      |
| `picnic`        | Homemade food stop                    |
| `viewpoint`     | Scenic viewpoint                      |
| `village`       | Village exploration                   |
| `fjord`         | Fjord stop                            |
| `attraction`    | Significant attraction                |
| `meal`          | Lunch decision point                  |
| `ferryTerminal` | Ferry boarding                        |
| `experience`    | Signature experience (ferry crossing) |
| `scenic`        | Scenic flexible stop                  |
| `flexible`      | Optional activity block               |
| `regroup`       | Vehicle regroup point                 |
| `scenicDrive`   | Scenic driving section                |
| `drive`         | Driving section                       |
| `accommodation` | Overnight destination                 |
| `destination`   | Final destination (Day 7 only)        |
| `optional`      | Optional coffee/stretch               |

---

## Experience Priority Levels

| Priority    | Meaning                                       |
| ----------- | --------------------------------------------- |
| `Signature` | Experience of the Day — must not be missed    |
| `Major`     | Significant experience — strongly recommended |
| `Optional`  | Nice to have — skip if time/energy limited    |

---

## Parking Confidence Levels

| Level         | Meaning                                     |
| ------------- | ------------------------------------------- |
| `VERIFIED`    | GPS confirmed, parking exists               |
| `RECOMMENDED` | Likely correct, awaiting field verification |

---

## Weather Decision Keys

All weather objects use exactly:

```yaml
weather:
  good: string # Activity in good weather
  rain: string # Activity in rain
```

No variations (sunny, cloudy, poor weather, etc.).

---

## Naming Conventions

| Concept               | Schema Key                       | UI Display              |
| --------------------- | -------------------------------- | ----------------------- |
| Meeting/regroup point | `regroupPoint`                   | "Regroup Point"         |
| Weather good          | `good`                           | Context-dependent       |
| Weather bad           | `rain`                           | Context-dependent       |
| Experience of the Day | `experience.priority: Signature` | "Experience of the Day" |
| Lunch decision        | `preferred` / `alternative`      | "Lunch Decision"        |

---

## Validation Rules

1. Every file must parse as valid YAML
2. No duplicate keys at any level
3. Consistent 2-space indentation
4. Every stop must have `id`, `sequence`, `type`, `title`, `schedule`
5. Every `schedule` must have at minimum `arrival`
6. Every `parking` (when present) must have `name`, `confidence`, `gps.latitude`, `gps.longitude`, `notes`
7. Every `weather` (when present) must use `good` and `rain` keys only
8. `experience` objects only on attractions (not on departures, meals, charging, accommodation)
