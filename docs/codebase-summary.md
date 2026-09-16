# TỔNG QUAN CẤU TRÚC MÃ NGUỒN (CODEBASE SUMMARY)

- **Dự án**: Khảo Sát Tính Cách Theo Social Styles
- **Ngôn ngữ chính**: TypeScript (100%), React 18
- **Công cụ đóng gói**: Vite 5
- **Framework CSS**: Tailwind CSS 3
- **Cập nhật ngày**: 16/09/2026

---

## 1. Sơ Đồ Cấu Trúc Thư Mục (Directory Tree)

```text
khao-sat-tinh-cach/
├── index.html                      # Tệp HTML gốc (Root Template)
├── package.json                    # Cấu hình dependencies & scripts
├── tsconfig.json                   # Cấu hình TypeScript compiler
├── vite.config.ts                  # Cấu hình Vite build & Vitest
├── tailwind.config.js              # Cấu hình Tailwind theme & animations
├── postcss.config.js               # Cấu hình PostCSS & Autoprefixer
├── vercel.json                     # Cấu hình định tuyến & headers Vercel
├── README.md                       # Tài liệu giới thiệu nhanh dự án
├── run_browser_uat.py              # Kịch bản kiểm thử tự động hóa Playwright E2E
│
├── public/                         # Tài nguyên tĩnh phục vụ trực tiếp qua HTTP
│   ├── research_report.pdf         # Báo cáo nghiên cứu khoa học PDF (Tải trực tiếp)
│   └── research_report.docx        # Báo cáo nghiên cứu khoa học Word
│
├── docs/                           # Kho tài liệu kỹ thuật & nghiệp vụ
│   ├── project-overview-pdr.md     # Tài liệu tổng quan & yêu cầu sản phẩm
│   ├── codebase-summary.md         # (Tệp hiện tại) Tổng quan cấu trúc mã nguồn
│   ├── system-architecture.md      # Kiến trúc hệ thống & Luồng dữ liệu
│   ├── code-standards.md           # Chuẩn mực viết mã & quy ước
│   ├── project-roadmap.md          # Lộ trình phát triển sản phẩm
│   ├── deployment-guide.md         # Hướng dẫn triển khai & vận hành
│   ├── design-guidelines.md        # Hướng dẫn thiết kế UI/UX
│   └── research/                   # Các tài liệu nghiên cứu học thuật chuyên sâu
│       ├── BAO_CAO_NGHIEN_CUU_KHOA_HOC_THUYET_4_KHI_CHAT_VA_SOCIAL_STYLES.pdf
│       ├── BAO_CAO_NGHIEN_CUU_KHOA_HOC_THUYET_4_KHI_CHAT_VA_SOCIAL_STYLES.docx
│       ├── research_social_styles_scientific_foundations_20260828.md
│       └── RESEARCH_APPLICATION_GROWTH_DIRECTIONS_2026.md
│
├── src/                            # Mã nguồn ứng dụng React
│   ├── main.tsx                    # Điểm khởi động ứng dụng (Application Entry)
│   ├── App.tsx                     # Điều phối State chính & Định tuyến Hash
│   ├── index.css                   # Định nghĩa CSS toàn cục & hiệu ứng Glassmorphism
│   │
│   ├── types/
│   │   └── personality.ts          # Định nghĩa TypeScript Interfaces & Types
│   │
│   ├── data/
│   │   ├── questions40.ts          # Bộ dữ liệu chuẩn 40 câu hỏi trắc nghiệm
│   │   └── styleProfiles.ts        # Dữ liệu mô tả chi tiết 4 nhóm phong cách
│   │
│   ├── engine/
│   │   └── scoringEngine.ts        # Động cơ tính điểm & xếp hạng phong cách
│   │
│   ├── utils/
│   │   ├── webhook.ts              # Xử lý gửi dữ liệu đồng bộ Google Sheet
│   │   └── pdfExport.ts            # Xử lý kết xuất tệp PDF qua html2canvas & jsPDF
│   │
│   └── components/                 # Các thành phần giao diện (UI Components)
│       ├── Header.tsx              # Thanh điều hướng đầu trang (Logo, Tiến độ, Tabs)
│       ├── OnboardingModal.tsx     # Hộp thoại chọn chế độ làm bài & thỏa thuận NĐ 13
│       ├── ProgressBar.tsx         # Thanh tiến độ và chỉ mục câu hỏi (1-40)
│       ├── QuestionCard.tsx        # Thẻ hiển thị câu hỏi và 4 lựa chọn
│       ├── RadarChart.tsx          # Biểu đồ mạng nhện SVG biểu diễn 4 trục
│       ├── StyleDeepDive.tsx       # Phân tích sâu 3 chiều (Cảm xúc, Công việc, Bạn bè)
│       ├── PersonalityReport.tsx   # Toàn bộ màn hình báo cáo kết quả đánh giá
│       ├── PDFExportView.tsx       # Mẫu giao diện tối ưu hóa cho xuất PDF A4
│       ├── ResearchPage.tsx        # Trang nghiên cứu khoa học & thuyết 4 khí chất
│       └── RoadmapPage.tsx         # Trang ý tưởng phát triển & 5 trụ cột mở rộng
│
├── tests/                          # Bộ kiểm thử đơn vị tự động (Unit Tests)
│   └── scoringEngine.test.ts       # Kiểm thử động cơ tính điểm & xếp hạng
│
└── UAT/                            # Tài liệu kiểm thử nghiệm thu người dùng
    ├── UAT_REPORT.md               # Báo cáo kết quả kiểm thử Playwright
    └── screenshots/                # 11 ảnh chụp màn hình kiểm thử thực tế
```

