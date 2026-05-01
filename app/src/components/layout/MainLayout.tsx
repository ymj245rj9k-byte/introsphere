import { Outlet, Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, Calendar, PlusCircle, Settings, Sun, Moon, LogIn, LogOut, List } from 'lucide-react';
import { ROUTES } from '@/constants';
import { AtmospherePicker } from '@/components/ui/AtmospherePicker';
import { useThemeStore } from '@/stores/themeStore';
import { useAuthStore } from '@/stores/authStore';
import { supabase } from '@/lib/supabase';

const publicNavItems = [
  { path: ROUTES.HOW_IT_WORKS, label: 'How It Works', icon: BookOpen },
];

const protectedNavItems = [
  { path: ROUTES.HOW_IT_WORKS, label: 'How It Works', icon: BookOpen },
  { path: ROUTES.HOME, label: 'Home', icon: Home },
  { path: ROUTES.SESSION, label: 'Session', icon: PlusCircle },
  { path: ROUTES.JOURNEYS, label: 'Journeys', icon: List },
  { path: ROUTES.CALENDAR, label: 'Calendar', icon: Calendar },
  { path: ROUTES.SETTINGS, label: 'Settings', icon: Settings },
];

export function MainLayout() {
  const location = useLocation();
  const { isDark, toggleDark } = useThemeStore();
  const { user } = useAuthStore();
  const navItems = user ? protectedNavItems : publicNavItems;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

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
          {user ? (
            <button
              onClick={handleSignOut}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors text-atm-muted hover:text-atm"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-xs">Sign Out</span>
            </button>
          ) : (
            <Link
              to={ROUTES.AUTH}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                location.pathname === ROUTES.AUTH ? 'text-atm-accent' : 'text-atm-muted hover:text-atm'
              }`}
            >
              <LogIn className="w-5 h-5" />
              <span className="text-xs">Sign In</span>
            </Link>
          )}
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
          <Link to={ROUTES.HOW_IT_WORKS} className="font-semibold text-lg text-atm-heading">
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

            {/* Auth button - most right */}
            {user ? (
              <button
                onClick={handleSignOut}
                className="ml-2 px-3 py-1.5 text-sm font-medium rounded-lg border border-atm hover:bg-surface transition-colors text-atm"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to={ROUTES.AUTH}
                className="ml-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}