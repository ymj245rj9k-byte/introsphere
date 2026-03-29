import { Journey } from '../types/journey'

export const journeys: Journey[] = [
  {
    id: 'self-discovery',
    title: 'Self-Discovery',
    title_en: 'Self-Discovery',
    subtitle: '7 days of exploring your inner world',
    is_active: true,
    days: [
      {
        id: 'sd-1',
        journey_id: 'self-discovery',
        day_number: 1,
        question: 'What are three things that made you smile today?',
        question_en: 'What are three things that made you smile today?',
      },
      {
        id: 'sd-2',
        journey_id: 'self-discovery',
        day_number: 2,
        question: 'What is one fear you would like to overcome?',
        question_en: 'What is one fear you would like to overcome?',
      },
      {
        id: 'sd-3',
        journey_id: 'self-discovery',
        day_number: 3,
        question: 'Describe a moment when you felt truly proud of yourself.',
        question_en: 'Describe a moment when you felt truly proud of yourself.',
      },
      {
        id: 'sd-4',
        journey_id: 'self-discovery',
        day_number: 4,
        question: 'What does your ideal day look like?',
        question_en: 'What does your ideal day look like?',
      },
      {
        id: 'sd-5',
        journey_id: 'self-discovery',
        day_number: 5,
        question: 'What is something you have been avoiding? Why?',
        question_en: 'What is something you have been avoiding? Why?',
      },
      {
        id: 'sd-6',
        journey_id: 'self-discovery',
        day_number: 6,
        question: 'What qualities do you admire most in others?',
        question_en: 'What qualities do you admire most in others?',
      },
      {
        id: 'sd-7',
        journey_id: 'self-discovery',
        day_number: 7,
        question: 'What have you learned about yourself this week?',
        question_en: 'What have you learned about yourself this week?',
      },
    ],
  },
  {
    id: 'gratitude',
    title: 'Gratitude Practice',
    title_en: 'Gratitude Practice',
    subtitle: '7 days of appreciating what you have',
    is_active: true,
    days: [
      {
        id: 'gr-1',
        journey_id: 'gratitude',
        day_number: 1,
        question: 'Name one person who has positively influenced your life.',
        question_en: 'Name one person who has positively influenced your life.',
      },
      {
        id: 'gr-2',
        journey_id: 'gratitude',
        day_number: 2,
        question: 'What is a simple pleasure you enjoyed today?',
        question_en: 'What is a simple pleasure you enjoyed today?',
      },
      {
        id: 'gr-3',
        journey_id: 'gratitude',
        day_number: 3,
        question: 'What is something about your body you are grateful for?',
        question_en: 'What is something about your body you are grateful for?',
      },
      {
        id: 'gr-4',
        journey_id: 'gratitude',
        day_number: 4,
        question: 'Describe a challenge that helped you grow.',
        question_en: 'Describe a challenge that helped you grow.',
      },
      {
        id: 'gr-5',
        journey_id: 'gratitude',
        day_number: 5,
        question: 'What is a skill or talent you are thankful to have?',
        question_en: 'What is a skill or talent you are thankful to have?',
      },
      {
        id: 'gr-6',
        journey_id: 'gratitude',
        day_number: 6,
        question: 'What is something in nature that brings you peace?',
        question_en: 'What is something in nature that brings you peace?',
      },
      {
        id: 'gr-7',
        journey_id: 'gratitude',
        day_number: 7,
        question: 'How has practicing gratitude changed your perspective?',
        question_en: 'How has practicing gratitude changed your perspective?',
      },
    ],
  },
  {
    id: 'emotional-awareness',
    title: 'Emotional Awareness',
    title_en: 'Emotional Awareness',
    subtitle: '7 days of understanding your feelings',
    is_active: true,
    days: [
      {
        id: 'ea-1',
        journey_id: 'emotional-awareness',
        day_number: 1,
        question: 'What emotion are you feeling right now? Where do you feel it in your body?',
        question_en: 'What emotion are you feeling right now? Where do you feel it in your body?',
      },
      {
        id: 'ea-2',
        journey_id: 'emotional-awareness',
        day_number: 2,
        question: 'When was the last time you felt truly angry? What triggered it?',
        question_en: 'When was the last time you felt truly angry? What triggered it?',
      },
      {
        id: 'ea-3',
        journey_id: 'emotional-awareness',
        day_number: 3,
        question: 'What does sadness feel like to you? How do you cope with it?',
        question_en: 'What does sadness feel like to you? How do you cope with it?',
      },
      {
        id: 'ea-4',
        journey_id: 'emotional-awareness',
        day_number: 4,
        question: 'Describe a moment of pure joy. What made it special?',
        question_en: 'Describe a moment of pure joy. What made it special?',
      },
      {
        id: 'ea-5',
        journey_id: 'emotional-awareness',
        day_number: 5,
        question: 'What makes you feel anxious? How do you manage anxiety?',
        question_en: 'What makes you feel anxious? How do you manage anxiety?',
      },
      {
        id: 'ea-6',
        journey_id: 'emotional-awareness',
        day_number: 6,
        question: 'When do you feel most at peace? What creates that feeling?',
        question_en: 'When do you feel most at peace? What creates that feeling?',
      },
      {
        id: 'ea-7',
        journey_id: 'emotional-awareness',
        day_number: 7,
        question: 'What have you learned about your emotional patterns this week?',
        question_en: 'What have you learned about your emotional patterns this week?',
      },
    ],
  },
  {
    id: 'relationships',
    title: 'Relationships',
    title_en: 'Relationships',
    subtitle: '7 days of exploring connections',
    is_active: true,
    days: [
      {
        id: 're-1',
        journey_id: 'relationships',
        day_number: 1,
        question: 'Who is the most important person in your life? Why?',
        question_en: 'Who is the most important person in your life? Why?',
      },
      {
        id: 're-2',
        journey_id: 'relationships',
        day_number: 2,
        question: 'What do you value most in a friendship?',
        question_en: 'What do you value most in a friendship?',
      },
      {
        id: 're-3',
        journey_id: 'relationships',
        day_number: 3,
        question: 'Describe a time when someone disappointed you. How did you handle it?',
        question_en: 'Describe a time when someone disappointed you. How did you handle it?',
      },
      {
        id: 're-4',
        journey_id: 'relationships',
        day_number: 4,
        question: 'What boundaries do you need to set in your relationships?',
        question_en: 'What boundaries do you need to set in your relationships?',
      },
      {
        id: 're-5',
        journey_id: 'relationships',
        day_number: 5,
        question: 'How do you show love to others? How do you like to receive it?',
        question_en: 'How do you show love to others? How do you like to receive it?',
      },
      {
        id: 're-6',
        journey_id: 'relationships',
        day_number: 6,
        question: 'What relationship in your life needs more attention?',
        question_en: 'What relationship in your life needs more attention?',
      },
      {
        id: 're-7',
        journey_id: 'relationships',
        day_number: 7,
        question: 'What have you learned about yourself through your relationships?',
        question_en: 'What have you learned about yourself through your relationships?',
      },
    ],
  },
]

export function getJourneyById(id: string): Journey | undefined {
  return journeys.find(j => j.id === id)
}

export function getActiveJourneys(): Journey[] {
  return journeys.filter(j => j.is_active)
}
