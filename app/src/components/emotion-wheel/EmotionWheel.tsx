import { useState } from 'react'
import { Emotion } from '../../types/emotion'
import { primaryEmotions, getSubEmotions } from '../../data/emotions'
import { EmotionNode } from './EmotionNode'
import { EmotionDetails } from './EmotionDetails'

interface EmotionWheelProps {
  onSelect: (emotion: Emotion) => void
}

export function EmotionWheel({ onSelect }: EmotionWheelProps) {
  const [selectedPrimary, setSelectedPrimary] = useState<Emotion | null>(null)
  const [hoveredEmotion, setHoveredEmotion] = useState<Emotion | null>(null)

  const handlePrimaryClick = (emotion: Emotion) => {
    setSelectedPrimary(emotion)
  }

  const handleSubEmotionSelect = (emotion: Emotion) => {
    onSelect(emotion)
    setSelectedPrimary(null)
  }

  const handleStayAtLevel = () => {
    if (selectedPrimary) {
      onSelect(selectedPrimary)
      setSelectedPrimary(null)
    }
  }

  const handleBack = () => {
    setSelectedPrimary(null)
  }

  // SVG wheel parameters - ZGODNE z emotions-wheel.html
  const size = 400
  const center = size / 2
  const outerRadius = 180
  const innerRadius = 50
  const segmentAngle = 45 // 360 / 8 segments

  return (
    <div className="flex flex-col items-center gap-6">
      {/* SVG Wheel */}
      <div className="relative">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-[22.5deg]"
        >
          {/* Emotion segments */}
          {primaryEmotions.map((emotion, index) => {
            const startAngle = index * segmentAngle
            const endAngle = (index + 1) * segmentAngle
            const isHovered = hoveredEmotion?.id === emotion.id
            const isSelected = selectedPrimary?.id === emotion.id

            return (
              <EmotionNode
                key={emotion.id}
                emotion={emotion}
                center={center}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                isHovered={isHovered}
                isSelected={isSelected}
                onHover={() => setHoveredEmotion(emotion)}
                onLeave={() => setHoveredEmotion(null)}
                onClick={() => handlePrimaryClick(emotion)}
              />
            )
          })}

          {/* Center circle with gradient - ZGODNE z emotions-wheel.html */}
          <defs>
            <radialGradient id="centerGradient" cx="30%" cy="30%">
              <stop offset="0%" stopColor="var(--atmosphere-accent)" />
              <stop offset="30%" stopColor="var(--atmosphere-text-muted)" />
              <stop offset="100%" stopColor="var(--atmosphere-bg)" />
            </radialGradient>
          </defs>
          <circle
            cx={center}
            cy={center}
            r={innerRadius}
            fill="url(#centerGradient)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
            onClick={handleBack}
            className="cursor-pointer"
          />
          <text
            x={center}
            y={center}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="currentColor"
            fontSize="11"
            fontWeight="600"
            className="rotate-[22.5deg] text-muted-foreground"
            style={{ transformOrigin: 'center' }}
          >
            Click\nemotion
          </text>
        </svg>

        {/* Tooltip - ZGODNE z emotions-wheel.html */}
        {hoveredEmotion && !selectedPrimary && hoveredEmotion.description && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-20 pointer-events-none">
            <div className="bg-popover/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg max-w-xs">
              <p className="text-sm text-popover-foreground">
                {hoveredEmotion.description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Emotion details dropdown */}
      {selectedPrimary && (
        <EmotionDetails
          primaryEmotion={selectedPrimary}
          subEmotions={getSubEmotions(selectedPrimary.id)}
          onSelect={handleSubEmotionSelect}
          onStayAtLevel={handleStayAtLevel}
          onBack={handleBack}
        />
      )}

      {/* Instructions - ZGODNE z emotions-wheel.html */}
      {!selectedPrimary && (
        <div className="flex gap-8 mt-2">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-base">
              👆
            </div>
            <span>Hover to see emotion description</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-base">
              🖱️
            </div>
            <span>Click to see subspectra</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-base">
              🎯
            </div>
            <span>Click center to close</span>
          </div>
        </div>
      )}
    </div>
  )
}
