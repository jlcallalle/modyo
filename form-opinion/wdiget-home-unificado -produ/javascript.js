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