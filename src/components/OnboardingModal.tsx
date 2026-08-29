import React, { useState } from 'react';
import { UserProfile, AssessmentMode } from '../types/personality';
import { Sparkles, ArrowRight, ShieldCheck, Cloud, User, Mail, Briefcase, Zap, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onStart: (profile: UserProfile) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onStart }) => {
  const [selectedMode, setSelectedMode] = useState<AssessmentMode>('local_anonymous');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneOrRole, setPhoneOrRole] = useState('');
  const [consentNghiDinh13, setConsentNghiDinh13] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleStartAnonymous = () => {
    onStart({
      fullName: 'Khách Ẩn Danh',
      email: '',
      phoneOrRole: '',
      mode: 'local_anonymous'
    });
  };

  const handleSubmitCloudSync = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Vui lòng nhập họ và tên của bạn để lưu kết quả.');
      return;
    }
    if (!consentNghiDinh13) {
      setError('Vui lòng tích chọn đồng ý xử lý dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP để tiếp tục chế độ Đồng Bộ.');
      return;
    }
    setError('');
    onStart({
      fullName: fullName.trim(),
      email: email.trim(),
      phoneOrRole: phoneOrRole.trim(),
      mode: 'cloud_sync'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden glass-card-glow max-h-[90vh] overflow-y-auto">
        {/* Top decorative gradient bar */}
        <div className="h-2 bg-gradient-to-r from-amber-500 via-rose-500 via-indigo-500 to-emerald-500" />

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hồ Sơ Phong Cách Xã Hội & Tính Cách</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Khám Phá 4 Nhóm Tính Cách
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
              Xác định phong cách giao tiếp, ra quyết định và thế mạnh vượt trội: <br />
              <span className="text-amber-400 font-medium">🦚 Chim Công</span> •{' '}
              <span className="text-rose-400 font-medium">🦅 Đại Bàng</span> •{' '}
              <span className="text-indigo-400 font-medium">🦉 Chim Cú</span> •{' '}
              <span className="text-emerald-400 font-medium">🕊️ Bồ Câu</span>
            </p>
          </div>

          {/* Mode Selector Tabs */}
          <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-800/80 rounded-xl border border-slate-700/70">
            <button
              type="button"
              onClick={() => setSelectedMode('local_anonymous')}
              className={`p-3 rounded-lg text-left transition-all space-y-1 ${
                selectedMode === 'local_anonymous'
                  ? 'bg-gradient-to-r from-emerald-900/60 to-teal-900/60 border border-emerald-500/60 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>1. Ẩn Danh (Local Only)</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-tight">
                Không thu thập thông tin, 100% xử lý tại máy.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMode('cloud_sync')}
              className={`p-3 rounded-lg text-left transition-all space-y-1 ${
                selectedMode === 'cloud_sync'
                  ? 'bg-gradient-to-r from-indigo-900/60 to-purple-900/60 border border-indigo-500/60 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400">
                <Cloud className="w-4 h-4 text-indigo-400" />
                <span>2. Đồng Bộ & Lưu Dữ Liệu</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-tight">
                Lưu vào Google Sheet và nhận bản phân tích.
              </p>
            </button>
          </div>

          {/* Guide Card */}
          <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-slate-200">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Quy tắc làm bài nhanh:</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Gồm 40 câu hỏi (20 Điểm mạnh + 20 Điểm yếu). Ở mỗi dòng, chọn <strong>1 từ đúng nhất</strong> theo trực giác đầu tiên của bạn!
            </p>
          </div>

          {/* Tab 1: Local Anonymous (1-click Start) */}
          {selectedMode === 'local_anonymous' ? (
            <div className="space-y-4 pt-1">
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs text-emerald-300 space-y-2">
                <div className="font-bold flex items-center gap-1.5 text-emerald-400 text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Cam Kết Quyền Riêng Tư Tuyệt Đối (Zero Server Egress)</span>
                </div>
                <ul className="list-disc list-inside text-[11px] text-slate-300 space-y-1 leading-relaxed">
                  <li>Không yêu cầu họ tên, email hay số điện thoại.</li>
                  <li>100% phép tính điểm số và biểu đồ diễn ra trực tiếp trên trình duyệt của bạn.</li>
                  <li>Hoàn toàn không có dữ liệu nào được truyền tải về bất kỳ máy chủ nào.</li>
                </ul>
              </div>

              <button
                type="button"
                onClick={handleStartAnonymous}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Bắt Đầu Làm Bài Ngay (Ẩn Danh 100%)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : (
            /* Tab 2: Cloud Sync Form with Decree 13 Highlighting & Consent */
            <form onSubmit={handleSubmitCloudSync} className="space-y-4 pt-1">
              {/* Highlighted Decree 13 Notice Box */}
              <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/40 text-xs text-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Thông Báo Thu Thập Dữ Liệu Theo Nghị Định 13/2023/NĐ-CP</span>
                </div>
                <div className="text-[11px] text-slate-300 space-y-1 leading-relaxed">
                  <p>
                    • <strong>Mục đích:</strong> Lưu trữ kết quả khảo sát tính cách để phục vụ công tác đào tạo, tư vấn phát triển cá nhân và xây dựng đội ngũ.
                  </p>
                  <p>
                    • <strong>Phạm vi dữ liệu:</strong> Họ tên, Email, Chức danh và 40 câu trả lời chi tiết sẽ được lưu vào hệ thống Google Sheet quản trị.
                  </p>
                  <p className="text-slate-400 italic">
                    (Nếu không muốn lưu dữ liệu, bạn có thể chuyển sang tab <strong>1. Ẩn Danh</strong> ở trên để làm bài riêng tư 100%).
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Họ và Tên <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Văn An"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Email (Nhận kết quả)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Chức danh / Số điện thoại
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={phoneOrRole}
                      onChange={(e) => setPhoneOrRole(e.target.value)}
                      placeholder="Ví dụ: Giám đốc / 0912345678"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Decree 13 Mandatory Consent Checkbox */}
              <div className="p-3 bg-slate-800/90 rounded-xl border border-indigo-500/30 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consentNghiDinh13"
                  checked={consentNghiDinh13}
                  onChange={(e) => setConsentNghiDinh13(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-600 focus:ring-indigo-500 focus:ring-offset-slate-900 cursor-pointer"
                />
                <label htmlFor="consentNghiDinh13" className="text-[11px] text-slate-300 leading-relaxed cursor-pointer select-none">
                  <strong className="text-white">Xác nhận đồng ý:</strong> Tôi đã đọc, hiểu rõ và <span className="text-amber-400 font-bold">ĐỒNG Ý</span> cho phép thu thập và xử lý dữ liệu cá nhân của tôi theo quy định của <strong>Nghị định 13/2023/NĐ-CP</strong> để phục vụ mục đích khảo sát và nhận báo cáo tính cách.
                </label>
              </div>

              {error && (
                <p className="text-xs text-rose-400 font-medium">{error}</p>
              )}

              <button
                type="submit"
                disabled={!consentNghiDinh13}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 group"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Bắt Đầu & Đồng Bộ Kết Quả</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
