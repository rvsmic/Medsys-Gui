<template>
    <header>
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 class="big-title">{{ title }}</h1>
            <div class="flex ml-auto">
                <template v-for="action in actions" :key="action.label">
                    <div v-if="action.allowedRoles.includes($store.state.role)">
                        <SmallButton :label="action.label" @click="$emit(action.action)" />
                        <div class="pl-2" />
                    </div>
                </template>
            </div>
            </div>
        </header>
</template>

<script>
import SmallButton from '@/components/SmallButton.vue'
export default {
    components: {
        SmallButton
    },
    props: {
        title: {
            type: String,
            required: true
        },
        actions: {
            type: Array,
            default: () => []
        }
    },
}
</script>
