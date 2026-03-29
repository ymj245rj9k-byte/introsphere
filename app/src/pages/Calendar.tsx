import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SavedResponse {
  id: string
  emotionId: string
  emotionName: string
  emotionColor: string
  question: string
  response: string
  createdAt: string
}

interface DayData {
  date: Date
  responses: SavedResponse[]
  dominantEmotion: { name: string; color: string } | null
}

export function Calendar() {
  const [responses, setResponses] = useState<SavedResponse[]>([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null)

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

  // Get calendar data for current month
  const getCalendarData = (): DayData[] => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startDayOfWeek = firstDay.getDay()

    const days: DayData[] = []

    // Add empty days for alignment
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push({
        date: new Date(year, month, -startDayOfWeek + i + 1),
        responses: [],
        dominantEmotion: null,
      })
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const dayResponses = responses.filter(r => {
        const responseDate = new Date(r.createdAt)
        return (
          responseDate.getFullYear() === year &&
          responseDate.getMonth() === month &&
          responseDate.getDate() === day
        )
      })

      // Calculate dominant emotion
      let dominantEmotion = null
      if (dayResponses.length > 0) {
        const emotionCounts: Record<string, { count: number; color: string }> = {}
        dayResponses.forEach(r => {
          if (!emotionCounts[r.emotionName]) {
            emotionCounts[r.emotionName] = { count: 0, color: r.emotionColor }
          }
          emotionCounts[r.emotionName].count++
        })
        const sorted = Object.entries(emotionCounts).sort((a, b) => b[1].count - a[1].count)
        dominantEmotion = { name: sorted[0][0], color: sorted[0][1].color }
      }

      days.push({
        date,
        responses: dayResponses,
        dominantEmotion,
      })
    }

    // Add remaining days to complete the grid
    const remainingDays = 42 - days.length // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        responses: [],
        dominantEmotion: null,
      })
    }

    return days
  }

  const calendarData = getCalendarData()
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    setSelectedDay(null)
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    setSelectedDay(null)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
    setSelectedDay(null)
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Mood Calendar</h1>
        <p className="text-muted-foreground">
          See your emotion patterns over time
        </p>
      </div>

      {responses.length === 0 ? (
        <div className="text-center py-12 space-y-4">
          <div className="text-6xl">📅</div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">No data yet</h3>
            <p className="text-muted-foreground">
              Complete sessions to see your mood patterns on the calendar
            </p>
          </div>
          <Link to="/session">
            <Button>Start Session</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{monthName}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={goToToday}>
                      Today
                    </Button>
                    <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                      ←
                    </Button>
                    <Button variant="outline" size="icon" onClick={goToNextMonth}>
                      →
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Week days header */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {weekDays.map(day => (
                    <div
                      key={day}
                      className="text-center text-sm font-medium text-muted-foreground py-2"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarData.map((day, index) => (
                    <div
                      key={index}
                      onClick={() => day.responses.length > 0 && setSelectedDay(day)}
                      className={`
                        aspect-square p-1 rounded-lg border transition-all cursor-pointer
                        ${isCurrentMonth(day.date) ? 'bg-card' : 'bg-muted/30'}
                        ${isToday(day.date) ? 'ring-2 ring-primary' : ''}
                        ${day.responses.length > 0 ? 'hover:shadow-md' : 'cursor-default'}
                        ${selectedDay?.date.getTime() === day.date.getTime() ? 'ring-2 ring-primary' : ''}
                      `}
                    >
                      <div className="h-full flex flex-col">
                        <span
                          className={`text-xs font-medium ${
                            isCurrentMonth(day.date)
                              ? 'text-foreground'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {day.date.getDate()}
                        </span>
                        {day.dominantEmotion && (
                          <div className="flex-1 flex items-center justify-center">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: day.dominantEmotion.color }}
                              title={day.dominantEmotion.name}
                            />
                          </div>
                        )}
                        {day.responses.length > 1 && (
                          <div className="text-xs text-center text-muted-foreground">
                            +{day.responses.length - 1}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full ring-2 ring-primary" />
                      <span>Today</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <span>Has sessions</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Day Details */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            {selectedDay ? (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedDay.date.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {selectedDay.responses.length} session{selectedDay.responses.length !== 1 ? 's' : ''}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedDay.responses.map(response => (
                    <div key={response.id} className="space-y-2 pb-4 border-b last:border-0">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: response.emotionColor }}
                        />
                        <span className="font-semibold text-sm">{response.emotionName}</span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {formatDate(response.createdAt)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{response.question}</p>
                      <p className="text-sm line-clamp-3">{response.response}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full min-h-[300px] flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <div className="text-4xl mb-4">👆</div>
                  <p className="text-muted-foreground">
                    Click on a day with sessions to view details
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Monthly Stats */}
      {responses.length > 0 && (
        <div className="pt-4 border-t">
          <h2 className="text-lg font-semibold mb-3">Monthly Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold">
                  {calendarData.filter(d => d.responses.length > 0 && isCurrentMonth(d.date)).length}
                </div>
                <p className="text-xs text-muted-foreground">Active days</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold">
                  {calendarData
                    .filter(d => isCurrentMonth(d.date))
                    .reduce((acc, d) => acc + d.responses.length, 0)}
                </div>
                <p className="text-xs text-muted-foreground">Sessions this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold">
                  {(() => {
                    const monthResponses = calendarData
                      .filter(d => isCurrentMonth(d.date))
                      .flatMap(d => d.responses)
                    if (monthResponses.length === 0) return '-'
                    const emotionCounts: Record<string, number> = {}
                    monthResponses.forEach(r => {
                      emotionCounts[r.emotionName] = (emotionCounts[r.emotionName] || 0) + 1
                    })
                    const sorted = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])
                    return sorted[0][0]
                  })()}
                </div>
                <p className="text-xs text-muted-foreground">Top emotion</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold">
                  {(() => {
                    const monthResponses = calendarData
                      .filter(d => isCurrentMonth(d.date))
                      .flatMap(d => d.responses)
                    if (monthResponses.length === 0) return 0
                    const uniqueEmotions = new Set(monthResponses.map(r => r.emotionName))
                    return uniqueEmotions.size
                  })()}
                </div>
                <p className="text-xs text-muted-foreground">Unique emotions</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
