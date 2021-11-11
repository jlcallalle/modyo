<template>
  <ValidationObserver
    v-slot="{ invalid }"
    ref="form">
    <form @submit.prevent="onSubmit">
      <c-loader-car-modal v-if="loading" />
      <p class="c-primary-b font-main-bold text-center text-md-left mb-6">
        Complete los datos requeridos
      </p>

      <div class="row mb-4">
        <div class="col-md-4 col-lg-5 col-xl-3">
          <input
            id="sim"
            v-model="simpro"
            value="0"
            type="radio"
            class="radio-block-input"
            name="pv1"
            @change="limpiarTodo">
          <label
            for="sim"
            class="radio-block-productos">
            <span class="radio-block-text">SIMULACIÓN</span>
          </label>
        </div>
        <div class="col-md-4 col-lg-5 col-xl-3">
          <input
            id="prop"
            v-model="simpro"
            value="1"
            type="radio"
            class="radio-block-input"
            name="pv1"
            @change="limpiarTodo">
          <label
            for="prop"
            class="radio-block-productos">
            <span class="radio-block-text">PROP - PÓLIZA</span>
          </label>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div
            v-if="busquedaCNS"
            class="row">
            <div class="col-lg-6">
              <ValidationProvider
                v-slot="{ classes, errors }"
                :bails="false"
                name="Agencia"
                rules="required">
                <div class="form-group form-cns focused">
                  <multiselect
                    id="agencia"
                    v-model="agencia"
                    :options="agenciasSelect"
                    :custom-label="nameWithLang"
                    placeholder="Seleccionar"
                    :class="classes"
                    label="nombreAgencia"
                    track-by="nombreAgencia"
                    @input="buscarCorredores" />

                  <label class="form-error">{{ errors[0] }}</label>
                </div>
              </ValidationProvider>
            </div>
            <div class="col-lg-6">
              <ValidationProvider
                v-slot="{ classes, errors }"
                :bails="false"
                name="Corredor"
                rules="required">
                <div class="form-group form-cns focused">
                  <multiselect
                    id="corredor"
                    v-model="corredor"
                    :disabled="corredoresSelect.length === 0"
                    :options="corredoresSelect"
                    :custom-label="nameWithLangCorredor"
                    :class="classes"
                    placeholder="Seleccionar"
                    label="nombre"
                    track-by="nombre" />

                  <label class="form-error">{{ errors[0] }}</label>
                </div>
              </ValidationProvider>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6">
              <ValidationProvider
                v-slot="{ classes, errors }"
                :bails="false"
                :rules="estado !== 1 ? 'required|rut' : 'rut|vacio'">
                <div class="form-group">
                  <label
                    class="form-label"
                    for="rut">Rut</label>
                  <input
                    id="rut"
                    ref="rut"
                    v-model="rut"
                    v-format-rut
                    class="form-field"
                    :class="classes"
                    type="text"
                    @input="eliminaClaseValidaRut($event)"
                    @keyup="eliminaClaseValidaRut($event) "
                    @click="eliminaClaseValidaRut($event)">
                  <label
                    class="form-error">{{ errors[0] }}</label>
                </div>
              </ValidationProvider>
            </div>
            <div
              v-if="simpro === '0'"
              class="col-lg-6">
              <ValidationProvider
                v-slot="{ classes, errors }"
                :bails="false"
                rules="numeric">
                <div class="form-group">
                  <label
                    class="form-label"
                    for="simulacion">Número de simulación</label>
                  <input
                    id="simulacion"
                    ref="simulacion"
                    v-model="simulacion"
                    :class="classes"
                    class="form-field"
                    type="number"
                    @input="eliminaClaseValidaSimulacion($event)"
                    @keyup="eliminaClaseValidaSimulacion($event) "
                    @click="eliminaClaseValidaSimulacion($event)">
                  <label class="form-error">{{ errors[0] }}</label>
                </div>
              </ValidationProvider>
            </div>
            <div
              v-if="simpro === '1'"
              class="col-lg-6">
              <ValidationProvider
                v-slot="{ classes, errors }"
                :bails="false"
                rules="numeric">
                <div class="form-group">
                  <label
                    class="form-label"
                    for="propuesta">Número de propuesta</label>
                  <input
                    id="propuesta"
                    v-model="propuesta"
                    :class="classes"
                    class="form-field"
                    type="number"
                    @input="eliminaClaseValidaPropuesta($event)"
                    @keyup="eliminaClaseValidaPropuesta($event)"
                    @click="eliminaClaseValidaPropuesta($event)">
                  <label class="form-error">{{ errors[0] }}</label>
                </div>
              </ValidationProvider>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6">
              <ValidationProvider
                v-slot="{ classes, errors }"
                ref="dateIn"
                :rules="estado !== 1 ? (`fechaInicio:${inicio <= final}|required`) : `fechaInicio:${inicio <= final}`"
                :bails="false">
                <div class="form-group">
                  <label
                    class="form-label"
                    for="inicio">Fecha de inicio</label>
                  <date-picker
                    v-model="inicio"
                    :update-on-input="true"
                    :min-date="new Date(new Date().setMonth(new Date().getMonth() - 3))"
                    :max-date="new Date()"
                    :popover="{ visibility: 'click' }">
                    <input
                      id="inicio"
                      ref="inicio"
                      slot-scope="{ inputProps, inputEvents, inputValue }"
                      class="form-field"
                      :class="classes"
                      v-bind="inputProps"
                      :value="inputValue"
                      v-on="inputEvents">
                  </date-picker>
                  <label
                    class="form-error">{{ errors[0] }}</label>
                </div>
              </ValidationProvider>
            </div>
            <div class="col-lg-6">
              <ValidationProvider
                v-slot="{ classes, errors }"
                ref="dateF"
                :rules="estado !== 1 ? (`fechaFinal:${final >= inicio}|required`) : `fechaFinal:${final >= inicio}`"
                :bails="false">
                <div class="form-group">
                  <label
                    class="form-label"
                    for="final">Fecha de final</label>
                  <date-picker
                    ref="final"
                    v-model="final"
                    :update-on-input="true"
                    :min-date="new Date(new Date().setMonth(new Date().getMonth() - 3))"
                    :max-date="new Date()"
                    :popover="{ visibility: 'click' }">
                    <input
                      id="final"
                      slot-scope="{ inputProps, inputEvents, inputValue }"
                      class="form-field"
                      :class="classes"
                      v-bind="inputProps"
                      :value="inputValue"
                      v-on="inputEvents">
                  </date-picker>
                  <label
                    class="form-error">{{ errors[0] }}</label>
                </div>
              </ValidationProvider>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div class="form-group">
                <label
                  class="form-label"
                  for="estado">Estado</label>
                <select
                  id="estado"
                  v-model="estado"
                  class="form-select small-text">
                  <!-- <option
                    value=""
                    selected>
                    Seleccionar
                  </option> -->
                  <template v-if="simpro === '0'">
                    <option
                      v-for="(status, index) in estadosS"
                      :key="index"
                      :value="status.value">
                      {{ status.name }}
                    </option>
                  </template>
                  <template v-if="simpro === '1'">
                    <option
                      v-for="(status, index) in estadosP"
                      :key="index"
                      :value="status.value">
                      {{ status.name }}
                    </option>
                  </template>
                </select>
                <label
                  style="display: none;"
                  class="form-error">Seleccionar Año</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <button
            type="submit"
            :disabled="invalid"
            class="btn btn-primary-corp w-100 mb-6">
            Buscar
          </button>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>

