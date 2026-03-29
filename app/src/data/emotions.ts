import { Emotion, EmotionSpectrum } from '../types/emotion'

// 8 primary emotions (Plutchik wheel) - ZGODNE z emotions-wheel.html
// Kolejność: joy (0°), trust (45°), fear (90°), surprise (135°), sadness (180°), disgust (225°), anger (270°), anticipation (315°)
export const primaryEmotions: Emotion[] = [
  {
    id: 'joy',
    name: 'Joy',
    name_en: 'Joy',
    spectrum: 'primary',
    parent_id: null,
    wheel_pos: 0,
    color: '#e3f74bff',
    description: 'A feeling of great pleasure and happiness.',
  },
  {
    id: 'trust',
    name: 'Trust',
    name_en: 'Trust',
    spectrum: 'primary',
    parent_id: null,
    wheel_pos: 45,
    color: '#8df487ff',
    description: 'Firm belief in the reliability, truth, or ability of someone or something.',
  },
  {
    id: 'fear',
    name: 'Fear',
    name_en: 'Fear',
    spectrum: 'primary',
    parent_id: null,
    wheel_pos: 90,
    color: '#327042ff',
    description: 'An unpleasant emotion caused by the threat of danger, pain, or harm.',
  },
  {
    id: 'surprise',
    name: 'Surprise',
    name_en: 'Surprise',
    spectrum: 'primary',
    parent_id: null,
    wheel_pos: 135,
    color: '#6bf3e1ff',
    description: 'A feeling of mild astonishment or shock caused by something unexpected.',
  },
  {
    id: 'sadness',
    name: 'Sadness',
    name_en: 'Sadness',
    spectrum: 'primary',
    parent_id: null,
    wheel_pos: 180,
    color: '#4fa4faff',
    description: 'Emotional pain characterized by feelings of disadvantage, loss, despair, and helplessness.',
  },
  {
    id: 'disgust',
    name: 'Disgust',
    name_en: 'Disgust',
    spectrum: 'primary',
    parent_id: null,
    wheel_pos: 225,
    color: '#d06dfaff',
    description: 'A feeling of revulsion or strong disapproval aroused by something unpleasant or offensive.',
  },
  {
    id: 'anger',
    name: 'Anger',
    name_en: 'Anger',
    spectrum: 'primary',
    parent_id: null,
    wheel_pos: 270,
    color: '#f86161ff',
    description: 'A strong feeling of annoyance, displeasure, or hostility.',
  },
  {
    id: 'anticipation',
    name: 'Anticipation',
    name_en: 'Anticipation',
    spectrum: 'primary',
    parent_id: null,
    wheel_pos: 315,
    color: '#f9b73cff',
    description: 'The act of looking forward to something, especially with pleasure or excitement.',
  },
]

