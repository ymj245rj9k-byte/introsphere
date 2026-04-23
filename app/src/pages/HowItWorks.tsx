import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { journeys } from '@/data/journeys';
import { getLevel3Emotions } from '@/data/emotions';
import { Emotion } from '@/types/emotion';

export function HowItWorks() {
  const emotions = getLevel3Emotions();

  return (
    <div className="min-h-screen bg-atm overflow-x-hidden">

      {/* HERO */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-12 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.2] font-bold">
            <span className="block">How does</span>
            <span className="block text-primary mt-2">Introsphere work?</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
            A simple process to build self-awareness, one reflection at a time.
          </p>
        </div>
      </section>

      {/* STEP 1 */}
      <section className="py-16 md:py-24 bg-surface/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <h2 className="text-3xl md:text-4xl text-foreground leading-[1.3] font-medium">
                Pick an emotion
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Start at the Emotion Wheel. 8 primary emotions arranged in a circle, each with 3 intensity levels.
              </p>
            </div>
            <div className="flex justify-center">
              <EmotionWheelPreview emotions={emotions} />
            </div>
          </div>
        </div>
      </section>

      {/* STEP 2 */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 flex justify-center">
               <div className="w-80 h-80 rounded-2xl bg-atm-dark-ink-blend border border-border flex items-center justify-center shadow-lg">
                 <div className="text-center space-y-4 p-4 text-foreground">
                   <div className="text-5xl">🤔</div>
                   <p className="text-lg font-semibold">
                     "What made you feel alive recently?"
                   </p>
                   <div className="text-xs space-y-1">
                     <p>← Previous</p>
                     <p className="text-primary font-medium">1 of 12</p>
                     <p>Next →</p>
                   </div>
                   <div className="h-24 w-full rounded-lg bg-atm-dark-ink-blend/80 border border-border" />
                 </div>
               </div>
            </div>
            <div className="order-1 md:order-2 space-y-5">
              <h2 className="text-3xl md:text-4xl text-foreground leading-[1.3] font-medium">
                Write a session
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                You get a question matched to your chosen emotion. Write for 2 minutes. Auto-saved, private, no rules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STEP 3 */}
      <section className="py-16 md:py-24 bg-surface/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <h2 className="text-3xl md:text-4xl text-foreground leading-[1.3] font-medium">
                Go on a journey
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                7-day guided programs with daily questions. Each day builds on the previous one, helping you see patterns and go deeper.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 gap-4 w-full max-w-md">
                {journeys.filter(j => j.isActive).slice(0, 3).map(journey => (
                  <div
                    key={journey.id}
                    className="p-5 rounded-2xl bg-background border border-border hover:border-primary/40 transition-all"
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
          </div>
        </div>
      </section>

      {/* STEP 4 */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 flex justify-center">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'Cream Calm', color: '#D4C5B5' },
                  { name: 'Green Forest', color: '#8aab7e' },
                  { name: 'Dark Ink', color: '#c9a063' },
                  { name: 'Soft Pink', color: '#dde8f2' },
                  { name: 'Silver Tech', color: '#00d4aa' },
                  { name: 'Desert Rose', color: '#C9A9A6' },
                  { name: 'Ocean Deep', color: '#0077a8' },
                ].map((theme) => (
                  <div
                    key={theme.name}
                    className="w-20 h-20 rounded-xl border-2 border-border flex items-center justify-center"
                    style={{ backgroundColor: theme.color }}
                    title={theme.name}
                  >
                    <span className="text-[10px] text-black/70 font-medium text-center">{theme.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-5">
              <h2 className="text-3xl md:text-4xl text-foreground leading-[1.3] font-medium">
                Choose your atmosphere
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                8 visual themes change colors, fonts, and border radius. Pick one that matches your mood.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-primary/5">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl text-foreground leading-[1.3] font-semibold">
            Ready to understand yourself better?
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Free forever for the basics. No credit card required.
          </p>
          <Link
            to={ROUTES.AUTH}
            className="inline-flex items-center justify-center px-10 py-4 text-lg font-medium bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all hover:scale-[1.03] shadow-lg shadow-primary/20"
          >
            Sign Up
          </Link>
          <p className="text-sm text-muted-foreground">
            Introsphere is not a substitute for therapy.
          </p>
        </div>
      </section>
    </div>
  );
}

  function EmotionWheelPreview({ emotions }: { emotions: Emotion[] }) {
    const size = 280;
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
    </svg>
  );
}
