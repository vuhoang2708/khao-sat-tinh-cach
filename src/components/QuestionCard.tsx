import React from 'react';
import { QuestionItem, SocialStyle } from '../types/personality';
import { ChevronLeft, ChevronRight, Check, Sparkles } from 'lucide-react';

interface QuestionCardProps {
  question: QuestionItem;
  questionIndex: number;
  totalQuestions: number;
  selectedStyle?: SocialStyle;
  onSelectOption: (questionId: number, style: SocialStyle) => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  canSubmit: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionIndex,
  totalQuestions,
  selectedStyle,
  onSelectOption,
  onPrevious,
  onNext,
  onSubmit,
  canSubmit
}) => {
  const isFirst = questionIndex === 0;
  const isLast = questionIndex === totalQuestions - 1;

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl border border-slate-800">
      {/* Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-extrabold flex items-center justify-center text-base">
            {question.id}
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {question.sectionLabel}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Dòng {question.id} / 40
            </h3>
          </div>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Chọn <strong>1 từ</strong> đúng với bạn nhất</span>
        </div>
      </div>

      {/* 4 Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {question.options.map((option, idx) => {
          const isSelected = selectedStyle === option.style;
          const letter = String.fromCharCode(65 + idx); // A, B, C, D

          return (
            <button
              key={`${question.id}-${option.style}-${idx}`}
              onClick={() => onSelectOption(question.id, option.style)}
              className={`relative text-left p-4 sm:p-5 rounded-xl border transition-all flex items-center justify-between group ${
                isSelected
                  ? 'bg-gradient-to-r from-indigo-900/60 to-purple-900/60 border-indigo-500 text-white ring-2 ring-indigo-500/40 shadow-lg shadow-indigo-500/20 scale-[1.01]'
                  : 'bg-slate-800/60 hover:bg-slate-800/90 border-slate-700/70 text-slate-200 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${
                    isSelected
                      ? 'bg-indigo-500 text-white'
                      : 'bg-slate-700/80 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200'
                  }`}
                >
                  {letter}
                </div>
                <span className="text-base sm:text-lg font-semibold tracking-wide">
                  {option.word}
                </span>
              </div>

              <div
                className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                  isSelected
                    ? 'border-indigo-400 bg-indigo-500 text-white'
                    : 'border-slate-600 bg-slate-800 group-hover:border-slate-500'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          onClick={onPrevious}
          disabled={isFirst}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
            isFirst
              ? 'opacity-40 cursor-not-allowed text-slate-500'
              : 'text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Câu Trước</span>
        </button>

        {isLast ? (
          <button
            onClick={onSubmit}
            disabled={!canSubmit}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg transition-all ${
              canSubmit
                ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 shadow-emerald-500/25 scale-105 animate-pulse'
                : 'opacity-50 cursor-not-allowed bg-slate-800 border border-slate-700 text-slate-400'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>Xem Kết Quả & Báo Cáo</span>
          </button>
        ) : (
          <button
            onClick={onNext}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-500/20 transition-all group"
          >
            <span>Câu Tiếp</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};
