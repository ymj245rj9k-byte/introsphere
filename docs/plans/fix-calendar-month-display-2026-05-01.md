# Fix Calendar Month Display - 2026-05-01

## Context

- **Feature name**: Fix Calendar Month Display
- **Description**: When viewing May in the calendar, previous days from April are shown with April's entries. The calendar grid should only show entries for the currently viewed month.
- **Why needed**: Users see confusing data where April entries appear in May's calendar view because the grid includes padding days from adjacent months but displays them with incorrect entry data.
- **Priority**: High

---

## Scope Definition

```
IN SCOPE:
- Fix getDayEntry to only return entries for the exact date being displayed
- Ensure padding days from previous/next months don't show entries from the wrong month
- Keep existing calendar grid structure (42 days, 6 weeks)

OUT OF SCOPE:
- Changing calendar grid layout
- Adding new features
- Modifying database queries
- Changing emotion color display logic
```

---

## Implementation Plan

### Section A: Fix useCalendar Hook Logic

- [ ] A1. Modify `getDayEntry` in `useCalendar.ts` to properly filter entries by exact date key
- [ ] A2. Ensure padding days (isCurrentMonth=false) return empty entries even if date key matches in other months
- [ ] A3. Verify date key generation uses correct year/month for each day type

**Manual Deployment Test:**
> Open calendar in May - verify that days from April shown as padding have no entries and appear faded/inactive

---

### Section B: Verify Cross-Month Behavior

- [ ] B1. Test navigation between months (April → May → June)
- [ ] B2. Verify entries only appear on correct dates in current month
- [ ] B3. Confirm padding days from adjacent months show no entry data

**Manual Deployment Test:**
> Create an entry on April 30, navigate to May - verify April 30 entry doesn't appear in May's calendar grid

---

## Verification Steps

After completing all sections, perform these final checks:

- [ ] Run linter/typecheck: `npm run lint`
- [ ] Build application: `npm run build`
- [ ] Verify build succeeds without errors
- [ ] Manual verification: Navigate calendar between months, create entries, verify they only appear in correct month
- [ ] **ALWAYS invoke Tester agent** (docs/agents/07_tester.md) to validate the implementation

---

## Save Plan

Save the implemented plan to:

```
@/docs/zaimplementowane-plany.md/fix-calendar-month-display-2026-05-01.md
```
