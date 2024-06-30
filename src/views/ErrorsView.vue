<template>
  <LoaderCover v-if="loading" />
  <PageHeader title="Zgłoszone błędy" />
  <main>
    <DataTable
      :data="errors"
      :columns="columns"
      :canView="role == 4"
      :canEdit="role == 4"
      :canDelete="false"
      @view="viewRow"
      @edit="editRow"
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
    v-if="showInfoModal"
    type="info"
    title="SUKCES"
    :subtitle="infoModalMessage"
    @submit="showInfoModal = false"
  />
</template>

<script>
import errorApi from '@/api/errorApi'
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
        { field: 'title', title: 'Tytuł' },
        { field: 'date', title: 'Data zgłoszenia', type: 'date' },
        { field: 'time', title: 'Godzina zgłoszenia' },
        { field: 'resolved', title: 'Rozwiązane', type: 'bool' }
      ]
    },
    formFields() {
      return [
        { field: 'title', title: 'Tytuł' },
        { field: 'description', title: 'Opis', type: 'longtext' },
        { field: 'date', title: 'Data zgłoszenia', type: 'date', immutable: true },
        { field: 'time', title: 'Godzina zgłoszenia', type: 'time', immutable: true },
        {
          field: 'resolved',
          title: 'Rozwiązane',
          type: 'select',
          options: [
            { value: true, label: 'Tak' },
            { value: false, label: 'Nie' }
          ]
        },
      ]
    },
    formModalTitle() {
      if (this.formModalType === 'edit') {
        return 'Edytuj zgłoszenie'
      } else {
        return 'Zobacz zgłoszenie'
      }
    },
  },
  data() {
    return {
      errors: [],
      loading: false,
      showFormModal: false,
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
        const response = await errorApi.getErrors(token)
        this.errors = response.data.data
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
    async getError(id) {
      this.loading = true
      try {
        const token = this.$store.state.token
        const response = await errorApi.getError(token, id)
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
    async editError(id, err) {
      this.loading = true
      try {
        const token = this.$store.state.token
        await errorApi.patchError(token, id, err)
        this.reloadData()
        this.loading = false
        this.infoModalMessage = `Zgłoszenie o id ${id} zostało edytowane`
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
    viewRow(row) {
      this.formModalType = 'view'
      this.getError(row.id)
    },
    editRow(row) {
      this.formModalType = 'edit'
      this.getError(row.id)
    },
    submitForm(data) {
      if (this.formModalType === 'edit') {
        this.editError(data.id, data)
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
  }
}
</script>
