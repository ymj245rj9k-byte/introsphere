import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { EmotionWheel } from '@/components/emotion-wheel';
import { Emotion } from '@/types/emotion';
import { questions } from '@/data/questions';

const todayQuestion = questions[Math.floor(Math.random() * questions.length)];

export function Session() {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [response, setResponse] = useState('');

  const handleSave = () => {
    console.log('Saving:', { emotion: selectedEmotion, response });
    setSelectedEmotion(null);
    setResponse('');
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Link to="/home">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold text-foreground">Codzienna sesja</h1>
      </div>

      <div className="space-y-8">
        {/* Question */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Dzisiejsze pytanie
          </p>
          <p className="text-lg font-medium text-foreground">
            {todayQuestion.text}
          </p>
        </div>

        {/* Emotion Wheel */}
        <div className="flex flex-col items-center">
          <p className="text-sm font-medium text-foreground mb-4">
            Choose your emotion
          </p>
          <EmotionWheel
            onSelect={setSelectedEmotion}
            selectedId={selectedEmotion?.id}
            size={320}
          />
        </div>

        {/* Selected emotion display */}
        {selectedEmotion && (
          <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-surface border border-border">
            <div
              className="w-10 h-10 rounded-full"
              style={{ backgroundColor: selectedEmotion.color }}
            />
            <div>
              <p className="font-medium text-foreground">{selectedEmotion.name}</p>
              <p className="text-sm text-muted-foreground">{selectedEmotion.nameEn}</p>
            </div>
          </div>
        )}

        {/* Response */}
        <div>
          <p className="text-sm font-medium text-foreground mb-3">
            Your answer
          </p>
          <Textarea
            placeholder="Write your thoughts here..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className="min-h-[150px]"
          />
        </div>

        <Button
          className="w-full"
          onClick={handleSave}
          disabled={!selectedEmotion || !response}
        >
          <Send className="w-4 h-4 mr-2" />
          Zapisz wpis
        </Button>
      </div>
    </div>
  );
}