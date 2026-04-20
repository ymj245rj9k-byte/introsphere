import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
}

export function OnboardingLayout({ children, currentStep, totalSteps }: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-atm">
      <header className="p-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v12M6 12h12" />
              <circle cx="12" cy="12" r="4" />
            </svg>
          </div>
          <span className="text-lg font-semibold text-foreground">Introsphere</span>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i < currentStep
                      ? 'bg-primary'
                      : i === currentStep - 1
                      ? 'bg-primary/50'
                      : 'bg-muted'
                  }`}
                  style={{ marginLeft: i === 0 ? 0 : '4px', marginRight: i === totalSteps - 1 ? 0 : '4px' }}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Krok {currentStep} z {totalSteps}
            </p>
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}