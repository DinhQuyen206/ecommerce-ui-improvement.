/* add code below this */
// 1. Tạo chuỗi dạng đối tượng và chuỗi nguyên thủy
var stringOne = new String("Test");
var stringTwo = "Test";
var stringThree = "Test";
var stringFour = new String("Test");

document.write("<p>" + stringOne + "</p>");

document.write("<p>typeof stringOne = " + typeof stringOne + "</p>");
document.write("<p>typeof stringThree = " + typeof stringThree + "</p>");

// 2. So sánh các chuỗi
document.write("<h3>So sánh chuỗi</h3>");

document.write("stringOne == stringTwo: "
  + (stringOne == stringTwo) + "<br>");

document.write("stringOne == stringFour: "
  + (stringOne == stringFour) + "<br>");

document.write("stringOne === stringTwo: "
  + (stringOne === stringTwo) + "<br>");

document.write("stringTwo === stringThree: "
  + (stringTwo === stringThree) + "<br>");

document.write("stringTwo === stringFour: "
  + (stringTwo === stringFour) + "<br>");

// 3. Ngày giờ hiện tại
var dateOne = new Date();

document.write("<h3>Date</h3>");
document.write("<p>" + dateOne + "</p>");

// 4. Các phép toán có sẵn
document.write("<h3>Math</h3>");
document.write("Math.PI = " + Math.PI + "<br>");
document.write("Math.sqrt(4) = " + Math.sqrt(4) + "<br>");
document.write("Math.random() = " + Math.random() + "<br>");
