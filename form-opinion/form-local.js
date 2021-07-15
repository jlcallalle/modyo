console.log('formulario opinion local');
document.getElementById("answers_3601_value").value = "";
document.getElementById("answers_3602_value").value = "";

$("form").addClass("formulario-opinion");
$(".radio").wrapAll( "<div class='box-radio' />");
$("#answers_3601_value").attr("placeholder", "Escribe un motivo");  
$("#answers_3602_value").attr("placeholder", "Ingrese aquí tu comentario");  
$("#answers_3602_value").attr('maxlength','120');

$(".users-form-response-form .form-group").each(function(index, value){
	 if ( index== "0" || index== "1" || index== "2"  ) {
       $( this ).addClass("group-item");
    }
	if ( index== "2" ) {
      $( this ).addClass("comentario");
    } 
	if ( index== "3" ) {
      $( this ).addClass("group-ranking ranking");
    } 
});

$( "<div class='form-actions form-next group-item'> <a class='btn btn-primary btn-next' href='#'>Enviar</a> </div>" ).insertAfter( ".comentario" );
$( ".form-next" ).after( "<div class='box-check group-ranking'><div class='icon-check'> ✔ </div></div>" );

$( ".group-ranking" ).wrapAll( "<div class='box-ranking' />");
$( ".group-item" ).wrapAll( "<div class='box-items' />");
$( ".box-ranking" ).addClass("d-none");  
$( ".form-actions input" ).addClass("d-none"); 

$( ".btn-next" ).click(function() {
	$(".box-ranking").removeClass("d-none");  
	$(".form-actions input").removeClass("d-none"); 
	$(".box-items").addClass("d-none"); 
})

