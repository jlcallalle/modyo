<template>
  <div class="container-corp mx-auto">
    <c-loader-car-modal
      v-if="loading || regiones === null || userInfo === null || bancos === null" />
    <div
      v-if="errorMessage !== '' && !loading"
      class="alert alert-danger alert-dismissible fade show"
      role="alert">
      {{ errorMessage }}
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="row d-flex">
      <div class="col-lg-3">
        <button
          data-toggle="modal"
          data-target="#modalResumen"
          class="d-block d-md-none btn bg-primary-b text-white w-100 mb-3 rounded-s">
          Resumen
        </button>
        <resumen class="d-none d-md-block" />
      </div>
      <div class="col-lg-9">
        <div>
          <div class="wizard mb-8 d-none d-md-table">
            <div class="wizard-graph-row">
              <div class="wizard-block wizard-block-advanced">
                <span class="circle-number" />
              </div>
              <div class="wizard-block wizard-block-advanced">
                <span class="circle-number" />
              </div>
              <div class="wizard-block wizard-block-advanced">
                <span class="circle-number" />
              </div>
              <div class="wizard-block">
                <span class="circle-number" />
              </div>
            </div>
            <div class="wizard-text-row">
              <div class="wizard-block">
                Datos vehículo
              </div>
              <div class="wizard-block">
                Planes
              </div>
              <div class="wizard-block">
                Datos personales
              </div>
              <div class="wizard-block">
                Confirmación
              </div>
            </div>
          </div>
          <form
            @change="checkform"
            @submit.prevent="onSubmit"
            @input="checkform">
            <!-- Mandato -->
            <div class="box-pagador rounded-l mb-8">
              <div class="row">
                <div class="col-lg-3">
                  <div class="box-checkmandato">
                    <input
                      id="sameAsOwner"
                      v-model="sameAsOwner"
                      type="checkbox"
                      class="radio-circle-input"
                      name="circle"
                      @click="cleanMandatoFields(); pushGTM('DP - check dueno vehiculo', 'DP - check dueno vehiculo', 'clic');">
                    <label
                      for="sameAsOwner"
                      class="radio-circle">
                      <span />
                    </label>
                    <p class="fs-2 planblock-c-b text-center">
                      El pagador es el dueño del vehículo
                    </p>
                  </div>
                </div>
                <div
                  class="col-lg-9">
                  <div
                    v-if="!sameAsOwner"
                    class="font-main d-flex align-items-center mb-4">
                    Pagador es persona jurídica
                    <label
                      for="circle2"
                      class="mr-2 ml-2 mb-0 c-primary-b">Si</label>
                    <span>
                      <input
                        id="circle4"
                        v-model="isPersonaJuridica"
                        type="checkbox"
                        class="radio-circle-input"
                        name="circle2"
                        @click="cleanMandatoFields">
                      <label
                        for="circle4"
                        class="radio-circle mb-0" />
                    </span>
                  </div>
                  <div
                    v-if="!sameAsOwner"
                    class="row datos-pagador">
                    <div class="col-lg-4">
                      <div class="form-group">
                        <label
                          class="form-label"
                          for="rutPagador">Rut</label>
                        <input
                          id="rutPagador"
                          v-model="rutPagador"
                          v-format-rut
                          class="form-field"
                          type="text"
                          @keyup="validadorRut($event);"
                          @input="validadorRut($event);"
                          @click="validadorRut($event);">
                        <label
                          style="display: none;"
                          class="form-error">El rut es incorrecto</label>
                      </div>
                    </div>
                    <div
                      :class="isPersonaJuridica ? 'd-none': ''"
                      class="col-lg-4">
                      <div class="form-group">
                        <label
                          class="form-label"
                          for="nombrePagador">Nombres</label>
                        <input
                          id="nombrePagador"
                          v-model="nombrePagador"
                          v-uppercase
                          class="form-field"
                          type="text"
                          @input="clearInputAplha($event); validadorVacio($event)"
                          @keyup="clearInputAplha($event); validadorVacio($event) "
                          @click="clearInputAplha($event); validadorVacio($event)">
                        <label
                          style="display: none;"
                          class="form-error">Nombres no puede estar vacio</label>
                      </div>
                    </div>
                    <div
                      :class="isPersonaJuridica ? 'd-none': ''"
                      class="col-lg-4">
                      <div class="form-group">
                        <label
                          class="form-label"
                          for="apellidoPagador">Apellidos</label>
                        <input
                          id="apellidoPagador"
                          v-model="apellidosPagador"
                          v-uppercase
                          class="form-field"
                          type="text"
                          @input="clearInputAplha($event); validadorVacio($event)"
                          @keyup="clearInputAplha($event); validadorVacio($event) "
                          @click="clearInputAplha($event); validadorVacio($event)">
                        <label
                          style="display: none;"
                          class="form-error">Apellidos no puede estar vacio</label>
                      </div>
                    </div>
                    <div
                      :class="isPersonaJuridica ? '': 'd-none'"
                      class="col-lg-4">
                      <div class="form-group">
                        <label
                          class="form-label"
                          for="razonSocialPagador">Razón Social</label>
                        <input
                          id="razonSocialPagador"
                          v-model="razonSocialPagador"
                          v-uppercase
                          class="form-field"
                          type="text"
                          @input="clearRZInput($event); validadorVacio($event)"
                          @keyup="clearRZInput($event); validadorVacio($event)"
                          @click="clearRZInput($event); validadorVacio($event)">
                        <label
                          style="display: none;"
                          class="form-error">Razón social no puede estar vacío</label>
                      </div>
                    </div>
                    <div
                      :class="isPersonaJuridica ? '': 'd-none'"
                      class="col-lg-4">
                      <div class="form-group focused">
                        <label
                          class="form-label"
                          for="giroPagador">Giro</label>
                        <select
                          id="giroPagador"
                          v-model="giroPagador"
                          class="form-select small-text"
                          @input="validadorSelect($event);"
                          @click="validadorSelect($event);">
                          <option
                            selected>
                            Seleccionar
                          </option>
                          <option
                            v-for="(giro, index) in giro"
                            :key="index"
                            :value="giro.codigo">
                            {{ giro.nombre }}
                          </option>
                        </select>
                        <label
                          style="display: none;"
                          class="form-error">Debe seleccionar un giro</label>
                      </div>
                    </div>
                  </div>
                  <p
                    v-if="medioPagoGlosa !== 'Contado'"
                    class="text-center text-md-left fs-2 c-primary-b text-underline cursor-pointer"
                    @click="isHidden = !isHidden; pushGTM(`DP - Nuevo mandato  ${ medioPagoGlosa }`, `DP - Nuevo mandato ${ medioPagoGlosa }`, 'clic');">
                    Nuevo mandato {{ medioPagoGlosa }}
                  </p>
                  <!--form de mandato -->
                  <div
                    v-if="!isHidden"
                    class="row">
                    <div class="col-lg-12">
                      <div class="row">
                        <div
                          :class="medioPagoGlosa === 'PAT'?' col-lg-5':'col-lg-7'">
                          <div
                            class="form-group focused">
                            <label
                              class="form-label"
                              for="banco">Banco</label>
                            <select
                              id="banco"
                              v-model="codigoBanco"
                              class="form-select small-text"
                              @input="validadorSelect($event);"
                              @click="validadorSelect($event);">
                              <option
                                selected>
                                Seleccionar
                              </option>
                              <option
                                v-for="(banco, index) in bancos"
                                :key="index"
                                :value="banco.codigo">
                                {{ banco.nombre }}
                              </option>
                            </select>
                            <label
                              style="display: none;"
                              class="form-error">Debe seleccionar un banco</label>
                          </div>
                        </div>
                        <div
                          v-if="medioPagoGlosa === 'PAC'"
                          class="col-lg-5">
                          <div
                            class="form-group focused">
                            <label
                              class="form-label"
                              for="tipoCuenta">Tipo de cuenta</label>
                            <select
                              id="tipoCuenta"
                              v-model="tipoCuenta"
                              class="form-select small-text"
                              @input="validadorSelect($event);"
                              @click="validadorSelect($event);">
                              <option
                                selected>
                                Seleccionar
                              </option>
                              <option
                                v-for="(cuenta, index) in cuentas"
                                :key="index"
                                :value="cuenta.id">
                                {{ cuenta.nombre }}
                              </option>
                            </select>
                            <label
                              style="display: none;"
                              class="form-error">Tipo de cuenta no puede estar vacío</label>
                          </div>
                        </div>
                        <div
                          v-if="medioPagoGlosa === 'PAT'"
                          class="col-lg-7">
                          <div
                            class="form-group">
                            <label
                              class="form-label"
                              for="numTarjetaCredito">Nº de tarjeta de crédito</label>
                            <input
                              id="numTarjetaCredito"
                              v-model="numeroTarjeta"
                              class="form-field"
                              type="text"
                              maxlength="20"
                              @change="clearNumeric($event); validadorVacio($event)"
                              @input="getCreditCardType(numeroTarjeta); validadorVacio($event)"
                              @click="clearNumeric($event); validadorVacio($event)"
                              @keyup="clearNumeric($event); init()">
                            <label
                              style="display: none;"
                              class="form-error">Número de tarjeta no puede estar vacío</label>
                          </div>
                        </div>
                        <div
                          v-if="medioPagoGlosa === 'PAC'"
                          class="col-lg-7">
                          <div class="form-group">
                            <label
                              for="numeroCuenta"
                              class="form-label">
                              N° de cuenta
                            </label>
                            <input
                              id="numeroCuenta"
                              v-model="numeroCuenta"
                              type="text"
                              class="form-field"
                              @input="clearNumeric($event); validadorVacio($event)"
                              @keyup="clearNumeric($event); validadorVacio($event); init()"
                              @click="clearNumeric($event); validadorVacio($event)">
                            <label
                              style="display: none;"
                              class="form-error">El número de cuenta no puede estar vacío</label>
                          </div>
                        </div>
                        <div
                          v-if="medioPagoGlosa === 'PAT'"
                          class="col-lg-5">
                          <div
                            v-if="medioPagoGlosa === 'PAT'"
                            class="form-group">
                            <label
                              class="form-label"
                              for="fechaExpiracion">MM / YYYY</label>
                            <input
                              id="fechaExpiracion"
                              v-model="fechaExpiracion"
                              autocomplete="off"
                              class="form-field"
                              maxlength="7"
                              type="text"
                              @click="validadorFechaExpiracion($event); formatFechaExpiracion($event); init();"
                              @change="validadorFechaExpiracion($event); formatFechaExpiracion($event);"
                              @keyup="validadorFechaExpiracion($event); formatFechaExpiracion($event); init();"
                              @input="validadorFechaExpiracion($event); formatFechaExpiracion($event);"
                              @blur="validadorFechaExpiracion($event); formatFechaExpiracion($event);">
                            <label
                              style="display: none;"
                              class="form-error">Debe ingresar el mes y año</label>
                          </div>
                        </div>
                        <div
                          :class="medioPagoGlosa === 'PAT'?' col-lg-7':'col-lg-5'">
                          <div
                            class="form-group focused">
                            <label
                              class="form-label"
                              for="diaPago">Seleccione día de pago</label>
                            <select
                              id="diaPago"
                              v-model="diaPago"
                              class="form-select small-text"
                              @input="validadorSelect($event);"
                              @click="validadorSelect($event);">
                              <option
                                selected>
                                Seleccionar
                              </option>
                              <option value="5">
                                5
                              </option>
                              <option value="20">
                                20
                              </option>
                            </select>
                            <label
                              style="display: none;"
                              class="form-error">Debe seleccionar un día de pago</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--end form de mandato -->
                </div>
              </div>
            </div>
            <!-- Mandato -->
            <!-- Cobertura -->
            <section v-if="tipoAntiguedad === 2 && userInfo.plan.codigoPlan !== '3'">
              <p class="c-primary-b">
                Continuidad de cobertura
              </p>
              <div class="d-flex align-items-center mb-6">
                <div>
                  <p class="mb-0 mr-5 c-primary-b">
                    ¿Tienes pólizas vigentes?
                  </p>
                </div>
                <div class="d-flex align-items-center">
                  <div class="d-flex align-items-center mr-3">
                    <label
                      for="circle2"
                      class="mr-2 mb-0 c-primary-b">No</label>
                    <span>
                      <input
                        id="circle2"
                        v-model="hasPolizas"
                        type="radio"
                        class="radio-circle-input"
                        value="0"
                        name="circle2"
                        @click="cleanPolizaFields();pushGTM('DP - No Polizas vigentes ', 'DP - No Polizas vigentes', 'clic');">
                      <label
                        for="circle2"
                        class="radio-circle mb-0" />
                    </span>
                  </div>
                  <div class="d-flex align-items-center">
                    <label
                      for="circle2"
                      class="mr-2 mb-0 c-primary-b">Si</label>
                    <span>
                      <input
                        id="circle3"
                        v-model="hasPolizas"
                        type="radio"
                        value="1"
                        class="radio-circle-input"
                        name="circle2"
                        checked="checked"
                        @click="pushGTM('DP - Si Polizas vigentes ', 'DP - Si Polizas vigentes', 'clic');">
                      <label
                        for="circle3"
                        class="radio-circle mb-0" />
                    </span>
                  </div>
                </div>
              </div>
              <div
                :class="hasPolizas === '1' ? ' ' : 'd-none'"
                class="row poliza-box">
                <div class="col-lg-10">
                  <div class="row mb-4">
                    <div class="col-lg-6">
                      <div class="form-group fechaFinVigencia">
                        <label
                          class="form-label"
                          for="fechaFinVigencia">Fecha de fin de vigencia</label>
                        <date-picker
                          v-model="fvigencia"
                          :min-date="new Date()"
                          :update-on-input="true"
                          :popover="{ visibility: 'click' }"
                          @dayclick="formatFechaConCob($event); validadorVacioDateVigencia($event)">
                          <template #default="{ inputValue, inputEvents }">
                            <input
                              id="fechaFinVigencia"
                              v-model="fechaFinVigencia"
                              class="form-field"
                              :value="inputValue"
                              autocomplete="off"
                              v-on="inputEvents"
                              @keyup="clearInputDate($event)">
                            <label
                              style="display: none;"
                              class="form-error">Fecha de fin de vigencia no puede estar vacío</label>
                          </template>
                        </date-picker>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group focused">
                        <label
                          class="form-label"
                          for="siniestro">Siniestro en los últimos 20 días</label>
                        <select
                          id="siniestro"
                          v-model="tieneSiniestrosPeriodo"
                          class="form-select small-text"
                          @input="validadorSelect($event);"
                          @click="validadorSelect($event);">
                          <option
                            selected>
                            Seleccionar
                          </option>
                          <option value="0">
                            No
                          </option>
                          <option value="1">
                            Si
                          </option>
                        </select>
                        <label
                          style="display: none;"
                          class="form-error">Siniestro no puede estar vacío</label>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex align-items-center mb-6">
                    <div>
                      <p class="mb-0 mr-5 c-primary-b">
                        Actualmente cuenta con la cobertura de daños parciales
                      </p>
                    </div>
                    <div class="d-flex align-items-center">
                      <div class="d-flex align-items-center mr-3">
                        <label
                          for="circle2"
                          class="mr-2 mb-0 c-primary-b">No</label>
                        <span>
                          <input
                            id="dano"
                            v-model="coberturaDaniosParciales"
                            type="radio"
                            value="0"
                            class="radio-circle-input"
                            name="dano">
                          <label
                            for="dano"
                            class="radio-circle mb-0" />
                        </span>
                      </div>
                      <div class="d-flex align-items-center">
                        <label
                          for="circle2"
                          class="mr-2 mb-0 c-primary-b">Si</label>
                        <span>
                          <input
                            id="dano2"
                            v-model="coberturaDaniosParciales"
                            value="1"
                            type="radio"
                            class="radio-circle-input"
                            name="dano"
                            checked="checked">
                          <label
                            for="dano2"
                            class="radio-circle mb-0" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="row mb-4">
                        <div class="col-lg-6">
                          <div class="form-group">
                            <label
                              class="form-label"
                              for="deducible">Deducible actual UF</label>
                            <input
                              id="deducible"
                              v-model="deducibleActual"
                              v-uppercase
                              class="form-field"
                              type="text"
                              @input="clearAlphaNumeric($event); validadorVacio($event)"
                              @keyup="clearAlphaNumeric($event); validadorVacio($event)"
                              @click="clearAlphaNumeric($event); validadorVacio($event); init()">
                            <label
                              style="display: none;"
                              class="form-error">Deducible actual no puede estar vacío</label>
                          </div>
                        </div>
                        <div class="col-10 col-lg-5">
                          <button
                            id="polizaFile"
                            type="button"
                            class="btn-upload btn-upload-blue w-100"
                            @click="uploadPoliza">
                            Adjuntar Poliza<svg
                              class="ml-3"
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M24.8026 2.5H5.61467C4.81638 2.5 4.16699 3.14795 4.16699 3.94447V26.2305C4.16699 27.0271 4.81638 27.675 5.61467 27.675H24.8026C25.6009 27.675 26.2503 27.0271 26.2503 26.2305V3.94447C26.2503 3.14795 25.6009 2.5 24.8026 2.5ZM25.1253 3.9651V26.2512C25.1253 26.4286 24.9805 26.5731 24.8026 26.5731H5.61467C5.43681 26.5731 5.29205 26.4286 5.29205 26.2512V3.9651C5.29205 3.78764 5.43681 3.64319 5.61467 3.64319H24.8026C24.9805 3.64319 25.1253 3.78764 25.1253 3.9651ZM21.7168 7.54327H8.12929V8.64932H21.7168V7.54327ZM8.12929 11.662H21.7168V12.7681H8.12929V11.662ZM21.7168 15.7808H8.12929V16.8869H21.7168V15.7808ZM8.12929 19.9037H15.7896V21.0098H8.12929V19.9037Z"
                                fill="white" />
                            </svg>
                          </button>
                          <label
                            id="fileErrorMsg"
                            class="form-error" />
                          <span
                            id="fName"
                            class="mb-0 fs-1 c-primary-b" />
                          <div class="d-none">
                            <input
                              id="uploadFile"
                              type="file">
                          </div>
                        </div>
                        <div class="col-2 col-lg-1">
                          <button
                            type="button"
                            class="btn p-0 cursor-pointer"
                            data-container="body"
                            data-toggle="popover"
                            data-placement="top"
                            data-trigger="click focus"
                            data-content="Formatos permitidos: pdf, png, jpg y bmp. Peso máximo de archivo 2Mb"
                            @click="mostrarPopover">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 32 32"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <circle
                                cx="16"
                                cy="16"
                                r="16"
                                fill="#003DA5" />
                              <path
                                d="M13.8789 10.2598C13.8789 9.28971 14.4193 8.80469 15.5 8.80469C16.5807 8.80469 17.1211 9.28971 17.1211 10.2598C17.1211 10.722 16.9844 11.0833 16.7109 11.3438C16.444 11.5977 16.0404 11.7246 15.5 11.7246C14.4193 11.7246 13.8789 11.2363 13.8789 10.2598ZM16.9844 24H14.0059V13.082H16.9844V24Z"
                                fill="white" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <!-- Mandato -->
            <!--Factura auto nuevo -->
            <div
              v-if="tipoAntiguedad === 1 && userInfo.plan.codigoPlan !== '3'"
              class="row">
              <div class="col-lg-12">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label
                        class="form-label"
                        for="nroFactura">N° factura o guía de despacho</label>
                      <input
                        id="nroFactura"
                        v-model="nrofactura"
                        v-uppercase
                        class="form-field"
                        type="text"
                        maxlength="9"
                        @input="clearNumeric($event); validadorVacio($event)"
                        @keyup="clearNumeric($event); validadorVacio($event)"
                        @click="clearNumeric($event); validadorVacio($event); init()">
                      <label
                        style="display: none;"
                        class="form-error">Factura o Guía de despacho no puede estar vacio</label>
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <p class="mb-3 fs-1 c-primary-b">
                      <span class="font-main-bold">Importante:</span><br> Sólo se aceptan como válidas facturas de hasta 48 hrs. Si la factura es superior al plazo anterior, deberá realizar una inspección
                    </p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-4">
                    <div class="form-group">
                      <label
                        class="form-label"
                        for="rutEmisorFactura">Rut emisor de factura</label>
                      <input
                        id="rutEmisorFactura"
                        v-model="rutEmisorFactura"
                        v-format-rut
                        class="form-field"
                        type="text"
                        @keyup="validadorRut($event);"
                        @input="validadorRut($event);"
                        @click="validadorRut($event); init();">
                      <label
                        style="display: none;"
                        class="form-error">Rut emisor no puede estar vacio</label>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="form-group fechaEmisionFactura">
                      <label
                        class="form-label"
                        for="fechaEmisionFactura">Fecha</label>
                      <date-picker
                        v-model="fFactura"
                        :min-date="minDate"
                        :max-date="new Date()"
                        :update-on-input="true"
                        :popover="{ visibility: 'click' }"
                        @dayclick="formatFechaFactura($event); validadorVacioDateFactura($event)">
                        <template #default="{ inputValue, inputEvents }">
                          <input
                            id="fechaEmisionFactura"
                            v-model="fechaEmisionFactura"
                            class="form-field"
                            autocomplete="off"
                            :value="inputValue"
                            v-on="inputEvents"
                            @keyup="clearInputDate($event)">
                          <label
                            style="display: none;"
                            class="form-error">Fecha de emisión de factura no puede estar vacia</label>
                        </template>
                      </date-picker>
                    </div>
                  </div>
                  <div class="col-11 col-lg-3">
                    <button
                      id="facturaFile"
                      type="button"
                      class="btn-upload btn-upload-blue w-100"
                      @click="uploadFactura">
                      Adjuntar factura<svg
                        class="ml-3"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M24.8026 2.5H5.61467C4.81638 2.5 4.16699 3.14795 4.16699 3.94447V26.2305C4.16699 27.0271 4.81638 27.675 5.61467 27.675H24.8026C25.6009 27.675 26.2503 27.0271 26.2503 26.2305V3.94447C26.2503 3.14795 25.6009 2.5 24.8026 2.5ZM25.1253 3.9651V26.2512C25.1253 26.4286 24.9805 26.5731 24.8026 26.5731H5.61467C5.43681 26.5731 5.29205 26.4286 5.29205 26.2512V3.9651C5.29205 3.78764 5.43681 3.64319 5.61467 3.64319H24.8026C24.9805 3.64319 25.1253 3.78764 25.1253 3.9651ZM21.7168 7.54327H8.12929V8.64932H21.7168V7.54327ZM8.12929 11.662H21.7168V12.7681H8.12929V11.662ZM21.7168 15.7808H8.12929V16.8869H21.7168V15.7808ZM8.12929 19.9037H15.7896V21.0098H8.12929V19.9037Z"
                          fill="white" />
                      </svg>
                    </button>
                    <label
                      id="fileErrorMsg"
                      class="form-error" />
                    <span
                      id="fNameFact"
                      class="mb-0 fs-1 c-primary-b" />
                    <div class="d-none">
                      <input
                        id="uploadFileFact"
                        type="file">
                    </div>
                  </div>
                  <div class="col-1 col-lg-1">
                    <button
                      type="button"
                      class="btn p-0 cursor-pointer"
                      data-container="body"
                      data-toggle="popover"
                      data-placement="top"
                      data-trigger="hover,"
                      data-content="Formatos permitidos: pdf, png, jpg y bmp. Peso máximo de archivo 2Mb"
                      @click="mostrarPopover">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle
                          cx="16"
                          cy="16"
                          r="16"
                          fill="#003DA5" />
                        <path
                          d="M13.8789 10.2598C13.8789 9.28971 14.4193 8.80469 15.5 8.80469C16.5807 8.80469 17.1211 9.28971 17.1211 10.2598C17.1211 10.722 16.9844 11.0833 16.7109 11.3438C16.444 11.5977 16.0404 11.7246 15.5 11.7246C14.4193 11.7246 13.8789 11.2363 13.8789 10.2598ZM16.9844 24H14.0059V13.082H16.9844V24Z"
                          fill="white" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!--DAtos Vehículo -->
            <p
              v-if="showField"
              class="c-primary-b">
              <a
                id="dataVehiculo"
                href="#dataVehiculo" />
              Completar datos del vehículo
            </p>
            <div class="row">
              <div class="col-lg-10">
                <div v-show="tipoAntiguedad === 1">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group focused">
                        <label
                          class="form-label"
                          for="marca">Marca</label>
                        <input
                          id="marca"
                          v-model="marcaGlosa"
                          v-uppercase
                          disabled
                          class="form-field"
                          type="text"
                          @input="validadorVacio($event)"
                          @keyup="clearInput($event);"
                          @click="validadorVacio($event), init()">
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group focused">
                        <label
                          class="form-label"
                          for="modelo">Modelo</label>
                        <input
                          id="modelo"
                          v-model="modeloGlosa"
                          v-uppercase
                          disabled
                          class="form-field"
                          type="text"
                          @input="validadorVacio($event);"
                          @keyup="clearInput($event);"
                          @click="validadorVacio($event); init()">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group focused">
                        <label
                          class="form-label"
                          for="agnoVehiculo">Año</label>
                        <input
                          id="agnoVehiculo"
                          v-model="agnoVehiculo"
                          v-uppercase
                          disabled
                          class="form-field"
                          type="text"
                          @input="validadorVacio($event);"
                          @keyup="clearInput($event);"
                          @click="validadorVacio($event); init()">
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="showField"
                  class="row mb-4">
                  <div
                    class="col-lg-6">
                    <div class="form-group">
                      <label
                        for="numMotor"
                        class="form-label">Nº de motor</label>
                      <input
                        id="numMotor"
                        v-model="motor"
                        v-uppercase
                        class="form-field"
                        type="text"
                        @input="clearAlphaNumeric($event); validadorVacio($event)"
                        @keyup="clearAlphaNumeric($event); validadorVacio($event)"
                        @click="clearAlphaNumeric($event); validadorVacio($event); init()">
                      <label
                        class="form-error"
                        style="display: none;">
                        Nº de motor no puede estar vacio</label>
                    </div>
                  </div>
                  <div
                    class="col-lg-6">
                    <div class="form-group">
                      <label
                        for="numChasis"
                        class="form-label">Nº de chasis</label>
                      <input
                        id="numChasis"
                        v-model="chasis"
                        v-uppercase
                        class="form-field"
                        type="text"
                        @input="clearAlphaNumeric($event); validadorVacio($event)"
                        @keyup="clearAlphaNumeric($event); validadorVacio($event)"
                        @click="clearAlphaNumeric($event); validadorVacio($event); init()">
                      <label
                        class="form-error"
                        style="display: none;">
                        Nº de chasis no puede estar vacio</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--DAtos personales-->
            <p class="c-primary-b">
              <a
                id="data"
                href="#data" />
              Completar datos dueño o propietario
            </p>
            <div class="row">
              <div class="col-lg-10">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label
                        class="form-label"
                        for="rut">Rut</label>
                      <input
                        id="rut"
                        v-model="rut"
                        v-format-rut
                        disabled
                        class="form-field"
                        type="text"
                        @input="validadorRut($event);"
                        @keyup="validadorRut($event);"
                        @click="validadorRut($event);">
                      <label
                        style="display: none;"
                        class="form-error">El rut es incorrecto</label>
                    </div>
                  </div>
                  <div
                    v-show="tipoPersona === '1' || tipoPersona === 1"
                    class="col-lg-6">
                    <div class="form-group focused">
                      <label
                        class="form-label"
                        for="nombres">Nombres</label>
                      <input
                        id="nombres"
                        v-model="nombres"
                        v-uppercase
                        disabled
                        class="form-field"
                        type="text"
                        @input="clearInputAplha($event); validadorVacio($event);"
                        @keyup="clearInputAplha($event); validadorVacio($event);"
                        @click="clearInputAplha($event); validadorVacio($event);">
                      <label
                        style="display: none;"
                        class="form-error">Nombres no puede estar vacio</label>
                    </div>
                  </div>
                  <div
                    v-show="tipoPersona === '2' || tipoPersona === 2"
                    class="col-lg-6">
                    <div class="form-group focused">
                      <label
                        class="form-label"
                        for="razonSocial">Razón Social</label>
                      <input
                        id="razonSocial"
                        v-model="razonSocial"
                        v-uppercase
                        class="form-field"
                        type="text"
                        disabled
                        @input="clearRZInput($event); validadorVacio($event)"
                        @keyup="clearRZInput($event); validadorVacio($event) "
                        @click="clearRZInput($event); validadorVacio($event)">
                      <label
                        style="display: none;"
                        class="form-error">Razón social no puede estar vacío</label>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div
                    v-show="tipoPersona === '1' || tipoPersona === 1"
                    class="col-lg-6">
                    <div class="form-group focused">
                      <label
                        class="form-label"
                        for="apellidos">Apellidos</label>
                      <input
                        id="apellidos"
                        v-model="apellidos"
                        v-uppercase
                        class="form-field"
                        type="text"
                        disabled
                        @input="clearInputAplha($event); validadorVacio($event)"
                        @keyup="clearInputAplha($event); validadorVacio($event) "
                        @click="clearInputAplha($event); validadorVacio($event)">
                      <label
                        style="display: none;"
                        class="form-error">Apellidos no puede estar vacio</label>
                    </div>
                  </div>
                  <div
                    v-show="tipoPersona === '1' || tipoPersona === 1"
                    class="col-lg-6">
                    <div class="form-group fechaNacimiento">
                      <label
                        class="form-label"
                        for="fechaNacimiento">Fecha de Nacimiento</label>
                      <date-picker
                        v-model="fNacimiento"
                        :max-date="maxDate"
                        :update-on-input="true"
                        :popover="{ visibility: 'click' }"
                        @dayclick="formatFechaNacimiento($event); validadorVacioDateNacimiento($event)">
                        <template #default="{ inputValue, inputEvents }">
                          <input
                            id="fechaNacimiento"
                            v-model="fechaNacimiento"
                            disabled
                            class="form-field"
                            autocomplete="off"
                            :value="inputValue"
                            v-on="inputEvents"
                            @keyup="clearInputDate($event)">
                          <label
                            style="display: none;"
                            class="form-error">Fecha de nacimiento no puede estar vacia</label>
                        </template>
                      </date-picker>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div
                    v-if="tipoPersona === '1' || tipoPersona === 1"
                    class="col-lg-6">
                    <div class="form-group focused">
                      <label
                        class="form-label"
                        for="nacionalidad">Nacionalidad</label>
                      <select
                        id="nacionalidad"
                        v-model="nacionalidad"
                        class="form-select small-text"
                        @input="validadorSelect($event);"
                        @click="validadorSelect($event);">
                        <option
                          selected>
                          Seleccionar
                        </option>
                        <option
                          v-for="(nacionalidad, index) in nacionalidades"
                          :key="index"
                          :value="nacionalidad.codigo">
                          {{ nacionalidad.nombre }}
                        </option>
                      </select>
                      <label
                        style="display: none;"
                        class="form-error">Nacionalidad no puede estar vacia</label>
                    </div>
                  </div>
                  <div
                    v-if="tipoPersona === '2' || tipoPersona === 2"
                    class="col-lg-6">
                    <div class="form-group focused">
                      <label
                        class="form-label"
                        for="giro">Giro</label>
                      <input
                        id="correo"
                        v-model="giroComercialGlosa"
                        v-uppercase
                        disabled
                        class="form-field"
                        type="text">
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label
                        class="form-label"
                        for="correo">Correo electrónico</label>
                      <input
                        id="correo"
                        v-model="correoElectronico"
                        v-uppercase
                        disabled
                        class="form-field"
                        type="text"
                        @input="clearInputCorreo($event); validadorEmail($event);"
                        @keyup="clearInputCorreo($event); validadorEmail($event);"
                        @click="clearInputCorreo($event); validadorEmail($event);">
                      <label
                        style="display: none;"
                        class="form-error">El correo es incorrecto</label>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label
                        class="form-label"
                        for="celular">Celular (9 digitos) ej: 987654321</label>
                      <input
                        id="celular"
                        v-model="celular"
                        class="form-field"
                        type="text"
                        maxlength="9"
                        @input="clearNumeric($event); validadorCelular($event);"
                        @keyup="clearNumeric($event); validadorCelular($event); digitoMovil(celular)"
                        @click="clearNumeric($event); validadorCelular($event);">
                      <label
                        style="display: none;"
                        class="form-error">El formato de celular es incorrecto</label>
                    </div>
                  </div>
                  <div
                    v-if="tipoPersona === '1' || tipoPersona === 1"
                    class="col-lg-6">
                    <div class="form-group focused">
                      <label
                        class="form-label "
                        for="actividadLaboral">Actividad Laboral</label>
                      <select
                        id="actividadLaboral"
                        v-model="actividadLaboral"
                        class="form-select small-text"
                        @input="validadorSelect($event);"
                        @click="validadorSelect($event);">
                        <option
                          selected>
                          Seleccionar
                        </option>
                        <option
                          v-for="(actLaboral, index) in actEcon"
                          :key="index"
                          :value="actLaboral.codigo">
                          {{ actLaboral.nombre }}
                        </option>
                      </select>
                      <label
                        style="display: none;"
                        class="form-error">Actividad Laboral no puede estar vacía</label>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-5">
                    <div class="form-group focused">
                      <label
                        class="form-label"
                        for="regiones">Región</label>
                      <select
                        id="regiones"
                        v-model="region"
                        class="form-select small-text"
                        @change="enableCitySelect();"
                        @input="validadorSelect($event);"
                        @click="validadorSelect($event);">
                        <option
                          selected>
                          Seleccionar
                        </option>
                        <option
                          v-for="(region, index) in allRegions"
                          :key="index"
                          :value=" region.codRegion ">
                          {{ region.glsRegion }}
                        </option>
                      </select>
                      <label
                        style="display: none;"
                        class="form-error">Seleccione una región</label>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="form-group focused">
                      <label
                        class="form-label"
                        for="ciudad">Ciudad</label>
                      <select
                        id="ciudad"
                        v-model="ciudad"
                        disabled
                        class="form-select small-text"
                        @change="enableComunaSelect()"
                        @input="validadorSelect($event);"
                        @click="validadorSelect($event);">
                        <option
                          selected>
                          Seleccionar
                        </option>
                        <option
                          v-for="(ciudad, index) in allCities"
                          :key="index"
                          :value=" ciudad.codCiudad ">
                          {{ ciudad.glsCiudad }}
                        </option>
                      </select>
                      <label
                        style="display: none;"
                        class="form-error">Seleccione una ciudad</label>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="form-group focused">
                      <label
                        class="form-label"
                        for="comuna">Comuna</label>
                      <select
                        id="comuna"
                        v-model="comuna"
                        v-uppercase
                        disabled
                        class="form-select small-text"
                        @input="validadorSelect($event);"
                        @click="validadorSelect($event);">
                        <option
                          selected>
                          Seleccionar
                        </option>
                        <option
                          v-for="(comuna, index) in allComunas"
                          :key="index"
                          :value=" comuna.codComuna ">
                          {{ comuna.glsComuna }}
                        </option>
                      </select>
                      <label
                        style="display: none;"
                        class="form-error">Seleccione una comuna</label>
                    </div>
                  </div>
                </div>
                <div class="row mb-5">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label
                        class="form-label"
                        for="direccion">Dirección</label>
                      <input
                        id="direccion"
                        v-model="direccion"
                        v-uppercase
                        required
                        class="form-field"
                        type="text"
                        @input="clearInputAplha($event); validadorVacio($event)"
                        @keyup="clearInputAplha($event); validadorVacio($event) "
                        @click="clearInputAplha($event); validadorVacio($event)">
                      <label
                        class="form-error"
                        style="display: none;">
                        Dirección no puede estar vacio</label>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="form-group">
                      <label
                        class="form-label"
                        for="numero">Número</label>
                      <input
                        id="numero"
                        v-model="numeroCalle"
                        v-uppercase
                        class="form-field"
                        type="text"
                        @input="clearAlphaNumeric($event); validadorVacio($event)"
                        @keyup="clearAlphaNumeric($event); validadorVacio($event)"
                        @click="clearAlphaNumeric($event); validadorVacio($event)">
                      <label
                        style="display: none;"
                        class="form-error">Ingrese un número</label>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="form-group">
                      <label
                        class="form-label"
                        for="depto">Depto</label>
                      <input
                        id="depto"
                        v-model="departamento"
                        v-uppercase
                        class="form-field"
                        type="text"
                        @input="clearAlphaNumeric($event);"
                        @keyup="clearAlphaNumeric($event);"
                        @click="clearAlphaNumeric($event);">
                    </div>
                  </div>
                </div>
                <!--Datos personales-->
                <!-- PEP -->
                <pep-form />

                <!-- PEP -->
                <div class="row justify-content-center">
                  <div class="col-lg-4">
                    <div
                      class="validation-layer"
                      @click="validate" />
                    <button
                      type="submit"
                      :disabled="formValid"
                      class="btn btn-primary-corp w-100 mb-6 rounded-s">
                      Continuar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <modal-propuesta />
    <modal-resumen />
  </div>
