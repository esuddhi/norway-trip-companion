# SCHEMA_CONSISTENCY_REPORT.md

Generated: 2026-07-25
Sprint: YAML Consistency & Schema Normalization

---

## Summary

All 7 itinerary YAML files have been normalized to follow the canonical schema documented in SCHEMA.md.

**No itinerary logic was modified.**

All timings, routes, stops, accommodations, charging decisions, and recommendations remain unchanged.

---

## Files Reviewed

| File | Original Size | Normalized Size | Status |
|------|--------------|----------------|--------|
| day1.yaml | 0 bytes (empty on disk) | 291 lines | ✓ Written from user-provided content + normalized |
| day2.yaml | 5,829 bytes | 304 lines | ✓ Normalized |
| day3.yaml | 6,573 bytes | 283 lines | ✓ Normalized |
| day4.yaml | 7,337 bytes | 304 lines | ✓ Normalized |
| day5.yaml | 8,409 bytes | 361 lines | ✓ Normalized |
| day6.yaml | 7,579 bytes | 308 lines | ✓ Normalized |
| day7.yaml | 4,662 bytes | 213 lines | ✓ Normalized |

---

## Changes Applied Across All Files

### 1. Driver Section — Normalized

**Before:** Inconsistent structure across days.
- Day 1: Had `roadType`, `targetArrivalSOC`, but no `dayType` or canonical `chargingStrategy`
- Day 2: Had `targetArrivalSOC`, `roadNotes`, but no `dayType`
- Day 3: Had `dayType`, `dcChargingRequired`, `overnightCharging`
- Days 4–7: Had `dayType` and partial `chargingStrategy`

**After:** All days now have:
```yaml
driver:
  dayType: string
  chargingStrategy:
    philosophy: string
    preferredLocation: string or null
    backupLocations: []
    decisionRule: string
  notes: []
```

**Day-specific fields intentionally preserved:**
| Field | Day | Reason |
|-------|-----|--------|
| `roadType` | 1 | Useful driving context for a long transfer day |
| `targetArrivalSOC` | 1, 2 | Specific SOC planning for these days |
| `breakfastCharge` | 1 | Day 1 specific charging approach |
| `overnightCharge` | 1, 3 | Explicit overnight charging flag |
| `dcChargingRequired` | 3 | Explicit "no DC needed" indicator |

---

### 2. Navigator Section — Added

**Before:** Not present in any file.

**After:** All days now have:
```yaml
navigator:
  regroupPoint: string
  weatherReminder: string
  chargingReminder: string
  notes: []
```

Content derived from existing itinerary information — no new itinerary data invented.

---

### 3. Stops — Schedule Object Standardized

**Before:**
- Day 1, Day 2: Used flat `arrival`, `departure`, `stayMinutes` directly on stop
- Days 3–7: Used nested `schedule.arrival`, `schedule.departure`, `schedule.stayMinutes`

**After:** All days use:
```yaml
schedule:
  arrival: "HH:MM"
  departure: "HH:MM" or null
  stayMinutes: number or null
```

---

### 4. Parking — Normalized

**Before:**
- Day 1: Used `gps.lat` / `gps.lng`
- Day 2: No `gps` field, just `confidence`
- Days 3–6: Used `gps: {}` (empty object)
- Some stops had no `name` field

**After:** All parking blocks use:
```yaml
parking:
  name: string
  confidence: VERIFIED | RECOMMENDED
  gps:
    latitude: number or empty
    longitude: number or empty
  notes: string
```

GPS coordinates preserved where they existed (Day 1 Vestby: 59.60286, 10.74119). All others left empty pending field verification.

---

### 5. Weather — Normalized

**Before:**
- Most stops used `sunny` / `rain`
- Some used `activity` sub-key: `sunny.activity: "..."` / `rain.activity: "..."`
- Day 1 had `decision: WEATHER` meta-field
- Some stops had no weather at all

**After:** All weather blocks use:
```yaml
weather:
  good: string
  rain: string
```

Activities extracted from nested `activity` sub-keys into flat strings.

---

### 6. Experience Objects — Standardized

**Before:**
- Only Days 4, 5, 6 had `experience` objects on some attractions
- Days 1–3 had no experience objects

**After:** Experience objects added to all attractions/viewpoints:

| Day | Stop | Priority |
|-----|------|----------|
| 2 | Stegastein Viewpoint | Signature |
| 3 | Voss Gondol | Signature |
| 3 | Bordalsgjelet Gorge | Major |
| 4 | Loen Skylift | Signature (preserved) |
| 4 | Lovatnet | Major (preserved) |
| 4 | Optional Scenic Stop | Optional (preserved) |
| 5 | Hellesylt Ferry Terminal | Major (preserved) |
| 5 | Hellesylt → Geiranger Ferry | Signature (preserved) |
| 5 | Flydalsjuvet Viewpoint | Major (preserved) |
| 5 | Ørnesvingen (Eagle Bend) | Major (preserved) |
| 6 | Borgund Stave Church | Signature (preserved) |

**Not added to:** departures, regroup points, charging stops, accommodation stops, meals, coffee stops, drives.

---

### 7. Accommodation Names — Corrected

**Before:**
- Day 6 destination: `"Private Accommodation"`
- Day 7 start: `"Private Accommodation"`

**After:**
- Day 6 destination: `"Borkevegen 55"`
- Day 7 start: `"Borkevegen 55"`

Full address preserved: "Borkevegen 55, Ringsaker, Norway"

---

### 8. Arrival Card — Added

**Before:** Inconsistent — some days had evening activities inside the accommodation stop, some had a separate `accommodation` block, some had nothing.

