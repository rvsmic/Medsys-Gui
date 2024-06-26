<template>
  <ErrorWindow v-if="error" :error="error" @dismissError="dismissError" />
  <LoginView v-if="!loggedIn" @error="receiveError" />
  <MessageModal v-if="showLogoutModal" type="info" title="UWAGA" subtitle="Sesja wygasła, zaloguj się ponownie!" @submit="logout" />
  <div v-if="role == 4" class="text-2xl font-semibold text-center py-3 bg-amber-400 dark:bg-yellow-500 shadow-inner shadow-gray-400 dark:shadow-gray-950">
    ADMIN
  </div>
  <body v-if="loggedIn" class="bg-gray-100 dark:bg-gray-800">
    <NavBar :role="role" />
    <div class="container mx-auto my-10 px-4 py-3 bg-inherit">
      <RouterView :role="role" :shortcut="shortcut" @error="receiveError" @enableShortcut="enableShortcut" @logout="receiveLogout" />
    </div>
  </body>
</template>

<script>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import ErrorWindow from '@/components/ErrorWindow.vue'
import LoginView from '@/views/LoginView.vue'
import MessageModal from '@/components/MessageModal.vue'

export default {
  components: {
    RouterView,
    NavBar,
    ErrorWindow,
    LoginView,
    MessageModal
  },
  data() {
    return {
      error: undefined,
      shortcut: false,
      showLogoutModal: false
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn
    },
    role() {
      return this.$store.state.role
    }
  },
  methods: {
    receiveError(error) {
      this.error = error
    },
    dismissError() {
      this.error = undefined
    },
    enableShortcut(state) {
      this.shortcut = state
    },
    receiveLogout() {
      this.showLogoutModal = true
    },
    async logout() {
      this.$store.commit('logout')
      this.$router.push('/')
      this.showLogoutModal = false
    }
  }
}
</script>
