import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmotionWheel } from '@/components/emotion-wheel';
import { Emotion } from '@/types/emotion';

export function Session() {
  const navigate = useNavigate();

  const handleEmotionSelect = (emotion: Emotion) => {
    // Navigate to the emotion reflection page with the selected emotion
    navigate('/emotion-reflection', { state: { emotion } });
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Link to="/home">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold text-foreground">Daily Session</h1>
      </div>

      <div className="space-y-8">
        {/* Question */}
        <div className="text-center">
          <p className="text-xl md:text-2xl text-muted-foreground mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Select your emotion
          </p>
          <p className="text-lg font-medium text-foreground">
            Click on an emotion on the wheel and receive an individual reflective question.
          </p>
        </div>

        {/* Emotion Wheel */}
        <div className="flex flex-col items-center">
          
          <EmotionWheel
            onSelect={handleEmotionSelect}
          />
        </div>
      </div>
    </div>
  );
}