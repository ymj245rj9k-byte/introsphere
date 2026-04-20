import { User, Palette, LogOut, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { atmospheres } from '@/data/themes';
import { useThemeStore } from '@/stores/themeStore';
import { AtmosphereType } from '@/types/emotion';

const atmosphereList = Object.values(atmospheres);

export function Settings() {
  const { atmosphere, setAtmosphere, isDark, toggleDark } = useThemeStore();

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold text-atm-heading mb-6">Ustawienia</h1>

      <div className="space-y-6">
        {/* Profile */}
        <Card className="p-4" style={{ backgroundColor: 'var(--atmosphere-bg-secondary)', borderColor: 'var(--atmosphere-border)' }}>
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-atm-muted" />
            <h2 className="text-lg font-medium text-atm">Profil</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--atmosphere-accent, #999)' + '33' }}>
              <User className="w-8 h-8 text-atm-accent" />
            </div>
            <div>
              <p className="font-medium text-atm">User</p>
              <p className="text-sm text-atm-muted">uzytkownik@introsphere.pl</p>
            </div>
          </div>
        </Card>

        {/* Theme */}
        <Card className="p-4" style={{ backgroundColor: 'var(--atmosphere-bg-secondary)', borderColor: 'var(--atmosphere-border)' }}>
          <div className="flex items-center gap-3 mb-4">
            {isDark ? <Moon className="w-5 h-5 text-atm-muted" /> : <Sun className="w-5 h-5 text-atm-muted" />}
            <h2 className="text-lg font-medium text-atm">Motyw</h2>
          </div>

          <button
            onClick={toggleDark}
            aria-pressed={isDark}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg border transition-all"
            style={{
              backgroundColor: 'var(--atmosphere-bg)',
              borderColor: 'var(--atmosphere-border)',
              color: 'var(--atmosphere-text)',
            }}
          >
            <span className="flex items-center gap-2 flex-1">
              {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              <span className="text-sm">{isDark ? 'Ciemny' : 'Jasny'}</span>
            </span>
            <span className="text-xs text-atm-muted">Click to change</span>
          </button>
        </Card>

        {/* Atmosphere */}
        <Card className="p-4" style={{ backgroundColor: 'var(--atmosphere-bg-secondary)', borderColor: 'var(--atmosphere-border)' }}>
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-5 h-5 text-atm-muted" />
            <h2 className="text-lg font-medium text-atm">Atmosfera</h2>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {atmosphereList.map((atm) => {
              const isSelected = atm.id === atmosphere;
              return (
                <button
                  key={atm.id}
                  onClick={() => setAtmosphere(atm.id as AtmosphereType)}
                  className="p-3 rounded-lg border-2 transition-all text-left"
                  style={{
                    backgroundColor: atm.colors.surface,
                    borderColor: isSelected ? atm.colors.accent : 'transparent',
                    outline: isSelected ? `2px solid ${atm.colors.accent}33` : 'none',
                  }}
                >
                  {/* Color bar */}
                  <div
                    className="w-full h-6 rounded mb-2"
                    style={{
                      background: `linear-gradient(90deg, ${atm.colors.accent} 0%, ${atm.colors.primary} 100%)`,
                    }}
                  />
                  <p className="text-xs font-medium truncate" style={{ color: atm.colors.text }}>
                    {atm.name}
                  </p>
                  {isSelected && (
                    <p className="text-xs mt-0.5" style={{ color: atm.colors.accent }}>
                      ✓ Aktywna
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Account */}
        <Card className="p-4" style={{ backgroundColor: 'var(--atmosphere-bg-secondary)', borderColor: 'var(--atmosphere-border)' }}>
          <div className="flex items-center gap-3 mb-4">
            <LogOut className="w-5 h-5 text-atm-muted" />
            <h2 className="text-lg font-medium text-atm">Account</h2>
          </div>

          <Button variant="outline" className="w-full">
            <LogOut className="w-4 h-4 mr-2" />
            Log out
          </Button>
        </Card>
      </div>
    </div>
  );
}