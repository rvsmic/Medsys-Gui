<template>
  <header>
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="big-title">Strona domowa</h1>
    </div>
  </header>
  <main>
    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <p class="text-2xl font-semibold text-gray-800 dark:text-gray-300">
        Wiadomość z api: "{{ message }}"
      </p>
    </div>
  </main>
</template>

<script>
import homeApi from '@/api/homeApi.js'

export default {
  emits: ['error'],
  data() {
    return {
      message: ''
    }
  },
  methods: {
    async fetchMessage() {
      try {
        const response = await homeApi.getPong()
        this.message = response.data
      } catch (error) {
        this.emitError(error)
      }
    },
    emitError(error) {
      this.$emit('error', error)
    }
  },
  mounted() {
    this.fetchMessage()
  }
}
</script>
