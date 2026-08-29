import React, { useState } from 'react';
import { 
  BookOpen, 
  Download, 
  ArrowLeft, 
  Sparkles, 
  Award, 
  Brain, 
  Scale, 
  Zap, 
  ShieldAlert, 
  ExternalLink,
  ChevronRight,
  Clock,
  Layers,
  FileText
} from 'lucide-react';

interface ResearchPageProps {
  onBackToSurvey: () => void;
}

export const ResearchPage: React.FC<ResearchPageProps> = ({ onBackToSurvey }) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'timeline' | 'backup' | 'comparison'>('matrix');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10 animate-fadeIn text-slate-100">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <button
          onClick={onBackToSurvey}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-indigo-400" />
          <span>Quay Lại Bài Khảo Sát</span>
        </button>

        <a
          href="/research_report.pdf"
          download="BAO_CAO_NGHIEN_CUU_KHOA_HOC_THUYET_4_KHI_CHAT_VA_SOCIAL_STYLES.pdf"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-500/20 transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Tải Báo Cáo Nghiên Cứu (PDF)</span>
        </a>
      </div>

      {/* Hero Header */}
      <div className="relative overflow-hidden glass-card-glow rounded-3xl p-6 sm:p-10 border border-indigo-500/30 text-center space-y-4">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
            <Brain className="w-4 h-4 text-indigo-400" />
            <span>Tài Liệu Nghiên Cứu Khoa Học & Tâm Lý Học Hàn Lâm</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Thuyết 4 Khí Chất & Mô Hình Phong Cách Xã Hội
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
            Hành trình 2.400 năm tiến hóa từ <strong>Thuyết Thể Dịch Hy Lạp</strong> (Hippocrates & Galen), 
            <strong> Sinh Lý Thần Kinh Thực Nghiệm</strong> (Wundt & Pavlov) đến 
            <strong> Quản Trị Hành Vi Tổ Chức Hiện Đại</strong> (Merrill-Reid & Florence Littauer).
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800">
        <button
          onClick={() => setActiveTab('matrix')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'matrix'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>1. Ma Trận 2 Trục Cốt Lõi</span>
        </button>

        <button
          onClick={() => setActiveTab('timeline')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'timeline'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>2. Tiến Trình Lịch Sử (2.400 Năm)</span>
        </button>

        <button
          onClick={() => setActiveTab('backup')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'backup'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>3. Hành Vi Dưới Áp Lực (Backup)</span>
        </button>

        <button
          onClick={() => setActiveTab('comparison')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'comparison'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>4. Bảng Đối Chiếu Đa Hệ Thống</span>
        </button>
      </div>

      {/* TAB 1: 2-AXIS MATRIX (WUNDT & PAVLOV) */}
      {activeTab === 'matrix' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Ma Trận 2 Trục: Cường Độ Cảm Xúc × Tốc Độ Phản Ứng</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Wilhelm Wundt (1879 - Cha đẻ tâm lý học thực nghiệm) và Ivan Pavlov (Nobel Y học 1904) đã định lượng hóa 4 khí chất dựa trên 2 trục sinh lý thần kinh độc lập:
              </p>
            </div>

            {/* Visual 2x2 Grid Representation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Quadrant 1: Nóng nảy (Đại bàng) */}
              <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">🦅</span>
                    <div>
                      <h3 className="font-bold text-white text-base">Khí Chất NÓNG NẢY</h3>
                      <p className="text-xs text-rose-300 font-semibold">Đại Bàng • Driver (Choleric)</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    Mạnh + Nhanh
                  </span>
                </div>
                <div className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
                  <p>• <strong>Cơ chế thần kinh:</strong> Mạnh — Không cân bằng (Hưng phấn &gt; Ức chế) — Linh hoạt cao.</p>
                  <p>• <strong>Đặc trưng hành vi:</strong> Quyết đoán, độc lập, tốc độ, hướng mục tiêu, khi tức giận bộc phát tức thì.</p>
                  <p>• <strong>Định hướng:</strong> Tell-Assertive + Task-Oriented (Ra lệnh + Công việc).</p>
                </div>
              </div>

              {/* Quadrant 2: Ưu tư (Chim cú) */}
              <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">🦉</span>
                    <div>
                      <h3 className="font-bold text-white text-base">Khí Chất ƯU TƯ</h3>
                      <p className="text-xs text-indigo-300 font-semibold">Chim Cú • Analytical (Melancholic)</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Mạnh/Sâu + Chậm
                  </span>
                </div>
                <div className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
                  <p>• <strong>Cơ chế thần kinh:</strong> Yếu/Nhạy cảm — Ức chế sâu — Kém linh hoạt.</p>
                  <p>• <strong>Đặc trưng hành vi:</strong> Sâu sắc, kỷ luật, chi tiết, cầu toàn, cảm xúc ngấm sâu và nhớ rất dai.</p>
                  <p>• <strong>Định hướng:</strong> Ask-Assertive + Task-Oriented (Hỏi han + Công việc).</p>
                </div>
              </div>

              {/* Quadrant 3: Linh hoạt (Chim công) */}
              <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">🦚</span>
                    <div>
                      <h3 className="font-bold text-white text-base">Khí Chất LINH HOẠT</h3>
                      <p className="text-xs text-amber-300 font-semibold">Chim Công • Expressive (Sanguine)</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Vừa/Yếu + Rất Nhanh
                  </span>
                </div>
                <div className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
                  <p>• <strong>Cơ chế thần kinh:</strong> Mạnh — Cân bằng — Linh hoạt siêu tốc.</p>
                  <p>• <strong>Đặc trưng hành vi:</strong> Hoạt bát, vui tươi, dễ thích nghi, cảm xúc mau đến mau đi, truyền cảm hứng.</p>
                  <p>• <strong>Định hướng:</strong> Tell-Assertive + People-Oriented (Bộc lộ + Con người).</p>
                </div>
              </div>

              {/* Quadrant 4: Bình thản (Bồ câu) */}
              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">🕊️</span>
                    <div>
                      <h3 className="font-bold text-white text-base">Khí Chất BÌNH THẢN</h3>
                      <p className="text-xs text-emerald-300 font-semibold">Bồ Câu • Amiable (Phlegmatic)</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Điềm Đạm + Chậm Rãi
                  </span>
                </div>
                <div className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
                  <p>• <strong>Cơ chế thần kinh:</strong> Mạnh — Cân bằng — Điềm đạm/Ổn định cao.</p>
                  <p>• <strong>Đặc trưng hành vi:</strong> Nhẫn nại, ôn hòa, phẳng lặng trước biến động, lắng nghe tốt, ngại va chạm.</p>
                  <p>• <strong>Định hướng:</strong> Ask-Assertive + People-Oriented (Hỏi han + Con người).</p>
                </div>
              </div>
            </div>
          </div>

          {/* Polar Opposites Analysis */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-indigo-400" />
              <span>Bản Chất Hai Loại Đối Nghịch Trong Tâm Lý Học</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-2">
                <h4 className="font-bold text-indigo-300 text-sm">
                  1. Đối Nghịch Toàn Phần 2 Trục (Diagonal Polar Opposites)
                </h4>
                <p>• <strong>Nóng Nảy (Đại Bàng) ⚔️ Bình Thản (Bồ Câu):</strong> Ngược nhau 100% trên cả 2 trục — <em>Cực mạnh & Cực nhanh</em> đối lập với <em>Cực phẳng & Cực chậm</em>.</p>
                <p>• <strong>Linh Hoạt (Chim Công) ⚔️ Ưu Tư (Chim Cú):</strong> Ngược nhau 100% — <em>Lạc quan, nhanh & nông</em> đối lập với <em>Bi quan, chậm & sâu sắc</em>.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-2">
                <h4 className="font-bold text-amber-300 text-sm">
                  2. Đối Nghịch Hướng Bộc Lộ Hành Vi (External vs. Internal)
                </h4>
                <p>• <strong>Nóng Nảy ⚔️ Ưu Tư:</strong> Cả hai đều có cường độ cảm xúc cực mạnh (dễ bị chi phối nặng nề).</p>
                <p>• Tuy nhiên, <strong>Nóng nảy bộc phát ra ngoài</strong> (tấn công, thét gào, áp đặt), còn <strong>Ưu tư dồn nén vào trong</strong> (dằn vặt, lo âu, thu mình vào góc).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TIMELINE (2.400 YEARS) */}
      {activeTab === 'timeline' && (
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6 animate-fadeIn">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-400" />
              <span>Tiến Trình Phát Triển Lịch Sử (Từ Cổ Đại Đến Hiện Đại)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Mô hình 4 phong cách tính cách đã trải qua quá trình kiểm chứng và hoàn thiện liên tục qua hơn hai thiên niên kỷ:
            </p>
          </div>

          <div className="space-y-4 border-l-2 border-indigo-500/40 pl-4 sm:pl-6 ml-2 sm:ml-4">
            <div className="relative space-y-1">
              <div className="absolute -left-[25px] sm:-left-[33px] top-1 w-4 h-4 rounded-full bg-indigo-500 border-4 border-slate-900" />
              <span className="text-xs font-bold text-amber-400">~460 TCN – 216 SCN</span>
              <h4 className="text-base font-bold text-white">Hippocrates & Claudius Galen (Hy Lạp & La Mã Cổ Đại)</h4>
              <p className="text-xs text-slate-300">
                Khởi xướng Thuyết 4 Thể dịch sinh học (Máu, Mật vàng, Mật đen, Đờm nhầy) tương ứng 4 nguyên tố (Khí, Lửa, Đất, Nước) và chuẩn hóa thành 4 kiểu khí chất cơ bản: Sanguine, Choleric, Melancholic, Phlegmatic.
              </p>
            </div>

            <div className="relative space-y-1 pt-3">
              <div className="absolute -left-[25px] sm:-left-[33px] top-4 w-4 h-4 rounded-full bg-indigo-500 border-4 border-slate-900" />
              <span className="text-xs font-bold text-amber-400">1879</span>
              <h4 className="text-base font-bold text-white">Wilhelm Wundt (Cha Đẻ Tâm Lý Học Thực Nghiệm)</h4>
              <p className="text-xs text-slate-300">
                Chuyển hóa 4 khí chất thể dịch cổ đại thành hệ tọa độ khoa học 2 trục đo lường: Cường độ cảm xúc (Mạnh vs. Yếu) và Tốc độ thay đổi (Nhanh vs. Chậm).
              </p>
            </div>

            <div className="relative space-y-1 pt-3">
              <div className="absolute -left-[25px] sm:-left-[33px] top-4 w-4 h-4 rounded-full bg-indigo-500 border-4 border-slate-900" />
              <span className="text-xs font-bold text-amber-400">1904</span>
              <h4 className="text-base font-bold text-white">Ivan Pavlov (Giải Nobel Y Học)</h4>
              <p className="text-xs text-slate-300">
                Chứng minh cơ sở sinh lý học thần kinh cấp cao của 4 khí chất dựa trên 3 thuộc tính của vỏ não: Cường lực (Strength), Độ cân bằng (Balance) và Độ linh hoạt (Mobility) của quá trình hưng phấn & ức chế.
              </p>
            </div>

            <div className="relative space-y-1 pt-3">
              <div className="absolute -left-[25px] sm:-left-[33px] top-4 w-4 h-4 rounded-full bg-indigo-500 border-4 border-slate-900" />
              <span className="text-xs font-bold text-amber-400">1928</span>
              <h4 className="text-base font-bold text-white">William Moulton Marston (Mô Hình DISC)</h4>
              <p className="text-xs text-slate-300">
                Ứng dụng vào tâm lý học hành vi người bình thường với 4 xu hướng: Dominance (Thống trị), Inducement/Influence (Ảnh hưởng), Submission/Steadiness (Kiên định), Compliance (Tuân thủ).
              </p>
            </div>

            <div className="relative space-y-1 pt-3">
              <div className="absolute -left-[25px] sm:-left-[33px] top-4 w-4 h-4 rounded-full bg-indigo-500 border-4 border-slate-900" />
              <span className="text-xs font-bold text-amber-400">1981</span>
              <h4 className="text-base font-bold text-white">David Merrill & Roger Reid (Social Styles Matrix - TRACOM Group)</h4>
              <p className="text-xs text-slate-300">
                Chuẩn hóa thành Mô hình Phong Cách Xã Hội với 2 trục hành vi quan sát được: Assertiveness (Mức độ khẳng định) và Responsiveness (Mức độ phản hồi cảm xúc) tạo nên: Driver, Expressive, Analytical, Amiable.
              </p>
            </div>

            <div className="relative space-y-1 pt-3">
              <div className="absolute -left-[25px] sm:-left-[33px] top-4 w-4 h-4 rounded-full bg-emerald-500 border-4 border-slate-900" />
              <span className="text-xs font-bold text-emerald-400">1983 – Nay</span>
              <h4 className="text-base font-bold text-white">Florence Littauer (Personality Plus — Gốc Bộ 40 Câu Khảo Sát)</h4>
              <p className="text-xs text-slate-300">
                Chuẩn hóa bảng 40 từ vựng trắc nghiệm (20 Điểm mạnh + 20 Điểm yếu) — chính là nguồn dữ liệu chuẩn mực của bài khảo sát trực tuyến này.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BACKUP BEHAVIORS UNDER STRESS */}
      {activeTab === 'backup' && (
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6 animate-fadeIn">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              <span>Lý Thuyết Về Hành Vi Dự Phòng Dưới Áp Lực (Backup Behaviors)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Nghiên cứu của TRACOM Group chỉ ra rằng khi mức độ căng thẳng tương tác (Interpersonal Tension) vượt ngưỡng chịu đựng, vỏ não trước trán giảm kiểm soát và kích hoạt các phản xạ phòng vệ tiêu cực:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 font-bold text-rose-400">
                <span>🦅 Đại Bàng ➔</span>
                <span className="uppercase text-xs bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/30">
                  AUTOCRATIC (Độc Đoán)
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Có xu hướng áp đặt quyền lực tuyệt đối, ra lệnh ép buộc, coi thường ý kiến của người khác và muốn tự tay kiểm soát mọi thứ.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-400">
                <span>🦚 Chim Công ➔</span>
                <span className="uppercase text-xs bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                  ATTACKING (Công Kích)
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Có xu hướng bộc phát cảm xúc dữ dội, công kích cá nhân, đổ lỗi cho hoàn cảnh hoặc người xung quanh, đóng vai nạn nhân.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-400">
                <span>🕊️ Bồ Câu ➔</span>
                <span className="uppercase text-xs bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                  ACQUIESCING (Cam Chịu Giả Tạo)
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Nói "vâng" bên ngoài nhưng rút lui ngầm bên trong, nhượng bộ tiêu cực, trì hoãn và kháng cự thụ động (passive-aggressive).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 font-bold text-indigo-400">
                <span>🦉 Chim Cú ➔</span>
                <span className="uppercase text-xs bg-indigo-500/20 px-2 py-0.5 rounded border border-indigo-500/30">
                  AVOIDING (Tránh Né / Đóng Băng)
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cắt đứt tương tác, đóng băng giao tiếp, rút sâu vào vỏ ốc và trốn sau những bảng số liệu và quy trình cứng nhắc.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CROSS-TAXONOMY COMPARISON */}
      {activeTab === 'comparison' && (
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6 animate-fadeIn overflow-x-auto">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-indigo-400" />
              <span>Bảng Đối Chiếu Tiến Hóa Đa Hệ Thống (Cross-Taxonomy)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Sự tương đồng chuẩn xác giữa 6 hệ thống phân loại nhân cách và hành vi hàng đầu thế giới:
            </p>
          </div>

          <table className="w-full text-left text-xs border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-800/80 text-white font-bold">
                <th className="p-3">Hệ Thống Phân Loại</th>
                <th className="p-3 text-amber-400">🦚 Nhóm 1</th>
                <th className="p-3 text-rose-400">🦅 Nhóm 2</th>
                <th className="p-3 text-indigo-400">🦉 Nhóm 3</th>
                <th className="p-3 text-emerald-400">🕊️ Nhóm 4</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-white">Tâm Lý Học Việt Nam</td>
                <td className="p-3">Khí chất LINH HOẠT</td>
                <td className="p-3">Khí chất NÓNG NẢY</td>
                <td className="p-3">Khí chất ƯU TƯ</td>
                <td className="p-3">Khí chất BÌNH THẢN</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-white">Hippocrates & Galen</td>
                <td className="p-3">Sanguine (Máu / Khí)</td>
                <td className="p-3">Choleric (Mật vàng / Lửa)</td>
                <td className="p-3">Melancholic (Mật đen / Đất)</td>
                <td className="p-3">Phlegmatic (Đờm / Nước)</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-white">Wilhelm Wundt (1879)</td>
                <td className="p-3">Cường độ vừa + Nhanh</td>
                <td className="p-3">Cường độ mạnh + Nhanh</td>
                <td className="p-3">Cường độ mạnh + Chậm</td>
                <td className="p-3">Cường độ yếu + Chậm</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-white">Mô hình DISC (1928)</td>
                <td className="p-3">I (Influence - Vàng)</td>
                <td className="p-3">D (Dominance - Đỏ)</td>
                <td className="p-3">C (Conscientious - Xanh)</td>
                <td className="p-3">S (Steadiness - Lá)</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-white">Social Styles (1981)</td>
                <td className="p-3">Expressive (Ưa Thể Hiện)</td>
                <td className="p-3">Driver (Ưa Chỉ Đạo)</td>
                <td className="p-3">Analytical (Ưa Phân Tích)</td>
                <td className="p-3">Amiable (Dễ Chịu)</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-white">Personality Plus (1983)</td>
                <td className="p-3">Sanguine Tỏa Sáng</td>
                <td className="p-3">Choleric Quyết Đoán</td>
                <td className="p-3">Melancholy Hoàn Hảo</td>
                <td className="p-3">Phlegmatic Điềm Đạm</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-500/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-white">Sẵn Sàng Khám Phá Phong Cách Của Bản Thân?</h4>
          <p className="text-xs text-slate-300">Trải nghiệm bài trắc nghiệm 40 câu trắc nghiệm nhanh trong 3 phút.</p>
        </div>

        <button
          onClick={onBackToSurvey}
          className="px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/25 transition-all text-xs sm:text-sm flex items-center gap-2"
        >
          <span>Bắt Đầu Khảo Sát Ngay</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
