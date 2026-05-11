import { useState, useEffect, useRef } from 'react';
import { Calendar, Search, Filter, X, Trash2, ChevronDown, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useHistory } from '@/hooks/useHistory';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { deleteEntry } from '@/lib/database';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { toast } from 'sonner';
import { useSessionStore } from '@/stores/sessionStore';
import type { CalendarEntryData } from '@/lib/database';
import { level3Emotions, subSpectrumEmotions } from '@/data/emotions';
import { journeys } from '@/data/journeys';

// Combine all emotions for filtering
const allEmotions = [...level3Emotions, ...subSpectrumEmotions];

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
  onDelete: (id: string) => void;
  entries: CalendarEntryData[];
}

function ReflectionDetailDialog({ entry, onClose, onDelete, entries }: ReflectionDetailDialogProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDeleteClick = () => {
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    await onDelete(entry.id);
  };

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

        <button
          onClick={handleDeleteClick}
          className="absolute top-4 left-4 p-1.5 rounded-lg text-atm-muted hover:text-destructive hover:bg-atm-secondary transition-colors"
          aria-label="Delete entry"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-4 flex-shrink-0 pl-8">
          <div className="flex items-center gap-3 mb-2">
<div
               className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
               style={{ backgroundColor: entry.emotionColor }}
             >
               <span className="text-lg font-bold text-black">{entry.emotion[0]}</span>
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
        
        {/* Confirmation Dialog */}
        <ConfirmDialog
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Entry"
          description={
            <div>
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                <span>Are you sure you want to delete this entry?</span>
              </div>
              {entries.filter(e => e.date === entry.date).length === 1 && (
                <span className="text-sm text-yellow-600">This is the only entry for today — deleting it will reset your streak.</span>
              )}
            </div>
          }
          confirmText="Delete"
          cancelText="Cancel"
        />
      </div>
    </div>
  );
}