</template>

<script>
import {
  formatRut,
  uppercase,
} from '@consorcio/pcc-commons-vue/src/directives';
import jQuery from 'jquery';
import { CLoaderCarModal } from '@consorcio/pcc-commons-vue/src/components';
import rutUtilities from '@consorcio/pcc-commons-vue/src/helpers/rutUtilities';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import { mapState, mapActions, mapMutations } from 'vuex';
import Resumen from './Resume.vue';
import PepForm from './PepForm.vue';
import ModalPropuesta from './modalPropuesta.vue';
import ModalResumen from './ModalResume.vue';

export default {
  name: 'DatosPersonales',
  components: {
    Resumen,
    PepForm,
    ModalPropuesta,
    DatePicker,
    CLoaderCarModal,
    ModalResumen,
  },
  directives: {
    formatRut,
    uppercase,
  },
  props: ['initialValue'],
  data() {
    return {
      simulacionCerrada: '',
      fvigencia: '',
      fFactura: '',
      fNacimiento: '',
      ids: '',
      disabled: '',
      tipoPersona: '',
      medioPagoGlosa: '',
      tipoAntiguedad: '',
      isPersonaJuridica: false,
      hasPolizas: false,
      polizaAdjunta: '',
      isHidden: true,
      sameAsOwner: false,
      rut: '',
      nombres: '',
      apellidos: '',
      razonSocial: '',
      rutPagador: '',
      nombrePagador: '',
      apellidosPagador: '',
      razonSocialPagador: '',
      giroPagador: 'Seleccionar',
      giroPagadorGlosa: '',
      giroComercial: '',
      giroComercialGlosa: '',
      tieneSiniestrosPeriodo: 'Seleccionar',
      nrofactura: '',
      fechaEmisionFactura: '',
      rutEmisorFactura: '',
      fechaFinVigencia: '',
      codigoBanco: 'Seleccionar',
      nombreBanco: '',
      tipoCuenta: 'Seleccionar',
      nombreCuenta: '',
      numeroCuenta: '',
      diaPago: 'Seleccionar',
      numeroTarjeta: '',
      tipoTarjeta: '',
      fechaExpiracion: '',
      deducibleActual: '',
      file: this.initialValue,
      contentType: '',
      fileExtension: '',
      fileExtensionFactura: '',
      fileFactura: this.initialValue,
      contentTypeFactura: '',
      coberturaDaniosParciales: '',
      fechaNacimiento: '',
      nacionalidad: 'Seleccionar',
      nacionalidadGlosa: '',
      correoElectronico: '',
      codigoMovil: null,
      celular: '',
      actividadLaboral: 'Seleccionar',
      actLaboralGlosa: '',
      region: 'Seleccionar',
      ciudad: 'Seleccionar',
      comuna: 'Seleccionar',
      regionGlosa: '',
      ciudadGlosa: '',
      comunaGlosa: '',
      direccion: '',
      numeroCalle: '',
      departamento: '',
      piso: 0,
      tipoVivienda: 2,
      formValid: true,
      numeroSimulacion: '',
      marca: '',
      modelo: '',
      marcaGlosa: '',
      modeloGlosa: '',
      agnoVehiculo: '',
      patente: '',
      motor: '',
      chasis: '',
      regEmail: /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      regCelular: /^([2-9])(\d{4})(\d{4})\D*$/,
      regDeducible: /^[a-zA-Z0-9\b]+$/,
      regDate: /^\d{2}([./-])\d{2}\1\d{4}$/,
      isDisabled: true,
      showField: '',
      minDate: new Date().setMonth(new Date().getMonth() - 1),
      maxDate: new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
      autoRegistrado: '',
    };
  },
  computed: {
    ...mapState(['loading']),
    ...mapState(['errorMessage']),
    ...mapState(['userInfo']),
    ...mapState(['nacionalidades']),
    ...mapState(['giro']),
    ...mapState(['actEcon']),
    ...mapState(['regiones']),
    ...mapState(['ciudades']),
    ...mapState(['comunas']),
    ...mapState(['bancos']),
    ...mapState(['cuentas']),
    ...mapState(['isPep']),
    ...mapState(['rutClientePep']),
    ...mapState(['nombreClientePep']),
    ...mapState(['fechaClientePep']),
    ...mapState(['infoPersonaNatural']),
    ...mapState(['factura']),
    ...mapState(['concob']),
    ...mapState(['busquedaCNS']),
    ...mapState(['rolUsuario']),
    ...mapState(['parametrosSeguros']),
    ...mapState(['user']),
    ...mapState(['simulacion']),

    allRegions() {
      return this.$store.getters.REGION;
    },
    allCities() {
      return this.$store.state.ciudades;
    },
    allComunas() {
      return this.$store.state.comunas;
    },
    formatRut() {
      let newFormatRut = '';
      if (this.rut.length < 8) {
        newFormatRut = this.rut.replace(/^(\d{3})(\d{3})(\d{0,3})$/, '$1.$2-$3');
      } else {
        newFormatRut = this.rut.replace(/[^0-9K]/g, '').replace(/^(\d{1,2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');
      }
      return newFormatRut;
    },
  },
  watch: {
    fechaFinVigencia() {
      const valid = this.fechaFinVigencia !== '' && this.fechaFinVigencia !== ' '
      && this.regDate.test(this.fechaFinVigencia) && this.fechaFinVigencia !== '11/11/2020';
      if (valid) {
        jQuery('.form-group.fechaFinVigencia .form-error').css('display', 'none');
        jQuery('#fechaFinVigencia').parents('.form-group').addClass('focused');
        jQuery('#fechaFinVigencia').addClass('filled');
        jQuery('.noFocus').addClass('focused');
        jQuery('#fechaFinVigencia').removeClass('is-invalid');
        jQuery('#fechaFinVigencia').addClass('is-valid');
      } else {
        jQuery('.form-group.fechaFinVigencia .form-error').css('display', 'block');
        if (this.fechaFinVigencia === '') {
          jQuery('.form-group.fechaFinVigencia .form-error').text('Fecha de fin de vigencia no puede estar vacío');
        } else if (!this.regDate.test(this.fechaFinVigencia)) {
          jQuery('.form-group.fechaFinVigencia .form-error').text('El formato es inválido. Formato válido dd/mm/yyy');
        }
        jQuery('#fechaFinVigencia').removeClass('filled');
        jQuery('#fechaFinVigencia').parents('.form-group').removeClass('focused');
        jQuery('.noFocus').addClass('focused');
        jQuery('#fechaFinVigencia').addClass('is-invalid');
        jQuery('#fechaFinVigencia').removeClass('is-valid');
      }
    },
    fechaEmisionFactura() {
      const valid = this.fechaEmisionFactura !== '' && this.fechaEmisionFactura !== ' ' && this.regDate.test(this.fechaEmisionFactura);
      if (valid) {
        jQuery('.form-group.fechaEmisionFactura .form-error').css('display', 'none');
        jQuery('#fechaEmisionFactura').parents('.form-group').addClass('focused');
        jQuery('#fechaEmisionFactura').addClass('filled');
        jQuery('.noFocus').addClass('focused');
        jQuery('#fechaEmisionFactura').addClass('is-valid');
        jQuery('#fechaEmisionFactura').removeClass('is-invalid');
      } else {
        if (this.fechaFinVigencia === '') {
          jQuery('.form-group.fechaEmisionFactura .form-error').text('Fecha de emisión de factura no puede estar vacia');
        } else if (!this.regDate.test(this.fechaFinVigencia)) {
          jQuery('.form-group.fechaEmisionFactura .form-error').text('El formato es inválido. Formato válido dd/mm/yyy');
        }
        jQuery('.form-group.fechaEmisionFactura .form-error').css('display', 'block');
        jQuery('#fechaEmisionFactura').removeClass('filled');
        jQuery('#fechaEmisionFactura').parents('.form-group').removeClass('focused');
        jQuery('.noFocus').addClass('focused');
        jQuery('#fechaEmisionFactura').addClass('is-invalid');
        jQuery('#fechaEmisionFactura').removeClass('is-valid');
      }
    },
    fechaNacimiento() {
      const edad = this.calcularEdad(this.fechaNacimiento);
      const valid = this.fechaNacimiento !== '' && this.fechaNacimiento !== ' '
      && this.regDate.test(this.fechaNacimiento);
      if (valid && edad >= 18) {
        jQuery('.form-group.fechaNacimiento .form-error').css('display', 'none');
        jQuery('#fechaNacimiento').parents('.form-group').addClass('focused');
        jQuery('#fechaNacimiento').addClass('filled');
        jQuery('.noFocus').addClass('focused');
        jQuery('#fechaNacimiento').removeClass('is-invalid');
        jQuery('#fechaNacimiento').addClass('is-valid');
      } else {
        jQuery('.form-group.fechaNacimiento .form-error').css('display', 'block');
        if (this.fechaNacimiento === '') {
          jQuery('.form-group.fechaNacimiento .form-error').text('Fecha de nacimiento no puede estar vacío');
        } else if (!this.regDate.test(this.fechaNacimiento)) {
          jQuery('.form-group.fechaNacimiento .form-error').text('El formato es inválido. Formato válido dd/mm/yyy');
        } else if (valid && edad < 18) {
          jQuery('.form-group.fechaNacimiento .form-error').text('Cliente debe ser mayor de edad');
        }
        jQuery('#fechaNacimiento').removeClass('filled');
        jQuery('#fechaNacimiento').parents('.form-group').removeClass('focused');
        jQuery('.noFocus').addClass('focused');
        jQuery('#fechaNacimiento').addClass('is-invalid');
        jQuery('#fechaNacimiento').removeClass('is-valid');
      }
    },
    departamento() {
      if (this.departamento !== '' && this.departamento !== ' ' && this.departamento !== null) {
        this.tipoVivienda = 1;
        const depto = this.departamento.padStart(4, '0');
        const piso = depto.substring(0, 2);
        this.piso = piso;
      } else {
        this.tipoVivienda = 2;
        this.piso = 0;
      }
    },
    sameAsOwner() {
      if (this.sameAsOwner === true) {
        if (this.userInfo.contratante.tipoPersona === '1' || this.userInfo.contratante.tipoPersona === 1) {
          this.nombrePagador = this.nombres;
          this.apellidosPagador = this.apellidos;
          this.rutPagador = this.rut;
        } else {
          this.nombrePagador = this.razonSocial;
          this.apellidosPagador = '';
          this.rutPagador = this.rut;
        }
      } else {
        this.nombrePagador = '';
        this.apellidosPagador = '';
        this.rutPagador = '';
      }
    },
    codigoBanco() {
      this.nombreBanco = jQuery('#banco > option:selected').text();
    },
    tipoCuenta() {
      this.nombreCuenta = jQuery('#tipoCuenta > option:selected').text();
    },
    region() {
      const found = this.regiones.find((region) => region.codRegion === `${this.region}`);
      this.regionGlosa = found.glsRegion;
    },
    ciudad() {
      if (this.userInfo.direccion === undefined) {
        this.ciudadGlosa = jQuery('#ciudad > option:selected').text();
      }
    },
    comuna() {
      if (this.userInfo.direccion === undefined) {
        this.comunaGlosa = jQuery('#comuna > option:selected').text();
      }
    },
    actividadLaboral() {
      if (this.userInfo.contratante.actividadLaboralGlosa === undefined) {
        this.actLaboralGlosa = jQuery('#actividadLaboral > option:selected').text();
      }
    },
    nacionalidad() {
      if (this.userInfo.contratante.nacionalidadGlosa === undefined) {
        this.nacionalidadGlosa = jQuery('#nacionalidad > option:selected').text();
      }
    },
    giroPagador() {
      const giroGlosa = this.giro.find((el) => el.codigo === this.giroPagador);
      this.giroPagadorGlosa = giroGlosa.nombre;
    },
    fileFactura() {
      if (this.fileFactura !== undefined || this.fileFactura !== '') {
        jQuery('#rutEmisorFactura').focus();
      }
    },
    file() {
      if (this.file !== undefined || this.file !== '') {
        jQuery('#deducible').focus();
      }
    },
  },
  created() {
    this.getEstadoAgrupacion();
  },
  mounted() {
  },
  methods: {

    ...mapActions(['getUserInfo']),
    ...mapActions(['getUser']),
    ...mapActions(['getNationality']),
    ...mapActions(['getActEcon']),
    ...mapActions(['getCorreo']),
    ...mapActions(['getBancos']),
    ...mapActions(['getMarcas']),
    ...mapActions(['getModelos']),
    ...mapActions(['getGiro']),
    ...mapMutations(['setBusquedaCNS']),
    ...mapActions(['getRol']),
    ...mapActions(['getSimulacion']),

    async getEstadoAgrupacion() {
      const response = await this.getSimulacion(this.qParam('ids'));
      if (response.status === 200) {
        this.simulacionCerrada = this.simulacion.estadoAgrupacion;
        if (this.simulacionCerrada === '4') {
          this.$store.commit('updateCurrentView', 'errorEstatus');
        } else {
          this.init();
          this.getUserData();
          this.isBusquedaCNS();
          this.$store.dispatch('getRegiones', '');
          this.getBancos();
          this.getTipoCuenta();
          this.ids = this.qParam('ids');
          this.getNationality();
          this.getActEcon();
          this.getGiro();
        }
      }
    },
    async isBusquedaCNS() {
      await this.getUser();
      if (this.user !== null) {
        const customfield = this.user.custom_fields.find((cf) => cf.name === 'perfilUsuario');
        if (customfield !== undefined) {
          const perfil = customfield.value.replace(/["\][\\]/g, '');
          const responseRol = await this.getRol(perfil);
          if (responseRol.status === 200) {
            const permiso = this.rolUsuario.permisos
              .find((per) => per.nombrePermiso === 'busqueda_cns');
            const permisoi = this.rolUsuario.permisos
              .find((per) => per.nombrePermiso === 'flujo_vehiculo_cns');
            if (permiso !== undefined || permisoi !== undefined) {
              this.setBusquedaCNS(true);
            } else {
              this.setBusquedaCNS(false);
            }
          } else {
            this.setBusquedaCNS(false);
          }
        } else {
          this.setBusquedaCNS(false);
        }
      } else {
        this.setBusquedaCNS(false);
      }
    },

    /* global marcaje_google_analytics:readonly */
    pushGTM(element, categoria, evento) {
      marcaje_google_analytics(element, categoria, evento);
    },
    validate() {
      jQuery('.form-group input, form select').click();
      setTimeout(() => {
        jQuery('body').click();
      }, 250);
    },
    mostrarPopover() {
      jQuery('[data-toggle="popover"]').popover();
    },
    qParam(keyP) {
      let key = keyP;
      key = key.replace(/[*+?^$.[\]{}()|\\/]/g, '\\$&'); // escape RegEx meta chars
      const match = window.location.search.match(new RegExp(`[?&]${key}=([^&]+)(&|$)`));
      return match && decodeURIComponent(match[1].replace(/\/+/g, ''));
    },
    formatFechaNacimiento(event) {
      jQuery('#fechaNacimiento').parents('.form-group').addClass('focused');
      const fechaArray = event.id.split('-');
      const fecha = `${fechaArray[2]}/${fechaArray[1]}/${fechaArray[0]}`;
      this.fechaNacimiento = fecha;
    },
    formatFechaFactura(event) {
      jQuery('#fechaEmisionFactura').parents('.form-group').addClass('focused');
      const fechaArray = event.id.split('-');
      const fecha = `${fechaArray[2]}/${fechaArray[1]}/${fechaArray[0]}`;
      this.fechaEmisionFactura = fecha;
    },
    formatFechaConCob(event) {
      jQuery('#fechaFinVigencia').parents('.form-group').addClass('focused');
      const fechaArray = event.id.split('-');
      const fecha = `${fechaArray[2]}/${fechaArray[1]}/${fechaArray[0]}`;
      this.fechaFinVigencia = fecha;
    },

    async getTipoCuenta() {
      await this.isBusquedaCNS();
      if (this.busquedaCNS) {
        this.$store.dispatch('getTipoCuentaCNS', 37);
      } else {
        this.$store.dispatch('getTipoCuenta', 37);
      }
    },
    agregarFechaCalendario(event) {
      jQuery('#fechaNacimiento').parents('.form-group').addClass('focused');
      const fechaArray = event.id.split('-');
      const fecha = `${fechaArray[2]}/${fechaArray[1]}/${fechaArray[0]}`;
      this.fechaNacimiento = fecha;
    },
    getUserData() {
      this.getUserInfo(this.qParam('ids')).then(() => {
      }).finally(() => {
        this.tipoPersona = this.userInfo.contratante.tipoPersona;
        this.tipoAntiguedad = this.userInfo.vehiculo.tipoAntiguedad;
        if (this.userInfo.plan.codigoPlan === '3') {
          this.hasPolizas = '0';
        } else {
          this.hasPolizas = false;
        }
        this.medioPagoGlosa = this.userInfo.plan.medioPagoGlosa;
        if (this.userInfo.contratante.rut.length < 8) {
          this.rut = this.userInfo.contratante.rut.replace(/^(\d{3})(\d{3})(\d{0,3})$/, '$1.$2-$3');
        } else {
          this.rut = this.userInfo.contratante.rut.replace(/[^0-9K]/g, '').replace(/^(\d{1,2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');
        }
        this.nombres = this.userInfo.contratante.nombres;
        const apellidoP = (this.userInfo.contratante.apellidoPaterno !== null && this.userInfo.contratante.apellidoPaterno !== '') ? this.userInfo.contratante.apellidoPaterno : '';
        const apellidoM = (Object.prototype.hasOwnProperty.call(this.userInfo.contratante, 'apellidoMaterno')) ? this.userInfo.contratante.apellidoMaterno : '';
        this.apellidos = `${apellidoP} ${apellidoM}`;
        this.correoElectronico = this.userInfo.contratante.email;
        this.agnoVehiculo = this.userInfo.vehiculo.anio;
        this.modelo = this.userInfo.vehiculo.codigoModelo;
        this.marca = this.userInfo.vehiculo.codigoMarca;
        this.marcaGlosa = this.userInfo.vehiculo.glosaMarca;
        this.modeloGlosa = this.userInfo.vehiculo.glosaModelo;
        this.giro = this.userInfo.contratante.giro;
        this.patente = this.userInfo.vehiculo.patente;
        if (this.userInfo.contratante.fechaNacimiento !== null && this.userInfo.contratante.fechaNacimiento !== '') {
          if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(this.userInfo.contratante.fechaNacimiento)) {
            this.fechaNacimiento = this.formatDateIso(this.userInfo.contratante.fechaNacimiento);
            jQuery('#fechaNacimiento').attr('value', this.fechaNacimiento);
          } else {
            this.fechaNacimiento = this.userInfo.contratante.fechaNacimiento;
            const newDate = this.userInfo.contratante.fechaNacimiento.split('/');
            jQuery('#fechaNacimiento').attr('value', `${newDate[0]}/${newDate[1]}/${newDate[2]}`);
          }
        }

        jQuery('#rut').addClass('is-valid');
        jQuery('#rut').removeClass('is-invalid');
        jQuery('#rut').next().css('display', 'none');
        jQuery('#rut').parent('.form-group').addClass('focused');

        jQuery('#nombres').addClass('is-valid');
        jQuery('#nombres').removeClass('is-invalid');
        jQuery('#nombres').next().css('display', 'none');
        jQuery('#nombres').parent('.form-group').addClass('focused');

        jQuery('#apellidos').addClass('is-valid');
        jQuery('#apellidos').removeClass('is-invalid');
        jQuery('#apellidos').next().css('display', 'none');
        jQuery('#apellidos').parent('.form-group').addClass('focused');

        jQuery('#fechaNacimiento').addClass('is-valid');
        jQuery('#fechaNacimiento').removeClass('is-invalid');
        jQuery('.form-group.fechaNacimiento .form-error').css('display', 'none');
        // jQuery('#fechaNacimiento').parents('span').next().css('display', 'none');
        jQuery('#fechaNacimiento').parents('.form-group').addClass('focused');

        jQuery('#correo').addClass('is-valid');
        jQuery('#correo').removeClass('is-invalid');
        jQuery('#correo').next().css('display', 'none');
        jQuery('#correo').parent('.form-group').addClass('focused');

        if (this.tipoPersona === '2' || this.tipoPersona === 2) {
          this.nombres = '';
          this.apellidos = '';
          this.actividadLaboral = '';
          this.nacionalidad = '';
          this.razonSocial = this.userInfo.contratante.nombreLegal;
          this.giroComercial = this.userInfo.contratante.giro;
          this.giroComercialGlosa = this.userInfo.contratante.giroGlosa;

          if (this.userInfo.contratante.fechaNacimiento !== null && this.userInfo.contratante.fechaNacimiento !== '') {
            this.fechaNacimiento = this.userInfo.contratante.fechaNacimiento;
          }
          jQuery('#giro').addClass('is-valid');
          jQuery('#giro').removeClass('is-invalid');
          jQuery('#giro').next().css('display', 'none');
          jQuery('#giro').parent('.form-group').addClass('focused');

          jQuery('#razonSocial').addClass('is-valid');
          jQuery('#razonSocial').removeClass('is-invalid');
          jQuery('#razonSocial').next().css('display', 'none');
          jQuery('#razonSocial').parent('.form-group').addClass('focused');
        }
        if (this.tipoAntiguedad === 1) {
          this.showField = true;
          jQuery('#agnoVehiculo').addClass('is-valid');
          jQuery('#agnoVehiculo').removeClass('is-invalid');
          jQuery('#agnoVehiculo').next().css('display', 'none');
          jQuery('#agnoVehiculo').parent('.form-group').addClass('focused');

          jQuery('#marca').addClass('is-valid');
          jQuery('#marca').removeClass('is-invalid');
          jQuery('#marca').next().css('display', 'none');
          jQuery('#marca').parent('.form-group').addClass('focused');

          jQuery('#modelo').addClass('is-valid');
          jQuery('#modelo').removeClass('is-invalid');
          jQuery('#modelo').next().css('display', 'none');
          jQuery('#modelo').parent('.form-group').addClass('focused');
        } else if (this.userInfo.vehiculo.motor === '' || this.userInfo.vehiculo.motor === ' ') {
          this.showField = true;
          this.autoRegistrado = false;
        } else {
          this.showField = false;
          this.autoRegistrado = true;
          this.motor = this.userInfo.vehiculo.motor;
          this.chasis = this.userInfo.vehiculo.chasis;
        }
        // Nuevo retoma
        if (this.userInfo.direccion !== undefined && this.userInfo.pagador !== undefined) {
          this.retomaData();
        }
      });
      setTimeout(() => {
        this.addGenericValidClass();
        this.checkform();
      }, 5000);

      this.getSimulacion(this.qParam('ids'));
    },
    retomaData() {
      // Pagador
      if (this.userInfo.pagador.mismoPagador) {
        this.sameAsOwner = this.userInfo.pagador.mismoPagador;
      } else {
        if (this.userInfo.pagador.rut !== '' && this.userInfo.pagador.rut !== null) {
          this.rutPagador = `${this.userInfo.pagador.rut}`;
          this.addValidClass('#rutPagador');
        }
        if (this.userInfo.pagador.isPersonaJuridica !== undefined && this.userInfo.pagador.isPersonaJuridica !== false) {
          this.isPersonaJuridica = `${this.userInfo.pagador.isPersonaJuridica}`;
          if (this.userInfo.pagador.nombres !== '' && this.userInfo.pagador.nombres !== null) {
            this.razonSocialPagador = `${this.userInfo.pagador.nombres}`;
            this.addValidClass('#razonSocialPagador');
          }
          if (this.userInfo.pagador.giro !== '' && this.userInfo.pagador.giro !== null) {
            this.giroPagador = `${this.userInfo.pagador.giro}`;
            this.addValidClass('#giroPagador');
          }
          if (this.userInfo.pagador.giroPagadorGlosa !== '' && this.userInfo.pagador.giroPagadorGlosa !== null) {
            this.giroPagadorGlosa = this.userInfo.pagador.giroPagadorGlosa;
          } else {
            const found = this.giro.find((el) => el.codigo === `${this.userInfo.pagador.giro}`);
            this.giroPagadorGlosa = found.nombre;
          }
        } else {
          if (this.userInfo.pagador.nombres !== '' && this.userInfo.pagador.nombres !== null) {
            this.nombrePagador = `${this.userInfo.pagador.nombres}`;
            this.addValidClass('#nombrePagador');
          }
          if (this.userInfo.pagador.apellidoPaterno !== '' && this.userInfo.pagador.apellidoPaterno !== null) {
            const apellidoPagadorP = (this.userInfo.pagador.apellidoPaterno !== null && this.userInfo.pagador.apellidoPaterno !== '') ? this.userInfo.pagador.apellidoPaterno : '';
            const apellidoPagadorM = (Object.prototype.hasOwnProperty.call(this.userInfo.pagador, 'apellidoMaterno')) ? this.userInfo.pagador.apellidoMaterno : '';
            this.apellidosPagador = `${apellidoPagadorP} ${apellidoPagadorM}`;
            this.addValidClass('#apellidoPagador');
          }
        }
      }
      // // Facturacion
      if (this.userInfo.facturacion.rutEmisorFactura !== '' && this.userInfo.facturacion.rutEmisorFactura !== null) {
        this.rutEmisorFactura = `${this.userInfo.facturacion.rutEmisorFactura}`;
        this.addValidClass('#rutEmisorFactura');
      }
      if (this.userInfo.facturacion.numeroFactura !== '' && this.userInfo.facturacion.numeroFactura !== null) {
        this.nrofactura = `${this.userInfo.facturacion.numeroFactura}`;
        this.addValidClass('#nrofactura');
      }
      if (this.userInfo.facturacion.fechaEmisionFactura !== '' && this.userInfo.facturacion.fechaEmisionFactura !== null) {
        if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(this.userInfo.facturacion.fechaEmisionFactura)) {
          this.fechaEmisionFactura = this.formatDateIso(this.userInfo.facturacion.fechaEmisionFactura);
          setTimeout(() => {
            this.addValidClass('#fechaEmisionFactura');
          }, 5000);
        } else {
          this.fechaEmisionFactura = this.userInfo.facturacion.fechaEmisionFactura;
          setTimeout(() => {
            this.addValidClass('#fechaEmisionFactura');
          }, 5000);
        }
      }
      if (this.userInfo.facturacion.archivoFactura !== '' && this.userInfo.facturacion.archivoFactura !== null) {
        this.fileFactura = this.userInfo.facturacion.archivoFactura;
        this.fileExtensionFactura = this.userInfo.facturacion.archivoFacturaExtension;
        this.contentTypeFactura = this.userInfo.facturacion.archivoFacturaContentType;
        setTimeout(() => {
          jQuery('#fNameFact').text('Documento adjunto');
        }, 2000);
      }

      // continuidad cobertura
      if (this.userInfo.continuidadCobertura.tieneContinuidad !== '' && this.userInfo.continuidadCobertura.tieneContinuidad !== null) {
        this.hasPolizas = `${this.userInfo.continuidadCobertura.tieneContinuidad}`;
      }
      if (this.userInfo.continuidadCobertura.tieneContinuidad !== 0) {
        if (this.userInfo.continuidadCobertura.fechaFinVigencia !== ''
      && this.userInfo.continuidadCobertura.fechaFinVigencia !== null) {
          if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(this.userInfo.continuidadCobertura.fechaFinVigencia)) {
            this.fechaFinVigencia = this.formatDateIso(this.userInfo.continuidadCobertura.fechaFinVigencia);
            setTimeout(() => {
              this.addValidClass('#fechaFinVigencia');
            }, 5000);
          } else {
            this.fechaFinVigencia = this.userInfo.continuidadCobertura.fechaFinVigencia;
            setTimeout(() => {
              this.addValidClass('#fechaFinVigencia');
            }, 5000);
          }
        }
        if (this.userInfo.continuidadCobertura.tieneSiniestrosPeriodo !== '' && this.userInfo.continuidadCobertura.tieneSiniestrosPeriodo !== null) {
          this.tieneSiniestrosPeriodo = this.userInfo.continuidadCobertura.tieneSiniestrosPeriodo;
          this.addValidClass('#siniestro');
        }
        if (this.userInfo.continuidadCobertura.coberturaDaniosParciales !== '' && this.userInfo.continuidadCobertura.coberturaDaniosParciales !== null) {
          this.coberturaDaniosParciales = this.userInfo.continuidadCobertura.coberturaDaniosParciales;
        }
        if (this.userInfo.continuidadCobertura.deducibleUfContratado !== '' && this.userInfo.continuidadCobertura.deducibleUfContratado !== null) {
          this.deducibleActual = this.userInfo.continuidadCobertura.deducibleUfContratado;
          this.addValidClass('#deducible');
        }
        if (this.userInfo.continuidadCobertura.polizaAdjunta !== '' && this.userInfo.continuidadCobertura.polizaAdjunta !== null) {
          this.file = this.userInfo.continuidadCobertura.archivoConCob;
          this.contentType = this.userInfo.continuidadCobertura.archivoConCobExtension.split('/').pop();
          this.fileExtension = this.userInfo.continuidadCobertura.archivoConCobContentType.split('/').pop();
          setTimeout(() => {
            jQuery('#fName').text('Documento adjunto');
          }, 2000);
        }
      } else {
        this.cleanPolizaFields();
      }
      // Vehículo
      if (this.userInfo.vehiculo.autoRegistrado !== undefined && !this.userInfo.vehiculo.autoRegistrado) {
        this.showField = true;
      }
      if (this.userInfo.contratante.chasis !== '' && this.userInfo.contratante.chasis !== null) {
        this.motor = this.userInfo.vehiculo.motor;
        this.addValidClass('#numMotor');
      }
      if (this.userInfo.contratante.motor !== '' && this.userInfo.contratante.motor !== null) {
        this.chasis = this.userInfo.vehiculo.chasis;
        this.addValidClass('#numChasis');
      }

      // contratante
      if (this.userInfo.direccion.nombreCalle !== '' && this.userInfo.direccion.nombreCalle !== null) {
        this.direccion = this.userInfo.direccion.nombreCalle;
        this.addValidClass('#direccion');
      }
      if (this.userInfo.direccion.numeroCalle !== '' && this.userInfo.direccion.numeroCalle !== null) {
        this.numeroCalle = this.userInfo.direccion.numeroCalle;
        this.addValidClass('#numero');
      }
      if (this.userInfo.direccion.departamento !== '' && this.userInfo.direccion.departamento !== null) {
        this.departamento = this.userInfo.direccion.departamento;
        jQuery('#depto').parent('.form-group').addClass('focused');
      }
      if (this.userInfo.contratante.nacionalidad !== '' && this.userInfo.contratante.nacionalidad !== null) {
        this.nacionalidad = this.userInfo.contratante.nacionalidad;
        this.addValidClass('#nacionalidad');
      }
      if (this.userInfo.informacionContacto.telefonoMovil !== '' && this.userInfo.informacionContacto.telefonoMovil !== null) {
        const { codigoMovil } = this.userInfo.informacionContacto;
        const { telefonoMovil } = this.userInfo.informacionContacto;
        this.celular = `${codigoMovil}${telefonoMovil}`;
        this.codigoMovil = codigoMovil;
        this.addValidClass('#celular');
      }
      if (this.userInfo.contratante.actividadLaboral !== '' && this.userInfo.contratante.actividadLaboral !== null) {
        this.actividadLaboral = this.userInfo.contratante.actividadLaboral;
        this.addValidClass('#actividadLaboral');
      }
      if (this.userInfo.direccion.codigoRegion !== '' && this.userInfo.direccion.codigoRegion !== null) {
        this.region = this.userInfo.direccion.codigoRegion;
        this.addValidClass('#regiones');
      }
      if (this.userInfo.direccion.codigoCiudad !== '' && this.userInfo.direccion.codigoCiudad !== null) {
        this.ciudad = this.userInfo.direccion.codigoCiudad;
        this.$store.dispatch('getCiudad', this.region, this.ciudad);
        jQuery('#ciudad').attr('disabled', false);
        this.addValidClass('#ciudad');
      }
      if (this.userInfo.direccion.codigoComuna !== '' && this.userInfo.direccion.codigoComuna !== null) {
        this.comuna = this.userInfo.direccion.codigoComuna;
        this.$store.dispatch('getComuna', this.ciudad, this.comuna);
        jQuery('#comuna').attr('disabled', false);
        this.addValidClass('#comuna');
      }
      if (this.userInfo.direccion.regionGlosa !== '' && this.userInfo.direccion.regionGlosa !== ' Seleccionar ') {
        this.regionGlosa = this.userInfo.direccion.regionGlosa;
      } else {
        const found = this.regiones.find((region) => region.codRegion === `${this.userInfo.direccion.codigoRegion}`);
        this.regionGlosa = found.glsRegion;
      }
      if (this.userInfo.direccion.ciudadGlosa !== '') {
        this.ciudadGlosa = this.userInfo.direccion.ciudadGlosa;
      } else {
        const found = this.ciudades.find((ciudad) => ciudad.codCiudad === `${this.userInfo.direccion.codigoCiudad}`);
        this.ciudadGlosa = found.glsCiudad;
      }
      if (this.userInfo.direccion.comunaGlosa !== '') {
        this.comunaGlosa = this.userInfo.direccion.comunaGlosa;
      } else {
        const found = this.comunas.find((comuna) => comuna.codComuna === `${this.userInfo.direccion.comunaGlosa}`);
        this.comunaGlosa = found.glsComuna;
      }
      if (this.userInfo.contratante.actividadLaboralGlosa !== undefined && this.userInfo.contratante.actividadLaboralGlosa !== '' && this.userInfo.contratante.actividadLaboralGlosa !== ' Seleccionar ') {
        this.actLaboralGlosa = this.userInfo.contratante.actividadLaboralGlosa;
      } else {
        const found = this.actEcon.find((actLab) => actLab.codigo === this.userInfo.contratante.actividadLaboral);
        this.actLaboralGlosa = found.nombre;
      }
      if (this.userInfo.contratante.nacionalidadGlosa !== undefined && this.userInfo.contratante.nacionalidadGlosa !== '' && this.userInfo.contratante.nacionalidadGlosa !== ' Seleccionar ') {
        this.nacionalidadGlosa = this.userInfo.contratante.nacionalidadGlosa;
      } else {
        const found = this.nacionalidades.find((nac) => nac.codigo === this.userInfo.contratante.nacionalidad);
        this.nacionalidadGlosa = found.nombre;
      }

      // juridica
      if (this.userInfo.contratante.nombreLegal !== '' && this.userInfo.contratante.nombreLegal !== null) {
        this.razonSocial = this.userInfo.contratante.nombreLegal;
      }
      if (this.userInfo.contratante.giro !== '' && this.userInfo.contratante.giro !== null) {
        this.giroComercial = this.userInfo.contratante.giro;
      }
      if (this.userInfo.contratante.giroGlosa !== '' && this.userInfo.contratante.giroGlosa !== undefined) {
        this.giroComercialGlosa = this.userInfo.contratante.giroGlosa;
      }
    },
    addValidClass(element) {
      const inputValue = jQuery(element).value;
      if (inputValue !== '') {
        jQuery(element).addClass('is-valid filled');
        jQuery(element).removeClass('is-invalid');
        jQuery(element).parent('.form-group').addClass('focused');
      }
    },
    addGenericValidClass() {
      jQuery('.form-field, .form-select').each((index, item) => {
        if (item.value !== '' && item.value !== 'Seleccionar') {
          jQuery(item).parents('.form-group').addClass('focused');
          jQuery(item).addClass('is-valid filled');
        }
      });
    },
    cleanMandatoFields() {
      this.nombrePagador = '';
      this.apellidosPagador = '';
      this.rutPagador = '';
      this.razonSocialPagador = '';
      this.giroPagador = 'Seleccionar';
      jQuery('.datos-pagador input').each((index, element) => {
        jQuery(element).parents('.form-group').removeClass('focused');
      });
      jQuery('.datos-pagador select, .datos-pagador input').each((index, element) => {
        jQuery(element).removeClass('is-valid');
        jQuery(element).removeClass('is-invalid');
        jQuery(element).next().css('display', 'none');
        jQuery(element).prop('disabled', false);
      });
    },

    cleanPolizaFields() {
      this.fechaFinVigencia = '';
      this.fvigencia = '';
      this.tieneSiniestrosPeriodo = 'Seleccionar';
      this.coberturaDaniosParciales = '';
      this.deducibleActual = '';
      this.file = '';
      this.fileExtension = '';
      this.contentType = '';
      jQuery('#fName').text('');
      jQuery('.poliza-box  .form-group').each((index, element) => {
        jQuery(element).parents('.form-group').removeClass('focused');
        jQuery(element).removeClass('is-valid');
        jQuery(element).removeClass('is-invalid');
        jQuery(element).val('');
        jQuery('.poliza-box .form-group .form-error').css('display', 'none');
      });
      jQuery('.poliza-box select, .poliza-box input').each((index, element) => {
        jQuery(element).removeClass('is-valid');
        jQuery(element).removeClass('is-invalid');
        jQuery(element).prop('disabled', false);
        jQuery(element).val('');
      });
    },
    formatFechaExpiracion(event) {
      let nuevoValor = event.target.value;
      nuevoValor = nuevoValor.charAt(0) === ' ' ? nuevoValor.slice(1) : nuevoValor;
      nuevoValor = nuevoValor === ' ' ? '' : nuevoValor;
      nuevoValor = nuevoValor === '-' ? '' : nuevoValor;
      nuevoValor = nuevoValor.replace(/^([1-9]\/|[2-9])$/g, '0$1/g');
      nuevoValor = nuevoValor.replace(/^(0[1-9]|1[0-2])$/g, '$1/');
      nuevoValor = nuevoValor.replace(/^([0-1])([3-9])$/g, '0$1/$2');
      nuevoValor = nuevoValor.replace(/^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2');
      // eslint-disable-next-line no-useless-escape
      nuevoValor = nuevoValor.replace(/^([0]+)\/|[0]+$/g, '0');
      // eslint-disable-next-line no-useless-escape
      nuevoValor = nuevoValor.replace(/[^\d\/]|^[\/]*$/g, '');
      nuevoValor = nuevoValor.replace(/\/\//g, '/');
      jQuery(event.target).val(nuevoValor);
    },
    validadorFechaExpiracion(event) {
      const cardExpDate = this.fechaExpiracion;
      const cardExpMonth = cardExpDate.split('/')[0];
      const cardExpYear = cardExpDate.split('/')[1];
      const d = new Date();
      const currentYear = d.getFullYear();
      const currentMonth = d.getMonth() + 1;

      let date;
      if (cardExpYear >= currentYear && cardExpMonth >= currentMonth) { // EJ: 08/2025
        date = true;
      } else if (cardExpYear > currentYear && cardExpMonth < currentMonth) { // EJ: 02/2025
        date = true;
      } else if (cardExpYear === currentYear && cardExpMonth >= currentMonth) { // EJ: 07/2021
        date = true;
      } else {
        date = false;
      }

      const len = (cardExpDate.length < 7);

      if (date === false && len === false) {
        jQuery('#fechaExpiracion').removeClass('is-valid');
        jQuery('#fechaExpiracion').addClass('is-invalid');
        jQuery('#fechaExpiracion').next().text('La tarjeta se encuentra vencida');
        jQuery('#fechaExpiracion').next().css('display', 'block');
      } else if (cardExpDate !== '' && len === true) {
        jQuery('#fechaExpiracion').next().text('Formato inválido. El formato debe ser MM/YYYY');
        jQuery('#fechaExpiracion').removeClass('is-valid');
        jQuery('#fechaExpiracion').addClass('is-invalid');
        jQuery('#fechaExpiracion').next().css('display', 'block');
      } else if (cardExpDate === '') {
        jQuery('#fechaExpiracion').next().text('Fecha de expiración no puede estar vacía');
        jQuery('#fechaExpiracion').removeClass('is-valid');
        jQuery('#fechaExpiracion').addClass('is-invalid');
        jQuery('#fechaExpiracion').next().css('display', 'block');
      } else {
        jQuery('#fechaExpiracion').addClass('is-valid');
        jQuery('#fechaExpiracion').removeClass('is-invalid');
        jQuery('#fechaExpiracion').next().css('display', 'none');
        jQuery('#fechaExpiracion').parents('span').next().css('display', 'none');
      }
    },
    getCreditCardType(value) {
      const number = value;
      let re = new RegExp('^4[0-9]{6,}');
      if (number.match(re) != null) {
        this.tipoTarjeta = 'Visa';
      }
      re = new RegExp('^(34|37)');
      if (number.match(re) != null) {
        this.tipoTarjeta = 'Amex';
      }
      re = new RegExp('^5[1-5][0-9]{5,}|222[1-9][0-9]{3,}|22[3-9][0-9]{4,}|2[3-6][0-9]{5,}|27[01][0-9]{4,}|2720[0-9]{3,}');
      if (number.match(re) != null) {
        this.tipoTarjeta = 'Mastercard';
      }
      re = new RegExp('^3[47][0-9]{5,}');
      if (number.match(re) != null) {
        this.tipoTarjeta = 'American Express';
      }
      re = new RegExp('^3(?:0[0-5]|[68][0-9])[0-9]{4,}');
      if (number.match(re) != null) {
        this.tipoTarjeta = 'Diners Club';
      }
      re = new RegExp('^6(?:011|5[0-9]{2})[0-9]{3,}');
      if (number.match(re) != null) {
        this.tipoTarjeta = 'Discover';
      }
      return '';
    },
    digitoMovil(value) {
      const codigoMovil = value[0];
      this.codigoMovil = codigoMovil;
    },
    uploadFactura() {
      const self = this;
      const validFileExtensions = [
        'pdf',
        'png',
        'bmp',
        'jpg',
        'jpeg',
      ];
      const fileMaxSize = 2097152;

      jQuery('#uploadFileFact').click();
      jQuery('#uploadFileFact').change(function () {
        const fileExtension = jQuery(this).val().split('.').pop()
          .toLowerCase();
        const fileSize = this.files[0].size < fileMaxSize;
        const validExtension = jQuery.inArray(fileExtension, validFileExtensions) !== -1;

        if (fileSize === true && validExtension === true) {
          const file = jQuery(this).val().replace(/C:\\fakepath\\/ig, '');
          jQuery('#fNameFact').text(file);
          const fileName = file.split('.')[1];
          jQuery('#fileErrorMsg').text('');
          self.fileExtensionFactura = fileName;
          self.convertToBase64Factura();
        } else {
          jQuery('#fileErrorMsg').text('Para continuar modifique el formato o ajuste el tamaño de este archivo');
          this.value = '';
          jQuery('#fNameFact').text('');
          self.fileFactura = '';
          self.fileExtensionFactura = '';
          self.contentTypeFactura = '';
        }
      });
    },
    convertToBase64Factura() {
      const self = this;
      const selectedFile = document.getElementById('uploadFileFact').files;
      if (selectedFile.length > 0) {
        const fileToLoad = selectedFile[0];
        const fileReader = new FileReader();
        let base64;
        fileReader.onload = function (fileLoadedEvent) {
          base64 = fileLoadedEvent.target.result;
          const extension = base64.split(';')[0].split(':')[1];
          const fileData = base64.split(';')[1];
          self.contentTypeFactura = extension;
          self.fileFactura = fileData;
        };
        fileReader.readAsDataURL(fileToLoad);
      }
    },
    uploadPoliza() {
      const self = this;
      const validFileExtensions = [
        'pdf',
        'png',
        'bmp',
        'jpg',
        'jpeg',
      ];
      const fileMaxSize = 2097152;

      jQuery('#uploadFile').click();
      jQuery('#uploadFile').change(function () {
        const fileExtension = jQuery(this).val().split('.').pop()
          .toLowerCase();
        const fileSize = this.files[0].size < fileMaxSize;
        const validExtension = jQuery.inArray(fileExtension, validFileExtensions) !== -1;

        if (fileSize === true && validExtension === true) {
          const file = jQuery(this).val().replace(/C:\\fakepath\\/ig, '');
          jQuery('#fName').text(file);
          const fileName = file.split('.')[1];
          jQuery('#fileErrorMsg').text('');
          self.fileExtension = fileName;
          self.convertToBase64();
        } else {
          jQuery('#fileErrorMsg').text('Para continuar modifique el formato o ajuste el tamaño de este archivo');
          this.value = '';
          jQuery('#fName').text('');
          self.file = '';
          self.fileExtension = '';
          self.contentType = '';
        }
      });
    },
    convertToBase64() {
      const self = this;
      const selectedFile = document.getElementById('uploadFile').files;
      if (selectedFile.length > 0) {
        const fileToLoad = selectedFile[0];
        const fileReader = new FileReader();
        let base64;
        fileReader.onload = function (fileLoadedEvent) {
          base64 = fileLoadedEvent.target.result;
          const extension = base64.split(';')[0].split(':')[1];
          const fileData = base64.split(';')[1];
          self.contentType = extension;
          self.file = fileData;
        };
        fileReader.readAsDataURL(fileToLoad);
      }
    },
    enableCitySelect() {
      const codCiudad = '';
      if (jQuery('#regiones').val() !== 'Seleccionar') {
        this.ciudad = 'Seleccionar';
        this.comuna = 'Seleccionar';
        jQuery('#ciudad, #comuna').each((index, element) => {
          jQuery(element).removeClass('is-valid');
          jQuery(element).removeClass('is-invalid');
          jQuery(element).next().css('display', 'none');
          jQuery('#ciudad, #comuna').prop('disabled', true);
        });
        this.$store.dispatch('getCiudad', this.region, codCiudad).then(() => {
          this.ciudad = 'Seleccionar';
          this.comuna = 'Seleccionar';
          jQuery('#ciudad').prop('disabled', false);
        });
      } else {
        jQuery('#ciudad').prop('disabled', true);
        this.ciudad = 'Seleccionar';
        this.comuna = 'Seleccionar';
      }
    },
    enableComunaSelect() {
      const codComuna = '';
      if (jQuery('#ciudad').val() !== 'Seleccionar') {
        this.comuna = 'Seleccionar';
        jQuery('#comuna').each((index, element) => {
          jQuery(element).removeClass('is-valid');
          jQuery(element).removeClass('is-invalid');
          jQuery(element).next().css('display', 'none');
          jQuery('#comuna').prop('disabled', true);
        });
        this.$store.dispatch('getComuna', this.ciudad, codComuna).then(() => {
          this.comuna = 'Seleccionar';
          jQuery('#comuna').prop('disabled', false);
        });
      } else {
        jQuery('#comuna').prop('disabled', true);
        this.comuna = 'Seleccionar';
      }
    },
    init() {
      jQuery(() => {
        jQuery('.form-group input, .form-group select, .form-input, .form-select').each((index, element) => {
          const inputValue = jQuery(element).val();
          if (inputValue !== '') {
            jQuery(element).parents('.form-group').addClass('focused');
          }
        });
        jQuery('#numTarjetaCredito').attr('maxLength', '20');
        jQuery('#fechaExpiracion').attr('maxLength', '7');
        jQuery('#celular, #nroFactura').attr('maxLength', '9');

        jQuery('.form-group input, .form-group select').focus(function () {
          jQuery(this).parents('.form-group').addClass('focused');
        });

        jQuery('.form-group input, .form-group select').blur(function () {
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
    validStyle(valid, element) {
      if (valid) {
        jQuery(element).addClass('is-valid');
        jQuery(element).removeClass('is-invalid');
        jQuery(element).next().css('display', 'none');
      } else {
        jQuery(element).removeClass('is-valid');
        jQuery(element).addClass('is-invalid');
        jQuery(element).next().css('display', 'block');
      }
    },
    validadorSelect(event) {
      const valid = event.target.value !== '' && event.target.value !== ' ' && event.target.value !== 'Seleccionar';
      this.validStyle(valid, event.target);
    },
    validadorRut(event) {
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
    validadorEmail(event) {
      const valid = event.target.value !== '' && event.target.value !== ' ' && this.regEmail.test(event.target.value);
      this.validStyle(valid, event.target);
    },
    validadorCelular(event) {
      const valid = event.target.value !== '' && event.target.value !== ' ' && this.regCelular.test(event.target.value);
      // this.validStyle(valid, event.target);

      const vacio = event.target.value !== '' && event.target.value !== ' ';

      if (!vacio) {
        jQuery(event.target).removeClass('is-valid');
        jQuery(event.target).addClass('is-invalid');
        jQuery(event.target).next().text('Celular no puede estar vacio');
        jQuery(event.target).next().css('display', 'block');
      } else if (vacio && !valid) {
        jQuery(event.target).removeClass('is-valid');
        jQuery(event.target).addClass('is-invalid');
        jQuery(event.target).next().text('El formato de celular es incorrecto');
        jQuery(event.target).next().css('display', 'block');
      } else {
        jQuery(event.target).addClass('is-valid');
        jQuery(event.target).removeClass('is-invalid');
        jQuery(event.target).next().css('display', 'none');
      }
    },
    validadorVacio(event) {
      const valid = event.target.value !== '' && event.target.value !== ' ';
      this.validStyle(valid, event.target);
    },
    validadorDeducible(event) {
      const valid = event.target.value !== '' && event.target.value !== ' ' && this.regDeducible.test(event.target.value);
      this.validStyle(valid, event.target);
    },
    validadorVacioDateNacimiento(event) {
      const edad = this.calcularEdad(event.target.value);
      const valid = event.target.value !== '' && event.target.value !== ' ' && this.regDate.test(event.target.value);
      this.validStyleDateNacimiento(valid, event.target, edad);
    },
    validStyleDateNacimiento(valid, element, edad) {
      if (valid && edad >= 18) {
        jQuery(element).addClass('is-valid');
        jQuery(element).removeClass('is-invalid');
        jQuery('.form-group.fechaNacimiento .form-error').css('display', 'none');
      } else {
        jQuery(element).removeClass('is-valid');
        jQuery(element).addClass('is-invalid');
        if (!valid) {
          jQuery('.form-group.fechaNacimiento .form-error').text('Fecha de nacimiento no puede estar vacia');
          jQuery(element).removeClass('is-valid');
          jQuery(element).addClass('is-invalid');
        }
        if (valid && edad < 18) {
          jQuery('.form-group.fechaNacimiento .form-error').text('Cliente debe ser mayor de edad');
          jQuery(element).removeClass('is-valid');
          jQuery(element).addClass('is-invalid');
        }
        jQuery('.form-group.fechaNacimiento .form-error').css('display', 'block');
      }
    },
    calcularEdad(fecha) {
      if (fecha !== null) {
        const hoy = new Date();
        // La descompongo en un array
        const arrayFecha = fecha.split('/');
        // si el array no tiene tres partes, la fecha es incorrecta
        if (arrayFecha.length !== 3) return 0;

        // compruebo que los ano, mes, dia son correctos
        const ano = parseInt(arrayFecha[2], 10);
        if (Number.isNaN(ano)) return 0;

        const mes = parseInt(arrayFecha[1], 10);
        if (Number.isNaN(mes)) return 0;

        const dia = parseInt(arrayFecha[0], 10);
        if (Number.isNaN(dia)) return 0;

        const fechaNacimiento = new Date(ano, mes - 1, dia);

        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();

        if (
          diferenciaMeses < 0
        || (diferenciaMeses === 0 && hoy.getDate() < dia)
        ) {
          edad -= 1;
        }
        return edad;
      }
      return 0;
    },

    validadorVacioDateVigencia(event) {
      const valid = event.target.value !== '' && event.target.value !== ' ' && this.regDate.test(event.target.value);
      this.validStyleDateVigencia(valid, event.target);
    },
    validStyleDateVigencia(valid, element) {
      if (valid) {
        jQuery(element).addClass('is-valid');
        jQuery(element).removeClass('is-invalid');
        jQuery('.form-group.fechaFinVigencia .form-error').css('display', 'none');
      } else {
        jQuery(element).removeClass('is-valid');
        jQuery(element).addClass('is-invalid');
        jQuery('.form-group.fechaFinVigencia .form-error').css('display', 'block');
      }
    },

    validadorVacioDateFactura(event) {
      const valid = event.target.value !== '' && event.target.value !== ' ' && this.regDate.test(event.target.value);
      this.validStyleDateFactura(valid, event.target);
    },
    validStyleDateFactura(valid, element) {
      if (valid) {
        jQuery(element).addClass('is-valid');
        jQuery(element).removeClass('is-invalid');
        jQuery('.form-group.fechaEmisionFactura .form-error').css('display', 'none');
      } else {
        jQuery(element).removeClass('is-valid');
        jQuery(element).addClass('is-invalid');
        jQuery('.form-group.fechaEmisionFactura .form-error').css('display', 'block');
      }
    },

    clearInput(event) {
      let nuevoValor = event.target.value;
      nuevoValor = nuevoValor.charAt(0) === ' ' ? nuevoValor.slice(1) : nuevoValor;
      nuevoValor = nuevoValor === ' ' ? '' : nuevoValor;
      nuevoValor = nuevoValor === '-' ? '' : nuevoValor;
      nuevoValor = nuevoValor.replace(/\s\s+/g, '');
      nuevoValor = nuevoValor.replace(/--+/g, '-');
      nuevoValor = nuevoValor.replace(/\s-+/g, '');
      nuevoValor = nuevoValor.replace(/-\s+/g, '  ');
      nuevoValor = nuevoValor.replace(/—/g, '-');
      jQuery(event.target).val(nuevoValor);
    },
    clearInputDate(event) {
      let nuevoValor = event.target.value;
      nuevoValor = nuevoValor.charAt(0) === ' ' ? nuevoValor.slice(1) : nuevoValor;
      nuevoValor = nuevoValor === ' ' ? '' : nuevoValor;
      nuevoValor = nuevoValor === '-' ? '' : nuevoValor;
      nuevoValor = nuevoValor.replace(/[^\d /].*$/, '');
      nuevoValor = nuevoValor.replace(/\s\s+/g, '');
      nuevoValor = nuevoValor.replace(/--+/g, '-');
      nuevoValor = nuevoValor.replace(/\s-+/g, '');
      nuevoValor = nuevoValor.replace(/-\s+/g, '  ');
      nuevoValor = nuevoValor.replace(/—/g, '-');
      jQuery(event.target).val(nuevoValor);
    },
    clearInputAplha(event) {
      let nuevoValor = event.target.value;
      nuevoValor = nuevoValor.charAt(0) === ' ' ? nuevoValor.slice(1) : nuevoValor;
      nuevoValor = nuevoValor === ' ' ? '' : nuevoValor;
      nuevoValor = nuevoValor === '-' ? '' : nuevoValor;
      nuevoValor = nuevoValor.replace(/[^a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-].*$/, '');
      nuevoValor = nuevoValor.replace(/\s\s+/g, '');
      nuevoValor = nuevoValor.replace(/--+/g, '-');
      nuevoValor = nuevoValor.replace(/\s-+/g, '');
      nuevoValor = nuevoValor.replace(/-\s+/g, '  ');
      nuevoValor = nuevoValor.replace(/—/g, '-');
      jQuery(event.target).val(nuevoValor);
    },
    clearInputCorreo(event) {
      let nuevoValor = event.target.value;
      nuevoValor = nuevoValor.charAt(0) === ' ' ? nuevoValor.slice(1) : nuevoValor;
      nuevoValor = nuevoValor === ' ' ? '' : nuevoValor;
      nuevoValor = nuevoValor === '-' ? '' : nuevoValor;
      nuevoValor = nuevoValor.replace(/[^a-z0-9A-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð .-_@].*$/, '');
      nuevoValor = nuevoValor.replace(/\s\s+/g, '');
      nuevoValor = nuevoValor.replace(/--+/g, '-');
      nuevoValor = nuevoValor.replace(/\s-+/g, '');
      nuevoValor = nuevoValor.replace(/-\s+/g, '  ');
      nuevoValor = nuevoValor.replace(/—/g, '-');
      jQuery(event.target).val(nuevoValor);
    },
    clearRZInput(event) {
      let nuevoValor = event.target.value;
      nuevoValor = nuevoValor.charAt(0) === ' ' ? nuevoValor.slice(1) : nuevoValor;
      nuevoValor = nuevoValor === ' ' ? '' : nuevoValor;
      nuevoValor = nuevoValor === '-' ? '' : nuevoValor;
      nuevoValor = nuevoValor.replace(/[^a-z0-9A-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-].*$/, '');
      nuevoValor = nuevoValor.replace(/\s\s+/g, '');
      nuevoValor = nuevoValor.replace(/--+/g, '-');
      nuevoValor = nuevoValor.replace(/\s-+/g, '');
      nuevoValor = nuevoValor.replace(/-\s+/g, '  ');
      nuevoValor = nuevoValor.replace(/â€”/g, '-');
      jQuery(event.target).val(nuevoValor);
    },
    clearAlphaNumeric(event) {
      let nuevoValor = event.target.value;
      nuevoValor = nuevoValor.charAt(0) === ' ' ? nuevoValor.slice(1) : nuevoValor;
      nuevoValor = nuevoValor === ' ' ? '' : nuevoValor;
      nuevoValor = nuevoValor === '-' ? '' : nuevoValor;
      nuevoValor = nuevoValor.replace(/[^A-Za-z0-9].*$/, '');
      nuevoValor = nuevoValor.replace(/\s\s+/g, '');
      nuevoValor = nuevoValor.replace(/--+/g, '-');
      nuevoValor = nuevoValor.replace(/\s-+/g, '');
      nuevoValor = nuevoValor.replace(/-\s+/g, '  ');
      nuevoValor = nuevoValor.replace(/—/g, '-');
      jQuery(event.target).val(nuevoValor);
    },
    clearNumeric(event) {
      let nuevoValor = event.target.value;
      nuevoValor = nuevoValor.charAt(0) === ' ' ? nuevoValor.slice(1) : nuevoValor;
      nuevoValor = nuevoValor === ' ' ? '' : nuevoValor;
      nuevoValor = nuevoValor === '-' ? '' : nuevoValor;
      nuevoValor = nuevoValor.replace(/[^0-9].*$/, '');
      nuevoValor = nuevoValor.replace(/\s\s+/g, '');
      nuevoValor = nuevoValor.replace(/--+/g, '-');
      nuevoValor = nuevoValor.replace(/\s-+/g, '');
      nuevoValor = nuevoValor.replace(/-\s+/g, '  ');
      nuevoValor = nuevoValor.replace(/—/g, '-');
      jQuery(event.target).val(nuevoValor);
    },
    formatDate(date) {
      const d = new Date(date);
      let month = `${d.getMonth() + 1}`;
      let day = `${d.getDate()}`;
      const year = d.getFullYear();

      if (month.length < 2) month = `0${month}`;
      if (day.length < 2) day = `0${day}`;

      return [
        day,
        month,
        year,
      ].join('/');
    },
    styleDate(date) {
      if (date !== null) {
        let month = `${date.getMonth() + 1}`;
        let day = `${date.getDate()}`;
        const year = date.getFullYear();

        if (month.length < 2) { month = `0${month}`; }
        if (day.length < 2) { day = `0${day}`; }

        const date2 = [
          day,
          month,
          year,
        ].join('/');
        jQuery('#fechaNacimiento').attr('value', date2);
        jQuery('#fechaNacimiento').parents('.form-group').addClass('focused');
        jQuery('#fechaNacimiento').addClass('filled');
        jQuery('.noFocus').addClass('focused');
        jQuery('#fechaNacimiento').addClass('is-valid');
        jQuery('#fechaNacimiento').removeClass('is-invalid');
      } else {
        jQuery('#fechaNacimiento').attr('value', '');
        jQuery('#fechaNacimiento').removeClass('filled');
        jQuery('#fechaNacimiento').parents('.form-group').removeClass('focused');
        jQuery('.noFocus').addClass('focused');
        jQuery('#fechaNacimiento').addClass('is-invalid');
        jQuery('#fechaNacimiento').removeClass('is-valid');
      }
    },

    updateUserInfo() {
      this.$store.dispatch('updateInfo', {
        isPersonaJuridica: this.isPersonaJuridica,
        hasPolizas: this.hasPolizas,
        polizaAdjunta: this.polizaAdjunta,
        sameAsOwner: this.sameAsOwner,
        autoRegistrado: this.autoRegistrado,
        rut: this.rut,
        nombres: this.nombres,
        apellidos: this.apellidos,
        razonSocial: this.razonSocial,
        giroComercial: this.giroComercial,
        giroComercialGlosa: this.giroComercialGlosa,
        rutPagador: this.rutPagador,
        nombrePagador: this.nombrePagador,
        apellidosPagador: this.apellidosPagador,
        razonSocialPagador: this.razonSocialPagador,
        giroPagador: this.giroPagador,
        giroPagadorGlosa: this.giroPagadorGlosa,
        tieneSiniestrosPeriodo: this.tieneSiniestrosPeriodo,
        nrofactura: this.nrofactura,
        fechaEmisionFactura: this.fechaEmisionFactura,
        rutEmisorFactura: this.rutEmisorFactura,
        fechaFinVigencia: this.fechaFinVigencia,
        nombreBanco: this.nombreBanco,
        codigoBanco: this.codigoBanco,
        tipoCuenta: this.tipoCuenta,
        nombreCuenta: this.nombreCuenta,
        numeroCuenta: this.numeroCuenta,
        diaPago: this.diaPago,
        numeroTarjeta: this.numeroTarjeta,
        tipoTarjeta: this.tipoTarjeta,
        fechaExpiracion: this.fechaExpiracion,
        deducibleActual: this.deducibleActual,
        file: this.file,
        contentType: this.contentType,
        fileExtension: this.fileExtension,
        fileExtensionFactura: this.fileExtensionFactura,
        fileFactura: this.fileFactura,
        contentTypeFactura: this.contentTypeFactura,
        coberturaDaniosParciales: this.coberturaDaniosParciales,
        fechaNacimiento: this.fechaNacimiento,
        nacionalidad: this.nacionalidad,
        nacionalidadGlosa: this.nacionalidadGlosa,
        correoElectronico: this.correoElectronico,
        codigoMovil: this.codigoMovil,
        celular: this.celular,
        actividadLaboral: this.actividadLaboral,
        actLaboralGlosa: this.actLaboralGlosa,
        region: this.region,
        ciudad: this.ciudad,
        comuna: this.comuna,
        regionGlosa: this.regionGlosa,
        ciudadGlosa: this.ciudadGlosa,
        comunaGlosa: this.comunaGlosa,
        direccion: this.direccion,
        numeroCalle: this.numeroCalle,
        departamento: this.departamento,
        piso: this.piso,
        tipoVivienda: this.tipoVivienda,
        numeroSimulacion: this.numeroSimulacion,
        motor: this.motor,
        chasis: this.chasis,
      });
    },
    checkform() {
      const rutPagadorValid = rutUtilities.validate(this.rutPagador);
      const nombrePagadorValid = this.nombrePagador !== null && this.nombrePagador !== '' && this.nombrePagador !== ' ';
      const apellidosPagadorValid = this.apellidosPagador !== null && this.apellidosPagador !== '' && this.apellidosPagador !== ' ';
      const razonSocialPagadorValid = this.razonSocialPagador !== null && this.razonSocialPagador !== '' && this.razonSocialPagador !== ' ';
      const giroPagadorValid = this.giroPagador !== null && this.giroPagador !== '' && this.giroPagador !== ' ' && this.giroPagador !== 'Seleccionar';

      const codigoBancoValid = this.codigoBanco !== null && this.codigoBanco !== '' && this.codigoBanco !== ' ' && this.codigoBanco !== 'Seleccionar';
      const diaPagoValid = this.diaPago !== null && this.diaPago !== '' && this.diaPago !== ' ' && this.diaPago !== 'Seleccionar';
      const numeroTarjetaValid = this.numeroTarjeta !== null && this.numeroTarjeta !== '' && this.numeroTarjeta !== ' ';
      const fechaExpiracionValid = this.fechaExpiracion !== null && this.fechaExpiracion !== '' && this.fechaExpiracion !== ' ' && jQuery('#fechaExpiracion').hasClass('is-valid');
      const tipoCuentaValid = this.tipoCuenta !== null && this.tipoCuenta !== '' && this.tipoCuenta !== ' ' && this.tipoCuenta !== 'Seleccionar';
      const numeroCuentaValid = this.numeroCuenta !== null && this.numeroCuenta !== '' && this.numeroCuenta !== ' ';

      const nrofacturaValid = this.nrofactura !== null && this.nrofactura !== '' && this.nrofactura !== ' ';
      const rutEmisorFacturaValid = rutUtilities.validate(this.rutEmisorFactura);
      const fechaEmisionFacturaValid = this.fechaEmisionFactura !== null && this.fechaEmisionFactura !== '' && this.fechaEmisionFactura !== ' ' && this.regDate.test(this.fechaEmisionFactura);
      const fileFacturaValid = this.fileFactura !== null && this.fileFactura !== '' && this.fileFactura !== ' ' && this.fileFactura !== undefined;

      const fechaFinVigenciaValid = this.fechaFinVigencia !== null && this.fechaFinVigencia !== '' && this.fechaFinVigencia !== ' ' && this.regDate.test(this.fechaFinVigencia);
      const siniestrosPeriodoValid = this.tieneSiniestrosPeriodo !== null && this.tieneSiniestrosPeriodo !== '' && this.tieneSiniestrosPeriodo !== ' ' && this.tieneSiniestrosPeriodo !== 'Seleccionar';
      const coberturaDaniosValid = this.coberturaDaniosParciales !== null && this.coberturaDaniosParciales !== '' && this.coberturaDaniosParciales !== ' ';
      const deducibleValid = this.deducibleActual !== null && this.deducibleActual !== '' && this.deducibleActual !== ' ';
      const fileValid = this.file !== null && this.file !== '' && this.file !== ' ' && this.file !== undefined;

      const marcaValid = this.marca !== null && this.marca !== '' && this.marca !== ' ';
      const modeloValid = this.modelo !== null && this.modelo !== '' && this.modelo !== ' ' && this.modelo !== 'Seleccionar';
      const anioValid = this.agnoVehiculo !== null && this.agnoVehiculo !== '' && this.agnoVehiculo !== ' ' && this.agnoVehiculo !== 'Seleccionar';
      const motorValid = this.motor !== null && this.motor !== '' && this.motor !== ' ';
      const chasisValid = this.chasis !== null && this.chasis !== '' && this.chasis !== ' ';

      const edad = this.calcularEdad(this.fechaNacimiento);
      const rutValid = rutUtilities.validate(this.rut);
      const nombresValid = this.nombres !== '' && this.nombres !== ' ';
      const apellidosValid = this.apellidos !== '' && this.apellidos !== ' ';
      const fNacimientoValid = this.fechaNacimiento !== null && this.fechaNacimiento !== '' && this.fechaNacimiento !== ' ' && this.regDate.test(this.fechaNacimiento) && edad >= 18;
      const correoValid = this.correoElectronico !== null && this.correoElectronico !== '' && this.correoElectronico !== ' ' && this.regEmail.test(this.correoElectronico);
      const celularValid = this.celular !== null && this.celular !== '' && this.celular !== ' ' && this.regCelular.test(this.celular);
      const nacionalidadValid = this.nacionalidad !== null && this.nacionalidad !== '' && this.nacionalidad !== ' ' && this.nacionalidad !== 'Seleccionar';
      const actividadLaboralValid = this.actividadLaboral !== null && this.actividadLaboral !== '' && this.actividadLaboral !== ' ' && this.actividadLaboral !== 'Seleccionar';
      const regionValid = this.region !== null && this.region !== '' && this.region !== ' ' && this.region !== 'Seleccionar';
      const ciudadValid = this.ciudad !== null && this.ciudad !== '' && this.ciudad !== ' ' && this.ciudad !== 'Seleccionar';
      const comunaValid = this.comuna !== null && this.comuna !== '' && this.comuna !== ' ' && this.comuna !== 'Seleccionar';
      const direccionValid = this.direccion !== null && this.direccion !== '' && this.direccion !== ' ';
      const numeroCalleValid = this.numeroCalle !== null && this.numeroCalle !== '' && this.numeroCalle !== ' ';
      const razonSocialValid = this.razonSocial !== null && this.razonSocial !== '' && this.razonSocial !== ' ';
      const giroValid = this.giroComercial !== null && this.giroComercial !== '' && this.giroComercial !== ' ' && this.giroComercial !== 'Seleccionar';

      const fechaPepValid = this.fechaClientePep !== null && this.fechaClientePep !== '' && this.fechaClientePep !== ' ' && this.regDate.test(this.fechaClientePep);
      const nombrePepValid = this.nombreClientePep !== null && this.nombreClientePep !== '' && this.nombreClientePep !== ' ';
      const rutPepValid = rutUtilities.validate(this.rutClientePep);

      let sectionPagador = false;
      if (!this.sameAsOwner) {
        if (this.isPersonaJuridica) {
          if (rutPagadorValid && razonSocialPagadorValid && giroPagadorValid) {
            sectionPagador = true;
          }
        } else if (rutPagadorValid && nombrePagadorValid && apellidosPagadorValid) {
          sectionPagador = true;
        }
      } else {
        sectionPagador = true;
      }

      let sectionMandatos = false;
      if (this.medioPagoGlosa === 'PAT') {
        if (codigoBancoValid && diaPagoValid && numeroTarjetaValid && fechaExpiracionValid) {
          sectionMandatos = true;
        }
      } else if (this.medioPagoGlosa === 'PAC') {
        if (codigoBancoValid && diaPagoValid && tipoCuentaValid && numeroCuentaValid) {
          sectionMandatos = true;
        }
      } else if (this.medioPagoGlosa === 'Contado') {
        sectionMandatos = true;
      }

      let sectionFactura = false;
      if (this.tipoAntiguedad === 1 && this.userInfo.plan.codigoPlan !== '3') {
        if (nrofacturaValid && rutEmisorFacturaValid && fechaEmisionFacturaValid && fileFacturaValid) {
          sectionFactura = true;
        }
      } else {
        sectionFactura = true;
      }

      let sectionPoliza = false;
      if (this.tipoAntiguedad === 2) {
        if (this.hasPolizas === '1' || this.hasPolizas === true) {
          if (fechaFinVigenciaValid && siniestrosPeriodoValid && coberturaDaniosValid && deducibleValid && fileValid) {
            sectionPoliza = true;
          }
        } else if (this.hasPolizas === '0') {
          sectionPoliza = true;
        }
      } else {
        sectionPoliza = true;
      }

      // Vehículo
      let sectionVehiculo = false;
      if (this.tipoAntiguedad === 1) {
        if (marcaValid && modeloValid && anioValid && motorValid && chasisValid) {
          sectionVehiculo = true;
        }
      } else if (this.tipoAntiguedad === 2 && motorValid && chasisValid) {
        sectionVehiculo = true;
      }

      // Datos contratante
      let sectionDatos = false;
      if (this.tipoPersona === '1' || this.tipoPersona === 1) {
        if (rutValid && nombresValid && apellidosValid && fNacimientoValid && nacionalidadValid && actividadLaboralValid
        && correoValid && celularValid && regionValid && ciudadValid && comunaValid && direccionValid && numeroCalleValid) {
          sectionDatos = true;
        }
      } else if (this.tipoPersona === '2' || this.tipoPersona === 2) {
        if (razonSocialValid && giroValid && correoValid && celularValid && regionValid && ciudadValid && comunaValid && direccionValid && numeroCalleValid) {
          sectionDatos = true;
        }
      }

      // pep
      let sectionPEP = false;
      if (fechaPepValid && nombrePepValid && rutPepValid) {
        sectionPEP = true;
      }

      if (this.isPep) {
        const arrayForm = [
          sectionPagador,
          sectionMandatos,
          sectionFactura,
          sectionPoliza,
          sectionVehiculo,
          sectionDatos,
          sectionPEP,
        ];
        // this.test = [];
        // this.test.push(`Con pep arrayForm: ${arrayForm}`);

        const reduceArrayForm = arrayForm.reduce((a, b) => a && b === true);
        if (reduceArrayForm === true) {
          this.formValid = false;
          jQuery('.validation-layer').hide();
        } else {
          this.formValid = true;
          jQuery('.validation-layer').show();
        }
      } else {
        const arrayForm = [
          sectionPagador,
          sectionMandatos,
          sectionFactura,
          sectionPoliza,
          sectionVehiculo,
          sectionDatos,
        ];
        // this.test = [];
        // this.test.push(`Sin pep arrayForm: ${arrayForm}`);

        const reduceArrayForm = arrayForm.reduce((a, b) => a && b === true);
        if (reduceArrayForm === true) {
          this.formValid = false;
          jQuery('.validation-layer').hide();
        } else {
          this.formValid = true;
          jQuery('.validation-layer').show();
        }
      }
    },
    async onSubmit() {
      this.updateUserInfo();
      if (this.userInfo.plan.codigoPlan !== '3') {
        if (this.tipoAntiguedad === 1) {
          const data = {
            rutCliente: this.rut.split('.').join(''),
            extension: this.fileExtensionFactura,
            idCotizacion: this.ids,
            numeroFactura: this.nrofactura,
            documento: this.fileFactura.split(',')[1],
          };
          this.$store.dispatch('saveFactura', data).then((response) => {
            if (response.status === 200 && this.factura !== '') {
              this.updateSimulacion();
              this.$store.commit('updateCurrentView', 'confirmacion');
              this.$store.commit('setLoading', false);
            }
          });
        } else if (this.tipoAntiguedad === 2) {
          if (this.hasPolizas === '1') {
            const data = {
              rutCliente: this.rut.split('.').join(''),
              extension: this.fileExtension,
              idCotizacion: this.ids,
              numeroFactura: '',
              documento: this.file.split(',')[1],
            };
            this.$store.dispatch('saveConCob', data).then((response) => {
              if (response.status === 200 && this.conCob !== null) {
                this.updateSimulacion();
                this.$store.commit('updateCurrentView', 'confirmacion');
                this.$store.commit('setLoading', false);
              }
            });
          } else {
            this.updateSimulacion();
            this.$store.commit('updateCurrentView', 'confirmacion');
          }
        }
      } else {
        this.updateSimulacion();
        this.$store.commit('updateCurrentView', 'confirmacion');
      }
    },
    formatDateIso(fecha) {
      const date = new Date(fecha);
      let month = `${date.getMonth() + 1}`;
      let day = `${date.getDate()}`;
      const year = date.getFullYear();
      if (month.length < 2) { month = `0${month}`; }
      if (day.length < 2) { day = `0${day}`; }

      const date2 = [
        day,
        month,
        year,
      ].join('/');
      return date2;
    },
    updateSimulacion() {
      const esPep = (this.isPep) ? 1 : 0;

      const nextDate = new Date();
      nextDate.setYear(nextDate.getFullYear() + 1);

      const data = {
        corredor: this.busquedaCNS ? `${this.simulacion.rut_corredor}-${this.simulacion.dv_corredor}` : null,
        idSimulacion: this.ids,
        flujo: 'datos-personales',
        usoVehiculo: this.userInfo.vehiculo.tipoUso,
        estadoAgrupacion: '1',
        codigopropuesta: null,
        contratante: {
          tipoPersona: this.tipoPersona,
          rut: this.rut,
          giro: (this.tipoPersona === '2' ? this.giroComercial : ''),
          giroGlosa: (this.tipoPersona === '2' ? this.giroComercialGlosa : ''),
          nombreLegal: (this.tipoPersona === '2' ? this.razonSocial : ''),
          nombres: this.nombres,
          apellidoPaterno: (this.apellidos !== '' ? this.apellidos.split(' ')[0] : ''),
          apellidoMaterno: (this.apellidos !== '' ? this.apellidos.split(' ')[1] : ''),
          fechaNacimiento: this.fechaNacimiento,
          email: this.correoElectronico,
          nacionalidad: (this.tipoPersona === '1' ? this.nacionalidad : 999),
          nacionalidadGlosa: (this.tipoPersona === '1' ? this.nacionalidadGlosa : ''),
          sexo: 2,
          estadoCivil: 5,
          actividadLaboral: (this.tipoPersona === '1' ? this.actividadLaboral : 400),
          actividadLaboralGlosa: (this.tipoPersona === '1' ? this.actLaboralGlosa : ''),
          solicitaFactura: 0,
        },
        plan: {
          medioPagoGlosa: this.medioPagoGlosa,
          medioPagoCod: this.userInfo.plan.medioPagoCod,
          nunCuotas: this.userInfo.plan.nunCuotas,
          descuento: this.userInfo.plan.descuento,
        },
        PEP: {
          esPEP: esPep,
          rut: this.rutClientePep,
          descripcion: this.nombreClientePep,
          desde: (this.fechaClientePep !== '' ? this.fechaClientePep : '11/11/2020'),
        },
        informacionContacto: {
          codigoMovil: parseInt(this.codigoMovil, 10),
          telefonoMovil: parseInt(this.celular.substring(this.celular.length - 8, this.celular.length), 10),
          codigoArea: 2,
          telefonoFijo: 22222222,
          correoElectronico: this.correoElectronico,
        },
        direccion: {
          codigoRegion: parseInt(this.region, 10),
          regionGlosa: this.regionGlosa,
          codigoCiudad: parseInt(this.ciudad, 10),
          ciudadGlosa: this.ciudadGlosa,
          codigoComuna: parseInt(this.comuna, 10),
          comunaGlosa: this.comunaGlosa,
          nombreCalle: this.direccion,
          numeroCalle: parseInt(this.numeroCalle, 10),
          tipoVivienda: this.tipoVivienda,
          casa: '',
          departamento: this.departamento,
          piso: (this.piso !== '' ? parseInt(this.piso, 10) : parseInt(0, 10)),
          villaPoblacion: '',
        },
        pagador: {
          mismoPagador: this.sameAsOwner,
          isPersonaJuridica: this.isPersonaJuridica,
          rut: this.rutPagador,
          nombres: (this.isPersonaJuridica ? this.razonSocialPagador : this.nombrePagador),
          apellidoPaterno: (this.isPersonaJuridica ? '' : this.apellidosPagador.split(' ')[0]),
          apellidoMaterno: (this.isPersonaJuridica ? '' : this.apellidosPagador.split(' ')[1]),
          giro: (this.isPersonaJuridica ? parseInt(this.giroPagador, 10) : 0),
          giroPagadorGlosa: (this.isPersonaJuridica ? this.giroPagadorGlosa : ''),
        },
        vehiculo: {
          tipoAntiguedad: this.tipoAntiguedad,
          autoRegistrado: this.autoRegistrado,
          motor: this.motor,
          chasis: this.chasis,
          color: this.userInfo.vehiculo.color,
          anio: this.agnoVehiculo,
          codigoMarca: this.userInfo.vehiculo.codigoMarca,
          glosaMarca: this.userInfo.vehiculo.glosaMarca,
          glosaModelo: this.userInfo.vehiculo.glosaModelo,
          codigoModelo: this.userInfo.vehiculo.codigoModelo,
          patente: this.userInfo.vehiculo.patente,
          tipoUso: this.userInfo.vehiculo.tipoUso,
        },
        facturacion: { // si tipoAntiguedad es 1.
          rutEmisorFactura: this.rutEmisorFactura, // Obligatorio
          numeroFactura: this.nrofactura, // Obligatorio. NUMBER(10)
          fechaEmisionFactura: (this.tipoAntiguedad === 1 ? this.fechaEmisionFactura : '11/11/2011'),
          facturaAdjunta: (this.tipoAntiguedad === 1 ? 1 : 0),
          archivoFactura: this.fileFactura,
          archivoFacturaContentType: this.contentTypeFactura,
          archivoFacturaExtension: this.fileExtensionFactura,

        },
        continuidadCobertura: {
          tieneContinuidad: parseInt(this.hasPolizas, 10),
          fechaFinVigencia: (this.hasPolizas === '1' ? this.fechaFinVigencia : '11/11/2020'),
          tieneSiniestrosPeriodo: (this.hasPolizas === '1' ? parseInt(this.tieneSiniestrosPeriodo, 10) : 0),
          coberturaDaniosParciales: (this.hasPolizas === '1' ? this.coberturaDaniosParciales : null),
          deducibleUfContratado: (this.hasPolizas === '1' ? parseInt(this.deducibleActual, 10) : 0),
          polizaAdjunta: (this.hasPolizas === '1' ? 1 : 0),
          archivoConCob: this.file,
          archivoConCobContentType: this.contentType.split('/').pop(),
          archivoConCobExtension: this.fileExtension.split('/').pop(),
        },
        formaPago: {
          diaPago: parseInt(this.diaPago, 10),
          viaPago: parseInt(this.userInfo.plan.medioPagoCod, 10),
          codigoBanco: parseInt(this.codigoBanco, 10),
          tipoCuenta: parseInt(1, 10),
        },
        inspeccion: {
          nombreContacto: (this.tipoPersona === '2' ? this.razonSocial : this.nombres),
          fechaInspeccion: this.formatDate(new Date()),
          observacion: 'Ninguna',
        },

      };

      this.$store.dispatch('updateSimulacion', data).then((response) => {
        if (response.status === 200) {
          this.$store.dispatch('updateSimulacionExtendida', data);
        }
      });
    },
  },
};
</script>
