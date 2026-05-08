import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as React from 'react';

export function QuickEntry() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [content, setContent] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSave = async () => {
    if (!content.trim()) {
      setError('Entry cannot be empty');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: dbError } = await supabase
        .from('calendar_entries')
        .insert({
          user_id: user?.id,
          content: content.trim(),
          emotion_id: null,
          emotion_name: null,
          color: null,
          calendar_id: null,
          journey_id: null,
          journey_day: null,
          source_type: 'quick_entry',
        });

      if (dbError) throw dbError;

      // Clear the form and redirect to home
      setContent('');
      navigate('/home');
    } catch (err) {
      console.error('Error saving quick entry:', err);
      setError('Failed to save entry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Link to="/home">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold text-foreground">Quick Entry</h1>
      </div>

      {error && (
        <div className="p-4 mb-4 rounded-lg border bg-red-50 text-red-500">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <label className="block text-sm font-medium text-foreground">
          What's on your mind?
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your thoughts here..."
          className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:focus-visible:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          rows={4}
          disabled={loading}
        ></textarea>
      </div>

       <Button
         onClick={handleSave}
         className="w-full"
         disabled={loading}
       >
         {loading ? 'Saving...' : 'Save Entry'}
       </Button>
    </div>
  );
}