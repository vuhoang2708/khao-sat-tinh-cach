# BÁO CÁO KIỂM THỬ NGHIỆM THU (UAT REPORT)
## DỰ ÁN: HỒ SƠ PHONG CÁCH XÃ HỘI & ĐÁNH GIÁ TÍNH CÁCH 4 NHÓM (DUAL-MODE PRIVACY & CLOUD SYNC)

- **Thời gian cập nhật**: 2026-08-28 18:10:00 (GMT+7)
- **Môi trường kiểm thử**: Live Production URL (`https://khao-sat-tinh-cach.vercel.app`)
- **Công cụ kiểm thử**: Playwright Automation + Headless Chromium (Viewport 1440x900)
- **Kết quả tổng quan**: **100% PASS (0 Console Errors, 0 Page Errors)**

---

### 1. Các Chế Độ Vận Hành (Dual-Mode Architecture)

1. 🛡️ **Chế Độ Ẩn Danh (Local-Only / 100% Xử Lý Tại Chỗ)**:
   - **Đặc tính**: Không thu thập thông tin cá nhân (Họ tên, Email, SĐT), không gọi bất kỳ Webhook nào, 100% phép tính điểm và vẽ biểu đồ diễn ra tức thì trên trình duyệt người dùng.
   - **Xác thực UAT**: Bấm bắt đầu ngay chỉ với 1 click, làm trọn 40 câu hỏi, xuất báo cáo đầy đủ kèm huy hiệu riêng tư và nút tùy chọn lưu lại sau nếu muốn.
2. ☁️ **Chế Độ Đồng Bộ & Lưu Dữ Liệu (Cloud Sync)**:
   - **Đặc tính**: Thu thập Họ tên, Email, Chức danh để tự động đồng bộ kết quả chi tiết (62 cột) vào Google Sheet trung tâm.

---

### 2. Danh Mục Kịch Bản Kiểm Thử Đã Xác Minh

| STT | Kịch Bản Kiểm Thử | Kết Quả Kỳ Vọng | Kết Quả Thực Tế | Trạng Thái |
| :---: | :--- | :--- | :--- | :---: |
| 1 | **Chuyển đổi Tab Chế độ** | Cho phép chọn giữa Ẩn danh (Local) và Đồng bộ (Cloud) | Tab chuyển mượt mà, cập nhật mô tả và form trực quan | **PASS** |
| 2 | **Bắt đầu Ẩn danh 1-Click** | Vào thẳng bài test mà không cần nhập PII data | Vào thẳng Câu 1, Header hiển thị huy hiệu 🛡️ Ẩn Danh | **PASS** |
| 3 | **Làm 40 câu hỏi trắc nghiệm** | Tự động tính điểm, thanh tiến trình từ 0% đến 100% | 40/40 câu hoàn thành trơn tru, không có độ trễ mạng | **PASS** |
| 4 | **Báo Cáo Kết Quả Riêng Tư** | Hiển thị Biểu đồ Radar, Điểm số, Phân tích 3 chiều, Huy hiệu Local Only | Hiển thị sắc nét, xuất PDF chuẩn trang A4 | **PASS** |
| 5 | **Tùy chọn Đồng Bộ Sau (Post-Sync)** | Nút "Lưu Lên Google Sheet" mở popup cho phép đồng bộ sau khi đã xem kết quả | Popup hoạt động chuẩn, gửi dữ liệu thành công khi người dùng yêu cầu | **PASS** |

---

### 3. Liên Kết Tài Nguyên Trực Tuyến

- **Live Production App**: `https://khao-sat-tinh-cach.vercel.app`
- **Google Sheet Dữ Liệu**: `https://docs.google.com/spreadsheets/d/1lq3xIAM7iJzKcRcpuTd24f9YALzPOW3aQ5nq22Ps59k/edit`
