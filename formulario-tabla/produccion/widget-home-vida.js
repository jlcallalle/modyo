{% snippet "vue_js" %}
{% snippet "axios_js" %}
{% snippet "liquid_js" %}

var vm = new Vue ({
	delimiters: ['${', '}'],
	data: {
		axios_api: null,
		baseUrl: 'https://www.consorcio.cl/PinCotizadorVida-web',
		loading: false,
		configCotizador: window.liquid.cotizadores,
		categoriasProductos:window.liquid.categorias,
		propuestasIsCollapsed: false,
		isCorredor: true,
		rolLimpio:'',
	},
	mounted: function() {
		this.initCarousel();
		//Initialize axios
		this.axios_api = axios.create({ 
			//https://ip9fi4sqxl.execute-api.us-east-1.amazonaws.com/v1
			baseURL: 'https://qa5hoqxbmf.execute-api.us-east-1.amazonaws.com/v1',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
		});

		var axios_auth = axios.create();
		axios_auth.defaults.baseURL = '{{site.baseUrl}}' + '/auth/openidc';
		var injectToken = async function(config) {
			try {
				var response = await axios_auth.get('/access_token');
				var newConfig = config;
				newConfig.headers = {
					Authorization: "Bearer " + response.data.access_token,
					"Accept": "application/json",
					"Content-Type": "application/json",
				};
				return newConfig;
			} catch (error) {
				throw new Error('Unauthorized');
			}
		}

		this.axios_api.interceptors.request.use(injectToken);

		const currentRol = '{{ user.custom_fields["_ucf_perfilusuario"] }}';
		this.rolLimpio = currentRol.replace(/["\][\\]/g, '').replace(/&quot;/g,'').toLowerCase();
		this.isCorredor = this.rolLimpio.toLowerCase().includes('corr');
		console.log(this.rolLimpio);
	},
	methods: {
		initCarousel: function() {
			$('#carouselHomeUnificado').carousel({
				interval: 5000
			});
		},
		toggleLoader: function() {
			this.loading = !this.loading;
		},
		getRol: function() {
			const currentRol = '{{ user.custom_fields["_ucf_perfilusuario"] }}';
			this.rolLimpio = currentRol.replace(/["\][\\]/g, '').replace(/&quot;/g,'').toLowerCase();
			if(this.rolLimpio.includes('cns')) return 'PIN_CORR_EJEC_ASIST';
			if(this.rolLimpio.includes('corr')) return 'PIN_CORR_CORREDOR';
		},
		getEncryptedData: function(data){
			return this.axios_api.post('/integracion-crm-ventas/encriptar', { data });
		},
		getUrl: function(item, categoria){
			this.loading = true;
			var self = this;
			var rol = this.getRol();
			var tipoRol = rol.toLowerCase().includes('corredor') ? 'corredor' : 'asistente';
			var rut = '{{ user.custom_fields['_ucf_rutcorredor'] }}'.replace(/-/g, '');
			var rutAcceso = tipoRol === 'corredor' ? rut.substring(0, rut.length - 1) : rut;
			//.substring(0, rut.length - 1)


			//Verificar si se tiene acceso
			this.axios_api.get(`/integracion-crm-ventas/${tipoRol}/${rutAcceso}/acceso-pin/`).then(async function (response) {
				if(item == 'buscar-cotizador' || item == 'mantencion' || item == 'traspaso' || categoria.name != "Otros productos"){
					//Inicializar variables
					var url = '';
					var cmd = '';
					var idSesion = '1';
					var branch = categoria ? categoria.branch : '1';
					var modulec = categoria ? categoria.modulec : '-1';
					var product = categoria ? categoria.product : '';
					var type = '';
					if(!self.isCorredor){
						rut = '0{{ user.custom_fields['_ucf_rutcorredor'] }}'.replace(/-/g, '');
					}
					if(response.data.tieneAcceso) {
						if(item === 'buscar-cotizador') { 
							cmd = 'buscarCotizacion';
							type = 'buscarCotizacion.do';
						}
						else if(item === 'mantencion') { 
							cmd = 'mantenedor'; 
							product = 0; 
							type = 'mantenedorPropuestas.do';
						}
						else if(item === 'traspaso') url = '/cargarParametros.do';
						else if(item === 'categoria') {
							type = 'cotizadorVida.do';
							cmd = 'Init';
						}

						if(url === '') {
							//Encriptar parametros
							const [
								rutEncrypted, 
								rolEncrypted, 
								cmdEncrypted, 
								branchEncrypted, 
								modulecEncrypted
							] = await Promise.all([
								self.getEncryptedData(rut),
								self.getEncryptedData(rol),
								self.getEncryptedData(cmd),
								self.getEncryptedData(branch),
								self.getEncryptedData(modulec)
							]);
							if(product !== '') product = await self.getEncryptedData(product);

							//Leer data encriptada
							rut = rutEncrypted.data.data;
							rol = rolEncrypted.data.data;
							cmd = cmdEncrypted.data.data;
							branch = branchEncrypted.data.data;
							modulec = modulecEncrypted.data.data;
							product = product.data ? product.data.data : product;

							//Armar URL
							if(item === 'buscar-cotizador') { 
								url = `/${type}?idSesion=${idSesion}&rut=${rut}&rutLogin=${rut}&perfil=${rol}&fechaConexion=1&cmd=${cmd}&branch=${branch}&product=${product}&modulec=${modulec}`;
							} else{
								url = `/${type}?idSesion=${idSesion}&rut=${rut}&perfil=${rol}&fechaConexion=1&cmd=${cmd}&branch=${branch}&product=${product}&modulec=${modulec}`; 
							}
						}

						//Abrir nueva pestaña con URL
						self.loading = false;
						url = url.replace(/\+/g,'%2B');
						//url = encodeURIComponent(url);
						window.open(self.baseUrl + url);
					} else {
						//Mostrar modal de no acceso
						self.loading = false;
						$('#noAccessModal').modal({})
					} 

					//} else {
					//self.loading = false;
					//$('#otherProductsModal').modal({})
				}
			});
		},
		getDate: function() {
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; 
			var yyyy = today.getFullYear();
			var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
			if(dd<10) dd = '0' + dd;
			if(mm<10) mm = '0' + mm;
			var currentDate = `${dd}/${mm}/${yyyy}${time}`;
			return currentDate;
		},
		collapsePropuestas: function() {
			this.propuestasIsCollapsed = $('#propuestasCollapse').is('.collapse:not(.show)');
		}
	},
}).$mount('#home-vida');