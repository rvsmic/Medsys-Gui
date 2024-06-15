<template>
  <div class="bg-box">
    <div class="bg-rotate">
      <img src="@/assets/logo.svg" class="bg" />
    </div>
    <div class="bg-fg" />
  </div>

  <section style="position: relative">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Zaloguj się do konta MedSys
          </h1>
          <form class="space-y-4 md:space-y-6">
            <div>
              <label
                for="login"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Login</label
              >
              <input
                type="text"
                name="login"
                id="login"
                v-model="login"
                :disabled="loading"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-logo-dark-green block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-logo-medium-green"
                placeholder="Login"
                required
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Hasło</label
              >
              <input
                type="password"
                name="password"
                id="password"
                v-model="password"
                :disabled="loading"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-logo-dark-green block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-logo-medium-green"
                required
              />
            </div>
            <div
              v-if="loginFailed && password.length === 0"
              class="flex w-full justify-center text-sm font-semibold text-red-700 dark:text-red-500"
            >
              Błędne dane logowania!
            </div>
            <button
              v-if="!loading"
              @click="onLogin"
              class="w-full text-white bg-logo-dark-green hover:bg-logo-darkest-green font-medium rounded-lg px-5 py-2.5 text-center dark:bg-logo-medium-green dark:hover:bg-logo-dark-green"
            >
              Zaloguj się
            </button>
            <div v-else class="loader"></div>
            <p v-if="loginFailed" class="text-xs font-light text-gray-500 dark:text-gray-400">
              Problemy z logowaniem?
              <span class="font-semibold text-primary-600 dark:text-primary-500"
                >Zgłoś się do service desku!</span
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import loginApi from '@/api/loginApi'

export default {
  emits: ['error'],
  data() {
    return {
      login: '',
      password: '',
      loginFailed: false,
      loading: false
    }
  },
  methods: {
    async onLogin() {
      this.loading = true
      try {
        const response = await loginApi.postLogin(this.login, this.password)
        this.$store.commit('login', {
          token: response.data.data.token,
          role: response.data.data.role_id
        })
        this.loading = false
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.loginFailed = true
          this.password = ''
          this.loading = false
          return
        }
        this.loginFailed = true
        this.password = ''
        this.loading = false
        this.emitError(error)
      }
    },
    emitError(error) {
      this.$emit('error', error)
    }
  }
}
</script>

<style scoped>
.bg-box {
  position: absolute;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
}

.bg {
  position: absolute;
  height: 100vh;
  width: 100vw;
  -webkit-animation: scale 15s ease-in-out infinite;
  -moz-animation: scale 15s ease-in-out infinite;
  animation: scale 15s ease-in-out infinite;
}

.bg-rotate {
  position: absolute;
  height: 100vh;
  width: 100vw;
  -webkit-animation: spin 60s linear infinite;
  -moz-animation: spin 60s linear infinite;
  animation: spin 60s linear infinite;
}

.bg-fg {
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: rgba(255, 255, 255, 0.6);
  -webkit-backdrop-filter: saturate(180%) blur(100px);
  backdrop-filter: saturate(180%) blur(100px);
}

@media (prefers-color-scheme: dark) {
  .bg-fg {
    background-color: rgba(0, 0, 0, 0.6);
  }
}

@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-moz-keyframes scale {
  0% {
    -moz-transform: scale(1);
  }
  50% {
    -moz-transform: scale(1.2);
  }
  100% {
    -moz-transform: scale(1);
  }
}
@-webkit-keyframes scale {
  0% {
    -webkit-transform: scale(1);
  }
  50% {
    -webkit-transform: scale(1.2);
  }
  100% {
    -webkit-transform: scale(1);
  }
}
@keyframes scale {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  50% {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

.loader {
  margin: 0 auto;
  padding-right: 35px;
  padding-left: 5px;
  height: 10px;
  aspect-ratio: 8;
  display: grid;
}
.loader:before,
.loader:after {
  content: '';
  grid-area: 1/1;
  --_g: no-repeat radial-gradient(farthest-side, #42841f 94%, #0000);
  background:
    var(--_g) left,
    var(--_g) right;
  background-size: 25% 100%;
  animation: l34 1s infinite;
  transform: translate(var(--d, 0)) rotate(0);
}
@media (prefers-color-scheme: dark) {
  .loader:before,
  .loader:after {
    content: '';
    grid-area: 1/1;
    --_g: no-repeat radial-gradient(farthest-side, #5ed122 94%, #0000);
    background:
      var(--_g) left,
      var(--_g) right;
    background-size: 25% 100%;
    animation: l34 1s infinite;
    transform: translate(var(--d, 0)) rotate(0);
  }
}
.loader:after {
  --d: 37.5%;
  animation-delay: 0.5s;
}
@keyframes l34 {
  50%,
  100% {
    transform: translate(var(--d, 0)) rotate(0.5turn);
  }
}
</style>
