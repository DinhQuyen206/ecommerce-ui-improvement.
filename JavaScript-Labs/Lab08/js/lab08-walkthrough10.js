function Order(product, price, quantity) {
  this.product = product;
  this.price = price;
  this.quantity = quantity;

  this.total = function () {
    return this.price * this.quantity;
  };

  this.output = function () {
    document.write("<p>Product = " + this.product + "<br>");
    document.write("Price = " + this.price + "<br>");
    document.write("Quantity = " + this.quantity + "<br>");
    document.write("Total = " + this.total() + "</p>");
  };
}

var example1 = new Order("Self Portrait in a Straw Hat", 15, 2);
var example2 = new Order("Untitled #23", 10, 4);

example1.output();
example2.output();