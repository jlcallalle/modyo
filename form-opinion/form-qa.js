console.log('formulario opinion calidad');
document.getElementById("answers_29_value").value = "";
document.getElementById("answers_31_value").value = "";

$("#answers_29_value").attr("placeholder", "Escribe un motivo");   
$("#answers_29_value").attr('maxlength','70');
$("#answers_31_value").attr("placeholder", "Ingrese aquí tu comentario");
$("#answers_31_value").attr('maxlength','140');

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



/* Add Class Javascript*/
/* var el = document.getElementById('header');
if (el.className === 'header adminCNS'){
	console.log('js');
	var comparte = document.getElementsByClassName("section-comparte")[0];
  comparte.classList.add("d-none");
} 

var classAdmin = $('#header').attr('class');
if ( $("#header").hasClass( "adminCNS" ) ) {
	   console.log('es jquery');
    $(".section-comparte").addClass("d-none");
} */