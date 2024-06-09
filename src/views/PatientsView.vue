<template>
  <LoaderCover v-if="loading" />
  <PageHeader title="Pacjenci" :actions="headerActions" @addNewPatient="addNewPatient" />
  <main>
    <DataTable
      :data="patients"
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
    :subtitle="`Chcesz usunąć pacjenta ${formData.id}?`"
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
        { field: 'date_of_birth', title: 'Data urodzenia', type: 'date' },
        { field: 'gender', title: 'Płeć' },
        { field: 'blood_type', title: 'Grupa krwi' }
      ]
    },
    formFields() {
      return [
        { field: 'name', title: 'Imie i nazwisko' },
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
        { field: 'phone_number', title: 'Numer telefonu', type: 'phone', optional: true },
        { field: 'address', title: 'Adres zamieszkania', optional: true },
        { field: 'date_of_death', title: 'Data śmierci', type: 'date', optional: true },
        { field: 'blood_type',
          title: 'Grupa krwi',
          type: 'select',
          options: [
            { value: 'A+', label: 'A+' },
            { value: 'A-', label: 'A-' },
            { value: 'B+', label: 'B+' },
            { value: 'B-', label: 'B-' },
            { value: 'AB+', label: 'AB+' },
            { value: 'AB-', label: 'AB-' },
            { value: '0+', label: '0+' },
            { value: '0-', label: '0-' }
          ],
          optional: true
        },
      ]
    },
    headerActions() {
      return [
        {
          label: 'Dodaj pacjenta',
          action: 'addNewPatient',
          allowedRoles: [3, 4]
        }
      ]
    },
    formModalTitle() {
      if (this.formModalType === 'add') {
        return 'Dodaj pacjenta'
      } else if (this.formModalType === 'edit') {
        return 'Edytuj pacjenta'
      } else {
        return 'Zobacz pacjenta'
      }
    },
  },
  data() {
    return {
      patients: [],
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
        const response = await serviceApi.getPatients(token)
        this.patients = response.data.data
        this.loading = false
      } catch (error) {
        this.loading = false
        this.emitError(error)
      }
    },
    async getPatient(id) {
      this.loading = true
      try {
        const token = this.$store.state.token
        const response = await serviceApi.getPatient(token, id)
        this.formData = response.data.data
        this.loading = false
        this.showFormModal = true
      } catch (error) {
        this.loading = false
        this.emitError(error)
      }
    },
    async addPatient(patient) {
      this.loading = true
      try {
        const token = this.$store.state.token
        await serviceApi.postPatient(token, patient)
        this.reloadData()
        this.loading = false
        this.infoModalTitle = 'Sukces'
        this.infoModalMessage = 'Nowy pacjent został dodany'
        this.infoModalType = 'info'
        this.showInfoModal = true
      } catch (error) {
        this.loading = false
        this.emitError(error)
      }
    },
    async editPatient(id, patient) {
      this.loading = true
      try {
        const token = this.$store.state.token
        await serviceApi.patchPatient(token, id, patient)
        this.reloadData()
        this.loading = false
        this.infoModalMessage = `Pacjent o id ${id} został edytowany`
        this.showInfoModal = true
      } catch (error) {
        this.loading = false
        this.emitError(error)
      }
    },
    async deletePatient(id) {
      this.loading = true
      try {
        const token = this.$store.state.token
        await serviceApi.deletePatient(token, id)
        this.reloadData()
        this.loading = false
        this.infoModalMessage = `Pacjent o id ${id} został usunięty`
        this.showInfoModal = true
      } catch (error) {
        this.loading = false
        this.emitError(error)
      }
    },
    addNewPatient() {
      this.showFormModal = true
      this.formModalType = 'add'
    },
    viewRow(row) {
      this.formModalType = 'view'
      this.getPatient(row.id)
    },
    editRow(row) {
      this.formModalType = 'edit'
      this.getPatient(row.id)
    },
    deleteRow(row) {
      this.formData = row
      this.showDeleteModal = true
    },
    submitDelete() {
      this.deletePatient(this.formData.id)
      this.showDeleteModal = false
    },
    cancelDelete() {
      this.showDeleteModal = false
    },
    submitForm(data) {
      if (this.formModalType === 'add') {
        this.addPatient(data)
      } else if (this.formModalType === 'edit') {
        this.editPatient(data.id, data)
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
      this.addNewPatient()
      this.emitShortcut()
    }
  }
}
</script>
