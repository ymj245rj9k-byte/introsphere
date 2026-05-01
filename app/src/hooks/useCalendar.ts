import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { getCalendarEntriesForDateRange } from '@/lib/database';
import type { CalendarEntryData, MoodCalendarDayEntry } from '@/lib/database';

export function useCalendar(user: User | null | undefined, year: number, month: number) {
  const [entriesMap, setEntriesMap] = useState<Record<string, CalendarEntryData[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setEntriesMap({});
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Calculate full grid range including padding days from adjacent months
    const firstDayOfMonth = new Date(year, month, 1);
    const startingDayOfWeek = firstDayOfMonth.getDay();
    const gridStart = new Date(year, month, 1 - startingDayOfWeek);

    const lastDayOfMonth = new Date(year, month + 1, 0);
    const endingDayOfWeek = lastDayOfMonth.getDay();
    const remainingDays = endingDayOfWeek === 6 ? 0 : 6 - endingDayOfWeek;
    const gridEnd = new Date(year, month + 1, remainingDays);

    // Ensure we always cover 42 cells
    const totalDays = Math.round((gridEnd.getTime() - gridStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    if (totalDays < 42) {
      gridEnd.setDate(gridEnd.getDate() + (42 - totalDays));
    }

    const startDate = gridStart.toISOString().split('T')[0];
    const endDate = gridEnd.toISOString().split('T')[0];

    getCalendarEntriesForDateRange(user.id, startDate, endDate)
      .then((data) => {
        setEntriesMap(data);
      })
      .catch((err) => {
        setError(err instanceof Error ? err : new Error('Failed to fetch calendar entries'));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, year, month]);

  // Helper to get day entry for calendar grid
  const getDayEntry = (day: number, isCurrentMonth: boolean, useYear?: number, useMonth?: number): MoodCalendarDayEntry => {
    const displayYear = useYear ?? year;
    const displayMonth = useMonth ?? month;
    const dateKey = `${displayYear}-${String(displayMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayEntries = entriesMap[dateKey] || [];
    
    // Take first entry for display (color, emotion)
    const firstEntry = dayEntries[0];
    
    return {
      date: day,
      dateKey,
      hasEntry: dayEntries.length > 0,
      isCurrentMonth,
      emotionColor: firstEntry?.emotionColor,
      emotion: firstEntry?.emotion,
      response: firstEntry?.response,
      question: firstEntry?.question,
      allColors: dayEntries.map(e => e.emotionColor).filter(Boolean) as string[],
    };
  };

  return {
    entriesMap,
    loading,
    error,
    getDayEntry,
  };
}
