/**
 * Representa una tarea del sistema
 */
export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
  createdAt: string
  userId: string
}

/**
 * Estados posibles de una tarea
 */
export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed'
}

/**
 * Prioridades de una tarea
 */
export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

/**
 * Datos para crear una tarea
 */
export type TaskCreate = Omit<Task, 'id' | 'createdAt'>