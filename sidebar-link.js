$('.box-spot-mes').click(function(){
    var url = window.location.href;
    console.log(url);
    var userString = 'cd-develop';
    var link = $(".sidebar-brand").attr("href", "https://invex.modyo.be/cd-develop-invex"); 
 });
});

$(document).ready(function () {
   $('.box-spot-mes').click(function(){
        var url = window.location.href;
        var urlDev = 'cd-develop-invex';
        if( url.indexOf(urlDev) > -1 ){
          $('.sidebar .nav-item a').each(function(){ 
               var oldUrl = $(this).attr("href"); // Get current url
               var newUrl = oldUrl.replace("https://invex.modyo.be/invex", "https://invex.modyo.be/cd-develop-invex"); // Create new url
               $(this).attr("href", newUrl); // Set herf value
               console.log('oldUrl', oldUrl);
               console.log('newUrl', newUrl);
          });
        }
   });
});
href="https://invex.modyo.be/invex  a  https://invex.modyo.be/cd-develop-invex
https://invex.modyo.be/invex/inicio a  https://invex.modyo.be/cd-develop-invex/inicio
https://invex.modyo.be/invex/historial a https://invex.modyo.be/cd-develop-invex/historial

$('.box-spot-mes').click(function(){
    var url = window.location.href;
    console.log(url);
    var userString = 'cd-develop';
    var link = $(".sidebar-brand").attr("href", "https://invex.modyo.be/cd-develop-invex"); 
 });


$('.sidebar .nav-item a').each(function(){ 
   var oldUrl = $(this).attr("href"); // Get current url
   var newUrl = oldUrl.replace("https://invex.modyo.be/invex", "https://invex.modyo.be/cd-develop-invex"); // Create new url
   $(this).attr("href", newUrl); // Set herf value
   console.log('oldUrl', oldUrl);
   console.log('newUrl', newUrl);
});