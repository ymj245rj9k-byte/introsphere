import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Intro } from '@/pages/Intro';
import { Landing } from '@/pages/Landing';
import { Home } from '@/pages/Home';
import { Onboarding } from '@/pages/Onboarding';
import { Journey } from '@/pages/Journey';
import { Calendar } from '@/pages/Calendar';
import { History } from '@/pages/History';
import { Settings } from '@/pages/Settings';
import { Session } from '@/pages/Session';
import { EmotionReflection } from '@/pages/EmotionReflection';
import { HowItWorks } from '@/pages/HowItWorks';
import { Auth } from '@/pages/Auth';
import { ROUTES } from '@/constants';
import { useThemeStore } from '@/stores/themeStore';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';

const ATMOSPHERE_CLASSES = [
  'atmosphere-cream-calm',
  'atmosphere-green-forest',
  'atmosphere-dark-ink',
  'atmosphere-soft-pink',
  'atmosphere-silver-tech',
  'atmosphere-solar-flare',
  'atmosphere-desert-rose',
  'atmosphere-ocean-deep',
];

export function App() {
  const { atmosphere, isDark } = useThemeStore();

  // Apply atmosphere + dark mode classes to <html>
  useEffect(() => {
    const html = document.documentElement;
    // Remove all atmosphere classes first
    ATMOSPHERE_CLASSES.forEach((cls) => html.classList.remove(cls));
    // Apply current atmosphere
    html.classList.add(`atmosphere-${atmosphere}`);
    // Apply dark mode
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [atmosphere, isDark]);

  return (
    <Routes>
      {/* Public routes - no auth required */}
      <Route element={<MainLayout />}>
        <Route path={ROUTES.INTRO} element={<Intro />} />
        <Route path={ROUTES.LANDING} element={<Landing />} />
        <Route path={ROUTES.AUTH} element={<Auth />} />
        <Route path={ROUTES.HOW_IT_WORKS} element={<HowItWorks />} />
      </Route>
      
      {/* Protected routes - auth required */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.ONBOARDING} element={<Onboarding />} />
          <Route path={ROUTES.JOURNEY} element={<Journey />} />
          <Route path={ROUTES.SESSION} element={<Session />} />
          <Route path={ROUTES.CALENDAR} element={<Calendar />} />
          <Route path={ROUTES.HISTORY} element={<History />} />
          <Route path={ROUTES.SETTINGS} element={<Settings />} />
          <Route path={ROUTES.EMOTION_REFLECTION} element={<EmotionReflection />} />
        </Route>
      </Route>
    </Routes>
  );
}
