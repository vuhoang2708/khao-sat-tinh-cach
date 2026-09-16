# CHUẨN MỰC LẬP TRÌNH & QUY ƯỚC MÃ NGUỒN (CODE STANDARDS)

- **Dự án**: Khảo Sát Tính Cách Theo Social Styles
- **Ngôn ngữ**: TypeScript 5, React 18
- **Cập nhật ngày**: 16/09/2026

---

## 1. Nguyên Tắc Lập Trình Cốt Lõi (Core Principles)

1. **KISS (Keep It Simple, Stupid)**: Ưu tiên mã nguồn đơn giản, dễ đọc, cấu trúc tường minh hơn là các kỹ thuật trừu tượng hóa phức tạp không cần thiết.
2. **YAGNI (You Aren't Gonna Need It)**: Chỉ xây dựng các tính năng và kiểu dữ liệu phục vụ yêu cầu hiện tại, không phỏng đoán các tầng logic viển vông.
3. **DRY (Don't Repeat Yourself)**: Tái sử dụng các hằng số màu sắc, kiểu dữ liệu và hàm tính toán logic qua các module dùng chung (`types/`, `data/`, `engine/`).
4. **Local-First & Privacy-by-Default**: Mọi xử lý dữ liệu ưu tiên thực hiện tại máy khách; chỉ kết nối dịch vụ ngoài khi có sự phê duyệt rõ ràng từ người dùng.

---

## 2. Quy Ước TypeScript (TypeScript Guidelines)

- **Bắt buộc định kiểu nghiêm ngặt (Strict Typing)**: Tuyệt đối không sử dụng kiểu `any`. Mọi props, state, tham số hàm và giá trị trả về đều phải có type hoặc interface rõ ràng.
- **Tập trung hóa Types**: Toàn bộ định nghĩa dữ liệu nghiệp vụ phải được đặt trong `src/types/personality.ts`.
- **Sử dụng Union Types tường minh**:
  ```typescript
  // Đúng
  export type SocialStyle = 'peacock' | 'eagle' | 'owl' | 'dove';
  export type AssessmentMode = 'local_anonymous' | 'cloud_sync';
  
  // Tránh
  export type Style = string;
  ```

---

## 3. Quy Ước Thành Phần Giao Diện React (React Component Standards)

- **Sử dụng Functional Components & Hooks**: Viết component dưới dạng `React.FC<Props>` kèm interface định nghĩa props tường minh.
- **Phân tách trách nhiệm (Separation of Concerns)**:
  - Component hiển thị (Presentation): Chỉ nhận props và render UI (ví dụ: `RadarChart.tsx`, `ProgressBar.tsx`).
  - Container / Coordinator: Xử lý logic nghiệp vụ và điều phối state (ví dụ: `App.tsx`, `PersonalityReport.tsx`).
- **Đặt tên tệp và Component**:
  - Tên tệp component: Viết hoa chữ cái đầu theo chuẩn `PascalCase` (ví dụ: `QuestionCard.tsx`, `ResearchPage.tsx`).
  - Tên tệp logic / tiện ích: Viết thường theo chuẩn `camelCase` (ví dụ: `scoringEngine.ts`, `pdfExport.ts`).

---

## 4. Quy Chuẩn Tiếng Việt & Bộ Từ Vựng Học Thuật (Vietnamese Orthography & Terminology)

1. **Bộ mã UTF-8 tuyệt đối**: Mọi tệp nguồn, chú thích và chuỗi giao diện phải được lưu trữ và đọc bằng chuẩn `UTF-8`.
2. **Bộ từ vựng chuẩn hóa 4 nhóm phong cách**:
   - 🦚 **Chim Công — Ưa Thể Hiện** (*Expressive / Sanguine*) — Thuộc tính: Khí chất Linh hoạt.
   - 🦅 **Đại Bàng — Ưa Chỉ Đạo** (*Driver / Choleric*) — Thuộc tính: Khí chất Nóng nảy.
   - 🦉 **Chim Cú — Ưa Phân Tích** (*Analytical / Melancholic*) — Thuộc tính: Khí chất Ưu tư.
   - 🕊️ **Bồ Câu — Dễ Chịu** (*Amiable / Phlegmatic*) — Thuộc tính: Khí chất Bình thản.
3. **Quy tắc chính tả đã được hiệu đính**:
   - Dùng **`Chung thủy`** (không viết sai thành `Trung thủy`).
   - Dùng **`Đãng trí`** (không viết sai thành `Đãng chí`).
   - Dùng **`Bặt thiệp`** / **`Bạt thiệp`** cho phong cách giao thiệp khéo léo.

---

## 5. Quy Chuẩn Kiểm Thử Tự Động (Testing Standards)

- **Unit Tests với Vitest**: Mọi logic cốt lõi (đặc biệt là `scoringEngine.ts`) phải có bài test bao phủ các kịch bản:
  - Tính điểm chính xác cho từng phong cách khi chọn 40 câu thuần nhất.
  - Xử lý phân bổ tỷ lệ phần trăm chuẩn xác (tổng luôn bằng 100%).
  - Kiểm thử thuật toán giải quyết hòa điểm (Tie-breaking) dựa trên điểm thế mạnh.
  - Kiểm thử cả 2 chế độ `local_anonymous` và `cloud_sync`.
- Lệnh chạy kiểm thử:
  ```bash
  npm test
  ```
