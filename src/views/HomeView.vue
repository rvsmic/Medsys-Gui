<template>
  <LoaderCover v-if="loading" />
  <div v-else class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    <h1 class="big-title">Witaj, {{ name }}!</h1>
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h2 class="sub-title">Skróty</h2>
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div class="ml-8 grid grid-cols-4 gap-y-12">
          <RouterLink to="/wizyty" @click="emitShortcut" class="shortcut-button" v-if="role == 2 || role == 3|| role == 4">
            <div class="shortcut-icon">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 32 32"
                xml:space="preserve"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    id="doctor-patient_1_"
                    d="M31.36,30h-0.72v-9c0-3.358-2.151-6.289-5.354-7.292c-0.138-0.043-0.236-0.165-0.251-0.308 c-0.014-0.144,0.059-0.282,0.185-0.351c1.492-0.82,2.42-2.372,2.42-4.049c0-2.559-2.081-4.64-4.64-4.64S18.36,6.441,18.36,9 c0,1.677,0.928,3.229,2.421,4.049c0.126,0.069,0.198,0.208,0.185,0.351c-0.015,0.144-0.113,0.265-0.251,0.308 C17.512,14.711,15.36,17.642,15.36,21v9h-0.72v-9c0-1.389,0.336-2.711,0.944-3.877c-0.567-0.963-1.326-1.778-2.224-2.401V17 c0,2.283-1.764,4.162-4,4.346v2.329c0.854,0.168,1.5,0.923,1.5,1.825c0,1.025-0.834,1.86-1.86,1.86s-1.86-0.835-1.86-1.86 c0-0.902,0.646-1.657,1.5-1.825v-2.329c-2.236-0.184-4-2.062-4-4.346v-2.281C2.617,16.116,1.36,18.433,1.36,21v9H0.64v-9 c0-3.426,2.045-6.444,5.161-7.727C4.453,12.269,3.64,10.69,3.64,9c0-2.055,1.173-3.921,3.007-4.817C6.643,4.123,6.64,4.062,6.64,4 c0-1.301,1.059-2.36,2.36-2.36S11.36,2.699,11.36,4c0,0.062-0.002,0.123-0.007,0.183C13.187,5.079,14.36,6.945,14.36,9 c0,1.69-0.812,3.269-2.162,4.274c1.555,0.642,2.872,1.732,3.797,3.146c0.903-1.383,2.215-2.491,3.807-3.146 C18.452,12.269,17.64,10.69,17.64,9c0-2.956,2.405-5.36,5.36-5.36S28.36,6.044,28.36,9c0,1.69-0.812,3.269-2.162,4.273 c3.116,1.283,5.162,4.302,5.162,7.727V30z M9,24.36c-0.628,0-1.14,0.511-1.14,1.14S8.372,26.64,9,26.64s1.14-0.511,1.14-1.14 S9.628,24.36,9,24.36z M5.36,14.278V17c0,2.007,1.633,3.64,3.64,3.64s3.64-1.633,3.64-3.64v-2.72 c-0.429-0.231-0.882-0.423-1.355-0.571c-0.138-0.043-0.236-0.165-0.251-0.308c-0.014-0.144,0.059-0.282,0.185-0.351 c1.493-0.821,2.421-2.373,2.421-4.05c0-1.725-0.955-3.296-2.459-4.097C10.825,5.757,9.982,6.36,9,6.36S7.175,5.757,6.819,4.903 C5.314,5.704,4.36,7.275,4.36,9c0,1.677,0.928,3.229,2.421,4.049c0.126,0.069,0.199,0.208,0.185,0.351 c-0.015,0.144-0.113,0.265-0.251,0.308C6.239,13.857,5.786,14.049,5.36,14.278z M9,2.36C8.096,2.36,7.36,3.096,7.36,4 S8.096,5.64,9,5.64S10.64,4.904,10.64,4S9.904,2.36,9,2.36z M23,25.36c-0.092,0-0.185-0.035-0.255-0.105l-2.973-2.973 c-0.4-0.401-0.622-0.934-0.625-1.499c-0.002-0.572,0.22-1.111,0.625-1.518c0.402-0.402,0.937-0.624,1.505-0.626 c0.002,0,0.003,0,0.005,0c0.569,0,1.105,0.223,1.509,0.625L23,19.475l0.209-0.21c0.807-0.803,2.212-0.805,3.019,0 c0.413,0.414,0.635,0.963,0.624,1.548c-0.01,0.555-0.231,1.077-0.624,1.47l-2.973,2.973C23.185,25.325,23.092,25.36,23,25.36z M21.282,19.36c-0.001,0-0.002,0-0.003,0c-0.377,0-0.731,0.147-0.997,0.414c-0.269,0.269-0.416,0.626-0.414,1.005 c0.001,0.375,0.148,0.729,0.414,0.993L23,24.491l2.718-2.719c0.261-0.26,0.407-0.605,0.413-0.973 c0.008-0.388-0.139-0.752-0.413-1.025c-0.534-0.536-1.467-0.535-1.999,0l-0.464,0.464c-0.141,0.141-0.369,0.141-0.51,0l-0.464-0.464 C22.015,19.507,21.659,19.36,21.282,19.36z"
                  ></path>
                  <rect
                    id="_Transparent_Rectangle"
                    style="fill: none"
                    width="32"
                    height="32"
                  ></rect>
                </g>
              </svg>
            </div>
            Zarejestruj wizytę
          </RouterLink>

          <RouterLink to="/testy" @click="emitShortcut"  class="shortcut-button" v-if="role == 2 || role == 4">
            <div class="shortcut-icon">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 32 32"
                xml:space="preserve"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    id="erlenmeyer--flask_1_"
                    d="M28.099,27.925l-4.708-8.094c-0.005-0.008-0.009-0.016-0.015-0.023l-4.016-6.905V1.36H21 c0.199,0,0.36-0.161,0.36-0.36S21.199,0.64,21,0.64H11c-0.199,0-0.36,0.161-0.36,0.36S10.801,1.36,11,1.36h1.64v11.543l-4.015,6.902 c-0.006,0.01-0.012,0.02-0.018,0.029l-4.717,8.11c-0.369,0.737-0.33,1.596,0.103,2.296c0.433,0.701,1.184,1.12,2.008,1.12h19.998 c0.823,0,1.574-0.419,2.007-1.119C28.439,29.54,28.478,28.682,28.099,27.925z M13.311,13.181c0.032-0.055,0.049-0.118,0.049-0.181 v-2.64H16V9.64h-2.64V7.36H16V6.64h-2.64V4.36H16V3.64h-2.64V1.36h5.28V13c0,0.063,0.018,0.126,0.049,0.181l3.758,6.458H9.554 L13.311,13.181z M27.394,29.862c-0.301,0.487-0.822,0.777-1.395,0.777H6.001c-0.573,0-1.094-0.29-1.396-0.777 c-0.301-0.487-0.328-1.084-0.083-1.576l4.611-7.926h13.73l4.6,7.906C27.722,28.778,27.694,29.375,27.394,29.862z"
                  ></path>
                  <rect
                    id="_Transparent_Rectangle"
                    style="fill: none"
                    width="32"
                    height="32"
                  ></rect>
                </g>
              </svg>
            </div>
            Zleć test
          </RouterLink>

          <RouterLink to="/recepty" @click="emitShortcut"  class="shortcut-button" v-if="role == 2 || role == 4">
            <div class="shortcut-icon">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 32 32"
                xml:space="preserve"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    id="medical--charts_1_"
                    d="M27,31.36H8c-0.199,0-0.36-0.161-0.36-0.36v-1.64H6c-0.199,0-0.36-0.161-0.36-0.36v-1.64H5 c-0.199,0-0.36-0.161-0.36-0.36V3c0-0.199,0.161-0.36,0.36-0.36h4.64V2c0-0.199,0.161-0.36,0.36-0.36h1.64V1 c0-0.199,0.161-0.36,0.36-0.36h4c0.199,0,0.36,0.161,0.36,0.36v0.64H18c0.199,0,0.36,0.161,0.36,0.36v0.64H23 c0.199,0,0.36,0.161,0.36,0.36v1.64H25c0.199,0,0.36,0.161,0.36,0.36v1.64H27c0.199,0,0.36,0.161,0.36,0.36v24 C27.36,31.199,27.199,31.36,27,31.36z M8.36,30.64h18.28V7.36h-1.28V29c0,0.199-0.161,0.36-0.36,0.36H8.36V30.64z M6.36,28.64h18.28 V5.36h-1.28V27c0,0.199-0.161,0.36-0.36,0.36H6.36V28.64z M5.36,26.64h17.28V3.36h-4.28V4c0,0.199-0.161,0.36-0.36,0.36h-8 C9.801,4.36,9.64,4.199,9.64,4V3.36H5.36V26.64z M10.36,3.64h7.28V2.36H16c-0.199,0-0.36-0.161-0.36-0.36V1.36h-3.28V2 c0,0.199-0.161,0.36-0.36,0.36h-1.64C10.36,2.36,10.36,3.64,10.36,3.64z M20.5,21.36h-13v-0.72h13V21.36z M20.5,17.36h-13v-0.72h13 V17.36z M20.5,13.36h-8v-0.72h8V13.36z M9.86,13H9.14v-1.64H7.5v-0.72h1.64V9h0.72v1.64h1.64v0.72H9.86V13z M20.5,9.36h-8V8.64h8 V9.36z"
                  ></path>
                  <rect
                    id="_Transparent_Rectangle"
                    style="fill: none"
                    width="32"
                    height="32"
                  ></rect>
                </g>
              </svg>
            </div>
            Stwórz receptę
          </RouterLink>

          <RouterLink to="/personel" @click="emitShortcut"  class="shortcut-button" v-if="role == 3 || role == 4">
            <div class="shortcut-icon">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 32 32"
                xml:space="preserve"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    id="medical--staff_1_"
                    d="M16.002,31.359c-1.025,0-1.859-0.834-1.859-1.859c0-0.902,0.646-1.657,1.5-1.825v-2.329 C13.404,25.163,11.64,23.284,11.64,21v-2.073c-2.013,1.4-3.28,3.708-3.28,6.265V31H7.64v-5.809c0-3.572,2.259-6.701,5.591-7.884 c-1.33-0.906-2.152-2.422-2.152-4.064c0-2.015,1.217-3.75,2.955-4.51C14.144,8.354,14.2,7.96,14.2,7.561 c0-1.478-0.791-2.852-2.043-3.605C11.79,4.782,10.961,5.359,10,5.359S8.21,4.782,7.843,3.957C6.59,4.709,5.8,6.083,5.8,7.561 c0,1.656,0.98,3.162,2.496,3.836c0.141,0.063,0.226,0.209,0.212,0.363c-0.014,0.153-0.125,0.281-0.275,0.316 c-3.458,0.819-5.873,3.875-5.873,7.432V26H1.64v-6.491c0-3.597,2.257-6.726,5.586-7.887C5.9,10.715,5.08,9.201,5.08,7.561 c0-1.801,1.001-3.469,2.572-4.325C7.644,3.158,7.64,3.08,7.64,3c0-1.302,1.059-2.36,2.36-2.36S12.36,1.698,12.36,3 c0,0.08-0.004,0.159-0.012,0.236c1.571,0.856,2.572,2.525,2.572,4.325c0,0.304-0.027,0.605-0.083,0.901 c0.745-0.182,1.579-0.182,2.324,0c-0.055-0.296-0.083-0.597-0.083-0.901c0-1.326,0.53-2.583,1.468-3.505l-0.802-0.802 c-0.108-0.109-0.137-0.275-0.067-0.414c0.044-0.09,1.124-2.2,4.322-2.2s4.278,2.11,4.322,2.2c0.068,0.139,0.041,0.305-0.067,0.414 l-0.802,0.802c0.938,0.922,1.468,2.18,1.468,3.505c0,1.64-0.82,3.154-2.146,4.061c3.329,1.162,5.586,4.291,5.586,7.887V26h-0.72 v-6.491c0-3.557-2.414-6.613-5.872-7.432c-0.15-0.036-0.261-0.163-0.275-0.316c-0.015-0.154,0.071-0.3,0.212-0.363 c1.517-0.675,2.496-2.181,2.496-3.836c0-1.133-0.454-2.208-1.256-2.996l-0.689,0.69c-0.074,0.075-0.174,0.118-0.28,0.104 c-0.104-0.007-0.2-0.06-0.263-0.143C23.696,5.196,23.232,4.632,22,4.632c-1.209,0-1.701,0.571-1.721,0.595 c-0.065,0.078-0.161,0.126-0.262,0.13c-0.121,0.005-0.202-0.032-0.272-0.104l-0.689-0.689C18.254,5.352,17.8,6.427,17.8,7.561 c0,0.398,0.056,0.792,0.166,1.172c1.737,0.76,2.955,2.496,2.955,4.51c0,1.64-0.82,3.154-2.146,4.061 c3.328,1.162,5.586,4.291,5.586,7.888V31H23.64v-5.809c0-2.577-1.267-4.891-3.279-6.281V21c0,2.282-1.763,4.16-3.999,4.345v2.33 c0.854,0.168,1.5,0.923,1.5,1.825C17.861,30.525,17.027,31.359,16.002,31.359z M16.002,28.36c-0.628,0-1.14,0.511-1.14,1.14 c0,0.628,0.511,1.139,1.14,1.139c0.628,0,1.139-0.511,1.139-1.139C17.141,28.871,16.63,28.36,16.002,28.36z M12.359,18.482V21 c0,2.007,1.633,3.64,3.64,3.64s3.64-1.633,3.64-3.64v-2.53c-0.578-0.312-1.206-0.553-1.872-0.71 c-0.15-0.036-0.261-0.163-0.275-0.317c-0.015-0.153,0.071-0.299,0.212-0.362c1.517-0.675,2.496-2.181,2.496-3.837 c0-2.316-1.884-4.2-4.2-4.2s-4.201,1.884-4.201,4.2c0,1.656,0.98,3.162,2.496,3.837c0.141,0.062,0.226,0.208,0.212,0.361 s-0.124,0.281-0.273,0.317C13.567,17.922,12.939,18.168,12.359,18.482z M10,1.36C9.096,1.36,8.36,2.096,8.36,3S9.096,4.64,10,4.64 S11.64,3.904,11.64,3S10.904,1.36,10,1.36z M18.456,2.946l1.558,1.558C20.352,4.25,20.992,3.912,22,3.912 c1.021,0,1.655,0.334,1.99,0.589l1.555-1.555C25.207,2.468,24.189,1.36,22,1.36C19.812,1.36,18.794,2.467,18.456,2.946z"
                  ></path>
                  <rect
                    id="_Transparent_Rectangle"
                    style="fill: none"
                    width="32"
                    height="32"
                  ></rect>
                </g>
              </svg>
            </div>
            Dodaj pracownika
          </RouterLink>

          <RouterLink to="/pacjenci" @click="emitShortcut"  class="shortcut-button" v-if="role == 3 || role == 4">
            <div class="shortcut-icon">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 32 32"
                xml:space="preserve"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    id="heart--health_1_"
                    d="M31.36,31h-0.72c0-6.432-4.777-12.232-11.359-13.792c-0.15-0.036-0.261-0.163-0.275-0.317 c-0.015-0.153,0.071-0.299,0.212-0.362c2.861-1.273,4.71-4.116,4.71-7.241c0-4.371-3.556-7.927-7.927-7.927 c-4.372,0-7.928,3.556-7.928,7.927c0,3.125,1.849,5.968,4.711,7.241c0.141,0.063,0.226,0.209,0.212,0.362 c-0.014,0.154-0.125,0.281-0.275,0.317C6.137,18.768,1.36,24.568,1.36,31H0.64c0-6.46,4.574-12.312,11.002-14.248 c-2.634-1.539-4.291-4.375-4.291-7.465c0-4.768,3.879-8.647,8.648-8.647c4.768,0,8.647,3.879,8.647,8.647 c0,3.09-1.656,5.926-4.29,7.465C26.786,18.688,31.36,24.54,31.36,31z M16,30.36c-0.096,0-0.187-0.038-0.255-0.105l-3.962-3.965 c-0.511-0.512-0.794-1.191-0.797-1.915c-0.003-0.731,0.28-1.42,0.798-1.938c0.513-0.513,1.195-0.796,1.921-0.798 c0.001,0,0.003,0,0.004,0c0.729,0,1.413,0.283,1.927,0.798L16,22.803l0.365-0.365c1.026-1.027,2.825-1.028,3.852,0.001 c0.527,0.526,0.811,1.228,0.798,1.974c-0.014,0.711-0.297,1.377-0.799,1.878l-3.961,3.965C16.187,30.322,16.096,30.36,16,30.36z M13.709,22.36c-0.001,0-0.002,0-0.003,0c-0.534,0.001-1.036,0.209-1.413,0.587c-0.381,0.381-0.59,0.887-0.587,1.425 c0.002,0.532,0.211,1.032,0.587,1.408L16,29.49l3.707-3.71c0.369-0.368,0.578-0.858,0.587-1.381c0.01-0.549-0.198-1.064-0.587-1.452 c-0.756-0.758-2.077-0.757-2.833-0.001l-0.62,0.62c-0.141,0.141-0.368,0.141-0.509,0l-0.619-0.619 C14.748,22.568,14.245,22.36,13.709,22.36z"
                  ></path>
                  <rect
                    id="_Transparent_Rectangle"
                    style="fill: none"
                    width="32"
                    height="32"
                  ></rect>
                </g>
              </svg>
            </div>
            Dodaj pacjenta
          </RouterLink>

          <button @click="showReportErrorModal = true" class="shortcut-button">
            <div class="shortcut-icon">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 32 32"
                xml:space="preserve"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    id="warning--01_1_"
                    d="M31,29.36H1c-0.128,0-0.248-0.069-0.312-0.181c-0.064-0.111-0.064-0.248,0-0.359l15-26 c0.129-0.224,0.495-0.224,0.624,0l15,26c0.064,0.111,0.064,0.248,0,0.359S31.129,29.36,31,29.36z M1.624,28.64h28.753L16,3.72 L1.624,28.64z M16.36,20h-0.72V10h0.72V20z M16,23c-0.552,0-1,0.448-1,1s0.448,1,1,1s1-0.448,1-1S16.552,23,16,23z"
                  ></path>
                  <rect
                    id="_Transparent_Rectangle"
                    style="fill: none"
                    width="32"
                    height="32"
                  ></rect>
                </g>
              </svg>
            </div>
            Zgłoś błąd
          </button>
        </div>
      </div>

      <hr class="my-8 mr-8 border-gray-300 dark:border-gray-600" />

      <h2 class="sub-title">Statystyki na dziś</h2>
      <div class="mx-auto max-w-7xl mr-8 px-4 py-6 sm:px-6 lg:px-8">
        <div class="grid grid-cols-4">
          <StatBox v-for="stat in dayStats" :value="stat.value" :label="stat.label" :key="stat.label" />
        </div>
      </div>

      <hr class="my-8 mr-8 border-gray-300 dark:border-gray-600" />

      <h2 class="sub-title">Statystyki do końca tygodnia</h2>
      <div class="mx-auto max-w-7xl mr-8 px-4 py-6 sm:px-6 lg:px-8">
        <div class="grid grid-cols-4">
          <StatBox v-for="stat in weekStats" :value="stat.value" :label="stat.label" :key="stat.label" />
        </div>
      </div>
    </div>
  </div>
  <FormModal 
    v-if="showReportErrorModal"
    type="add"
    title="Zgłoś błąd"
    :data="formData"
    :fields="formFields"
    @submit="submitForm"
    @cancel="cancelForm"
  />
  <MessageModal
    v-if="showInfoModal"
    type="info"
    title="SUKCES"
    subtitle="Błąd został zgłoszony"
    @submit="showInfoModal = false"
  />