export function History() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<CalendarEntryData | null>(null);
  const [filterType, setFilterType] = useState<'emotion' | 'journey' | null>(null);
  const [filterValue, setFilterValue] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<CalendarEntryData | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const { entries, loading, error, mutate: refreshHistory } = useHistory();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const incrementEntryDeletedCount = useSessionStore((s) => s.incrementEntryDeletedCount);

  const filteredEntries = entries.filter((entry) => {
    // First apply text search filter
    const matchesSearch =
      entry.response.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.emotion.toLowerCase().includes(searchQuery.toLowerCase());

    // Then apply type-specific filter
    if (!matchesSearch) return false;

    if (filterType === 'emotion' && filterValue) {
      // Filter by emotion - check emotionId first, then by emotion name if emotionId not available
      return entry.emotionId?.toLowerCase() === filterValue.toLowerCase() ||
             entry.emotion.toLowerCase() === filterValue.toLowerCase();
    }

    if (filterType === 'journey' && filterValue) {
      // Filter by journey id
      return entry.journey_id === filterValue;
    }

    return true;
  });

  // Clear filter when search query changes
  useEffect(() => {
    if (searchQuery && filterValue) {
      setFilterValue(null);
      setFilterType(null);
    }
  }, [searchQuery]);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleDeleteClick = (entry: CalendarEntryData) => {
    setEntryToDelete(entry);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!entryToDelete || !user) return;

    try {
      const success = await deleteEntry(entryToDelete.id, user.id);
      if (success) {
        toast.success('Entry deleted successfully');
        incrementEntryDeletedCount();
        refreshHistory();
        setDeleteConfirmOpen(false);
        setEntryToDelete(null);
      } else {
        toast.error('Failed to delete entry');
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
      toast.error('An error occurred while deleting the entry');
    }
  };

  const handleDeleteEntry = async (entryId: string) => {
    if (!user) {
      toast.error('You must be logged in to delete entries');
      return;
    }

    try {
      const success = await deleteEntry(entryId, user.id);
      if (success) {
        toast.success('Entry deleted successfully');
        incrementEntryDeletedCount();
        refreshHistory(); // Refresh the history list
        setSelectedEntry(null); // Close the dialog if open
      } else {
        toast.error('Failed to delete entry');
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
      toast.error('An error occurred while deleting the entry');
    }
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
        
        <div className="relative" ref={filterRef}>
          <Button 
            variant={filterValue ? "default" : "outline"} 
            size="icon"
            onClick={() => setFilterOpen(!filterOpen)}
            aria-label="Filter entries"
          >
            <Filter className="w-4 h-4" />
          </Button>
          
          {filterOpen && (
            <div 
              className="absolute right-0 mt-2 w-64 rounded-xl border shadow-lg z-50"
              style={{
                backgroundColor: 'var(--atmosphere-bg)',
                borderColor: 'var(--atmosphere-border)',
              }}
            >
              <div className="p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-atm-heading">Filter by</span>
                  {filterValue && (
                    <button
                      onClick={() => {
                        setFilterValue(null);
                        setFilterType(null);
                      }}
                      className="text-xs text-atm-muted hover:text-atm-accent"
                    >
                      Clear
                    </button>
                  )}
                </div>
                
{/* Emotion Dropdown */}
                 <div>
                   <label className="text-xs font-medium text-atm-muted mb-1 block">Emotion</label>
                   <div className="relative">
                     <select
                       value={filterType === 'emotion' ? filterValue || '' : ''}
                       onChange={(e) => {
                         const value = e.target.value;
                         if (value) {
                           setFilterType('emotion');
                           setFilterValue(value);
                         } else {
                           setFilterType(null);
                           setFilterValue(null);
                         }
                         setFilterOpen(false);
                       }}
                       className="w-full appearance-none bg-atm-secondary border border-atm-border rounded-lg px-3 py-2 text-sm text-atm pr-10"
                     >
                       <option value="">All emotions</option>
                       {allEmotions.map((emotion) => (
                         <option key={emotion.id} value={emotion.id}>
                           {emotion.nameEn}
                         </option>
                       ))}
                     </select>
                     <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-atm-muted pointer-events-none" />
                   </div>
                 </div>
                 
                 {/* Journey Dropdown */}
                 <div>
                   <label className="text-xs font-medium text-atm-muted mb-1 block">Journey</label>
                   <div className="relative">
                     <select
                       value={filterType === 'journey' ? filterValue || '' : ''}
                       onChange={(e) => {
                         const value = e.target.value;
                         if (value) {
                           setFilterType('journey');
                           setFilterValue(value);
                         } else {
                           setFilterType(null);
                           setFilterValue(null);
                         }
                         setFilterOpen(false);
                       }}
                       className="w-full appearance-none bg-atm-secondary border border-atm-border rounded-lg px-3 py-2 text-sm text-atm pr-10"
                     >
                       <option value="">All journeys</option>
                       {journeys.map((journey) => (
                         <option key={journey.id} value={journey.id}>
                           {journey.titleEn}
                         </option>
                       ))}
                     </select>
                     <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-atm-muted pointer-events-none" />
                   </div>
                 </div>
              </div>
            </div>
          )}
        </div>
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
                className="p-4 hover:bg-muted/50 cursor-pointer transition-colors relative"
                onClick={() => setSelectedEntry(entry)}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent opening the detail dialog
                    handleDeleteClick(entry);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-lg text-atm-muted hover:text-destructive hover:bg-atm-secondary transition-colors z-10"
                  aria-label="Delete entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                <div className="flex items-start gap-3">
                  <div
                    className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
                    style={{ backgroundColor: entry.emotionColor }}
                  />
                  <div className="flex-1 min-w-0 pr-6"> {/* Add right padding to account for delete button */}
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
        <ReflectionDetailDialog
          entry={selectedEntry}
          onClose={handleCloseDialog}
          onDelete={handleDeleteEntry}
          entries={entries}
        />
      )}

      {/* Confirmation Dialog for list view deletion */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Entry"
        description={
          <div>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
              <span>Are you sure you want to delete this entry?</span>
            </div>
            {entryToDelete && entries.filter(e => e.date === entryToDelete.date).length === 1 && (
              <span className="text-sm text-yellow-600">This is the only entry for this day — deleting it will reset your streak.</span>
            )}
          </div>
        }
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}