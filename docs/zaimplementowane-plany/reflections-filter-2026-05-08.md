## Refleksje Filter - 2026-05-08

### Context
Add filter functionality to the History/Reflections page that filters entries by emotion name (English) or journey name (English) based on the existing Filter button UI.

### Scope
IN: 
- Add filter dropdown component with emotion and journey options
- Filter by emotion id from all emotions (level3 + subspectrum) - 32 total
- Filter by journey id from static journeys data (matches journey_id in database)
- Replace scrollable list with native select dropdowns

OUT:
- Database changes
- API changes

### Implementation

#### Section A: Core Filter State
- [x] A1. Add filter type state (emotion | journey | null) and filter value state
- [x] A2. Add filter logic to filter entries by emotionId or journey_id

#### Section B: Filter UI Component
- [x] B1. Add emotion filter dropdown with all 32 emotions (level3 + subspectrum) by English name
- [x] B2. Add journey filter dropdown with 6 journeys by English title
- [x] B3. Connect filter button to open/close dropdown
- [x] B4. Add clear filter functionality

**Manual Deployment Test:**
> Navigate to History page, click Filter button, select emotion or journey from dropdown, verify entries are filtered correctly.

### Verification
- [x] Linter/Typecheck passed
- [x] Build succeeded
- [x] Manual test: Filter works correctly for both emotions and journeys