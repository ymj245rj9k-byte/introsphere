interface JourneyProgressProps {
  currentDay: number;
  totalDays?: number;
  completedDays?: number[];
}

const dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function JourneyProgress({ currentDay, totalDays = 7, completedDays = [] }: JourneyProgressProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">
          Day {currentDay} of {totalDays}
        </span>
        <span className="text-sm text-muted-foreground">
          {completedDays.length}/{totalDays} completed
        </span>
      </div>
      
      <div className="flex gap-1">
        {Array.from({ length: totalDays }, (_, i) => {
          const dayNumber = i + 1;
          const isCompleted = completedDays.includes(dayNumber);
          const isCurrent = dayNumber === currentDay;
          const isPast = dayNumber < currentDay;

          return (
            <div
              key={i}
              className="flex-1 flex flex-col items-center"
            >
              <div
                className={`
                  w-full h-2 rounded-full transition-all
                  ${isCompleted ? 'bg-primary' : ''}
                  ${isCurrent && !isCompleted ? 'bg-primary/50' : ''}
                  ${!isPast && !isCurrent && !isCompleted ? 'bg-muted' : ''}
                `}
              />
              <span
                className={`
                  text-xs mt-1
                  ${isCurrent ? 'text-primary font-medium' : 'text-muted-foreground'}
                `}
              >
                {dayNames[i]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}