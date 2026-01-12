<template>
  <div class="min-h-screen p-4 sm:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 class="text-3xl font-bold mb-2">Mis Tareas</h1>
          <p class="opacity-75">Gestiona tus tareas de forma eficiente</p>
        </div>
        <button
          @click="openCreateModal"
          class="px-6 py-3 rounded-lg font-semibold text-white transition-all shadow-lg bg-blue-600 hover:bg-blue-700 active:scale-95"
        >
          + Nueva Tarea
        </button>
      </div>

      <!-- Filters -->
      <div class="rounded-xl shadow-lg p-6 mb-6 transition-colors" :class="isDark ? 'bg-gray-800' : 'bg-white'">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Search -->
          <input
            v-model="searchQuery"
            type="text"
            placeholder="🔍 Buscar tareas..."
            class="px-4 py-2 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            :class="isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300'"
          />

          <!-- Status Filter -->
          <select
            v-model="filterStatus"
            class="px-4 py-2 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            :class="isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'"
          >
           <option value="">Todos los estados</option>
            <option :value="TaskStatus.PENDING">Pendiente</option>
            <option :value="TaskStatus.IN_PROGRESS">En Progreso</option>
            <option :value="TaskStatus.COMPLETED">Completada</option>
          </select>

          <!-- Priority Filter -->
          <select
            v-model="filterPriority"
            class="px-4 py-2 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            :class="isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'"
          >
           <option value="">Todas las prioridades</option>
            <option :value="TaskPriority.LOW">Baja</option>
            <option :value="TaskPriority.MEDIUM">Media</option>
            <option :value="TaskPriority.HIGH">Alta</option>
          </select>
        </div>
      </div>

      <!-- Table - Desktop -->
      <div class="hidden md:block rounded-xl shadow-lg overflow-hidden transition-colors" :class="isDark ? 'bg-gray-800' : 'bg-white'">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="transition-colors" :class="isDark ? 'bg-gray-700' : 'bg-gray-50'">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Título</th>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Estado</th>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Prioridad</th>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Fecha</th>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y" :class="isDark ? 'divide-gray-700' : 'divide-gray-200'">
              <tr v-for="task in paginatedTasks" :key="task.id" class="hover:bg-opacity-5 transition-colors" :class="isDark ? 'hover:bg-white' : 'hover:bg-gray-900'">
                <td class="px-6 py-4">
                  <div class="font-semibold">{{ task.title }}</div>
                  <div class="text-sm opacity-75">{{ task.description }}</div>
                </td>
                <td class="px-6 py-4">
                  <span class="px-3 py-1 rounded-full text-xs font-semibold" :class="getStatusClass(task.status)">
                    {{ getStatusText(task.status) }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span class="px-3 py-1 rounded-full text-xs font-semibold" :class="getPriorityClass(task.priority)">
                    {{ getPriorityText(task.priority) }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm">{{ formatTaskDate(task.dueDate) }}</td>
                <td class="px-6 py-4">
                  <div class="flex gap-2">
                    <button
                      @click="openEditModal(task)"
                      class="p-2 rounded-lg transition-colors hover:bg-blue-100 text-blue-600"
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      @click="confirmDelete(task.id)"
                      class="p-2 rounded-lg transition-colors hover:bg-red-100 text-red-600"
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Desktop -->
        <div class="px-6 py-4 border-t flex justify-between items-center" :class="isDark ? 'border-gray-700' : 'border-gray-200'">
          <div class="text-sm opacity-75">
            Mostrando {{ startIndex + 1 }} - {{ Math.min(endIndex, filteredTasks.length) }} de {{ filteredTasks.length }} tareas
          </div>
          <div class="flex gap-2">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              :class="isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'"
            >
              Anterior
            </button>
            <button
              @click="currentPage++"
              :disabled="currentPage >= totalPages"
              class="px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              :class="isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>

      <!-- Cards - Mobile -->
      <div class="md:hidden space-y-4">
        <div 
          v-for="task in paginatedTasks" 
          :key="task.id"
          class="rounded-xl shadow-lg p-4 transition-colors"
          :class="isDark ? 'bg-gray-800' : 'bg-white'"
        >
          <!-- Title & Description -->
          <div class="mb-3">
            <h3 class="font-bold text-lg mb-1">{{ task.title }}</h3>
            <p class="text-sm opacity-75">{{ task.description }}</p>
          </div>

          <!-- Status & Priority -->
          <div class="flex gap-2 mb-3">
            <span class="px-3 py-1 rounded-full text-xs font-semibold" :class="getStatusClass(task.status)">
              {{ getStatusText(task.status) }}
            </span>
            <span class="px-3 py-1 rounded-full text-xs font-semibold" :class="getPriorityClass(task.priority)">
              {{ getPriorityText(task.priority) }}
            </span>
          </div>

          <!-- Date -->
          <div class="text-sm opacity-75 mb-3">
            📅 {{ formatTaskDate(task.dueDate) }}
          </div>

          <!-- Actions -->
          <div class="flex gap-2 pt-3 border-t" :class="isDark ? 'border-gray-700' : 'border-gray-200'">
            <button
              @click="openEditModal(task)"
              class="flex-1 px-4 py-2 rounded-lg font-semibold transition-colors bg-blue-600 hover:bg-blue-700 text-white"
            >
              ✏️ Editar
            </button>
            <button
              @click="confirmDelete(task.id)"
              class="flex-1 px-4 py-2 rounded-lg font-semibold transition-colors bg-red-600 hover:bg-red-700 text-white"
            >
              🗑️ Eliminar
            </button>
          </div>
        </div>

        <!-- Pagination Mobile -->
        <div class="flex justify-between items-center pt-4">
          <div class="text-sm opacity-75">
            {{ startIndex + 1 }}-{{ Math.min(endIndex, filteredTasks.length) }} de {{ filteredTasks.length }}
          </div>
          <div class="flex gap-2">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              :class="isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'"
            >
              ←
            </button>
            <button
              @click="currentPage++"
              :disabled="currentPage >= totalPages"
              class="px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              :class="isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div class="w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden transition-colors" :class="isDark ? 'bg-gray-800' : 'bg-white'">
          <div class="px-6 py-4 border-b" :class="isDark ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'">
            <h2 class="text-2xl font-bold">{{ isEditing ? 'Editar Tarea' : 'Nueva Tarea' }}</h2>
          </div>

          <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">Título</label>
              <input
                v-model="formData.title"
                required
                class="w-full px-4 py-2 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 outline-none"
                :class="isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Descripción</label>
              <textarea
                v-model="formData.description"
                rows="3"
                required
                class="w-full px-4 py-2 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 outline-none"
                :class="isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2">Estado</label>
                <select
                  v-model="formData.status"
                  class="w-full px-4 py-2 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 outline-none"
                  :class="isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'"
                >
                  <option :value="TaskStatus.PENDING">Pendiente</option>
                  <option :value="TaskStatus.IN_PROGRESS">En Progreso</option>
                  <option :value="TaskStatus.COMPLETED">Completada</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Prioridad</label>
                <select
                  v-model="formData.priority"
                  class="w-full px-4 py-2 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 outline-none"
                  :class="isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'"
                >
                 <option :value="TaskPriority.LOW">Baja</option>
                  <option :value="TaskPriority.MEDIUM">Media</option>
                  <option :value="TaskPriority.HIGH">Alta</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Fecha límite</label>
                <input
                  v-model="formData.dueDate"
                  type="date"
                  required
                  class="w-full px-4 py-2 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 outline-none"
                  :class="isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'"
                />
              </div>
            </div>

            <div class="flex gap-3 pt-4">
              <button
                type="submit"
                class="flex-1 py-3 rounded-lg font-semibold text-white transition-all bg-blue-600 hover:bg-blue-700"
              >
                {{ isEditing ? 'Guardar Cambios' : 'Crear Tarea' }}
              </button>
              <button
                type="button"
                @click="closeModal"
                class="flex-1 py-3 rounded-lg font-semibold transition-all"
                :class="isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import type { Task, TaskCreate } from '@mi-empresa/interfaces'
import { TaskStatus, TaskPriority } from '@mi-empresa/interfaces'

definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

const { tasks, addTask, updateTask, deleteTask } = useTasks()
const isDark = useState('isDark')

const searchQuery = ref('')
const filterStatus = ref<TaskStatus | ''>('')
const filterPriority = ref<TaskPriority | ''>('')
const currentPage = ref(1)
const itemsPerPage = 5
const showModal = ref(false)
const isEditing = ref(false)
const editingId = ref('')

const formData = ref<TaskCreate>({
  title: '',
  description: '',
  status: TaskStatus.PENDING,
  priority: TaskPriority.MEDIUM,
  dueDate: '',
  userId: '1'
})

const filteredTasks = computed(() => {
  return tasks.value.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = !filterStatus.value || task.status === filterStatus.value
    const matchesPriority = !filterPriority.value || task.priority === filterPriority.value
    return matchesSearch && matchesStatus && matchesPriority
  })
})

