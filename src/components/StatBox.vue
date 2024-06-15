<template>
  <div class="stat-box">
    <div class="stat-digit">{{ value }}</div>
    <div class="stat-label">{{ label }}</div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: 'Label'
    }
  }
}
</script>
