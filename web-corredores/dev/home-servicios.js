var vm = new Vue({
    components: {
        mSlideOutPanel: MDrawer,
    },
    delimiters: ['${', '}'],
    data: function() {
        return {
            title: 'Hola Vue',
            test: null,
            rut: null,
            banco: null,
            axios_api: null,
            isRol:null,
            info: null
        };
    },
    mounted: function() {
        this.getIndicadores();
        this.isRol('{{ user.custom_fields._ucf_perfilusuario }}');
        this.isCorredor = this.rol.toLowerCase().includes('corr');

        this.axios_api = axios.create({ 
            baseURL: 'https://ip9fi4sqxl.execute-api.us-east-1.amazonaws.com/v1',
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
          .get('https://api.coindesk.com/v1/bpi/currentprice.json')
          .then(response => (this.info = response.data.bpi))

    },
    methods: {
        getIndicadores: function () {
            var self = this;

            var data = JSON.stringify({});
            var axios_api = axios.create({ //xrr8zq3x1e   0972vjesll
                //baseURL: 'https://0sxttyhh2f.execute-api.us-east-1.amazonaws.com/v1/passthrough-gate/dev-api-indicadores-economicos/v1',
                baseURL: 'https://fphoqlwxwg.execute-api.us-east-1.amazonaws.com/v1',
                headers: {
                    'Content-Type': 'application/json'

                },
                data : data
            });
            var axios_auth = axios.create();
            axios_auth.defaults.baseURL = '{{site.baseUrl}}' + '/auth/openidc';

            var injectToken = async function injectToken(config) {
                try {
                    var response = await axios_auth.get('/access_token');
                    var newConfig = config;
                    newConfig.headers = {
                        Authorization: "Bearer " + response.data.access_token,
                        'Content-Type': 'application/json'
                    };
                    return newConfig;
                } catch (error) {
                    throw new Error('Unauthorized');
                }
            };

            axios_api.interceptors.request.use(injectToken);
            axios_api.get('/mandato-unico/test').then(function (response) {
                self.test = response.data;
            });
            
                axios_api.get('mandato-unico/consultarMandatosUnicosPorRut?ncompany=2&sclient=11111111-1').then(function (response) {
                self.rut = response.data;
            });
                axios_api.get('/mandato-unico/bancos').then(function (response) {
                self.banco = response.data;
            });

        },

    }
}).$mount('#test')