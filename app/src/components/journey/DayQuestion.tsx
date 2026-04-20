import { useState } from 'react';
import { JourneyDay } from '@/types/journey';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Check, Lock } from 'lucide-react';

interface DayQuestionProps {
  day: JourneyDay;
  dayNumber: number;
  isCompleted: boolean;
  isUnlocked: boolean;
  onComplete?: (response: string) => void;
}

export function DayQuestion({ day, dayNumber, isCompleted, isUnlocked, onComplete }: DayQuestionProps) {
  const [response, setResponse] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    onComplete?.(response);
    setResponse('');
  };

  if (!isUnlocked) {
    return (
      <div className="p-4 rounded-xl bg-muted/30 border border-border opacity-60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <Lock className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium text-muted-foreground">Day {dayNumber}</p>
            <p className="text-sm text-muted-foreground">Available after completing previous day</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-xl border transition-all ${isCompleted ? 'bg-primary/5 border-primary/20' : 'bg-surface border-border'}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-3 text-left"
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCompleted ? 'bg-primary text-primary-foreground' : 'bg-primary/20 text-primary'}`}>
          {isCompleted ? <Check className="w-4 h-4" /> : <span className="text-sm font-medium">{dayNumber}</span>}
        </div>
        <div className="flex-1">
          <p className="font-medium text-foreground">{day.dayName}</p>
          <p className="text-sm text-muted-foreground line-clamp-1">{day.question}</p>
        </div>
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <p className="text-foreground leading-relaxed">{day.question}</p>
          <Textarea
            placeholder="Write your answer here..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className="min-h-[100px]"
          />
          <Button onClick={handleSubmit} disabled={!response.trim()}>
            {isCompleted ? 'Save changes' : 'Complete day'}
          </Button>
        </div>
      )}
    </div>
  );
}