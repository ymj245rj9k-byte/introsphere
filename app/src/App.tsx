import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Landing } from '@/pages/Landing';
import { Home } from '@/pages/Home';
import { Onboarding } from '@/pages/Onboarding';
import { Journey } from '@/pages/Journey';
import { Calendar } from '@/pages/Calendar';
import { History } from '@/pages/History';
import { Settings } from '@/pages/Settings';
import { Session } from '@/pages/Session';
import { ROUTES } from '@/constants';
import { useThemeStore } from '@/stores/themeStore';

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
      <Route element={<MainLayout />}>
        <Route path={ROUTES.LANDING} element={<Landing />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ONBOARDING} element={<Onboarding />} />
        <Route path={ROUTES.JOURNEY} element={<Journey />} />
        <Route path={ROUTES.CALENDAR} element={<Calendar />} />
        <Route path={ROUTES.HISTORY} element={<History />} />
        <Route path={ROUTES.SETTINGS} element={<Settings />} />
        <Route path={ROUTES.SESSION} element={<Session />} />
      </Route>
    </Routes>
  );
}
