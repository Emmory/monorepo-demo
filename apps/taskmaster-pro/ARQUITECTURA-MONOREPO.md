# Diseño de Arquitectura Monorepo para Proyecto Frontend

## Introducción

Este documento presenta la arquitectura de un monorepo moderno para aplicaciones frontend escalables, diseñado para maximizar la reutilización de código, mantener la consistencia y facilitar el trabajo en equipo.

## Herramienta Seleccionada: Nx

### Justificación de la Elección

Elegí **Nx** sobre Turborepo por las siguientes razones:

| Criterio | Nx | Turborepo | Ganador |
|----------|-----|-----------|---------|
| **Generadores de código** | ✅ Sí (robusto) | ⚠️ Limitado | Nx |
| **Caché distribuido** | ✅ Nx Cloud | ✅ Vercel Remote Cache | Empate |
| **Análisis de dependencias** | ✅ Gráfico interactivo | ⚠️ Básico | Nx |
| **Plugins oficiales** | ✅ 50+ plugins | ⚠️ ~10 plugins | Nx |
| **Soporte TypeScript** | ✅ Excelente | ✅ Excelente | Empate |
| **Comunidad** | ✅ Muy grande | ✅ Creciendo | Nx |

**Decisión**: Nx por su ecosistema maduro, generadores inteligentes y mejor análisis de dependencias.

## Estructura del Monorepo
```
taskmaster-monorepo/
├── package.json
├── nx.json
├── tsconfig.base.json
├── .gitignore
├── README.md
│
├── apps/                          # Aplicaciones deployables
│   ├── web-app/                   # Aplicación principal Nuxt
│   │   ├── nuxt.config.ts
│   │   ├── pages/
│   │   ├── layouts/
│   │   └── package.json
│   │
│   ├── admin-dashboard/           # Dashboard administrativo
│   │   ├── nuxt.config.ts
│   │   └── package.json
│   │
│   └── mobile-app/                # Aplicación móvil (Ionic + Vue)
│       ├── ionic.config.json
│       └── package.json
│
├── packages/                      # Paquetes compartidos
│   ├── ui/                        # Componentes UI
│   ├── utils/                     # Utilidades y helpers
│   ├── settings/                  # Configuraciones compartidas
│   └── interfaces/                # Types e interfaces TypeScript
│
├── tools/                         # Scripts y herramientas
│   ├── generators/                # Generadores personalizados
│   └── scripts/
│
└── docs/                          # Documentación
    ├── architecture.md
    └── contributing.md
```

---

## Paquete 1: `packages/ui`

### Propósito
Biblioteca de componentes UI reutilizables siguiendo Design System consistente.

### Estructura Interna
```
packages/ui/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
│
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.vue
│   │   │   ├── Button.spec.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── Card/
│   │   │   ├── Card.vue
│   │   │   ├── CardHeader.vue
│   │   │   ├── CardBody.vue
│   │   │   └── index.ts
│   │   │
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Table/
│   │   └── Chart/
│   │
│   ├── composables/          # Composables UI-specific
│   │   ├── useModal.ts
│   │   ├── useToast.ts
│   │   └── useDarkMode.ts
│   │
│   ├── styles/
│   │   ├── variables.css     # Variables CSS globales
│   │   ├── reset.css
│   │   └── utilities.css
│   │
│   └── index.ts              # Punto de entrada principal
│
└── dist/                     # Build output (gitignored)
```

### Configuración (`package.json`)
```json
{
  "name": "@taskmaster/ui",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/styles.css"
  },
  "scripts": {
    "build": "vite build && vue-tsc --emitDeclarationOnly",
    "dev": "vite",
    "test": "vitest",
    "lint": "eslint src/"
  },
  "dependencies": {
    "vue": "^3.4.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "vitest": "^1.0.0",
    "vue-tsc": "^1.8.0"
  }
}
```

### Dependencias Exportadas
- **Componentes Vue**: Button, Card, Input, Modal, Table, Chart
- **Composables**: useModal, useToast, useDarkMode
- **Estilos CSS**: Variables, utilidades, reset

### Dependencias Consumidas
- **vue**: Framework principal
- **@taskmaster/interfaces**: Para tipado de props

### Ejemplo de Uso en Apps
```vue
<!-- En apps/web-app/pages/dashboard.vue -->
<script setup lang="ts">
import { Button, Card } from '@taskmaster/ui'
import '@taskmaster/ui/styles'
</script>

<template>
  <Card>
    <h1>Dashboard</h1>
    <Button variant="primary" @click="handleAction">
      Acción
    </Button>
  </Card>
</template>
```

---

## Paquete 2: `packages/utils`

### Propósito
Funciones de utilidad, helpers y hooks personalizados compartidos entre aplicaciones.

