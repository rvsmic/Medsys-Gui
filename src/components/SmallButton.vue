<template>
    <button @click="onClick" :class="getButtonClass()">
        {{ label }}
    </button>
</template>

<script>
export default {
    emits: ['click'],
    props: {
        label: { type: String, required: true },
        type: { type: String, default: 'primary' },
    },
    methods: {
        onClick() {
            this.$emit('click')
        },
        getButtonClass() {
            if (this.type === 'secondary') {
                return 'text-gray-800 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-300 bg-gray-300  border-solid border-1 border-gray-200 dark:border-gray-900 shadow-md shadow-gray-400 dark:shadow-gray-950 hover:shadow-inner hover:shadow-gray-800 dark:hover:shadow-gray-950 hover:bg-gray-400 font-semibold rounded-lg px-5 py-2.5 text-center text-sm dark:bg-gray-800 dark:hover:bg-gray-900'
            } else if (this.type === 'danger') {
                return 'text-gray-200 hover:text-gray-300 dark:text-gray-800 dark:hover:text-gray-300 bg-red-500  border-solid border-1 border-gray-200 dark:border-gray-900 shadow-md shadow-gray-400 dark:shadow-gray-950 hover:shadow-inner hover:shadow-gray-800 dark:hover:shadow-gray-950 hover:bg-red-600 font-semibold rounded-lg px-5 py-2.5 text-center text-sm dark:bg-red-500 dark:hover:bg-red-600'
            } else {
                return 'text-gray-200 hover:text-gray-300 dark:text-gray-800 dark:hover:text-gray-300 bg-logo-medium-green  border-solid border-1 border-gray-200 dark:border-gray-900 shadow-md shadow-gray-400 dark:shadow-gray-950 hover:shadow-inner hover:shadow-gray-800 dark:hover:shadow-gray-950 hover:bg-logo-dark-green font-semibold rounded-lg px-5 py-2.5 text-center text-sm dark:bg-logo-bright-green dark:hover:bg-logo-medium-green'
            }
        }
    }
}
</script>