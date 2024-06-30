<template>
  <div class="
    bg-gray-200 dark:bg-gray-900 shadow-inner rounded-lg py-5
    text-gray-800  dark:text-gray-200
    border-1 border-gray-200 dark:border-gray-900
    shadow-gray-400 dark:shadow-gray-950
    overflow-hidden
  ">
    <div v-for="(column, index) in columns" :key="index">
      <div class="
        px-10 py-2 grid grid-cols-2
        hover:bg-gray-100 hover:dark:bg-gray-800
        hover:shadow-md shadow-gray-400 dark:shadow-gray-950
      ">
        <div class="font-semibold">
          {{ column.title }}
        </div>
        <div>
          {{ data[column.field] }}
        </div>
      </div>
      <hr v-if="index != columns.length - 1" class="border-gray-300 dark:border-gray-800 mx-10" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: { type: Object, default: () => {} },
    columns: { type: Array, default: () => [] }
  },
}
</script>