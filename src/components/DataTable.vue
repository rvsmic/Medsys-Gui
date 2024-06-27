<template>
  <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
    <Vue3Datatable
      :rows="tableData"
      :columns="tableColumns"
      :sortable="sortable"
      :columnFilter="filterable"
      skin="bh-table-hover"
    >
      <template #id="data">
        <strong>{{ data.value.id }}</strong>
      </template>
      <template #resolved="data">
        <div v-if="data.value.resolved" class="font-semibold text-gray-200 dark:text-gray-900 bg-logo-medium-green dark:bg-logo-bright-green rounded-full shadow-inner shadow-gray-700 dark:shadow-gray-950 w-16 py-1 text-center">TAK</div>
        <div v-else class="font-semibold text-gray-200 dark:text-gray-900 bg-red-400 dark:bg-red-500 rounded-full shadow-inner shadow-gray-700 dark:shadow-gray-950 w-16 py-1 text-center">NIE</div>
      </template>
      <template #actions="data">
        <div class="flex gap-2 justify-center">
          <RowButton v-if="canView" type="view" @click="viewRow(data.value)" />
          <RowButton v-if="canEdit" type="edit" @click="editRow(data.value)" />
          <RowButton v-if="canDelete" type="delete" @click="deleteRow(data.value)" />
        </div>
      </template>
    </Vue3Datatable>
  </div>
</template>

<script>
import Vue3Datatable from '@bhplugin/vue3-datatable'
import RowButton from '@/components/RowButton.vue'
import '@bhplugin/vue3-datatable/dist/style.css'

export default {
  emits: ['edit', 'delete', 'view'],
  components: {
    Vue3Datatable,
    RowButton
  },
  props: {
    data: { type: Array, default: () => [] },
    columns: { type: Array, default: () => [] },
    sortable: { type: Boolean, default: true },
    filterable: { type: Boolean, default: true },
    canView: { type: Boolean, default: false },
    canEdit: { type: Boolean, default: false },
    canDelete: { type: Boolean, default: false }
  },
  data() {
    return {
      tableData: [],
      tableColumns: []
    }
  },
  methods: {
    viewRow(data) {
      this.$emit('view', data)
    },
    editRow(data) {
      this.$emit('edit', data)
    },
    deleteRow(data) {
      this.$emit('delete', data)
    }
  },
  watch: {
    data: {
      handler(newVal) {
        this.tableData = newVal
      },
      immediate: true
    },
    columns: {
      handler(newVal) {
        this.tableColumns = newVal
        if ((this.canView || this.canEdit || this.canDelete) && !this.tableColumns.some(e => e.field === 'actions')) {
          this.tableColumns.push({ field: 'actions', title: 'Akcje', filter: false, sort: false })
        }
      },
      immediate: true
    }
  }
}
</script>

