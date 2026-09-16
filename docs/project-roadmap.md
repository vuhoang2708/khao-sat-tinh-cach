# LỘ TRÌNH PHÁT TRIỂN SẢN PHẨM (PROJECT ROADMAP)

- **Dự án**: Khảo Sát Tính Cách Theo Social Styles
- **Phiên bản hiện tại**: v1.2.0 (Phase 1 Complete)
- **Cập nhật ngày**: 16/09/2026

---

## 1. Tổng Quan Lộ Trình Phát Triển (Roadmap Overview)

```text
[PHASE 1: NỀN TẢNG CỐT LÕI]  ──►  [PHASE 2: ĐỘ SÂU & LAN TRUYỀN]  ──►  [PHASE 3: B2B ĐỘI NGŨ]  ──►  [PHASE 4: AI & WHITE-LABEL]
      (HOÀN THÀNH 100%)                  (KẾ HOẠCH TIẾP THEO)             (TRỌNG TÂM DOANH NGHIỆP)          (HỆ SINH THÁI CAO CẤP)
  • 40 câu hỏi trắc nghiệm           • Thẻ chia sẻ MXH (Share Card)     • Mã phòng ban (Team Code)        • AI Tone Analyzer
  • Dual-Mode (Nghị định 13)         • PWA Mobile (Cài đặt offline)     • Bản đồ nhiệt Đội ngũ (Heatmap)  • Kịch bản đối thoại AI
  • Biểu đồ Radar + Xuất PDF         • Đồ thị tọa độ 2D Descartes       • Mô phỏng tương tác cặp đôi      • Gói Nhãn Trắng B2B
  • Trang Nghiên cứu & Ý tưởng       • Chỉ số Linh hoạt (Versatility)   • Dashboard Quản trị viên         • Tích hợp HRMS / LMS
```

---

## 2. Chi Tiết Các Giai Đoạn Triển Khai

### 🚀 Giai Đoạn 1: Hoàn Thiện Nền Tảng Cốt Lõi (ĐÃ HOÀN THÀNH ✅)
- [x] Số hóa trọn vẹn bộ 40 câu hỏi từ vựng trắc nghiệm của Florence Littauer.
- [x] Xây dựng động cơ tính điểm 4 nhóm (`scoringEngine.ts`) kèm giải quyết hòa điểm.
- [x] Thiết kế kiến trúc Dual-Mode: Chế độ Ẩn danh 1-click & Chế độ Đồng bộ Google Sheet.
- [x] Tích hợp hộp thoại thông báo và checkbox xác nhận đồng ý theo **Nghị định 13/2023/NĐ-CP**.
- [x] Xây dựng biểu đồ mạng nhện Radar SVG và phân tích chuyên sâu 3 chiều.
- [x] Tích hợp tính năng chụp và xuất báo cáo PDF chuẩn in ấn A4 tại máy khách.
- [x] Xây dựng cổng thông tin Nghiên cứu Khoa học 2.400 năm (`#research`) và tải PDF tài liệu.
- [x] Xây dựng cổng thông tin Ý tưởng Phát triển (`#roadmap`).
- [x] Triển khai lên Vercel Production (`https://khao-sat-tinh-cach.vercel.app`).

---

### 🎨 Giai Đoạn 2: Trải Nghiệm Người Dùng & Lan Truyền Mạng Xã Hội (Ưu Tiên 1)
- [ ] **Thẻ Chia Sẻ Mạng Xã Hội (Social Share Cards)**:
  - Tự động sinh ảnh vuông (1080x1080) và ảnh Story (1080x1920) hiển thị linh vật loài chim đại diện, điểm số nổi bật và mã QR dẫn về bài test để người dùng chia sẻ lên Zalo/Facebook.
- [ ] **Progressive Web App (PWA)**:
  - Bổ sung `manifest.json` và Service Worker để người dùng có thể "Thêm vào màn hình chính" trên iPhone/Android, chạy ngoại tuyến 100% khi mất mạng.
- [ ] **Đồ Thị Tọa Độ 2D Descartes (Cartesian Scatter Plot)**:
  - Biểu diễn vị trí chính xác của người làm bài trên hệ trục $X$ (*Task vs. People*) và $Y$ (*Tell vs. Ask*) để trực quan hóa mức độ lai phong cách.
- [ ] **Mô-đun Đo Lường Chỉ Số Linh Hoạt (Versatility Index)**:
  - Bổ sung 6-8 câu hỏi tình huống thực tế để đo lường khả năng biến chuyển phong cách (*Style Flexing*) khi tương tác với nhóm đối nghịch.

---

### 🏢 Giai Đoạn 3: Trí Tuệ Đội Ngũ & Giải Pháp B2B (Ưu Tiên 2)
- [ ] **Mã Phòng Ban / Khảo Sát Nhóm (Team Code Assessment)**:
  - Cho phép người quản trị tạo mã (ví dụ: `SALES_2026`). Các thành viên nhập mã này khi làm bài.
- [ ] **Bản Đồ Nhiệt Cân Bằng Đội Ngũ (Team Balance Heatmap)**:
  - Dashboard tổng hợp tỷ lệ phân bổ của phòng ban, tự động đưa ra khuyến nghị cơ cấu (ví dụ: Cảnh báo thừa Đại Bàng gây xung đột quyền lực; thiếu Chim Cú gây lỗi vận hành).
- [ ] **Trình Mô Phỏng Tương Tác Cặp Đôi (Pairwise Synergy Simulator)**:
  - Cho phép chọn 2 thành viên để đối chiếu: Dự báo 3 điểm nghẽn giao tiếp tiềm tàng và gợi ý cẩm nang phối hợp công việc.
- [ ] **Kho Lưu Trữ Ứng Viên Cục Bộ (Candidate Vault)**:
  - Cho phép nhà tuyển dụng lưu trữ và so sánh hồ sơ của nhiều ứng viên ngay trên trình duyệt mà không sợ rò rỉ dữ liệu.

---

### 🤖 Giai Đoạn 4: Trí Tuệ Nhân Tạo AI & Nhãn Trắng Doanh Nghiệp (Ưu Tiên 3)
- [ ] **Trợ Lý Giao Tiếp AI 24/7 (AI Communication Copilot)**:
  - Tích hợp mô hình ngôn ngữ lớn (Gemini Flash API).
  - Phân tích văn phong email/tin nhắn trước khi gửi để tối ưu hóa theo phong cách của đối tác.
  - Sinh kịch bản đàm phán, giao việc và giải quyết xung đột cá nhân hóa.
- [ ] **Đánh Giá 360 Độ (Peer & Manager Perception Matrix)**:
  - Cho phép gửi link ẩn danh cho 3 đồng nghiệp đánh giá để đối chiếu: *Cách bạn tự nhìn nhận bản thân* vs. *Cách người khác nhìn nhận bạn*, giúp tìm ra Điểm Mù (*Blind Spots*).
- [ ] **Giải Pháp Nhãn Trắng Doanh Nghiệp (B2B White-Label)**:
  - Cho phép các Chuyên gia Đào tạo, Diễn giả gắn Logo thương hiệu và xuất báo cáo PDF đóng dấu bản quyền của họ.
