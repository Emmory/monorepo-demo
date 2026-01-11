/**
 * Formatea una fecha a formato DD/MM/YYYY
 * @param date - Fecha a formatear
 * @returns String con formato DD/MM/YYYY
 * @example
 * formatDate(new Date('2026-01-10')) // "10/01/2026"
 */
export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  
  return `${day}/${month}/${year}`
}