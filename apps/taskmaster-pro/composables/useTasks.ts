import type { Task, TaskCreate } from '@mi-empresa/interfaces'
import { TaskStatus, TaskPriority } from '@mi-empresa/interfaces'
import { formatDate } from '@mi-empresa/utils'

export const useTasks = () => {
  const tasks = useState<Task[]>('tasks', () => [])
  
  const completedTasks = computed(() => 
    tasks.value.filter(task => task.status === TaskStatus.COMPLETED)
  )
  
  const pendingTasks = computed(() => 
    tasks.value.filter(task => task.status === TaskStatus.PENDING)
  )
  
  const inProgressTasks = computed(() => 
    tasks.value.filter(task => task.status === TaskStatus.IN_PROGRESS)
  )
  
  const loadTasks = () => {
    if (process.client) {
      const saved = localStorage.getItem('tasks')
      if (saved) {
        tasks.value = JSON.parse(saved) as Task[]
      } else {
        initializeDemoTasks()
      }
    }
  }
  
  const saveTasks = () => {
    if (process.client) {
      localStorage.setItem('tasks', JSON.stringify(tasks.value))
    }
  }
  
  const initializeDemoTasks = () => {
    tasks.value = [
      {
        id: '1',
        title: 'Completar documentación del proyecto',
        description: 'Escribir la documentación técnica completa',
        status: TaskStatus.COMPLETED,
        priority: TaskPriority.HIGH,
        dueDate: '2026-01-14',
        createdAt: '2026-01-10',
        userId: '1'
      },
      {
        id: '2',
        title: 'Implementar sistema de autenticación',
        description: 'Configurar login y protección de rutas',
        status: TaskStatus.COMPLETED,
        priority: TaskPriority.HIGH,
        dueDate: '2026-01-12',
        createdAt: '2026-01-10',
        userId: '1'
      },
      {
        id: '3',
        title: 'Diseñar interfaz de usuario',
        description: 'Crear mockups y prototipos de la UI',
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.MEDIUM,
        dueDate: '2026-01-15',
        createdAt: '2026-01-11',
        userId: '1'
      },
      {
        id: '4',
        title: 'Integrar APIs externas',
        description: 'Conectar servicios de terceros necesarios',
        status: TaskStatus.PENDING,
        priority: TaskPriority.MEDIUM,
        dueDate: '2026-01-18',
        createdAt: '2026-01-11',
        userId: '1'
      },
      {
        id: '5',
        title: 'Configurar deployment en producción',
        description: 'Setup de CI/CD y configuración de servidor',
        status: TaskStatus.PENDING,
        priority: TaskPriority.HIGH,
        dueDate: '2026-01-20',
        createdAt: '2026-01-12',
        userId: '1'
      },
      {
        id: '6',
        title: 'Escribir tests unitarios',
        description: 'Cobertura de tests para componentes críticos',
        status: TaskStatus.PENDING,
        priority: TaskPriority.LOW,
        dueDate: '2026-01-25',
        createdAt: '2026-01-12',
        userId: '1'
      }
    ]
    saveTasks()
  }
  
  const addTask = (taskData: TaskCreate) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    }
    tasks.value.push(newTask)
    saveTasks()
  }
  
  const updateTask = (id: string, taskData: Partial<Task>) => {
    const index = tasks.value.findIndex(t => t.id === id)
    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...taskData }
      saveTasks()
    }
  }
  
  const deleteTask = (id: string) => {
    tasks.value = tasks.value.filter(t => t.id !== id)
    saveTasks()
  }

  const formatTaskDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return formatDate(date)
    } catch (error) {
      return dateString
    }
  }
  
  return {
    tasks: readonly(tasks),
    completedTasks,
    pendingTasks,
    inProgressTasks,
    loadTasks,
    addTask,
    updateTask,
    deleteTask,
    formatTaskDate
  }
}