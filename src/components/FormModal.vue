<template>
  <div class="modal-bg">
    <div class="bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg p-4 w-2/5 overflow-scroll" style="max-height: 75vh;">
      <div class="px-4">
        <h2 class="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">
          {{ title }}
        </h2>
        <form class="mt-2" v-for="field in formFields" :key="field.field">
          <label
            :for="field.field"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
            >{{ field.title }} <span v-if="!field.optional && type != 'view'" class="text-red-500 font-semibold">*</span> <span v-if="field.error" class="text-red-500 font-semibold"> {{ field.error }}</span></label
          >
          <input
            v-if="field.type === 'text' || field.type === undefined"
            type="text"
            :name="field.field"
            :id="field.field"
            v-model="formData[field.field]"
            class="bg-gray-50 shadow-inner shadow-gray-400 dark:shadow-gray-950 text-gray-900 dark:text-gray-200 rounded-xl focus:border-logo-dark-green block w-full px-4 p-2.5 dark:bg-gray-800  dark:placeholder-gray-400 dark:focus:border-logo-medium-green"
            :placeholder="field.title"
            :disabled="type === 'view'"
          />
          <input
            v-if="field.type === 'number'"
            type="number"
            :name="field.field"
            :id="field.field"
            v-model="formData[field.field]"
            class="bg-gray-50 shadow-inner shadow-gray-400 dark:shadow-gray-950 text-gray-900 dark:text-gray-200 rounded-xl focus:border-logo-dark-green block w-full px-4 p-2.5 dark:bg-gray-800  dark:placeholder-gray-400 dark:focus:border-logo-medium-green"
            :disabled="type === 'view'"
          />
          <select
            v-if="field.type === 'select'"
            :name="field.field"
            :id="field.field"
            v-model="formData[field.field]"
            class="select-option"
            :disabled="type === 'view'"
          >
            <option v-for="option in field.options" :value="option.value" :key="option.value">{{ option.label }}</option>
          </select>
          <div class="bg-gray-50 shadow-inner shadow-gray-400 dark:shadow-gray-950 text-gray-900 dark:text-gray-200 rounded-xl focus:border-logo-dark-green block w-full p-1.5 pl-3 pr-2.5 dark:bg-gray-800  dark:placeholder-gray-400 dark:focus:border-logo-medium-green" v-if="field.type === 'date'">
            <input
              type="date"
              :name="field.field"
              :id="field.field"
              v-model="formData[field.field]"
              class="bg-gray-50 dark:bg-gray-800  dark:placeholder-gray-400"
              :disabled="type === 'view'"
            />
            <button v-if="formData[field.field] && type !== 'view'" @click="formData[field.field]=undefined" class="float-end mt-1">
              <div class="bg-gray-200 dark:bg-gray-600 shadow-sm hover:shadow-inner shadow-gray-400 dark:shadow-gray-950 fill-gray-900 dark:fill-gray-200 hover:fill-gray-200 hover:dark:fill-gray-200 hover:bg-logo-medium-green hover:dark:bg-logo-medium-green rounded-full p-1.5">
                <svg
                  height="10px"
                  width="10px"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 460.775 460.775"
                  xml:space="preserve"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"
                    ></path>
                  </g>
                </svg>
              </div>
            </button>
          </div>
          <div class="bg-gray-50 shadow-inner shadow-gray-400 dark:shadow-gray-950 text-gray-900 dark:text-gray-200 rounded-xl focus:border-logo-dark-green block w-full p-1.5 pl-3 pr-2.5 dark:bg-gray-800  dark:placeholder-gray-400 dark:focus:border-logo-medium-green" v-if="field.type === 'time'">
            <input
              type="time"
              :name="field.field"
              :id="field.field"
              v-model="formData[field.field]"
              class="bg-gray-50 dark:bg-gray-800  dark:placeholder-gray-400"
              :placeholder="field.title"
              :disabled="type === 'view'"
            />
            <button v-if="formData[field.field] && type !== 'view'" @click="formData[field.field]=undefined" class="float-end mt-1">
              <div class="bg-gray-200 dark:bg-gray-600 shadow-sm hover:shadow-inner shadow-gray-400 dark:shadow-gray-950 fill-gray-900 dark:fill-gray-200 hover:fill-gray-200 hover:dark:fill-gray-200 hover:bg-logo-medium-green hover:dark:bg-logo-medium-green rounded-full p-1.5">
                <svg
                  height="10px"
                  width="10px"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 460.775 460.775"
                  xml:space="preserve"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"
                    ></path>
                  </g>
                </svg>
              </div>
            </button>
          </div>
          <input
            v-if="field.type === 'pesel'"
            type="text"
            :name="field.field"
            :id="field.field"
            minlength="11"
            maxlength="11"
            v-model="formData[field.field]"
            class="bg-gray-50 shadow-inner shadow-gray-400 dark:shadow-gray-950 text-gray-900 dark:text-gray-200 rounded-xl focus:border-logo-dark-green block w-full px-4 p-2.5 dark:bg-gray-800  dark:placeholder-gray-400 dark:focus:border-logo-medium-green"
            :placeholder="field.title"
            :disabled="type === 'view'"
          />
          <input
            v-if="field.type === 'phone'"
            type="text"
            :name="field.field"
            :id="field.field"
            minlength="11"
            maxlength="13"
            v-model="formData[field.field]"
            class="bg-gray-50 shadow-inner shadow-gray-400 dark:shadow-gray-950 text-gray-900 dark:text-gray-200 rounded-xl focus:border-logo-dark-green block w-full px-4 p-2.5 dark:bg-gray-800  dark:placeholder-gray-400 dark:focus:border-logo-medium-green"
            :placeholder="field.title"
            :disabled="type === 'view'"
          />
        </form>
      </div>

      <div v-if="emptyFieldsError" class="flex w-full justify-center text-sm font-semibold text-red-500 mt-6">
        Wypełnij wszystkie wymagane pola!
      </div>

      <div v-if="validationError" class="flex w-full justify-center text-sm font-semibold text-red-500 mt-6">
        Formularz zawiera błędy!
      </div>

      <div v-if="type === 'add' || type === 'edit'" class="mt-6 flex justify-center">
        <SmallButton label="Anuluj" type="secondary" @click="onCancel" />
        <div class="pl-2" />
        <SmallButton label="Potwierdź" @click="onSubmit" />
      </div>
      <div v-if="type === 'view'" class="mt-6 flex justify-center">
        <SmallButton label="Ok" @click="onSubmit" />
      </div>
    </div>
  </div>
