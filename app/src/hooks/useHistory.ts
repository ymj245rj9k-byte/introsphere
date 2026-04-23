import { useState, useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { getAllEntries, type CalendarEntryData } from '@/lib/database';

export function useHistory() {
  const [entries, setEntries] = useState<CalendarEntryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    async function fetchEntries() {
      if (!user) {
        setEntries([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getAllEntries(user.id);
        setEntries(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch entries'));
      } finally {
        setLoading(false);
      }
    }

    fetchEntries();
  }, [user]);

  return { entries, loading, error };
}
