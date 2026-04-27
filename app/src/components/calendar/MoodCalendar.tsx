import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CalendarDay } from './CalendarDay';
import { CalendarEntryDialog } from './CalendarEntry';
import { useAuth } from '@/hooks/useAuth';
import { useCalendar } from '@/hooks/useCalendar';
import type { MoodCalendarDayEntry, CalendarEntryData } from '@/lib/database';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function MoodCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEntries, setSelectedEntries] = useState<CalendarEntryData[]>([]);
  const [showDialog, setShowDialog] = useState(false);

  const { user } = useAuth();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const { entriesMap, getDayEntry } = useCalendar(user, year, month);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDayClick = (day: MoodCalendarDayEntry) => {
    if (day.hasEntry && day.emotion) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day.date).padStart(2, '0')}`;
      const dayEntries = entriesMap[dateKey] || [];

      if (dayEntries.length > 0) {
        setSelectedEntries(dayEntries);
        setShowDialog(true);
      }
    }
  };

  // Generate 6-week grid (42 days)
  const firstDay = new Date(year, month, 1);
  const startingDayOfWeek = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: MoodCalendarDayEntry[] = [];

  // Previous month days
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = 0; i < startingDayOfWeek; i++) {
    const date = prevMonthLastDay - startingDayOfWeek + i + 1;
    const dayEntry = getDayEntry(date, false);
    days.push(dayEntry);
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const dayEntry = getDayEntry(i, true);
    days.push(dayEntry);
  }

  // Next month days to fill 42 cells
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    const dayEntry = getDayEntry(i, false);
    days.push(dayEntry);
  }

  return (
    <div
      className="w-full rounded-xl border p-3 sm:p-4 flex flex-col transition-all duration-300"
      style={{
        backgroundColor: 'var(--atmosphere-bg, #fff)',
        borderColor: 'var(--atmosphere-border)',
        boxShadow: 'var(--atmosphere-shadow)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2 sm:mb-3 flex-shrink-0">
        <Button variant="ghost" size="sm" onClick={prevMonth} aria-label="Previous month">
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-sm sm:text-base font-semibold text-atm-heading px-2">
          {MONTHS[month]} {year}
        </h2>
        <Button variant="ghost" size="sm" onClick={nextMonth} aria-label="Next month">
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-1 flex-shrink-0">
        {DAYS.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-atm-muted py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1 flex-grow min-h-0">
        {days.map((day, index) => (
          <div key={index} className="aspect-square">
            <CalendarDay
              day={day}
              onClick={handleDayClick}
            />
          </div>
        ))}
      </div>

       {/* Entry Dialog */}
       {selectedEntries.length > 0 && (
         <CalendarEntryDialog
           entries={selectedEntries}
           open={showDialog}
           onClose={() => setShowDialog(false)}
         />
       )}
    </div>
  );
}
