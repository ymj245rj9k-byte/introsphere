import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { getUserStats, getWeekActivity } from '@/lib/database';

export function useHomeStats(user: User | null | undefined) {
  const [stats, setStats] = useState<{
    streakDays: number;
    totalSessions: number;
    topEmotion: { name: string; color: string } | null;
  } | null>(null);
  const [weekActivity, setWeekActivity] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setStats(null);
      setWeekActivity([0, 0, 0, 0, 0, 0, 0]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    Promise.all([
      getUserStats(user.id),
      getWeekActivity(user.id),
    ])
      .then(([statsData, activity]) => {
        setStats(statsData);
        setWeekActivity(activity);
      })
      .catch((err) => {
        setError(err instanceof Error ? err : new Error('Failed to fetch stats'));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  return {
    streakDays: stats?.streakDays ?? 0,
    totalSessions: stats?.totalSessions ?? 0,
    topEmotion: stats?.topEmotion ?? null,
    weekActivity,
    loading,
    error,
  };
}
