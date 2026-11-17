/* put your animation code here */
$(function () {
  $("#btnFadeIn").on("click", function () {
    $("figure").fadeIn(1000);
  });

  $("#btnFadeOut").on("click", function () {
    $("figure").fadeOut(1000);
  });

  $("#btnFade").on("click", function () {
    $("figure").fadeToggle(500);
  });

  $("#btnSlideDown").on("click", function () {
    $("figure").slideDown("slow");
  });

  $("#btnSlideUp").on("click", function () {
    $("figure").slideUp("slow");
  });

  $("#btnSlide").on("click", function () {
    $("figure").slideToggle(2000);
  });
});
