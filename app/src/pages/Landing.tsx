import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function Landing() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-md text-center space-y-8">
        {/* Logo/Title */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-foreground">
            Introsphere
          </h1>
          <p className="text-lg text-muted-foreground">
            Instead of 30 minutes staring at a blank page — choose your mood, answer a question, and immediately see patterns in your emotions.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-4">
          <Link to="/session" className="block">
            <Button size="lg" className="w-full pulse">
              Start Session
            </Button>
          </Link>
          <Link to="/auth" className="block">
            <Button variant="outline" size="lg" className="w-full">
              Sign In
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="pt-8 space-y-4 text-left">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Emotion Wheel</strong> — touch a color, no need to name it
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Guided Journeys</strong> — 7-day programs with specific questions
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Mood Calendar</strong> — see patterns over time
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground pt-4">
          This is not therapy. It's a tool for self-reflection.
        </p>
      </div>
    </div>
  )
}
