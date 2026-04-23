import { useState } from 'react';
import { Emotion } from '@/types/emotion';
import { Button } from '@/components/ui/button';
import { getSubSpectrumForParent, getEmotion } from '@/data/emotions';

interface EmotionDetailsProps {
  emotion: Emotion;
  open: boolean;
  onClose: () => void;
  onConfirm: (emotion: Emotion) => void;
}



interface SubEmotion {
  id: string;
  name: string;
  nameEn: string;
  intensity: number;
  color: string;
  description?: string;
}

export function EmotionDetails({ emotion, open, onClose, onConfirm }: EmotionDetailsProps) {
  if (!open) return null;

  const [selectedSubEmotion, setSelectedSubEmotion] = useState<Emotion | null>(null);

  const subSpectrum = getSubSpectrumForParent(emotion.parentId ?? '').map(sub => {
    const fullEmotion = sub.id ? getEmotion(sub.id) : undefined;
    return {
      ...sub,
      color: fullEmotion?.color || '#FFFFFF',
      description: fullEmotion?.description || sub.description
    } as SubEmotion;
  });

  const handleConfirm = () => {
    onConfirm(selectedSubEmotion || emotion);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ backgroundColor: 'color-mix(in srgb, var(--atmosphere-bg) 80%, transparent)' }}
        onClick={onClose}
      />

      {/* Sub-spectrum Dialog - shown immediately when emotion is selected */}
      <div className="relative bg-surface rounded-xl border border-border shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: emotion.color }}
          >
            <span className="text-2xl">{emotion.nameEn[0]}</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{emotion.nameEn}</h2>
            {emotion.description && (
              <p className="text-sm text-muted-foreground mt-1">{emotion.description}</p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium text-foreground mb-3">Choose more specifically:</p>
          <div className="grid grid-cols-2 gap-2">
            {subSpectrum.map((sub) => {
              const fullEmotion = getEmotion(sub.id);
              return (
                <button
                  key={sub.id}
                  className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                    selectedSubEmotion?.id === sub.id
                      ? 'border-primary bg-primary/20 ring-2 ring-primary/30 scale-105'
                      : 'border-border hover:border-muted-foreground/30 hover:scale-[1.02]'
                  }`}
                  style={{ 
                    backgroundColor: selectedSubEmotion?.id === sub.id ? `${sub.color}30` : `${sub.color}20`, 
                    borderColor: sub.color 
                  }}
                  onClick={() => sub.id ? setSelectedSubEmotion(getEmotion(sub.id) as Emotion) : undefined}
                >
                  <p className="font-medium text-foreground">{sub.nameEn}</p>
                  {fullEmotion?.description && (
                    <p className="text-xs text-muted-foreground mt-1">{fullEmotion.description}</p>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              setSelectedSubEmotion(emotion);
            }} 
            className="flex-1"
          >
            Stay with {emotion.nameEn}
          </Button>
          <Button 
            onClick={handleConfirm} 
            className="flex-1"
            disabled={!selectedSubEmotion}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}