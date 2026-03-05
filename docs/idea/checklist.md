Tuyệt vời! Việc sở hữu một Checklist (danh sách kiểm tra) chi tiết chính là điểm khác biệt giữa một "Junior hay bỏ cuộc giữa chừng" và một "Lập trình viên thực thụ có khả năng tự quản lý dự án".

Tôi đã thiết kế cho bạn một **Checklist Quản lý Tiến độ (Project Management Checklist)** chia theo từng **Sprint (Giai đoạn)**. Bạn có thể copy toàn bộ nội dung này dán vào Notion, Trello, hoặc GitHub Projects để theo dõi.

Dự kiến dự án này sẽ mất khoảng **4 - 6 tuần** nếu bạn code 2-3 tiếng mỗi tối.

---

# 🗺️ HERO PROJECT: AnGiang Wander AI

### 🚀 Sprint 1: Khởi tạo Nền tảng & Dữ liệu (Tuần 1)

_Mục tiêu: Dựng xong khung dự án, kết nối Database và chuẩn bị sẵn dữ liệu thô._

- [x] **1. Setup Database (Supabase)**
  - [x] Tạo project mới trên Supabase.
  - [x] Thiết kế Table `locations` (Các cột: `id`, `name`, `description` (lấy từ Wiki), `latitude`, `longitude`, `image_url`, `category`).
  - [x] Thiết kế Table `itineraries` (Lưu lịch trình user: `id`, `user_id`, `title`, `trip_data` (chuỗi JSON), `created_at`).
  - [x] Thêm khoảng 15-20 địa điểm nổi tiếng ở An Giang vào table `locations` (Rừng Tràm Trà Sư, Miếu Bà, Núi Cấm, Chợ nổi Long Xuyên, Hồ Tà Pạ...).
- [x] **2. Khởi tạo Project (Frontend)**
  - [x] Init dự án bằng **TanStack Start** (hỗ trợ SSR và File-based routing).
  - [x] Cài đặt **Tailwind CSS**.
  - [x] Cài đặt **shadcn/ui** và init các component cơ bản (`Button`, `Card`, `Input`, `Form`, `Sheet`/`Dialog`).
  - [x] Setup thư mục chuẩn: `/components`, `/routes`, `/lib`, `/server` (cho server functions).
- [x] **3. Kết nối Supabase & TanStack Query**
  - [x] Tạo file `supabase-client.ts` để cấu hình Supabase SDK.
  - [x] Viết hàm fetch data `useLocations()` và bọc nó bằng TanStack Query để lấy dữ liệu từ table `locations`.
  - [x] Tạo `LocationsList` component hiển thị danh sách địa điểm.
  - [x] Setup `QueryClientProvider` cho toàn bộ ứng dụng.
  - [x] Test data flow từ Supabase -> Frontend thành công.

---

### 📍 Sprint 2: Tích hợp Bản đồ & Giao diện cốt lõi (Tuần 2)

_Mục tiêu: Hiển thị được bản đồ tương tác và danh sách địa điểm (Chứng minh kỹ năng UI/UX)._

- [ ] **1. Tích hợp Bản đồ**
  - [ ] Cài đặt thư viện bản đồ (khuyên dùng `react-map-gl` bọc Mapbox, hoặc `shadcn-map` nếu tương thích tốt, hoặc `react-leaflet` cho dễ và miễn phí).
  - [ ] Set tọa độ trung tâm (Center) mặc định ở Châu Đốc hoặc Long Xuyên, An Giang.
- [ ] **2. Render Dữ liệu lên Map**
  - [ ] Lặp (map) qua mảng data lấy từ Supabase và vẽ các **Marker** lên bản đồ.
  - [ ] Tạo tính năng Click vào Marker: Mở ra một `Sheet` (Slide từ bên phải ra) hoặc `Popover` hiển thị Tên, Hình ảnh và Tóm tắt (Wiki data) của địa điểm đó.
- [ ] **3. Xây dựng UI bộ lọc (Filter - Điểm cộng lớn)**
  - [ ] Tạo thanh Search (tìm tên địa điểm).
  - [ ] Tạo các Nút Filter (Chùa chiền, Sinh thái, Ẩm thực, Lịch sử). Kết hợp TanStack Query để filter data mượt mà không cần load lại trang.

---

### 🧠 Sprint 3: "Trái tim" của dự án - AI Trip Planner (Tuần 3)

_Mục tiêu: Tích hợp AI tạo lịch trình trả về định dạng JSON và render thành Timeline._

- [ ] **1. Form Nhập liệu (User Preferences)**
  - [ ] Dùng `shadcn Form` + `React Hook Form` + `Zod` (validate dữ liệu) tạo form thu thập: Số ngày đi (1-3 ngày), Ngân sách, Điểm xuất phát, Sở thích.
- [ ] **2. Setup Server Function & Vercel AI SDK**
  - [ ] Đăng ký API Key của OpenAI hoặc Gemini (Google AI Studio đang cho dùng Gemini 1.5 Flash miễn phí, rất tốt).
  - [ ] Cài đặt `ai` (Vercel AI SDK) và `@ai-sdk/google` (hoặc openai).
  - [ ] Viết Server Function (trong TanStack Start) nhận data từ Form và gọi AI.
