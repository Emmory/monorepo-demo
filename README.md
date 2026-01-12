# 🏢 Mi Empresa - Monorepo Empresarial

Monorepo construido con **Nx**, **Vue 3**, **Nuxt 3**, **TypeScript** y **Vite**.

Este proyecto demuestra **arquitectura escalable** con código compartido entre múltiples aplicaciones, aplicando principios de **DRY (Don't Repeat Yourself)** y **Single Source of Truth**.

---

## 🎯 Filosofía del Proyecto

Este monorepo nace de la experiencia desarrollando un **Sistema de Gestión de Tickets** para una microempresa de reparación de computadoras. Ese proyecto me enseñó la importancia de:

- ✅ **Compartir código** entre módulos
- ✅ **Tipado consistente** para prevenir bugs
- ✅ **Componentes reutilizables** para desarrollo rápido
- ✅ **Configuración centralizada** para mantenibilidad

**TaskMaster Pro** aplica esos mismos principios arquitectónicos, pero con stack moderno.

---

## 📦 Estructura del Proyecto
```
mi-empresa/
├── packages/              # Código compartido (base arquitectónica)
│   ├── ui/               # Componentes Vue reutilizables
│   ├── utils/            # Funciones utilitarias
│   ├── interfaces/       # Tipos TypeScript compartidos
│   └── settings/         # Configuraciones y constantes
│
└── apps/                 # Aplicaciones que usan los paquetes
    ├── demo-app/         # Demo de integración de paquetes
    └── taskmaster-pro/   # Sistema de gestión de tareas (producción)
```

---

## 🚀 Aplicaciones

### 1. `taskmaster-pro` ⭐ (Aplicación Principal)

**Descripción:** Sistema completo de gestión de tareas que demuestra arquitectura monorepo en producción.

**Historia:** Evolución del sistema de tickets desarrollado previamente, aplicando arquitectura modular y reutilizable.

**Características:**
- ✅ **Autenticación** con middleware de Nuxt
- ✅ **Dashboard** con gráficas (Chart.js)
- ✅ **CRUD completo** de tareas
- ✅ **Dark Mode** persistente
- ✅ **Geolocalización** (GPS API)
- ✅ **100% Responsive** (mobile-first)
- ✅ **TypeScript riguroso** (cero `any` injustificados)

**Integración con Paquetes:**
```typescript
// Usa tipos compartidos
import type { User, Task, TaskStatus, TaskPriority } from '@mi-empresa/interfaces'

// Usa utilidades compartidas
import { formatDate, validateEmail } from '@mi-empresa/utils'

// Usa configuración compartida
import { APP_NAME, APP_VERSION, THEME, FEATURES } from '@mi-empresa/settings'

// Podría usar componentes compartidos (futuro)
// import { Button, Card } from '@mi-empresa/ui'
```

**Tecnologías:**
- Nuxt 3.17
- Vue 3.5
- TypeScript 5.7
- Tailwind CSS 3.4
- Chart.js 4.4
- date-fns 4.1

**En Producción:**
- 🌐 [TaskMaster Pro Live](https://taskmaster-pro-six.vercel.app)
- 📂 [Código en GitHub](https://github.com/Emmory/taskmaster-pro)

**Ejecutar localmente:**
```bash
cd apps/taskmaster-pro
npm install
npm run dev
```

---

### 2. `demo-app` (Demostración de Paquetes)

Aplicación simple que demuestra cómo los paquetes se integran.

**Ejecutar:**
```bash
cd apps/demo-app
npm install
npm run dev
```

**En Producción:**
- 🌐 [Demo App Live](https://monorepo-demo-ui-zeta.vercel.app)

---

## 📦 Paquetes Compartidos

### 1. `@mi-empresa/interfaces` 🎯 (Base del Sistema)

**Propósito:** Definiciones de tipos e interfaces compartidas para tipado consistente.

**Exporta:**

**Entidades del Sistema:**
```typescript
// Usuario
interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role?: 'admin' | 'user'
  createdAt: string
}

// Tarea
interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus      // Enum: PENDING, IN_PROGRESS, COMPLETED
  priority: TaskPriority  // Enum: LOW, MEDIUM, HIGH
  dueDate: string
  createdAt: string
  userId: string
}

// Tipos auxiliares
type TaskCreate = Omit<Task, 'id' | 'createdAt'>
type UserCreate = Omit<User, 'id' | 'createdAt'>
```

**API y Respuestas:**
```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: ApiError
  message?: string
}
```

**Por Qué Es Importante:**
- ✅ **Contrato único** entre frontend y backend
- ✅ **Previene bugs** de tipos incompatibles
- ✅ **IntelliSense completo** en toda la codebase
- ✅ **Refactoring seguro** (TypeScript alerta cambios)

**Usado por:**
- `apps/taskmaster-pro` (tipos de tareas y usuarios)
- `apps/demo-app` (ejemplos)
- Cualquier futura app que maneje las mismas entidades

---

### 2. `@mi-empresa/utils` 🛠️ (Utilidades Comunes)

**Propósito:** Funciones puras reutilizables sin dependencias de UI.

**Exporta:**
```typescript
// Formateo de fechas
formatDate(date: Date): string
// Output: "12/01/2026"

// Validación de emails
validateEmail(email: string): boolean
// Output: true/false
```

**Por Qué Es Importante:**
- ✅ **No duplicar lógica** entre componentes
- ✅ **Testeable independientemente**
- ✅ **Sin dependencias de Vue** (puede usarse en backend Node.js)

**Usado por:**
- `apps/taskmaster-pro` (formateo de fechas en tareas)
- `apps/demo-app` (validación de emails)

---

### 3. `@mi-empresa/settings` ⚙️ (Configuración Centralizada)

**Propósito:** Configuraciones, constantes y feature flags compartidos.

**Exporta:**
```typescript
// Info de la aplicación
export const APP_NAME = 'TaskMaster Pro'
export const APP_VERSION = '1.0.0'

// Endpoints de API
export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  USERS: '/api/users',
  TASKS: '/api/tasks',
  taskById: (id: string) => `/api/tasks/${id}`
}

// Tema
export const THEME = {
  COLORS: {
    PRIMARY: '#3b82f6',
    SECONDARY: '#10b981',
    DANGER: '#ef4444'
  },
  BREAKPOINTS: {
    MOBILE: '640px',
    TABLET: '768px',
    DESKTOP: '1024px'
  }
}

// Feature Flags
export const FEATURES = {
  DARK_MODE: true,
  NOTIFICATIONS: true,
  GEOLOCATION: true,
  ANALYTICS: false
}
```

**Por Qué Es Importante:**
- ✅ **Single Source of Truth** para configuración
- ✅ **Feature flags** para activar/desactivar funcionalidades
- ✅ **Fácil de modificar** en un solo lugar

**Usado por:**
- `apps/taskmaster-pro` (tema, features, versión)

---

### 4. `@mi-empresa/ui` 🎨 (Componentes de UI)

**Propósito:** Biblioteca de componentes Vue reutilizables.

**Exporta:**
- `Button` - Botón con 3 variantes (primary, secondary, danger)
- `Card` - Tarjeta con slots (header, body, footer)

**Tecnologías:**
- Vue 3.4
- TypeScript
- Scoped CSS

**Estado Actual:**
- ✅ Implementado y funcional en `demo-app`
- 🔄 Potencial para integración en `taskmaster-pro`

**Usado por:**
- `apps/demo-app` (demostración)

---

## 🏗️ Arquitectura y Decisiones Técnicas

### ¿Por Qué Monorepo?

**Problema que resuelve:**

En mi experiencia con el sistema de tickets, enfrenté:
- ❌ Duplicación de código entre módulos
- ❌ Tipos inconsistentes entre frontend/backend
- ❌ Difícil mantener componentes sincronizados

**Solución con Monorepo:**
- ✅ **Un cambio, múltiples apps** beneficiadas
- ✅ **Tipos compartidos** = cero inconsistencias
- ✅ **Refactoring atómico** en un solo PR

---

### Evolución Arquitectónica

**Sistema de Tickets (Pasado):**
- Spring Boot + MySQL
- JavaScript vanilla en frontend
- Arquitectura cliente-servidor tradicional

**TaskMaster Pro (Presente):**
- Nuxt 3 + TypeScript
- Vue 3 con Composition API
- Arquitectura monorepo modular

**Aprendizajes Aplicados:**
1. **Separación de responsabilidades** (composables vs componentes)
2. **Tipado riguroso** (prevenir bugs antes de runtime)
3. **Componentes reutilizables** (desarrollo más rápido)
4. **Testing mindset** (código testeable desde diseño)

---

### Comparación: Sistema de Tickets vs TaskMaster Pro

| Aspecto | Sistema de Tickets | TaskMaster Pro |
|---------|-------------------|----------------|
| **Dominio** | Equipos de computadoras | Tareas de trabajo |
| **Entidad Principal** | Ticket de reparación | Task de proyecto |
| **Estados** | Recibido → Diagnóstico → Reparación → Entregado | Pending → In Progress → Completed |
| **Usuarios** | Admin + Técnicos | Usuario autenticado |
| **Backend** | Spring Boot + MySQL | Composables + localStorage (demo) |
| **Frontend** | HTML + JS vanilla | Vue 3 + Nuxt 3 + TypeScript |
| **Arquitectura** | Monolítico cliente-servidor | Monorepo con código compartido |
| **Deployment** | Docker | Vercel (Serverless) |

**Concepto Compartido:** Ambos sistemas gestionan **elementos con estado** (tickets/tareas) que fluyen por diferentes etapas y requieren trazabilidad.

---

## 🛠️ Tecnologías del Monorepo

- **Gestor de Monorepo:** Nx 22.3.3
- **Frameworks:** Vue 3.4, Nuxt 3.17
- **Build Tool:** Vite 5.0
- **Lenguaje:** TypeScript 5.3+
- **Estilos:** Tailwind CSS 3.4
- **Package Manager:** npm

---

## 📋 Instalación y Uso

### 1. Clonar el repositorio
```bash
git clone https://github.com/Emmory/monorepo-demo.git
cd monorepo-demo/mi-empresa
```

### 2. Compilar paquetes base
```bash
# Compilar interfaces (base de todo)
cd packages/interfaces && npm install && npm run build && cd ../..

# Compilar utils
cd packages/utils && npm install && npm run build && cd ../..

# Compilar settings
cd packages/settings && npm install && npm run build && cd ../..

# Compilar ui
cd packages/ui && npm install && npm run build && cd ../..
```

### 3. Ejecutar TaskMaster Pro
```bash
cd apps/taskmaster-pro
npm install
npm run dev
```

Abre http://localhost:3000

### 4. Ejecutar Demo App
```bash
cd apps/demo-app
npm install
npm run dev
```

Abre http://localhost:5173

---

## 🎨 Ventajas Demostradas

### ✅ 1. Código Compartido Real

**Ejemplo:** Los tipos de `Task` se usan en:
- `composables/useTasks.ts` (lógica)
- `pages/tasks.vue` (UI)
- `pages/dashboard.vue` (gráficas)

Un cambio en `interfaces/Task.ts` → TypeScript alerta TODOS los usos.

---

### ✅ 2. Tipado Consistente

**Antes (sin monorepo):**
```typescript
// En un archivo
interface Task { status: string }

// En otro archivo
interface Task { status: 'pending' | 'completed' }  // ← Inconsistencia
```

**Ahora (con monorepo):**
```typescript
// UNA definición en packages/interfaces
export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed'
}

// Todos usan la MISMA
import { TaskStatus } from '@mi-empresa/interfaces'
```

---

### ✅ 3. Refactoring Seguro

**Escenario:** Necesitamos agregar campo `assignedTo` a Task.

**Sin monorepo:**
- Cambiar en 5 archivos diferentes
- Alto riesgo de olvidar alguno
- Tests pueden pasar pero romper en producción

**Con monorepo:**
- Cambiar en `packages/interfaces/Task.ts`
- TypeScript FALLA en todos los lugares que necesitan actualización
- Imposible deployar código roto

---

### ✅ 4. Desarrollo Eficiente

**Crear nueva app:**
```bash
mkdir apps/nueva-app
cd apps/nueva-app
npm init -y
```
```json
{
  "dependencies": {
    "@mi-empresa/ui": "file:../../packages/ui",
    "@mi-empresa/utils": "file:../../packages/utils",
    "@mi-empresa/interfaces": "file:../../packages/interfaces",
    "@mi-empresa/settings": "file:../../packages/settings"
  }
}
```

**Listo:** Nueva app con componentes, utils, types y configuración existentes.

---

## 📚 Comandos Útiles

### Compilar todos los paquetes
```bash
cd packages/interfaces && npm run build && cd ../..
cd packages/utils && npm run build && cd ../..
cd packages/settings && npm run build && cd ../..
cd packages/ui && npm run build && cd ../..
```

### Ver gráfico de dependencias (con Nx)
```bash
npx nx graph
```

### Agregar dependencia a un paquete específico
```bash
npm install <package> --workspace=packages/ui
```

---

## 🎯 Casos de Uso del Monorepo

### ✅ Startup con múltiples productos
- Web app
- Mobile app (React Native)
- Admin dashboard

Todos comparten: types, utils, componentes base.

### ✅ Empresa con microservicios
- Frontend compartido
- Types compartidos con backend
- Configuración centralizada

### ✅ Design System empresarial
- Biblioteca de componentes
- Tokens de diseño (colores, espaciado)
- Documentación integrada

---

## 🚀 Roadmap

### Corto Plazo
- [ ] Integrar componentes de UI en TaskMaster Pro
- [ ] Agregar tests unitarios (Vitest)
- [ ] CI/CD con GitHub Actions

### Mediano Plazo
- [ ] Backend real (Nuxt server routes o Node.js)
- [ ] Base de datos (PostgreSQL)
- [ ] Autenticación con JWT

### Largo Plazo
- [ ] Mobile app con React Native (reutiliza interfaces y utils)
- [ ] Admin dashboard (reutiliza componentes y types)
- [ ] Storybook para documentar componentes

---

## 👨‍💻 Autor

**Emmory Carias Gonzalez**

- GitHub: [@Emmory](https://github.com/Emmory)
- Proyectos:
  - [TaskMaster Pro](https://taskmaster-pro-six.vercel.app) - Sistema de gestión de tareas
  - [Monorepo Demo](https://monorepo-demo-ui-zeta.vercel.app) - Demo de paquetes

---

## 📄 Licencia

MIT License - Libre para uso educativo y comercial

---

## 🙏 Agradecimientos

Este proyecto nace de la experiencia real desarrollando sistemas de gestión (tickets, tareas, inventarios). Cada decisión arquitectónica está fundamentada en problemas reales que enfrenté y resolví.

El monorepo no es solo una estructura de carpetas, es una **filosofía de desarrollo** que prioriza:
- Reutilización sobre duplicación
- Consistencia sobre conveniencia
- Escalabilidad sobre rapidez

---

## 📞 Contacto

¿Preguntas sobre la arquitectura? ¿Quieres discutir monorepos?

Abre un issue o contáctame directamente.

---

**⭐ Si este proyecto te ayudó, dale una estrella en GitHub!**