### Estructura Interna
```
packages/utils/
├── package.json
├── tsconfig.json
├── vitest.config.ts
│
├── src/
│   ├── date/
│   │   ├── formatDate.ts
│   │   ├── parseDate.ts
│   │   └── index.ts
│   │
│   ├── string/
│   │   ├── capitalize.ts
│   │   ├── slugify.ts
│   │   └── index.ts
│   │
│   ├── validation/
│   │   ├── validateEmail.ts
│   │   ├── validatePhone.ts
│   │   └── index.ts
│   │
│   ├── hooks/                # Vue composables
│   │   ├── useLocalStorage.ts
│   │   ├── useDebounce.ts
│   │   ├── useFetch.ts
│   │   └── index.ts
│   │
│   ├── api/
│   │   ├── httpClient.ts
│   │   └── errorHandler.ts
│   │
│   └── index.ts
│
└── tests/
    └── *.spec.ts
```

### Configuración (`package.json`)
```json
{
  "name": "@taskmaster/utils",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": "./dist/index.js",
    "./date": "./dist/date/index.js",
    "./validation": "./dist/validation/index.js",
    "./hooks": "./dist/hooks/index.js"
  },
  "scripts": {
    "build": "tsup src/index.ts --format esm,cjs --dts",
    "test": "vitest",
    "lint": "eslint src/"
  },
  "dependencies": {
    "date-fns": "^3.0.0",
    "validator": "^13.11.0"
  },
  "devDependencies": {
    "@types/validator": "^13.11.0",
    "tsup": "^8.0.0",
    "typescript": "^5.3.0",
    "vitest": "^1.0.0"
  },
  "peerDependencies": {
    "vue": "^3.4.0"
  }
}
```

### Dependencias Exportadas
- **Utilidades de fecha**: formatDate, parseDate, addDays
- **Validaciones**: validateEmail, validatePhone, validateURL
- **Hooks Vue**: useLocalStorage, useDebounce, useFetch
- **API helpers**: httpClient configurado, errorHandler

### Dependencias Consumidas
- **date-fns**: Manipulación de fechas
- **validator**: Validaciones complejas
- **@taskmaster/interfaces**: Tipos compartidos

### Ejemplo de Uso
```typescript
// En apps/web-app/composables/useAuth.ts
import { useLocalStorage } from '@taskmaster/utils/hooks'
import { validateEmail } from '@taskmaster/utils/validation'
import { httpClient } from '@taskmaster/utils/api'

export const useAuth = () => {
  const token = useLocalStorage('auth_token', null)
  
  const login = async (email: string) => {
    if (!validateEmail(email)) {
      throw new Error('Email inválido')
    }
    
    const response = await httpClient.post('/auth/login', { email })
    token.value = response.data.token
  }
  
  return { login, token }
}
```

---

## Paquete 3: `packages/settings`

### Propósito
Configuraciones compartidas: variables de entorno, constantes, configuraciones de linters y herramientas de desarrollo.

### Estructura Interna
```
packages/settings/
├── package.json
├── README.md
│
├── src/
│   ├── env/
│   │   ├── development.ts
│   │   ├── production.ts
│   │   ├── test.ts
│   │   └── index.ts
│   │
│   ├── constants/
│   │   ├── api.ts              # URLs de API
│   │   ├── routes.ts           # Rutas de la app
│   │   ├── theme.ts            # Colores, fuentes
│   │   └── index.ts
│   │
│   ├── feature-flags/
│   │   └── index.ts
│   │
│   └── index.ts
│
├── eslint/
│   ├── base.js
│   ├── vue.js
│   └── typescript.js
│
├── prettier/
│   └── .prettierrc.js
│
├── tsconfig/
│   ├── base.json
│   ├── vue.json
│   └── node.json
│
└── husky/                      # Git hooks
    ├── pre-commit
    └── pre-push
```

### Configuración (`package.json`)
```json
{
  "name": "@taskmaster/settings",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": "./dist/index.js",
    "./eslint": "./eslint/base.js",
    "./prettier": "./prettier/.prettierrc.js",
    "./tsconfig": "./tsconfig/base.json"
  },
  "scripts": {
    "build": "tsup src/index.ts --format esm --dts"
  },
  "dependencies": {},
  "devDependencies": {
    "tsup": "^8.0.0",
    "typescript": "^5.3.0"
  }
}
```

### Dependencias Exportadas

**1. Configuraciones de herramientas:**
```javascript
// eslint/base.js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': 'error'
  }
}
```

**2. Constantes de aplicación:**
```typescript
// src/constants/api.ts
export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  TASKS: '/api/tasks',
  USERS: '/api/users'
} as const

export const API_BASE_URL = 
  process.env.NODE_ENV === 'production'
    ? 'https://api.taskmaster.com'
    : 'http://localhost:3001'
```

