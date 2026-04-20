import { Emotion, EmotionSubspectrum } from '@/types/emotion';

// Level 3 (extreme) emotions — displayed as primary on the wheel
// Grid order: Ecstasy, Admiration, Terror, Amazement, Grief, Loathing, Rage, Vigilance
// Wheel positions (updated):
// Ecstasy: 0°, Admiration: 45°, Terror: 90°, Amazement: 135°, Grief: 180°, Loathing: 225°, Rage: 270°, Vigilance: 315°
export const level3Emotions: Emotion[] = [
  {
    id: 'ecstasy',
    name: 'Ekstaza',
    nameEn: 'Ecstasy',
    spectrum: 'positive',
    parentId: 'joy',
    wheelPos: 0,
    color: '#F7DC6F',
    colorHex: '#F7DC6F',
    isActive: true,
  },
  {
    id: 'admiration',
    name: 'Podziw',
    nameEn: 'Admiration',
    spectrum: 'positive',
    parentId: 'trust',
    wheelPos: 45,
    color: '#75ea6f',
    colorHex: '#75ea6f',
    isActive: true,
  },
  {
    id: 'terror',
    name: 'Terror',
    nameEn: 'Terror',
    spectrum: 'negative',
    parentId: 'fear',
    wheelPos: 90,
    color: '#216332',
    colorHex: '#216332',
    isActive: true,
  },
  {
    id: 'amazement',
    name: 'Zadziwienie',
    nameEn: 'Amazement',
    spectrum: 'neutral',
    parentId: 'surprise',
    wheelPos: 135,
    color: '#28B4C8',
    colorHex: '#28B4C8',
    isActive: true,
  },
  {
    id: 'grief',
    name: 'Grief',
    nameEn: 'Grief',
    spectrum: 'negative',
    parentId: 'sadness',
    wheelPos: 180,
    color: '#1A5276',
    colorHex: '#1A5276',
    isActive: true,
  },
  {
    id: 'loathing',
    name: 'Loathing',
    nameEn: 'Loathing',
    spectrum: 'negative',
    parentId: 'disgust',
    wheelPos: 225,
    color: '#7D3C98',
    colorHex: '#7D3C98',
    isActive: true,
  },
  {
    id: 'rage',
    name: 'Rage',
    nameEn: 'Rage',
    spectrum: 'negative',
    parentId: 'anger',
    wheelPos: 270,
    color: '#EC7063',
    colorHex: '#EC7063',
    isActive: true,
  },
  {
    id: 'vigilance',
    name: 'Vigilance',
    nameEn: 'Vigilance',
    spectrum: 'neutral',
    parentId: 'anticipation',
    wheelPos: 315,
    color: '#F5B041',
    colorHex: '#F5B041',
    isActive: true,
  },
];

