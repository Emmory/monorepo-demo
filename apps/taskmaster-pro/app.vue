<template>
  <div class="min-h-screen transition-colors duration-200" :class="{ 'bg-gray-900 text-white': isDark, 'bg-gray-50 text-gray-900': !isDark }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const isDark = useState('isDark', () => false)

onMounted(() => {
  if (process.client) {
    const saved = localStorage.getItem('darkMode')
    isDark.value = saved === 'true'
  }
})

watch(isDark, (newValue) => {
  if (process.client) {
    localStorage.setItem('darkMode', String(newValue))
  }
})
</script>