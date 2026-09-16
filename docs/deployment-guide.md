# HƯỚNG DẪN TRIỂN KHAI & VẬN HÀNH (DEPLOYMENT GUIDE)

- **Dự án**: Khảo Sát Tính Cách Theo Social Styles
- **Nền tảng triển khai chính**: Vercel Serverless Edge Platform
- **Môi trường Live**: [https://khao-sat-tinh-cach.vercel.app](https://khao-sat-tinh-cach.vercel.app)
- **Cập nhật ngày**: 16/09/2026

---

## 1. Yêu Cầu Môi Trường (System Requirements)

- **Node.js**: Phiên bản 18.x hoặc 20.x LTS.
- **Trình quản lý gói**: `npm` (v9.x trở lên).
- **Vercel CLI**: Phiên bản 38+ (đã cài đặt toàn cục: `npm i -g vercel`).
- **Trình duyệt khuyến nghị**: Google Chrome, Microsoft Edge, Safari, Firefox phiên bản mới nhất.

---

## 2. Hướng Dẫn Chạy Môi Trường Cục Bộ (Local Development)

```bash
# Bước 1: Điều hướng vào thư mục dự án
cd C:\Users\vu.hoang\.gemini\antigravity\scratch\khao-sat-tinh-cach

# Bước 2: Cài đặt các gói phụ thuộc (dependencies)
npm install

# Bước 3: Khởi động máy chủ phát triển cục bộ
npm run dev
# Mở trình duyệt tại: http://localhost:5173

# Bước 4: Chạy bộ kiểm thử tự động (Unit Tests)
npm test

# Bước 5: Kiểm tra quá trình đóng gói Production
npm run build
```

---

## 3. Quy Trình Triển Khai Lên Vercel Production (Deployment Steps)

Dự án được cấu hình để triển khai một chạm thông qua Vercel CLI hoặc tự động kích hoạt khi push mã nguồn lên nhánh `main` của GitHub:

### Triển khai thủ công bằng Vercel CLI:
```bash
# Đóng gói và đẩy trực tiếp lên môi trường Production
vercel --prod --yes
```

### Cấu hình tệp `vercel.json`:
Tệp `vercel.json` ở thư mục gốc đảm bảo các tài nguyên tĩnh được nạp mượt mà:
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

---

## 4. Quản Lý Biến Môi Trường & Bảo Mật (Environment Variables & Secrets)

- **Nguyên tắc Zero-Secret ở Client**: Ứng dụng là một Single Page Application chạy hoàn toàn tại trình duyệt người dùng. Tuyệt đối **không đưa API Key nhạy cảm, mật khẩu cơ sở dữ liệu hay token quản trị** vào mã nguồn frontend.
- **Endpoint Webhook Google Apps Script**:
  - Địa chỉ Webhook lưu trữ tại `src/utils/webhook.ts`.
  - Endpoint này là dạng `exec` công khai tiếp nhận HTTP POST, được bảo vệ bằng logic append-only ở tầng Google Sheets (không cho phép đọc hoặc sửa dữ liệu cũ qua webhook).

---

## 5. Xử Lý Các Sự Cố Phổ Biến (Troubleshooting)

| Hiện Tượng | Nguyên Nhân | Cách Khắc Phục |
| :--- | :--- | :--- |
| **Lỗi kết xuất PDF bị trắng hoặc vỡ layout** | Font chữ chưa nạp xong hoặc kích thước DOM ẩn bị co rút. | Đảm bảo `PDFExportView.tsx` có chiều rộng cố định `800px` và thêm `useCORS: true`, `scale: 2` trong hàm cấu hình của `html2canvas`. |
| **Lỗi CORS khi gọi Google Webhook** | Trình duyệt chặn phản hồi CORS từ Google Apps Script redirect (`302 Moved Temporarily`). | Sử dụng tùy chọn `mode: 'no-cors'` trong hàm `fetch()`. Yêu cầu vẫn được chuyển đến Google Sheet thành công 100%. |
| **Trình duyệt hiển thị phiên bản cũ sau khi deploy** | Bộ nhớ đệm CDN của trình duyệt hoặc Vercel Edge Cache. | Thêm tham số phiên bản hoặc thực hiện Hard Refresh (`Ctrl + F5` hoặc `Cmd + Shift + R`). |
