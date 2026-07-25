# Norway Road Trip Companion
# DATA_MODEL_DAY.md

Version: 1.0
Status: LOCKED

---

# Purpose

This document defines the canonical data model for every itinerary day.

Every itinerary page (Day 1–Day 7) is rendered entirely from this data model.

UI components must never hardcode information.

All information comes from this model.

---

# Hierarchy

Trip

└── Day

      ├── Summary

      ├── Journey

      ├── Stops

      ├── Charging

      ├── Accommodation

      ├── Tomorrow

---

# Day Object

Every day contains

```typescript
Day
```

Properties

```text
id

dayNumber

date

title

route

summary

driverDashboard

journey

stops[]

arrival

tomorrow

metadata
```

---

# Summary

General information.

```text
title

subtitle

departureTime

estimatedArrival

distanceKm

drivingTime

totalStopTime

weatherSummary

highestElevation

tripProgress

heroImage

heroImageCredit
```

---

# Driver Dashboard

```text
departureTime

distanceKm

drivingTime

weather

roadCondition

highestElevation

chargingStops

sunrise

sunset

roadType
```

---

# Journey

High-level journey.

Array

```text
JourneyItem
```

Example

Departure

↓

Coffee + Charge

↓

Scenic Stop

↓

Picnic

↓

Hotel

Properties

```text
time

title

icon

stopId
```

---

# Stop Object

This is the most important object.

Every stop uses this structure.

```typescript
Stop
```

---

## Identity

```text
id

sequence

type

title

subtitle
```

Types

```text
departure

meeting

charging

coffee

viewpoint

waterfall

restaurant

bakery

picnic

activity

fuel

hotel

destination
```

---

## Timing

```text
plannedArrival

arrivalWindowStart

arrivalWindowEnd

recommendedStayMinutes

plannedDeparture
```

---

## Purpose

Multiple values allowed.

```text
coffee

charging

breakfast

lunch

picnic

viewpoint

stretch

shopping

playground

toilet

fuel

hotel
```

---

# Meeting Point

```text
meetingPointName

meetingPurpose

meetingWindow

nextMeetingPoint
```

---

# Navigation

```text
parkingName

parkingLatitude

parkingLongitude

parkingAddress

walkingDistanceMeters

walkingTimeMinutes

googleMapsUrl

appleMapsUrl
```

Always navigate to parking.

Never attraction.

---

# Driver

```text
roadNotes

speedLimitNotes

parkingNotes

departureRecommendation

roadHazards

restrooms

accessibility
```

---

# Navigator

```text
story

interestingFact

hiddenGem

nextDestination

recommendedOrder
```

---

# Family

```text
kidsFriendly

playground

babyChanging

picnicTables

strollerFriendly

dogFriendly

restrooms

waterAvailable
```

---

# Food Strategy

```text
recommendedMeal

packedFoodRecommendation

coffeeRecommendation

dessertRecommendation

restaurantRecommendation

iceCreamRecommendation
```

Examples

```text
Coffee only

Packed lunch

Buy dessert

Skip

Worth replacing packed lunch
```

---

# Local Discovery

Optional.

```text
name

category

whyFamous

history

signatureDish

vegetarianOptions

veganOptions

coffeeRating

worthStopping

ourRecommendation
```

---

# EV Charging

Optional.

```text
chargerName

network

compatibleVehicles

numberOfStalls

maximumPowerKW

arrivalSOC

departureSOC

estimatedChargeMinutes

estimatedEnergyKWh

estimatedPricePerKWh

estimatedSessionCost

paymentMethods

plugTypes

availabilityNotes
```

Nearby

```text
coffee

restaurant

grocery

playground

restrooms

shopping
```

---

# Experience

```text
whyStopHere

bestUse

recommendedActivities

skipConditions

recommendedStayReason
```

---

# Photography

```text
bestView

familyPhotoSpot

lensRecommendation

goldenHour

droneAllowed

tripodFriendly

estimatedPhotoTime
```

---

# Weather

```text
planA

planB

rainAlternative

windAlternative

weatherNotes
```

---

# Trip Intelligence

One recommendation.

```text
message

priority

reason
```

Example

```text
Enjoy your packed lunch here.

Reason

Best scenery today.
```

---

# Before Leaving

Checklist.

```text
everyoneReady

chargingComplete

waterFilled

cameraPacked

navigationLoaded

nextMeetingLoaded
```

---

# Arrival

```text
accommodation

checkIn

parking

overnightCharging

nearestGrocery

dinnerRecommendation
```

---

# Tomorrow

```text
title

route

weather

departureTime

highlights
```

---

# Images

Optional.

```text
hero

gallery

photoCredits
```

---

# Offline

```text
offlineReady

cachedMaps

cachedImages

cachedNavigation
```

---

# Metadata

```text
created

updated

verified

verifiedBy

confidence
```

Confidence

```text
Confirmed

Verified

Community

Estimated
```

---

# Future Extensions

The data model is intentionally extensible.

Future modules may add

Traffic

Weather API

Expense Tracking

Journal Entries

Photo Memories

Live Charging Status

Road Closures

Wildlife Alerts

Ferry Status

Travel Budget

Health Information

Emergency Contacts

without changing the core schema.

---

# Guiding Principle

Every itinerary screen must be generated entirely from this data model.

Adding a new itinerary day should require only new data—not new UI code.

The Roadbook component should render any day using this schema, ensuring consistency, maintainability, and offline capability across the entire Norway Road Trip Companion.