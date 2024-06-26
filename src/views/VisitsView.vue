<template>
  <LoaderCover v-if="loading" />
  <PageHeader title="Wizyty" :actions="headerActions" @addNewVisit="addNewVisit" />
  <main>
    <DataTable
      :data="visits"
      :columns="columns"
      :canView="true"
      :canEdit="role == 2 || role == 3 || role == 4"
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
    :subtitle="`Chcesz usunąć wizytę ${formData.id}?`"
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
        { field: 'nazwa', title: 'Nazwa' },
        { field: 'pacjent', title: 'Pacjent' },
        { field: 'lekarz', title: 'Lekarz' },
        { field: 'godzina', title: 'Godzina' },
        { field: 'data', title: 'Data', type: 'date' },
        { field: 'diagnoza', title: 'Diagnoza' },
        { field: 'status', title: 'Status' }
      ]
    },
    formFields() {
      return [
        { field: 'appointment_name', title: 'Nazwa', optional: true },
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
        { field: 'appointment_time', title: 'Godzina', type: 'time' },
        { field: 'appointment_date', title: 'Data', type: 'date' },
        {
          field: 'appointment_status',
          title: 'Status',
          type: 'select',
          options: [
            { value: 'Anulowana', label: 'Anulowana' },
            { value: 'Oczekująca', label: 'Oczekująca' },
            { value: 'Zakończona', label: 'Zakończona' }
          ]
        },
        { field: 'diagnosis', title: 'Diagnoza', optional: true },
        {
          field: 'prescription_id',
          title: 'Recepta',
          type: 'select',
          options: this.selPrescriptions,
          optional: true
        },
        { field: 'follow_up_date', title: 'Data następnego badania', type: 'date', optional: true },
      ]
    },
    headerActions() {
      return [
        {
          label: 'Dodaj wizytę',
          action: 'addNewVisit',
          allowedRoles: [2, 3, 4]
        }
      ]
    },
    formModalTitle() {
      if (this.formModalType === 'add') {
        return 'Dodaj wizytę'
      } else if (this.formModalType === 'edit') {
        return 'Edytuj wizytę'
      } else {
        return 'Zobacz wizytę'
      }
    },
  },
  data() {
    return {
      visits: [],
      selDoctors: [],
      selPatients: [],
      selPrescriptions: [],
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
      this.fetchMetadata()
    },
    async fetchData() {
      this.loading = true
      try {
        const token = this.$store.state.token
        const response = await serviceApi.getVisits(token)
        this.visits = response.data.data
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
        const prescriptionsResponse = await metaApi.getSelPrescriptions(token)
        this.selPrescriptions = prescriptionsResponse.data.data
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
    async getVisit(id) {
      this.loading = true
      try {
        const token = this.$store.state.token
        const response = await serviceApi.getVisit(token, id)
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
    async addVisit(visit) {
      this.loading = true
      try {
        const token = this.$store.state.token
        await serviceApi.postVisit(token, visit)
        this.reloadData()
        this.loading = false
        this.infoModalTitle = 'Sukces'
        this.infoModalMessage = 'Nowa wizyta została dodana'
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
    async editVisit(id, visit) {
      this.loading = true
      try {
        const token = this.$store.state.token
        await serviceApi.patchVisit(token, id, visit)
        this.reloadData()
        this.loading = false
        this.infoModalMessage = `Wizyta o id ${id} została edytowana`
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
    async deleteVisit(id) {
      this.loading = true
      try {
        const token = this.$store.state.token
        await serviceApi.deleteVisit(token, id)
        this.reloadData()
        this.loading = false
        this.infoModalMessage = `Wizyta o id ${id} została usunięta`
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
    addNewVisit() {
      this.showFormModal = true
      this.formModalType = 'add'
    },
    viewRow(row) {
      this.formModalType = 'view'
      this.getVisit(row.id)
    },
    editRow(row) {
      this.formModalType = 'edit'
      this.getVisit(row.id)
    },
    deleteRow(row) {
      this.formData = row
      this.showDeleteModal = true
    },
    submitDelete() {
      this.deleteVisit(this.formData.id)
      this.showDeleteModal = false
    },
    cancelDelete() {
      this.showDeleteModal = false
    },
    submitForm(data) {
      if (this.formModalType === 'add') {
        this.addVisit(data)
      } else if (this.formModalType === 'edit') {
        this.editVisit(data.id, data)
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
      this.addNewVisit()
      this.emitShortcut()
    }
  }
}
</script>
