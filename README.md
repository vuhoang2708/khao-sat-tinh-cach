# Khảo Sát Tính Cách Theo Social Styles (Hồ Sơ Phong Cách Xã Hội 4 Nhóm)

Hệ thống trắc nghiệm và đánh giá phong cách giao tiếp, ra quyết định và thiên hướng hành vi dựa trên **Mô hình Phong cách Xã hội (Social Styles Matrix - Merrill & Reid 1981)**, **Thuyết 4 Khí Chất (Four Temperaments - Hippocrates & Galen / Wilhelm Wundt / Ivan Pavlov)** và công trình **Personality Plus (Florence Littauer 1983)**.

---

## 🌟 4 Nhóm Tính Cách Biểu Trưng

1. 🦚 **Chim Công (Ưa Thể Hiện / Expressive / Sanguine)**: Hoạt bát, sáng tạo, truyền cảm hứng, kết nối rộng và năng lượng cao.
2. 🦅 **Đại Bàng (Ưa Chỉ Đạo / Driver / Choleric)**: Quyết đoán, thực tiễn, hướng tới mục tiêu, tốc độ và bản lĩnh chỉ huy.
3. 🦉 **Chim Cú (Ưa Phân Tích / Analytical / Melancholic)**: Logic, kỷ luật, chi tiết, quy trình chuẩn mực và cầu toàn.
4. 🕊️ **Bồ Câu (Dễ Chịu / Amiable / Phlegmatic)**: Điềm tĩnh, nhẫn nại, biết lắng nghe, đáng tin cậy và tìm kiếm hòa thuận.

---

## 🚀 Tính Năng Nổi Bật

- **40 Câu Hỏi Trắc Nghiệm Chuẩn Hóa**: 20 câu Điểm mạnh + 20 câu Điểm yếu, hoàn thành nhanh trong 3 phút theo trực giác.
- **Kiến Trúc Dual-Mode Thông Minh**:
  - 🛡️ **Chế Độ Ẩn Danh (Local-Only)**: 1-click làm bài ngay, 100% xử lý tại máy khách (Zero Server Egress), không thu thập thông tin cá nhân.
  - ☁️ **Chế Độ Đồng Bộ (Cloud Sync)**: Lưu trữ dữ liệu chi tiết (62 cột) vào Google Sheet trung tâm, tuân thủ nghiêm ngặt **Nghị định 13/2023/NĐ-CP**.
- **Biểu Đồ Radar SVG Trực Quan**: Phân bổ tỷ lệ % và xếp hạng Phong cách Chủ đạo (Dominant) & Phong cách Phụ (Secondary).
- **Phân Tích Chuyên Sâu 3 Chiều**: Đánh giá chi tiết đặc điểm *Cảm Xúc • Công Việc • Bạn Bè & Mối Quan Hệ*.
- **Xuất Báo Cáo PDF A4**: Tải bản in báo cáo phân tích cá nhân hóa lưu trữ về máy.

---

## 🛠️ Công Nghệ Phát Triển (Tech Stack)

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide React.
- **Data Visualization & Export**: Custom SVG Radar Chart, html2canvas, jsPDF.
- **Integration**: Google Sheets API / Webhook (Google Apps Script).
- **Quality Assurance**: Vitest (Unit Tests), Playwright (Browser End-to-End UAT).
- **Deployment**: Vercel Serverless Edge Platform (`https://khao-sat-tinh-cach.vercel.app`).

---

## 📦 Hướng Dẫn Cài Đặt & Chạy Cục Bộ (Local Development)

```bash
# 1. Cài đặt dependencies
npm install

# 2. Chạy môi trường phát triển (Dev server)
npm run dev

# 3. Chạy kiểm thử tự động (Unit Tests)
npm test

# 4. Đóng gói bản build Production
npm run build
```

---

## 📚 Tài Liệu Nghiên Cứu Chuyên Sâu (Docs & Research)

- [Báo Cáo Nghiên Cứu Khoa Học (PDF)](./docs/research/BAO_CAO_NGHIEN_CUU_KHOA_HOC_THUYET_4_KHI_CHAT_VA_SOCIAL_STYLES.pdf)
- [Báo Cáo Nghiên Cứu Khoa Học (Markdown)](./docs/research/research_social_styles_scientific_foundations_20260828.md)
- [Báo Cáo Kiểm Thử Nghiệm Thu (UAT Report)](./UAT/UAT_REPORT.md)
