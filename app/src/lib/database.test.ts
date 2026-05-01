

// Mock Supabase
vi.mock('@/lib/supabase');

describe('saveMoodEntry', () => {
  it('should save a mood entry successfully', async () => {
    const mockInsert = vi.fn().mockResolvedValue({ error: null });
    const mockSelect = vi.fn().mockResolvedValue({ 
      data: { id: 'test-id' }, 
      error: null 
    });

    vi.mocked(supabase.supabase).mockReturnValue({
      from: vi.fn().mockImplementation((table: string) => {
        if (table === 'mood_calendar') {
          return {
            upsert: mockInsert,
            select: vi.fn().mockReturnValue(mockSelect),
          };
        }
        if (table === 'calendar_entries') {
          return {
            insert: mockInsert,
          };
        }
        return { select: vi.fn(), insert: vi.fn(), upsert: vi.fn() };
      }),
    } as any);

    await expect(saveMoodEntry({
      userId: 'user-1',
      emotionId: 'joy',
      emotionName: 'Joy',
      color: '#FFD93D',
      response: 'Test response',
    })).resolves.not.toThrow();
  });
});

describe('getUserStats', () => {
  it('should return user statistics', async () => {
    vi.mocked(supabase.supabase).mockReturnValue({
      from: vi.fn().mockImplementation((table: string) => {
        if (table === 'calendar_entries') {
          return {
            select: vi.fn().mockResolvedValue({ 
              count: 5, 
              error: null 
            }),
          };
        }
        if (table === 'mood_calendar') {
          return {
            select: vi.fn().mockResolvedValue({ 
              data: [], 
              error: null 
            }),
          };
        }
        return { select: vi.fn() };
      }),
    } as any);

    const stats = await getUserStats('user-1');
    expect(stats).toEqual({
      streakDays: 0,
      totalSessions: 5,
      topEmotion: null,
    });
  });
});
