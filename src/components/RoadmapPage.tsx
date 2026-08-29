import React from 'react';
import { 
  Lightbulb, 
  Users, 
  Bot, 
  Brain, 
  Share2, 
  Smartphone, 
  ArrowLeft, 
  ChevronRight, 
  CheckCircle2, 
  Compass, 
  Sparkles,
  Zap,
  TrendingUp,
  Award,
  Layers,
  BarChart3
} from 'lucide-react';

interface RoadmapPageProps {
  onBackToSurvey: () => void;
  onNavigateToResearch: () => void;
}

export const RoadmapPage: React.FC<RoadmapPageProps> = ({ 
  onBackToSurvey,
  onNavigateToResearch
}) => {
  const pillars = [
    {
      id: 'b2b',
      icon: <Users className="w-6 h-6 text-indigo-400" />,
      tag: 'Trọng Tâm Doanh Nghiệp',
      tagColor: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
      title: '1. Trí Tuệ Đội Ngũ & Bản Đồ Nhiệt B2B (Team Intelligence)',
      desc: 'Nâng cấp từ đánh giá cá nhân đơn lẻ thành công cụ tối ưu hóa cơ cấu nhân sự và giải quyết xung đột phòng ban.',
      features: [
        {
          name: 'Bản Đồ Nhiệt Cân Bằng Đội Ngũ (Team Balance Heatmap)',
          detail: 'Tạo mã phòng ban (Team Code) để nhân viên làm bài. Hệ thống tự động tổng hợp lên Dashboard phân tích tỷ lệ % và cảnh báo mất cân bằng (Ví dụ: Thừa Đại Bàng dễ xung đột quyền lực; Thiếu Chim Cú dễ gặp lỗi quy trình).'
        },
        {
          name: 'Trình Mô Phỏng Tương Tác Cặp Đôi (Pairwise Synergy Simulator)',
          detail: 'Chọn 2 nhân sự bất kỳ (Sếp vs. Nhân viên hoặc 2 Trưởng phòng) để dự báo 3 điểm nghẽn giao tiếp tiềm tàng và gợi ý cẩm nang phối hợp công việc tương thích.'
        }
      ]
    },
    {
      id: 'ai',
      icon: <Bot className="w-6 h-6 text-amber-400" />,
      tag: 'Trí Tuệ Nhân Tạo AI',
      tagColor: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
      title: '2. Trợ Lý Giao Tiếp AI Đồng Hành (AI Copilot & Coach)',
      desc: 'Tích hợp mô hình ngôn ngữ lớn (Gemini / OpenAI) để trở thành huấn luyện viên phong cách ứng xử 24/7.',
      features: [
        {
          name: 'Email & Chat Tone Analyzer (Phân Tích Văn Phong)',
          detail: 'Dán đoạn email/tin nhắn chuẩn bị gửi ➔ AI chấm điểm và gợi ý: "Đoạn này quá áp đặt theo phong cách Đại Bàng, đối tác là nhóm Bồ Câu, bạn nên thêm lời chào hỏi và ghi nhận đóng góp trước...".'
        },
        {
          name: 'Kịch Bản Ứng Xử Tình Huống Cá Nhân Hóa',
          detail: 'Tự động sinh kịch bản đối thoại mẫu cho 5 tình huống nhạy cảm: Xin tăng lương, Giao việc khẩn cấp, Phản hồi khi nhân viên làm sai, Thuyết phục khách hàng khó tính.'
        }
      ]
    },
    {
      id: 'psychometric',
      icon: <Brain className="w-6 h-6 text-emerald-400" />,
      tag: 'Hàn Lâm & Đánh Giá Sâu',
      tagColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
      title: '3. Nâng Cao Độ Sâu Tâm Lý Học & Đánh Giá 360 Độ',
      desc: 'Đưa bài đánh giá đạt chuẩn các công trình nghiên cứu của TRACOM Group, Wilson Learning và Harvard Business Review.',
      features: [
        {
          name: 'Đánh Giá 360 Độ & Phát Hiện Điểm Mù (Blind Spots Matrix)',
          detail: 'Gửi link ẩn danh cho 3 đồng nghiệp đánh giá về bạn để đối chiếu: "Cách bạn tự nhìn nhận bản thân (Self-Image)" vs. "Cách người khác nhìn nhận bạn (Perceived Behavior)".'
        },
        {
          name: 'Đo Lường Chỉ Số Linh Hoạt Hành Vi (Versatility Index)',
          detail: 'Bổ sung 6-8 câu hỏi tình huống thực tế để đo lường khả năng biến chuyển phong cách (Style Flexing) khi làm việc với các nhóm tính cách đối lập.'
        },
        {
          name: 'Đồ Thị Tọa Độ 2D Descartes (Cartesian Scatter Plot)',
          detail: 'Vẽ điểm tọa độ chính xác của cá nhân trên 2 trục: Task vs. People và Tell vs. Ask để xác định tỷ lệ lai (Blend Ratio).'
        }
      ]
    },
    {
      id: 'viral',
      icon: <Share2 className="w-6 h-6 text-rose-400" />,
      tag: 'Thương Mại & Lan Truyền',
      tagColor: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
      title: '4. Thương Mại Hóa & Lan Truyền Mạng Xã Hội (Viral Growth)',
      desc: 'Tối ưu hóa khả năng chia sẻ tự nhiên trên mạng xã hội và cung cấp gói B2B White-Label cho chuyên gia đào tạo.',
      features: [
        {
          name: 'Social Share Cards (Thẻ Kết Quả Đẹp Mắt)',
          detail: 'Tự động tạo ảnh vuông / Story (1080x1920) hiển thị linh vật loài chim của họ kèm mã QR để dễ dàng khoe lên Facebook, Zalo, LinkedIn, tạo hiệu ứng lan truyền tự nhiên.'
        },
        {
          name: 'Giải Pháp Nhãn Trắng Doanh Nghiệp (B2B White-Label)',
          detail: 'Cho phép Giảng viên, Chuyên gia Đào tạo, Công ty Tư vấn gắn Logo, màu sắc thương hiệu và xuất báo cáo PDF đóng dấu bản quyền của họ.'
        }
      ]
    },
    {
      id: 'mobile',
      icon: <Smartphone className="w-6 h-6 text-teal-400" />,
      tag: 'Nền Tảng & Offline',
      tagColor: 'bg-teal-500/10 text-teal-300 border-teal-500/20',
      title: '5. Ứng Dụng Di Động PWA & Kho Hồ Sơ Cục Bộ (Encrypted Vault)',
      desc: 'Trải nghiệm mượt mà không phụ thuộc internet và bảo mật tuyệt đối cho nhà tuyển dụng.',
      features: [
        {
          name: 'Progressive Web App (PWA Mobile)',
          detail: 'Cài đặt trực tiếp lên màn hình điện thoại iPhone/Android như một app Native chỉ với 1 click, hoạt động 100% khi mất mạng internet.'
        },
        {
          name: 'Kho Lưu Trữ Ứng Viên Cục Bộ (Candidate Vault)',
          detail: 'Cho phép nhà tuyển dụng/quản lý lưu trữ và đối chiếu hồ sơ của 20-50 ứng viên ngay trong trình duyệt máy tính mà không lo rò rỉ dữ liệu lên mạng.'
        }
      ]
    }
  ];

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

        <button
          onClick={onNavigateToResearch}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-indigo-300 bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-500/30 transition-all"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Xem Cơ Sở Nghiên Cứu Khoa Học</span>
        </button>
      </div>

      {/* Hero Header */}
      <div className="relative overflow-hidden glass-card-glow rounded-3xl p-6 sm:p-10 border border-indigo-500/30 text-center space-y-4">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Kế Hoạch Mở Rộng & Chiến Lược Sản Phẩm 2026</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            5 Hướng Phát Triển Tiềm Năng
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
            Định hướng phát triển từ một <strong>Công cụ trắc nghiệm cá nhân</strong> thành một 
            <strong> Nền Tảng Quản Trị Hành Vi & Trí Tuệ Đội Ngũ Toàn Diện (Enterprise Team Intelligence Platform)</strong>.
          </p>
        </div>
      </div>

      {/* 5 Pillars Grid */}
      <div className="space-y-6">
        {pillars.map((pillar, idx) => (
          <div 
            key={pillar.id}
            className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-5 hover:border-slate-700 transition-all"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 shadow-inner">
                  {pillar.icon}
                </div>
                <div>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${pillar.tagColor}`}>
                    {pillar.tag}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                    {pillar.title}
                  </h3>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {pillar.desc}
            </p>

            {/* Features Sub-Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {pillar.features.map((feat, fIdx) => (
                <div 
                  key={fIdx}
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1.5"
                >
                  <h4 className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <span>{feat.name}</span>
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed pl-5">
                    {feat.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Roadmap Phasing Timeline Card */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-amber-400" />
          <span>Lộ Trình Triển Khai Đề Xuất (Phased Roadmap)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-500/30 space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400">Giai Đoạn 1</span>
            <h4 className="font-bold text-white text-sm">Trải Nghiệm & Lan Truyền</h4>
            <p className="text-slate-400 text-[11px]">
              • Thẻ chia sẻ mạng xã hội (Share Cards)<br />
              • PWA Mobile (Chạy offline 100%)
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">Giai Đoạn 2</span>
            <h4 className="font-bold text-white text-sm">Độ Sâu Đánh Giá</h4>
            <p className="text-slate-400 text-[11px]">
              • Đồ thị tọa độ 2D Descartes<br />
              • Chỉ số Linh hoạt (Versatility Index)<br />
              • Kịch bản ứng xử tình huống
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">Giai Đoạn 3</span>
            <h4 className="font-bold text-white text-sm">Trí Tuệ Đội Ngũ (B2B)</h4>
            <p className="text-slate-400 text-[11px]">
              • Mã phòng ban khảo sát nhóm<br />
              • Bản đồ nhiệt Đội ngũ (Heatmap)<br />
              • Mô phỏng tương tác cặp đôi
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-purple-500/30 space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-400">Giai Đoạn 4</span>
            <h4 className="font-bold text-white text-sm">AI Copilot & B2B</h4>
            <p className="text-slate-400 text-[11px]">
              • Trợ lý phân tích văn phong AI<br />
              • Gói Nhãn Trắng (White-label) cho chuyên gia đào tạo
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-500/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-white">Bạn Muốn Đóng Góp Ý Kiến Cho Lộ Trình Phát Triển?</h4>
          <p className="text-xs text-slate-300">Trải nghiệm bài khảo sát và chia sẻ cảm nghĩ của bạn với đội ngũ phát triển.</p>
        </div>

        <button
          onClick={onBackToSurvey}
          className="px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/25 transition-all text-xs sm:text-sm flex items-center gap-2"
        >
          <span>Trải Nghiệm Khảo Sát Ngay</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
