console.log('formulario opinion local');
document.getElementById("answers_3601_value").value = "";
document.getElementById("answers_3602_value").value = "";

$("#answers_3601_value").attr("placeholder", "Escribe un motivo");  
$("#answers_3601_value").attr('maxlength','70');
$("#answers_3602_value").attr("placeholder", "Ingrese aquí tu comentario");  
$("#answers_3602_value").attr('maxlength','140');

$(".radio").wrapAll( "<div class='box-radio' />");

$(".users-form-response-form .form-group").each(function(index, value){
	if ( index== "3" ) {
      $( this ).addClass("ranking");
    } 
});

$(".form-group .form-control").each(function (index) {	
  $(this).on("input", function () {
    var input = $(this).val().toString();
    if (input.match(/([\<])([^\>]{1,})*([\>])/i) === null) {
    } else {
      $(this).val("");
    }
  });
});

