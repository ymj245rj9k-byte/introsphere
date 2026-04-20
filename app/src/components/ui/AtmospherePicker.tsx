import { useState, useRef, useEffect } from 'react';
import { Palette } from 'lucide-react';
import { atmospheres } from '@/data/themes';
import { useThemeStore } from '@/stores/themeStore';
import { AtmosphereType } from '@/types/emotion';

const atmosphereList = Object.values(atmospheres);

export function AtmospherePicker() {
  const [open, setOpen] = useState(false);
  const { atmosphere, setAtmosphere } = useThemeStore();
  const ref = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  const current = atmospheres[atmosphere];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
aria-label="Choose atmosphere"
        aria-expanded={open}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg border border-transparent hover:border-atm transition-colors text-atm-muted hover:text-atm"
        title="Atmosfera"
      >
        <span
          className="w-3.5 h-3.5 rounded-full inline-block border border-white/20"
          style={{ backgroundColor: current?.colors.accent ?? '#999' }}
        />
        <Palette className="w-4 h-4" />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-52 rounded-xl shadow-lg z-50 overflow-hidden border"
          style={{
            backgroundColor: 'var(--atmosphere-bg, #fff)',
            borderColor: 'var(--atmosphere-border, #e5e7eb)',
          }}
        >
          <div
            className="px-3 py-2 text-xs font-semibold tracking-widest uppercase"
            style={{ color: 'var(--atmosphere-text-muted, #9ca3af)' }}
          >
            Atmosfera
          </div>

          <ul role="listbox" aria-label="Choose atmosphere" className="py-1">
            {atmosphereList.map((atm) => {
              const isSelected = atm.id === atmosphere;
              return (
                <li key={atm.id} role="option" aria-selected={isSelected}>
                  <button
                    onClick={() => {
                      setAtmosphere(atm.id as AtmosphereType);
                      setOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors text-left"
                    style={{
                      color: isSelected
                        ? 'var(--atmosphere-text-accent, #374151)'
                        : 'var(--atmosphere-text, #374151)',
                      backgroundColor: isSelected
                        ? 'var(--atmosphere-bg-secondary, #f3f4f6)'
                        : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                          'var(--atmosphere-bg-secondary, #f3f4f6)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                          'transparent';
                      }
                    }}
                  >
                    {/* Color swatch */}
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full border border-white/30"
                      style={{ backgroundColor: atm.colors.accent }}
                    />
                    <span className="flex-1 truncate">{atm.name}</span>
                    {isSelected && (
                      <span
                        className="flex-shrink-0 w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: 'var(--atmosphere-accent, #374151)' }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
