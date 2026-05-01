import { useState, useEffect } from 'react';
import { Calendar, Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useHistory } from '@/hooks/useHistory';
import { useSearchParams } from 'react-router-dom';
import type { CalendarEntryData } from '@/lib/database';

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

interface ReflectionDetailDialogProps {
  entry: CalendarEntryData;
  onClose: () => void;
}

function ReflectionDetailDialog({ entry, onClose }: ReflectionDetailDialogProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Reflection from ${entry.date}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-sm transition-opacity duration-200"
        style={{ backgroundColor: 'color-mix(in srgb, var(--atmosphere-bg) 80%, transparent)' }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        className="relative rounded-xl border max-w-md w-full p-6 fade-in flex flex-col max-h-[85vh]"
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

        {/* Header */}
        <div className="mb-4 flex-shrink-0">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: entry.emotionColor }}
            >
              <span className="text-lg font-bold">{entry.emotion[0]}</span>
            </div>
            <div>
              <h2 className="font-bold text-xl text-atm-heading">{entry.emotion}</h2>
              <p className="text-sm text-atm-muted flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(entry.date)}
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 space-y-4">
          {entry.question && (
            <div
              className="p-3 rounded-lg"
              style={{ backgroundColor: 'var(--atmosphere-bg-secondary)' }}
            >
              <p className="text-base font-semibold text-atm-muted mb-1">Question:</p>
              <p className="text-lg text-atm">{entry.question}</p>
            </div>
          )}

          <div>
            <p className="text-base font-semibold text-atm-muted mb-1">Your reflection:</p>
            <p className="text-lg text-atm leading-relaxed whitespace-pre-wrap">
              {entry.response}
            </p>
          </div>
        </div>

        <Button
          onClick={onClose}
          className="w-full text-lg font-semibold text-atm-heading mt-4 flex-shrink-0"
        >
          Close
        </Button>
      </div>
    </div>
  );
}

export function History() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<CalendarEntryData | null>(null);
  const { entries, loading, error } = useHistory();
  const [searchParams, setSearchParams] = useSearchParams();

  const filteredEntries = entries.filter(
    (entry) =>
      entry.response.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.emotion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open entry dialog when ?entry=ID is present in URL
  useEffect(() => {
    const entryId = searchParams.get('entry');
    if (entryId && entries.length > 0) {
      const found = entries.find((e) => e.id === entryId);
      if (found) {
        setSelectedEntry(found);
        setSearchParams({}, { replace: true });
      }
    }
  }, [searchParams, entries, setSearchParams]);

  const handleCloseDialog = () => {
    setSelectedEntry(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-foreground mb-6">Reflections</h1>

      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-destructive">Error loading entries</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="space-y-3">
            {filteredEntries.map((entry) => (
              <Card
                key={entry.id}
                className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => setSelectedEntry(entry)}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
                    style={{ backgroundColor: entry.emotionColor }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-foreground">{entry.emotion}</span>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {formatDate(entry.date)}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{entry.response}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredEntries.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No entries to display</p>
            </div>
          )}
        </>
      )}

      {selectedEntry && (
        <ReflectionDetailDialog entry={selectedEntry} onClose={handleCloseDialog} />
      )}
    </div>
  );
}
