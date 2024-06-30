<template>
  <LoaderCover v-if="loading" />
  <PageHeader title="Testy laboratoryjne" :actions="headerActions" @addNewTest="addNewTest" />
  <main>
    <DataTable
      :data="tests"
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
    :subtitle="`Chcesz usunąć test ${formData.id}?`"
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
        { field: 'test_type', title: 'Typ testu' },
        { field: 'test_date', title: 'Data testu', type:'date' }
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
        { field: 'test_type', title: 'Typ testu', type: 'text'},
        { field: 'test_date', title: 'Data testu', type: 'date' },
        { field: 'test_result', title: 'Wynik testu', type: 'longtext' },
      ]
    },
    headerActions() {
      return [
        {
          label: 'Dodaj test',
          action: 'addNewTest',
          allowedRoles: [2, 4]
        }
      ]
    },
    formModalTitle() {
      if (this.formModalType === 'add') {
        return 'Dodaj test'
      } else if (this.formModalType === 'edit') {
        return 'Edytuj test'
      } else {
        return 'Zobacz test'
      }
    },
  },
  data() {
    return {
      tests: [],
      loading: false,
      showFormModal: false,
      showDeleteModal: false,
      showInfoModal: false,
      formModalType: undefined,
      formData: {},
      infoModalMessage: undefined,
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
        const response = await serviceApi.getTests(token)
        this.tests = response.data.data
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
    async getTest(id) {
      this.loading = true
      try {
        const token = this.$store.state.token
        const response = await serviceApi.getTest(token, id)
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
    async addTest(test) {
      this.loading = true
      try {
        const token = this.$store.state.token
        await serviceApi.postTest(token, test)
        this.reloadData()
        this.loading = false
        this.infoModalTitle = 'Sukces'
        this.infoModalMessage = 'Nowy test został dodany'
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
    async editTest(id, test) {
      this.loading = true
      try {
        const token = this.$store.state.token
        await serviceApi.patchTest(token, id, test)
        this.reloadData()
        this.loading = false
        this.infoModalMessage = `Test o id ${id} został edytowany`
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
    async deleteTest(id) {
      this.loading = true
      try {
        const token = this.$store.state.token
        await serviceApi.deleteTest(token, id)
        this.reloadData()
        this.loading = false
        this.infoModalMessage = `Test o id ${id} został usunięty`
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
    addNewTest() {
      this.showFormModal = true
      this.formModalType = 'add'
    },
    viewRow(row) {
      this.formModalType = 'view'
      this.getTest(row.id)
    },
    editRow(row) {
      this.formModalType = 'edit'
      this.getTest(row.id)
    },
    deleteRow(row) {
      this.formData = row
      this.showDeleteModal = true
    },
    submitDelete() {
      this.deleteTest(this.formData.id)
      this.showDeleteModal = false
    },
    cancelDelete() {
      this.showDeleteModal = false
    },
    submitForm(data) {
      if (this.formModalType === 'add') {
        this.addTest(data)
      } else if (this.formModalType === 'edit') {
        this.editTest(data.id, data)
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
      this.addNewTest()
      this.emitShortcut()
    }
  }
}
</script>
