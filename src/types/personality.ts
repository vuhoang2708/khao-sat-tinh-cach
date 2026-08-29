export type SocialStyle = 'peacock' | 'eagle' | 'owl' | 'dove';
export type AssessmentMode = 'local_anonymous' | 'cloud_sync';

export interface QuestionOption {
  word: string;
  style: SocialStyle;
  columnNumber: number; // 1: Peacock, 2: Eagle, 3: Owl, 4: Dove
}

export interface QuestionItem {
  id: number;
  section: 'strength' | 'weakness';
  sectionLabel: string;
  options: QuestionOption[];
}

export interface UserProfile {
  fullName: string;
  email: string;
  phoneOrRole: string;
  mode: AssessmentMode;
}

export interface StyleScore {
  strength: number;
  weakness: number;
  total: number;
  percentage: number;
}

export interface DimensionDetail {
  emotion: string[];
  work: string[];
  friends: string[];
}

export interface StyleProfile {
  id: SocialStyle;
  name: string;
  vietnameseName: string;
  englishStyle: string;
  animal: string;
  icon: string;
  color: {
    bg: string;
    border: string;
    text: string;
    accent: string;
    glow: string;
  };
  tagline: string;
  overview: string;
  strengths: DimensionDetail;
  weaknesses: DimensionDetail;
  communicationTips: string[];
  growthTips: string[];
  collaborationTips: {
    targetStyle: SocialStyle;
    advice: string;
  }[];
}

export interface UserAnswer {
  questionId: number;
  selectedWord: string;
  style: SocialStyle;
}

export interface AssessmentResult {
  dominantStyle: SocialStyle;
  secondaryStyle: SocialStyle;
  scores: Record<SocialStyle, StyleScore>;
  totalScore: number;
  userProfile: UserProfile;
  answers: UserAnswer[];
  completedAt: string;
}
