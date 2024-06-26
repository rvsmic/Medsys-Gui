<template>
  <LoaderCover v-if="loading" />
  <PageHeader title="Recepty" :actions="headerActions" @addNewPrescription="addNewPrescription" />
  <main>
    <DataTable
      :data="prescriptions"
      :columns="columns"
      :canView="true"
      :canEdit="role == 2 || role == 4"
      :canDelete="role == 4"
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
    :subtitle="`Chcesz usunąć receptę ${formData.id}?`"
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
import metaApi from '@/api/metaApi'
import LoaderCover from '@/components/LoaderCover.vue'
import PageHeader from '@/components/PageHeader.vue'
import DataTable from '@/components/DataTable.vue'
import FormModal from '@/components/FormModal.vue'
import MessageModal from '@/components/MessageModal.vue'

export default {
  emits: ['error', 'enableShortcut', 'logout'],
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
        { field: 'patient', title: 'Pacjent' },
        { field: 'doctor', title: 'Doktor' },
        { field: 'prescription_date', title: 'Data wypisania', type:'date' }
      ]
    },
    formFields() {
      return [
        {
          field: 'patient_id',
          title: 'Pacjent',
          type: 'select',
          options: this.selPatients
        },
        {
          field: 'doctor_id',
          title: 'Lekarz',
          type: 'select',
          options: this.selDoctors
        },
        { field: 'prescription_date', title: 'Data wypisania', type: 'date' },
        { field: 'prescription_details', title: 'Treść recepty', type: 'longtext' },
      ]
    },
    headerActions() {
      return [
        {
          label: 'Dodaj receptę',
          action: 'addNewPrescription',
          allowedRoles: [2, 4]
        }
      ]
    },
    formModalTitle() {
      if (this.formModalType === 'add') {
        return 'Dodaj receptę'
      } else if (this.formModalType === 'edit') {
        return 'Edytuj receptę'
      } else {
        return 'Zobacz receptę'
      }
    },
  },
  data() {
    return {
      prescriptions: [],
      loading: false,
      showFormModal: false,
      showDeleteModal: false,
      showInfoModal: false,
      formModalType: undefined,
      formData: {},
      infoModalMessage: undefined,
      selDoctors: [],
      selPatients: []
    }
  },
  methods: {
    reloadData() {
      this.fetchData()
      this.fetchMetadata()
    },
    async fetchData() {
      this.loading = true
      try {
        const token = this.$store.state.token
        const response = await serviceApi.getPrescription(token)
        this.prescriptions = response.data.data
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
    async fetchMetadata() {
      this.loading = true
      try {
        const token = this.$store.state.token
        const doctorsResponse = await metaApi.getSelDoctors(token)
        this.selDoctors = doctorsResponse.data.data
        const patientsResponse = await metaApi.getSelPatients(token)
        this.selPatients = patientsResponse.data.data
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
    async getPrescription(id) {
      this.loading = true
      try {
        const token = this.$store.state.token
        const response = await serviceApi.getPrescription(token, id)
        this.formData = response.data.data
        this.loading = false
        this.showFormModal = true
      } catch (error) {
        this.loading = false
        if (error.response && error.response.status === 401) {
          this.emitLogout()
          return
        }
        this.emitError(error)
      }
    },
    async addPrescription(prescription) {
      this.loading = true
      try {
        const token = this.$store.state.token
        await serviceApi.postPrescription(token, prescription)
        this.reloadData()
        this.loading = false
        this.infoModalTitle = 'Sukces'
        this.infoModalMessage = 'Nowa recepta została dodana'
        this.infoModalType = 'info'
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
    async editPrescription(id, prescription) {
      this.loading = true
      try {
        const token = this.$store.state.token
        await serviceApi.patchPrescription(token, id, prescription)
        this.reloadData()
        this.loading = false
        this.infoModalMessage = `Recepta o id ${id} została edytowana`
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
    async deletePrescription(id) {
      this.loading = true
      try {
        const token = this.$store.state.token
        await serviceApi.deletePrescription(token, id)
        this.reloadData()
        this.loading = false
        this.infoModalMessage = `Recepta o id ${id} została usunięta`
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
    addNewPrescription() {
      this.showFormModal = true
      this.formModalType = 'add'
    },
    viewRow(row) {
      this.formModalType = 'view'
      this.getPrescription(row.id)
    },
    editRow(row) {
      this.formModalType = 'edit'
      this.getPrescription(row.id)
    },
    deleteRow(row) {
      this.formData = row
      this.showDeleteModal = true
    },
    submitDelete() {
      this.deletePrescription(this.formData.id)
      this.showDeleteModal = false
    },
    cancelDelete() {
      this.showDeleteModal = false
    },
    submitForm(data) {
      if (this.formModalType === 'add') {
        this.addPrescription(data)
      } else if (this.formModalType === 'edit') {
        this.editPrescription(data.id, data)
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
    },
    emitLogout() {
      this.$emit('logout')
    }
  },
  mounted() {
    this.reloadData()
    if (this.shortcut) {
      this.addNewPrescription()
      this.emitShortcut()
    }
  }
}
</script>