import Multiselect from 'vue-multiselect';
import jQuery from 'jquery';
import { formatRut } from '@consorcio/pcc-commons-vue/src/directives';
import { CLoaderCarModal } from '@consorcio/pcc-commons-vue/src/components';
// import rutUtilities from '@consorcio/pcc-commons-vue/src/helpers/rutUtilities';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'BuscadorSimulacionPoliza',
  directives: {
    formatRut,
  },
  components: {
    Multiselect,
    DatePicker,
    CLoaderCarModal,
  },
  data() {
    return {
      rut: '',
      propuesta: null,
      simulacion: null,
      agencia: null,
      corredor: null,
      inicio: null,
      final: null,
      simpro: '0',
      estado: 1,
      estadosS: [
        { name: 'Pendiente', value: 1 },
        { name: 'Caducado', value: 2 },
        { name: 'Rechazada', value: 3 },
        { name: 'Anulada', value: 0 },
      ],
      estadosP: [
        { name: 'Pendiente', value: 1 },
        { name: 'Rechazada', value: 2 },
        { name: 'Emitida', value: 3 },
        { name: 'Emitida con incidencia', value: 4 },
        { name: 'Terminada', value: 5 },
        { name: 'Propuesta Anulada', value: 6 },
        { name: 'Propuesta Rechazada', value: 7 },
        { name: 'Transmisión Fallida', value: 8 },
        { name: 'Vacia', value: 0 },
      ],
      agenciasSelect: [],
      corredoresSelect: [],
      busquedaCNS: false,
      test: '',

    };
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapState(['loading']),
    ...mapState(['rolUsuario']),
    ...mapState(['agencias']),
    ...mapState(['ejecutivos']),
  },
  watch: {
    inicio() {
      const self = this;
      if (this.inicio === null) {
        jQuery('#inicio').blur(() => {
          self.$refs.dateIn.reset();
        });
        jQuery('#inicio').parents('.form-group').removeClass('focused');
        self.$refs.dateIn.reset();
      } else {
        jQuery('#inicio').blur(() => {
          self.$refs.dateIn.validate();
        });
        self.$refs.dateIn.validate();
        jQuery('#inicio').parents('.form-group').addClass('focused');
      }
    },
    final() {
      const self = this;
      if (this.final === null) {
        jQuery('#final').blur(() => {
          self.$refs.dateF.reset();
        });
        jQuery('#final').parents('.form-group').removeClass('focused');
        self.$refs.dateF.reset();
      } else {
        jQuery('#final').blur(() => {
          self.$refs.dateF.validate();
        });
        self.$refs.dateF.validate();
        jQuery('#final').parents('.form-group').addClass('focused');
      }
    },
  },
  mounted() {
    this.isBusquedaCNS();
    this.init();
  },
  methods: {
    ...mapActions(['getUserInfo']),
    ...mapActions(['getRol']),
    ...mapActions(['getAgencias']),
    ...mapActions(['getEjecutivos']),

    eliminaClaseValidaRut(event) {
      if (event.target.value === '') {
        jQuery('#rut').blur(function () {
          jQuery(this).addClass('not-required');
        });
        jQuery('#rut').parents('.form-group').removeClass('focused');
        jQuery('#rut').value = '';
        jQuery('#rut').addClass('not-required');
      } else {
        jQuery('#rut').blur(function () {
          jQuery(this).removeClass('not-required');
          jQuery('#rut').parents('.form-group').addClass('focused');
        });
      }
    },
    eliminaClaseValidaSimulacion(event) {
      if (event.target.value === '') {
        jQuery('#simulacion').blur(function () {
          jQuery(this).addClass('not-required');
        });
        jQuery('#simulacion').parents('.form-group').removeClass('focused');
        jQuery('#simulacion').value = '';
        jQuery('#simulacion').addClass('not-required');
      } else {
        jQuery('#simulacion').blur(function () {
          jQuery(this).removeClass('not-required');
          jQuery('#simulacion').parents('.form-group').addClass('focused');
        });
      }
    },
    eliminaClaseValidaPropuesta(event) {
      if (event.target.value === '') {
        jQuery('#propuesta').blur(function () {
          jQuery(this).addClass('not-required');
        });
        jQuery('#propuesta').parents('.form-group').removeClass('focused');
        jQuery('#propuesta').value = '';
        jQuery('#propuesta').addClass('not-required');
      } else {
        jQuery('#propuesta').blur(function () {
          jQuery(this).removeClass('not-required');
          jQuery('#propuesta').parents('.form-group').addClass('focused');
        });
      }
    },

    async buscarCorredores() {
      if (this.agencia !== null && this.agencia !== undefined) {
        const agenciaResponse = await this.getEjecutivos(this.agencia.codigoAgencia);
        if (agenciaResponse.status === 200) {
          this.corredoresSelect = this.ejecutivos.map((ejecutivo) => ({
            rut: ejecutivo.rutEjecutivo,
            nombre: ejecutivo.nombreEjecutivo,
          }));
        }
      } else {
        this.corredoresSelect = [];
        this.corredor = null;
      }
      this.test = this.agencia;
    },
    nameWithLang({ nombreAgencia }) {
      return `${nombreAgencia}`;
    },
    nameWithLangCorredor({ nombre }) {
      return `${nombre}`;
    },
    async isBusquedaCNS() {
      await this.getUserInfo();
      if (this.userInfo !== null) {
        const customfield = this.userInfo.custom_fields.find((cf) => cf.name === 'perfilUsuario');
        if (customfield !== undefined) {
          this.test = customfield.value;
          const perfil = customfield.value.replace(/["\][\\]/g, '');
          this.test = perfil;
          const responseRol = await this.getRol(perfil);
          if (responseRol.status === 200) {
            const permiso = this.rolUsuario.permisos
              .find((per) => per.nombrePermiso === process.env.VUE_APP_PERMISO_BUSQUEDA);
            if (permiso !== undefined) {
              this.busquedaCNS = true;
              setTimeout(() => {
                jQuery('#agencia').parent().append('<label for="agencia" class="form-label">Agencia</label>');
                jQuery('#corredor').parent().append('<label for="corredor" class="form-label">Corredor</label>');
              }, 100);
              const agenciaResponse = await this.getAgencias();
              if (agenciaResponse.status === 200) {
                this.agenciasSelect = this.agencias.map((agencia) => ({
                  nombreAgencia: agencia.agencia,
                  codigoAgencia: agencia.codigoAgencia,
                }));
              }
            } else {
              this.busquedaCNS = false;
            }
          } else {
            this.busquedaCNS = false;
          }
        } else {
          this.busquedaCNS = false;
        }
      } else {
        this.busquedaCNS = false;
      }
    },
    limpiarTodo() {
      this.rut = '';
      this.propuesta = null;
      this.simulacion = null;
      this.agencia = null;
      this.corredor = null;
      this.inicio = null;
      this.final = null;
      this.estado = 1;
      this.init();

      this.$refs.form.reset();

      jQuery('form input').each((index, element) => {
        jQuery(element).parents('.form-group').removeClass('focused');
      });
    },
    onSubmit() {
      let inicio = '';
      let final = '';
      if (this.inicio !== null) {
        inicio = `&fi=${this.formatDate(this.inicio)}`;
      }
      if (this.final !== null) {
        final = `&ff=${this.formatDate(this.final)}`;
      }
       dev: https://consorcio-corredores-dev.modyo.be/web-corredores/seguros-generales/venta/resultado-buscador-simulacion-poliza-vehiculo?sp=1&r=none&np=none&st=1
       qa:  https://consorcio-corredores-qa.modyo.be/web-corredores/seguros-generales/venta/resultado-buscador-simulacion-poliza-vehiculo?sp=0&r=none&ns=none&st=1
       qa :  https://consorcio-corredores-qa.modyo.be/web-corredores/seguros-generales/venta/resultado-buscador-simulacion-poliza-vehiculo?sp=0&r=none&ns=none&st=1 
                                                                                                                                  // ?sp=${this.simpro}
                                                                                                                                  // &r=${this.rut !== '' ? this.limpiarRut(this.rut) : 'none'}
                                                                                                                                  // &ns=${this.simulacion !== null ? this.simulacion : 'none'}${inicio}${final}
                                                                                                                                  // &st=${this.estado !== '' ? this.estado : 'none'}`;
      if (this.simpro === '0' && !this.busquedaCNS) {
        window.location.href = `/web-corredores/seguros-generales/venta/resultado-buscador-simulacion-poliza-vehiculo?sp=${this.simpro}&r=${this.rut !== '' ? this.limpiarRut(this.rut) : 'none'}&ns=${this.simulacion !== null ? this.simulacion : 'none'}${inicio}${final}&st=${this.estado !== '' ? this.estado : 'none'}`;
      } else if (this.simpro === '1' && !this.busquedaCNS) {
        window.location.href = `/web-corredores/seguros-generales/venta/resultado-buscador-simulacion-poliza-vehiculo?sp=${this.simpro}&r=${this.rut !== '' ? this.limpiarRut(this.rut) : 'none'}&np=${this.propuesta !== null ? this.propuesta : 'none'}${inicio}${final}&st=${this.estado !== '' ? this.estado : 'none'}`;
      } else if (this.simpro === '0' && this.busquedaCNS) {
        window.location.href = `/web-corredores/seguros-generales/venta/resultado-buscador-simulacion-poliza-vehiculo?sp=${this.simpro}&r=${this.rut !== '' ? this.limpiarRut(this.rut) : 'none'}&ns=${this.simulacion !== null ? this.simulacion : 'none'}${inicio}${final}&st=${this.estado !== '' ? this.estado : 'none'}&agen=${this.agencia.codigoAgencia !== null ? this.agencia.codigoAgencia : 'none'}&rc=${this.corredor.rut !== null ? this.corredor.rut : 'none'}`;
      } else if (this.simpro === '1' && this.busquedaCNS) {
        window.location.href = `/web-corredores/seguros-generales/venta/resultado-buscador-simulacion-poliza-vehiculo?sp=${this.simpro}&r=${this.rut !== '' ? this.limpiarRut(this.rut) : 'none'}&np=${this.propuesta !== null ? this.propuesta : 'none'}${inicio}${final}&st=${this.estado !== '' ? this.estado : 'none'}&agen=${this.agencia.codigoAgencia !== null ? this.agencia.codigoAgencia : 'none'}&rc=${this.corredor.rut !== null ? this.corredor.rut : 'none'}`;
      }
    },
    init() {
      jQuery(() => {
        // Forms
        jQuery('.form-group input, .form-group select').each((index, element) => {
          const inputValue = jQuery(element).val();
          if (inputValue !== '') {
            jQuery(element).parents('.form-group').addClass('focused');
          }
        });
        jQuery('.form-group select').each((index, element) => {
          jQuery(element).parents('.form-group').addClass('focused');
        });
        jQuery('#agencia').parent().append('<label for="agencia" class="form-label">Agencia</label>');
        jQuery('#corredor').parent().append('<label for="corredor" class="form-label">Corredor</label>');

        jQuery('.form-group input').focus(function () {
          jQuery(this).parents('.form-group').addClass('focused');

          if (jQuery(this).parents('.telephone').hasClass('focused')) {
            jQuery('.form-group-plusPlaceholder').show();
          } else if (jQuery(this).hasClass('filled')) {
            jQuery('.form-group-plusPlaceholder').show();
          } else {
            jQuery('.form-group-plusPlaceholder').hide();
          }
        });

        jQuery('.form-group input').blur(function () {
          const inputValue = jQuery(this).val();
          if (inputValue === '') {
            jQuery(this).removeClass('filled');
            jQuery(this).parents('.form-group').removeClass('focused');
            jQuery('.noFocus').addClass('focused');
          } else {
            jQuery(this).addClass('filled');
            jQuery(this).attr('value', jQuery(this).val());
            jQuery('.noFocus').addClass('focused');
          }
          jQuery('.multiselect').parents().addClass('focused');
        });
        jQuery('.form-group .form-label').click(function () {
          jQuery(this).parent('.form-group').addClass('focused');
        });

        if (navigator.userAgent.toLowerCase().indexOf('chrome') >= 0) {
          jQuery('input:-webkit-autofill').each(function () {
            jQuery(this).parent('.form-group').addClass('focused');
            jQuery(this).addClass('filled');
          });
        }
      });
    },
    formatDate(fecha) {
      let month = `${fecha.getMonth() + 1}`;
      let day = `${fecha.getDate()}`;
      const year = fecha.getFullYear();
      if (month.length < 2) { month = `0${month}`; }
      if (day.length < 2) { day = `0${day}`; }

      const fecha2 = [
        day,
        month,
        year,
      ].join('-');

      const validDate = month > 0 && month < 13 && year > 0 && year < 32768 && day > 0
      && day <= (new Date(year, month, 0)).getDate();

      if (validDate) {
        return fecha2;
      }
      return '';
    },
    limpiarRut(rut) {
      return rut.replace(/\./g, '').replace(/ /g, '').replace(/-/g, '');
    },
  },
};
</script>
