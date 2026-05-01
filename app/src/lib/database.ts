import { supabase } from './supabase';
import type { Database } from '@/types/database';
import { journeys as staticJourneys } from '@/data/journeys';

const staticJourneyMap = new Map(staticJourneys.map((j) => [j.id, j.title]));

type CalendarEntryRow = Database['public']['Tables']['calendar_entries']['Row'];

export interface CalendarEntryData {
  id: string;
  date: string;
  emotion: string;
  emotionColor: string;
  response: string;
  question?: string;
  created_at?: string;
  journey_id?: string | null;
  journey_day?: number | null;
}

export interface MoodCalendarDayEntry {
  date: number;
  dateKey: string; // YYYY-MM-DD
  hasEntry: boolean;
  isCurrentMonth: boolean;
  emotionColor?: string;
  emotion?: string;
  response?: string;
  question?: string;
  allColors?: string[];
}

export interface UserStats {
  streakDays: number;
  totalSessions: number;
  topEmotion: { name: string; color: string } | null;
}

/**
 * Saves a mood entry to the database.
 * Creates/updates mood_calendar entry and a calendar_entries record.
 */
export async function saveMoodEntry({
  userId,
  emotionId,
  emotionName,
  color,
  response,
  sourceType = 'mood_checkin',
}: {
  userId: string;
  emotionId: string;
  emotionName: string;
  color: string;
  response: string;
  sourceType?: 'journey' | 'mood_checkin' | 'free_write';
}): Promise<void> {
  const today = new Date();
  const entryDate = today.toISOString().split('T')[0]; // YYYY-MM-DD

  // 1. Upsert mood_calendar entry (one per user per day)
  const { error: calendarError } = await supabase
    .from('mood_calendar')
    .upsert(
      {
        user_id: userId,
        entry_date: entryDate,
        primary_emotion_id: emotionId,
        primary_emotion_name: emotionName,
        color,
        secondary_emotions: null,
      },
      {
        onConflict: 'user_id,entry_date',
      }
    );

  if (calendarError) {
    console.error('Error upserting mood_calendar:', calendarError);
    throw calendarError;
  }

  // 2. Fetch the mood_calendar id for this entry
  const { data: calendarData, error: fetchError } = await supabase
    .from('mood_calendar')
    .select('id')
    .eq('user_id', userId)
    .eq('entry_date', entryDate)
    .single();

  if (fetchError || !calendarData) {
    console.error('Error fetching mood_calendar id:', fetchError);
    throw fetchError || new Error('Failed to fetch calendar id');
  }

  // 3. Insert calendar entry
  const { error: entryError } = await supabase.from('calendar_entries').insert({
    user_id: userId,
    calendar_id: calendarData.id,
    journey_id: null,
    journey_day: null,
    source_type: sourceType,
    content: response,
    emotion_id: emotionId,
    emotion_name: emotionName,
    color,
  });

  if (entryError) {
    console.error('Error inserting calendar_entry:', entryError);
    throw entryError;
  }
}

/**
 * Saves a journey day response to the database.
 * Creates a calendar_entries record linked to the journey day.
 * Also creates/updates the mood_calendar entry with the selected emotion if provided.
 */
