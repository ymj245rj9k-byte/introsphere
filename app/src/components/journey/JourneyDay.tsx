import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { JourneyDay as JourneyDayType } from '@/types/journey'

interface JourneyDayProps {
  day: JourneyDayType
  response?: string
  isCurrentDay?: boolean
  onSave?: (response: string) => void
  isSaving?: boolean
}

export function JourneyDay({
  day,
  response,
  isCurrentDay = false,
  onSave,
  isSaving = false,
}: JourneyDayProps) {
  const [inputValue, setInputValue] = useState(response || '')

  // Sync input value when response prop changes (e.g., when navigating between journeys)
  useEffect(() => {
    setInputValue(response || '')
  }, [response, day.id])

  if (isCurrentDay) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Day {day.day_number}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">{day.question_en}</p>

          <div className="space-y-2">
            <textarea
              className="w-full min-h-[150px] p-4 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              placeholder="Write your response..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  if (inputValue.trim()) {
                    onSave?.(inputValue.trim())
                    setInputValue('')
                  }
                }}
                disabled={!inputValue.trim() || isSaving}
              >
                {isSaving ? 'Saving...' : 'Save & Continue'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Day {day.day_number}</span>
          </div>
          <p className="text-sm text-muted-foreground">{day.question_en}</p>
          {response && <p className="text-sm">{response}</p>}
        </div>
      </CardContent>
    </Card>
  )
}
