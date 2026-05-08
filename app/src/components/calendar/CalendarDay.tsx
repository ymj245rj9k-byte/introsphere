interface CalendarDayData {
  date: number;
  dateKey: string;
  isCurrentMonth: boolean;
  hasEntry: boolean;
  emotionColor?: string;
  emotion?: string;
  allColors?: string[];
  journey_id?: string | null;
  isQuickEntry?: boolean; // For entries without emotion (quick entries)
}

interface CalendarDayProps {
  day: CalendarDayData;
  onClick?: (day: CalendarDayData) => void;
}

export function CalendarDay({ day, onClick }: CalendarDayProps) {
  const colors = day.allColors?.length ? day.allColors : (day.emotionColor ? [day.emotionColor] : []);
  const isQuick = day.emotion === 'Notes' && !day.journey_id; // Identify quick entries
  
  return (
        <button
          onClick={() => day.hasEntry && onClick?.(day)}
          className={`
            w-full h-full flex flex-col items-center justify-center rounded-lg text-sm transition-all duration-200 ease-out border
            ${day.hasEntry 
              ? 'bg-atm-secondary border-atm-border cursor-pointer hover:scale-[1.02] active:scale-[0.98]' 
              : 'hover:bg-atm-secondary/30 cursor-default border-transparent'}
            text-center relative
          `}
          disabled={!day.hasEntry}
          aria-label={day.hasEntry && !isQuick ? `${day.emotion} on ${day.date}` : day.hasEntry && isQuick ? `Quick entry on ${day.date}` : undefined}
        >
          <span className="text-sm font-medium">{day.date}</span>
          {day.hasEntry && (
            <div className="flex gap-0.5 mt-1">
              {/* Show emotion colors for regular entries, special indicator for quick entries */}
              {!isQuick && colors.slice(0, 3).map((color, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full border border-white/50 shadow-sm"
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                />
              ))}
              
              {/* Show quick entry indicator */}
              {isQuick && (
                <div
                  className="w-2 h-2 rounded-full border border-white/50 shadow-sm"
                  style={{ backgroundColor: 'var(--atmosphere-accent, #8B5CF6)' }}
                  aria-hidden="true"
                />
              )}
            </div>
          )}
        </button>
  );
}