export async function saveJourneyDayResponse({
  userId,
  journeyId,
  dayNumber,
  response,
  emotionId,
  emotionName,
  color,
}: {
  userId: string;
  journeyId: string;
  dayNumber: number;
  response: string;
  emotionId?: string | null;
  emotionName?: string | null;
  color?: string | null;
}): Promise<void> {
  const today = new Date();
  const entryDate = today.toISOString().split('T')[0]; // YYYY-MM-DD

  // If emotion is provided, upsert mood_calendar entry
  if (emotionId && emotionName && color) {
    const { error: calendarError } = await supabase
      .from('mood_calendar')
      .upsert(
        {
          user_id: userId,
          entry_date: entryDate,
          primary_emotion_id: emotionId,
          primary_emotion_name: emotionName,
          color,
          secondary_emotions: null,
        },
        {
          onConflict: 'user_id,entry_date',
        }
      );

    if (calendarError) {
      console.error('Error upserting mood_calendar:', calendarError);
      throw calendarError;
    }
  }

  // Fetch the mood_calendar id for this entry (or use a temp approach)
  const { data: calendarData, error: fetchError } = await supabase
    .from('mood_calendar')
    .select('id')
    .eq('user_id', userId)
    .eq('entry_date', entryDate)
    .single();

  if (fetchError || !calendarData) {
    console.error('Error fetching mood_calendar id:', fetchError);
    // If calendar entry doesn't exist and no emotion was set, we still need a calendar_id
    // In this case, we can insert without calendar_id (NULL) or create a minimal mood_calendar entry
    // For simplicity, we'll insert with calendar_id as null if fetch fails
  }

  // Insert calendar entry linked to journey
  const { error: entryError } = await supabase.from('calendar_entries').insert({
    user_id: userId,
    calendar_id: calendarData?.id || null,
    journey_id: journeyId,
    journey_day: dayNumber,
    source_type: 'journey',
    content: response,
    emotion_id: emotionId || null,
    emotion_name: emotionName || null,
    color: color || null,
  });

  if (entryError) {
    console.error('Error inserting calendar_entry for journey:', entryError);
    throw entryError;
  }
}

/**
 * Fetches calendar entries for a given date range.
 * Returns a map: date string (YYYY-MM-DD) -> CalendarEntryData[]
 */
export async function getCalendarEntriesForDateRange(
  userId: string,
  startDate: string, // YYYY-MM-DD
  endDate: string    // YYYY-MM-DD
): Promise<Record<string, CalendarEntryData[]>> {
  const { data, error } = await supabase
    .from('mood_calendar')
    .select(`
      id,
      entry_date,
      primary_emotion_name,
      color,
      entries:calendar_entries(
        id,
        content,
        emotion_id,
        emotion_name,
        color,
        created_at,
        journey_id,
        journey_day,
        source_type
      )
    `)
    .eq('user_id', userId)
    .gte('entry_date', startDate)
    .lte('entry_date', endDate)
    .order('entry_date', { ascending: true });

  if (error) {
    console.error('Error fetching calendar entries:', error);
    return {};
  }

  const entriesMap: Record<string, CalendarEntryData[]> = {};

  data?.forEach((day) => {
    const dateKey = day.entry_date;
    if (day.entries && Array.isArray(day.entries)) {
      entriesMap[dateKey] = (day.entries as CalendarEntryRow[]).map((entry) => {
        let emotion = entry.emotion_name;
        if (!emotion && entry.journey_id && staticJourneyMap.has(entry.journey_id)) {
          emotion = staticJourneyMap.get(entry.journey_id)!;
        }
        if (!emotion) emotion = 'Unknown';
        return {
          id: entry.id,
          date: dateKey,
          emotion,
          emotionColor: entry.color || '#FFFFFF',
          response: entry.content,
          created_at: entry.created_at || undefined,
          journey_id: entry.journey_id ?? null,
          journey_day: entry.journey_day ?? null,
        };
      });
    }
  });

  return entriesMap;
}

/**
 * Fetches calendar entries for a given month/year.
 * Returns a map: date string (YYYY-MM-DD) -> CalendarEntryData[]
 */
export async function getCalendarEntriesForMonth(
  userId: string,
  year: number,
  month: number // 0-based
): Promise<Record<string, CalendarEntryData[]>> {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = firstDay.toISOString().split('T')[0];
  const endDate = lastDay.toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('mood_calendar')
    .select(`
      id,
      entry_date,
      primary_emotion_name,
      color,
      entries:calendar_entries(
        id,
        content,
        emotion_id,
        emotion_name,
        color,
        created_at,
        journey_id,
        journey_day,
        source_type
      )
    `)
    .eq('user_id', userId)
    .gte('entry_date', startDate)
    .lte('entry_date', endDate)
    .order('entry_date', { ascending: true });

  if (error) {
    console.error('Error fetching calendar entries:', error);
    return {};
  }

  // Transform into map: date -> entries
  const entriesMap: Record<string, CalendarEntryData[]> = {};

  data?.forEach((day) => {
    const dateKey = day.entry_date;
    if (day.entries && Array.isArray(day.entries)) {
      entriesMap[dateKey] = (day.entries as CalendarEntryRow[]).map((entry) => {
        let emotion = entry.emotion_name;
        if (!emotion && entry.journey_id && staticJourneyMap.has(entry.journey_id)) {
          emotion = staticJourneyMap.get(entry.journey_id)!;
        }
        if (!emotion) emotion = 'Unknown';
        return {
          id: entry.id,
          date: dateKey,
          emotion,
          emotionColor: entry.color || '#FFFFFF',
          response: entry.content,
          created_at: entry.created_at || undefined,
          journey_id: entry.journey_id ?? null,
          journey_day: entry.journey_day ?? null,
        };
      });
    }
  });

  return entriesMap;
}

