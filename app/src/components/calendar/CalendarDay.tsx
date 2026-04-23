interface CalendarDayData {
  date: number;
  isCurrentMonth: boolean;
  hasEntry: boolean;
  emotionColor?: string;
  emotion?: string;
  allColors?: string[];
}

interface CalendarDayProps {
  day: CalendarDayData;
  onClick?: (day: CalendarDayData) => void;
}

export function CalendarDay({ day, onClick }: CalendarDayProps) {
  const colors = day.allColors?.length ? day.allColors : (day.emotionColor ? [day.emotionColor] : []);
  
  return (
      <button
        onClick={() => day.hasEntry && onClick?.(day)}
        className={`
          w-full h-full flex flex-col items-center justify-center rounded-lg text-sm transition-all duration-200 ease-out border
          ${day.isCurrentMonth ? 'text-atm font-medium' : 'text-atm-muted/30'}
          ${day.hasEntry 
            ? 'bg-atm-accent/10 hover:bg-atm-accent/20 cursor-pointer hover:scale-[1.03] shadow-sm' 
            : 'hover:bg-atm-secondary/30 cursor-default'}
          ${day.hasEntry ? 'border-atm/50' : 'border-atm/20'}
          text-center relative
        `}
        disabled={!day.hasEntry}
        aria-label={day.hasEntry && day.emotion ? `${day.emotion} on ${day.date}` : undefined}
      >
        <span className="text-sm font-medium">{day.date}</span>
        {day.hasEntry && colors.length > 0 && (
          <div className="flex gap-0.5 mt-1">
            {colors.slice(0, 3).map((color, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full border border-white/50 shadow-sm"
                style={{ backgroundColor: color }}
                aria-hidden="true"
              />
            ))}
          </div>
        )}
      </button>
  );
}