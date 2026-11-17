// Tạo mảng gồm thứ Hai đến thứ Sáu
var daysOfWeek = ["Mon", "Tues", "Wed", "Thur", "Fri"];

// Thêm thứ Bảy vào cuối mảng
daysOfWeek.push("Sat");

// Thêm Chủ nhật vào đầu mảng
daysOfWeek.unshift("Sun");

// Tạo bảng và hàng tiêu đề
document.write("<table border='1' cellpadding='10'>");
document.write("<tr>");

for (var i = 0; i < daysOfWeek.length; i++) {
  var day = daysOfWeek[i];

  // In nghiêng tên ngày dài hơn 3 ký tự
  if (day.length > 3) {
    day = "<em>" + day + "</em>";
  }

  document.write("<th>" + day + "</th>");
}

document.write("</tr>");

// Tạo các ngày từ 1 đến 30, bắt đầu vào Chủ nhật
var date = 1;

for (var row = 0; row < 5; row++) {
  document.write("<tr>");

  for (var col = 0; col < 7; col++) {
    if (date <= 30) {
      document.write("<td>" + date + "</td>");
    } else {
      document.write("<td></td>");
    }

    date++;
  }

  document.write("</tr>");
}

document.write("</table>");
