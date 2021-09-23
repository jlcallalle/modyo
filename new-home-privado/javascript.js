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
    script.src = "https://consorcio-corredores-dev.modyo.be/widgets/modyo_form.js?form=fd5b44d8-5d24-41b5-803f-f43bd2084dc4&site=51719b67-035d-4d37-9fb5-2427c06a0396";
    script.async = true;
    var entry = document.getElementsByTagName("script")[0];
    entry.parentNode.insertBefore(script, entry);
  })();

$("#opinionModal").on('hidden.bs.modal', function () {
	 $(this).find('form')[0].reset();
});


