{% snippet "vue_js" %}
{% snippet "axios_js" %}
{% snippet "liquid_js" %}

var vm = new Vue ({
	delimiters: ['${', '}'],
	data: function() {
		return {
			diaActual:'',
			info: null,
			simulaciones: null,
			isActiveMenuSide: false,
			categoriasProductos: window.liquid.categorias,
			axios_api: null,
            prueba: null,
		};
	},
	mounted: function() {
		this.initCarousel();
		this.getDiaActual();
		this.getIndicadores();
        this.getPrueba();
		const target = document.querySelector('.menu-side-slide-content');
        document.addEventListener('click', (event) => {
            const withinBoundaries = event.composedPath().includes(target);
            if (withinBoundaries) {
                console.log('click inside');
            } else {
                console.log('click outside');
                this.isActiveMenuSide = false;
                document.querySelector('.menu-side-slide').classList.remove('active');
            }
        });
		
		//Initialize axios
		this.axios_api = axios.create({
			baseURL: 'https://ip9fi4sqxl.execute-api.us-east-1.amazonaws.com/v1',
			//baseURL: 'https://qa5hoqxbmf.execute-api.us-east-1.amazonaws.com/v1/',
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
		
		axios
			  .get('http://localhost:3000/simulaciones')
			  .then(response => (this.simulaciones = response.data))
			  .catch(error => console.log(error))
		axios
			  .get('https://api.coindesk.com/v1/bpi/currentprice.json')
			  .then(response => (this.info = response.data.bpi))
			  .catch(error => console.log(error))
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
		},
		
		getIndicadores: function () {
				console.log('getIndices...');
				var self = this;
				var data = JSON.stringify({});
				var axios_api = axios.create({ //0972vjesll
					baseURL: 'https://xrr8zq3x1e.execute-api.us-east-1.amazonaws.com/v1/passthrough-gate/dev-api-indicadores-economicos/v1',
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
				axios_api.post('/indices-economicos', data).then(function (response) {
					self.fecha = response.data.DTORetornoIndicesEconomicos.fecha_sistema;
					self.valor = response.data.DTORetornoIndicesEconomicos.valor_uf;
				});

			},
		getRol: function() {
			const currentRol = '{{ user.custom_fields["_ucf_perfilusuario"] }}';
			this.rolLimpio = currentRol.replace(/["\][\\]/g, '').replace(/&quot;/g,'').toLowerCase();
			if(this.rolLimpio.includes('cns')) return 'PIN_CORR_EJEC_ASIST';
			if(this.rolLimpio.includes('corr')) return 'PIN_CORR_CORREDOR';
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
					console.log(!self.isCorredor);
					if(rut < 7){
						console.log('rut-mayor 7-', rut, rut.length);
					} else {
						console.log('rut-menor 7-', rut, rut.length);
					}
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
                "rutEjecutivo": "77508900-8", //77508900-8  15728867-9
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

        },
		urlContinuar() {
            window.location.href = `/web-corredores/seguros-generales/venta/planes?ids=126`;
        },
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


