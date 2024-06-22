<template>
  <LoaderCover v-if="loading" />
  <PageHeader title="Personel" :actions="headerActions" @addNewEmployee="addNewEmployee" />
  <main>
    <DataTable
      :data="employees"
      :columns="columns"
      :canView="true"
      :canEdit="role == 3 || role == 4"
      :canDelete="role == 3 || role == 4"
      @view="viewRow"
      @edit="editRow"
      @delete="deleteRow"
    />
  </main>
  <FormModal 
    v-if="showFormModal"
    :type="formModalType"
    :title="formModalTitle"
    :data="formData"
    :fields="formFields"
    @submit="submitForm"
    @cancel="cancelForm"
  />
  <MessageModal
    v-if="showDeleteModal"
    type="delete"
    title="UWAGA"
    :subtitle="`Chcesz usunąć pracownika ${formData.id}?`"
    @submit="submitDelete"
    @cancel="cancelDelete"
  />
  <MessageModal
    v-if="showInfoModal"
    type="info"
    title="SUKCES"
    :subtitle="infoModalMessage"
    @submit="showInfoModal = false"
  />
</template>

<script>
import serviceApi from '@/api/serviceApi.js'
import LoaderCover from '@/components/LoaderCover.vue'
import PageHeader from '@/components/PageHeader.vue'
import DataTable from '@/components/DataTable.vue'
import FormModal from '@/components/FormModal.vue'
import MessageModal from '@/components/MessageModal.vue'

export default {
  emits: ['error', 'enableShortcut'],
  components: {
    LoaderCover,
    PageHeader,
    DataTable,
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
  computed: {
    columns() {
      return [
        { field: 'id', title: 'ID', type: 'number', isUnique: true, filter: false },
        { field: 'name', title: 'Imie i nazwisko' },
        { field: 'gender', title: 'Płeć' },
        { field: 'profession', title: 'Zawód'},
        { field: 'specialty', title: 'Specjalizacja'},
      ]
    },
    formFields() {
      return [
        { field: 'name', title: 'Imie i nazwisko' },
        { field: 'username', title: 'Login' },
        { field: 'date_of_birth', title: 'Data urodzenia', type: 'date' },
        { field: 'pesel', title: 'Pesel', type: 'pesel', optional: true },
        {
          field: 'gender',
          title: 'Płeć',
          type: 'select',
          options: [
            { value: 'M', label: 'Mężczyzna' },
            { value: 'F', label: 'Kobieta' },
            { value: 'O', label: 'Inne' }
          ]
        },
        { field: 'phone_number', title: 'Numer telefonu', type: 'phone' },
        { field: 'address', title: 'Adres zamieszkania' },
        {
          field: 'profession',
          title: 'Zawód',
          type: 'select',
          options: [
            { value: 'Personel', label: 'Personel' },
            { value: 'Lekarz', label: 'Lekarz' },
            { value: 'Admin', label: 'Admin' },
            { value: 'Stażysta', label: 'Stażysta' }
          ]
        },
        { field: 'specialty', title: 'Specjalizacja', optional: true }
      ]
    },
    headerActions() {
      return [
        {
          label: 'Dodaj pracownika',
          action: 'addNewEmployee',
          allowedRoles: [3, 4]
        }
      ]
    },
    formModalTitle() {
      if (this.formModalType === 'add') {
        return 'Dodaj pracownika'
      } else if (this.formModalType === 'edit') {
        return 'Edytuj pracownika'
      } else {
        return 'Zobacz pracownika'
      }
    },
  },
  data() {
    return {
      employees: [],
      loading: false,
      showFormModal: false,
      showDeleteModal: false,
      showInfoModal: false,
      formModalType: undefined,
      formData: {},
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
        const response = await serviceApi.getEmployees(token)
        this.employees = response.data.data
        this.loading = false
      } catch (error) {
        this.loading = false
        this.emitError(error)
      }
    },
    async getEmployee(id) {
      this.loading = true
      try {
        const token = this.$store.state.token
        const response = await serviceApi.getEmployee(token, id)
        this.formData = response.data.data
        this.loading = false
        this.showFormModal = true
      } catch (error) {
        this.loading = false
        this.emitError(error)
      }
    },
    async addEmployee(employee) {
      this.loading = true
      try {
        const token = this.$store.state.token
        const response = await serviceApi.postEmployee(token, employee)
        const newPassword = response.data.data
        this.reloadData()
        this.loading = false
        this.infoModalTitle = 'Sukces'
        this.infoModalMessage = 'Nowy pracownik został dodany z jednorazowym hasłem: ' + newPassword
        this.infoModalType = 'info'
        this.showInfoModal = true
      } catch (error) {
        this.loading = false
        this.emitError(error)
      }
    },
    async editEmployee(id, employee) {
      this.loading = true
      try {
        const token = this.$store.state.token
        await serviceApi.patchEmployee(token, id, employee)
        this.reloadData()
        this.loading = false
        this.infoModalMessage = `Pracownik o id ${id} został edytowany`
        this.showInfoModal = true
      } catch (error) {
        this.loading = false
        this.emitError(error)
      }
    },
    async deleteEmployee(id) {
      this.loading = true
      try {
        const token = this.$store.state.token
        await serviceApi.deleteEmployee(token, id)
        this.reloadData()
        this.loading = false
        this.infoModalMessage = `Pracownik o id ${id} został usunięty`
        this.showInfoModal = true
      } catch (error) {
        this.loading = false
        this.emitError(error)
      }
    },
    addNewEmployee() {
      this.showFormModal = true
      this.formModalType = 'add'
    },
    viewRow(row) {
      this.formModalType = 'view'
      this.getEmployee(row.id)
    },
    editRow(row) {
      this.formModalType = 'edit'
      this.getEmployee(row.id)
    },
    deleteRow(row) {
      this.formData = row
      this.showDeleteModal = true
    },
    submitDelete() {
      this.deleteEmployee(this.formData.id)
      this.formData = {}
      this.showDeleteModal = false
    },
    cancelDelete() {
      this.formData = {}
      this.showDeleteModal = false
    },
    submitForm(data) {
      if (this.formModalType === 'add') {
        this.addEmployee(data)
      } else if (this.formModalType === 'edit') {
        this.editEmployee(data.id, data)
      }
      this.formData = {}
      this.showFormModal = false
    },
    cancelForm() {
      this.formData = {}
      this.showFormModal = false
    },
    emitShortcut() {
      this.$emit('enableShortcut', false)
    },
    emitError(error) {
      this.$emit('error', error)
    }
  },
  mounted() {
    this.reloadData()
    if (this.shortcut) {
      this.addNewEmployee()
      this.emitShortcut()
    }
  }
}
</script>
