# PRODUCT_VISION.md — Product Goals & Design Philosophy

## One-Line Vision

The single source of truth for a family driving through Norway — offline, beautiful, and stress-free.

---

## What This Is

A mobile-first Progressive Web App that replaces scattered bookmarks, PDFs, Google searches, and WhatsApp messages with one calm, capable travel companion.

It should feel like:

- **Apple Maps** — clean, confident navigation
- **Google Trips** — organized itinerary
- **Lonely Planet** — local knowledge and discovery
- **Tesla Navigation** — EV-aware route planning
- **TripAdvisor** — trusted recommendations

Without becoming complicated.

---

## Target Users

### Primary

| User | Needs |
|------|-------|
| Parents (2 families, 4 adults) | Plan efficiently, reduce stress, find kid-friendly stops |
| Children (ages 3–14) | "Are we there yet?" answers, fun activities, short attention spans |

### Secondary

| User | Needs |
|------|-------|
| EV drivers (Tesla Model Y, Volvo EX40) | Charging confidence, range planning |
| International tourists | Offline access, local knowledge, emergency info in English |
| Road trip enthusiasts | Scenic routes, photography spots, hidden gems |

---

## Core Principles

Every feature must satisfy at least one:

1. **Save time** — don't make users search the internet
2. **Reduce stress** — anticipate problems before they happen
3. **Improve safety** — emergency info, road conditions, weather
4. **Improve experience** — discover beauty, create memories
5. **Help children enjoy** — age-appropriate activities, engagement
6. **Work offline** — no dependency on cellular coverage in fjords
7. **Be visually attractive** — premium, calm, Norway-inspired

If a feature doesn't serve at least one of these, it doesn't belong.

---

## Design Philosophy

### Visual Identity

- **Modern** — current design patterns, not dated
- **Minimal** — every element earns its place
- **Premium** — feels like a luxury product, not a prototype
- **Norway-inspired** — colors from nature: snow, fjord, forest, granite, aurora

### Interaction Design

- **Mobile first** — designed for one-handed use in a car (passenger)
- **Offline first** — assume no network, delight when there is one
- **Fast** — instant response, no loading spinners for local data
- **Accessible** — works for everyone, including with bright sun / dark car
- **Touch-friendly** — large targets, clear actions, no precision taps

### Information Architecture

- **Single source of truth** — one place for all trip information
- **Progressive disclosure** — overview first, detail on demand
- **Contextual** — show what's relevant now (today's plan, next stop)
- **Scannable** — eyebrows, headings, visual hierarchy

---

## Color Palette

Inspired by Norway's landscape:

| Name | Hex (approx) | Inspiration |
|------|--------------|-------------|
| Snow White | `#f5f5ef` | Fresh snow on mountain peaks |
| Deep Fjord Blue | `#15333c` | Deep fjord water |
| Forest Green | `#4f8c68` | Norwegian pine forests |
| Granite Gray | `#687871` | Mountain rock faces |
| Aurora Accent | `#d7e58f` | Northern lights glow |
| Warm Gold | `#d7b563` | Midnight sun |

Avoid overly saturated colors. The palette should feel natural and calming.

---

## Trip Context

| Detail | Value |
|--------|-------|
| Start | Gothenburg, Sweden |
| Duration | 7 days (26 Jul – 1 Aug 2026) |
| Vehicle | Tesla Model Y + Volvo EX40 |
| Passengers | 4 adults, 4 children (ages 3–14) |
| Priority | Nature, scenic drives, family activities, photography, food, short hikes, EV charging, comfort |
| Style | Self-drive, avoid long detours |

### Locked Itinerary (Approved)

- Day 1: Gothenburg → Geilo
- Day 2: Geilo → Flåm → Voss
- Day 3: Explore Voss
- Day 4: Voss → Loen → Stryn / Hjelle
- Day 5: Hellesylt → Geiranger → Stryn
- Day 6: Stryn → Lillehammer / Ringsaker
- Day 7: Ringsaker → Gothenburg

Do not modify locked itinerary without explicit approval.

---

## What Success Looks Like

### During the trip

- "I didn't need to Google anything."
- "The kids knew what was coming next."
- "We never worried about running out of charge."
- "We discovered amazing stops we would have missed."
- "It worked perfectly in the tunnel and on the mountain."

### After the trip

- "I wish every trip had this."
- "The packing list saved us."
- "The emergency contacts gave us peace of mind."

---

## Non-Goals

- Not a social network.
- Not a booking engine.
- Not a generic travel app.
- Not a map replacement (complements, not replaces).
- Not a real-time traffic app.
- Not multiplayer / multi-device sync (single-device is fine).

---

## Success Metrics (Qualitative)

Since this is a personal/family project:

- Does it reduce trip planning anxiety?
- Does it work when there's no internet?
- Would you hand it to a 10-year-old to answer "what are we doing today?"
- Does it look good enough to show someone?
- Is the code clean enough to be proud of?
