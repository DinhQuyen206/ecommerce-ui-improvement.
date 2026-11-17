/* code goes here */
var stories = document.getElementById("stories");

// Duyệt tất cả node con trực tiếp của stories
for (var i = 0; i < stories.childNodes.length; i++) {
  var node = stories.childNodes[i];

  console.log(
    "child " + i,
    node,
    "nodeType = " + node.nodeType
  );

  // Chỉ tô nền node phần tử HTML
  if (node.nodeType === 1) {
    node.style.backgroundColor = "yellow";
  }
}