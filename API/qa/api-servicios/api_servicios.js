{% snippet "vue_js" %}
{% snippet "axios_js" %}

var vm = new Vue({
	delimiters: ['${', '}'],
	data: function() {
		return {
			test: null,
			rut: null,
			banco: null,
			axios_api: null,
			token:null,

		};
	},
	mounted: function() {
		this.getTokenModyo();
		console.log('test');
	  // this.getResultFromToken();


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
