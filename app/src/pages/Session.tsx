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
        {/* Emotion Wheel Section */}
        <div className="text-center space-y-4">
          <p className="text-xl md:text-2xl text-foreground flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Click on an emotion on the wheel to reflect
          </p>
          <p className="text-sm text-muted-foreground">
            Tip: emotion details are available after clicking on it
          </p>
        </div>

        {/* Emotion Wheel */}
        <div className="flex flex-col items-center">
          <EmotionWheel
            onSelect={handleEmotionSelect}
          />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-border"></div>
          <span className="text-sm text-muted-foreground">or</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        {/* Start a Journey Section */}
        <div className="text-center space-y-4">
          <p className="text-lg font-semibold text-foreground">Start a guided journey</p>
          <p className="text-sm text-muted-foreground">
            7-day reflection programs for deeper exploration
          </p>
          <Button 
            onClick={() => navigate('/journeys')}
            className="w-full"
            size="lg"
          >
            Browse Journeys
          </Button>
        </div>
      </div>
    </div>
  );
}