import { SocialStyle, StyleScore, AssessmentResult, UserProfile, UserAnswer } from '../types/personality';
import { QUESTIONS_40 } from '../data/questions40';

export function calculateAssessmentResults(
  answersMap: Record<number, SocialStyle>,
  userProfile: UserProfile
): AssessmentResult {
  const scores: Record<SocialStyle, StyleScore> = {
    peacock: { strength: 0, weakness: 0, total: 0, percentage: 0 },
    eagle: { strength: 0, weakness: 0, total: 0, percentage: 0 },
    owl: { strength: 0, weakness: 0, total: 0, percentage: 0 },
    dove: { strength: 0, weakness: 0, total: 0, percentage: 0 }
  };

  const formattedAnswers: UserAnswer[] = [];
  let totalScore = 0;

  QUESTIONS_40.forEach((q) => {
    const selectedStyle = answersMap[q.id];
    if (selectedStyle) {
      const option = q.options.find((opt) => opt.style === selectedStyle);
      const selectedWord = option ? option.word : '';

      formattedAnswers.push({
        questionId: q.id,
        selectedWord,
        style: selectedStyle
      });

      if (q.section === 'strength') {
        scores[selectedStyle].strength += 1;
      } else {
        scores[selectedStyle].weakness += 1;
      }
      scores[selectedStyle].total += 1;
      totalScore += 1;
    }
  });

  // Calculate percentages
  const totalCount = totalScore > 0 ? totalScore : 40;
  (['peacock', 'eagle', 'owl', 'dove'] as SocialStyle[]).forEach((style) => {
    scores[style].percentage = Math.round((scores[style].total / totalCount) * 100);
  });

  // Determine dominant and secondary styles
  const sortedStyles = (['peacock', 'eagle', 'owl', 'dove'] as SocialStyle[]).sort((a, b) => {
    if (scores[b].total !== scores[a].total) {
      return scores[b].total - scores[a].total;
    }
    // Tie-breaker: strength score
    return scores[b].strength - scores[a].strength;
  });

  const dominantStyle = sortedStyles[0];
  const secondaryStyle = sortedStyles[1];

  return {
    dominantStyle,
    secondaryStyle,
    scores,
    totalScore,
    userProfile,
    answers: formattedAnswers,
    completedAt: new Date().toISOString()
  };
}
