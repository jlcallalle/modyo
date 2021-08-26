 
$('.form-personal-info  .form-group:first-child .desc').text("¿Cúal es tu nombre?");
$('.form-personal-info  .form-group:nth-child(2) .desc').text("¿Cuáles son tus apellidos?");
$('.form-personal-info  .form-group:nth-child(3) .desc').text("¿Cúal es tu correo electrónico?");

    
$('.form-personal-info  .form-group:first-child .form-control').attr("placeholder", "Ej: Juan Carlos");
$('.form-personal-info  .form-group:nth-child(2) .form-control').attr("placeholder", "Ej: González Valdebenito");
$('.form-personal-info  .form-group:nth-child(3) .form-control').attr("placeholder", "Ej: gonzalez.valdebenito@gmail.com");
$('.form-body .form-group:nth-of-type(4) input').attr("placeholder", "Ej: 16978535-K");
$('.form-body .form-group:nth-of-type(5) input').attr("placeholder", "Ej: Corredor");
$('.form-body .form-group:last-of-type input').attr("placeholder", "Ej: González Valdebenito");

$("input").each(function (index) {	
	$(this).attr('maxlength','40');
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


$('.form-body .form-group:nth-of-type(1)').css('display', 'none');
$('.form-body .form-group:nth-of-type(2)').css('display', 'none');
$('.form-body .form-group:nth-of-type(3)').css('display', 'none');

const modyoName = $('.form-personal-info  .form-group:nth-child(1) .form-control').val();
const modyoLastName = $('.form-personal-info  .form-group:nth-child(2) .form-control').val();
const modyoEmail = $('.form-personal-info  .form-group:nth-child(3) .form-control').val();


$('.form-personal-info  .form-group:nth-child(1) .form-control').on('input', function() { 
      $('.form-body .form-group:nth-of-type(1) input').val($(this).val());
});
$('.form-personal-info  .form-group:nth-child(2) .form-control').on('input', function() { 
      $('.form-body .form-group:nth-of-type(2) input').val($(this).val());
});

$('.form-personal-info  .form-group:nth-child(3) .form-control').on('input', function() { 
      $('.form-body .form-group:nth-of-type(3) input').val($(this).val());
});
