import { AssessmentResult } from '../types/personality';

// Google Apps Script Webhook URL (replace with deployed exec URL if live deployed)
export const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbz_placeholder/exec';

export async function submitAssessmentData(result: AssessmentResult): Promise<boolean> {
  const payload = {
    fullName: result.userProfile.fullName,
    email: result.userProfile.email,
    phone: result.userProfile.phoneOrRole,
    dominantStyle: result.dominantStyle,
    secondaryStyle: result.secondaryStyle,
    scores: result.scores,
    answers: result.answers,
    completedAt: result.completedAt
  };

  // Always save local backup
  try {
    const history = JSON.parse(localStorage.getItem('assessment_history') || '[]');
    history.push(payload);
    localStorage.setItem('assessment_history', JSON.stringify(history));
  } catch (err) {
    console.warn('Could not save to localStorage:', err);
  }

  // Attempt Webhook POST
  try {
    if (WEBHOOK_URL && !WEBHOOK_URL.includes('placeholder')) {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    }
    return true;
  } catch (error) {
    console.error('Webhook submission error:', error);
    return false;
  }
}
