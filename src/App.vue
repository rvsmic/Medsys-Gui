<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <body class="bg-gray-100 dark:bg-gray-800">
    <NavBar/>
    <div class="container mx-auto my-10 px-4 py-3 bg-inherit">
      <RouterView/>
    </div>
  </body>
</template>
