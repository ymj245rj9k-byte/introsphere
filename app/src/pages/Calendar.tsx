import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MoodCalendar } from '@/components/calendar/MoodCalendar';

export function Calendar() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Mood Calendar</h1>
        <Link to="/session">
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New entry
          </Button>
        </Link>
      </div>

      <MoodCalendar />
    </div>
  );
}