**3. Feature flags:**
```typescript
// src/feature-flags/index.ts
export const FEATURES = {
  DARK_MODE: true,
  NOTIFICATIONS: true,
  ANALYTICS: process.env.NODE_ENV === 'production',
  BETA_DASHBOARD: false
} as const
```

**4. Configuración de tema:**
```typescript
// src/constants/theme.ts
export const THEME = {
  colors: {
    primary: '#2563eb',
    secondary: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b'
  },
  fonts: {
    base: 'system-ui, sans-serif',
    heading: 'Inter, sans-serif'
  },
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px'
  }
} as const
```

### Dependencias Consumidas
Ninguna (paquete de configuración pura)

### Ejemplo de Uso

**En apps/web-app/nuxt.config.ts:**
```typescript
import { API_BASE_URL } from '@taskmaster/settings'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiUrl: API_BASE_URL
    }
  }
})
```

**En apps/web-app/.eslintrc.js:**
```javascript
module.exports = {
  extends: ['@taskmaster/settings/eslint/vue']
}
```

---

## Paquete 4: `packages/interfaces`

### Propósito
Definiciones centralizadas de types e interfaces TypeScript para garantizar consistencia de tipado en todo el monorepo.

### Estructura Interna
```
packages/interfaces/
├── package.json
├── tsconfig.json
│
├── src/
│   ├── models/
│   │   ├── User.ts
│   │   ├── Task.ts
│   │   ├── Project.ts
│   │   └── index.ts
│   │
│   ├── api/
│   │   ├── requests/
│   │   │   ├── AuthRequest.ts
│   │   │   ├── TaskRequest.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── responses/
│   │   │   ├── AuthResponse.ts
│   │   │   ├── TaskResponse.ts
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts
│   │
│   ├── enums/
│   │   ├── TaskStatus.ts
│   │   ├── UserRole.ts
│   │   └── index.ts
│   │
│   ├── utilities/
│   │   ├── Pagination.ts
│   │   ├── ApiResponse.ts
│   │   └── index.ts
│   │
│   └── index.ts
│
└── dist/                       # Build output
```

### Configuración (`package.json`)
```json
{
  "name": "@taskmaster/interfaces",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": "./dist/index.js",
    "./models": "./dist/models/index.js",
    "./api": "./dist/api/index.js",
    "./enums": "./dist/enums/index.js"
  },
  "scripts": {
    "build": "tsc --project tsconfig.json",
    "lint": "eslint src/"
  },
  "devDependencies": {
    "typescript": "^5.3.0"
  }
}
```

### Dependencias Exportadas

**Modelos de datos:**
```typescript
// src/models/User.ts
export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export type UserCreate = Omit<User, 'id' | 'createdAt' | 'updatedAt'>
export type UserUpdate = Partial<UserCreate>
```
```typescript
// src/models/Task.ts
export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assignedTo?: string
  dueDate: Date
  createdAt: Date
  updatedAt: Date
}

export type TaskCreate = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>
export type TaskUpdate = Partial<TaskCreate>
```

**Enums:**
```typescript
// src/enums/TaskStatus.ts
export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
  ARCHIVED = 'archived'
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}
```

**Tipos de API:**
```typescript
// src/api/responses/ApiResponse.ts
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: ApiError
  metadata?: {
    page?: number
    limit?: number
    total?: number
  }
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
}
```

**Utilidades:**
```typescript
// src/utilities/Pagination.ts
export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  items: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
```

### Dependencias Consumidas
Ninguna (solo TypeScript puro)

### Ejemplo de Uso
```typescript
// En apps/web-app/composables/useTasks.ts
import type { Task, TaskCreate, TaskStatus } from '@taskmaster/interfaces/models'
import type { ApiResponse } from '@taskmaster/interfaces/api'

export const useTasks = () => {
  const tasks = ref<Task[]>([])
  
  const createTask = async (data: TaskCreate): Promise<ApiResponse<Task>> => {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    return response.json()
  }
  
  const filterByStatus = (status: TaskStatus): Task[] => {
    return tasks.value.filter(t => t.status === status)
  }
  
  return { tasks, createTask, filterByStatus }
}
```

---

## Configuración de Nx

### `nx.json` (Raíz del proyecto)
```json
{
  "$schema": "./node_modules/nx/schemas/nx-schema.json",
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "cache": true
    },
    "test": {
      "cache": true
    },
    "lint": {
      "cache": true
    }
  },
  "namedInputs": {
    "default": ["{projectRoot}/**/*"],
    "production": [
      "default",
      "!{projectRoot}/**/*.spec.ts",
      "!{projectRoot}/tests/**/*"
    ]
  }
}
```

