console.log('formulario opinion desarrollo');
document.getElementById("answers_13_value").value = "";
document.getElementById("answers_12_value").value = "";

$("#answers_13_value").attr("placeholder", "Escribe un motivo");   
$("#answers_13_value").attr('maxlength','70');
$("#answers_12_value").attr("placeholder", "Ingrese aquí tu comentario");
$("#answers_12_value").attr('maxlength','140');

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

//Ocultar Sección comparte cuando es perfil admin
var classAdmin = $('#header').attr('class');
if ( $("#header").hasClass( "adminCNS" ) ) {
    $(".section-comparte").addClass("d-none");
}


 