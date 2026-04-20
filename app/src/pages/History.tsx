import { useState } from 'react';
import { Calendar, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface HistoryEntry {
  id: string;
  date: string;
  time: string;
  emotion: string;
  emotionColor: string;
  preview: string;
}

const mockEntries: HistoryEntry[] = [
  {
    id: '1',
    date: '2026-04-20',
    time: '21:30',
    emotion: 'Joy',
    emotionColor: '#F7DC6F',
    preview: 'Really great day at work today...',
  },
  {
    id: '2',
    date: '2026-04-19',
    time: '20:15',
    emotion: 'Calm',
    emotionColor: '#82E0AA',
    preview: 'Evening with a book, tea, silence...',
  },
  {
    id: '3',
    date: '2026-04-18',
    time: '22:00',
    emotion: 'Thoughtful',
    emotionColor: '#7D3C98',
    preview: 'Thinking about what was and what is coming...',
  },
  {
    id: '4',
    date: '2026-04-17',
    time: '19:45',
    emotion: 'Optimism',
    emotionColor: '#82E0AA',
    preview: 'New project looks promising...',
  },
  {
    id: '5',
    date: '2026-04-16',
    time: '21:00',
    emotion: 'Fatigue',
    emotionColor: '#2874A6',
    preview: 'Long day but satisfying...',
  },
];

export function History() {
  const [searchQuery, setSearchQuery] = useState('');
  const entries = mockEntries.filter((entry) =>
    entry.preview.toLowerCase().includes(searchQuery.toLowerCase())
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

      <div className="space-y-3">
        {entries.map((entry) => (
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
                    {entry.date} {entry.time}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {entry.preview}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {entries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No entries to display</p>
        </div>
      )}
    </div>
  );
}