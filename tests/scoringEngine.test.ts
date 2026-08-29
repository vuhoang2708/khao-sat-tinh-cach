import { describe, it, expect } from 'vitest';
import { calculateAssessmentResults } from '../src/engine/scoringEngine';
import { SocialStyle, UserProfile } from '../src/types/personality';
import { QUESTIONS_40 } from '../src/data/questions40';

describe('Scoring Engine Tests', () => {
  const mockProfile: UserProfile = {
    fullName: 'Nguyen Van Test',
    email: 'test@example.com',
    phoneOrRole: 'CEO',
    mode: 'cloud_sync'
  };

  const anonymousProfile: UserProfile = {
    fullName: 'Khách Ẩn Danh',
    email: '',
    phoneOrRole: '',
    mode: 'local_anonymous'
  };

  it('should have exactly 40 questions (20 strength, 20 weakness)', () => {
    expect(QUESTIONS_40.length).toBe(40);
    const strengthQuestions = QUESTIONS_40.filter((q) => q.section === 'strength');
    const weaknessQuestions = QUESTIONS_40.filter((q) => q.section === 'weakness');
    expect(strengthQuestions.length).toBe(20);
    expect(weaknessQuestions.length).toBe(20);
  });

  it('each question should have 4 options mapping to 4 styles', () => {
    QUESTIONS_40.forEach((q) => {
      expect(q.options.length).toBe(4);
      const styles = q.options.map((o) => o.style);
      expect(styles).toContain('peacock');
      expect(styles).toContain('eagle');
      expect(styles).toContain('owl');
      expect(styles).toContain('dove');
    });
  });

  it('should correctly calculate scores for all Peacock choices in anonymous mode', () => {
    const allPeacockAnswers: Record<number, SocialStyle> = {};
    for (let i = 1; i <= 40; i++) {
      allPeacockAnswers[i] = 'peacock';
    }

    const result = calculateAssessmentResults(allPeacockAnswers, anonymousProfile);
    expect(result.dominantStyle).toBe('peacock');
    expect(result.scores.peacock.total).toBe(40);
    expect(result.scores.peacock.strength).toBe(20);
    expect(result.scores.peacock.weakness).toBe(20);
    expect(result.scores.peacock.percentage).toBe(100);
    expect(result.userProfile.mode).toBe('local_anonymous');

    expect(result.scores.eagle.total).toBe(0);
    expect(result.scores.owl.total).toBe(0);
    expect(result.scores.dove.total).toBe(0);
  });

  it('should correctly calculate mixed scores and identify dominant and secondary styles', () => {
    const mixedAnswers: Record<number, SocialStyle> = {};
    // 20 Eagle, 10 Peacock, 6 Owl, 4 Dove
    for (let i = 1; i <= 20; i++) mixedAnswers[i] = 'eagle';
    for (let i = 21; i <= 30; i++) mixedAnswers[i] = 'peacock';
    for (let i = 31; i <= 36; i++) mixedAnswers[i] = 'owl';
    for (let i = 37; i <= 40; i++) mixedAnswers[i] = 'dove';

    const result = calculateAssessmentResults(mixedAnswers, mockProfile);
    expect(result.dominantStyle).toBe('eagle');
    expect(result.secondaryStyle).toBe('peacock');
    expect(result.scores.eagle.total).toBe(20);
    expect(result.scores.eagle.percentage).toBe(50);
    expect(result.scores.peacock.total).toBe(10);
    expect(result.scores.peacock.percentage).toBe(25);
    expect(result.scores.owl.total).toBe(6);
    expect(result.scores.dove.total).toBe(4);
    expect(result.userProfile.mode).toBe('cloud_sync');
  });
});
