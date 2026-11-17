/* code goes here */
// Chọn phần tử sẽ chứa đoạn văn mới
var first = document.getElementById("first");

// Tạo nội dung văn bản và thẻ p
var text = document.createTextNode(
  "this is programmatically created"
);

var p = document.createElement("p");

// Đưa văn bản vào thẻ p, rồi thêm p vào trang
p.appendChild(text);
first.appendChild(p);

// Xóa một mục trong danh sách biểu tượng
var icons = document.getElementById("iconList");
var itemToDelete = document.getElementById("deleteThisOne");

icons.removeChild(itemToDelete);