<style>
.bh-table-hover tbody tr:hover td {
  background-color: #e5e7eb;
}
.bh-datatable {
  & table thead tr,
  table tbody tr,
  table tfoot tr {
    color: #000;
    background-color: #e5e7eb;
  }

  & table tbody tr {
    background-color: #f3f4f6;
    border-bottom: 1px solid #e5e7eb;
    box-shadow: 0 2px 3px rgba(90, 90, 90, 0.5);
  }

  & table tbody tr:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(99, 99, 99, var(--tw-bg-opacity)) !important;
  }

  & .bh-form-control {
    background-color: #f9fafb !important;
    color: #000 !important;
    box-shadow: inset 0 2px 3px rgba(90, 90, 90, 0.5);
  }

  & .bh-table-responsive table th .bh-filter > button {
    background-color: #f3f4f6;
    border-width: 0;
    color: #aaaaaa;
  }

  & .bh-filter-menu button {
    background-color: #e5e7eb;
    color: #000;
  }

  & .bh-pagination {
    color: #000;
  }

  & .\!bh-bg-white {
    background-color: #e5e7eb !important;
    color: #000 !important;

    & .bh-skeleton-box {
      background-color: #f9fafb !important;
      color: #000 !important;
    }
  }

  & .bh-pagination .bh-page-item.bh-active {
    background-color: #42841f;
    border-color: #42841f;
    color: #e5e7eb;
  }

  & .bh-pagination .bh-page-item {
    background-color: #e5e7eb;
    border-width: 0;
    color: #000;
    box-shadow: 0 2px 3px rgba(90, 90, 90, 0.5);
  }

  & .bh-pagination .bh-page-item:hover {
    background-color: #42841f;
    border-width: 0;
    color: #e5e7eb;
    box-shadow: inset 0 2px 3px rgba(90, 90, 90, 0.5);
  }

  & .bh-table-responsive table th .bh-filter > .bh-form-control {
    fill: #42841f;
    border-width: 0;
  }

  & .bh-text-black\/20 {
    fill: #f9fafb;
    border-width: 0;
  }

  & .\!bh-text-primary {
    fill: #42841f;
    border-width: 0;
  }

  & .bh-pagination-info .bh-pagesize {
    color: #000;
    border-width: 0;
    width: 55px;
    height: 30px;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%2342841F'><polygon points='0,0 100,0 50,50'/></svg>")
      no-repeat;
    background-size: 10px;
    background-position: 85% 60%;
    background-repeat: no-repeat;
    background-color: #e5e7eb;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    box-shadow: inset 0 2px 3px rgba(90, 90, 90, 0.5);
  }

  & .bh-form-control {
    color: #000;
    border-width: 0;
    width: 55px;
    height: 30px;
    background: #e5e7eb;
    background-size: 10px;
    background-position: 85% 60%;
    background-repeat: no-repeat;
    background-color: #e5e7eb;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    box-shadow: inset 0 2px 3px rgba(90, 90, 90, 0.5);
  }
}

@media (prefers-color-scheme: dark) {
  .bh-table-hover tbody tr:hover td {
    background-color: #111827;
  }
  .bh-datatable {
    & table thead tr,
    table tbody tr,
    table tfoot tr {
      color: #fff;
      background-color: #111827;
    }

    & table tbody tr {
      background-color: #1f2937;
      border-bottom: 1px solid #111827;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
    }

    & table tbody tr:hover {
      --tw-bg-opacity: 1;
      background-color: rgba(99, 99, 99, var(--tw-bg-opacity)) !important;
    }

    & .bh-form-control {
      background-color: #374151 !important;
      color: #fff !important;
      box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.5);
    }

    & .bh-table-responsive table th .bh-filter > button {
      background-color: #1f2937;
      border-width: 0;
      color: #aaaaaa;
    }

    & .bh-filter-menu button {
      background-color: #111827;
      color: #fff;
    }

    & .bh-pagination {
      color: #fff;
    }

    & .\!bh-bg-white {
      background-color: #111827 !important;
      color: #fff !important;

      & .bh-skeleton-box {
        background-color: #374151 !important;
        color: #fff !important;
      }
    }

    & .bh-pagination .bh-page-item.bh-active {
      background-color: #5ed122;
      border-color: #5ed122;
      color: #111827;
    }

    & .bh-pagination .bh-page-item {
      background-color: #111827;
      border-width: 0;
      color: #fff;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
    }

    & .bh-pagination .bh-page-item:hover {
      background-color: #5ed122;
      border-width: 0;
      color: #111827;
      box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.5);
    }

    & .bh-table-responsive table th .bh-filter > .bh-form-control {
      fill: #5ed122;
      border-width: 0;
    }

    & .bh-text-black\/20 {
      fill: #374151;
      border-width: 0;
    }

    & .\!bh-text-primary {
      fill: #5ed122;
      border-width: 0;
    }

    & .bh-pagination-info .bh-pagesize {
      color: #fff;
      border-width: 0;
      width: 55px;
      height: 30px;
      background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%235ed122'><polygon points='0,0 100,0 50,50'/></svg>")
        no-repeat;
      background-size: 10px;
      background-position: 80% center;
      background-repeat: no-repeat;
      background-color: #111827;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.5);
    }

    & .bh-form-control {
      color: #fff;
      border-width: 0;
      width: 55px;
      height: 30px;
      background: #111827;
      background-size: 10px;
      background-position: 80% center;
      background-repeat: no-repeat;
      background-color: #111827;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
