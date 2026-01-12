<template>
  <div class="min-h-screen flex items-center justify-center p-4 transition-colors" :class="isDark ? 'bg-gray-900' : 'bg-gray-50'">
    <div class="w-full max-w-md">
      <!-- Card -->
      <div class="rounded-2xl shadow-xl overflow-hidden transition-colors" :class="isDark ? 'bg-gray-800' : 'bg-white'">
        <!-- Header -->
        <div class="p-8 text-center" :class="isDark ? 'bg-gradient-to-r from-blue-600 to-blue-800' : 'bg-gradient-to-r from-blue-500 to-blue-700'">
          <div class="text-6xl mb-4">📋</div>
          <h1 class="text-3xl font-bold text-white mb-2">TaskMaster Pro</h1>
          <p class="text-blue-100">Gestiona tus tareas de forma eficiente</p>
        </div>

        <!-- Form -->
        <div class="p-8">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Email -->
            <div>
              <label class="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                v-model="email"
                type="email"
                required
                placeholder="tu@email.com"
                class="w-full px-4 py-3 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                :class="isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'"
              />
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm font-medium mb-2">
                Contraseña
              </label>
              <input
                v-model="password"
                type="password"
                required
                placeholder="••••••••"
                class="w-full px-4 py-3 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                :class="isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'"
              />
            </div>

            <!-- Error Message -->
            <div v-if="error" class="p-4 rounded-lg bg-red-100 border border-red-300 text-red-700">
              {{ error }}
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full py-3 rounded-lg font-semibold text-white transition-colors bg-blue-600 hover:bg-blue-700 active:scale-95 transform"
            >
              Iniciar Sesión
            </button>
          </form>

          <!-- Demo Info -->
          <div class="mt-6 p-4 rounded-lg text-sm" :class="isDark ? 'bg-gray-700' : 'bg-gray-50'">
            <p class="font-semibold mb-2">💡 Demo:</p>
            <p class="opacity-75">Usa cualquier email y contraseña para ingresar</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const { login } = useAuth()
const router = useRouter()
const isDark = useState('isDark')

const email = ref('')
const password = ref('')
const error = ref('')

const handleSubmit = () => {
  if (login(email.value, password.value)) {
    router.push('/dashboard')
  } else {
    error.value = 'Credenciales inválidas'
  }
}
</script>