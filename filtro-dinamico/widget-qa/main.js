// Your code
console.log('home servicios widget qa');

{% snippet "vue_js" %}
{% snippet "axios_js" %}

var vm = new Vue({
	delimiters: ['${', '}'],
	data: function() {
		return {
			prueba: null,
			test: null,
			rut: null,
			banco: null,
			axios_api: null,
			token:null,
			info: null,
		};
	},
	mounted: function() {
		this.getPrueba();
		console.log('test');
		axios
			  .get('http://localhost:3000/filtros')
			  .then(response => (this.info = response.data.simulaciones))
			  .catch(error => console.log(error))
	},
	methods: {
		getPrueba: function () {
				console.log('getPrueba simulacion dev...');
				var self = this;
				//var data = JSON.stringify({});
			  	var data = JSON.stringify({
					"paginacion": {
						"pagina": 1,
						"cantidad": 12
					},
					"rut": null,
					"idAgrupacion": null,
					"fechaInicio": null,
					"fechaTermino": null,
					"rutEjecutivo": "15728867-9", //77508900-8  15728867-9
					"estado": 1
				});
				var axios_api = axios.create({ //rbewijz1ka (dev)  - t1zs0fmctk (qa)
					baseURL: 'https://t1zs0fmctk.execute-api.us-east-1.amazonaws.com',
					headers: {
						'Content-Type': 'application/json'
					},
				  data : data
				});
				var axios_auth = axios.create();
				axios_auth.defaults.baseURL = '{{site.baseUrl}}' + '/api/profile/me';

				var injectToken = async function injectToken(config) {
					try {
						var response = await axios_auth.get();
						var newConfig = config;
						newConfig.headers = {
							Authorization: "Bearer " + response.data.delegated_token.access_token,
							'Content-Type': 'application/json'
						};
						return newConfig;
					} catch (error) {
						throw new Error('Unauthorized');
					}
				};

				axios_api.interceptors.request.use(injectToken);
				axios_api.post('/v1/retoma/simulaciones/filtrodinamico', data).then(function (response) {
					console.log('servicio filtrodinamico', response.data.filtros.simulaciones);
				  //self.prueba = response.data;
					self.prueba = response.data.filtros.simulaciones.sort( (a , b)  => (new Date(a.fechaAgrupacion)).getTime() > (new Date(b.fechaAgrupacion)).getTime()  );
					
				});

			}
	}
}).$mount('#test');
