import { Link } from 'react-router-dom';
import { Journey } from '@/types/journey';
import { ROUTES } from '@/constants';

interface JourneyCardProps {
  journey: Journey;
}

export function JourneyCard({ journey }: JourneyCardProps) {
  return (
    <Link
      to={`${ROUTES.JOURNEY.replace(':id', journey.id)}`}
      className="group block p-6 rounded-xl border transition-all hover:scale-[1.02] active:scale-[0.98]"
      style={{
        backgroundColor: 'var(--atmosphere-bg-secondary)',
        borderColor: 'var(--atmosphere-border)',
      }}
    >
      <div className="space-y-4">
        <span className="text-4xl">{journey.icon}</span>
        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
          {journey.titleEn}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {journey.subtitleEn}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>7 days</span>
          <span aria-hidden="true">•</span>
          <span>Daily questions</span>
        </div>
      </div>
    </Link>
  );
}