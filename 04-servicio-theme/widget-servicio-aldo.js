{% snippet "vue_js" %}
{% snippet "axios_js" %}

//const link_api = "https://6a56-200-52-92-58.ngrok.io/actuator";
const externalApiBase = 'https://wsqa.invextarjetas.com.mx';
const urltokeninvex = 'https://wsqa.invextarjetas.com.mx/token';
const tokenAuth = 'TDVCQWxNUEE1Z19HTkZGVWU2MjlHbmgwS0c4YTpUSENUcGxpdnR4TW1KVU9PX2xKbnpTbE1YU2Nh';
 
const link_servicio = "https://wsqa.invextarjetas.com.mx/portal/1.0.0/consultaHistorial";
const tokenGenerado = 'CAAA4A4B29F921007B9CE033DCC734E3D163B4AE638B65D7235A3334C652DE51BA3362E6C6AD8A4A26CCDDB7186839EC';

const url_string_invex = window.location.href;
const url_invex = new URL(url_string_invex);
const token_invex = url_invex.searchParams.get("token");
const statusDic = {
	Captured: 'Pendiente',
	Executed: 'Ejecutad',
	Rejected: 'Rechazado',
	default: 'Desconocido'
};
const meses = [
	'Ene',
	'Feb',
	'Mar',
	'Abr',
	'May',
	'Jun',
	'Jul',
	'Ago',
	'Sep',
	'Oct',
	'Nov',
	'Dic',
];
console.log(token_invex);
 
var vm = new Vue({
	delimiters: ['${', '}'],
	data: function() {
		return {
			resultado: null,
		};
	},
	mounted: function() {
		this.getListaOperacion();
	},
	methods: {
			regresandoStatus(status) {
				return statusDic[status] || statusDic.default;
			},
			regresarFecha(fecha) {
				const fechaFormateada = new Date(fecha);
				let dia = fechaFormateada.getDate();
				if (dia < 10) dia = `0${dia}`;
				const mes = meses[fechaFormateada.getMonth()];
				const anio = fechaFormateada.getFullYear().toString().slice(2);
				return `${dia} ${mes} ${anio}`;
			},
			removerSlash(txt) {
				return txt.replaceAll('/', '');
			},
			getListaOperacion: function () {
				console.log('servicio consultaHistorial...');
				var self = this;
				
				var data = JSON.stringify({
					"fromDate": "2022-08-05",
					"toDate": "2022-08-05",
					"user360T": "INVEXCOMP1.TEST",
					"internetFolio": 9254,
					"origin": "P"
				});
				
				const axios_api = axios.create({ //0972vjesll  - t1zs0fmctk
					baseURL: 'https://wsqa.invextarjetas.com.mx/token',
					headers: {
						'Content-Type': 'application/json'
					},
				  data : data
				});
				  
				const injectToken = async (config) => {
					try {
					  const params = {
						grant_type: 'client_credentials',
					  };
					  const data = Object.keys(params)
						.map((key) => `${key}=${encodeURIComponent(params[key])}`)
						.join('&');
					  const response = await axios.post(`${urltokeninvex}`, data, {
						headers: {
						  'Content-Type': 'application/x-www-form-urlencoded',
						  Authorization: `Basic ${tokenAuth}`,
						},
					  });
					  const newConfig = config;
					  newConfig.headers.authorization = `Bearer ${response.data.access_token}`;
					  return newConfig;
					} catch (error) {
					  throw new Error('Unauthorized');
					}
				};

				axios_api.interceptors.request.use(injectToken);
				axios_api.post(link_servicio, data).then(function (response) {
					console.log(response);
					if (response.status === 'OK' && response.data?.catalogList) {
						self.resultado = response.data.catalogList.slice(0,3);
					}
				});
			}
			// end getListaOperacion
    }
}).$mount('#wrapper');