// Level 2 (moderate/primary) and Level 1 (mild) subspectrum emotions
// These appear when user refines their selection
export const subSpectrumEmotions: EmotionSubspectrum[] = [
  // JOY FAMILY: Joy (L2) + Serenity (L1) + Love (L3*)
  { id: 'serenity', name: 'Serenity', nameEn: 'Serenity', parentId: 'joy', intensity: 1 },
  { id: 'joy', name: 'Joy', nameEn: 'Joy', parentId: 'joy', intensity: 2 },
  { id: 'love', name: 'Love', nameEn: 'Love', parentId: 'joy', intensity: 3 },

  // TRUST FAMILY: Trust (L2) + Acceptance (L1)
  { id: 'acceptance', name: 'Acceptance', nameEn: 'Acceptance', parentId: 'trust', intensity: 1 },
  { id: 'trust', name: 'Trust', nameEn: 'Trust', parentId: 'trust', intensity: 2 },

  // FEAR FAMILY: Fear (L2) + Apprehension (L1)
  { id: 'apprehension', name: 'Apprehension', nameEn: 'Apprehension', parentId: 'fear', intensity: 1 },
  { id: 'fear', name: 'Fear', nameEn: 'Fear', parentId: 'fear', intensity: 2 },

  // SURPRISE FAMILY: Surprise (L2) + Distraction (L1)
  { id: 'distraction', name: 'Distraction', nameEn: 'Distraction', parentId: 'surprise', intensity: 1 },
  { id: 'surprise', name: 'Surprise', nameEn: 'Surprise', parentId: 'surprise', intensity: 2 },

  // SADNESS FAMILY: Sadness (L2) + Pensiveness (L1)
  { id: 'pensiveness', name: 'Pensiveness', nameEn: 'Pensiveness', parentId: 'sadness', intensity: 1 },
  { id: 'sadness', name: 'Sadness', nameEn: 'Sadness', parentId: 'sadness', intensity: 2 },

  // DISGUST FAMILY: Disgust (L2) + Boredom (L1)
  { id: 'boredom', name: 'Boredom', nameEn: 'Boredom', parentId: 'disgust', intensity: 1 },
  { id: 'disgust', name: 'Disgust', nameEn: 'Disgust', parentId: 'disgust', intensity: 2 },

  // ANGER FAMILY: Anger (L2) + Annoyance (L1)
  { id: 'annoyance', name: 'Annoyance', nameEn: 'Annoyance', parentId: 'anger', intensity: 1 },
  { id: 'anger', name: 'Anger', nameEn: 'Anger', parentId: 'anger', intensity: 2 },

  // ANTICIPATION FAMILY: Anticipation (L2) + Interest (L1)
  { id: 'interest', name: 'Interest', nameEn: 'Interest', parentId: 'anticipation', intensity: 1 },
  { id: 'anticipation', name: 'Anticipation', nameEn: 'Anticipation', parentId: 'anticipation', intensity: 2 },
];

// Helper: get L3 emotion for a given family (parentId)
export function getLevel3Emotion(parentId: string): Emotion | undefined {
  return level3Emotions.find(e => e.parentId === parentId);
}

// Helper: get all subspectrum emotions for a parent (L2 + L1)
export function getSubSpectrumForParent(parentId: string): EmotionSubspectrum[] {
  return subSpectrumEmotions.filter(e => e.parentId === parentId);
}

// Combined map for lookup
export const allEmotionsMap = new Map<string, Emotion & { subIntensity?: number }>();
level3Emotions.forEach(e => allEmotionsMap.set(e.id, e));
subSpectrumEmotions.forEach(e => {
  allEmotionsMap.set(e.id, { ...e, spectrum: e.parentId === 'joy' || e.parentId === 'trust' || e.parentId === 'anticipation' ? 'positive' :
                             e.parentId === 'fear' || e.parentId === 'sadness' || e.parentId === 'anger' || e.parentId === 'disgust' ? 'negative' : 'neutral',
                           color: getColorForSubspectrumEmotion(e.id) } as any);
});

function getColorForSubspectrumEmotion(id: string): string {
  switch(id) {
    // Joy family
    case 'serenity': return '#F9E79F';
    case 'joy': return '#f5e660';
    case 'love': return '#FADBD8';
    
    // Trust family
    case 'acceptance': return '#ABEBC6';
    case 'trust': return '#75ea6f';
    
    // Fear family
    case 'apprehension': return '#A3D9C7';
    case 'fear': return '#216332';
    
    // Surprise family
    case 'distraction': return '#A9DFBF';
    case 'surprise': return '#50d5c3';
    
    // Sadness family
    case 'pensiveness': return '#85929E';
    case 'sadness': return '#2377cb';
    
    // Disgust family
    case 'boredom': return '#D7BDE2';
    case 'disgust': return '#8E44AD';
    
    // Anger family
    case 'annoyance': return '#F5B7B1';
    case 'anger': return '#f75454';
    
    // Anticipation family
    case 'interest': return '#F9E79F';
    case 'anticipation': return '#FFA502';
    
    default: return '#FFFFFF';
  }
}

export function getEmotion(id: string): (Emotion & { subIntensity?: number }) | undefined {
  return allEmotionsMap.get(id);
}

export function getLevel3Emotions(): Emotion[] {
  return level3Emotions;
}
