# AI Usage Log
## BT Cá nhân chương 1
## 1. Công cụ AI
- Công cụ: **ChatGPT**.

## 2. Mục đích sử dụng
- Hỗ trợ lập bảng phân tích các khu vực giao diện của website tham khảo OhStem.
- Đề xuất cách bố trí thẻ sản phẩm và danh sách các bộ kit STEM.
- Hỗ trợ tạo, giải thích mã HTML5/CSS3 và lựa chọn các quy tắc responsive.

## 3. Prompt đã sử dụng

1. Phân tích website `https://ohstem.vn/` ở năm khu vực: trang chủ, danh mục sản phẩm, chi tiết sản phẩm, tìm kiếm và giỏ hàng. Với từng khu vực, phân biệt điều quan sát được với nhận xét/đề xuất AI; không khẳng định tính năng chưa kiểm chứng.
2. Đề xuất giao diện cải tiến thẻ sản phẩm của danh sách bộ kit STEM: bố cục, thành phần HTML5, tổ chức CSS3, hiển thị desktop/mobile và các tiêu chí kiểm tra khả năng sử dụng.
3. Xây dựng trang giao diện HTML5/CSS3 gồm ít nhất bốn sản phẩm mẫu, ảnh, tên, giá hoặc trạng thái báo giá, nút thao tác; CSS tách riêng; không cần backend.
4. Giải thích cách hoạt động của CSS Grid và media queries; hỗ trợ đổi danh sách sản phẩm thành một cột trên màn hình có chiều rộng dưới 700 px.

## 4. Kết quả AI đề xuất
- Lưới thẻ sản phẩm thống nhất ảnh, tên, mô tả, nhãn chủ đề, thông tin giá và nút “Xem chi tiết”.
- Cấu trúc HTML có `header`, `nav`, `main`, `section`, danh sách `ul/li`, `article`, `img`, các tiêu đề và `footer`.
- CSS Grid dùng cho danh sách; Flexbox giúp bố trí nội dung thẻ; media queries điều chỉnh số cột.
- Minh họa bốn bộ kit với dữ liệu và hình vẽ tự dựng để tránh nhầm lẫn với danh mục chính thức của OhStem.

## 5. Kiểm tra và điều chỉnh
- **Đối chiếu nguồn tham khảo:** nội dung khảo sát trong bài báo cáo phân biệt các chức năng đã quan sát với đề xuất AI; không coi đề xuất chưa xác minh là hiện trạng của OhStem.
- **Minh chứng trong báo cáo cá nhân:** có ảnh trang mẫu trên trình duyệt và trong chế độ giao diện điện thoại của Chrome DevTools.
- **Điểm điều chỉnh do người làm bài trình bày:** ở khoảng 480–699 px bản đầu còn hai cột; đổi thành một cột cho toàn bộ chiều rộng nhỏ hơn 700 px.
- **Cách triển khai trong mã nộp:** thêm quy tắc `@media (max-width: 699px) { .product-list { grid-template-columns: 1fr; } }` cuối `css/style.css`.
- **Cần tự kiểm tra lại sau khi upload:** mở website GitHub Pages ở 320 px, 390 px, 699 px, 768 px và desktop; kiểm tra ảnh, nút và tràn ngang. Không ghi nhận các bước kiểm thử mới này là đã hoàn thành trước khi thực hiện.

## 6. Phần tôi hiểu và có thể giải thích
- `index.html`: trang nội dung chính; `lang="vi"` và `meta charset="UTF-8"` hỗ trợ tiếng Việt; `meta viewport` giúp bố cục phù hợp màn hình.
- `header`, `nav`, `main`, `section`, `article`, `footer`: phân chia nội dung có ngữ nghĩa.
- `ul`, `li`: nhóm các thẻ sản phẩm; `img` và thuộc tính `alt` thể hiện minh họa sản phẩm.
- `href="#..."` và `id`: liên kết “Xem chi tiết” dẫn đến phần mô tả ở cùng trang.
- `display: grid`: chia sản phẩm thành các cột; `display: flex` bố trí phần thân thẻ theo chiều dọc.
- `aspect-ratio: 4 / 3`, `object-fit: contain`: giữ tỷ lệ ảnh và không cắt hình minh họa.
- `@media (max-width: 699px)`: áp dụng CSS khi màn hình rộng tối đa 699 px; `grid-template-columns: 1fr` chuyển danh sách sang một cột.

## Bài tập cá nhân chương 2
## **Ghi lại việc sử dụng AI**

Công cụ sử dụng: ChatGPT. Em cung cấp bản Word, CSS, HTML và ảnh giao diện để nhờ đối chiếu. AI hỗ trợ rà soát mã, sửa phần giải thích và đề xuất cách kiểm tra; em thực hiện thao tác tải lại trang và phản hồi kết quả. 

| Nội dung nhờ AI | Em kiểm tra / điều chỉnh như thế nào |
| :---- | :---- |
| Rà soát HTML5 | Đối chiếu cấu trúc section, article, ul/li, alt và vị trí script với index.html. |
| Hướng dẫn CSS Box Model | Thử tăng padding, so ảnh Before/After rồi giảm giá trị ở màn hình nhỏ. |
| Giải thích Flexbox | Kiểm tra space-between so với center bằng nút “Xem chi tiết”. |
| Kiểm tra CSS Grid | Thử 3 cột và đối chiếu 4/2/1 cột ở các kích thước màn hình. |
| Kiểm tra lỗi và hiệu ứng | Xem DevTools/ảnh chụp, phân biệt hover và focus bằng Tab. |
