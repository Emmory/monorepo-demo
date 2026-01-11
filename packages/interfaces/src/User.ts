/**
 * Representa un usuario del sistema
 */
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role?: 'admin' | 'user'
  createdAt: string
}

/**
 * Datos para crear un usuario
 */
export type UserCreate = Omit<User, 'id' | 'createdAt'>