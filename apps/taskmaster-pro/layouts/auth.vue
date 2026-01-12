<template>
  <div class="min-h-screen transition-colors" :class="isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'">
    <slot />
  </div>
</template>

<script setup lang="ts">
const isDark = useState('isDark')
</script>