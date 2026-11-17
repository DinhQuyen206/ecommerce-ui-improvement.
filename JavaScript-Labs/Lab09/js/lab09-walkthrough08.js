/* code goes here */
// Gắn sự kiện khi trang đã tải xong
window.addEventListener("load", function () {
  document.getElementById("sampleForm")
    .addEventListener("submit", checkForEmptyFields);
});

function checkForEmptyFields(e) {
  var errorArea = document.getElementById("errors");
  errorArea.className = "hidden";
  errorArea.textContent = "";

  var fields = document.querySelectorAll(
    "#sampleForm input[type=text], #sampleForm input[type=password]"
  );

  var fieldList = [];

  for (var i = 0; i < fields.length; i++) {
    if (fields[i].value.trim() === "") {
      fieldList.push(fields[i].id);
    }
  }

  if (fieldList.length > 0) {
    e.preventDefault();

    errorArea.textContent =
      "The following fields can't be empty: " + fieldList.join(", ");

    errorArea.className = "visible";
  }
}
