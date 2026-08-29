import React, { useState } from 'react';
import { AssessmentResult, SocialStyle } from '../types/personality';
import { STYLE_PROFILES } from '../data/styleProfiles';
import { RadarChart } from './RadarChart';
import { StyleDeepDive } from './StyleDeepDive';
import { Award, Download, RotateCcw, Share2, CheckCircle2, ChevronRight, ShieldCheck, Cloud, ShieldAlert } from 'lucide-react';

interface PersonalityReportProps {
  result: AssessmentResult;
  onReset: () => void;
  onExportPDF: () => void;
  isExporting: boolean;
  webhookStatus?: 'idle' | 'loading' | 'success' | 'error';
  onSyncCloud?: (name: string, email: string, phone: string) => Promise<void>;
}

export const PersonalityReport: React.FC<PersonalityReportProps> = ({
  result,
  onReset,
  onExportPDF,
  isExporting,
  webhookStatus,
  onSyncCloud
}) => {
  const [selectedStyleTab, setSelectedStyleTab] = useState<SocialStyle>(result.dominantStyle);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [syncName, setSyncName] = useState(result.userProfile.fullName === 'Khách Ẩn Danh' ? '' : result.userProfile.fullName);
  const [syncEmail, setSyncEmail] = useState(result.userProfile.email || '');
  const [syncPhone, setSyncPhone] = useState(result.userProfile.phoneOrRole || '');
  const [postConsent, setPostConsent] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false);

  const dominantProfile = STYLE_PROFILES[result.dominantStyle];
  const secondaryProfile = STYLE_PROFILES[result.secondaryStyle];
  const isAnonymous = result.userProfile.mode === 'local_anonymous';

  const handleShare = () => {
    const shareText = `Tôi vừa hoàn thành bài trắc nghiệm Hồ Sơ Phong Cách Xã Hội: Phong cách chủ đạo của tôi là ${dominantProfile.vietnameseName} (${result.scores[result.dominantStyle].percentage}%)!`;
    navigator.clipboard.writeText(shareText);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  const handlePerformSync = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!syncName.trim() || !postConsent) return;
    if (onSyncCloud) {
      setSyncLoading(true);
      await onSyncCloud(syncName.trim(), syncEmail.trim(), syncPhone.trim());
      setSyncLoading(false);
      setShowSyncModal(false);
    }
  };

  const styleOrder: SocialStyle[] = ['peacock', 'eagle', 'owl', 'dove'];

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-16">
      {/* Top Banner: Success & Dominant Style Header */}
      <div className="relative overflow-hidden glass-card-glow rounded-3xl p-6 sm:p-10 border border-indigo-500/30 text-center space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Khảo Sát Hoàn Tất • Báo Cáo Phân Tích</span>
            </div>

            {isAnonymous ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Chế Độ Ẩn Danh (100% Xử Lý Tại Chỗ)</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                <Cloud className="w-3.5 h-3.5 text-indigo-400" />
                <span>Đã Lưu Vào Google Sheet</span>
              </span>
            )}
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Kết Quả Phong Cách Của Bạn
          </h2>

          <p className="text-slate-300 text-sm sm:text-base">
            {result.userProfile.fullName && result.userProfile.fullName !== 'Khách Ẩn Danh' ? (
              <>Thân gửi anh/chị <strong className="text-white font-bold">{result.userProfile.fullName}</strong>{result.userProfile.phoneOrRole ? ` (${result.userProfile.phoneOrRole})` : ''}, dưới đây là hồ sơ phân tích chi tiết:</>
            ) : (
              <>Dưới đây là bảng phân tích toàn diện hồ sơ phong cách xã hội và 4 nhóm tính cách của bạn:</>
            )}
          </p>
        </div>

        {/* Highlight Badges: Dominant & Secondary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto pt-2">
          {/* Dominant */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900/60 to-slate-900 border border-indigo-500/40 shadow-xl flex items-center gap-4 text-left">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-4xl shadow-inner flex-shrink-0">
              {dominantProfile.icon}
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> Phong Cách Chủ Đạo (Dominant)
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {dominantProfile.vietnameseName}
              </h3>
              <p className="text-xs text-indigo-300 font-semibold">
                Chiếm {result.scores[result.dominantStyle].percentage}% tổng số điểm ({result.scores[result.dominantStyle].total}/40 câu)
              </p>
            </div>
          </div>

          {/* Secondary */}
          <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700 shadow-lg flex items-center gap-4 text-left">
            <div className="w-16 h-16 rounded-2xl bg-slate-700/50 border border-slate-600 flex items-center justify-center text-4xl shadow-inner flex-shrink-0">
              {secondaryProfile.icon}
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Phong Cách Phụ (Secondary)
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-200">
                {secondaryProfile.vietnameseName}
              </h3>
              <p className="text-xs text-slate-400 font-semibold">
                Chiếm {result.scores[result.secondaryStyle].percentage}% tổng số điểm ({result.scores[result.secondaryStyle].total}/40 câu)
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onExportPDF}
            disabled={isExporting}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25 transition-all text-xs sm:text-sm"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Đang Tạo Báo Cáo PDF...' : 'Tải Báo Cáo PDF'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all text-xs sm:text-sm"
          >
            <Share2 className="w-4 h-4" />
            <span>{copySuccess ? 'Đã Sao Chép Kết Quả!' : 'Chia Sẻ Kết Quả'}</span>
          </button>

          {isAnonymous && onSyncCloud && webhookStatus !== 'success' && (
            <button
              onClick={() => setShowSyncModal(true)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-indigo-300 bg-indigo-950/50 hover:bg-indigo-900/60 border border-indigo-500/40 transition-all text-xs sm:text-sm"
            >
              <Cloud className="w-4 h-4 text-indigo-400" />
              <span>Lưu Lên Google Sheet</span>
            </button>
          )}

          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-slate-400 hover:text-white bg-transparent hover:bg-slate-800/80 border border-slate-800 transition-all text-xs sm:text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Làm Lại</span>
          </button>
        </div>

        {webhookStatus === 'success' && (
          <div className="text-xs text-emerald-400 font-medium">
            ✓ Kết quả khảo sát đã được lưu vào Google Sheet.
          </div>
        )}
      </div>

      {/* Radar Chart & 4 Styles Score Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Radar Chart Column */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="text-center space-y-1">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Biểu Đồ Phân Bổ 4 Trục Phong Cách
            </h4>
            <p className="text-xs text-slate-400">
              Trực quan hóa cấu trúc năng lực và thiên hướng hành vi
            </p>
          </div>
          <RadarChart scores={result.scores} />
        </div>

        {/* 4 Score Breakdown Cards Column */}
        <div className="lg:col-span-7 space-y-3">
          <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider px-1">
            Chi Tiết Điểm Số 4 Nhóm Tính Cách:
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {styleOrder.map((styleKey) => {
              const profile = STYLE_PROFILES[styleKey];
              const score = result.scores[styleKey];
              const isDominant = styleKey === result.dominantStyle;
              const isSelected = selectedStyleTab === styleKey;

              return (
                <div
                  key={styleKey}
                  onClick={() => setSelectedStyleTab(styleKey)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2.5 ${
                    isSelected
                      ? 'bg-slate-800/90 border-indigo-500 shadow-md ring-1 ring-indigo-500/50'
                      : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{profile.icon}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h5 className="font-bold text-white text-sm">
                            {profile.animal}
                          </h5>
                          {isDominant && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded">
                              TOP 1
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400">{profile.englishStyle}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-black text-white">
                        {score.percentage}%
                      </span>
                      <p className="text-[10px] text-slate-400">{score.total}/40 câu</p>
                    </div>
                  </div>

                  {/* Mini Progress Bar */}
                  <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-amber-500 rounded-full"
                      style={{ width: `${score.percentage}%` }}
                    />
                  </div>

                  {/* Sub breakdown: Strength vs Weakness */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-700/40">
                    <span>Mạnh: <strong className="text-emerald-400">{score.strength}</strong></span>
                    <span>Yếu: <strong className="text-rose-400">{score.weakness}</strong></span>
                    <span className="text-indigo-400 font-semibold flex items-center gap-0.5">
                      Xem chi tiết <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Style Deep Dive (3 Dimensions: Emotion, Work, Friends) */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Phân Tích Chuyên Sâu 3 Chiều
            </h3>
            <p className="text-xs text-slate-400">
              Khám phá đặc điểm Cảm Xúc • Công Việc • Bạn Bè & Mối Quan Hệ
            </p>
          </div>

          {/* Style Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-800/80 rounded-xl border border-slate-700/60">
            {styleOrder.map((styleKey) => {
              const profile = STYLE_PROFILES[styleKey];
              const isSelected = selectedStyleTab === styleKey;

              return (
                <button
                  key={styleKey}
                  onClick={() => setSelectedStyleTab(styleKey)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{profile.icon}</span>
                  <span className="hidden sm:inline">{profile.animal}</span>
                </button>
              );
            })}
          </div>
        </div>

        <StyleDeepDive
          profile={STYLE_PROFILES[selectedStyleTab]}
          isDominant={selectedStyleTab === result.dominantStyle}
        />
      </div>

      {/* Optional Post-Assessment Sync Modal with Decree 13 Consent */}
      {showSyncModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl glass-card-glow space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-base">
              <Cloud className="w-5 h-5" />
              <span>Lưu Báo Cáo Vào Google Sheet</span>
            </div>

            {/* Highlighted Decree 13 Notice */}
            <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-[11px] text-slate-300 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-amber-400">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Nghị định 13/2023/NĐ-CP về Bảo vệ Dữ liệu Cá nhân:</span>
              </div>
              <p className="leading-relaxed">
                Dữ liệu họ tên, email và 40 câu trả lời của bạn sẽ được lưu trữ an toàn vào Google Sheet quản trị để xuất báo cáo.
              </p>
            </div>

            <form onSubmit={handlePerformSync} className="space-y-3">
              <input
                type="text"
                value={syncName}
                onChange={(e) => setSyncName(e.target.value)}
                placeholder="Họ và Tên (*)"
                required
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
              />
              <input
                type="email"
                value={syncEmail}
                onChange={(e) => setSyncEmail(e.target.value)}
                placeholder="Email (tùy chọn)"
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                value={syncPhone}
                onChange={(e) => setSyncPhone(e.target.value)}
                placeholder="Chức danh / Số điện thoại (tùy chọn)"
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
              />

              <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/60 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="postConsent"
                  checked={postConsent}
                  onChange={(e) => setPostConsent(e.target.checked)}
                  required
                  className="mt-0.5 w-3.5 h-3.5 rounded text-indigo-600 bg-slate-900 border-slate-600 focus:ring-indigo-500 cursor-pointer"
                />
                <label htmlFor="postConsent" className="text-[11px] text-slate-300 leading-snug cursor-pointer select-none">
                  Tôi <strong className="text-amber-400">ĐỒNG Ý</strong> xử lý dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP.
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSyncModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  disabled={syncLoading || !postConsent}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  {syncLoading ? 'Đang Đồng Bộ...' : 'Đồng Bộ Ngay'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
