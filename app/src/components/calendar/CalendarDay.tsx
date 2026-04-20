interface CalendarDayData {
  date: number;
  isCurrentMonth: boolean;
  hasEntry: boolean;
  emotionColor?: string;
  emotion?: string;
}

interface CalendarDayProps {
  day: CalendarDayData;
  onClick?: (day: CalendarDayData) => void;
}

export function CalendarDay({ day, onClick }: CalendarDayProps) {
  return (
    <button
      onClick={() => day.hasEntry && onClick?.(day)}
      className={`
        aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-all duration-200 ease-out
        ${day.isCurrentMonth ? 'text-atm' : 'text-atm-muted'}
        ${day.hasEntry ? 'bg-atm-accent/10 hover:bg-atm-accent/20 cursor-pointer hover:scale-105' : 'hover:bg-atm-secondary cursor-default'}
      `}
      disabled={!day.hasEntry}
      aria-label={day.hasEntry && day.emotion ? `${day.emotion} on ${day.date}` : undefined}
    >
      <span>{day.date}</span>
      {day.hasEntry && day.emotionColor && (
        <div
          className="w-2 h-2 rounded-full mt-1"
          style={{ backgroundColor: day.emotionColor }}
          aria-hidden="true"
        />
      )}
    </button>
  );
}