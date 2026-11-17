$(function () {
  $(".panel")
    .on("mousemove", function (e) {
      $("#message").text(
        "x=" + e.pageX + " y=" + e.pageY
      );
    })
    .on("mouseleave", function () {
      $("#message").text("goodbye!");
    })
    .on("click", function () {
      $("#message").text("stopped move reporting");
      $(".panel").off("mousemove");
    });
});