# E-commerce UI Improvement – KitLab STEM

## 1. Giới thiệu
KitLab là trang giao diện **minh họa** cho bài tập cá nhân Chương 1 môn Phát triển ứng dụng WEB/TMĐT. Bài tập chọn cải tiến **thẻ sản phẩm và bố cục danh sách bộ kit STEM** sau khi khảo sát website OhStem. KitLab không phải website chính thức của OhStem và không bán hàng thật.

## 2. Website tham khảo
- Tên website: **OhStem Education**
- URL: https://ohstem.vn/
- Khu vực khảo sát: trang chủ, danh mục sản phẩm, chi tiết sản phẩm, tìm kiếm, giỏ hàng.
- Khu vực chọn cải tiến: danh sách sản phẩm / thẻ sản phẩm.

## 3. Chức năng
- Hiển thị **4 bộ kit STEM mẫu** với ảnh SVG minh họa, tên sản phẩm, mô tả ngắn, nhãn chủ đề và thông tin giá/“Liên hệ báo giá”.
- Liên kết **Xem chi tiết** đến phần giới thiệu tương ứng trong cùng trang HTML (không có trang mua hàng riêng).
- Bố cục responsive: lưới sản phẩm 4 cột trên màn hình lớn, 2 cột ở màn hình trung bình, **1 cột khi chiều rộng không quá 699 px**.
- Giao diện có điều hướng, liên kết bỏ qua đến nội dung, hỗ trợ tương tác bằng bàn phím.

## 4. Công nghệ
- **HTML5** cho cấu trúc nội dung.
- **CSS3** ở file `css/style.css`, sử dụng CSS Grid, Flexbox và media queries.
- SVG cục bộ trong thư mục `images/`.
- Không dùng JavaScript, thư viện ngoài, backend hoặc cơ sở dữ liệu.

## 5. Cách chạy
1. Giải nén ZIP hoặc tải toàn bộ repository về máy.
2. Mở file `index.html` bằng Chrome hoặc trình duyệt khác.
3. Giữ nguyên thư mục `css/` và `images/` ở cùng cấp với `index.html`.

Nếu đã bật GitHub Pages, mở đường dẫn Pages của repository để xem trang trực tiếp.

## 6. Cải tiến đã thực hiện
**Vấn đề khảo sát:** Danh sách bộ kit STEM khó so sánh khi tên, ảnh, mô tả công dụng, đối tượng phù hợp và thông tin giá chưa được trình bày nhất quán hoặc đầy đủ.

**Thiết kế minh họa:** Thẻ sản phẩm cùng cấu trúc, ảnh 4:3 và `object-fit: contain`, tên xuống dòng tự nhiên, mô tả ngắn, giá hoặc “Liên hệ báo giá”, nút “Xem chi tiết” cùng vị trí.

**Điểm tự chỉnh sửa nêu trong báo cáo:** Đưa danh sách về **một cột trên màn hình dưới 700 px**, thay vì để hai cột ở khoảng 480–699 px. Quy tắc được đặt cuối `css/style.css`:

```css
@media (max-width: 699px) {
  .product-list {
    grid-template-columns: 1fr;
  }
}
```

`@media` giới hạn phạm vi chiều rộng màn hình; `.product-list` chọn danh sách sản phẩm; `grid-template-columns: 1fr` yêu cầu một cột lưới để nội dung có thêm không gian.

## 7. Hỗ trợ từ AI
AI được sử dụng để hỗ trợ phân tích giao diện OhStem, đề xuất bố cục, giải thích HTML/CSS và tạo bản giao diện minh họa. Phần khảo sát thực tế, đánh giá tính phù hợp, thử giao diện và điều chỉnh responsive được trình bày trong bài báo cáo cá nhân. Xem thêm `AI_USAGE.md`.

## Lưu ý về dữ liệu
Bốn sản phẩm, hình ảnh SVG và ba mức giá số là **dữ liệu giả định phục vụ học tập**, không phải thông tin sản phẩm hoặc giá bán chính thức của OhStem. Sản phẩm thứ tư hiển thị “Liên hệ báo giá”. Không suy diễn độ tuổi, trình độ hoặc nhãn giảm giá khi chưa có dữ liệu xác minh.