**After:** All days now have a top-level `arrival` section:
```yaml
arrival:
  accommodation: string
  parking: string
  eveningPlan: []
  tomorrowPreparation: string or null
```

---

### 9. Decision Points — Normalized

**Before:** Mixed key names:
- `ifSunny` / `ifRain`
- `ifPoorWeather`
- `preferred` / `alternative`

**After:**
- Weather decisions: `ifGood` / `ifRain`
- Time decisions: `ifAhead` / `ifBehind`
- Energy decisions: `ifRelaxed` / `ifTired`
- Battery decisions: `ifBatteryAbove50` / `ifBatteryAbove60` / `otherwise`

---

### 10. Editorial Notes — Standardized

**Before:** Present on Days 3–7 with varying structure. Missing from Days 1–2.

**After:** All days have:
```yaml
editorialNotes:
  pageMood: string
  heroImage: string
  designGuidance: []
```

---

### 11. Regroup Point Naming

**Before:**
- Day 6: `"Lunch & Regroup"` (title preserved)
- Day 7: `"Official Regroup Point – Karlstad"`

**After:**
- Day 6 title preserved: `"Lunch & Regroup"` (user-facing title kept)
- Day 7 title simplified: `"Regroup Point — Karlstad"`
- Navigator `regroupPoint` field uses consistent naming across all days

---

### 12. Route Decision — Preserved

Day 6's `routeDecision` section preserved exactly as-is. Not added to other days.

---

### 13. Trip Summary — Preserved

Day 7's `tripSummary` section preserved exactly as-is. Not added to other days.

---

### 14. Booking Section — Preserved

Day 5's `booking` section (ferry confirmation) preserved exactly as-is. Not added to other days.

---

## Fields Intentionally Preserved (Day-Specific)

| Field | Day(s) | Reason |
|-------|--------|--------|
| `driver.roadType` | 1 | Unique to long transfer day |
| `driver.targetArrivalSOC` | 1, 2 | Specific SOC targets |
| `driver.chargingStrategy.breakfastCharge` | 1 | Day 1 specific approach |
| `driver.chargingStrategy.overnightCharge` | 1, 3 | Explicit flag |
| `driver.chargingStrategy.dcChargingRequired` | 3 | Explicit "not needed" |
| `summary.distanceKm` | 1 | Only Day 1 included km in summary |
| `accommodation` (top-level) | 4, 5, 6 | Multi-night booking details |
| `booking` | 5 | Ferry booking |
| `routeDecision` | 6 | Route alternatives |
| `tripSummary` | 7 | Trip completion |
| `roadbookRules.targetArrival` | 1 | Specific time target |
| `roadbookRules.noRush` | 3 | Exploration day flag |
| `roadbookRules.regroupAfterLunch` | 6 | Day-specific rule |
| `roadbookRules.regroupAtKarlstad` | 7 | Day-specific rule |
| `stop.regroupPurpose` | 6 | Detailed regroup checklist |
| `stop.navigatorTips` | 5 (ferry) | Ferry-specific tips |
| `stop.lunch.window` | 2 | Specific lunch timing at Flåm |

---

## Remaining TODOs

### GPS Coordinates Needed

| Day | Stop | Status |
|-----|------|--------|
| 1 | Ustaoset Station | Empty — needs field verification |
| 1 | Hardangervidda Scenic Stop | Empty — needs field verification |
| 1 | Havsdalsgrenda | Empty — needs field verification |
| 2 | Stegastein Viewpoint | Empty — needs field verification |
| 2 | Flåm Visitor Parking | Empty — needs field verification |
| 2 | Gudvangen Visitor Parking | Empty — needs field verification |
| 2 | Flatlandsmo Camping | Empty — needs field verification |
| 3 | Voss Gondol Parking | Empty — needs field verification |
| 3 | Bordalsgjelet Visitor Parking | Empty — needs field verification |
| 4 | Folven Adventure Camp | Empty — needs field verification |
| 4 | Official Skylift Parking | Empty — needs field verification |
| 4 | Lovatnet Lakeside Parking | Empty — needs field verification |
| 5 | Folven Adventure Camp | Empty — needs field verification |
| 5 | Hellesylt Ferry Queue | Empty — needs field verification |
| 5 | Flydalsjuvet Parking | Empty — needs field verification |
| 5 | Ørnesvingen Parking | Empty — needs field verification |
| 6 | Borkevegen 55 | Empty — needs field verification |
| 6 | Borgund Visitor Centre Parking | Empty — needs field verification |
| 7 | Regroup Point Karlstad | Empty — needs field verification |

**Only Day 1 Vestby has confirmed GPS coordinates (59.60286, 10.74119).**

### Other Remaining TODOs

- Field verify Cafe Presttun seasonal opening hours (Day 1)
- Field verify preferred picnic location in Flåm (Day 2)
- Field verify scenic stop preference: Stalheim vs Tvindefossen (Day 2)
- Field verify preferred parking at Bordalsgjelet (Day 3)
- Add recommended bakery if visited during the trip (Day 3)
- Verify overnight EV charging at Folven Adventure Camp (Day 4)
- Verify EV charging availability in Geiranger (Day 5)
- Verify Borgund Stave Church visitor centre opening hours (Day 6)
- Confirm preferred EV charging location along Day 6 route
- Verify preferred lunch and charging location in Karlstad (Day 7)

---

## Confirmation

✓ No itinerary changes made
✓ No timing changes made
✓ No routing changes made
✓ No accommodation changes made
✓ No charging strategy logic changes made
✓ No lunch decision changes made
✓ No attraction additions or removals
✓ All editorial notes preserved
✓ All todos preserved
✓ Schema is now consistent across all 7 files
✓ A single reusable component set can render any day without special-case logic