// Sub-emotions (3 per primary emotion) - ZGODNE z emotions-wheel.html
export const subEmotions: Emotion[] = [
  // Joy subspectra
  {
    id: 'serenity',
    name: 'Serenity',
    name_en: 'Serenity',
    spectrum: 'subspectrum',
    parent_id: 'joy',
    wheel_pos: 22.5,
    color: '#F9E79F',
    description: 'A state of being calm, peaceful, and untroubled.',
  },
  {
    id: 'love',
    name: 'Love',
    name_en: 'Love',
    spectrum: 'subspectrum',
    parent_id: 'joy',
    wheel_pos: 67.5,
    color: '#FADBD8',
    description: 'A deep feeling of affection and care towards someone or something.',
  },
  {
    id: 'ecstasy',
    name: 'Ecstasy',
    name_en: 'Ecstasy',
    spectrum: 'subspectrum',
    parent_id: 'joy',
    wheel_pos: 337.5,
    color: '#F7DC6F',
    description: 'An overwhelming feeling of great happiness or joyful excitement.',
  },

  // Trust subspectra
  {
    id: 'acceptance',
    name: 'Acceptance',
    name_en: 'Acceptance',
    spectrum: 'subspectrum',
    parent_id: 'trust',
    wheel_pos: 22.5,
    color: '#ABEBC6',
    description: 'The action of consenting to receive or undertake something offered.',
  },
  {
    id: 'submission',
    name: 'Submission',
    name_en: 'Submission',
    spectrum: 'subspectrum',
    parent_id: 'trust',
    wheel_pos: 67.5,
    color: '#A3E4D7',
    description: 'The action of accepting or yielding to a superior force or to the will or authority of another person.',
  },

  // Fear subspectra
  {
    id: 'terror',
    name: 'Terror',
    name_en: 'Terror',
    spectrum: 'subspectrum',
    parent_id: 'fear',
    wheel_pos: 112.5,
    color: '#76D7C4',
    description: 'Extreme fear or dread, often causing panic or paralysis.',
  },
  {
    id: 'apprehension',
    name: 'Apprehension',
    name_en: 'Apprehension',
    spectrum: 'subspectrum',
    parent_id: 'fear',
    wheel_pos: 157.5,
    color: '#A3D9C7',
    description: 'Anxiety or fear that something bad or unpleasant will happen.',
  },
  {
    id: 'awe',
    name: 'Awe',
    name_en: 'Awe',
    spectrum: 'subspectrum',
    parent_id: 'fear',
    wheel_pos: 202.5,
    color: '#82E0AA',
    description: 'A feeling of reverential respect mixed with fear or wonder.',
  },

  // Surprise subspectra
  {
    id: 'amazement',
    name: 'Amazement',
    name_en: 'Amazement',
    spectrum: 'subspectrum',
    parent_id: 'surprise',
    wheel_pos: 157.5,
    color: '#7FDBDA',
    description: 'A feeling of great surprise or wonder.',
  },
  {
    id: 'distraction',
    name: 'Distraction',
    name_en: 'Distraction',
    spectrum: 'subspectrum',
    parent_id: 'surprise',
    wheel_pos: 202.5,
    color: '#47aab8ff',
    description: 'A thing that prevents someone from concentrating on something else.',
  },

  // Sadness subspectra
  {
    id: 'grief',
    name: 'Grief',
    name_en: 'Grief',
    spectrum: 'subspectrum',
    parent_id: 'sadness',
    wheel_pos: 247.5,
    color: '#5D6D7E',
    description: "Deep sorrow or distress, especially caused by someone's death.",
  },
  {
    id: 'pensiveness',
    name: 'Pensiveness',
    name_en: 'Pensiveness',
    spectrum: 'subspectrum',
    parent_id: 'sadness',
    wheel_pos: 292.5,
    color: '#85929E',
    description: 'A state of deep or serious thought, often tinged with sadness.',
  },
  {
    id: 'remorse',
    name: 'Remorse',
    name_en: 'Remorse',
    spectrum: 'subspectrum',
    parent_id: 'sadness',
    wheel_pos: 202.5,
    color: '#ABB2B9',
    description: 'Deep regret or guilt for a wrong committed.',
  },

  // Disgust subspectra
  {
    id: 'loathing',
    name: 'Loathing',
    name_en: 'Loathing',
    spectrum: 'subspectrum',
    parent_id: 'disgust',
    wheel_pos: 247.5,
    color: '#C39BD3',
    description: 'A feeling of intense dislike or disgust; abhorrence.',
  },
  {
    id: 'boredom',
    name: 'Boredom',
    name_en: 'Boredom',
    spectrum: 'subspectrum',
    parent_id: 'disgust',
    wheel_pos: 292.5,
    color: '#D7BDE2',
    description: 'A state of being weary and restless through lack of interest.',
  },
  {
    id: 'contempt',
    name: 'Contempt',
    name_en: 'Contempt',
    spectrum: 'subspectrum',
    parent_id: 'disgust',
    wheel_pos: 337.5,
    color: '#AF7AC5',
    description: 'The feeling that a person or a thing is beneath consideration, worthless, or deserving scorn.',
  },

  // Anger subspectra
  {
    id: 'rage',
    name: 'Rage',
    name_en: 'Rage',
    spectrum: 'subspectrum',
    parent_id: 'anger',
    wheel_pos: 292.5,
    color: '#EC7063',
    description: 'Violent, uncontrollable anger that may lead to destructive behavior.',
  },
  {
    id: 'annoyance',
    name: 'Annoyance',
    name_en: 'Annoyance',
    spectrum: 'subspectrum',
    parent_id: 'anger',
    wheel_pos: 337.5,
    color: '#F5B7B1',
    description: 'A feeling of mild irritation or frustration.',
  },
  {
    id: 'aggressiveness',
    name: 'Aggressiveness',
    name_en: 'Aggressiveness',
    spectrum: 'subspectrum',
    parent_id: 'anger',
    wheel_pos: 22.5,
    color: '#E74C3C',
    description: 'Ready or likely to attack or confront; characterized by aggression.',
  },

  // Anticipation subspectra
  {
    id: 'interest',
    name: 'Interest',
    name_en: 'Interest',
    spectrum: 'subspectrum',
    parent_id: 'anticipation',
    wheel_pos: 67.5,
    color: '#F9E79F',
    description: 'A feeling of wanting to know or learn about something or someone.',
  },
  {
    id: 'vigilance',
    name: 'Vigilance',
    name_en: 'Vigilance',
    spectrum: 'subspectrum',
    parent_id: 'anticipation',
    wheel_pos: 112.5,
    color: '#F8C471',
    description: 'The action or state of keeping careful watch for possible danger or difficulties.',
  },
  {
    id: 'optimism',
    name: 'Optimism',
    name_en: 'Optimism',
    spectrum: 'subspectrum',
    parent_id: 'anticipation',
    wheel_pos: 22.5,
    color: '#F7DC6F',
    description: 'Hopefulness and confidence about the future or the successful outcome of something.',
  },
]

// All emotions combined
export const allEmotions: Emotion[] = [...primaryEmotions, ...subEmotions]

// Get sub-emotions for a specific parent
export function getSubEmotions(parentId: string): Emotion[] {
  return subEmotions.filter((e) => e.parent_id === parentId)
}

// Get emotion by ID
export function getEmotionById(id: string): Emotion | undefined {
  return allEmotions.find((e) => e.id === id)
}

// Get parent emotion
export function getParentEmotion(emotionId: string): Emotion | undefined {
  const emotion = getEmotionById(emotionId)
  if (!emotion || !emotion.parent_id) return undefined
  return getEmotionById(emotion.parent_id)
}

// Emotion spectra for the wheel
export const emotionSpectra: EmotionSpectrum[] = primaryEmotions.map((primary) => ({
  id: primary.id,
  name: primary.name,
  name_en: primary.name_en,
  color: primary.color || '#888888',
  emotions: [primary, ...getSubEmotions(primary.id)],
}))
