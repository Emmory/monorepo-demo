/**
 * Configuración de entorno
 * Compatible con Node.js y navegador (Vite)
 */

// Detectar si estamos en navegador o Node
const isBrowser = typeof window !== 'undefined'

// Usar import.meta.env (Vite) o process.env (Node)
const getEnv = (key: string, defaultValue?: string): string => {
  if (isBrowser) {
    // En navegador, Vite expone variables con VITE_ prefix
    return (import.meta as any).env?.[key] || defaultValue || ''
  } else {
    // En Node.js
    return process?.env?.[key] || defaultValue || ''
  }
}

export const ENV = {
  /**
   * Determina si estamos en producción
   */
  isProd: getEnv('NODE_ENV') === 'production' || getEnv('MODE') === 'production',
  
  /**
   * Determina si estamos en desarrollo
   */
  isDev: getEnv('NODE_ENV') === 'development' || getEnv('MODE') === 'development',
  
  /**
   * URL base de la API
   */
  apiUrl: getEnv('VITE_API_URL', 'http://localhost:3000'),
  
  /**
   * Tiempo de timeout para requests (ms)
   */
  timeout: 30000
} as const

/**
 * Validación de variables de entorno requeridas
 * (Solo funciona en Node.js)
 */
export function validateEnv(): void {
  if (isBrowser) {
    console.warn('validateEnv() solo funciona en Node.js')
    return
  }
  
  const required = ['NODE_ENV']
  
  for (const key of required) {
    if (!process?.env?.[key]) {
      throw new Error(`Variable de entorno requerida: ${key}`)
    }
  }
}