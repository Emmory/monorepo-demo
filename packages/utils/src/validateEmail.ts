/**
 * Valida si un string es un email válido
 * @param email - String a validar
 * @returns true si es válido, false si no
 * @example
 * validateEmail('test@test.com')  // true
 * validateEmail('invalido')       // false
 */
export function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}