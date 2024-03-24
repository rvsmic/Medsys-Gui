<template>
   <header>
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-200">Strona domowa</h1>
      </div>
    </header>
    <main>
      <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <p class="text-2xl font-semibold text-gray-800 dark:text-gray-300">Wiadomość z api: "{{ message }}"</p>
      </div>
    </main>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      message: ''
    }
  },
  mounted () {
    axios.get(import.meta.env.VITE_API_ADDR).then(
      response => (
        this.message = response.data
      )
    ).catch(
      error => console.log(error)
    )
  }
}
</script>