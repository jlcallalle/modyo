{% snippet "vue_js" %}
{% snippet "axios_js" %}

var vm = new Vue ({
	delimiters: ['${', '}'],
	data: function() {
		return {
		};
	},
	mounted: function() {
		this.initCarousel();
	},
	methods: {
		initCarousel: function() {
	   $('#carouselHomeUnificado').carousel({
      interval: 5000
    });
		},
	},
}).$mount('#home-unificado');
 
 
 (function(){
	 var script = document.createElement("script");
	 script.src = "https://portal-corredores.consorcio.cl/widgets/modyo_form.js?form=917ef33b-fcc3-4b86-aba0-1e035ec3c098&site=95c77c99-6aae-424d-b5fd-67d80d0045e4";
	 script.async = true;
	 var entry = document.getElementsByTagName("script")[0];
	 entry.parentNode.insertBefore(script, entry);
 })();

$("#opinionModal").on('hidden.bs.modal', function () {
	 $(this).find('form')[0].reset();
});
