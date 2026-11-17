/* try the different selection calls here */
var msg = $("#msgArea");
msg.val("here is some new text");
// $("#first").html("new Title");
// Đọc thuộc tính class của ô nhập
$("#msgArea").val(
  "My class is " + $("#msgArea").attr("class")
);

// Chọn tất cả nút và đổi màu nền
$("button").css("background-color", "red");

// Đổi màu nền trang
$("body").css("background-color", "ivory");

// Thêm class cho nhóm biểu tượng
$(".center-icons").addClass("selected");