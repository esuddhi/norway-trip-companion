# Norway Road Trip Companion

# ROADBOOK_DAY_TEMPLATE.md

Version: 2.0
Status: LOCKED
Last Updated: 25 July 2026

---

# Purpose

This document defines the canonical UX, layout, information hierarchy and content model for every itinerary day.

The application is not simply an itinerary viewer.

It is a **Digital Roadbook** that guides families through each day of their journey.

Every itinerary day (Day 1–Day 7) must follow this template.

Only the underlying data changes.

The user experience remains consistent.

---

# Core Philosophy

The Roadbook should quietly answer one question:

> **"What should we do next?"**

without overwhelming the user.

The Roadbook should reduce decision making and encourage families to enjoy the journey rather than constantly planning the next stop.

---

# Design Principles

Every screen should:

- Reduce stress
- Encourage exploration
- Support two-vehicle travel
- Integrate EV charging naturally
- Support homemade food planning
- Adapt to weather changes
- Be usable offline
- Require no prior knowledge of the destination

---

# Information Hierarchy

1. What happens next?
2. Where do we meet?
3. Where do we park?
4. Why should we stop?
5. How should we spend our time?
6. What makes this stop memorable?

---

# Daily Layout

## 1. Hero Banner

Displays:

- Day number
- Date
- Route
- Departure time
- ETA
- Distance
- Driving time
- Hero image
- Trip progress

Actions:

- Start Navigation
- View Timeline

---

## 2. Driver Dashboard

Quick summary for the driver.

Includes:

- Departure time
- Distance
- Driving time
- Highest elevation
- Weather
- Charging stops
- Sunrise / Sunset
- Road type

Actions:

- Charging Plan
- Parking Locations
- Emergency Information

---

## 3. Today's Journey

Visual timeline:

Departure

↓

Coffee & Charging

↓

Scenic Experience

↓

Picnic

↓

Coffee

↓

Accommodation

---

## 4. Journey Stops

Each stop follows the exact same structure.

---

### Stop Essentials

Displayed at the top of every stop.

Includes:

- Stop name
- Purpose
- Arrival time
- Departure time
- Recommended stay
- Meeting window
- Parking quality
- Walking distance
- Roadbook Rating

---

### Meeting Point

Every stop includes:

- Purpose
- Meeting window
- Parking name
- Parking GPS
- Google Maps
- Apple Maps
- Walking distance
- Walking time

Navigation always targets the parking location—not the attraction.

---

### Driver Information

Includes:

- Road notes
- Parking notes
- Speed changes
- Accessibility
- EV charging (if applicable)
- Departure recommendation

---

### Navigator Information

Includes:

- Local story
- Interesting facts
- Hidden gems
- Photography notes
- Next destination

Stories should be concise (maximum 60 words) and memorable.

---

### Family Experience

Recommend how to use the stop.

Examples:

- Stretch your legs
- Let the kids play
- Enjoy the scenery
- Homemade picnic
- Restrooms
- Ice cream
- Scenic walk

---

### Food Strategy

Assume the family may carry homemade food.

For every stop recommend one of:

- Homemade breakfast
- Homemade lunch
- Packed snacks
- Coffee only
- Dessert only
- Restaurant
- Skip food

Recommendations should complement the itinerary rather than encourage unnecessary spending.

---

### Curated Local Discovery (Optional)

Display this section **only** when there is a genuine recommendation.

Never display placeholders.

#### Required Information

- Business name
- Category
- Why it is famous
- Signature items
- Vegetarian friendliness
- Roadbook Rating
- Roadbook Recommendation
- Additional time required
- Walking distance from parking

#### Roadbook Recommendation

Examples:

- Coffee only
- Dessert only
- Worth replacing packed lunch
- Save packed lunch for later
- Skip today

#### Roadbook Rating

★★★★★ Don't Miss

★★★★☆ Excellent Stop

★★★☆☆ Good if Time Allows

★★☆☆☆ Optional

★☆☆☆☆ Skip Today

The rating considers:

- Minimal detour
- Easy parking
- Family friendliness
- Vegetarian options
- Authenticity
- Time efficiency
- Weather suitability
- Overall value for today's itinerary

If there is no genuinely worthwhile recommendation, omit this section entirely.

---

### EV Charging (Optional)

Only shown when charging is relevant.

Tesla-first presentation.

Display:

- Network
- Compatibility (Tesla / CCS / Volvo EX40)
- Number of stalls
- Maximum power
- Arrival SOC
- Departure SOC
- Estimated charge time
- Estimated energy
- Estimated NOK/kWh
- Estimated session cost

Nearby:

- Coffee
- Restrooms
- Grocery
- Playground
- Walking distance

Charging should always feel like part of the journey rather than a task.

---

### Photography

Includes:

- Best viewpoint
- Family photo location
- Lens recommendation
- Golden hour
- Drone information
- Time required

---

### Weather Adaptive

Every stop contains:

☀ Plan A

🌧 Plan B

Rain should never require redesigning the day.

---

### Trip Intelligence

One personalised recommendation.

Examples:

- Save your packed lunch for the next stop.
- Rain expected in one hour.
- Excellent weather for photos.
- Stay an extra 15 minutes.

Only one recommendation per stop.

---

### Before Leaving

Checklist:

- Everyone ready
- Charge disconnected
- Water bottles filled
- Camera packed
- Navigation started
- Next meeting point loaded

---

## 5. Arrival

Includes:

- Accommodation
- Parking
- EV charging
- Grocery
- Dinner recommendation
- Evening suggestion

---

## 6. Tomorrow Preview

Displays:

- Tomorrow's route
- Departure time
- Highlights
- Weather
- Estimated driving time

---

# Guiding Rules

- Navigate to parking, never directly to attractions.
- Do not display generic recommendations.
- Curate rather than catalogue.
- Every recommendation must add value.
- Show fewer, better recommendations.
- Essential information first.
- Detailed information is collapsible.
- Every stop should be understandable in under 30 seconds.
- The Roadbook should remain useful without an internet connection.

---

# Definition of Done

Every stop is complete only if it contains:

- Stop Essentials
- Meeting Point
- Parking GPS
- Driver Information
- Navigator Information
- Family Experience
- Food Strategy
- Curated Local Discovery (if applicable)
- EV Charging (if applicable)
- Photography
- Weather Plan
- Trip Intelligence
- Before Leaving Checklist

---

# Final Vision

The Norway Road Trip Companion should feel like travelling with a trusted friend who has already driven this exact journey many times. It quietly combines navigation, charging, local discoveries, family-friendly advice, weather-aware planning, and memorable experiences into one calm, premium Roadbook that helps the family enjoy Norway together.
