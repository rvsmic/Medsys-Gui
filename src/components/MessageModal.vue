<template>
    <div class="modal-bg">
        <div class="bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg p-4">
            <div class="px-4">
                <h2 class="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">{{ title }}</h2>
                <div v-if="subtitle" class="mt-2">
                    <p class="text-center text-gray-800 dark:text-gray-200">{{ subtitle }}</p>
                </div>
            </div>
            <div v-if="type === 'info'" class="mt-6 flex justify-center">
                <SmallButton label="Ok" @click="onSubmit" />
            </div>
            <div v-if="type === 'error'" class="mt-6 flex justify-center">
                <SmallButton label="Ok" type="danger" @click="onSubmit" />
            </div>
            <div v-if="type === 'delete'" class="mt-6 flex justify-center">
                <SmallButton label="Anuluj" type="secondary" @click="onCancel" />
                <div class="pl-2" />
                <SmallButton label="Potwierdź" type="danger" @click="onSubmit" />
            </div>
        </div>
    </div>
</template>

<script>
import SmallButton from '@/components/SmallButton.vue'

export default {
    emits: ['cancel', 'submit'],
    components: {
        SmallButton
    },
    props: {
        type: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        subtitle: {
            type: String,
            required: false
        }
    },
    methods: {
        onCancel() {
            this.$emit('cancel')
        },
        onSubmit() {
            this.$emit('submit')
        }
    }
}
</script>

<style scoped>
.modal-bg {
  background: rgba(0, 0, 0, 0.2);
  -webkit-backdrop-filter: saturate(180%) blur(10px);
  backdrop-filter: saturate(180%) blur(10px);
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 8;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>