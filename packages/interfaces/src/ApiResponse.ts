/**
 * Respuesta estándar de la API
 */
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: ApiError
  message?: string
}

/**
 * Error de la API
 */
export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
}

/**
 * Paginación
 */
export interface Pagination {
  page: number
  pageSize: number
  total: number
  totalPages: number
}