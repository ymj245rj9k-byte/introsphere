export interface Journey {
  id: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  tone: string;
  toneEn: string;
  isActive: boolean;
  displayOrder: number;
  icon: string;
}

export interface JourneyDay {
  id: number;
  journeyId: string;
  dayNumber: number;
  dayName: string;
  question: string;
  questionEn: string;
}

export interface UserJourneyProgress {
  id: string;
  userId: string;
  journeyId: string;
  currentDay: number;
  status: 'in_progress' | 'completed' | 'paused';
  startedAt: string;
  completedAt?: string;
}
