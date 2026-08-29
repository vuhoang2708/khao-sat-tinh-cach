import React, { useState, useEffect } from 'react';
import { UserProfile, SocialStyle, AssessmentResult } from './types/personality';
import { QUESTIONS_40 } from './data/questions40';
import { calculateAssessmentResults } from './engine/scoringEngine';
import { submitAssessmentData } from './utils/webhook';
import { exportReportToPDF } from './utils/pdfExport';
import { Header } from './components/Header';
import { OnboardingModal } from './components/OnboardingModal';
import { ProgressBar } from './components/ProgressBar';
import { QuestionCard } from './components/QuestionCard';
import { PersonalityReport } from './components/PersonalityReport';
import { PDFExportView } from './components/PDFExportView';
import { ResearchPage } from './components/ResearchPage';
import { BookOpen } from 'lucide-react';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'survey' | 'research'>(() => {
    return window.location.hash === '#research' ? 'research' : 'survey';
  });

  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('user_personality_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => {
    return !localStorage.getItem('user_personality_profile');
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answersMap, setAnswersMap] = useState<Record<number, SocialStyle>>(() => {
    const saved = localStorage.getItem('current_answers_map');
    return saved ? JSON.parse(saved) : {};
  });

  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [result, setResult] = useState<AssessmentResult | null>(() => {
    const saved = localStorage.getItem('last_assessment_result');
    return saved ? JSON.parse(saved) : null;
  });

  const [isExportingPDF, setIsExportingPDF] = useState<boolean>(false);
  const [webhookStatus, setWebhookStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#research') {
        setCurrentView('research');
      } else {
        setCurrentView('survey');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigateView = (view: 'survey' | 'research') => {
    setCurrentView(view);
    window.location.hash = view === 'research' ? '#research' : '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save progress to localStorage
  useEffect(() => {
    if (Object.keys(answersMap).length > 0) {
      localStorage.setItem('current_answers_map', JSON.stringify(answersMap));
    }
  }, [answersMap]);

  useEffect(() => {
    if (result) {
      localStorage.setItem('last_assessment_result', JSON.stringify(result));
    }
  }, [result]);

  const handleStartOnboarding = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('user_personality_profile', JSON.stringify(profile));
    setIsOnboardingOpen(false);
  };

  const handleSelectOption = (questionId: number, style: SocialStyle) => {
    const nextAnswers = { ...answersMap, [questionId]: style };
    setAnswersMap(nextAnswers);

    // Auto advance to next question after small delay for smooth experience
    if (currentQuestionIndex < QUESTIONS_40.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => Math.min(prev + 1, QUESTIONS_40.length - 1));
      }, 250);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, QUESTIONS_40.length - 1));
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmit = async () => {
    const profile: UserProfile = userProfile || {
      fullName: 'Khách Ẩn Danh',
      email: '',
      phoneOrRole: '',
      mode: 'local_anonymous'
    };
    const calculatedResult = calculateAssessmentResults(answersMap, profile);
    setResult(calculatedResult);
    setIsCompleted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // In local_anonymous mode, DO NOT call webhook
    if (profile.mode === 'cloud_sync') {
      setWebhookStatus('loading');
      const success = await submitAssessmentData(calculatedResult);
      setWebhookStatus(success ? 'success' : 'error');
    } else {
      setWebhookStatus('idle');
    }
  };

  const handleSyncCloud = async (name: string, email: string, phone: string) => {
    if (!result) return;
    const updatedProfile: UserProfile = {
      fullName: name,
      email: email,
      phoneOrRole: phone,
      mode: 'cloud_sync'
    };
    setUserProfile(updatedProfile);
    localStorage.setItem('user_personality_profile', JSON.stringify(updatedProfile));

    const updatedResult: AssessmentResult = {
      ...result,
      userProfile: updatedProfile
    };
    setResult(updatedResult);

    setWebhookStatus('loading');
    const success = await submitAssessmentData(updatedResult);
    setWebhookStatus(success ? 'success' : 'error');
  };

  const handleReset = () => {
    if (window.confirm('Bạn có chắc chắn muốn làm lại bài khảo sát từ đầu không?')) {
      setAnswersMap({});
      setResult(null);
      setIsCompleted(false);
      setCurrentQuestionIndex(0);
      localStorage.removeItem('current_answers_map');
      localStorage.removeItem('last_assessment_result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleExportPDF = async () => {
    if (!result) return;
    setIsExportingPDF(true);
    try {
      const cleanName = (result.userProfile.fullName || 'Khach').replace(/\s+/g, '_');
      const filename = `Ho_So_Phong_Cach_Xa_Hoi_${cleanName}.pdf`;
      await exportReportToPDF('pdf-export-container', filename);
    } catch (err) {
      console.error('Lỗi khi xuất PDF:', err);
      alert('Không thể xuất PDF. Vui lòng thử lại.');
    } finally {
      setIsExportingPDF(false);
    }
  };

  const totalAnswered = Object.keys(answersMap).length;
  const canSubmit = totalAnswered === QUESTIONS_40.length;
  const currentQuestion = QUESTIONS_40[currentQuestionIndex];
  const currentMode = userProfile?.mode || 'local_anonymous';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header with Navigation */}
      <Header
        currentStep={totalAnswered}
        totalSteps={QUESTIONS_40.length}
        isCompleted={isCompleted}
        onReset={handleReset}
        userName={userProfile?.fullName}
        mode={currentMode}
        currentView={currentView}
        onNavigateView={handleNavigateView}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {currentView === 'research' ? (
          <ResearchPage onBackToSurvey={() => handleNavigateView('survey')} />
        ) : (
          <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
            {!isCompleted ? (
              <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto">
                {/* Progress Component */}
                <ProgressBar
                  currentQuestionIndex={currentQuestionIndex}
                  totalQuestions={QUESTIONS_40.length}
                  answersMap={answersMap}
                  onJumpToQuestion={handleJumpToQuestion}
                />

                {/* Question Card */}
                <QuestionCard
                  question={currentQuestion}
                  questionIndex={currentQuestionIndex}
                  totalQuestions={QUESTIONS_40.length}
                  selectedStyle={answersMap[currentQuestion.id]}
                  onSelectOption={handleSelectOption}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                  onSubmit={handleSubmit}
                  canSubmit={canSubmit}
                />

                {/* Hint Notice with link to Research */}
                <div className="text-center text-xs text-slate-400 space-y-1.5 pt-2">
                  <p>💡 Gợi ý: Hãy tin tưởng vào phản xạ trực giác đầu tiên của bạn để kết quả phản ánh chân thật nhất!</p>
                  <button
                    onClick={() => handleNavigateView('research')}
                    className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 underline underline-offset-4 text-xs font-medium"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Tìm hiểu về Cơ sở Khoa học & Thuyết 4 Khí Chất ➔</span>
                  </button>
                </div>
              </div>
            ) : (
              result && (
                <PersonalityReport
                  result={result}
                  onReset={handleReset}
                  onExportPDF={handleExportPDF}
                  isExporting={isExportingPDF}
                  webhookStatus={webhookStatus}
                  onSyncCloud={handleSyncCloud}
                />
              )
            )}
          </div>
        )}
      </main>

      {/* Hidden Printable PDF Container */}
      <div className="fixed left-[-9999px] top-[-9999px] overflow-hidden pointer-events-none" aria-hidden="true">
        {result && <PDFExportView result={result} />}
      </div>

      {/* Onboarding Dialog */}
      <OnboardingModal
        isOpen={isOnboardingOpen && currentView === 'survey'}
        onStart={handleStartOnboarding}
      />

      {/* Footer with Research Link */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500 space-y-2">
        <p>Hồ Sơ Phong Cách Xã Hội • Hệ thống Đánh Giá Tính Cách 4 Nhóm (Chim Công • Đại Bàng • Chim Cú • Bồ Câu)</p>
        <div className="flex items-center justify-center gap-4 text-slate-400">
          <button
            onClick={() => handleNavigateView('survey')}
            className="hover:text-indigo-400 transition-colors"
          >
            Làm Khảo Sát
          </button>
          <span>•</span>
          <button
            onClick={() => handleNavigateView('research')}
            className="hover:text-indigo-400 transition-colors font-medium text-indigo-400"
          >
            🔬 Cơ Sở Khoa Học & Báo Cáo Nghiên Cứu
          </button>
          <span>•</span>
          <a
            href="/research_report.pdf"
            download
            className="hover:text-indigo-400 transition-colors"
          >
            📥 Tải PDF Nghiên Cứu
          </a>
        </div>
      </footer>
    </div>
  );
};
