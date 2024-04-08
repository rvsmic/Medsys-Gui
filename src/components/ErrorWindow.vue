<template>
  <div class="alert-bg">
    <div class="alert-box" role="alert">
      <div class="bg-red-700 text-white font-bold rounded-t-xl px-4 py-2">
        <div>Error</div>
        <button @click="dismissError" class="exit-button">
          <div class="bg-red-900 hover:bg-red-700 rounded-full px-1 py-1">
            <svg
              fill="#FFAAAA"
              height="12px"
              width="12px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 460.775 460.775"
              xml:space="preserve"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"
                ></path>
              </g>
            </svg>
          </div>
        </button>
      </div>
      <div
        class="border border-t-0 border-red-700 rounded-b-xl bg-red-100 px-4 pt-3 pb-1 text-red-700"
      >
        <p class="pb-3" style="white-space: pre">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: Object
  },
  emits: ['dismiss-error'],
  data() {
    return {
      errorMessage: undefined
    }
  },
  methods: {
    prepareError() {
      if (this.error.response) {
        this.errorMessage = 'Response error:\n' + this.error
      } else if (this.error.request) {
        this.errorMessage = 'Request error:\n' + this.error
      } else {
        this.errorMessage = this.error.message
      }
    },
    dismissError() {
      this.$emit('dismiss-error')
    }
  },
  mounted() {
    this.prepareError()
  }
}
</script>

<style scoped>
.alert-bg {
  background: rgba(30, 0, 0, 0.6);
  -webkit-backdrop-filter: saturate(180%) blur(15px);
  backdrop-filter: saturate(180%) blur(15px);
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
}
.alert-box {
  z-index: 100;
  position: absolute;
  width: 30%;
  height: 10%;
  text-align: center;
}
.exit-button {
  position: absolute;
  left: 10px;
  top: 10px;
}
</style>