- [ ] **3. Kỹ thuật Prompt Engineering (Quan trọng nhất)**
  - [ ] Viết System Prompt ép AI đóng vai trò hướng dẫn viên du lịch An Giang.
  - [ ] **Must-do:** Sử dụng hàm `generateObject` kết hợp với schema `Zod` để ép AI trả về dữ liệu chuẩn JSON. _(Ví dụ: `{ days: [ { day: 1, activities: [ { time, location_name, description } ] } ] }`)._
- [ ] **4. Hiển thị Lịch trình (Timeline UI)**
  - [ ] Xử lý Loading State: Tạo giao diện Skeleton nhấp nháy trong lúc chờ AI nghĩ (rất quan trọng cho UX).
  - [ ] Nhận cục JSON từ AI, render thành giao diện **Timeline** (Trục thời gian) ở Sidebar.
  - [ ] **Nâng cao:** Khi click vào một địa điểm trong Timeline, bản đồ tự động `flyTo` (bay tới) tọa độ của địa điểm đó.

---

### 🔐 Sprint 4: Cá nhân hóa & Lưu trữ (Tuần 4)

_Mục tiêu: Áp dụng Auth, thao tác CRUD để user có thể lưu lại lịch trình._

- [ ] **1. Tích hợp Authentication**
  - [ ] Setup Supabase Auth (Đăng nhập bằng Google/Github).
  - [ ] Xây dựng luồng bảo vệ Route (Route Guard): Yêu cầu đăng nhập mới được lưu lịch trình.
- [ ] **2. Chức năng Lưu (Create & Read)**
  - [ ] Tạo nút "Save Trip". Khi nhấn, gửi JSON lịch trình của AI + User ID lên bảng `itineraries` trong Supabase.
  - [ ] Tạo trang Dashboard `/my-trips`: Fetch và hiển thị danh sách các chuyến đi user đã lưu (dạng Grid/Card).
- [ ] **3. Chức năng Chỉnh sửa (Update & Delete) - _Tùy chọn, làm nếu còn thời gian_**
  - [ ] Cho phép user xóa chuyến đi.
  - [ ] Tích hợp `dnd-kit` để user kéo thả, đổi thứ tự các địa điểm trong Timeline.

---

### 💅 Sprint 5: Hoàn thiện & Triển khai (Tuần 5)

_Mục tiêu: Đạt chuẩn Production, chuẩn bị để khoe với nhà tuyển dụng._

- [ ] **1. Đánh giá UX & Responsive** -[ ] Bật DevTools, kiểm tra toàn bộ giao diện trên màn hình Mobile (iPhone 12/14, iPad). _Ứng dụng bản đồ trên điện thoại cần tối ưu thao tác vuốt chạm._
  - [ ] Fix lỗi layout, đảm bảo nút bấm to rõ, màu sắc hài hòa (có thể tích hợp Dark/Light mode của shadcn).
- [ ] **2. Tối ưu Codebase (Clean Code)** -[ ] Chạy ESLint và Prettier, xóa các dòng `console.log`, xóa code thừa.
  - [ ] Đưa các API Key vào biến môi trường `.env`. Tuyệt đối không push `.env` lên Github.
- [ ] **3. Deploy (Triển khai web)**
  - [ ] Push code lên GitHub.
  - [ ] Deploy dự án lên **Vercel** (miễn phí, tối ưu hoàn hảo cho TanStack/Nextjs).
  - [ ] Test thử link Vercel xem bản đồ và AI có chạy đúng trên môi trường Production không.

---

### 🎬 Sprint 6: Vũ khí Ứng tuyển (Tuần 6)

_Mục tiêu: Đóng gói dự án để đưa vào CV._

- [ ] **1. Viết `README.md` "Sát thủ" (100% Tiếng Anh)** -[ ] Tiêu đề dự án & Link Live Demo.
  - [ ] Screenshot (3-4 ảnh: Map, AI Timeline, Mobile view) hoặc 1 cái GIF ngắn quay màn hình tính năng AI. -[ ] Liệt kê Tech Stack: TanStack Start, Supabase, Vercel AI SDK, Tailwind, shadcn.
  - [ ] Giải thích ngắn gọn luồng hoạt động (Architecture).
  - [ ] Hướng dẫn cài đặt (`npm install`, cấu hình `.env`).
- [ ] **2. Đưa vào CV và LinkedIn** -[ ] Viết mô tả vào CV: _"Built a full-stack AI-powered travel planner for An Giang using TanStack Start & Supabase. Engineered prompt generation using Vercel AI SDK to return structured JSON itineraries."_

---

### 💡 Lời khuyên khi thực hiện Checklist này:

- **Nguyên tắc "Làm cho nó chạy trước, làm cho nó đẹp sau":** Đừng tốn 2 ngày chỉ để chỉnh màu cái nút bấm ở Sprint 1. Hãy làm cho luồng data từ Supabase -> Map chạy được đã.
- **Phiên bản đầu tiên (MVP):** Nếu khó quá, ở Sprint 3 bạn chỉ cần AI trả về text thuần để hiển thị cũng được. Sau khi chạy ngon lành mới bắt đầu ép nó trả về JSON (hàm `generateObject`).

Bạn dự định sẽ làm công việc thu thập data địa điểm (Sprint 1) bằng tay hay muốn viết một script nhỏ để kéo data? Tôi khuyên với 15-20 địa điểm thì nhập bằng tay vào Supabase cho nhanh và kiểm soát được chất lượng ảnh nhé!
