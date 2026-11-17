// define constructor function for Country objects
function Country(name, iso, capital, population) {
    this.name = name;
    this.iso = iso;
    this.capital = capital;
    this.population = population;
}

// create an array of country objects
var countries = [
    new Country("Bahamas", "BS", "Nassau", 301790),
    new Country("Canada", "CA", "Ottawa", 33679000),
    new Country("Germany", "DE", "Berlin", 81802257),
];

// you can also push each new country object onto the end of the array
countries.push(new Country("Spain", "ES", "Madrid", 46505963));
countries.push(new Country("United Kingdom", "GB", "London", 62348447));

/* your code goes here */
// Duyệt từng quốc gia trong mảng
for (var i = 0; i < countries.length; i++) {
  var c = countries[i];

  document.write("<div class='box'>");

  // Mã ISO được dùng để tạo đường dẫn ảnh quốc kỳ
  document.write(
    "<img src='flags/" + c.iso + ".png' " +
    "class='boxImg' alt='Flag of " + c.name + "'>"
  );

  // Duyệt các thuộc tính của đối tượng quốc gia
  for (var propertyName in c) {
    document.write("<strong>" + propertyName + ": </strong>");
    document.write(c[propertyName] + "<br>");
  }

  document.write("</div>");
}