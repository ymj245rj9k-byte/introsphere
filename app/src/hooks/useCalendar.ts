import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { getCalendarEntriesForMonth } from '@/lib/database';
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

    getCalendarEntriesForMonth(user.id, year, month)
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
  const getDayEntry = (day: number, isCurrentMonth: boolean): MoodCalendarDayEntry => {
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayEntries = entriesMap[dateKey] || [];
    
    // Take first entry for display (color, emotion)
    const firstEntry = dayEntries[0];
    
    return {
      date: day,
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
