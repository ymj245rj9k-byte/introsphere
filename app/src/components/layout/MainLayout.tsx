import { Outlet, Link, useLocation } from 'react-router-dom'
import { Home, Calendar, History, Settings, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { path: '/home', icon: Home, label: 'Home' },
  { path: '/calendar', icon: Calendar, label: 'Kalendarz' },
  { path: '/history', icon: History, label: 'Historia' },
  { path: '/settings', icon: Settings, label: 'Ustawienia' },
]

export function MainLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-background">
      {/* Main content */}
      <main className="pb-20">
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
