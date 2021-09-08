
$(document).ready(function () {
    console.log('tes');

    $('.contenido-dinamico').hide();

    $( ".box-single-video" ).click(function() {
        var titulo = $(this).attr('title');
        var parrafo = $(this).find('.texto-video').text();
        var urVideo = $(this).find('.link-video').text();
        var imgVideo = $(this).find('.imagen-video').attr('src');
        var srcPrincipal = $("#videoclip").attr('src');
        var posterPrincipal = $("#videoclip").attr('poster');

        $("#titulo-principal").text(titulo);
        $("#texto-principal").text(parrafo);
        $("#videoclip").attr('src', urVideo);
        $("#videoclip").attr('poster', imgVideo);

        console.log('titulo', titulo);
        console.log('parrafo', parrafo);
        console.log('urVideo', urVideo);
        console.log('srcPrincipal', srcPrincipal);
        console.log('imgVideo', imgVideo);
        console.log('posterPrincipal', posterPrincipal);
    });

    megusta=0;
    // $('#contador').html(localStorage.getItem("cuenta"));
    $( "#corazon" ).click(function() { 
        megusta= 1+megusta;
        console.log('megusta',megusta);
        $('#contador').html(megusta);
        localStorage.setItem("cuenta", megusta);
        $('#contador').html(localStorage.getItem("cuenta"));
    });
    /* var count = 0;
    $("#update").click(function() {
        count++;
        $("#counter").html("My current count is: "+count);
    }); */
});


if (localStorage.getItem('cuenta') !== null) {
    console.log(`cuentaexists`);
} else {
    console.log(`cuentanot found`);
}