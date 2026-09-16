# TỔNG QUAN DỰ ÁN & YÊU CẦU PHÁT TRIỂN SẢN PHẨM (PROJECT OVERVIEW & PDR)

- **Tên dự án**: Khảo Sát Tính Cách Theo Social Styles (Hồ Sơ Phong Cách Xã Hội 4 Nhóm)
- **Tên mã kho lưu trữ**: `khao-sat-tinh-cach`
- **Môi trường Live Production**: [https://khao-sat-tinh-cach.vercel.app](https://khao-sat-tinh-cach.vercel.app)
- **Ngày lập**: 16/09/2026
- **Phiên bản tài liệu**: v1.2.0

---

## 1. Tầm Nhìn & Mục Tiêu Sản Phẩm (Product Vision & Goals)

### 1.1. Bối cảnh thị trường & Nhu cầu thực tế
Trong môi trường doanh nghiệp hiện đại, hơn 80% xung đột nội bộ, mất gắn kết và suy giảm hiệu suất bắt nguồn từ sự lệch pha trong phong cách giao tiếp và thiên hướng hành vi giữa các cá nhân. Hầu hết các công cụ trắc nghiệm tính cách hiện nay (như MBTI, DISC, Big Five) thường:
- Quá dài dòng (mất 15–30 phút để hoàn thành).
- Bắt buộc thu thập thông tin định danh (Email, SĐT) gây e ngại về quyền riêng tư.
- Báo cáo kết quả mang tính lý thuyết trừu tượng, khó ứng dụng ngay vào công việc hằng ngày.

### 1.2. Tầm nhìn sản phẩm (Vision Statement)
Xây dựng một ứng dụng trắc nghiệm web tinh gọn (Single Page Application - SPA), hoàn thành nhanh chóng trong **3 phút**, cung cấp báo cáo phân tích hành vi sắc bén dựa trên **Mô hình Phong cách Xã hội (Social Styles Matrix - Merrill & Reid 1981)** và **Thuyết 4 Khí Chất (Four Temperaments)**, đồng thời tiên phong áp dụng kiến trúc **Dual-Mode** bảo vệ quyền riêng tư tuyệt đối theo **Nghị định 13/2023/NĐ-CP**.

---

## 2. Đối Tượng Người Dùng & Tình Huống Sử Dụng (User Personas & Use Cases)

| Nhóm Đối Tượng | Chân Dung & Nhu Cầu | Tình Huống Sử Dụng Chính |
| :--- | :--- | :--- |
| **1. Cá nhân tự khám phá (Individual)** | Nhân viên, quản lý muốn hiểu rõ điểm mạnh, điểm hạn chế và phong cách hành vi tự nhiên của bản thân. | Làm bài trắc nghiệm nhanh ẩn danh trên điện thoại/laptop, đọc phân tích 3 chiều và tải báo cáo PDF cá nhân. |
| **2. Nhà quản lý & Trưởng nhóm (Leader / Manager)** | Cần hiểu phong cách của từng nhân sự trong phòng ban để phân chia công việc và giao tiếp phù hợp. | Yêu cầu thành viên làm bài, thu thập kết quả để đối chiếu ma trận phối hợp và phòng ngừa xung đột (*Tension Traps*). |
| **3. Bộ phận Tuyển dụng & Nhân sự (HR / Recruiter)** | Cần đánh giá mức độ tương thích văn hóa và phong cách làm việc của ứng viên với vị trí tuyển dụng. | Sử dụng công cụ như một bước sàng lọc hành vi bổ trợ trong quy trình phỏng vấn tuyển dụng. |
| **4. Giảng viên & Chuyên gia Đào tạo (Trainer / Coach)** | Cần công cụ trực quan để minh họa trong các khóa học về Kỹ năng Giao tiếp, Lãnh đạo và Xây dựng Đội ngũ. | Trình chiếu trực tiếp trang Nghiên cứu Khoa học và cho học viên làm bài trắc nghiệm tương tác tại lớp. |

---

## 3. Yêu Cầu Chức Năng (Functional Requirements - FR)

### FR-01: Bộ câu hỏi trắc nghiệm chuẩn hóa 40 câu
- Gồm 40 câu hỏi lựa chọn đơn (Single Choice) từ bộ từ vựng kinh điển của *Personality Plus (Florence Littauer 1983)*:
  - **Phần 1 (Câu 1 – 20)**: 20 câu khảo sát Điểm Mạnh (Strengths).
  - **Phần 2 (Câu 21 – 40)**: 20 câu khảo sát Điểm Hạn Chế / Yếu Điểm (Weaknesses).
- Mỗi câu gồm 4 tính từ tương ứng 4 phong cách (Chim Công, Đại Bàng, Chim Cú, Bồ Câu).
- Hỗ trợ tính năng tự động chuyển câu tiếp theo (Auto-advance) sau 250ms khi chọn.

### FR-02: Kiến trúc Dual-Mode (Bảo vệ quyền riêng tư)
- **Chế độ 1 - Ẩn Danh (Local-Only)**:
  - 1-click vào làm bài ngay lập tức.
  - 100% tính toán diễn ra trong RAM/trình duyệt người dùng (Zero Server Egress).
  - Không gửi bất kỳ dữ liệu nào qua Internet.
- **Chế độ 2 - Đồng Bộ (Cloud Sync)**:
  - Cho phép người dùng nhập Họ tên, Email, Số điện thoại/Chức vụ để lưu kết quả.
  - Bắt buộc hiển thị khối cảnh báo nổi bật và Checkbox đồng ý theo **Nghị định 13/2023/NĐ-CP**.
  - Đồng bộ chi tiết 62 trường dữ liệu lên Google Sheet trung tâm.

### FR-03: Động cơ tính điểm & Phân tích kết quả (Scoring Engine)
- Tính tổng số điểm và phần trăm của từng phong cách:
  $$\text{Score} = \text{Strengths} + \text{Weaknesses} \quad (\text{Tổng } = 40)$$
  $$\% = \frac{\text{Score}}{40} \times 100\%$$
- Tự động xác định:
  - **Phong cách Chủ đạo (Dominant Style)**: Nhóm có điểm số cao nhất.
  - **Phong cách Thứ cấp (Secondary Style)**: Nhóm có điểm số cao thứ hai.
- Thuật toán xử lý hòa điểm (Tie-breaking): Ưu tiên điểm thuộc phần Điểm Mạnh (Strengths) nếu điểm tổng bằng nhau.

### FR-04: Trực quan hóa dữ liệu & Báo cáo chuyên sâu
- Biểu đồ mạng nhện SVG (Radar Chart) hiển thị tỷ trọng 4 trục tương tác.
- Phân tích chi tiết 3 chiều: *Cảm Xúc • Công Việc • Bạn Bè & Mối Quan Hệ*.
- Cung cấp cẩm nang tương tác (*Collaboration Matrix*) với 3 nhóm phong cách còn lại.

### FR-05: Xuất báo cáo PDF chuẩn in ấn A4
- Sử dụng `html2canvas` và `jsPDF` để chụp và kết xuất báo cáo hoàn chỉnh thành tệp PDF khổ A4 với đầy đủ biểu đồ, điểm số và phân tích chi tiết.

### FR-06: Cổng thông tin Nghiên cứu Khoa học (`#research`)
- Trang thông tin học thuật chuyên sâu tích hợp:
  - Lịch sử 2.400 năm từ Hippocrates đến Florence Littauer.
  - Ma trận 2 trục: *Cường độ Cảm xúc × Tốc độ Phản ứng* (Wilhelm Wundt & Ivan Pavlov).
  - Lý thuyết về Hành vi phòng vệ tiêu cực dưới áp lực cao (Backup Behaviors / Toxic Drift).
  - Nút tải trực tiếp toàn văn Báo cáo Nghiên cứu PDF.

### FR-07: Cổng thông tin Ý tưởng Phát triển (`#roadmap`)
- Trình bày 5 Trụ cột mở rộng hệ thống (Trí tuệ Đội ngũ B2B, AI Copilot, Đánh giá 360 độ, Viral Growth, Mobile PWA).

---

## 4. Yêu Cầu Phi Chức Năng (Non-Functional Requirements - NFR)

- **Hiệu năng (Performance)**: Thời gian tải trang ban đầu (First Contentful Paint) < 1.2s; phản hồi click < 50ms.
- **Tương thích thiết bị (Responsiveness)**: Hoạt động hoàn hảo trên mọi kích thước màn hình: Mobile (>= 320px), Tablet, Laptop và Desktop màn hình rộng.
- **Khả năng lưu trữ cục bộ (Resilience & Offline State)**: Tự động lưu tiến độ làm bài vào `localStorage` để người dùng không bị mất dữ liệu khi tải lại trang hoặc mất mạng tạm thời.
- **Bảo mật & Quyền riêng tư (Privacy & Security)**:
  - Không hardcode API key hoặc token nhạy cảm ở client.
  - Tuân thủ tuyệt đối quy định về bảo vệ dữ liệu cá nhân (Nghị định 13/2023/NĐ-CP).

---

## 5. Chỉ Số Thành Công Của Sản Phẩm (Key Success Metrics)

1. **Tỷ lệ hoàn thành bài khảo sát (Completion Rate)**: Đạt > 85% số lượt bắt đầu làm bài.
2. **Thời gian hoàn thành trung bình (Average Time to Complete)**: 2.5 – 3.5 phút.
3. **Tỷ lệ chia sẻ & tải PDF (Engagement Rate)**: > 40% người dùng thực hiện tải báo cáo PDF hoặc chia sẻ kết quả.
4. **Mức độ hài lòng của người dùng (CSAT)**: > 4.5 / 5.0 đối với độ chính xác của kết quả tự đánh giá.
