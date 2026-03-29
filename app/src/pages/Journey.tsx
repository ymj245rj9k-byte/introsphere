import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { JourneyCard, JourneyProgressBar, JourneyDay } from '@/components/journey'
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
  const [isSaving, setIsSaving] = useState(false)

  // Load journey and progress
  useEffect(() => {
    if (id) {
      // Clear previous journey data first
      setProgress(null)
      setResponses([])

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
  const handleSaveResponse = async (responseText: string) => {
    if (!journey || !progress) return

    setIsSaving(true)

    const currentDay = journey.days?.find(d => d.day_number === progress.current_day)
    if (!currentDay) return

    const newResponse: JourneyResponse = {
      id: crypto.randomUUID(),
      journeyId: journey.id,
      dayNumber: progress.current_day,
      question: currentDay.question_en,
      response: responseText,
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
              <JourneyCard
                key={journey.id}
                journey={journey}
                progress={journeyProgress}
              />
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
            {responses.map(response => {
              const day = journey.days?.find(d => d.day_number === response.dayNumber)
              return (
                <JourneyDay
                  key={response.id}
                  day={day!}
                  response={response.response}
                />
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // Journey not started yet - show intro and first day
  if (!progress) {
    const firstDay = journey.days?.[0]

    return (
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{journey.title_en}</h1>
          <p className="text-muted-foreground">{journey.subtitle}</p>
        </div>

        <JourneyProgressBar currentDay={1} totalDays={journey.days?.length || 7} />

        {firstDay && (
          <JourneyDay
            key={`${journey.id}-day-${firstDay.day_number}`}
            day={firstDay}
            isCurrentDay={true}
            onSave={(responseText) => {
              // Initialize progress and save first response
              const newProgress: JourneyProgress = {
                id: crypto.randomUUID(),
                user_id: '',
                journey_id: journey.id,
                current_day: 1,
                status: 'in_progress',
                started_at: new Date().toISOString(),
                completed_at: null,
              }
              setProgress(newProgress)
              localStorage.setItem(
                `introsphere_journey_progress_${journey.id}`,
                JSON.stringify(newProgress)
              )

              const newResponse: JourneyResponse = {
                id: crypto.randomUUID(),
                journeyId: journey.id,
                dayNumber: 1,
                question: firstDay.question_en,
                response: responseText,
                emotionId: '',
                emotionName: '',
                emotionColor: '',
                createdAt: new Date().toISOString(),
              }
              const updatedResponses = [newResponse]
              setResponses(updatedResponses)
              localStorage.setItem(
                `introsphere_journey_responses_${journey.id}`,
                JSON.stringify(updatedResponses)
              )

              // Move to next day
              const isLastDay = 1 === (journey.days?.length || 0)
              const updatedProgress: JourneyProgress = {
                ...newProgress,
                current_day: isLastDay ? 1 : 2,
                status: isLastDay ? 'completed' : 'in_progress',
                completed_at: isLastDay ? new Date().toISOString() : null,
              }
              setProgress(updatedProgress)
              localStorage.setItem(
                `introsphere_journey_progress_${journey.id}`,
                JSON.stringify(updatedProgress)
              )
            }}
            isSaving={isSaving}
          />
        )}
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
      <JourneyProgressBar
        currentDay={progress?.current_day || 1}
        totalDays={journey.days?.length || 7}
      />

      {/* Current Day */}
      {currentDay && (
        <JourneyDay
          key={`${journey.id}-day-${currentDay.day_number}`}
          day={currentDay}
          isCurrentDay={true}
          onSave={handleSaveResponse}
          isSaving={isSaving}
        />
      )}

      {/* Previous Days */}
      {responses.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Previous Days</h2>
          <div className="space-y-3">
            {responses
              .filter(r => r.dayNumber < (progress?.current_day || 1))
              .reverse()
              .map(response => {
                const day = journey.days?.find(d => d.day_number === response.dayNumber)
                return (
                  <JourneyDay
                    key={response.id}
                    day={day!}
                    response={response.response}
                  />
                )
              })}
          </div>
        </div>
      )}
    </div>
  )
}
