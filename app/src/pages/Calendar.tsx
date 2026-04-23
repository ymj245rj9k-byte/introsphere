import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MoodCalendar } from '@/components/calendar/MoodCalendar';

export function Calendar() {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col flex-1 p-4 pb-20">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-atm-heading">Mood Calendar</h1>
        <Link to="/session">
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New entry
          </Button>
        </Link>
      </div>

      <div className="flex-1">
        <MoodCalendar />
      </div>
    </div>
  );
}