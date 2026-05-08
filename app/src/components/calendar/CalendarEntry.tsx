import { useState } from 'react';
import { Calendar, X, ArrowRight, MapPin, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { journeys as staticJourneys } from '@/data/journeys';
import { useAuth } from '@/hooks/useAuth';
import { deleteEntry } from '@/lib/database';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { toast } from 'sonner';

const journeyTitleMap = new Map(staticJourneys.map((j) => [j.id, j.title]));

interface CalendarEntry {
  id: string;
  date: string;
  emotion: string;
  emotionColor: string;
  response: string;
  question?: string;
  journey_id?: string | null;
  journey_day?: number | null;
}

interface CalendarEntryDialogProps {
  entries: CalendarEntry[];
  open: boolean;
  onClose: () => void;
  onEntriesUpdate?: () => void; // Callback to refresh entries after deletion
}

const MAX_RESPONSE_LENGTH = 120;

export function CalendarEntryDialog({ entries, open, onClose, onEntriesUpdate }: CalendarEntryDialogProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<CalendarEntry | null>(null);

  if (!open || !entries || entries.length === 0) return null;

  const handleViewFullReflection = (entryId: string) => {
    onClose();
    navigate(`/history?entry=${entryId}`);
  };

  const handleDeleteClick = (entry: CalendarEntry) => {
    setEntryToDelete(entry);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!entryToDelete || !user) return;
    
    try {
      const success = await deleteEntry(entryToDelete.id, user.id);
      if (success) {
        toast.success('Entry deleted successfully');
        if (onEntriesUpdate) {
          onEntriesUpdate(); // Refresh the calendar view
        }
        onClose(); // Close the dialog after successful deletion
      } else {
        toast.error('Failed to delete entry');
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
      toast.error('An error occurred while deleting the entry');
    }
  };

  const truncateResponse = (response: string) => {
    if (response.length <= MAX_RESPONSE_LENGTH) return response;
    return response.substring(0, MAX_RESPONSE_LENGTH) + '...';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`Entries for ${entries[0].date}`}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-sm transition-opacity duration-200"
        style={{ backgroundColor: 'color-mix(in srgb, var(--atmosphere-bg) 80%, transparent)' }}
        onClick={onClose}
        aria-hidden="true"
      />
    
      {/* Dialog */}
      <div 
        className="relative rounded-xl border max-w-md w-full p-6 fade-in flex flex-col max-h-[80vh]"
        style={{
          backgroundColor: 'var(--atmosphere-bg)',
          borderColor: 'var(--atmosphere-border)',
          boxShadow: 'var(--atmosphere-shadow), 0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-10 p-1 rounded-lg text-atm-muted hover:text-atm hover:bg-atm-secondary transition-colors" /* Moved from right-4 to right-10 to make space for delete button */
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
</button>
        
        <div className="mb-4 flex-shrink-0 pt-6">
          <h2 className="font-bold text-xl text-atm-heading">Entries for {entries[0].date}</h2>
          <p className="text-base text-atm-muted">You have {entries.length} entries for this day.</p>
        </div>

        {/* Scrollable entries */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="border rounded-lg p-4 relative" style={{ borderColor: 'var(--atmosphere-border)' }}>
              <button
                onClick={() => handleDeleteClick(entry)}
                className="absolute top-2 right-2 p-1.5 rounded-lg text-atm-muted hover:text-destructive hover:bg-atm-secondary transition-colors"
                aria-label="Delete entry"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-3 mb-3">
<div
                   className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                   style={{ backgroundColor: entry.emotionColor }}
                 >
                   <span className="text-lg font-bold text-black">{entry.emotion[0]}</span>
                 </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-atm-heading">{entry.emotion}</h3>
                  <p className="text-sm text-atm-muted flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {entry.date}
                  </p>
                  {entry.journey_id && (
                    <p className="text-xs text-atm-muted flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {journeyTitleMap.get(entry.journey_id) ?? entry.journey_id}
                      {entry.journey_day != null && ` · Day ${entry.journey_day}`}
                    </p>
                  )}
                </div>
              </div>

              {entry.question && (
                <div className="mb-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--atmosphere-bg-secondary)' }}>
                  <p className="text-base font-semibold text-atm-muted mb-1">Pytanie:</p>
                  <p className="text-lg text-atm">{entry.question}</p>
                </div>
              )}

              <div>
                <p className="text-base font-semibold text-atm-muted mb-1">Your answer:</p>
                <p className="text-lg text-atm leading-relaxed">
                  {truncateResponse(entry.response)}
                  {entry.response.length > MAX_RESPONSE_LENGTH && (
                    <button
                      onClick={() => handleViewFullReflection(entry.id)}
                      className="ml-2 text-sm text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Click to see more <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <Button onClick={onClose} className="w-full text-lg font-semibold text-atm-heading mt-4 flex-shrink-0">
          Close
        </Button>
        
        {/* Confirmation Dialog */}
        <ConfirmDialog
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Entry"
          description="Are you sure you want to delete this entry? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
        />
      </div>
    </div>
  );
}