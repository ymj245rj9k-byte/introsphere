import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { Flame, BookOpen, CalendarDays, Sparkles, TrendingUp } from 'lucide-react';

// --- Mock stats (MVP placeholder until Supabase is wired up) ---
const mockStats = {
  streak: 4,
  totalSessions: 17,
  topEmotion: { name: 'Joy', nameEn: 'Joy', color: '#f5e660', emoji: '✨' },
  secondEmotion: { name: 'Sadness', nameEn: 'Sadness', color: '#2377cb', emoji: '🌧' },
  weekActivity: [true, true, false, true, true, false, false], // Mon–Sun
  activeJourneyName: 'Inner Child',
  activeJourneyDay: 3,
  activeJourneyTotal: 7,
  activeJourneyId: 'wewnetrzne-dziecko',
};

const DAYS_SHORT = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function Home() {
  const s = mockStats;
  const todayIndex = (new Date().getDay() + 6) % 7; // 0=Mon

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
            to={`/journey/${s.activeJourneyId}`}
            className="group flex flex-col gap-2 p-4 rounded-xl border transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: 'var(--atmosphere-bg-secondary)',
              borderColor: 'var(--atmosphere-border)',
            }}
          >
            <BookOpen className="w-5 h-5 text-atm-accent" />
            <span className="font-medium text-atm text-sm leading-snug">{s.activeJourneyName}</span>
            <span className="text-xs text-atm-muted">Day {s.activeJourneyDay} of {s.activeJourneyTotal}</span>
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
            <span className="font-medium text-atm text-sm leading-snug">Kalendarz</span>
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
            <span className="text-xs text-atm-muted">Moje wpisy</span>
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
            <span className="text-2xl font-bold text-atm-heading">{s.streak}</span>
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
            <span className="text-2xl font-bold text-atm-heading">{s.totalSessions}</span>
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
            <span className="text-xl">{s.topEmotion.emoji}</span>
            <span
              className="text-sm font-semibold"
              style={{ color: s.topEmotion.color }}
            >
              {s.topEmotion.nameEn}
            </span>
            <span className="text-xs text-atm-muted">top emocja</span>
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
            {s.weekActivity.map((active, i) => (
              <div key={i} className="flex flex-col items-center gap-1 flex-1">
                <div
                  className="w-full rounded-md transition-all"
                  style={{
                    height: active ? '28px' : '10px',
                    backgroundColor: active
                      ? 'var(--atmosphere-accent)'
                      : 'var(--atmosphere-border)',
                    opacity: i === todayIndex ? 1 : active ? 0.7 : 0.4,
                    outline: i === todayIndex ? '2px solid var(--atmosphere-accent)' : 'none',
                    outlineOffset: '2px',
                  }}
                />
                <span
                  className="text-xs"
                  style={{
                    color: i === todayIndex
                      ? 'var(--atmosphere-accent)'
                      : 'var(--atmosphere-text-muted)',
                    fontWeight: i === todayIndex ? 600 : 400,
                  }}
                >
                  {DAYS_SHORT[i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Emotion breakdown */}
        <div
          className="p-4 rounded-xl border"
          style={{
            backgroundColor: 'var(--atmosphere-bg-secondary)',
            borderColor: 'var(--atmosphere-border)',
          }}
        >
          <p className="text-xs font-medium text-atm-muted mb-3 uppercase tracking-widest">Top emotions</p>
          <div className="space-y-2">
            {[
              { ...s.topEmotion, pct: 42 },
              { ...s.secondEmotion, pct: 28 },
            ].map((e) => (
              <div key={e.nameEn} className="flex items-center gap-3">
                <span className="text-base w-5 text-center">{e.emoji}</span>
                <span className="text-sm text-atm w-16 shrink-0">{e.nameEn}</span>
                <div className="flex-1 rounded-full overflow-hidden" style={{ height: '6px', backgroundColor: 'var(--atmosphere-border)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${e.pct}%`, backgroundColor: e.color }}
                  />
                </div>
                <span className="text-xs text-atm-muted w-8 text-right">{e.pct}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
