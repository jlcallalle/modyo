(function($) {
    "use strict"; // Start of use strict
  
    // Toggle the side navigation
    $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
      if ($(".sidebar").hasClass("toggled")) {
        $('.sidebar .collapse').collapse('hide');
      }
    });
      
      /* $("#LogoutA, #LogoutButton").on('click', function(e) {
          localStorage.clear();
          window.location.href = 'https://cdincom03.invexgf.com/';
    }); */ 
      
      // $("#tipoOperacionlSelect option[value='SWAP']").remove();
      
      // activa class en sidebar según rul
      var path = window.location.pathname;
      $(".sidebar  > li.nav-item > a.nav-link").each(function(){
       // console.log('g', $(this).attr("href"));
              if (path === '/invex/historial' && $(this).attr("href") == 'https://invex.modyo.be/invex/historial' || 
            path === '/invex/inicio' && $(this).attr("href") == 'https://invex.modyo.be/invex/inicio') {
                  // console.log('a', $(this).attr("href"));
                  $('ul.navbar-nav .nav-item').removeClass("active");
                  $(this).parent("li").addClass("active");
              }
      });
      
      /* Agregar Texto Operaciones en Tabla Historial */
      setTimeout(function() { 
        $(".footer__row-count__select option").each(function(index){
                  $( this ).append(' Operaciones');
              });
      }, 1000);
      
     
       // $('.dropdown-toggle').dropdown();
      $('#myDropdown, #menuCerrar').on('show.bs.dropdown', function () {
          $('.invex-loader-theme').addClass('show');
      });
      
      $('#myDropdown, #menuCerrar').on('hidden.bs.dropdown', function(e) {
          $('.invex-loader-theme').removeClass('show');
    });
      
      // header alert 
      $('#menuAlerta').on('show.bs.dropdown', function () {
          $('.invex-loader-theme').addClass('show');
      });
      
      $('#menuAlerta').on('hidden.bs.dropdown', function(e) {
          $('.invex-loader-theme').removeClass('show');
    });
      
      // header soporte 
      $('#menuSoporte').on('show.bs.dropdown', function () {
          $('.invex-loader-theme').addClass('show');
      });
      
      $('#menuSoporte').on('hidden.bs.dropdown', function(e) {
          $('.invex-loader-theme').removeClass('show');
    });
      
      // header perfil 
      $('#menuPerfil').on('show.bs.dropdown', function () {
          $('.invex-loader-theme').addClass('show');
      });
      
      $('#menuPerfil').on('hidden.bs.dropdown', function(e) {
          $('.invex-loader-theme').removeClass('show');
    });
      
      
      
      
      /* setTimeout(function() { 
        $(".box-actividad  .item-actividad").each(function(index, value ){
                  console.log('index', index);
                  if(index <= 2) {
                       $('.show-more').hide();
                       console.log('show more oculto < 3 item', index);
                  }
          });
      }, 1500); */
      
  
      // togge actividad header
       /* $( ".show-more" ).click(function( event ) {
           console.log('click show more');
           $(this).parents().find(".item-actividad.hide").removeClass('hide');
           $(this).remove();
           return false;
       });  */
  
      
  })(jQuery); // End of use strict
  
  // MENU NAV 
  
  function darken_screen(yesno){
    if( yesno == true ){
        document.querySelector('.screen-darken').classList.add('active');
    }
    else if(yesno == false){
        document.querySelector('.screen-darken').classList.remove('active');
    }
  }
  
  function close_offcanvas(){
    darken_screen(false);
    document.querySelector('.mobile-offcanvas.show').classList.remove('show');
    document.body.classList.remove('offcanvas-active');
  }
  
  function show_offcanvas(offcanvas_id){
    darken_screen(true);
    document.getElementById(offcanvas_id).classList.add('show');
    document.body.classList.add('offcanvas-active');
  }
  
  document.addEventListener("DOMContentLoaded", function(){
    document.querySelectorAll('[data-trigger]').forEach(function(everyelement){
        
        let offcanvas_id = everyelement.getAttribute('data-trigger');
        
        everyelement.addEventListener('click', function (e) {
            e.preventDefault();
            show_offcanvas(offcanvas_id);
        });
    });
  
    document.querySelectorAll('.btn-close').forEach(function(everybutton){
        
        everybutton.addEventListener('click', function (e) {
            e.preventDefault();
            close_offcanvas();
          });
    });
  
    document.querySelector('.screen-darken').addEventListener('click', function(event){
        close_offcanvas();
    }); 
    
  }); 