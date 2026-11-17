/* code goes here */
// Chọn nút và ảnh
var btn = document.getElementById("testButton");
var img = document.getElementById("mainImage");

// Xử lý khi bấm nút
function simpleHandler(event) {
  var content = document.getElementById("content");

  if (btn.innerHTML === "Hide") {
    btn.innerHTML = "Show";
    content.className = "makeItDisappear";

    setTimeout(function () {
      content.style.display = "none";
    }, 1000);
  } else {
    btn.innerHTML = "Hide";
    content.style.display = "block";

    setTimeout(function () {
      content.className = "makeItNormal";
    }, 500);
  }
}

btn.addEventListener("click", simpleHandler);

// Đổi ảnh sang màu xám khi chuột đi vào
img.addEventListener("mouseover", function (event) {
  img.className = "makeItGray";
});

// Khôi phục ảnh khi chuột đi ra
img.addEventListener("mouseout", function (event) {
  img.className = "makeItNormal";
});
