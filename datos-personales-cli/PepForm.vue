<template>
  <div class="content-pep">
    <div class="row">
      <div class="col-lg-12">
        <div class="d-flex align-items-center mb-6">
          <div>
            <p class="mb-0 mr-3 c-primary-b">
              ¿El propietario de vehículo o un familiar (hasta 2do grado), pueden ser clasificados como una Persona Políticamente Expuesta (PEP)?
            </p>
          </div>
          <div class="d-flex align-items-center mr-3">
            <span>
              <input
                id="PEP"
                v-model="isPEP"
                type="checkbox"
                class="radio-circle-input"
                name="PEP"
                checked="checked"
                @click="pushGTM('DP - Si Polizas vigentes ', 'DP - Si Polizas vigentes', 'clic');">
              <label
                for="PEP"
                class="radio-circle mb-0" />
            </span>
          </div>
        </div>

        <div
          :class="isPEP ? '' : 'd-none'"
          class="box-pep mb-10">
          <div class="row">
            <div class="col-lg-4">
              <div class="form-group pep">
                <label
                  class="form-label"
                  for="fechaPEP">Fecha</label>
                <date-picker
                  v-model="fPep"
                  :min-date="new Date()"
                  :update-on-input="true"
                  :popover="{ visibility: 'click' }"
                  @dayclick="formatFechaPEP($event); $parent.validadorVacioDate($event)">
                  <template #default="{ inputValue, inputEvents }">
                    <input
                      id="fechaPEP"
                      v-model="fechaClientePep"
                      class="form-field"
                      :value="inputValue"
                      autocomplete="off"
                      v-on="inputEvents"
                      @keyup="$parent.clearInputDate($event)">
                    <label
                      style="display: none;"
                      class="form-error">Fecha no puede estar vacía</label>
                  </template>
                </date-picker>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="form-group">
                <label
                  class="form-label"
                  for="nombreClientePep">Nombre cliente</label>
                <input
                  id="nombreClientePep"
                  v-model="nombreClientePep"
                  v-uppercase
                  class="form-field"
                  type="text"
                  @input="$parent.validadorVacio"
                  @keyup="$parent.clearInput"
                  @click="$parent.validadorVacio">
                <label
                  style="display: none;"
                  class="form-error">Nombre no puede estar vacio</label>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="form-group">
                <label
                  class="form-label"
                  for="rutClientePep">Rut</label>
                <input
                  id="rutClientePep"
                  v-model="rutClientePep"
                  v-format-rut
                  class="form-field"
                  type="text"
                  @input="validadorRutPep($event)"
                  @keyup="validadorRutPep($event);"
                  @click="$parent.validadorVacio, validadorRutPep($event)">
                <label
                  style="display: none;"
                  class="form-error">El rut es incorrecto</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-7 d-flex align-items-center">
              <div class="d-flex align-items-center">
                <svg
                  class="mr-2"
                  width="37"
                  height="33"
                  viewBox="0 0 37 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.9019 1.49999C17.0566 -0.500007 19.9434 -0.5 21.0981 1.5L36.2535 27.75C37.4082 29.75 35.9648 32.25 33.6554 32.25H3.34455C1.03515 32.25 -0.408221 29.75 0.74648 27.75L15.9019 1.49999Z"
                    fill="#999999" />
                  <path
                    d="M17.041 12.6338C17.041 11.7607 17.5273 11.3242 18.5 11.3242C19.4727 11.3242 19.959 11.7607 19.959 12.6338C19.959 13.0498 19.8359 13.375 19.5898 13.6094C19.3496 13.8379 18.9863 13.9521 18.5 13.9521C17.5273 13.9521 17.041 13.5127 17.041 12.6338ZM19.8359 25H17.1553V15.1738H19.8359V25Z"
                    fill="white" />
                </svg>
                <p class="fs-1 mb-0">
                  Debe descargar el documento PEP  completarlo y enviarlo
                </p>
              </div>
            </div>
            <div class="col-lg-5">
              <button
                type="button"
                :disabled="!isDisabled"
                class="btn btn-secondary-corp fs-3 w-100 rounded-s"
                @click="downloadPEPFile">
                Descargar documento PEP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="layout-box-pep">
      <div class="row">
        <div class="col-lg-12">
          <div class="d-flex align-items-center mb-6">
            <div>
              <p class="mb-0 mr-3 c-primary-b">
                ¿El propietario de vehículo o un familiar (hasta 2do grado), pueden ser clasificados como una Persona Políticamente Expuesta (PEP)?
              </p>
            </div>
            <div class="d-flex align-items-center mr-3">
              <div class="box-radio-pep">
                <span>
                  <input
                    id="no"
                    v-model="picked"
                    type="radio"
                    name="condicionPep"
                    value="no"
                    checked
                    wfd-invisible="true">
                  <label
                    class="mask-radio mask-radio mask-text-false"
                    for="no" />
                </span>
                <span>
                  <input
                    id="si"
                    v-model="picked"
                    type="radio"
                    name="condicionPep"
                    value="si"
                    wfd-invisible="true">
                  <label
                    class="mask-radio mask-radio mask-text-true"
                    for="si" />
                </span>
                <span class="d-none">Picked: {{ picked }}</span>
              </div>
            </div>
          </div>
          <div class="box-ver-descripcion">
            <div class="box-icon-alert">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21 12C21 7.03125 16.9688 3 12 3C7.03125 3 3 7.03125 3 12C3 16.9688 7.03125 21 12 21C16.9688 21 21 16.9688 21 12Z"
                  stroke="#003DA5"
                  stroke-width="1.5"
                  stroke-miterlimit="10" />
                <path
                  d="M11.7307 7.7837L11.9998 13.5001L12.2684 7.7837C12.2701 7.74716 12.2642 7.71066 12.2513 7.67644C12.2384 7.64222 12.2186 7.61099 12.1932 7.58467C12.1678 7.55834 12.1373 7.53748 12.1036 7.52334C12.0698 7.5092 12.0336 7.5021 11.997 7.50245V7.50245C11.9609 7.50279 11.9251 7.51041 11.892 7.52486C11.8589 7.53931 11.829 7.56028 11.8041 7.58653C11.7793 7.61278 11.76 7.64377 11.7474 7.67765C11.7348 7.71152 11.7291 7.74759 11.7307 7.7837V7.7837Z"
                  stroke="#003DA5"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round" />
                <path
                  d="M12 17.2459C11.8146 17.2459 11.6333 17.1909 11.4792 17.0879C11.325 16.9848 11.2048 16.8384 11.1339 16.6671C11.0629 16.4958 11.0443 16.3073 11.0805 16.1255C11.1167 15.9436 11.206 15.7765 11.3371 15.6454C11.4682 15.5143 11.6352 15.425 11.8171 15.3889C11.999 15.3527 12.1875 15.3713 12.3588 15.4422C12.5301 15.5132 12.6765 15.6333 12.7795 15.7875C12.8825 15.9417 12.9375 16.1229 12.9375 16.3084C12.9375 16.557 12.8387 16.7954 12.6629 16.9713C12.4871 17.1471 12.2486 17.2459 12 17.2459Z"
                  fill="#003DA5" />
              </svg>
              <a
                href=""
                data-toggle="modal"
                data-target="#exampleModal">Ver descripción PEP</a>
            </div>
          </div>
          <div class="info-pep-detalle">
            <div v-if="picked == 'no'" />
            <div
              v-else
              class="box-input-pep">
              <div class="row">
                <div class="col-lg-12">
                  <div class="form-group group-relacion">
                    <label
                      class="form-label"
                      for="relacionClientePep">Describa la relación y funciones desempeñadas por el PEP</label>
                    <textarea
                      id="relacionClientePep"
                      class="form-control relacionPep"
                      rows="3"
                      maxlength="200"
                      @click="clickRelacion" />
                    <label
                      style="display: none;"
                      class="form-error">Campo relación no puede estar vacio</label>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="form-group group-donde">
                    <label
                      class="form-label"
                      for="dondeClientePep">¿Donde?</label>
                    <textarea
                      id="dondeClientePep"
                      class="form-control dondePep"
                      rows="3"
                      maxlength="200" />
                    <label
                      style="display: none;"
                      class="form-error">Campo donde no puede estar vacio</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <div class="box-info-exclama">
                    <div class="box-icon-exclama">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M4.01087 20.918H19.9887C20.2482 20.9179 20.5032 20.8506 20.7289 20.7224C20.9546 20.5943 21.1432 20.4099 21.2762 20.1871C21.4093 19.9643 21.4823 19.7108 21.488 19.4513C21.4938 19.1919 21.4322 18.9354 21.3092 18.7069L13.3207 3.87094C12.754 2.81906 11.2456 2.81906 10.6788 3.87094L2.6904 18.7069C2.56738 18.9354 2.50574 19.1919 2.51151 19.4513C2.51728 19.7108 2.59026 19.9643 2.72331 20.1871C2.85637 20.4099 3.04495 20.5943 3.27063 20.7224C3.49631 20.8506 3.75136 20.9179 4.01087 20.918V20.918Z"
                          stroke="#53565A"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round" />
                        <path
                          d="M11.7309 9.15892L12 14.8777L12.2686 9.16127C12.2702 9.12472 12.2644 9.08823 12.2515 9.054C12.2385 9.01978 12.2188 8.98855 12.1934 8.96223C12.168 8.93591 12.1375 8.91504 12.1037 8.9009C12.07 8.88677 12.0337 8.87966 11.9971 8.88002V8.88002C11.9612 8.88037 11.9257 8.88792 11.8927 8.90222C11.8597 8.91652 11.83 8.93728 11.8052 8.96328C11.7803 8.98928 11.761 9.01998 11.7482 9.05359C11.7355 9.08719 11.7296 9.12301 11.7309 9.15892V9.15892Z"
                          stroke="#53565A"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round" />
                        <path
                          d="M12 18.6211C11.8146 18.6211 11.6333 18.5661 11.4792 18.4631C11.325 18.3601 11.2048 18.2137 11.1339 18.0424C11.0629 17.8711 11.0443 17.6826 11.0805 17.5007C11.1167 17.3188 11.206 17.1518 11.3371 17.0207C11.4682 16.8896 11.6352 16.8003 11.8171 16.7641C11.999 16.7279 12.1875 16.7465 12.3588 16.8175C12.5301 16.8884 12.6765 17.0086 12.7795 17.1627C12.8825 17.3169 12.9375 17.4982 12.9375 17.6836C12.9375 17.9322 12.8387 18.1707 12.6629 18.3465C12.4871 18.5223 12.2486 18.6211 12 18.6211Z"
                          fill="#53565A" />
                      </svg>
                      <span>Debe descargar el documento PEP completarlo y enviarlo</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <div class="box-info-descarga">
                    <div class="box-icon-descarga">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 24H25"
                          stroke="#003DA5"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round" />
                        <path
                          d="M21 12.7888L16 17.75L11 12.7887"
                          stroke="#003DA5"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round" />
                        <path
                          d="M16 17.0607L16 7.00004"
                          stroke="#003DA5"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round" />
                      </svg>
                      <button
                        type="button"
                        @click="downloadPEPFile">
                        Descargar documento PEP
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <span class="state-pep">Picked: {{ picked }}</span>
    <span class="state-pep">isPEP: {{ isPEP }}</span>

    <div
      id="exampleModal"
      class="modal modal-info-pep fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div
        class="modal-dialog modal-dialog-scrollable"
        role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              id="exampleModalLabel"
              class="modal-title">
              Información PEP
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close">
              <span aria-hidden="true">Cerrar<svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 15L9 9"
                  stroke="#0A3682"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round" />
                <path
                  d="M9 15L15 9"
                  stroke="#0A3682"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round" />
                <path
                  d="M21 12C21 7.03125 16.9688 3 12 3C7.03125 3 3 7.03125 3 12C3 16.9688 7.03125 21 12 21C16.9688 21 21 16.9688 21 12Z"
                  stroke="#0A3682"
                  stroke-width="1.5"
                  stroke-miterlimit="10" />
              </svg></span>
            </button>
          </div>
          <div class="modal-body">
            <div class="box-modal-pep">
              <div class="item-modal-pep">
                <h5>“Según Normativa de la CMF , una Persona Expuesta Políticamente (PEP) se define como :</h5>
                <ul>
                  <li>Aquellas que desempeñan o han desempeñado en el último año funciones publicas destacas en Chile o en el extranjero. </li>
                  <li>Al cónyuge PEP. </li>
                  <li>Familiares de hasta segundo grado de consanguinidad de un PEP (madre, padre, hijo(a), abuelo (a), nieto (a).</li>
                  <li>Personas naturales con las que haya celebrado un pacto de actuación conjunta mediante el cual el poder de voto suficiente para incluir en sociedades constituidas en Chile.</li>
                </ul>
              </div>
              <div class="item-modal-pep">
                <h5>Funciones desempeñadas por el PEP</h5>
                <ul>
                  <li>Aquellas que desempeñan o han desempeñado en el último año funciones publicas destacas en Chile o en el extranjero. </li>
                  <li>Al cónyuge PEP. </li>
                  <li>Presidente de la República</li>
                  <li>Senador, Diputado, Alcalde o Concejal</li>
                  <li>Ministro de la Corte Suprema y/o Corte de Apelaciones</li>
                  <li>Ministros de Estado, Subsecretarios, Intendentes, Gobernadores, Secretarios Regionales Ministeriales, Embajadores, Jefes Superiores de Servicio, tanto centralizados como desentralizados y el directivo superior inmediatoque deba subrogar a cada uno de ellos</li>
                  <li>Comandantes en jefe de las Fuerzas Armandas, Director general de Carabineros, Director General de Investigaciones, u oficial superior inmediato que deba subrogar a uno de ellos</li>
                  <li>Fiscal Nacional de Ministerio Público y Fiscales Regionales</li>
                  <li>Contralor General de la Reública Consejeros del Banco Central de Chile</li>
                  <li>Consejeros del Consejo de Defensa del Estado</li>
                  <li>Ministros del Tribunal Constitucional</li>
                  <li>Ministros del Tribunal de la Libre Competencia</li>
                  <li>Integrantes titulares del Tribunal de Contratación Pública</li>
                  <li>Consejeros del Consejo de la Alta Dirección Pública</li>
                  <li>Los directores y ejecutivos principales de empresas públicas</li>
                  <li>Directores de sociedades anónimas nombrado por el Estado o sus organismos</li>
                  <li>Miembros de las directivas de los partidos póliticos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jQuery from 'jquery';
import { mapState, mapActions } from 'vuex';
import rutUtilities from '@consorcio/pcc-commons-vue/src/helpers/rutUtilities';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import {
  formatRut,
  uppercase,
} from '@consorcio/pcc-commons-vue/src/directives';

export default {
  name: 'PepForm',
  components: {
    DatePicker,
  },
  directives: {
    formatRut,
    uppercase,
  },
  data() {
    return {
      post: '',
      picked: 'no',
      isPEP: '',
      // fechaClientePep: `${this.$parent.formatDateIso(new Date())}`,
      fechaClientePep: '',
      rutClientePep: '',
      nombreClientePep: '',
      relacionClientePep: '',
      fPep: '',
      regDate: /^\d{2}([./-])\d{2}\1\d{4}$/,
    };
  },
  computed: {
    ...mapState(['posts']),
    ...mapState(['userInfo']),

    isDisabled() {
      return this.rutClientePep && this.nombreClientePep && this.fechaClientePep;
    },
  },
  watch: {
    isPEP() {
      // this.nombreClientePep = '';
      // this.rutClientePep = '';
      this.$store.commit('updateIsPep', this.isPEP);
      jQuery('.box-pep input:not(:first)').each((index, element) => {
        jQuery(element).parents('.form-group').removeClass('focused');
      });
      jQuery('.box-pep input').each((index, element) => {
        jQuery(element).removeClass('is-valid');
        jQuery(element).removeClass('is-invalid');
        jQuery('.form-error').css('display', 'none');
      });
    },
    fechaClientePep() {
      const valid = this.fechaClientePep !== '' && this.fechaClientePep !== ' ' && this.regDate.test(this.fechaClientePep);
      if (valid) {
        jQuery('.form-group.pep .form-error').css('display', 'none');
        jQuery('#fechaPEP').parents('.form-group').addClass('focused');
        jQuery('#fechaPEP').addClass('filled');
        jQuery('.noFocus').addClass('focused');
        jQuery('#fechaPEP').removeClass('is-invalid');
        jQuery('#fechaPEP').addClass('is-valid');
        this.$store.commit('updateFechaClientePep', this.fechaClientePep);
      } else {
        jQuery('.form-group.pep .form-error').css('display', 'block');
        if (this.fechaClientePep === '') {
          jQuery('.form-group.pep .form-error').text('Fecha no puede estar vacío');
        } else if (!this.regDate.test(this.fechaClientePep)) {
          jQuery('.form-group.pep .form-error').text('El formato es inválido. Formato válido dd/mm/yyy');
        }
        jQuery('#fechaPEP').removeClass('filled');
        jQuery('#fechaPEP').parents('.form-group').removeClass('focused');
        jQuery('.noFocus').addClass('focused');
        jQuery('#fechaPEP').addClass('is-invalid');
        jQuery('#fechaPEP').removeClass('is-valid');
      }
    },
    rutClientePep() {
      this.$store.commit('updateRutClientePep', this.rutClientePep);
    },
    nombreClientePep() {
      this.$store.commit('updateNombreClientePep', this.nombreClientePep);
    },
  },
  created() {
    this.getPosts();
    this.retoma();
  },
  mounted() {
    this.init();
  },
  beforeMount() {
    this.getTest();
  },
  methods: {
    ...mapActions(['getPosts']),
    ...mapActions(['getUserInfo']),

    init() {
      jQuery('#nombreClientePep').on('keyup', function () {
        this.value = this.value.replace(/[^a-zA-ZáéíóúÁÍÉÓÚñÑ '-]/, '');
      });
    },
    getTest() {
      console.log('get test');
      jQuery('#relacionClientePep').addClass('testClass');
    },
    clickRelacion(event) {
      console.log('event click');
      if (event) {
        alert(event.target.tagName);
      }
    },
    retoma() {
      this.getUserInfo(this.qParam('ids')).then(() => {
      }).finally(() => {
        if (this.userInfo.PEP?.esPEP !== 0 && this.userInfo.PEP?.esPEP !== '0') {
          this.isPEP = this.userInfo.PEP?.esPEP;
          this.rutClientePep = this.userInfo.PEP?.rut;
          this.nombreClientePep = this.userInfo.PEP?.nombre;
          if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(this.userInfo.PEP?.fecha)) {
            this.fechaClientePep = this.$parent.formatDateIso(`${this.userInfo.PEP?.fecha}`);
            setTimeout(() => {
              jQuery('#fechaPEP').attr('value', this.fechaClientePep);
            }, 2000);
          } else {
            this.fechaClientePep = this.userInfo.PEP?.fecha;
            const newDate = this.userInfo.PEP?.fecha.split('/');
            setTimeout(() => {
              jQuery('#fechaPEP').attr('value', `${newDate[0]}/${newDate[1]}/${newDate[2]}`);
            }, 2000);
            jQuery('#fechaPEP').attr('value', `${newDate[0]}/${newDate[1]}/${newDate[2]}`);
          }

          this.addValidClass('#fechaPEP');
          this.addValidClass('#nombreClientePep');
          this.addValidClass('#rutClientePep');
        }
      });
    },
    downloadPEPFile() {
      this.getPosts().then(() => {
      }).finally(() => {
        const urlPepFile = this.posts[0].fields.Documento.url;
        window.open(urlPepFile, '_blank');
      });
    },
    validadorRutPep(event) {
      const valid = rutUtilities.validate(event.target.value);
      const vacio = event.target.value !== '' && event.target.value !== ' ';
      if (!vacio) {
        jQuery(event.target).removeClass('is-valid');
        jQuery(event.target).addClass('is-invalid');
        jQuery(event.target).next().text('Rut no puede estar vacio');
        jQuery(event.target).next().css('display', 'block');
      } else if (vacio && !valid) {
        jQuery(event.target).removeClass('is-valid');
        jQuery(event.target).addClass('is-invalid');
        jQuery(event.target).next().text('Rut incorrecto');
        jQuery(event.target).next().css('display', 'block');
      } else {
        jQuery(event.target).addClass('is-valid');
        jQuery(event.target).removeClass('is-invalid');
        jQuery(event.target).next().css('display', 'none');
      }
    },
    formatFechaPEP(event) {
      jQuery('#fechaPEP').parents('.form-group').addClass('focused');
      const fechaArray = event.id.split('-');
      const fecha = `${fechaArray[2]}/${fechaArray[1]}/${fechaArray[0]}`;
      this.fechaClientePep = fecha;
    },
    cleanPEPFields() {
      this.fechaClientePep = '';
      this.nombreClientePep = '';
      this.rutClientePep = '';
      jQuery('.box-pep input').each((index, element) => {
        jQuery(element).parents('.form-group').removeClass('focused');
      });
      jQuery('.box-pep input').each((index, element) => {
        jQuery(element).removeClass('is-valid');
        jQuery(element).removeClass('is-invalid');
        jQuery(element).next().css('display', 'none');
        jQuery(element).prop('disabled', false);
      });
    },
    qParam(keyP) {
      let key = keyP;
      key = key.replace(/[*+?^$.[\]{}()|\\/]/g, '\\$&'); // escape RegEx meta chars
      const match = window.location.search.match(new RegExp(`[?&]${key}=([^&]+)(&|$)`));
      return match && decodeURIComponent(match[1].replace(/\/+/g, ''));
    },
    addValidClassPEP(element) {
      const inputValue = jQuery(element).value;
      if (inputValue !== '') {
        jQuery(element).addClass('is-valid filled');
        jQuery(element).removeClass('is-invalid');
        jQuery('.form-group.pep .form-error').css('display', 'none');
        jQuery(element).parent('.form-group').addClass('focused');
      }
    },
    addValidClass(element) {
      const inputValue = jQuery(element).value;
      if (inputValue !== '') {
        jQuery(element).addClass('is-valid filled');
        jQuery(element).removeClass('is-invalid');
        jQuery(element).next().css('display', 'none');
        jQuery(element).parent('.form-group').addClass('focused');
      }
    },
    /* global marcaje_google_analytics:readonly */
    pushGTM(element, categoria, evento) {
      marcaje_google_analytics(element, categoria, evento);
    },
  },
};
</script>
