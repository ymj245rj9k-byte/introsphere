import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getJourneyById, getActiveJourneys } from '@/data/journeys'
import { Journey as JourneyType, JourneyProgress } from '@/types/journey'

interface JourneyResponse {
  id: string
  journeyId: string
  dayNumber: number
  question: string
  response: string
  emotionId: string
  emotionName: string
  emotionColor: string
  createdAt: string
}

export function Journey() {
  const { id } = useParams<{ id: string }>()
  const [journey, setJourney] = useState<JourneyType | null>(null)
  const [progress, setProgress] = useState<JourneyProgress | null>(null)
  const [responses, setResponses] = useState<JourneyResponse[]>([])
  const [currentResponse, setCurrentResponse] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  // Load journey and progress
  useEffect(() => {
    if (id) {
      const journeyData = getJourneyById(id)
      if (journeyData) {
        setJourney(journeyData)
      }

      // Load progress from localStorage
      const progressKey = `introsphere_journey_progress_${id}`
      const savedProgress = localStorage.getItem(progressKey)
      if (savedProgress) {
        try {
          const parsed = JSON.parse(savedProgress)
          setProgress(parsed)
        } catch (e) {
          console.error('Failed to parse progress:', e)
        }
      }

      // Load responses
      const responsesKey = `introsphere_journey_responses_${id}`
      const savedResponses = localStorage.getItem(responsesKey)
      if (savedResponses) {
        try {
          const parsed = JSON.parse(savedResponses)
          setResponses(parsed)
        } catch (e) {
          console.error('Failed to parse responses:', e)
        }
      }
    }
  }, [id])

  // Save response for current day
  const handleSaveResponse = async () => {
    if (!journey || !progress || !currentResponse.trim()) return

    setIsSaving(true)

    const currentDay = journey.days?.find(d => d.day_number === progress.current_day)
    if (!currentDay) return

    const newResponse: JourneyResponse = {
      id: crypto.randomUUID(),
      journeyId: journey.id,
      dayNumber: progress.current_day,
      question: currentDay.question_en,
      response: currentResponse.trim(),
      emotionId: '',
      emotionName: '',
      emotionColor: '',
      createdAt: new Date().toISOString(),
    }

    const updatedResponses = [...responses, newResponse]
    setResponses(updatedResponses)
    localStorage.setItem(
      `introsphere_journey_responses_${journey.id}`,
      JSON.stringify(updatedResponses)
    )

    // Update progress
    const isLastDay = progress.current_day === (journey.days?.length || 0)
    const updatedProgress: JourneyProgress = {
      ...progress,
      current_day: isLastDay ? progress.current_day : progress.current_day + 1,
      status: isLastDay ? 'completed' : 'in_progress',
      completed_at: isLastDay ? new Date().toISOString() : null,
    }

    setProgress(updatedProgress)
    localStorage.setItem(
      `introsphere_journey_progress_${journey.id}`,
      JSON.stringify(updatedProgress)
    )

    setCurrentResponse('')
    setIsSaving(false)
  }

  // Abandon journey
  const handleAbandonJourney = () => {
    if (!journey) return

    const updatedProgress: JourneyProgress = {
      ...progress!,
      status: 'abandoned',
    }

    setProgress(updatedProgress)
    localStorage.setItem(
      `introsphere_journey_progress_${journey.id}`,
      JSON.stringify(updatedProgress)
    )
  }

  // Reset journey
  const handleResetJourney = () => {
    if (!journey) return

    localStorage.removeItem(`introsphere_journey_progress_${journey.id}`)
    localStorage.removeItem(`introsphere_journey_responses_${journey.id}`)
    setProgress(null)
    setResponses([])
    setCurrentResponse('')
  }

  // If no journey ID, show journey list
  if (!id) {
    const activeJourneys = getActiveJourneys()

    return (
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Guided Journeys</h1>
          <p className="text-muted-foreground">
            7-day programs with specific questions to guide your self-reflection
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {activeJourneys.map(journey => {
            const progressKey = `introsphere_journey_progress_${journey.id}`
            const savedProgress = localStorage.getItem(progressKey)
            let journeyProgress: JourneyProgress | null = null
            if (savedProgress) {
              try {
                journeyProgress = JSON.parse(savedProgress)
              } catch (e) {
                console.error('Failed to parse progress:', e)
              }
            }

            return (
              <Card key={journey.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{journey.title_en}</CardTitle>
                    {journeyProgress && (
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          journeyProgress.status === 'completed'
                            ? 'bg-green-500/20 text-green-400'
                            : journeyProgress.status === 'in_progress'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {journeyProgress.status === 'completed'
                          ? 'Completed'
                          : journeyProgress.status === 'in_progress'
                          ? `Day ${journeyProgress.current_day}/7`
                          : 'Abandoned'}
                      </span>
                    )}
                  </div>
                  <CardDescription>{journey.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>📅</span>
                    <span>{journey.days?.length || 7} days</span>
                  </div>
                  <Link to={`/journey/${journey.id}`}>
                    <Button className="w-full">
                      {journeyProgress?.status === 'in_progress'
                        ? 'Continue Journey'
                        : journeyProgress?.status === 'completed'
                        ? 'View Journey'
                        : 'Start Journey'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  // Journey not found
  if (!journey) {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center py-12 space-y-4">
          <div className="text-6xl">🔍</div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Journey not found</h3>
            <p className="text-muted-foreground">
              The journey you're looking for doesn't exist.
            </p>
          </div>
          <Link to="/journey">
            <Button>Browse Journeys</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Journey completed
  if (progress?.status === 'completed') {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center py-12 space-y-4">
          <div className="text-6xl">🎉</div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Journey Completed!</h3>
            <p className="text-muted-foreground">
              Congratulations! You've completed the {journey.title_en} journey.
            </p>
          </div>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={handleResetJourney}>
              Start Again
            </Button>
            <Link to="/journey">
              <Button>Browse More Journeys</Button>
            </Link>
          </div>
        </div>

        {/* Show all responses */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Your Responses</h2>
          <div className="space-y-3">
            {responses.map(response => (
              <Card key={response.id}>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">Day {response.dayNumber}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(response.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{response.question}</p>
                    <p className="text-sm">{response.response}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Journey in progress
  const currentDay = journey.days?.find(d => d.day_number === progress?.current_day)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{journey.title_en}</h1>
          <p className="text-muted-foreground">{journey.subtitle}</p>
        </div>
        <Button variant="outline" onClick={handleAbandonJourney}>
          Abandon
        </Button>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-semibold">
            Day {progress?.current_day || 1} of {journey.days?.length || 7}
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{
              width: `${((progress?.current_day || 1) / (journey.days?.length || 7)) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Current Day */}
      {currentDay && (
        <Card>
          <CardHeader>
            <CardTitle>Day {currentDay.day_number}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">{currentDay.question_en}</p>

            <div className="space-y-2">
              <textarea
                className="w-full min-h-[150px] p-4 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Write your response..."
                value={currentResponse}
                onChange={(e) => setCurrentResponse(e.target.value)}
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleSaveResponse}
                  disabled={!currentResponse.trim() || isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save & Continue'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Previous Days */}
      {responses.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Previous Days</h2>
          <div className="space-y-3">
            {responses
              .filter(r => r.dayNumber < (progress?.current_day || 1))
              .reverse()
              .map(response => (
                <Card key={response.id}>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">Day {response.dayNumber}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(response.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{response.question}</p>
                      <p className="text-sm">{response.response}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
