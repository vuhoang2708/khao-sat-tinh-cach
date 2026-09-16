# KIẾN TRÚC HỆ THỐNG & LUỒNG DỮ LIỆU (SYSTEM ARCHITECTURE)

- **Dự án**: Khảo Sát Tính Cách Theo Social Styles
- **Mô hình kiến trúc**: Single Page Application (SPA) • Client-Side Processing • Serverless Cloud Integration
- **Cập nhật ngày**: 16/09/2026

---

## 1. Sơ Đồ Kiến Trúc Tổng Thể (System Architecture Diagram)

```mermaid
flowchart TD
    subgraph ClientBrowser ["Trình Duyệt Người Dùng (Client Browser)"]
        UI["Giao Diện Người Dùng (React 18 + Tailwind CSS)"]
        State["State Manager (App.tsx / LocalStorage)"]
        Engine["Scoring Engine (Thuật toán tính điểm 4 nhóm)"]
        PDF["PDF Renderer (html2canvas + jsPDF)"]
    end

    subgraph DualModeRouting ["Cổng Điều Phối Chế Độ (Dual-Mode Gateway)"]
        ModeCheck{"Chế độ làm bài?"}
        AnonMode["Chế Độ Ẩn Danh (Local-Only)\n• Zero Server Egress\n• Dữ liệu chỉ nằm trong RAM"]
        CloudMode["Chế Độ Đồng Bộ (Cloud-Sync)\n• Tuân thủ Nghị định 13/2023/NĐ-CP\n• Checkbox đồng ý bắt buộc"]
    end

    subgraph ExternalServices ["Dịch Vụ Ngoại Vi & Đám Mây"]
        VercelCDN["Vercel Edge CDN (Phân phối tĩnh SPA)"]
        GAS["Google Apps Script Webhook"]
        GSheet[("Google Sheets Trung Tâm\n(Lưu trữ 62 trường dữ liệu)")]
    end

    VercelCDN -->|Tải trang HTML/JS/CSS| UI
    UI <--> State
    State --> Engine
    Engine --> State
    State --> PDF
    PDF -->|Tải tệp PDF về máy| UI

    State --> ModeCheck
    ModeCheck -->|local_anonymous| AnonMode
    AnonMode -->|Chỉ lưu localStorage| State

    ModeCheck -->|cloud_sync| CloudMode
    CloudMode -->|POST Payload 62 cột| GAS
    GAS -->|Ghi dòng dữ liệu mới| GSheet
```

---

## 2. Chi Tiết Kiến Trúc Dual-Mode (Bảo Vệ Quyền Riêng Tư)

Hệ thống được thiết kế theo nguyên lý **Privacy-by-Design**, trao toàn quyền quyết định về mặt dữ liệu cho người dùng:

```mermaid
sequenceDiagram
    autonumber
    actor User as Người Dùng
    participant App as Ứng Dụng React (Client)
    participant LS as Bộ Nhớ Trình Duyệt (LocalStorage)
    participant GAS as Google Apps Script Webhook
    participant GS as Google Sheets

    User->>App: Mở ứng dụng lần đầu
    App->>User: Hiển thị OnboardingModal (2 Tabs: Ẩn Danh vs Đồng Bộ)

    alt Người dùng chọn Tab 1: Ẩn Danh (Local-Only)
        User->>App: Bấm "Làm Bài Ẩn Danh (1-Click)"
        App->>LS: Lưu UserProfile { fullName: "Khách Ẩn Danh", mode: "local_anonymous" }
        User->>App: Hoàn thành 40 câu hỏi
        App->>App: ScoringEngine tính điểm trong RAM
        App->>LS: Lưu kết quả vào LocalStorage
        App->>User: Hiển thị Báo Cáo + Cho phép xuất PDF
        Note over App,GAS: TUYỆT ĐỐI KHÔNG GỌI WEBHOOK (0 byte gửi ra ngoài)
    else Người dùng chọn Tab 2: Đồng Bộ (Cloud-Sync)
        User->>App: Nhập Tên, Email, SĐT + Tích chọn Checkbox Nghị định 13
        User->>App: Bấm "Bắt Đầu & Đồng Bộ"
        App->>LS: Lưu UserProfile { mode: "cloud_sync" }
        User->>App: Hoàn thành 40 câu hỏi
        App->>App: ScoringEngine tính điểm trong RAM
        App->>GAS: POST JSON Payload (62 trường dữ liệu)
        GAS->>GS: Ghi dữ liệu vào Google Sheet
        App->>User: Hiển thị Báo Cáo + Thông báo đồng bộ thành công
    end
```

---

## 3. Luồng Kết Xuất Báo Cáo PDF Tại Client (Client-Side PDF Pipeline)

Để đảm bảo hiệu năng tối đa và tính bảo mật (không gửi thông tin cá nhân lên máy chủ để tạo file PDF), toàn bộ quá trình xuất PDF diễn ra 100% tại máy khách:

```mermaid
flowchart LR
    ReportState["Dữ Liệu Kết Quả (AssessmentResult)"] 
    --> HiddenDOM["DOM Container Ẩn (PDFExportView.tsx)\nĐịnh dạng chuẩn khổ giấy A4 (800px)"]
    --> Canvas["html2canvas (Chụp DOM thành Canvas với scale: 2)"]
    --> JPEG["Nén ảnh JPEG chất lượng cao (0.95)"]
    --> jsPDFDoc["jsPDF Instance (Định dạng A4 portrait)"]
    --> Download["Tải tệp .pdf về máy khách"]
```

---

## 4. Định Tuyến Trạng Thái Theo Hash (Hash-based Routing)

Ứng dụng sử dụng cơ chế định tuyến dựa trên URL Hash để đảm bảo tính gọn nhẹ của Single Page Application và tương thích hoàn hảo với CDN Vercel mà không yêu cầu cấu hình server rewrite phức tạp:

| URL Hash | View Component | Mục Đích Sử Dụng |
| :--- | :--- | :--- |
| `/#` hoặc trống | `App.tsx` (Survey View) | Trải nghiệm làm bài khảo sát và xem báo cáo kết quả. |
| `/#research` | `ResearchPage.tsx` | Đọc toàn bộ tài liệu nghiên cứu học thuật, lịch sử 2.400 năm và tải PDF nghiên cứu. |
| `/#roadmap` | `RoadmapPage.tsx` | Xem 5 trụ cột mở rộng hệ thống và lộ trình phát triển. |

---

## 5. Ranh Giới An Toàn & Bảo Mật Dữ Liệu (Security Boundaries)

1. **Zero Secret Client**: Mã nguồn React không chứa bất kỳ secret key, token quản trị hay mật khẩu nào. URL Webhook của Google Apps Script là endpoint công khai được bảo vệ theo cơ chế hạn chế ghi (Append-only).
2. **Không Rò Rỉ PII**: Trong chế độ Ẩn danh, không có bất kỳ lệnh gọi mạng nào (No fetch, No analytics tracking PII, No third-party pixels).
3. **Phòng Ngừa Tấn Công XSS**: Toàn bộ dữ liệu hiển thị trên giao diện đều được React tự động escape, ngăn chặn hoàn toàn việc chèn mã độc HTML/Script.
