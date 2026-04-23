import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { supabase } from '@/lib/supabase';

export function useAuth() {
  const { user, setUser, setSession, setLoading, setInitialized } = useAuthStore();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setSession(session);
      setInitialized(true);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setSession(session);
      setLoading(false);
      setInitialized(true);
    });

    return () => subscription.unsubscribe();
  }, [setUser, setSession, setLoading, setInitialized]);

  return { user, loading: useAuthStore.getState().loading };
}
