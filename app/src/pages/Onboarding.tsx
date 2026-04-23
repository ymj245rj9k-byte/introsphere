import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Emotion } from '@/types/emotion';
import { getLevel3Emotions } from '@/data/emotions';
import { journeys } from '@/data/journeys';

export function Onboarding() {
  const [step, setStep] = useState(1);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  const totalSteps = 3;

  return (
    <div className="min-h-screen bg-atm flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-foreground">
              Introsphere
            </Link>
            <div className="text-sm text-muted-foreground">
              Step {step} of {totalSteps}
            </div>
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex gap-2">
            {[1, 2, 3].map(s => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full transition-colors ${
                  s <= step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl space-y-8">
          {step === 1 && <WelcomeStep onNext={() => setStep(2)} />}
          {step === 2 && (
            <EmotionStep
              selected={selectedEmotion}
              onSelect={setSelectedEmotion}
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <JourneyStep
              onComplete={() => setStep(1)}
            />
          )}
        </div>
      </main>
    </div>
  );
}

function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Welcome to Introsphere
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Your personal space for emotional reflection and self-discovery.
          Let's set up your experience in just a few steps.
        </p>
      </div>

      <div className="grid gap-4 text-left">
        <div className="p-4 rounded-xl bg-surface border border-border">
          <h3 className="font-semibold text-foreground mb-2">1. Choose an emotion</h3>
          <p className="text-sm text-muted-foreground">
            Start by identifying how you're feeling right now using our emotion wheel.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-surface border border-border">
          <h3 className="font-semibold text-foreground mb-2">2. Pick a journey</h3>
          <p className="text-sm text-muted-foreground">
            Select a 7-day guided program that matches what you want to explore.
          </p>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 px-6 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors"
      >
        Let's begin
      </button>
    </div>
  );
}

function EmotionStep({
  selected,
  onSelect,
  onNext,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
  onNext: () => void;
}) {
  const emotions = getLevel3Emotions();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">How are you feeling?</h2>
        <p className="text-muted-foreground">
          Select the emotion that best describes your current state.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {emotions.map((emotion: Emotion) => (
          <button
            key={emotion.id}
            onClick={() => onSelect(emotion.id)}
            className={`p-4 rounded-xl border-2 transition-all ${
              selected === emotion.id
                ? 'border-primary bg-primary/10 scale-[1.05]'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div
              className="w-8 h-8 rounded-full mx-auto mb-2"
              style={{ backgroundColor: emotion.color }}
            />
            <span className="text-sm font-medium text-foreground">{emotion.name}</span>
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!selected}
        className="w-full py-4 px-6 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
}

function JourneyStep({
  onComplete,
}: {
  onComplete: () => void;
}) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Choose your journey</h2>
        <p className="text-muted-foreground">
          Select a 7-day guided reflection program.
        </p>
      </div>

      <div className="grid gap-3">
        {journeys.map((journey) => (
          <Link
            key={journey.id}
            to={`/journey/${journey.id}`}
            className="p-4 rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-md block"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{journey.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground mb-1">{journey.titleEn}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {journey.subtitleEn}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <button
        onClick={onComplete}
        className="w-full py-4 px-6 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors"
      >
        Complete Setup
      </button>
    </div>
  );
}
