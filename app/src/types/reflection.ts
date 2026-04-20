export interface UserResponse {
  id: string;
  userId: string;
  journeyId?: string;
  journeyDay?: number;
  moodId?: string;
  question: string;
  response: string;
  createdAt: string;
  emotionId?: string;
  emotionName?: string;
  color?: string;
}