/**
 * Fetches user statistics for the home page.
 */
export async function getUserStats(userId: string): Promise<UserStats> {
  // Get total sessions (count of calendar entries)
  const { count: totalSessions, error } = await supabase
    .from('calendar_entries')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching total sessions:', error);
  }

  // Get streak (days with entries in last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];

  const { data: recentEntries } = await supabase
    .from('mood_calendar')
    .select('entry_date')
    .eq('user_id', userId)
    .gte('entry_date', thirtyDaysAgoStr)
    .order('entry_date', { ascending: true });

  let streakDays = 0;
  if (recentEntries && recentEntries.length > 0) {
    // Simple consecutive day calculation
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (let i = recentEntries.length - 1; i >= 0; i--) {
      const entryDate = new Date(recentEntries[i].entry_date);
      entryDate.setHours(0, 0, 0, 0);
      const diffDays = Math.floor((currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays === streak) {
        streak++;
      } else {
        break;
      }
    }
    streakDays = streak;
  }

  // Get top emotion (most frequent emotion across all sessions)
  // Uses calendar_entries instead of mood_calendar to count every session individually,
  // not just once per day (mood_calendar upserts overwrite the emotion per day).
  const { data: topEmotionData } = await supabase
    .from('calendar_entries')
    .select('emotion_name, color')
    .eq('user_id', userId)
    .not('emotion_name', 'is', null)
    .order('created_at', { ascending: false })
    .limit(100);

  let topEmotion: { name: string; color: string } | null = null;
  if (topEmotionData && topEmotionData.length > 0) {
    // Count frequency
    const counts: Record<string, { count: number; color: string }> = {};
    topEmotionData.forEach((entry) => {
      if (entry.emotion_name && entry.color) {
        const name = entry.emotion_name;
        if (!counts[name]) {
          counts[name] = { count: 0, color: entry.color };
        }
        counts[name].count++;
      }
    });

    // Find most frequent
    let maxCount = 0;
    Object.entries(counts).forEach(([name, data]) => {
      if (data.count > maxCount) {
        maxCount = data.count;
        topEmotion = { name, color: data.color };
      }
    });
  }

  return {
    streakDays,
    totalSessions: totalSessions || 0,
    topEmotion,
  };
}

/**
 * Fetches week activity data for the home page.
 * Returns an array of 7 days with activity level (count of entries).
 */
export async function getWeekActivity(userId: string): Promise<number[]> {
  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 6);

  const startDate = weekAgo.toISOString().split('T')[0];
  const endDate = today.toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('mood_calendar')
    .select('entry_date')
    .eq('user_id', userId)
    .gte('entry_date', startDate)
    .lte('entry_date', endDate);

  if (error) {
    console.error('Error fetching week activity:', error);
    return [0, 0, 0, 0, 0, 0, 0];
  }

  // Map dates to indices (0 = today, 1 = yesterday, etc.)
  const activityMap: Record<string, number> = {};
  data?.forEach((entry) => {
    const entryDate = new Date(entry.entry_date);
    const todayMidnight = new Date(today);
    todayMidnight.setHours(0, 0, 0, 0);
    const entryMidnight = new Date(entryDate);
    entryMidnight.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((todayMidnight.getTime() - entryMidnight.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays >= 0 && diffDays < 7) {
      activityMap[diffDays.toString()] = (activityMap[diffDays.toString()] || 0) + 1;
    }
  });

  // Convert to array [today, yesterday, ...]
  const activity: number[] = [];
  for (let i = 0; i < 7; i++) {
    activity.push(activityMap[i.toString()] || 0);
  }

  return activity.reverse(); // Return as [6 days ago, 5, 4, 3, 2, 1, today]
}

