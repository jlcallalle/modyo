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
      
      // activa class en sidebar según rul
      var path = window.location.pathname;
      $(".sidebar  > li.nav-item > a.nav-link").each(function(){
        if ( path === '/cd-develop-invex/historial' && $(this).attr("href") == 'https://invex.modyo.be/cd-develop-invex/historial' || 
             path === '/cd-develop-invex/inicio' && $(this).attr("href") == 'https://invex.modyo.be/cd-develop-invex/inicio') {
              $('ul.navbar-nav .nav-item').removeClass("active");
              $(this).parent("li").addClass("active"); }
      });
      
      /* Agregar Texto Operaciones en Tabla Historial */
      setTimeout(function() { 
        $(".footer__row-count__select option").each(function(index){
                  $( this ).append(' Operaciones');
              });
      }, 1000);
      
      
      // despliega y oculta header alert, soporte, perfil 
      $('#menuAlerta, #menuSoporte, #menuPerfil, #myDropdown, #menuCerrar').on('show.bs.dropdown', function () {
          $('.invex-loader-theme').addClass('show');
      });
      
      $('#menuAlerta, #menuSoporte, #menuPerfil, #myDropdown, #menuCerrar').on('hidden.bs.dropdown', function() {
          $('.invex-loader-theme').removeClass('show');
      });
  
      
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