---

## 2. Chi Tiết Vai Trò Của Các Tệp Trọng Yếu

### 2.1. Quản lý trạng thái & Điều hướng (`src/App.tsx`)
- Giữ các trạng thái chính: `currentView` (`'survey' | 'research' | 'roadmap'`), `userProfile`, `answersMap`, `result`, `isCompleted`.
- Lắng nghe sự kiện thay đổi hash của trình duyệt (`window.location.hash`) để hỗ trợ truy cập trực tiếp các URL:
  - `https://khao-sat-tinh-cach.vercel.app/` ➔ Màn hình Khảo sát.
  - `https://khao-sat-tinh-cach.vercel.app/#research` ➔ Màn hình Nghiên cứu Khoa học.
  - `https://khao-sat-tinh-cach.vercel.app/#roadmap` ➔ Màn hình Ý tưởng Phát triển.
- Tự động đồng bộ hóa tiến độ và kết quả làm bài vào `localStorage`.

### 2.2. Động cơ tính điểm (`src/engine/scoringEngine.ts`)
- Tiếp nhận bảng câu trả lời `answersMap: Record<number, SocialStyle>`.
- Đếm số lượt chọn của 4 phong cách (`peacock`, `eagle`, `owl`, `dove`) chia theo:
  - Điểm mạnh (Câu 1 – 20).
  - Điểm yếu (Câu 21 – 40).
  - Tổng điểm và Tỷ lệ phần trăm trên thang 40.
- Sắp xếp và xác định Phong cách Chủ đạo (Dominant) và Phong cách Thứ cấp (Secondary).
- Áp dụng thuật toán giải quyết hòa điểm (Tie-breaking): Nhóm nào có điểm Điểm mạnh cao hơn sẽ được ưu tiên xếp trên.

### 2.3. Tích hợp Webhook & Google Sheets (`src/utils/webhook.ts`)
- Xây dựng payload chuẩn 62 cột để gửi tới Google Apps Script Webhook:
  - `Timestamp`: Thời gian nộp bài chuẩn ISO.
  - `Full Name`, `Email`, `Phone / Role`, `Mode`: Thông tin định danh.
  - `Dominant Style`, `Dominant Score`, `Secondary Style`, `Secondary Score`: Kết quả cốt lõi.
  - 8 cột chi tiết điểm tổng và tỷ lệ % của 4 phong cách.
  - 8 cột phân rã điểm mạnh / điểm yếu.
  - **40 cột chi tiết câu trả lời từ Q1 đến Q40**: Lưu trọn vẹn từng lựa chọn của người dùng, phục vụ phân tích dữ liệu chuyên sâu.
- Cơ chế gửi: Sử dụng `fetch` với `mode: 'no-cors'` để vượt qua rào cản CORS của Google Apps Script một cách mượt mà và an toàn.

---

## 3. Hệ Thống Kiểu Dữ Liệu Cốt Lõi (`src/types/personality.ts`)

```typescript
export type SocialStyle = 'peacock' | 'eagle' | 'owl' | 'dove';
export type AssessmentMode = 'local_anonymous' | 'cloud_sync';
export type QuestionSection = 'strength' | 'weakness';

export interface UserProfile {
  fullName: string;
  email: string;
  phoneOrRole: string;
  mode: AssessmentMode;
}

export interface StyleScore {
  style: SocialStyle;
  rawScore: number;
  percentage: number;
  strengthScore: number;
  weaknessScore: number;
}

export interface AssessmentResult {
  scores: Record<SocialStyle, StyleScore>;
  dominantStyle: SocialStyle;
  secondaryStyle: SocialStyle;
  answers: Record<number, SocialStyle>;
  userProfile: UserProfile;
  completedAt: string;
}
```
