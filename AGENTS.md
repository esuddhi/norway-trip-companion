# AGENTS.md — AI Development Contract

## Purpose

This document governs how AI agents interact with the norway-trip-companion codebase.
Every AI-assisted change must comply with these rules.

---

## Before Any Change

1. Read this file.
2. Read ARCHITECTURE.md for system structure.
3. Read CODING_STANDARDS.md for conventions.
4. Read ROADMAP.md for current priorities.
5. Read the affected source files.
6. Understand the existing pattern before proposing a new one.

---

## Core Rules

### Architecture

- Never rewrite working code.
- Never duplicate logic.
- Preserve backward compatibility.
- Respect the data-first architecture: all trip content lives in `src/data/trip.json`.
- UI components consume typed data only — never hardcode itinerary content.
- Zustand is the only state management solution.
- Zod is the only runtime validation solution.

### Code Quality

- TypeScript strict mode. No `any` types.
- No dead code. No commented-out code.
- No magic numbers or strings.
- Every function has one clear responsibility.
- Prefer pure functions over side effects.
- Match existing formatting (Prettier: single quotes, no semicolons, 100-char width).

### File Organization

- One responsibility per file.
- Pages live in `src/pages/` (one file per page).
- Reusable components live in `src/components/`.
- Pure utility functions live in `src/lib/`.
- Custom hooks live in `src/hooks/`.
- Data and schemas live in `src/data/`.
- State management lives in `src/store/`.
- Type definitions live in `src/types/` when shared.

### Dependencies

- Do not add new dependencies without justification.
- Prefer built-in browser APIs over libraries.
- If a library is added, pin to exact version.
- Verify the library is actively maintained and well-known.

### Testing

- Every new utility must have a test.
- Every bug fix should add a regression test.
- Tests live alongside source files (`*.test.ts` / `*.test.tsx`).
- Run `npm test` and `npm run build` before presenting results.

### Documentation

- Update ROADMAP.md when features are completed.
- Update ARCHITECTURE.md when structure changes.
- Update DECISIONS.md for non-trivial architectural choices.
- Never allow documentation to become stale.

---

## Commit Rules

- Small, focused commits.
- One logical change per commit.
- Conventional commit messages: `type: description`
  - `feat:` new feature
  - `fix:` bug fix
  - `refactor:` code change that neither fixes nor adds
  - `docs:` documentation only
  - `style:` formatting, no logic change
  - `test:` adding or fixing tests
  - `chore:` tooling, config, dependencies
- No unrelated changes bundled together.

---

## Behavioral Rules

- If uncertain, inspect the code — do not guess.
- If a task requires more than one file change, explain the plan first.
- If a change breaks the build, fix it before moving on.
- Never sacrifice architecture for speed.
- Think: "Would this improve the experience for a family driving through Norway?"
- If the answer is no, do not build it.

---

## What NOT To Do

- Do not introduce new frameworks without explicit approval.
- Do not redesign working components unnecessarily.
- Do not add features that increase complexity without user value.
- Do not ignore TypeScript errors or lint warnings.
- Do not push to `main` directly.
- Do not refactor unrelated code during feature work.

---

## Quality Gate

A change is complete only when:

- [ ] Feature works as intended
- [ ] TypeScript compiles without errors
- [ ] Lint passes (`npm run lint`)
- [ ] Format passes (`npm run format`)
- [ ] Data validates (`npm run validate:data`)
- [ ] Tests pass (`npm test`)
- [ ] Build succeeds (`npm run build`)
- [ ] Documentation updated if architecture changed
- [ ] No regressions introduced
