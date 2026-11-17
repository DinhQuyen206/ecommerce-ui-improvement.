// define functions in this file
// Biến toàn cục: dùng được bên trong hàm
var boxClass = "movingDiv";

// Hàm nhận số thứ tự và trả về chuỗi HTML
function outputBox(num) {
  var box = "<div class='" + boxClass + "' id='div" + num + "'>";
  box += "This is div " + num;
  box += "</div>";

  return box;
}
