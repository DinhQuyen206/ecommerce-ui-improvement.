$(function () {
  $("#consume").on("click", function () {
    //var url =
      //"https://www.randyconnolly.com/funwebdev/services/travel/cities.php";
      
    // Dịch vụ gốc gặp lỗi chứng chỉ HTTPS khi kiểm tra.
    // Dùng JSON cục bộ để tiếp tục thực hành GET.
        var url = "data/cities.json";

    $("#results").text("Đang tải dữ liệu...");

    $.get(url, function (data) {
      var list = $("<ul></ul>");

      $.each(data, function (index, city) {
        $("<li>").text(city.name).appendTo(list);
      });

      $("#results").empty().append(list);
    }, "json")
      .fail(function (xhr, status, error) {
        $("#results").text(
          "Không tải được dữ liệu. Xem Console để biết chi tiết."
        );

        console.error("GET thất bại:", status, error);
      });
  });
});
