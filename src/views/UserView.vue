<template>
  <LoaderCover v-if="loading" />
  <PageHeader title="Moja strona" :actions="headerActions" @changePasswordAction="changePasswordAction" />
  <div class="mx-auto max-w-7xl px-8 py-6 sm:px-12 lg:px-16">
    <h2 class="sub-title">Moje dane</h2>
      <div class="mx-auto max-w-7xl mr-8 px-4 py-6 sm:px-6 lg:px-8">
        <SimpleTable :columns="columns" :data="userData" />
      </div>
  </div>
  <MessageModal
    v-if="showInfoModal"
    type="info"
    title="SUKCES"
    :subtitle="infoModalMessage"
    @submit="showInfoModal = false"
  />
  <FormModal
    v-if="showFormModal"
    type="add"
    title="Zmiana hasła"
    subtitle="Hasło musi zawierać co najmniej 8 znaków, w tym jedną dużą literę, jedną małą literę, jedną cyfrę i jeden znak specjalny"
    :data="formData"
    :fields="formFields"
    @submit="submitForm"
    @cancel="cancelForm"
  />
</template>

<script>
import userApi from '@/api/userApi'
import LoaderCover from '@/components/LoaderCover.vue'
import PageHeader from '@/components/PageHeader.vue'
import MessageModal from '@/components/MessageModal.vue'
import SimpleTable from '@/components/SimpleTable.vue'
import FormModal from '@/components/FormModal.vue'

export default {
  emits: ['error', 'enableShortcut', 'logout'],
  components: {
    LoaderCover,
    PageHeader,
    MessageModal,
    SimpleTable,
    FormModal
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
  computed: {
    columns() {
      return [
        { field: 'system_id', title: 'ID systemowe' },
        { field: 'full_name', title: 'Imie i nazwisko' },
        { field: 'login', title: 'Login' },
        { field: 'profession', title: 'Zawód' },
        { field: 'specialty', title: 'Specjalizacja'},
        { field: 'dob', title: 'Data urodzenia'},
        { field: 'pesel', title: 'Pesel', type: 'pesel'},
        { field: 'gender', title: 'Płeć' },
        { field: 'phone_number', title: 'Numer telefonu'},
        { field: 'address', title: 'Adres zamieszkania'},
      ]
    },
    formFields() {
      return [
        { field: 'new_password', title: 'Nowe hasło', type: 'password' },
        { field: 'new_password_repeat', title: 'Powtórz nowe hasło', type: 'password', bind: 'new_password' }
      ]
    },
    headerActions() {
      return [
        {
          label: 'Zmień hasło',
          action: 'changePasswordAction',
          type: 'secondary',
          allowedRoles: [1, 2, 3, 4]
        }
      ]
    }
  },
  data() {
    return {
      userData: {},
      formData: {},
      loading: false,
      showFormModal: false,
      showInfoModal: false,
      infoModalMessage: undefined,
    }
  },
  methods: {
    reloadData() {
      this.fetchData()
    },
    async fetchData() {
      this.loading = true
      try {
        const token = this.$store.state.token
        const response = await userApi.getUser(token)
        this.userData = response.data.data
        this.loading = false
      } catch (error) {
        this.loading = false
        if (error.response && error.response.status === 401) {
          this.emitLogout()
          return
        }
        this.emitError(error)
      }
    },
    async changePassword(newPassword) {
      this.loading = true
      try {
        const token = this.$store.state.token
        await userApi.changePassword(token, newPassword)
        this.loading = false
        this.infoModalMessage = `Hasło zostało zmienione`
        this.showInfoModal = true
      } catch (error) {
        this.loading = false
        if (error.response && error.response.status === 401) {
          this.emitLogout()
          return
        }
        this.emitError(error)
      }
    },
    changePasswordAction() {
      this.showFormModal = true
    },
    submitForm(data) {
      this.changePassword(data)
      this.formData = {}
      this.showFormModal = false
    },
    cancelForm() {
      this.formData = {}
      this.showFormModal = false
    },
    emitError(error) {
      this.$emit('error', error)
    },
    emitLogout() {
      this.$emit('logout')
    }
  },
  mounted() {
    this.reloadData()
  }
}
</script>
