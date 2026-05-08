## New Entry (clear) - quick text entry without emotion selection - 2026-05-08

### Context
Allow users to add a free-form text entry without selecting an emotion, which will be stored and displayed in the calendar and reflections list with the date as title.

### Scope
IN:
- Adding a new quick action button on Home page grid
- Creating a new page/component for quick entry form (textarea + save button)
- Saving entry to database (calendar_entries) with null emotion_id
- Displaying entry in calendar (MoodCalendar) and history/reflections
- Entry title shown as date (formatted) in calendar and history
- Quick entries display as "Notes" in reflections instead of "Unknown"
- Quick entries visible in calendar with visual indicators

OUT:
- Changing existing emotion-based entry flow
- Modifying emotion wheel or session logic
- Adding new emotion types
- Backend schema changes (we'll use existing calendar_entries table)

### Implementation
- [x] A1. Added new quick action link/button on Home page grid (icon FileText, label "Quick Entry")
- [x] A2. Created new route `/quick-entry` with a simple form (textarea, save button)
- [x] A3. Form submission calls Supabase function to insert into calendar_entries
- [x] A4. On success, redirect to home
- [x] B1. Verified calendar_entries can store entries with null emotion_id (already nullable)
- [x] B2. Updated MoodCalendar component to display entries regardless of emotion_id (show as dot or marker)
- [x] B3. Updated History page to show these entries (already shows calendar_entries)
- [x] B4. Format date as title for display (already implemented)
- [x] Updated database layer to show "Notes" instead of "Unknown" for quick entries in reflections
- [x] Updated CalendarDay component to show visual indicators for quick entries in calendar

### Verification
- [x] Linter/Typecheck passed
- [x] Build succeeded
- [x] Manual test: Quick entry flow works end-to-end - can create, save, and view entries in calendar and history
- [x] Verified quick entries show as "Notes" in reflections/history tab
- [x] Verified quick entries appear in calendar with visual indicators