interface JourneyProgressBarProps {
  currentDay: number
  totalDays: number
}

export function JourneyProgressBar({ currentDay, totalDays }: JourneyProgressBarProps) {
  const percentage = (currentDay / totalDays) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Progress</span>
        <span className="font-semibold">
          Day {currentDay} of {totalDays}
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
