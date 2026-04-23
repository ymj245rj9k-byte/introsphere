import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';

export function Intro() {
  return (
    <div className="min-h-screen bg-atm flex items-center justify-center">
      <div className="max-w-md mx-auto px-6 text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Introsphere
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Your space for reflection. Discover patterns in your emotions through guided journaling.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Link
            to={ROUTES.HOW_IT_WORKS}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
