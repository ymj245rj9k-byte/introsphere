import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { JourneyDay } from '@/types/journey';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Save, Loader2 } from 'lucide-react';
import { saveJourneyDayResponse } from '@/lib/database';

export function DayView({ 
  day, 
  isCompleted, 
  onComplete, 
  journeyId 
}: { 
  day: JourneyDay; 
  isCompleted: boolean; 
  onComplete: (response: string) => void;
  journeyId: string;
}) {
  const { user } = useAuth();
  const [response, setResponse] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!user) {
      setError('You need to be logged in to save.');
      return;
    }

    if (!response.trim() || saving) return;

    setSaving(true);
    setError(null);

    try {
      // Save the journey day response to database
      await saveJourneyDayResponse({
        userId: user.id,
        journeyId,
        dayNumber: day.dayNumber,
        response: response.trim(),
      });

      // Call onComplete to update journey progress and navigation
      onComplete(response.trim());
    } catch (err) {
      console.error('Failed to save response:', err);
      setError('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        {/* Question Block - Card at the top */}
        <div className="bg-surface border border-border rounded-xl p-6 mb-6 shadow-sm">
          <p className="text-xl font-medium text-foreground leading-relaxed">
            {day.question}
          </p>
        </div>

        {/* Response Textarea */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="response-textarea" className="text-sm font-medium text-foreground">
              Your reflection
            </label>
            <Textarea
              id="response-textarea"
              placeholder="Write your thoughts here..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className="min-h-[300px] text-base leading-relaxed resize-none bg-background border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
              disabled={isCompleted || saving}
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}

          {!isCompleted && (
            <Button
              onClick={handleSave}
              disabled={!response.trim() || saving}
              className="w-full py-6 text-base gap-3"
              size="lg"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save entry
                </>
              )}
            </Button>
          )}

          {isCompleted && (
            <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-primary font-medium">Day completed ✓</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
