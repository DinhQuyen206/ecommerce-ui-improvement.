/* try the different advanced selection calls here */
// Chọn tất cả ô mật khẩu
//$(":password").css("background-color", "yellow");

// Chọn các phần tử trong form ở vị trí con thứ 4, 8, 12...
$("form :nth-child(4n)").css("background-color", "yellow");

// Chọn label có nội dung chứa chữ "word"
$('label:contains("word")').css("color", "black");