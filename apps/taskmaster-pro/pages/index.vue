<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="spinner"></div>
  </div>
</template>

<script setup lang="ts">
const { checkAuth, isAuthenticated } = useAuth()
const router = useRouter()

onMounted(() => {
  checkAuth()

  if (isAuthenticated.value) {
    router.push('/dashboard')
  } else {
    router.push('/login')
  }
})
</script>