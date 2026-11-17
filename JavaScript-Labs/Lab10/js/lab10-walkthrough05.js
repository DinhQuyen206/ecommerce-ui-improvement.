/* put your DOM code here */
$(function () {
  // Tạo phần tử ảnh
  var img = $(
    '<img src="images/art/thumbs/13030.jpg" alt="Artwork">'
  );

  // Chọn panel
  var panel = $(".panel");

  // Chèn ảnh sau panel
  panel.append(img);
});
