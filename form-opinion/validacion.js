$(".form-group .form-control").each(function (index) {
  $(this).on("input", function () {
    var input = $(this).val().toString();
    if (input.match(/([\<])([^\>]{1,})*([\>])/i) === null) {
    } else {
      $(this).val("");
    }
  });
});



$(document).ready(function () {
    // Handler for .ready() called.
    window.setTimeout(function () {
      location.href = 'https://consorcio-corredores-dev.modyo.be/web-corredores';
    }, 2000);
  });