import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Calendar, PlusCircle, Settings, Sun, Moon } from 'lucide-react';
import { ROUTES } from '@/constants';
import { AtmospherePicker } from '@/components/ui/AtmospherePicker';
import { useThemeStore } from '@/stores/themeStore';

const navItems = [
  { path: ROUTES.HOME, label: 'Home', icon: Home },
  { path: ROUTES.CALENDAR, label: 'Calendar', icon: Calendar },
  { path: ROUTES.SESSION, label: 'Session', icon: PlusCircle },
  { path: ROUTES.SETTINGS, label: 'Settings', icon: Settings },
];

export function MainLayout() {
  const location = useLocation();
  const { isDark, toggleDark } = useThemeStore();

  return (
    <div className="min-h-screen flex flex-col bg-atm">
      <main className="flex-1 pb-20 md:pt-16">
        <Outlet />
      </main>

      {/* Bottom Navigation - mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-atm border-t border-atm md:hidden" style={{ borderColor: 'var(--atmosphere-border, #e5e7eb)' }}>
        <div className="flex justify-around py-2">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                  isActive ? 'text-atm-accent' : 'text-atm-muted hover:text-atm'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Top Navigation - desktop */}
      <nav
        className="hidden md:flex fixed top-0 left-0 right-0 backdrop-blur-sm border-b px-6 py-3 z-50"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--atmosphere-bg, #fff) 85%, transparent)',
          borderColor: 'var(--atmosphere-border, #e5e7eb)',
        }}
      >
        <div className="flex items-center gap-6 max-w-6xl mx-auto w-full">
          <Link to={ROUTES.HOME} className="font-semibold text-lg text-atm-heading">
            Introsphere
          </Link>
          <div className="flex gap-4 flex-1">
            {navItems.map(({ path, label }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`text-sm transition-colors ${
                    isActive ? 'text-atm-accent font-medium' : 'text-atm-muted hover:text-atm'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-1">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDark}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={isDark}
              className="p-1.5 rounded-lg border border-transparent hover:border-atm transition-colors text-atm-muted hover:text-atm"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Atmosphere picker */}
            <AtmospherePicker />
          </div>
        </div>
      </nav>
    </div>
  );
}