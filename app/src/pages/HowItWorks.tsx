import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { journeys } from '@/data/journeys';
import { EmotionWheel } from '@/components/emotion-wheel';

export function HowItWorks() {

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: 'var(--atmosphere-bg)' }}>

      {/* HERO */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-12 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'var(--atmosphere-accent)', opacity: 0.1 }} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl" style={{ backgroundColor: 'var(--atmosphere-accent)', opacity: 0.08 }} />
        </div>

        <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.2] font-bold text-atm">
            <span className="block">How does</span>
            <span className="block mt-2">Introsphere work?</span>
          </h1>
          <p className="text-lg md:text-xl max-w-xl mx-auto leading-relaxed text-atm-muted">
            A simple process to build self-awareness, one reflection at a time.
          </p>
        </div>
      </section>

      {/* STEP 1 */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <h2 className="text-3xl md:text-4xl leading-[1.3] font-medium text-atm">
                Pick an emotion
              </h2>
              <p className="text-base leading-relaxed text-atm">
                Start at the Emotion Wheel. 8 primary emotions arranged in a circle, each with 3 intensity levels.
              </p>
            </div>
            <div className="flex justify-center pointer-events-none">
              <EmotionWheel size={320} />
            </div>
          </div>
        </div>
      </section>

      {/* STEP 2 */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 flex justify-center">
               <div
                 className="w-80 h-80 flex items-center justify-center shadow-atm rounded-atm"
                 style={{ backgroundColor: 'var(--atmosphere-bg-secondary)', border: 'var(--atmosphere-border)' }}
               >
                 <div className="text-center space-y-4 p-4 text-atm">
                   <div className="text-5xl">🤔</div>
                   <p className="text-lg font-semibold text-atm">
                     "What made you feel alive recently?"
                   </p>
                   <div className="text-xs space-y-1 text-atm-muted">
                     <p>← Previous</p>
                     <p className="font-medium" style={{ color: 'var(--atmosphere-accent)' }}>1 of 12</p>
                     <p>Next →</p>
                   </div>
                   <div
                     className="h-24 w-full rounded-atm"
                     style={{ backgroundColor: 'var(--atmosphere-bg)', border: 'var(--atmosphere-border)' }}
                   />
                 </div>
               </div>
            </div>
            <div className="order-1 md:order-2 space-y-5">
              <h2 className="text-3xl md:text-4xl leading-[1.3] font-medium text-atm">
                Write 
              </h2>
              <p className="text-base leading-relaxed text-atm">
                You get a question matched to your chosen emotion. Write for 2 minutes. Auto-saved, private, no rules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STEP 3 */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <h2 className="text-3xl md:text-4xl leading-[1.3] font-medium text-atm">
                Go on a journey
              </h2>
              <p className="text-base leading-relaxed text-atm">
                7-day guided programs with daily questions. Each day builds on the previous one, helping you see patterns and go deeper.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 gap-4 w-full max-w-md">
                {journeys.filter(j => j.isActive).slice(0, 3).map(journey => (
                  <div
                    key={journey.id}
                    className="p-5 rounded-atm transition-all shadow-atm"
                    style={{
                      backgroundColor: 'var(--atmosphere-bg-secondary)',
                      border: 'var(--atmosphere-border)',
                    }}
                  >
                    <h3 className="text-base font-semibold text-atm mb-1">
                      {journey.titleEn}
                    </h3>
                    <p className="text-sm text-atm-muted leading-relaxed">{journey.subtitleEn}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-atm-muted">
                      <span
                        className="px-2 py-0.5 rounded-atm"
                        style={{ backgroundColor: 'var(--atmosphere-bg-secondary)', border: 'var(--atmosphere-border)' }}
                      >
                        7 days
                      </span>
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
                    className="w-20 h-20 flex items-center justify-center rounded-atm"
                    style={{ backgroundColor: theme.color, border: 'var(--atmosphere-border)' }}
                    title={theme.name}
                  >
                    <span className="text-[10px] text-black/70 font-medium text-center">{theme.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-5">
              <h2 className="text-3xl md:text-4xl leading-[1.3] font-medium text-atm">
                Choose your atmosphere
              </h2>
              <p className="text-base leading-relaxed text-atm">
                8 visual themes change colors, fonts, and border radius. Pick one that matches your mood.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl leading-[1.3] font-semibold text-atm">
            Ready to understand yourself better?
          </h2>
          <p className="text-base text-atm-muted leading-relaxed">
            Free forever for the basics. No credit card required.
          </p>
          <Link
            to={ROUTES.AUTH}
            className="inline-flex items-center justify-center px-10 py-4 text-lg font-medium rounded-atm transition-all hover:scale-[1.03] shadow-atm"
            style={{
              backgroundColor: 'var(--atmosphere-accent)',
              color: 'var(--atmosphere-bg)',
            }}
          >
            Sign Up
          </Link>
          <p className="text-sm text-atm-muted">
            Introsphere is not a substitute for therapy.
          </p>
        </div>
      </section>
    </div>
  );
}


