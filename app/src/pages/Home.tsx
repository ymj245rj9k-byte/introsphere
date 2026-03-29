import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface SavedResponse {
  id: string
  emotionId: string
  emotionName: string
  emotionColor: string
  question: string
  response: string
  createdAt: string
}

export function Home() {
  const [responses, setResponses] = useState<SavedResponse[]>([])

  // Load responses from localStorage
  useEffect(() => {
    const responsesKey = 'introsphere_responses'
    const savedResponses = localStorage.getItem(responsesKey)
    if (savedResponses) {
      try {
        const parsed = JSON.parse(savedResponses)
        setResponses(parsed)
      } catch (e) {
        console.error('Failed to parse responses:', e)
      }
    }
  }, [])

  // Calculate statistics
  const getSessionsThisWeek = () => {
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    return responses.filter(r => new Date(r.createdAt) >= weekAgo).length
  }

  const getStreakDays = () => {
    if (responses.length === 0) return 0

    const dates = responses.map(r => {
      const date = new Date(r.createdAt)
      return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
    })

    const uniqueDates = Array.from(new Set(dates)).sort((a, b) => b - a)
    const today = new Date()
    const todayTime = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()

    // Check if there's a session today or yesterday
    const mostRecent = uniqueDates[0]
    const daysDiff = Math.floor((todayTime - mostRecent) / (24 * 60 * 60 * 1000))

    if (daysDiff > 1) return 0

    // Count consecutive days
    let streak = 1
    for (let i = 0; i < uniqueDates.length - 1; i++) {
      const diff = Math.floor((uniqueDates[i] - uniqueDates[i + 1]) / (24 * 60 * 60 * 1000))
      if (diff === 1) {
        streak++
      } else {
        break
      }
    }

    return streak
  }

  const getMostCommonEmotion = () => {
    if (responses.length === 0) return null

    const emotionCounts: Record<string, { count: number; color: string }> = {}
    responses.forEach(r => {
      if (!emotionCounts[r.emotionName]) {
        emotionCounts[r.emotionName] = { count: 0, color: r.emotionColor }
      }
      emotionCounts[r.emotionName].count++
    })

    const sorted = Object.entries(emotionCounts).sort((a, b) => b[1].count - a[1].count)
    return { name: sorted[0][0], color: sorted[0][1].color, count: sorted[0][1].count }
  }

  const getRecentSessions = () => {
    return responses.slice(0, 3)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const sessionsThisWeek = getSessionsThisWeek()
  const streakDays = getStreakDays()
  const mostCommonEmotion = getMostCommonEmotion()
  const recentSessions = getRecentSessions()

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Welcome to Introsphere</h1>
        <p className="text-muted-foreground">
          {responses.length === 0
            ? 'Ready for your first session?'
            : `You've completed ${responses.length} session${responses.length !== 1 ? 's' : ''} so far`}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Quick Session
            </CardTitle>
            <CardDescription>
              Choose your mood and answer one question
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/session">
              <Button className="w-full">Start Session</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">📚</span>
              Guided Journeys
            </CardTitle>
            <CardDescription>
              7-day programs with specific questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/home">
              <Button variant="outline" className="w-full">
                Browse Journeys
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Your Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold">{sessionsThisWeek}</div>
              <p className="text-xs text-muted-foreground">Sessions this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold">{streakDays}</div>
              <p className="text-xs text-muted-foreground">Day streak 🔥</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold">{responses.length}</div>
              <p className="text-xs text-muted-foreground">Total sessions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              {mostCommonEmotion ? (
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: mostCommonEmotion.color }}
                  />
                  <div>
                    <div className="text-lg font-bold truncate">{mostCommonEmotion.name}</div>
                    <p className="text-xs text-muted-foreground">Most common</p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-lg font-bold">-</div>
                  <p className="text-xs text-muted-foreground">Most common</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Sessions */}
      {recentSessions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Sessions</h2>
            <Link to="/history">
              <Button variant="ghost" size="sm">
                View all →
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {recentSessions.map(session => (
              <Card key={session.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: session.emotionColor }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-sm truncate">
                          {session.emotionName}
                        </h3>
                        <span className="text-xs text-muted-foreground flex-shrink-0">
                          {formatDate(session.createdAt)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        {session.question}
                      </p>
                      <p className="text-sm mt-2 line-clamp-2">
                        {session.response}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {responses.length === 0 && (
        <Card className="bg-muted/50">
          <CardContent className="py-12 text-center space-y-4">
            <div className="text-6xl">✨</div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Start your journey</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Complete your first session to see your statistics and track your emotional patterns over time.
              </p>
            </div>
            <Link to="/session">
              <Button size="lg">Start First Session</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t">
        <Link to="/history" className="block">
          <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">📖</div>
              <p className="text-sm font-medium">History</p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/calendar" className="block">
          <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">📅</div>
              <p className="text-sm font-medium">Calendar</p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/settings" className="block">
          <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">⚙️</div>
              <p className="text-sm font-medium">Settings</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