const totalPages = computed(() => Math.ceil(filteredTasks.value.length / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => startIndex.value + itemsPerPage)
const paginatedTasks = computed(() => filteredTasks.value.slice(startIndex.value, endIndex.value))

const formatTaskDate = (date: string) => format(new Date(date), 'dd/MM/yyyy')

const getStatusClass = (status: TaskStatus) => {
  const classes = {
    [TaskStatus.PENDING]: 'bg-orange-100 text-orange-800',
    [TaskStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
    [TaskStatus.COMPLETED]: 'bg-green-100 text-green-800'
  }
  return classes[status]
}

const getStatusText = (status: TaskStatus) => {
  const texts = {
    [TaskStatus.PENDING]: 'Pendiente',
    [TaskStatus.IN_PROGRESS]: 'En Progreso',
    [TaskStatus.COMPLETED]: 'Completada'
  }
  return texts[status]
}

const getPriorityClass = (priority: TaskPriority) => {
  const classes = {
    [TaskPriority.LOW]: 'bg-gray-100 text-gray-800',
    [TaskPriority.MEDIUM]: 'bg-yellow-100 text-yellow-800',
    [TaskPriority.HIGH]: 'bg-red-100 text-red-800'
  }
  return classes[priority]
}

const getPriorityText = (priority: TaskPriority) => {
  const texts = {
    [TaskPriority.LOW]: 'Baja',
    [TaskPriority.MEDIUM]: 'Media',
    [TaskPriority.HIGH]: 'Alta'
  }
  return texts[priority]
}

const openCreateModal = () => {
  isEditing.value = false
  Object.assign(formData, {
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: '',
    userId: '1'
  })
  showModal.value = true
}

const openEditModal = (task: Task) => {
  isEditing.value = true
  editingId.value = task.id
  Object.assign(formData, {
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate,
    userId: task.userId
  })
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const handleSubmit = () => {
  if (isEditing.value) {
    updateTask(editingId.value, formData.value)
  } else {
    addTask(formData.value)
  }
  closeModal()
}

const confirmDelete = (id: string) => {
  if (confirm('¿Estás seguro de eliminar esta tarea?')) {
    deleteTask(id)
  }
}
</script>