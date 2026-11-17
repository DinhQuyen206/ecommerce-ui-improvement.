/* put your animation code here */
$(function () {
  $("figure img")
    .on("mouseover", function (e) {
      var alt = $(this).attr("alt");
      var src = $(this).attr("src");

      // Đổi đường dẫn ảnh nhỏ sang ảnh cỡ vừa
      var newsrc = src.replace("small", "medium");

      // Tạo khung xem trước
      var preview = $('<div id="preview"></div>');
      var image = $("<img>").attr("src", newsrc).attr("alt", alt);
      var caption = $("<p>").text(alt);

      preview.append(image);
      preview.append(caption);
      $("body").append(preview);

      // Làm ảnh nhỏ chuyển xám
      $(this).addClass("gray");

      // Đặt vị trí và hiện khung xem trước
      movePreview(e);
      $("#preview").fadeIn(1000);
    })
    .on("mouseleave", removePreview)
    .on("mousemove", movePreview);
});

function removePreview() {
  $(this).removeClass("gray");
  $("#preview").remove();
}

function movePreview(e) {
  $("#preview")
    .css("top", (e.pageY - 10) + "px")
    .css("left", (e.pageX + 30) + "px");
}
