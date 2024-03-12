<template>
    <header class="bg-gray-200 dark:bg-gray-900 shadow-md">
        <div class="container mx-auto px-4 py-2 flex items-center justify-between">
            <RouterLink to="/">
                <img src="@/assets/logo.svg" alt="Medsys" class="h-32 w-auto" />
            </RouterLink>
            <nav class="space-x-4">
                <RouterLink to="/moja_strona" class="text-gray-900 dark:text-gray-200 hover:text-logo-medium-green dark:hover:text-logo-bright-green text-xl font-semibold">Moja strona</RouterLink>
                <RouterLink to="/wizyty" class="text-gray-900 dark:text-gray-200 hover:text-logo-medium-green dark:hover:text-logo-bright-green text-xl font-semibold">Wizyty</RouterLink>
                <RouterLink to="/wsparcie" class="text-gray-900 dark:text-gray-200 hover:text-logo-medium-green dark:hover:text-logo-bright-green text-xl font-semibold">Wsparcie</RouterLink>
            </nav>
        </div>
    </header>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
    components: {
        RouterLink
    }
}
</script>

<style scoped>
</style>