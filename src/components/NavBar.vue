<template>
  <header class="bg-gray-200 dark:bg-gray-900 shadow-md z-10 h-36">
    <div class="container mx-auto px-4 py-2 flex items-center justify-between">
      <RouterLink to="/">
        <img src="@/assets/logo.svg" alt="MedSys" class="h-32 w-auto" />
      </RouterLink>
      <nav class="space-x-4">
        <RouterLink to="/wizyty" class="navbar-title-link">Wizyty</RouterLink>
        <span class="navbar-title-separator">|</span>
        <RouterLink to="/testy" class="navbar-title-link" v-if="role == 1 || role == 2 || role == 4">Testy</RouterLink>
        <span class="navbar-title-separator" v-if="role == 1 || role == 2 || role == 4">|</span>
        <RouterLink to="/recepty" class="navbar-title-link" v-if="role == 1 || role == 2 || role == 4">Recepty</RouterLink>
        <span class="navbar-title-separator" v-if="role == 1 || role == 2 || role == 4">|</span>
        <RouterLink to="/pacjenci" class="navbar-title-link">Pacjenci</RouterLink>
        <span class="navbar-title-separator">|</span>
        <RouterLink to="/personel" class="navbar-title-link" v-if="role == 1 || role == 3 || role == 4">Personel</RouterLink>
        <span class="navbar-title-separator" v-if="role == 1 || role == 3 || role == 4">|</span>
        <RouterLink to="/moja-strona" class="navbar-title-link">Moja strona</RouterLink>
        <button
          @click="logout"
          class="text-gray-900 hover:text-gray-200 dark:text-gray-300 dark:hover:text-gray-900 bg-gray-100 border-solid border-1 border-gray-200 dark:border-gray-900 shadow-sm shadow-gray-400 dark:shadow-gray-950 hover:shadow-inner hover:shadow-gray-800 dark:hover:shadow-gray-950 hover:bg-logo-medium-green font-semibold rounded-lg px-5 py-2.5 text-center text-xl dark:bg-gray-800 dark:hover:bg-logo-bright-green"
        >
          Wyloguj
        </button>
      </nav>
    </div>
  </header>
</template>

<script>
import loginApi from '@/api/loginApi'
import { RouterLink } from 'vue-router'

export default {
  props: {
    role: {
      type: Number,
      default: 1
    }
  },
  components: {
    RouterLink
  },
  methods: {
    async logout() {
      const token = this.$store.state.token
      this.$store.commit('logout')
      try {
        await loginApi.postLogout(token)
      } catch (error) {
        this.emitError(error)
      }
      this.$router.push('/')
    }
  }
}
</script>
