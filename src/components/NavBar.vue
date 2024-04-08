<template>
  <header class="bg-gray-200 dark:bg-gray-900 shadow-md">
    <div class="container mx-auto px-4 py-2 flex items-center justify-between">
      <RouterLink to="/">
        <img src="@/assets/logo.svg" alt="MedSys" class="h-32 w-auto" />
      </RouterLink>
      <nav class="space-x-4">
        <RouterLink to="/moja_strona" class="navbar-title-link">Moja strona</RouterLink>
        <RouterLink to="/wizyty" class="navbar-title-link">Wizyty</RouterLink>
        <RouterLink to="/wsparcie" class="navbar-title-link">Wsparcie</RouterLink>
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
