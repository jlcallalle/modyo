{% snippet "vue_js" %}
{% snippet "axios_js" %}

var vm = new Vue ({
	delimiters: ['${', '}'],
	data: function() {
		return {
			diaActual:'',
		};
	},
	mounted: function() {
		this.initCarousel();
		this.getDiaActual();
	},
	methods: {
		initCarousel: function() {
	   $('#carouselHomeUnificado').carousel({
      interval: 5000
    	});
		},
		getDiaActual: function() {
			  const self = this;
				const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
														"julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
				const dateObj = new Date();
				const month = monthNames[dateObj.getMonth()];
				const day = String(dateObj.getDate()).padStart(2, '0');
				const year = dateObj.getFullYear();
				const output = `${day} de ${month} de ${year}`;
				self.diaActual = output; 
		}
	},
}).$mount('#home-vida');
 

  (function(){
    var script = document.createElement("script");
    script.src = "https://consorcio-corredores-dev.modyo.be/widgets/modyo_form.js?form=fd5b44d8-5d24-41b5-803f-f43bd2084dc4&site=51719b67-035d-4d37-9fb5-2427c06a0396";
    script.async = true;
    var entry = document.getElementsByTagName("script")[0];
    entry.parentNode.insertBefore(script, entry);
  })();

$("#opinionModal").on('hidden.bs.modal', function () {
	 $(this).find('form')[0].reset();
});