### `tsconfig.base.json` (TypeScript paths)
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@taskmaster/ui": ["packages/ui/src/index.ts"],
      "@taskmaster/utils": ["packages/utils/src/index.ts"],
      "@taskmaster/utils/*": ["packages/utils/src/*"],
      "@taskmaster/settings": ["packages/settings/src/index.ts"],
      "@taskmaster/interfaces": ["packages/interfaces/src/index.ts"],
      "@taskmaster/interfaces/*": ["packages/interfaces/src/*"]
    },
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

---

## Flujo de Trabajo y Comandos

### Comandos Comunes de Nx

**Compilar un paquete específico:**
```bash
nx build @taskmaster/ui
```

**Compilar con dependencias:**
```bash
nx build web-app
# Automáticamente compila: ui, utils, settings, interfaces
```

**Ejecutar tests:**
```bash
nx test @taskmaster/utils
nx test --all  # Todos los paquetes
```

**Ver gráfico de dependencias:**
```bash
nx graph
```

**Lint:**
```bash
nx lint @taskmaster/ui
nx lint --all
```

**Ejecutar en modo desarrollo:**
```bash
nx serve web-app
```

### Caché y Optimización

Nx cachea automáticamente:
- Builds
- Tests
- Linting
- Type checking

**Ejemplo de ahorro de tiempo:**
```bash
# Primera ejecución: 45 segundos
nx build web-app

# Segunda ejecución (sin cambios): 0.3 segundos
nx build web-app
# ✅ Restored from cache
```

---

## Ventajas de Esta Arquitectura

### 1. **Reutilización de Código**
- Componentes UI compartidos entre web y mobile
- Lógica de negocio centralizada en utils
- Tipos compartidos garantizan consistencia

### 2. **Desarrollo Más Rápido**
- Caché de Nx reduce tiempos de build en 80-90%
- Generadores de código crean boilerplate automáticamente
- Hot reload funciona entre paquetes

### 3. **Mantenibilidad**
- Un cambio en `interfaces` actualiza todas las apps
- Configuraciones centralizadas en `settings`
- Fácil refactorización con análisis de dependencias

### 4. **Escalabilidad**
- Agregar nuevas apps es trivial
- Paquetes independientes pueden ser versionados por separado
- Deployment independiente de cada app

### 5. **Developer Experience**
- TypeScript paths evitan imports relativos complejos
- ESLint y Prettier compartidos
- Tests consistentes en todo el monorepo

---

## Ejemplo de Flujo Completo

### Agregar Nueva Feature

**1. Crear tipo en `interfaces`:**
```typescript
// packages/interfaces/src/models/Comment.ts
export interface Comment {
  id: string
  taskId: string
  userId: string
  text: string
  createdAt: Date
}
```

**2. Crear utilidad en `utils`:**
```typescript
// packages/utils/src/api/comments.ts
import type { Comment } from '@taskmaster/interfaces/models'

export const fetchComments = async (taskId: string): Promise<Comment[]> => {
  const response = await httpClient.get(`/tasks/${taskId}/comments`)
  return response.data
}
```

**3. Crear componente en `ui`:**
```vue
<!-- packages/ui/src/components/CommentList/CommentList.vue -->
<script setup lang="ts">
import type { Comment } from '@taskmaster/interfaces/models'

defineProps<{
  comments: Comment[]
}>()
</script>

<template>
  <div class="comment-list">
    <div v-for="comment in comments" :key="comment.id">
      {{ comment.text }}
    </div>
  </div>
</template>
```

**4. Usar en app:**
```vue
<!-- apps/web-app/pages/tasks/[id].vue -->
<script setup lang="ts">
import { CommentList } from '@taskmaster/ui'
import { fetchComments } from '@taskmaster/utils/api'
import type { Comment } from '@taskmaster/interfaces/models'

const comments = ref<Comment[]>([])

onMounted(async () => {
  comments.value = await fetchComments(route.params.id)
})
</script>

<template>
  <CommentList :comments="comments" />
</template>
```

**5. Compilar todo:**
```bash
nx build web-app
# Compila automáticamente: interfaces → utils → ui → web-app
```

---

## Conclusión

Esta arquitectura de monorepo proporciona:
- ✅ Separación clara de responsabilidades
- ✅ Máxima reutilización de código
- ✅ Desarrollo rápido con caché inteligente
- ✅ Type safety en todo el proyecto
- ✅ Fácil mantenimiento y escalabilidad

El uso de Nx como orquestador junto con paquetes bien definidos permite que equipos grandes trabajen eficientemente en múltiples aplicaciones compartiendo código de forma segura y consistente.