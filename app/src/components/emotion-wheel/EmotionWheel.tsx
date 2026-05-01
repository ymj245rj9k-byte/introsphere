import { useState } from 'react';
import { Emotion } from '@/types/emotion';
import { level3Emotions } from '@/data/emotions';
import { EmotionDetails } from './EmotionDetails';

interface EmotionWheelProps {
  onSelect?: (emotion: Emotion) => void;
  selectedId?: string;
  size?: number;
}

export function EmotionWheel({ onSelect, selectedId, size = 600 }: EmotionWheelProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const emotions = level3Emotions.filter(e => e.isActive);

  const center = size / 2;
  const radius = size / 2 - 40;
  const innerRadius = radius * 0.35;

  const handleEmotionClick = (emotion: Emotion) => {
    setSelectedEmotion(emotion);
    setShowDetails(true);
  };

  const getSectorPath = (
    cx: number,
    cy: number,
    innerR: number,
    outerR: number,
    startAngle: number,
    endAngle: number
  ): string => {
    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;

    const x1 = cx + innerR * Math.cos(startRad);
    const y1 = cy + innerR * Math.sin(startRad);
    const x2 = cx + outerR * Math.cos(startRad);
    const y2 = cy + outerR * Math.sin(startRad);
    const x3 = cx + outerR * Math.cos(endRad);
    const y3 = cy + outerR * Math.sin(endRad);
    const x4 = cx + innerR * Math.cos(endRad);
    const y4 = cy + innerR * Math.sin(endRad);

    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    return `
      M ${x1} ${y1}
      L ${x2} ${y2}
      A ${outerR} ${outerR} 0 ${largeArc} 1 ${x3} ${y3}
      L ${x4} ${y4}
      A ${innerR} ${innerR} 0 ${largeArc} 0 ${x1} ${y1}
      Z
    `.trim();
  };

  return (
    <>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="drop-shadow-xl"
      >
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
          </filter>
          <filter id="shadow-hover" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.25" />
          </filter>
          <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--atmosphere-accent)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--atmosphere-accent)" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="var(--surface)"
          stroke="var(--border)"
          strokeWidth="2"
        />

        {/* Emotion sectors */}
        {emotions.map((emotion) => {
          const angle = emotion.wheelPos;
          const sectorAngle = 360 / emotions.length;
          const startAngle = angle - sectorAngle / 2;
          const endAngle = angle + sectorAngle / 2;
          const path = getSectorPath(
            center,
            center,
            innerRadius,
            radius,
            startAngle,
            endAngle
          );

          return (
            <g 
              key={emotion.id}
              className="emotion-sector"
            >
              <path
                d={path}
                fill={emotion.color}
                stroke="var(--background)"
                strokeWidth="2"
                filter="url(#shadow)"
                className="cursor-pointer transition-all duration-200 ease-out hover:opacity-90 hover:scale-[1.015] hover:filter-[url(#shadow-hover)] focus:outline-none focus:ring-2 focus:ring-atm-accent focus:ring-offset-2 focus:ring-offset-transparent"
                onClick={() => handleEmotionClick(emotion)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleEmotionClick(emotion);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Select ${emotion.name} emotion`}
                style={{
                  transformOrigin: `${center}px ${center}px`,
                }}
              />
              {/* Emotion label */}
              <text
                x={center + (radius * 0.78) * Math.cos(((angle - 90) * Math.PI) / 180)}
                y={center + (radius * 0.78) * Math.sin(((angle - 90) * Math.PI) / 180)}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-foreground text-xs font-medium pointer-events-none select-none"
                style={{ 
                  fontSize: size < 250 ? '8px' : size < 500 ? '10px' : '14px',
                  fontFamily: 'var(--atmosphere-font-body, sans-serif)'
                }}
              >
                {emotion.nameEn}
              </text>
            </g>
          );
        })}

         {/* Center circle - black, no text */}
         <circle
           cx={center}
           cy={center}
           r={innerRadius}
           fill="var(--surface)"
           stroke="var(--border)"
           strokeWidth="2"
           className="transition-all duration-300"
         />
         <text
           x={center}
           y={center - 8}
           textAnchor="middle"
           className="text-atm text-xs font-medium"
           style={{ fontFamily: 'var(--atmosphere-font, sans-serif)' }}
         >
           How are
         </text>
         <text
           x={center}
           y={center + 10}
           textAnchor="middle"
           className="text-atm-heading text-sm font-semibold"
           style={{ fontFamily: 'var(--atmosphere-font, sans-serif)' }}
         >
           you?
         </text>

        {/* Selected indicator - breathing animation */}
        {selectedId && (
          <circle
            cx={center}
            cy={center}
            r={innerRadius * 0.5}
            fill="var(--atmosphere-accent)"
            fillOpacity="0.15"
            className="animate-pulse"
            style={{
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
        )}

        {/* Display selected emotion description */}
        {selectedEmotion && (
          <foreignObject
            x={center - 100}
            y={center + 15}
            width="200"
            height="50"
            className="text-center"
          >
            <div className="text-xs text-center text-gray-600 break-words px-2">
              {selectedEmotion.description}
            </div>
          </foreignObject>
        )}
      </svg>

      {/* Emotion Details Dialog */}
      {selectedEmotion && showDetails && (
        <EmotionDetails
          emotion={selectedEmotion}
          open={showDetails}
          onClose={() => {
            setShowDetails(false);
            // Clear the selected emotion to hide the description in the center
            setSelectedEmotion(null);
          }}
          onConfirm={(emotion) => {
            onSelect?.(emotion);
            setShowDetails(false);
            // Clear the selected emotion after confirmation
            setSelectedEmotion(null);
          }}
        />
      )}
    </>
  );
}