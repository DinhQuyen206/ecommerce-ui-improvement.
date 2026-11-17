/* code goes here */
// Chọn ô textarea và thay đổi giá trị
var msg = document.getElementById("msgArea");
msg.value = "here is some text";

// Chọn và thay đổi tiêu đề
var title = document.getElementById("pageTitle");
title.innerHTML = "New Title";
// Đọc phần văn bản hiển thị của phần tử first
msg.value = document.getElementById("first").innerText;
msg.value = "My class is " + msg.getAttribute("class");
var elem = document.getElementsByTagName("textarea");
elem[0].value = "selected by tag name";
elem = document.getElementsByTagName("span");

for (var i = 0; i < elem.length; i++) {
  msg.value += "\n" + elem[i].innerText;
}
msg.value = "";

var counts = document.getElementsByClassName("count-number");

for (var i = 0; i < counts.length; i++) {
  msg.value += "\n" + counts[i].innerText;
}
var ps = document.querySelector("#first p");
msg.value = ps.innerHTML;
ps = document.querySelectorAll("#first p");

for (var i = 0; i < ps.length; i++) {
  msg.value += ps[i].innerHTML + "\n";
}
msg.setAttribute("class", "hidden");

document.getElementById("features").style.backgroundColor = "green";