import React from 'react';

interface ProgressBarProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  answersMap: Record<number, string>;
  onJumpToQuestion: (index: number) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentQuestionIndex,
  totalQuestions,
  answersMap,
  onJumpToQuestion
}) => {
  const answeredCount = Object.keys(answersMap).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);
  const isWeaknessSection = currentQuestionIndex >= 20;

  return (
    <div className="w-full space-y-3">
      {/* Header with section badge and count */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-1 rounded-md font-semibold ${
              isWeaknessSection
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            }`}
          >
            {isWeaknessSection ? 'PHẦN 2: ĐIỂM YẾU (CÂU 21 - 40)' : 'PHẦN 1: ĐIỂM MẠNH (CÂU 1 - 20)'}
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <span>Đã hoàn thành:</span>
          <strong className="text-white font-bold">{answeredCount}/{totalQuestions}</strong>
          <span className="text-indigo-400 font-semibold">({progressPercent}%)</span>
        </div>
      </div>

      {/* Progress Track Bar */}
      <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60 shadow-inner">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 via-rose-500 via-indigo-500 to-emerald-500 transition-all duration-300 shadow-sm"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Mini Question Matrix Dots */}
      <div className="grid grid-cols-10 sm:grid-cols-20 gap-1 pt-1">
        {Array.from({ length: totalQuestions }).map((_, idx) => {
          const qId = idx + 1;
          const isAnswered = !!answersMap[qId];
          const isCurrent = currentQuestionIndex === idx;

          return (
            <button
              key={qId}
              onClick={() => onJumpToQuestion(idx)}
              className={`h-6 rounded text-[10px] font-bold transition-all flex items-center justify-center ${
                isCurrent
                  ? 'bg-indigo-500 text-white ring-2 ring-indigo-400 ring-offset-1 ring-offset-slate-900 scale-110 z-10'
                  : isAnswered
                  ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                  : 'bg-slate-800/60 text-slate-500 hover:bg-slate-800'
              }`}
              title={`Câu ${qId}: ${isAnswered ? 'Đã chọn' : 'Chưa chọn'}`}
            >
              {qId}
            </button>
          );
        })}
      </div>
    </div>
  );
};