</template>

<script>
import SmallButton from '@/components/SmallButton.vue'

export default {
  emits: ['cancel', 'submit'],
  components: {
    SmallButton
  },
  props: {
    type: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    },
    fields: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      formData: JSON.parse(JSON.stringify(this.data)),
      formFields: JSON.parse(JSON.stringify(this.fields)),
      emptyFieldsError: false,
      validationError: false
    }
  },
  watch: {
    formData: {
      handler() {
        this.emptyFieldsError = false
        this.validationError = false
      },
      deep: true
    },
  },
  methods: {
    onCancel() {
      this.$emit('cancel')
    },
    onSubmit() {
      let error = false
      if (this.type != 'view' && this.validateFieldTypes()) {
        this.validationError = true
        error = true
      }
      if (this.type != 'view' && this.validateRequiredFields()) {
        this.emptyFieldsError = true
        error = true
      }
      if (error) {
        return
      }
      this.$emit('submit', this.formData)
    },
    validateRequiredFields() {
      return !this.fields.filter((field) => !field.optional).every((field) => this.formData[field.field])
    },
    validateFieldTypes() {
      let error = false
      this.formFields.forEach((field) => {
        if (field.type === 'number' && this.formData[field.field]) {
          if (!/^\d+$/.test(this.formData[field.field])) {
            field.error = 'Liczba wymagana'
            error = true
          } else {
            field.error = undefined
          }
        } else if (field.type === 'select' && this.formData[field.field]) {
          if (!field.options.map((option) => option.value).includes(this.formData[field.field])) {
            field.error = 'Opcja wymagana'
            error = true
          } else {
            field.error = undefined
          }
        } else if (field.type === 'date' && this.formData[field.field]) {
          if (!/^\d{4}-\d{2}-\d{2}$/.test(this.formData[field.field])) {
            field.error = 'Niepoprawny format daty'
            error = true
          } else {
            field.error = undefined
          }
        } else if (field.type === 'time' && this.formData[field.field]) {
          if (!/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(this.formData[field.field])) {
            field.error = 'Niepoprawny format czasu'
            error = true
          } else {
            field.error = undefined
          }
        } else if (field.type === 'pesel' && this.formData[field.field]) {
          if (!/^\d{11}$/.test(this.formData[field.field])) {
            field.error = 'Niepoprawny format PESEL'
            error = true
          } else {
            field.error = undefined
          }
        } else if (field.type === 'phone' && this.formData[field.field]) {
          if (!/^\+\d{11,13}$/.test(this.formData[field.field])) {
            field.error = 'Niepoprawny format numeru telefonu (wymagany np. +48123456789)'
            error = true
          } else {
            field.error = undefined
          }
        }
      })
      return error
    }
  },
  created() {
    if (this.type === 'view') {
      this.formFields.forEach((field) => {
        if (field.type === 'date') {
          if (this.formData[field.field]) {
            this.formData[field.field] = this.formData[field.field].split('-').reverse().join('/')
          } else {
            this.formData[field.field] = ' '
          }
          field.type = 'text'
        } else if (field.type === 'time') {
          if (!this.formData[field.field]) {
            this.formData[field.field] = ' '
          }
          field.type = 'text'
        } else if (field.type === 'text' || !field.type) {
          if (!this.formData[field.field]) {
            this.formData[field.field] = ' '
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.modal-bg {
  background: rgba(255, 255, 255, 0.2);
  -webkit-backdrop-filter: saturate(180%) blur(10px);
  backdrop-filter: saturate(180%) blur(10px);
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 8;
  display: flex;
  justify-content: center;
  align-items: center;
}

.select-option {
  color: #111827;
  border-width: 0;
  padding: 0.5rem 1rem;
  width: 100%;
  margin: 0 auto;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%2342841F'><polygon points='0,0 100,0 50,50'/></svg>")
    no-repeat;
  background-size: 10px;
  background-position: 95% 60%;
  background-repeat: no-repeat;
  background-color: #f9fafb;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  box-shadow: inset 0 2px 4px rgba(90, 90, 90, 0.5);
  border-radius: 0.75rem;
}

@media (prefers-color-scheme: dark) {
  .modal-bg {
    background: rgba(0, 0, 0, 0.2);
    -webkit-backdrop-filter: saturate(180%) blur(10px);
    backdrop-filter: saturate(180%) blur(10px);
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 8;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .select-option {
    color: #e5e7eb;
    border-width: 0;
    width: 100%;
    margin: 0 auto;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%235ed122'><polygon points='0,0 100,0 50,50'/></svg>")
      no-repeat;
    background-size: 10px;
    background-position: 95% 60%;
    background-repeat: no-repeat;
    background-color: #1f2937;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
    border-radius: 0.75rem;
  }
}
</style>
