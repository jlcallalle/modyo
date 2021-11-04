// Your code
console.log('home servicios widget dev');

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
			info: null

		};
	},
	mounted: function() {
		this.getTokenModyo();
		this.getPrueba();
		console.log('test');
	  // this.getResultFromToken();
		axios
			  .get('http://localhost:3000/simulaciones')
			  .then(response => (this.info = response.data))
			  .catch(error => console.log(error))
	},
	methods: {
		getTokenModyo: function () {
			var self = this;

			var data = JSON.stringify({});
			var axios_api = axios.create({
				baseURL: 'https://fphoqlwxwg.execute-api.us-east-1.amazonaws.com/v1',
				headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			});
			var axios_auth = axios.create();
			axios_auth.defaults.baseURL = '{{site.baseUrl}}' + '/api/profile/me';
			
		var injectToken = async function(config) {
			try {
				var response = await axios_auth.get('');
				self.token = response.data.delegated_token.access_token;
				var newConfig = config;
				newConfig.headers = {
					Authorization: "Bearer " + response.data.delegated_token.access_token,
					"Accept": "application/json",
					"Content-Type": "application/json",
				};
				return newConfig;
			} catch (error) {
				throw new Error('Unauthorized');
			}
		}

			axios_api.interceptors.request.use(injectToken);

			axios_api.get('/mandato-unico/test').then(function (response) {
				console.log(response);
				self.test = response.data;
			});

			axios_api.get('/mandato-unico/consultarMandatosUnicosPorRut?ncompany=2&sclient=11111111-1').then(function (response) {
				self.rut = response.data;
			});
			axios_api.get('/mandato-unico/bancos').then(function (response) {
				self.banco = response.data;
			});

		},
		
		getPrueba: function () {
				console.log('getPrueba...');
				var self = this;
				//var data = JSON.stringify({});
			
			
			
			  var data = JSON.stringify({
				"rut": "8827595-0",
				"numero_serie": "A012345678",
				"fecha_nacimiento": "1982-11-19",
				"captcha": "03AGdBq26eE4e__yP1QRa33xce7RYPG7TaV6WRvg_NuS8bh6Y6l3eXbNfovuElFzGO8kPHMjXz5rGCteGGap2UVWASTebav5JnQicl_tUh9thSVe8TRY0AiNXCbQ6Qiag8FU86mgOxXNtnbiCBUNjK5yp9_UJEKIMxGvsGrjKpT8ZRv7nWzkTxS28pbB2HyPm4oJhiBQIODXKBmR6WYz9jeaNo1xwlQyY80sRfoboudL42YJAE9kTk9Y-7J2fSzQAYbAi6kXYlcxxlpYvA672LEX_5HnSQ56nLu-NHQfVL3aMmuIJ6kGAzu0U3Cm0-03_j7ntsNfbuSrIj7RTjxcx7OV3I0iwXUl8KSIPdvXuY2TCNtdojsqwQFtjHp5sXx_IFAqpIMyRghQZL7kUiOCLwu23_yTcY9L5m85wtycB7oxY5Zb5XzzAPbIs0FSgo1E5NAOfLdbCP59FMygxytqHFvRvoez7lMYS67w"
				});
				var axios_api = axios.create({ //0972vjesll  - t1zs0fmctk rbewijz1ka
					baseURL: 'https://3i74cs2618.execute-api.us-east-1.amazonaws.com/v1',
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
				axios_api.post('/seguro-lider/rescate/consulta', data).then(function (response) {
					console.log(response);
				  self.prueba = response.data;
				});

			},
		getResultFromToken: function () {
			const params = new URLSearchParams();
			params.append("grant_type", "client_credentials");
			params.append("client_secret", "dc1d9fac-0550-466f-b8db-5419f73bb6cc");
			//params.append("client_secret", "9d9aacd6-7071-4206-8e06-00f60206a8db");
			params.append("client_id", "webCorredores2"); 
			//params.append("client_id", "wsMandatoUnico");
			const config = {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			};
			axios
				.post(
				"https://ssoqa.consorcio.cl/auth/realms/SitioClienteDistribuidor/protocol/openid-connect/token",
			/*	.post(
				"https://ssoqa.consorcio.cl/auth/realms/SsoConsorcioServicios/protocol/openid-connect/token",*/
				params,
				config
			)
				.then((result) => {
				console.log(result.data.access_token);
				axios
					.get(
					"https://fphoqlwxwg.execute-api.us-east-1.amazonaws.com/v1/mandato-unico/companias", {
						headers: {
							Authorization: "Bearer " + result.data.access_token,
						},
					}
				)
					.then((result) => {
					console.log(result);
				});
			})
				.catch((err) => {
				console.log(err);
			});
		},
	}
}).$mount('#test');
