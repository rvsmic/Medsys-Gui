<template>
  <ErrorWindow v-if="error" :error="error" @dismissError="dismissError" />
  <body class="bg-gray-100 dark:bg-gray-800">
    <NavBar />
    <div class="container mx-auto my-10 px-4 py-3 bg-inherit">
      <RouterView @error="receiveError" />
    </div>
  </body>
</template>

<script>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import ErrorWindow from '@/components/ErrorWindow.vue'

export default {
  components: {
    RouterView,
    NavBar,
    ErrorWindow
  },
  data() {
    return {
      error: undefined
    }
  },
  methods: {
    receiveError(error) {
      this.error = error
    },
    dismissError() {
      this.error = undefined
    }
  }
}
</script>
