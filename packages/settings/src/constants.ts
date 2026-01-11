/**
 * Constantes de la aplicación
 */

export const APP_NAME = 'Mi Empresa App'
export const APP_VERSION = '1.0.0'

/**
 * Endpoints de la API
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REGISTER: '/api/auth/register'
  },
  USERS: {
    BASE: '/api/users',
    BY_ID: (id: string) => `/api/users/${id}`
  },
  TASKS: {
    BASE: '/api/tasks',
    BY_ID: (id: string) => `/api/tasks/${id}`
  }
} as const

/**
 * Configuración de tema
 */
export const THEME = {
  COLORS: {
    PRIMARY: '#2563eb',
    SECONDARY: '#6b7280',
    SUCCESS: '#10b981',
    WARNING: '#f59e0b',
    DANGER: '#ef4444'
  },
  BREAKPOINTS: {
    SM: '640px',
    MD: '768px',
    LG: '1024px',
    XL: '1280px'
  }
} as const

/**
 * Features flags
 */
export const FEATURES = {
  DARK_MODE: true,
  GEOLOCATION: true,
  NOTIFICATIONS: true,
  ANALYTICS: false
} as const