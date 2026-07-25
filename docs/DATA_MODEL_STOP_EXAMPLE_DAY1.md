# Norway Road Trip Companion

# DATA_MODEL_STOP_EXAMPLE_DAY1.md

Version: 1.0
Status: LOCKED
Reference Day: Day 1

---

# Purpose

This document provides a fully populated example of the Day data model.

It serves as:

- Reference implementation
- Development sample
- Testing dataset
- Template for all future itinerary days

This document intentionally contains realistic sample data.

Production data may be updated as bookings, weather and charging information change.

---

# DAY

```yaml
id: day-1

dayNumber: 1

date: 2026-07-26

title: Gothenburg → Geilo

route:
  start: Gothenburg
  end: Geilo

summary:
  departureTime: '06:30'

  estimatedArrival: '17:45'

  distanceKm: 590

  drivingTime: '8h'

  totalStopTime: '2h'

  weatherSummary: 'Warm morning, cooler mountain afternoon.'

  highestElevation: '≈1000 m'

  heroImage: geilo-summer.jpg

  progress: 'Day 1 of 7'
```

---

# JOURNEY

```yaml
journey:
  - departure

  - breakfast-charge

  - scenic-break

  - picnic

  - coffee

  - accommodation
```

---

# STOP 1

## Departure

```yaml
id: departure

sequence: 1

type: departure

title: Leave Gothenburg

plannedArrival: '06:30'

plannedDeparture: '06:30'

recommendedStayMinutes: 0

meetingPoint:
  name: Home

purpose:
  - Departure

parking: not_applicable

driver:
  roadNotes: Leave with full battery.

family:
  recommendation: Everyone should have breakfast before departure.

beforeLeaving:
  - Wallet
  - Passports
  - Camera
  - Charging cards
  - Homemade food
  - Water
```

---

# STOP 2

## Tesla Supercharger Vestby

```yaml
id: vestby

sequence: 2

type: charging

title: Tesla Supercharger Vestby

plannedArrival: '08:40'

arrivalWindowStart: '08:35'

arrivalWindowEnd: '08:55'

plannedDeparture: '09:05'

recommendedStayMinutes: 25
```

---

### Meeting Point

```yaml
meetingPoint:
  purpose: Breakfast + Charging

  nextMeetingPoint: Scenic Mountain Stop
```

---

### Parking

```yaml
parking:
  name: Tesla Supercharger Parking

  latitude:

  longitude:

  walkingDistance: 0

  googleMaps:

  appleMaps:
```

---

### Driver

```yaml
driver:
  roadNotes: Easy motorway access.

  parkingNotes: Large parking area.

  departureRecommendation: Leave once both vehicles reach target SOC.

  roadHazards: None expected.
```

---

### Charging

```yaml
charging:
  network: Tesla

  compatible:
    - Tesla

    - Volvo EX40

  stalls: 16

  maxPower: 250

  arrivalSOC: 30

  departureSOC: 80

  estimatedChargeMinutes: 22

  estimatedEnergy: 38

  estimatedPricePerKWh: 4.8

  estimatedSessionCost: 182
```

---

### Food Strategy

```yaml
food:
  recommendation: Coffee + Breakfast

  packedFood: Save for picnic stop.

  dessert: Optional.
```

---

### Local Discovery

```yaml
localDiscovery:
  name: Local Bakery

  whyFamous: Fresh Norwegian cinnamon buns.

  vegetarian: Excellent

  mustTry: Cinnamon Bun

  recommendation: Coffee + pastry only.
```

---

### Experience

```yaml
experience:
  whyStop: Recharge both EVs while everyone enjoys breakfast before entering Norway.

  bestUse:
    - Coffee

    - Breakfast

    - Kids stretch

    - Restrooms
```

---

### Weather

```yaml
weather:
  sunny: Outdoor seating.

  rain: Indoor café available.
```

---

### Before Leaving

```yaml
beforeLeaving:
  - Charge disconnected

  - Coffee finished

  - Kids ready

  - Navigation started
```

---

# STOP 3

## Scenic Mountain Viewpoint

```yaml
id: scenic-1

sequence: 3

type: viewpoint

title: Scenic Mountain Viewpoint

plannedArrival: '11:15'

plannedDeparture: '11:45'

recommendedStayMinutes: 30
```

---

### Parking

```yaml
parking:
  officialParking:

  walkingDistance: 150

  walkingTime: 3
```

---

### Experience

```yaml
experience:
  whyStop: First spectacular mountain panorama of the trip.

  bestUse:
    - Homemade snacks

    - Family photos

    - Stretch

    - Scenic walk
```

---

### Photography

```yaml
photography:
  bestView: Panorama

  familyPhoto: Yes

  lens: Wide Angle

  drone: Not Recommended

  photoTime: 20
```

---

### Food

```yaml
food:
  packedLunch: No

  packedSnacks: Excellent

  coffee: Not available
```

---

### Weather

```yaml
weather:
  sunny: Walk to viewpoint.

  rain: Stay at parking viewpoint only.
```

---

# STOP 4

## Scenic Picnic Lunch

```yaml
id: picnic

sequence: 4

type: picnic

plannedArrival: '13:00'

plannedDeparture: '13:45'

recommendedStayMinutes: 45
```

---

### Family Recommendation

```yaml
family:

  bestUse:

  Homemade lunch

  Kids play

  Relax

  Family photos
```

---

### Food

```yaml
food:
  recommendation: This is today's best location for packed homemade lunch.

  restaurant: Skip.
```

---

### Weather

```yaml
weather:
  sunny: Outdoor picnic.

  rain: Continue to nearby café.
```

---

# STOP 5

## Afternoon Coffee

```yaml
id: coffee

sequence: 5

type: coffee

plannedArrival: '15:30'

plannedDeparture: '15:50'
```

---

### Local Discovery

```yaml
recommendation: Try local waffles.

vegetarian: Excellent

coffee: Excellent
```

---

# STOP 6

## Havsdalsgrenda Apartments

```yaml
id: hotel

sequence: 6

type: accommodation

plannedArrival: '17:45'

recommendedStayMinutes: overnight
```

---

### Arrival

```yaml
arrival:
  accommodation: Havsdalsgrenda Apartments

  checkIn: Available

  parking: Free

  overnightCharging: Available

  nearestGrocery: Kiwi Geilo

  dinner: Local recommendation
```

---

### Evening

```yaml
evening:
  - Charge both vehicles

  - Short evening walk

  - Grocery if required

  - Prepare Day 2

  - Check weather

  - Camera batteries charging
```

---

# Tomorrow

```yaml
tomorrow:
  departure: '08:00'

  route: Geilo

    →

    Flåm

    →

    Voss

  highlight: Flåm

  estimatedDrive: '4h'
```

---

# Notes

This document intentionally contains representative values.

GPS coordinates

Parking links

Charging prices

Weather

Restaurant details

should be updated with verified production data before the trip.

This file is the canonical example for implementing all future itinerary days.
