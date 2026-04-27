import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { Flame, BookOpen, CalendarDays, Sparkles, TrendingUp } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useHomeStats } from '@/hooks/useHomeStats';

const DAYS_SHORT = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function Home() {
  const { user } = useAuth();
  const { streakDays, totalSessions, topEmotion, weekActivity, loading } = useHomeStats(user);
  return (
    <div className="min-h-screen bg-atm">
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">

        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-semibold text-atm-heading">Hey 👋</h1>
          <p className="text-atm-muted mt-1 text-sm">How are you feeling today?</p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            to={ROUTES.SESSION}
            className="group flex flex-col gap-2 p-4 rounded-xl border transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: 'var(--atmosphere-bg-secondary)',
              borderColor: 'var(--atmosphere-border)',
            }}
          >
            <Sparkles className="w-5 h-5 text-atm-accent" />
            <span className="font-medium text-atm text-sm leading-snug">New session</span>
            <span className="text-xs text-atm-muted">Emotion wheel</span>
          </Link>

          <Link
            to="/journey/samopoznanie"
            className="group flex flex-col gap-2 p-4 rounded-xl border transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: 'var(--atmosphere-bg-secondary)',
              borderColor: 'var(--atmosphere-border)',
            }}
          >
            <BookOpen className="w-5 h-5 text-atm-accent" />
            <span className="font-medium text-atm text-sm leading-snug">Self Discovery</span>
            <span className="text-xs text-atm-muted">Start first journey</span>
          </Link>

          <Link
            to={ROUTES.CALENDAR}
            className="group flex flex-col gap-2 p-4 rounded-xl border transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: 'var(--atmosphere-bg-secondary)',
              borderColor: 'var(--atmosphere-border)',
            }}
          >
            <CalendarDays className="w-5 h-5 text-atm-accent" />
            <span className="font-medium text-atm text-sm leading-snug">Calendar</span>
            <span className="text-xs text-atm-muted">Mood calendar</span>
          </Link>

          <Link
            to={ROUTES.HISTORY}
            className="group flex flex-col gap-2 p-4 rounded-xl border transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: 'var(--atmosphere-bg-secondary)',
              borderColor: 'var(--atmosphere-border)',
            }}
          >
            <TrendingUp className="w-5 h-5 text-atm-accent" />
            <span className="font-medium text-atm text-sm leading-snug">Reflections</span>
            <span className="text-xs text-atm-muted">My entries</span>
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          {/* Streak */}
          <div
            className="flex flex-col items-center gap-1 p-4 rounded-xl border text-center"
            style={{
              backgroundColor: 'var(--atmosphere-bg-secondary)',
              borderColor: 'var(--atmosphere-border)',
            }}
          >
            <Flame className="w-5 h-5" style={{ color: '#f97316' }} />
            <span className="text-2xl font-bold text-atm-heading">
              {loading ? '—' : streakDays}
            </span>
            <span className="text-xs text-atm-muted">day streak</span>
          </div>

          {/* Total sessions */}
          <div
            className="flex flex-col items-center gap-1 p-4 rounded-xl border text-center"
            style={{
              backgroundColor: 'var(--atmosphere-bg-secondary)',
              borderColor: 'var(--atmosphere-border)',
            }}
          >
            <BookOpen className="w-5 h-5 text-atm-accent" />
            <span className="text-2xl font-bold text-atm-heading">
              {loading ? '—' : totalSessions}
            </span>
            <span className="text-xs text-atm-muted">sessions total</span>
          </div>

          {/* Top emotion */}
          <div
            className="flex flex-col items-center gap-1 p-4 rounded-xl border text-center"
            style={{
              backgroundColor: 'var(--atmosphere-bg-secondary)',
              borderColor: 'var(--atmosphere-border)',
            }}
          >
            {topEmotion ? (
              <>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: topEmotion.color }}
                >
                  {topEmotion.name[0]}
                </div>
                <span className="text-sm font-semibold text-atm-heading truncate max-w-full">
                  {topEmotion.name}
                </span>
              </>
            ) : (
              <>
                <span className="text-xl">—</span>
                <span className="text-sm font-semibold text-atm-muted">
                  No data yet
                </span>
              </>
            )}
            <span className="text-xs text-atm-muted">top emotion</span>
          </div>
        </div>

        {/* Week activity strip */}
        <div
          className="p-4 rounded-xl border"
          style={{
            backgroundColor: 'var(--atmosphere-bg-secondary)',
            borderColor: 'var(--atmosphere-border)',
          }}
        >
          <p className="text-xs font-medium text-atm-muted mb-3 uppercase tracking-widest">This week</p>
          <div className="flex items-end gap-2">
            {DAYS_SHORT.map((day, i) => {
              // weekActivity: [6 days ago, 5, 4, 3, 2, 1, today]
              const count = weekActivity[i] || 0;
              // Scale: max height at 3 entries
              const heightPercent = Math.min((count / 3) * 100, 100);
              const hasActivity = count > 0;
              
              return (
                <div key={i} className="flex flex-col items-center gap-1 flex-1">
                  <div
                    className="w-full rounded-md transition-all"
                    style={{
                      height: `${Math.max(10, heightPercent)}%`,
                      minHeight: '4px',
                      backgroundColor: hasActivity 
                        ? 'var(--atmosphere-accent, #8B5CF6)' 
                        : 'var(--atmosphere-border)',
                      opacity: hasActivity ? 0.8 : 1,
                    }}
                  />
                  <span className="text-xs text-atm-muted">{day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quote of the day */}
        <div
          className="p-6 rounded-xl border"
          style={{
            backgroundColor: 'var(--atmosphere-bg-secondary)',
            borderColor: 'var(--atmosphere-border)',
          }}
        >
          <blockquote className="text-base italic text-atm leading-relaxed">
            "In the depth of winter, I finally learned that within me there lay an 
            <span className="text-atm-accent font-semibold"> invincible summer</span>."
          </blockquote>
          <cite className="block text-right text-sm text-atm-muted mt-3">
            — Albert Camus
          </cite>
        </div>

      </div>
    </div>
  );
}
