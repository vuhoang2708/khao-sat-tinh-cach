import React from 'react';
import { Compass, RotateCcw, Award, ShieldCheck, Cloud, BookOpen, Lightbulb } from 'lucide-react';
import { AssessmentMode } from '../types/personality';

interface HeaderProps {
  currentStep: number;
  totalSteps: number;
  isCompleted: boolean;
  onReset: () => void;
  userName?: string;
  mode?: AssessmentMode;
  currentView?: 'survey' | 'research' | 'roadmap';
  onNavigateView?: (view: 'survey' | 'research' | 'roadmap') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  totalSteps,
  isCompleted,
  onReset,
  userName,
  mode = 'local_anonymous',
  currentView = 'survey',
  onNavigateView
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/85 backdrop-blur-md border-b border-slate-800 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            onClick={() => onNavigateView && onNavigateView('survey')}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-500 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/20 cursor-pointer"
          >
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 
                onClick={() => onNavigateView && onNavigateView('survey')}
                className="text-base sm:text-lg font-bold text-white tracking-tight cursor-pointer hover:text-indigo-300 transition-colors"
              >
                HỒ SƠ PHONG CÁCH XÃ HỘI
              </h1>
              <span className="hidden md:inline-block px-2 py-0.5 text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                4 Nhóm Tính Cách
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <span>🦚 Công • 🦅 Đại Bàng • 🦉 Cú • 🕊️ Bồ Câu</span>
              {mode === 'local_anonymous' ? (
                <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                  <ShieldCheck className="w-3 h-3" /> Ẩn Danh
                </span>
              ) : (
                <span className="inline-flex items-center gap-0.5 text-[10px] text-indigo-400 font-semibold bg-indigo-500/10 px-1.5 py-0.2 rounded border border-indigo-500/20">
                  <Cloud className="w-3 h-3" /> Đồng Bộ
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Navigation link between Survey, Research and Roadmap */}
          {onNavigateView && (
            <div className="flex items-center p-1 bg-slate-800/80 rounded-xl border border-slate-700/60 text-xs">
              <button
                onClick={() => onNavigateView('survey')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  currentView === 'survey'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                📝 Khảo Sát
              </button>

              <button
                onClick={() => onNavigateView('research')}
                className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  currentView === 'research'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Nghiên Cứu</span>
              </button>

              <button
                onClick={() => onNavigateView('roadmap')}
                className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  currentView === 'roadmap'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-amber-300'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Ý Tưởng</span>
              </button>
            </div>
          )}

          {currentView === 'survey' && (
            <>
              {userName && userName !== 'Khách Ẩn Danh' && (
                <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>{userName}</span>
                </div>
              )}

              {!isCompleted ? (
                <div className="text-right pl-1">
                  <span className="text-[10px] font-medium text-slate-400">Tiến độ:</span>
                  <div className="text-xs sm:text-sm font-bold text-indigo-400">
                    {currentStep} <span className="text-slate-500">/</span> {totalSteps}
                  </div>
                </div>
              ) : (
                <button
                  onClick={onReset}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg border border-slate-700 transition-colors shadow-sm"
                  title="Làm lại bài khảo sát"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">Làm Lại</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};
