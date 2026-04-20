import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getJourneyById, getJourneyDays } from '@/data/journeys';
import { JourneyProgress } from '@/components/journey/JourneyProgress';
import { DayQuestion } from '@/components/journey/DayQuestion';

export function Journey() {
  const { id } = useParams<{ id: string }>();
  const journey = getJourneyById(id || '');
  const days = getJourneyDays(id || '');

  const [currentDay, setCurrentDay] = useState(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  if (!journey) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Journey not found</h1>
          <Link to="/home" className="text-primary hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  const handleDayComplete = (dayNumber: number, _response: string) => {
    if (!completedDays.includes(dayNumber)) {
      setCompletedDays([...completedDays, dayNumber]);
    }
    if (dayNumber < 7) {
      setCurrentDay(dayNumber + 1);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Link to="/home">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="text-center space-y-4">
          <span className="text-6xl">{journey.icon}</span>
          <h1 className="text-3xl font-bold">{journey.titleEn}</h1>
          <p className="text-muted-foreground">{journey.subtitleEn}</p>
          <p className="text-sm text-muted-foreground">{journey.toneEn}</p>
        </div>

        {/* Progress */}
        <div className="bg-surface p-4 rounded-xl border border-border">
          <JourneyProgress
            currentDay={currentDay}
            completedDays={completedDays}
          />
        </div>

        {/* Days */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">7 dni refleksji</h2>
          {days.map((day) => (
            <DayQuestion
              key={day.id}
              day={day}
              dayNumber={day.dayNumber}
              isCompleted={completedDays.includes(day.dayNumber)}
              isUnlocked={day.dayNumber <= currentDay}
              onComplete={(response) => handleDayComplete(day.dayNumber, response)}
            />
          ))}
        </div>

        {/* Start/Continue Button */}
        {completedDays.length === 0 && (
          <Button className="w-full" size="lg">
            <Play className="w-4 h-4 mr-2" />
            Start journey
          </Button>
        )}

        {completedDays.length > 0 && completedDays.length < 7 && (
          <Button className="w-full" variant="outline">
            Continue day {currentDay}
          </Button>
        )}

        {completedDays.length === 7 && (
          <div className="text-center p-6 bg-primary/10 rounded-xl">
            <p className="text-lg font-semibold text-primary">Congratulations!</p>
            <p className="text-muted-foreground">You've completed this reflection journey</p>
          </div>
        )}
      </div>
    </div>
  );
}