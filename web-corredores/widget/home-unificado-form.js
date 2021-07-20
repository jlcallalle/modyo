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
    script.src = "https://consorcio-corredores-qa.modyo.be/widgets/modyo_form.js?form=d6d521bd-92df-4efe-ab5a-2924674965bb&site=f3377097-18f7-472c-8d4d-f234b742a58e";
    script.async = true;
    var entry = document.getElementsByTagName("script")[0];
    entry.parentNode.insertBefore(script, entry);
  })();

$("#opinionModal").on('hidden.bs.modal', function () {
	 $(this).find('form')[0].reset();
});
