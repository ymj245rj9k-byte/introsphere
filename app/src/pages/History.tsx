import { useState } from 'react';
import { Calendar, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useHistory } from '@/hooks/useHistory';

export function History() {
  const [searchQuery, setSearchQuery] = useState('');
  const { entries, loading, error } = useHistory();

  const filteredEntries = entries.filter((entry) =>
    entry.response.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.emotion.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <Card key={entry.id} className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
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
                        {entry.date}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {entry.response}
                    </p>
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
    </div>
  );
}