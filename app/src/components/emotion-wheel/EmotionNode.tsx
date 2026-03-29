import { Emotion } from '../../types/emotion'

interface EmotionNodeProps {
  emotion: Emotion
  center: number
  innerRadius: number
  outerRadius: number
  startAngle: number
  endAngle: number
  isHovered: boolean
  isSelected: boolean
  onHover: () => void
  onLeave: () => void
  onClick: () => void
}

export function EmotionNode({
  emotion,
  center,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  isHovered,
  isSelected,
  onHover,
  onLeave,
  onClick,
}: EmotionNodeProps) {
  // Convert angles to radians
  const startRad = (startAngle * Math.PI) / 180
  const endRad = (endAngle * Math.PI) / 180

  // Calculate arc points
  const x1 = center + innerRadius * Math.cos(startRad)
  const y1 = center + innerRadius * Math.sin(startRad)
  const x2 = center + outerRadius * Math.cos(startRad)
  const y2 = center + outerRadius * Math.sin(startRad)
  const x3 = center + outerRadius * Math.cos(endRad)
  const y3 = center + outerRadius * Math.sin(endRad)
  const x4 = center + innerRadius * Math.cos(endRad)
  const y4 = center + innerRadius * Math.sin(endRad)

  // Create arc path
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0
  const path = `
    M ${x1} ${y1}
    L ${x2} ${y2}
    A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x3} ${y3}
    L ${x4} ${y4}
    A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1} ${y1}
    Z
  `

  // Calculate label position - ZGODNE z emotions-wheel.html (78% of radius)
  const midAngle = (startAngle + endAngle) / 2
  const midRad = (midAngle * Math.PI) / 180
  const labelRadius = outerRadius * 0.78
  const labelX = center + labelRadius * Math.cos(midRad)
  const labelY = center + labelRadius * Math.sin(midRad)

  // Scale effect on hover - ZGODNE z emotions-wheel.html
  const scale = isHovered ? 1.05 : 1
  const brightness = isSelected ? 1.3 : isHovered ? 1.2 : 1

  return (
    <g
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <defs>
        <filter id={`shadow-${emotion.id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.4" />
        </filter>
      </defs>
      <path
        d={path}
        fill={emotion.color || '#888888'}
        stroke="none"
        strokeWidth={0}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: `${center}px ${center}px`,
          transition: 'all 0.3s ease',
          filter: `brightness(${brightness}) drop-shadow(2px 2px 3px rgba(0,0,0,0.4))`,
        }}
      />
      {/* Label - ZGODNE z emotions-wheel.html */}
      <text
        x={labelX}
        y={labelY}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#fff"
        fontSize={isHovered ? '17' : '15'}
        fontWeight="700"
        style={{
          pointerEvents: 'none',
          textShadow: '2px 2px 4px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.5)',
          transition: 'all 0.3s ease',
        }}
      >
        {emotion.name_en}
      </text>
    </g>
  )
}
