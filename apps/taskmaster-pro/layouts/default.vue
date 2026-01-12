<template>
  <div>
    <!-- Navbar -->
    <nav class="border-b transition-colors" :class="isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center gap-3">
            <div class="text-2xl">📋</div>
            <h1 class="text-xl font-bold">TaskMaster Pro</h1>
          </div>

          <!-- Desktop Nav -->
          <div class="hidden md:flex items-center gap-4">
            <NuxtLink 
              to="/dashboard" 
              class="px-3 py-2 rounded-lg transition-colors hover:bg-opacity-10"
              :class="isDark ? 'hover:bg-white' : 'hover:bg-gray-900'"
            >
              Dashboard
            </NuxtLink>
            <NuxtLink 
              to="/tasks" 
              class="px-3 py-2 rounded-lg transition-colors hover:bg-opacity-10"
              :class="isDark ? 'hover:bg-white' : 'hover:bg-gray-900'"
            >
              Tareas
            </NuxtLink>

            <button 
              @click="toggleDarkMode"
              class="p-2 rounded-lg transition-colors hover:bg-opacity-10"
              :class="isDark ? 'hover:bg-white' : 'hover:bg-gray-900'"
              :title="isDark ? 'Modo claro' : 'Modo oscuro'"
            >
              <span class="text-xl">{{ isDark ? '☀️' : '🌙' }}</span>
            </button>

            <div class="flex items-center gap-3">
              <img 
                v-if="user?.avatar" 
                :src="user.avatar" 
                :alt="user.name"
                class="w-8 h-8 rounded-full"
              />
              <span class="font-medium">{{ user?.name }}</span>
              <button 
                @click="handleLogout"
                class="px-4 py-2 rounded-lg transition-colors"
                :class="isDark ? 'bg-red-900 hover:bg-red-800 text-white' : 'bg-red-600 hover:bg-red-700 text-white'"
              >
                Salir
              </button>
            </div>
          </div>

          <!-- Mobile Menu Button -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-lg"
          >
            <span class="text-2xl">☰</span>
          </button>
        </div>

        <!-- Mobile Menu -->
        <div v-if="mobileMenuOpen" class="md:hidden py-4 space-y-2">
          <NuxtLink 
            to="/dashboard" 
            class="block px-4 py-2 rounded-lg transition-colors"
            :class="isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'"
            @click="mobileMenuOpen = false"
          >
            Dashboard
          </NuxtLink>
          <NuxtLink 
            to="/tasks" 
            class="block px-4 py-2 rounded-lg transition-colors"
            :class="isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'"
            @click="mobileMenuOpen = false"
          >
            Tareas
          </NuxtLink>

          <div class="flex items-center justify-between px-4 py-2">
            <span>Modo {{ isDark ? 'claro' : 'oscuro' }}</span>
            <button 
              @click="toggleDarkMode"
              class="p-2 rounded-lg"
            >
              <span class="text-xl">{{ isDark ? '☀️' : '🌙' }}</span>
            </button>
          </div>

          <div class="px-4 py-2 flex items-center gap-3">
            <img 
              v-if="user?.avatar" 
              :src="user.avatar" 
              :alt="user.name"
              class="w-8 h-8 rounded-full"
            />
            <span class="font-medium">{{ user?.name }}</span>
          </div>

          <button 
            @click="handleLogout"
            class="w-full mx-4 px-4 py-2 rounded-lg text-white transition-colors"
            :class="isDark ? 'bg-red-900 hover:bg-red-800' : 'bg-red-600 hover:bg-red-700'"
            style="width: calc(100% - 2rem);"
          >
            Salir
          </button>
        </div>
      </div>
    </nav>

    <!-- Page Content -->
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { user, logout } = useAuth()
const router = useRouter()
const isDark = useState('isDark')
const mobileMenuOpen = ref(false)

const toggleDarkMode = () => {
  isDark.value = !isDark.value
}

const handleLogout = () => {
  logout()
  router.push('/login')
  mobileMenuOpen.value = false
}
</script>