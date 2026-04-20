import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CalendarDay } from './CalendarDay';
import { CalendarEntryDialog } from './CalendarEntry';

interface DayEntry {
  date: number;
  hasEntry: boolean;
  isCurrentMonth: boolean;
  emotionColor?: string;
  emotion?: string;
  response?: string;
  question?: string;
}

interface CalendarEntryData {
  id: string;
  date: string;
  emotion: string;
  emotionColor: string;
  response: string;
  question?: string;
}

interface MoodCalendarProps {
  onDayClick?: (entry: CalendarEntryData) => void;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const mockEntries: Record<string, CalendarEntryData> = {
  '2026-04-20': {
    id: '1',
    date: '2026-04-20',
    emotion: 'Joy',
    emotionColor: '#F7DC6F',
    response: 'Really great day at work today. Project is moving forward!',
    question: 'What made you feel alive today?',
  },
  '2026-04-19': {
    id: '2',
    date: '2026-04-19',
    emotion: 'Calm',
    emotionColor: '#82E0AA',
    response: 'Evening with a book, tea, silence. It was a good day.',
    question: 'What are you grateful for today?',
  },
  '2026-04-18': {
    id: '3',
    date: '2026-04-18',
    emotion: 'Thoughtful',
    emotionColor: '#7D3C98',
    response: 'Thinking about what was and what is coming. Lots on my mind.',
    question: 'What are you thinking about right now?',
  },
};

function generateCalendarDays(year: number, month: number): DayEntry[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days: DayEntry[] = [];

  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const prevDate = new Date(year, month, -i);
    days.push({
      date: prevDate.getDate(),
      isCurrentMonth: false,
      hasEntry: false,
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    const entry = mockEntries[dateStr];
    days.push({
      date: i,
      isCurrentMonth: true,
      hasEntry: !!entry,
      emotionColor: entry?.emotionColor,
      emotion: entry?.emotion,
      response: entry?.response,
      question: entry?.question,
    });
  }

  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: i,
      isCurrentMonth: false,
      hasEntry: false,
    });
  }

  return days;
}

export function MoodCalendar({ onDayClick }: MoodCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEntry, setSelectedEntry] = useState<CalendarEntryData | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = generateCalendarDays(year, month);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDayClick = (day: DayEntry) => {
    if (day.hasEntry) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day.date).padStart(2, '0')}`;
      const entry = mockEntries[dateStr];
      if (entry) {
        setSelectedEntry(entry);
        setShowDialog(true);
        onDayClick?.(entry);
      }
    }
  };

  return (
    <div 
      className="rounded-xl border p-4 transition-all duration-300 hover:shadow"
      style={{
        backgroundColor: 'var(--atmosphere-bg, #fff)',
        borderColor: 'var(--atmosphere-border)',
        boxShadow: 'var(--atmosphere-shadow)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="sm" onClick={prevMonth} aria-label="Previous month">
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-lg font-semibold text-atm-heading">
          {MONTHS[month]} {year}
        </h2>
        <Button variant="ghost" size="sm" onClick={nextMonth} aria-label="Next month">
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Nd', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-atm-muted py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <CalendarDay
            key={index}
            day={day}
            onClick={handleDayClick}
          />
        ))}
      </div>

      {/* Entry Dialog */}
      {selectedEntry && (
        <CalendarEntryDialog
          entry={selectedEntry}
          open={showDialog}
          onClose={() => setShowDialog(false)}
        />
      )}
    </div>
  );
}