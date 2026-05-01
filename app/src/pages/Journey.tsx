import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getJourneyById, getJourneyDays } from '@/data/journeys';
import { JourneyProgress } from '@/components/journey/JourneyProgress';
import { DayView } from '@/components/journey/DayView';
import { useJourneyStore } from '@/stores/journeyStore';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function Journey() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { completedDays, setCompletedDays, getCurrentDay, syncFromDatabase } = useJourneyStore();

  // Sync progress from database on mount when user is logged in
  useEffect(() => {
    if (user) {
      syncFromDatabase();
    }
  }, [user, syncFromDatabase]);

  // If no journey ID is provided, redirect to journeys page
  if (!id) {
    navigate('/journeys');
    return null; // Return null to prevent rendering while redirecting
  }

  const journey = getJourneyById(id);
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

  const journeyCompletedDays = completedDays[id] || [];
  const currentDay = getCurrentDay(id);

  const days = getJourneyDays(id);

  const handleDayComplete = (dayNumber: number, _response: string) => {
    setCompletedDays(id, dayNumber);
    // Always navigate back to journey overview after saving
    navigate(`/journey/${id}`);
  };

  // If we're on a specific day page, show the day view
  const { dayNumber } = useParams<{ dayNumber?: string }>();
  if (dayNumber) {
    const dayNum = parseInt(dayNumber, 10);
    const day = days.find(d => d.dayNumber === dayNum);
    if (!day) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Day not found</h1>
            <Link to={`/journey/${id}`} className="text-primary hover:underline">
              ← Back to journey
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <Link to={`/journey/${id}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">{journey.titleEn}</h1>
          </div>

           <DayView
              day={day}
              isCompleted={journeyCompletedDays.includes(dayNum)}
              onComplete={(response) => handleDayComplete(dayNum, response)}
              journeyId={id}
            />
        </div>
      </div>
    );
  }

  // Otherwise show the journey overview
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
        <div className="bg-atm-secondary p-4 rounded-xl border border-atm shadow-atm">
          <JourneyProgress
            currentDay={currentDay}
            completedDays={journeyCompletedDays}
          />
        </div>

        {/* Start/Continue Button */}
        {journeyCompletedDays.length === 0 && (
          <Button className="w-full" size="lg" variant="secondary" onClick={() => navigate(`/journey/${id}/day/1`)}>
            <Play className="w-4 h-4 mr-2" />
            Start journey
          </Button>
        )}

        {journeyCompletedDays.length > 0 && journeyCompletedDays.length < 7 && (
          <Button
            className="w-full bg-atm-secondary border border-atm shadow-atm"
            variant="outline"
            onClick={() => navigate(`/journey/${id}/day/${currentDay}`)}
          >
            Continue day {currentDay}
          </Button>
        )}

        {journeyCompletedDays.length === 7 && (
          <div className="text-center p-6 bg-primary/10 rounded-xl">
            <p className="text-lg font-semibold text-primary">Congratulations!</p>
            <p className="text-muted-foreground">You've completed this reflection journey</p>
          </div>
        )}
      </div>
    </div>
  );
}