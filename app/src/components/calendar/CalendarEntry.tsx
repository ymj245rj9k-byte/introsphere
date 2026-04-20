import { Calendar, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CalendarEntry {
  id: string;
  date: string;
  emotion: string;
  emotionColor: string;
  response: string;
  question?: string;
}

interface CalendarEntryDialogProps {
  entry: CalendarEntry | null;
  open: boolean;
  onClose: () => void;
}

export function CalendarEntryDialog({ entry, open, onClose }: CalendarEntryDialogProps) {
  if (!open || !entry) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`Entry for ${entry.date}`}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-sm transition-opacity duration-200"
        style={{ backgroundColor: 'color-mix(in srgb, var(--atmosphere-bg) 80%, transparent)' }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div 
        className="relative rounded-xl border max-w-md w-full p-6 fade-in"
        style={{
          backgroundColor: 'var(--atmosphere-bg)',
          borderColor: 'var(--atmosphere-border)',
          boxShadow: 'var(--atmosphere-shadow), 0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-atm-muted hover:text-atm hover:bg-atm-secondary transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: entry.emotionColor }}
          >
            <span className="text-lg">{entry.emotion[0]}</span>
          </div>
          <div>
            <h2 className="font-semibold text-atm-heading">{entry.emotion}</h2>
            <p className="text-sm text-atm-muted flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {entry.date}
            </p>
          </div>
        </div>

        {entry.question && (
          <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--atmosphere-bg-secondary)' }}>
            <p className="text-sm text-atm-muted mb-1">Pytanie:</p>
            <p className="text-atm">{entry.question}</p>
          </div>
        )}

        <div className="mb-6">
          <p className="text-sm text-atm-muted mb-2">Your answer:</p>
          <p className="text-atm leading-relaxed">{entry.response}</p>
        </div>

        <Button onClick={onClose} className="w-full">
          Zamknij
        </Button>
      </div>
    </div>
  );
}