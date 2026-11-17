/* code goes here */
// Đổi màu nền theo sự kiện focus hoặc blur
function setBackground(e) {
  if (e.type === "focus") {
    e.target.style.backgroundColor = "#FFE393";
  } else if (e.type === "blur") {
    e.target.style.backgroundColor = "white";
  }
}

// Chờ trang tải rồi gắn sự kiện cho các ô nhập
window.addEventListener("load", function () {
  var fields = document.querySelectorAll(
    "input[type=text], input[type=password]"
  );

  for (var i = 0; i < fields.length; i++) {
    fields[i].addEventListener("focus", setBackground);
    fields[i].addEventListener("blur", setBackground);
  }
});
