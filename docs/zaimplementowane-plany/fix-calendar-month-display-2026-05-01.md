## Fix Calendar Month Display - 2026-05-01

### Context
When viewing May in the calendar, previous days from April were shown with April's entries. The calendar grid should only show entries for the currently viewed month. Padding days from adjacent months now appear empty.

### Scope
IN: 
- Fix getDayEntry to only return entries for exact date being displayed
- Ensure padding days from previous/next months don't show entries from wrong month
- Keep existing calendar grid structure (42 days, 6 weeks)

OUT:
- Changing calendar grid layout
- Adding new features
- Modifying database queries
- Changing emotion color display logic

### Implementation
- [x] A1. Modified `getDayEntry` in `useCalendar.ts` to return empty entries for non-current month days
- [x] A2. Removed unused parameters from getDayEntry function signature
- [x] A3. Updated MoodCalendar.tsx to remove unused year/month calculation variables
- [x] B1. Fixed TypeScript errors in database.ts by removing journey_day from return type
- [x] B2. Verified padding days now show no entry data

### Verification
- [x] Linter/Typecheck passed
- [x] Build succeeded
- [x] Manual test: Calendar now correctly shows entries only for current month days. Padding days from adjacent months appear faded and have no entry data.
