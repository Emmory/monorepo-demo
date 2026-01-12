<template>
  <div class="min-h-screen p-4 sm:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">Dashboard</h1>
        <p class="opacity-75">Bienvenido de nuevo, {{ user?.name }}! 👋</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="rounded-xl shadow-lg p-6 transition-colors" :class="isDark ? 'bg-gray-800' : 'bg-white'">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold">Total de Tareas</h3>
            <span class="text-3xl">📋</span>
          </div>
          <p class="text-4xl font-bold text-blue-600">{{ tasks.length }}</p>
        </div>

        <div class="rounded-xl shadow-lg p-6 transition-colors" :class="isDark ? 'bg-gray-800' : 'bg-white'">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold">Completadas</h3>
            <span class="text-3xl">✅</span>
          </div>
          <p class="text-4xl font-bold text-green-600">{{ completedTasks.length }}</p>
        </div>

        <div class="rounded-xl shadow-lg p-6 transition-colors" :class="isDark ? 'bg-gray-800' : 'bg-white'">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold">Pendientes</h3>
            <span class="text-3xl">⏳</span>
          </div>
          <p class="text-4xl font-bold text-orange-600">{{ pendingTasks.length }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div class="rounded-xl shadow-lg p-6 transition-colors" :class="isDark ? 'bg-gray-800' : 'bg-white'">
          <h3 class="text-xl font-semibold mb-6">Estado de Tareas</h3>
          <div class="flex justify-center">
            <Doughnut :data="statusChartData" :options="chartOptions" />
          </div>
        </div>

        <div class="rounded-xl shadow-lg p-6 transition-colors" :class="isDark ? 'bg-gray-800' : 'bg-white'">
          <h3 class="text-xl font-semibold mb-6">Prioridad de Tareas</h3>
          <Bar :data="priorityChartData" :options="chartOptions" />
        </div>
      </div>

      <div class="rounded-xl shadow-lg p-6 transition-colors" :class="isDark ? 'bg-gray-800' : 'bg-white'">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-semibold">Tu Ubicación</h3>
          <span class="text-2xl">📍</span>
        </div>
        
        <button
          v-if="!location"
          @click="getLocation"
          :disabled="loading"
          class="px-6 py-3 rounded-lg font-semibold text-white transition-all"
          :class="loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'"
        >
          {{ loading ? 'Obteniendo ubicación...' : 'Obtener mi ubicación' }}
        </button>

        <div v-else class="space-y-2">
          <p><strong>Latitud:</strong> {{ location.latitude }}</p>
          <p><strong>Longitud:</strong> {{ location.longitude }}</p>
          
            <a :href="`https://www.google.com/maps?q=${location.latitude},${location.longitude}`"
            target="_blank"
            rel="noopener"
            class="inline-block text-blue-600 hover:text-blue-700 font-medium"
          >
            Ver en Google Maps
          </a>
        </div>

        <p v-if="error" class="mt-4 p-4 rounded-lg bg-red-100 border border-red-300 text-red-700">
          {{ error }}
        </p>
      </div>

      <div class="mt-8 text-center">
        <NuxtLink
          to="/tasks"
          class="inline-block px-8 py-4 rounded-xl font-bold text-white text-lg transition-all shadow-lg bg-blue-600 hover:bg-blue-700"
        >
          Ver todas las tareas
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '@mi-empresa/interfaces'
import { TaskStatus, TaskPriority } from '@mi-empresa/interfaces'
import { Doughnut, Bar } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

const { user } = useAuth()
const { tasks, completedTasks, pendingTasks, inProgressTasks, loadTasks } = useTasks()
const isDark = useState('isDark')

const location = ref<{ latitude: number; longitude: number } | null>(null)
const loading = ref(false)
const error = ref('')

onMounted(() => {
  loadTasks()
})

const statusChartData = computed(() => ({
  labels: ['Completadas', 'En Progreso', 'Pendientes'],
  datasets: [{
    data: [completedTasks.value.length, inProgressTasks.value.length, pendingTasks.value.length],
    backgroundColor: ['#10b981', '#3b82f6', '#f59e0b']
  }]
}))

const priorityChartData = computed(() => {
  const lowPriority = tasks.value.filter(t => t.priority === 'low').length
  const mediumPriority = tasks.value.filter(t => t.priority === 'medium').length
  const highPriority = tasks.value.filter(t => t.priority === 'high').length

  return {
    labels: ['Baja', 'Media', 'Alta'],
    datasets: [{
      label: 'Cantidad de Tareas',
      data: [lowPriority, mediumPriority, highPriority],
      backgroundColor: ['#10b981', '#f59e0b', '#ef4444']
    }]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true
}

const getLocation = () => {
  if (!navigator.geolocation) {
    error.value = 'Geolocalización no soportada'
    return
  }

  loading.value = true
  error.value = ''

  navigator.geolocation.getCurrentPosition(
    (position) => {
      location.value = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      loading.value = false
    },
    () => {
      error.value = 'No se pudo obtener la ubicación'
      loading.value = false
    }
  )
}
</script>