/**
 * Fetches entries for a specific date (for calendar day click)
 */
export async function getEntriesForDate(
  userId: string,
  date: string // YYYY-MM-DD
): Promise<CalendarEntryData[]> {
  const { data, error } = await supabase
    .from('mood_calendar')
    .select(`
      entries:calendar_entries(
        id,
        content,
        emotion_id,
        emotion_name,
        color,
        created_at
      )
    `)
    .eq('user_id', userId)
    .eq('entry_date', date)
    .single();

  if (error) {
    console.error('Error fetching entries for date:', error);
    return [];
  }

  if (!data || !data.entries) {
    return [];
  }

  return (data.entries as CalendarEntryRow[]).map((entry) => ({
    id: entry.id,
    date,
    emotion: entry.emotion_name || 'Unknown',
    emotionColor: entry.color || '#FFFFFF',
    response: entry.content,
    question: undefined,
    created_at: entry.created_at || undefined,
    journey_id: null, // calendar_entries in this query doesn't include journey_id
    journey_day: null,
  }));
}

/**
 * Fetches all entries for a user, ordered by creation date (newest first).
 * Combines entries from mood check-ins and journeys.
 */
export async function getAllEntries(
  userId: string,
  limit = 100
): Promise<CalendarEntryData[]> {
  // 1. Fetch calendar entries
  const { data: entries, error } = await supabase
    .from('calendar_entries')
    .select(`
      id,
      content,
      emotion_id,
      emotion_name,
      color,
      created_at,
      journey_id,
      calendar_id
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching all entries:', error);
    return [];
  }

  if (!entries || entries.length === 0) {
    return [];
  }

  // 2. Collect unique calendar_ids for mood calendar lookups
  const calendarIds = entries
    .map((e) => e.calendar_id)
    .filter((id): id is string => id != null);

  // 3. Fetch mood_calendar dates in bulk
  const moodMap = new Map<string, string>();
  if (calendarIds.length > 0) {
    const { data: moodData } = await supabase
      .from('mood_calendar')
      .select('id, entry_date')
      .in('id', calendarIds);
    moodData?.forEach((item) => {
      moodMap.set(item.id, item.entry_date);
    });
  }

  // 4. Build journey title map from static data only (journeys are static in this app)
  const staticJourneyMap = new Map(staticJourneys.map((j) => [j.id, j.title]));

  // 5. Build result list
  return entries.map((entry) => {
    // Determine date: prefer mood_calendar entry_date, fall back to created_at
    let date = '';
    if (entry.calendar_id && moodMap.has(entry.calendar_id)) {
      date = moodMap.get(entry.calendar_id)!;
    } else if (entry.created_at) {
      date = entry.created_at.split('T')[0]; // YYYY-MM-DD from timestamp
    }

    // Determine emotion display name
    let emotion = entry.emotion_name;
    if (!emotion && entry.journey_id && staticJourneyMap.has(entry.journey_id)) {
      emotion = staticJourneyMap.get(entry.journey_id);
    }
    if (!emotion) emotion = 'Unknown';

    return {
      id: entry.id,
      date,
      emotion,
      emotionColor: entry.color || '#FFFFFF',
      response: entry.content,
      created_at: entry.created_at || undefined,
      journey_id: entry.journey_id,
    };
  });
}

/**
 * Fetches all completed journey days for a user from calendar_entries.
 * Returns array of { journey_id, day_number } for entries with source_type='journey'
 */
export async function getJourneyDaysCompleted(userId: string): Promise<{ journey_id: string; day_number: number }[]> {
  const { data, error } = await supabase
    .from('calendar_entries')
    .select('journey_id, journey_day')
    .eq('user_id', userId)
    .eq('source_type', 'journey')
    .not('journey_id', 'is', null)
    .not('journey_day', 'is', null);

  if (error) {
    console.error('Error fetching journey days completed:', error);
    return [];
  }

  return (data || []).map((entry) => ({
    journey_id: entry.journey_id,
    day_number: entry.journey_day as number,
  }));
}
