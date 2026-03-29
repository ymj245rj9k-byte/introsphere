import { Emotion } from '../../types/emotion'

interface EmotionDetailsProps {
  primaryEmotion: Emotion
  subEmotions: Emotion[]
  onSelect: (emotion: Emotion) => void
  onStayAtLevel: () => void
  onBack: () => void
}

// Emotion-specific background tints - using CSS variables for atmosphere compatibility
const emotionBackgroundTints: Record<string, string> = {
  joy: 'var(--emotion-joy-bg, #fef9e7)', // light yellow
  trust: 'var(--emotion-trust-bg, #e8f8f0)', // light mint green
  fear: 'var(--emotion-fear-bg, #e1f7ea)', // light gray-blue
  surprise: 'var(--emotion-surprise-bg, #e9fdfa)', 
  sadness: 'var(--emotion-sadness-bg, #ebf5fb)', // light blue
  disgust: 'var(--emotion-disgust-bg, #f5eef8)', // light purple
  anger: 'var(--emotion-anger-bg, #fdedec)', // light red/pink
  anticipation: 'var(--emotion-anticipation-bg, #fef5e7)', // light orange
}

// Helper function to get background tint for an emotion
function getEmotionBackground(emotionId: string): string {
  return emotionBackgroundTints[emotionId] || 'var(--atmosphere-bg-secondary)'
}

// Helper function to darken a hex color slightly
function darkenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) - amt
  const G = ((num >> 8) & 0x00ff) - amt
  const B = (num & 0x0000ff) - amt
  return (
    '#' +
    (
      0x1000000 +
      (R < 0 ? 0 : R) * 0x10000 +
      (G < 0 ? 0 : G) * 0x100 +
      (B < 0 ? 0 : B)
    )
      .toString(16)
      .slice(1)
  )
}

export function EmotionDetails({
  primaryEmotion,
  subEmotions,
  onSelect,
  onStayAtLevel,
  onBack,
}: EmotionDetailsProps) {
  return (
    <div
      className="w-[340px] backdrop-blur-xl rounded-3xl p-7 shadow-[0_15px_50px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/10 max-h-[600px] overflow-y-auto fade-in"
      style={{
        backgroundColor: getEmotionBackground(primaryEmotion.id),
      }}
    >
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-2xl font-bold text-gray-900 mb-1">
          {primaryEmotion.name_en}
        </h3>
      </div>

      {/* Stay on level option */}
      <button
        onClick={onStayAtLevel}
        className="w-full text-left p-4 rounded-xl mb-5 cursor-pointer transition-all duration-300 border border-white/10 hover:-translate-x-1 hover:border-white/20"
        style={{
          backgroundColor: darkenColor(getEmotionBackground(primaryEmotion.id), 8),
        }}
      >
        <div className="text-xs uppercase tracking-widest text-gray-600 mb-1.5">
          Option
        </div>
        <div className="font-semibold text-base text-gray-900">
          Stay on level {primaryEmotion.name_en}
        </div>
      </button>

      {/* Sub-emotions list */}
      <div className="flex flex-col gap-3">
        {subEmotions.map((emotion) => (
          <button
            key={emotion.id}
            onClick={() => onSelect(emotion)}
            className="w-full text-left p-4 rounded-xl cursor-pointer transition-all duration-300 border-l-4 hover:translate-x-2"
            style={{
              borderLeftColor: emotion.color || 'var(--atmosphere-text-muted)',
              backgroundColor: darkenColor(getEmotionBackground(primaryEmotion.id), 8),
            }}
          >
            <div className="font-semibold text-base text-gray-900">
              {emotion.name_en}
            </div>
          </button>
        ))}
      </div>

      {/* Back button */}
      <button
        onClick={onBack}
        className="mt-5 w-full text-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
        ← Back to wheel
      </button>
    </div>
  )
}
