import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { journeys } from '@/data/journeys';
import { Emotion } from '@/types/emotion';
import { getLevel3Emotions } from '@/data/emotions';

export function Landing() {
  return (
    <div className="min-h-screen bg-atm overflow-x-hidden">

      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b border-border backdrop-blur-md" style={{ backgroundColor: 'color-mix(in srgb, var(--atmosphere-bg) 85%, transparent)', borderColor: 'var(--atmosphere-border)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight text-foreground">Introsphere</span>
          <div className="flex items-center gap-4">
            <Link
              to={ROUTES.AUTH}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
            <Link
              to={ROUTES.AUTH}
              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO - Cormorant Garamond typography */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-12 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
          <h1 className="font-landing-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.2]">
            <span className="block">Stop staring at</span>
            <span className="block text-primary mt-2">a blank page.</span>
          </h1>
          <p className="font-landing-body text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Pick your mood. Get a question. Write for 2 minutes.<br />
            Discover patterns in your emotions over time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link
              to={ROUTES.AUTH}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all hover:scale-[1.03] shadow-lg shadow-primary/20"
            >
              Start journaling free
            </Link>
          </div>
          <p className="text-sm text-muted-foreground pt-2">
            No credit card. No commitments. Takes 30 seconds to start.
          </p>
        </div>
      </section>

      {/* EMOTION WHEEL - skrocony opis */}
      <section className="py-16 md:py-24 bg-surface/40">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <h2 className="font-landing-heading text-3xl md:text-4xl text-foreground leading-[1.3]">
                Name what you feel
              </h2>
              <p className="font-landing-body text-base text-muted-foreground leading-relaxed">
                Based on Plutchik's Wheel of Emotions. 8 primary emotions, 
                each with 3 levels of intensity.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {getLevel3Emotions().map((emotion: Emotion) => (
                  <div key={emotion.id} className="flex items-center gap-3 p-3 rounded-lg bg-surface border border-border">
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: emotion.colorHex }}
                    />
                    <span className="text-sm text-foreground font-medium">{emotion.nameEn}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <EmotionWheelVisual />
            </div>
          </div>
        </div>
      </section>

      {/* JOURNEYS - skrocony */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-4 mb-10">
            <h2 className="font-landing-heading text-3xl md:text-4xl text-foreground leading-[1.3]">
              7-Day Guided Journeys
            </h2>
            <p className="text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Week-long programs that build self-awareness one day at a time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {journeys.filter(j => j.isActive).slice(0, 3).map(journey => (
              <div
                key={journey.id}
                className="p-5 rounded-2xl bg-background border border-border hover:border-primary/40 transition-all hover:shadow-md"
              >
                <h3 className="text-base font-semibold text-foreground mb-1">
                  {journey.titleEn}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{journey.subtitleEn}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2 py-0.5 rounded bg-surface border border-border">7 days</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-primary/5">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="font-landing-heading text-3xl md:text-4xl text-foreground leading-[1.3]">
            Ready to understand yourself better?
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Free forever for the basics. No credit card required.
          </p>
          <Link
            to={ROUTES.AUTH}
            className="inline-flex items-center justify-center gap-2 px-10 py-4 text-lg font-medium bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all hover:scale-[1.03] shadow-lg shadow-primary/20"
          >
            Start your first session
          </Link>
          <p className="text-sm text-muted-foreground">
            Introsphere is not a substitute for therapy.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-border">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-bold text-foreground">Introsphere</span>
          <p className="text-sm text-muted-foreground">
            2026 Introsphere. Your space for reflection.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* Sub-components */

function EmotionWheelVisual() {
  const emotions = getLevel3Emotions();
  const size = 240;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 8;
  const innerR = 42;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="drop-shadow-2xl select-none"
      aria-label="Emotion wheel preview"
      role="img"
    >
      {emotions.map((emotion: Emotion) => {
        const segAngle = 360 / emotions.length;
        const startDeg = emotion.wheelPos - segAngle / 2 - 90;
        const endDeg = emotion.wheelPos + segAngle / 2 - 90;
        const startRad = (startDeg * Math.PI) / 180;
        const endRad = (endDeg * Math.PI) / 180;

        const x1 = cx + outerR * Math.cos(startRad);
        const y1 = cy + outerR * Math.sin(startRad);
        const x2 = cx + outerR * Math.cos(endRad);
        const y2 = cy + outerR * Math.sin(endRad);
        const ix1 = cx + innerR * Math.cos(startRad);
        const iy1 = cy + innerR * Math.sin(startRad);
        const ix2 = cx + innerR * Math.cos(endRad);
        const iy2 = cy + innerR * Math.sin(endRad);

        const d = [
          `M ${ix1} ${iy1}`,
          `L ${x1} ${y1}`,
          `A ${outerR} ${outerR} 0 0 1 ${x2} ${y2}`,
          `L ${ix2} ${iy2}`,
          `A ${innerR} ${innerR} 0 0 0 ${ix1} ${iy1}`,
          'Z',
        ].join(' ');

        const midDeg = emotion.wheelPos - 90;
        const midRad = (midDeg * Math.PI) / 180;
        const labelR = (outerR + innerR) / 2;
        const lx = cx + labelR * Math.cos(midRad);
        const ly = cy + labelR * Math.sin(midRad);

        return (
          <g key={emotion.id}>
            <path
              key={emotion.id}
              d={d}
              fill={emotion.colorHex}
              stroke="white"
              strokeWidth="2"
              className="transition-opacity hover:opacity-80"
              aria-label={emotion.nameEn}
            />
            <text
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="7"
              fontWeight="600"
              fill="rgba(0,0,0,0.55)"
              style={{ pointerEvents: 'none' }}
            >
              {emotion.nameEn}
            </text>
          </g>
        );
      })}

      <circle cx={cx} cy={cy} r={innerR - 2} fill="white" />
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize="8" fontWeight="700" fill="#555">
        Choose an emotion
      </text>
    </svg>
  );
}