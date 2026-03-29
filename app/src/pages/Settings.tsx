import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useThemeStore } from '@/stores/themeStore'
import { AtmosphereType } from '@/types/emotion'

const atmospheres: { id: AtmosphereType; name: string; description: string; color: string }[] = [
  {
    id: 'dark-ink',
    name: 'Dark Ink',
    description: 'Deep, focused atmosphere',
    color: '#1a1a2e',
  },
  {
    id: 'cream-calm',
    name: 'Cream Calm',
    description: 'Warm, peaceful vibes',
    color: '#f5f5dc',
  },
  {
    id: 'green-forest',
    name: 'Green Forest',
    description: 'Natural, grounding energy',
    color: '#2d5a27',
  },
  {
    id: 'soft-pink',
    name: 'Soft Pink',
    description: 'Gentle, nurturing feel',
    color: '#ffb6c1',
  },
  {
    id: 'silver-tech',
    name: 'Silver Tech',
    description: 'Modern, clean aesthetic',
    color: '#c0c0c0',
  },
  {
    id: 'vintage-noir',
    name: 'Vintage Noir',
    description: 'Classic, timeless mood',
    color: '#2c2c2c',
  },
  {
    id: 'desert-rose',
    name: 'Desert Rose',
    description: 'Warm, earthy tones',
    color: '#c9a9a6',
  },
  {
    id: 'ocean-deep',
    name: 'Ocean Deep',
    description: 'Calm, vast expanse',
    color: '#1e3a5f',
  },
]

export function Settings() {
  const { theme, atmosphere, setTheme, setAtmosphere } = useThemeStore()
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [showClearAllConfirm, setShowClearAllConfirm] = useState(false)

  // Clear session history
  const handleClearHistory = () => {
    localStorage.removeItem('introsphere_responses')
    setShowClearConfirm(false)
    window.location.reload()
  }

  // Clear all data
  const handleClearAllData = () => {
    // Clear all introsphere-related localStorage items
    const keys = Object.keys(localStorage).filter(key => key.startsWith('introsphere_'))
    keys.forEach(key => localStorage.removeItem(key))
    setShowClearAllConfirm(false)
    window.location.reload()
  }

  // Get data stats
  const getDataStats = () => {
    const responses = localStorage.getItem('introsphere_responses')
    const responseCount = responses ? JSON.parse(responses).length : 0

    const journeyKeys = Object.keys(localStorage).filter(key =>
      key.startsWith('introsphere_journey_progress_')
    )
    const journeyCount = journeyKeys.length

    const totalKeys = Object.keys(localStorage).filter(key =>
      key.startsWith('introsphere_')
    ).length

    return { responseCount, journeyCount, totalKeys }
  }

  const stats = getDataStats()

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Customize the app to your preferences
        </p>
      </div>

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">🎨</span>
            Appearance
          </CardTitle>
          <CardDescription>
            Choose your preferred theme and atmosphere
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Light/Dark Toggle */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Theme</label>
            <div className="flex gap-2">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                onClick={() => setTheme('light')}
                className="flex-1"
              >
                ☀️ Light
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                onClick={() => setTheme('dark')}
                className="flex-1"
              >
                🌙 Dark
              </Button>
            </div>
          </div>

          {/* Atmosphere Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Atmosphere</label>
            <div className="grid grid-cols-2 gap-3">
              {atmospheres.map(atm => (
                <button
                  key={atm.id}
                  onClick={() => setAtmosphere(atm.id)}
                  className={`
                    p-4 rounded-xl border-2 text-left transition-all
                    ${
                      atmosphere === atm.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg"
                      style={{ backgroundColor: atm.color }}
                    />
                    <div>
                      <div className="font-semibold text-sm">{atm.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {atm.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">💾</span>
            Data Management
          </CardTitle>
          <CardDescription>
            Manage your stored data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.responseCount}</div>
              <div className="text-xs text-muted-foreground">Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.journeyCount}</div>
              <div className="text-xs text-muted-foreground">Journeys</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.totalKeys}</div>
              <div className="text-xs text-muted-foreground">Total items</div>
            </div>
          </div>

          {/* Clear History */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Clear Session History</div>
                <div className="text-sm text-muted-foreground">
                  Remove all saved session responses
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowClearConfirm(true)}
                disabled={stats.responseCount === 0}
              >
                Clear
              </Button>
            </div>
            {showClearConfirm && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg space-y-3">
                <p className="text-sm text-destructive">
                  Are you sure? This will delete all {stats.responseCount} session responses.
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleClearHistory}
                  >
                    Yes, clear history
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowClearConfirm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Clear All Data */}
          <div className="space-y-2 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Clear All Data</div>
                <div className="text-sm text-muted-foreground">
                  Remove all app data including settings
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowClearAllConfirm(true)}
                disabled={stats.totalKeys === 0}
              >
                Clear All
              </Button>
            </div>
            {showClearAllConfirm && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg space-y-3">
                <p className="text-sm text-destructive">
                  Are you sure? This will delete all {stats.totalKeys} items including settings.
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleClearAllData}
                  >
                    Yes, clear all data
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowClearAllConfirm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* App Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">ℹ️</span>
            About
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">App</span>
              <span className="font-medium">Introsphere</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Version</span>
              <span className="font-medium">1.0.0 (MVP)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Storage</span>
              <span className="font-medium">Local (Browser)</span>
            </div>
          </div>
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Introsphere is a journaling app designed to help you understand your emotions
              through guided reflection. All data is stored locally in your browser.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <div className="text-center text-xs text-muted-foreground pt-4">
        <p>This is not therapy. It's a tool for self-reflection.</p>
      </div>
    </div>
  )
}
