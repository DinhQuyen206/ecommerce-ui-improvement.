$(function () {
  $(".animLoading").hide();

  $("#consume").on("click", function () {
    // Dùng JSON cục bộ do dịch vụ gốc gặp lỗi chứng chỉ
    var url = "data/cities.json";

    $("#results").html("<ul></ul>");
    $(".animLoading").show();
    $("#consume").prop("disabled", true);

    $.get(url, null, null, "json")
      .done(function (data) {
        $.each(data, function (index, city) {
          $("<li>")
            .text(city.name)
            .appendTo("#results ul");
        });
      })
      .fail(function (xhr, status, error) {
        $("#results").text(
          "Không tải được dữ liệu: " + status
        );

        console.error("GET thất bại:", xhr.status, error);
      })
      .always(function () {
        $(".animLoading").fadeOut("slow");
        $("#consume").prop("disabled", false);
      });
  });
});