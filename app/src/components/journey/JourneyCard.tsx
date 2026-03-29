import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Journey, JourneyProgress } from '@/types/journey'

interface JourneyCardProps {
  journey: Journey
  progress?: JourneyProgress | null
}

export function JourneyCard({ journey, progress }: JourneyCardProps) {
  const getStatusLabel = () => {
    if (!progress) return null
    switch (progress.status) {
      case 'completed':
        return 'Completed'
      case 'in_progress':
        return `Day ${progress.current_day}/7`
      case 'abandoned':
        return 'Abandoned'
      default:
        return null
    }
  }

  const getStatusClass = () => {
    if (!progress) return ''
    switch (progress.status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400'
      case 'in_progress':
        return 'bg-blue-500/20 text-blue-400'
      case 'abandoned':
        return 'bg-muted text-muted-foreground'
      default:
        return ''
    }
  }

  const getButtonText = () => {
    if (!progress) return 'Start Journey'
    switch (progress.status) {
      case 'in_progress':
        return 'Continue Journey'
      case 'completed':
        return 'View Journey'
      default:
        return 'Start Journey'
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{journey.title_en}</CardTitle>
          {progress && (
            <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass()}`}>
              {getStatusLabel()}
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
          <Button className="w-full">{getButtonText()}</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
