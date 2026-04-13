import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';

export function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      {/* Hero Section */}
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Logo / Brand */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Introsphere
          </h1>
          <p className="text-lg text-muted-foreground">
            Your space for reflection
          </p>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <p className="text-base text-muted-foreground leading-relaxed">
            Guided emotional journaling that helps you better understand
            your emotions and develop self-awareness.
          </p>
        </div>

        {/* CTA */}
        <div className="space-y-3 pt-4">
          <Link
            to={ROUTES.AUTH}
            className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
          >
            Start journaling
          </Link>
          <p className="text-sm text-muted-foreground">
            Free account. No commitments.
          </p>
        </div>

        {/* Features preview */}
        <div className="grid grid-cols-1 gap-4 pt-8">
          <FeatureCard
            title="Emotion Wheel"
            description="An interactive emotion wheel that helps you name what you feel"
          />
          <FeatureCard
            title="7-Day Journeys"
            description="Guided thematic paths with daily reflection questions"
          />
          <FeatureCard
            title="Mood Calendar"
            description="Track your emotions and discover patterns over time"
          />
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
}

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="p-4 rounded-xl bg-surface text-left">
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
  );
}
