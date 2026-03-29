import { Outlet, Link, useLocation } from 'react-router-dom'
import { Home, Calendar, History, Settings, Plus, Compass, Sun, Moon, Palette } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useThemeStore } from '@/stores/themeStore'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { AtmosphereType } from '@/types/emotion'

const navItems = [
  { path: '/home', icon: Home, label: 'Home' },
  { path: '/journey', icon: Compass, label: 'Journeys' },
  { path: '/calendar', icon: Calendar, label: 'Calendar' },
  { path: '/history', icon: History, label: 'History' },
  { path: '/settings', icon: Settings, label: 'Settings' },
]

const atmospheres: { id: AtmosphereType; name: string }[] = [
  { id: 'cream-calm', name: 'Cream Calm' },
  { id: 'green-forest', name: 'Green Forest' },
  { id: 'dark-ink', name: 'Dark Ink' },
  { id: 'soft-pink', name: 'Soft Pink' },
  { id: 'silver-tech', name: 'Silver Tech' },
  { id: 'solar-flare', name: 'Solar Flare' },
  { id: 'desert-rose', name: 'Desert Rose' },
  { id: 'ocean-deep', name: 'Ocean Deep' },
]

export function MainLayout() {
  const location = useLocation()
  const { theme, atmosphere, setTheme, setAtmosphere } = useThemeStore()
  const [showAtmospherePicker, setShowAtmospherePicker] = useState(false)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-b border-border z-50">
        <div className="flex items-center justify-between h-14 px-4">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2">
            <span className="text-xl font-bold text-foreground">Introsphere</span>
          </Link>

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-9 h-9"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            {/* Atmosphere Picker */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAtmospherePicker(!showAtmospherePicker)}
                className="w-9 h-9"
              >
                <Palette className="w-5 h-5" />
              </Button>

              {/* Atmosphere Dropdown */}
              {showAtmospherePicker && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-xl shadow-lg p-4 space-y-3">
                  <div className="text-sm font-semibold">Choose Atmosphere</div>
                  <div className="grid grid-cols-2 gap-2">
                    {atmospheres.map((atm) => (
                      <button
                        key={atm.id}
                        onClick={() => {
                          setAtmosphere(atm.id)
                          setShowAtmospherePicker(false)
                        }}
                        className={cn(
                          "flex items-center gap-2 p-2 rounded-lg transition-all",
                          atmosphere === atm.id
                            ? "bg-primary/10 border border-primary"
                            : "hover:bg-muted border border-transparent"
                        )}
                      >
                        <div
                          className={cn(
                            "w-4 h-4 rounded-full",
                            `atmosphere-${atm.id}`
                          )}
                        />
                        <span className="text-xs font-medium">{atm.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-14 pb-20">
        <Outlet />
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full gap-1 text-muted-foreground transition-colors hover:text-foreground",
                  isActive && "text-primary"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            )
          })}
        </div>

        {/* Floating action button for new session */}
        <Link
          to="/session"
          className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-6 h-6 text-primary-foreground" />
        </Link>
      </nav>
    </div>
  )
}