</template>

<script>
import homeApi from '@/api/homeApi.js'
import userApi from '@/api/userApi.js'
import errorApi from '@/api/errorApi'
import LoaderCover from '@/components/LoaderCover.vue'
import StatBox from '@/components/StatBox.vue'
import FormModal from '@/components/FormModal.vue'
import MessageModal from '@/components/MessageModal.vue'

export default {
  emits: ['error', 'enableShortcut'],
  components: {
    LoaderCover,
    StatBox,
    FormModal,
    MessageModal
  },
  props: {
    role: {
      type: Number,
      default: 1
    },
    shortcut: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      name: undefined,
      dayStats: [],
      weekStats: [],
      loading: true,
      formData: {},
      showReportErrorModal: false,
      showInfoModal: false,
    }
  },
  computed: {
    formFields() {
      return [
        { field: 'title', title: 'Tytuł zgłoszenia' },
        { field: 'description', title: 'Opis błedu', type: 'longtext' }
      ]
    }
  },
  methods: {
    async fetchName() {
      this.loading = true
      try {
        const token = this.$store.state.token
        const response = await userApi.getUser(token)
        this.name = response.data.data.first_name
        this.loading = false
      } catch (error) {
        this.loading = false
        this.emitError(error)
      }
    },
    async fetchStats() {
      this.loading = true
      try {
        const token = this.$store.state.token
        const response = await homeApi.getStats(token)
        this.dayStats = response.data.data.daily
        this.weekStats = response.data.data.weekly
        this.loading = false
      } catch (error) {
        this.loading = false
        this.emitError(error)
      }
    },
    async reportError(error) {
      this.loading = true
      try {
        const token = this.$store.state.token
        await errorApi.postError(token, error)
        this.loading = false
        this.showInfoModal = true
      } catch (error) {
        this.loading = false
        this.emitError(error)
      }
    },
    submitForm(data) {
      this.reportError(data)
      this.formData = {}
      this.showReportErrorModal = false
    },
    cancelForm() {
      this.formData = {}
      this.showReportErrorModal = false
    },
    emitShortcut() {
      this.$emit('enableShortcut', true)
    },
    emitError(error) {
      this.$emit('error', error)
    }
  },
  mounted() {
    this.fetchName()
    this.fetchStats()
  }
}
</script>
