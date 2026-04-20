# AI Developer Agent – Work Plan Template

## Overview

This workflow defines the standard pattern for planning and executing work for the AI Developer Agent. Every work plan must follow this template.

## Core Rules

1. **One Small Functionality** – Each plan must cover exactly ONE small feature or task
2. **Single Session Deployable** – Reject planning if the work cannot be completed in ONE AI agent session
3. **Section-Based** – Plans must be divided into logical sections
4. **Tested** – Manual testing after each section and overall verification
5. **Always Test with Tester Agent** – Invoke the Tester agent after implementation to verify the plan works correctly (as specified in `docs/agents/07_tester.md`)

---

## Work Plan Template

### 1. Context

- **Feature name**:
- **Description** (1-2 sentences):
- **Why needed**:
- **Priority**:

---

### 2. Scope Definition

```
IN SCOPE:
-

OUT OF SCOPE:
-
```

---

### 3. Implementation Plan

#### Section A: [Section Name]

- [ ] A1. [Task description]
- [ ] A2. [Task description]
- [ ] A3. [Task description]

**Manual Deployment Test:**
> Describe how to verify this section works

---

#### Section B: [Section Name] (if needed)

- [ ] B1. [Task description]
- [ ] B2. [Task description]

**Manual Deployment Test:**
> Describe how to verify this section works

---

### 4. Verification Steps

After completing all sections, perform these final checks:

- [ ] Run linter/typecheck: `npm run lint` (or equivalent)
- [ ] Build application: `npm run build`
- [ ] Verify build succeeds without errors
- [ ] Manual verification: [describe what to test manually]
- [ ] **ALWAYS invoke Tester agent** (docs/agents/07_tester.md) to validate the implementation

---

### 5. Save Plan

Save the implemented plan to:

```
@/docs/zaimplementowane-plany.md/[feature-name]-[date].md
```

For example: `add-emotion-wheel-to-home-2026-04-13.md`

Use the following template for the saved plan:

```markdown
## [Feature Name] - [Date]

### Context
[Description]

### Scope
IN: [list]
OUT: [list]

### Implementation
[Section-by-section summary with checkmarks]

### Verification
- [x] Linter/Typecheck passed
- [x] Build succeeded
- [x] Manual test: [result]
```

---

## Rejection Criteria

Do NOT create a work plan if ANY of these apply:

1. The feature requires more than 3-4 hours of work
2. Multiple team members needed for implementation
3. Requires backend schema changes
4. Touches more than 2 main components/pages
5. Cannot be tested independently

If rejected, simplify the scope or break into smaller pieces.

---

## Color System Reference

When implementing UI components, ALWAYS use colors defined in `@/docs/index.css`:

### Emotion Colors (8 sectors)
- `--emotion-ecstasy-yellow` (#F7DC6F) – Ecstasy sector
- `--emotion-admiration-green` (#82E0AA) – Admiration sector
- `--emotion-terror-dark-green` (#2874A6) – Terror sector
- `--emotion-amazement-sea-blue` (#28B4C8) – Amazement sector
- `--emotion-grief-dark-blue` (#1A5276) – Grief sector
- `--emotion-loathing-purple` (#7D3C98) – Loathing sector
- `--emotion-rage-red` (#EC7063) – Rage sector
- `--emotion-vigilance-orange` (#F5B041) – Vigilance sector

### Atmosphere Themes (8 themes)
- `atmosphere-cream-calm` – Cream/beige tones, font: Plus Jakarta Sans
- `atmosphere-green-forest` – Green/earth tones, font: Caveat + Lora
- `atmosphere-dark-ink` – Dark blue/gold tones, font: Cormorant Garamond
- `atmosphere-soft-pink` – Pink tones, font: Jua
- `atmosphere-silver-tech` – Silver/cyan tones, font: Commit Mono
- `atmosphere-solar-flare` – Orange/gold tones, font: Fraunces + Lora
- `atmosphere-desert-rose` – Terracotta/sand tones, font: Lora
- `atmosphere-ocean-deep` – Deep blue tones, font: Newsreader + Inter

### CSS Variables to Use
- `--atmosphere-bg`, `--atmosphere-bg-secondary`
- `--atmosphere-accent`
- `--atmosphere-text`, `--atmosphere-text-heading`, `--atmosphere-text-body`
- `--atmosphere-text-muted`, `--atmosphere-text-accent`
- `--atmosphere-radius`, `--atmosphere-shadow`, `--atmosphere-border`

---

## Typography Rules

- **Line height**: Use sensible line-height (1.5-1.7 for body text, 1.2-1.3 for headings)
- **Letter spacing**: Proper tracking for readability
- **Paragraph spacing**: Use `space-y-*` or `leading-relaxed` for text blocks
- **Never use default line-height** - always specify for typography components

---

## Quick Reference

| Step | Action |
|------|--------|
| 1 | Define one small feature |
| 2 | Check it fits in one session |
| 3 | Create sections with numbered checkboxes |
| 4 | Add manual test after each section |
| 5 | Add final verification (lint, build, test) |
| 6 | ALWAYS invoke Tester agent to validate the plan |
| 7 | Save to docs/zaimplementowane-plany.md/[feature]-[date].md |