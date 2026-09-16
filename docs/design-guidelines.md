# HƯỚNG DẪN THIẾT KẾ GIAO DIỆN & TRẢI NGHIỆM NGƯỜI DÙNG (DESIGN GUIDELINES)

- **Dự án**: Khảo Sát Tính Cách Theo Social Styles
- **Phong cách thiết kế**: Tối giản Hiện đại (Modern Minimalist) • Kính Mờ (Glassmorphism) • Chủ Đề Tối (Dark Theme)
- **Cập nhật ngày**: 16/09/2026

---

## 1. Triết Lý Thiết Kế (Design Philosophy)

1. **Tập Trung Tuyệt Đối (Cognitive Ease)**: Tránh gây phân tán tư tưởng trong quá trình làm bài trắc nghiệm. Giao diện câu hỏi chỉ hiển thị 4 lựa chọn với kích thước chạm lớn, tương phản rõ nét.
2. **Hình Tượng Hóa Sinh Động (Animal Metaphors)**: Sử dụng 4 biểu tượng loài chim quen thuộc (Chim Công, Đại Bàng, Chim Cú, Bồ Câu) để giúp người dùng ghi nhớ phong cách của mình và đồng nghiệp một cách tự nhiên.
3. **Hiệu Ứng Kính Mờ & Chiều Sâu (Glassmorphism & Depth)**: Sử dụng nền tối sâu (`bg-slate-950`), kết hợp thẻ kính mờ bán trong suốt (`backdrop-blur-md`, viền `border-slate-800`), tạo cảm giác sang trọng và chuyên nghiệp.

---

## 2. Hệ Thống Màu Sắc & Nhận Diện 4 Nhóm Phong Cách (Color System)

| Phong Cách | Linh Vật | Mã Màu Chủ Đạo | Lớp Màu Tailwind | Ý Nghĩa Tâm Lý |
| :--- | :---: | :---: | :--- | :--- |
| **Chim Công (Expressive)** | 🦚 | `#F59E0B` | `amber-500` / `amber-400` | Sáng tạo, rực rỡ, lạc quan, kết nối |
| **Đại Bàng (Driver)** | 🦅 | `#EF4444` | `rose-500` / `red-500` | Quyết liệt, mục tiêu, dũng mãnh, tốc độ |
| **Chim Cú (Analytical)** | 🦉 | `#6366F1` | `indigo-500` / `blue-500` | Trí tuệ, kỷ luật, logic, chuẩn mực |
| **Bồ Câu (Amiable)** | 🕊️ | `#10B981` | `emerald-500` / `teal-500` | Hòa thuận, điềm tĩnh, nhẫn nại, hòa giải |

### Màu Nền & Màu Trung Tính:
- **Nền chính (Background)**: `bg-slate-950` (`#020617`).
- **Nền phụ / Thẻ (Card Background)**: `bg-slate-900/80` hoặc `bg-slate-900/60`.
- **Đường viền (Border)**: `border-slate-800` (`#1E293B`) hoặc `border-slate-700/60`.
- **Chữ chính (Primary Text)**: `text-white` (`#FFFFFF`) hoặc `text-slate-100`.
- **Chữ phụ (Secondary Text)**: `text-slate-400` (`#94A3B8`) hoặc `text-slate-300`.

---

## 3. Kiểu Chữ & Cấu Trúc Thứ Bậc (Typography & Hierarchy)

- **Phông chữ**: Hệ phông Sans-serif mặc định hiện đại (`system-ui`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, `sans-serif`).
- **Thứ bậc tiêu đề (Heading Hierarchy)**:
  - `H1` (Tiêu đề chính màn hình): `text-2xl sm:text-4xl font-black text-white tracking-tight`.
  - `H2` (Tiêu đề phân mục): `text-xl sm:text-2xl font-bold text-white`.
  - `H3` (Tiêu đề thẻ / Card title): `text-base sm:text-lg font-bold text-white`.
  - `Body` (Văn bản nội dung): `text-xs sm:text-sm text-slate-300 leading-relaxed`.
  - `Caption / Badge`: `text-[10px] sm:text-xs font-semibold tracking-wide`.

---

## 4. Thành Phần Tương Tác & Vi Hiệu Ứng (Micro-interactions)

- **Tự động chuyển câu (Auto-advance)**: Khi người dùng bấm chọn 1 trong 4 lựa chọn, hệ thống tạo hiệu ứng viền phát sáng (Glow border) và chuyển câu tiếp theo mượt mà sau `250ms`.
- **Thanh tiến độ (Progress Bar)**:
  - Hiển thị tỷ lệ % đã hoàn thành.
  - Cung cấp lưới 40 nút tròn đánh dấu trạng thái: Đã trả lời (màu tím sáng), Chưa trả lời (màu xám tối) và Câu hiện tại (viền phát sáng).
  - Cho phép bấm vào bất kỳ câu nào để nhảy trực tiếp tới câu đó (*Jump-to-question*).

---

## 5. Khả Năng Truy Cập & Tương Thích Thiết Bị (Accessibility & Responsiveness)

- **Chuẩn trợ năng WCAG 2.1 AA**: Mọi văn bản đều đạt tỷ lệ tương phản tối thiểu `4.5:1` so với nền tối.
- **Khu vực chạm cảm ứng trên di động (Mobile Touch Targets)**: Tất cả các nút bấm và ô lựa chọn đều có chiều cao tối thiểu `44px` theo tiêu chuẩn Apple Human Interface Guidelines.
- **Breakpoints chuẩn Tailwind CSS**:
  - `sm`: 640px (Điện thoại màn hình lớn).
  - `md`: 768px (Máy tính bảng / Tablet).
  - `lg`: 1024px (Laptop).
  - `xl`: 1280px (Desktop màn hình rộng).
