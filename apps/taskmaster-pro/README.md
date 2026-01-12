# TaskMaster Pro - Prueba Técnica Senior Frontend

[![Nuxt 3](https://img.shields.io/badge/Nuxt-3.17-00DC82?logo=nuxt.js)](https://nuxt.com/)
[![Vue 3](https://img.shields.io/badge/Vue-3.4-4FC08D?logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

Aplicación web completa de gestión de tareas desarrollada con Vue 3, Nuxt 3, TypeScript y Tailwind CSS como parte de la evaluación técnica para el puesto de Desarrollador Senior Frontend.

## 🌐 Demo en Vivo

**🔗 Aplicación desplegada:** [taskmaster-pro-six.vercel.app](https://taskmaster-pro-six.vercel.app)

Prueba la aplicación sin necesidad de instalar nada. Usa cualquier email y contraseña para acceder.

---

## 🚀 Características Implementadas

### Requisitos Técnicos
- ✅ **Framework**: Nuxt 3.17 con Vue 3
- ✅ **Tipado**: TypeScript estricto en todo el proyecto
- ✅ **Gestión de Estado**: Composables personalizados con Vue's Composition API
- ✅ **Estilos**: Tailwind CSS v3 para utilidades y diseño responsivo
- ✅ **Librerías**: Chart.js, date-fns, vue-chartjs

### Funcionalidades
- ✅ **Autenticación**: Sistema de login con rutas públicas/privadas
- ✅ **Dashboard**: Estadísticas visuales con gráficas interactivas
- ✅ **CRUD Completo**: Gestión de tareas con filtros y paginación
- ✅ **Modo Oscuro/Claro**: Toggle persistente con localStorage
- ✅ **API de Navegador**: Geolocalización GPS integrada
- ✅ **Diseño Responsivo**: Adaptable a móvil, tablet y escritorio con Tailwind

### Páginas Implementadas
1. **Login** (`/login`) - Autenticación de usuarios
2. **Dashboard** (`/dashboard`) - Panel con estadísticas y gráficas
3. **Gestión de Tareas** (`/tasks`) - CRUD completo con tabla y filtros

## 📁 Estructura del Proyecto
```
taskmaster-pro/
├── assets/
│   └── css/
│       └── main.css           # Directivas Tailwind y estilos globales
├── composables/
│   ├── useAuth.ts             # Lógica de autenticación
│   └── useTasks.ts            # Gestión de tareas
├── layouts/
│   ├── auth.vue               # Layout para login
│   └── default.vue            # Layout principal con navbar
├── middleware/
│   └── auth.ts                # Middleware de autenticación
├── pages/
│   ├── dashboard.vue          # Dashboard con gráficas
│   ├── index.vue              # Página inicial
│   ├── login.vue              # Página de login
│   └── tasks.vue              # Gestión de tareas
├── types/
│   └── index.ts               # Definiciones TypeScript
├── CASO-REAL.md               # Documentación del caso técnico
├── ARQUITECTURA-MONOREPO.md   # Diseño de arquitectura monorepo
├── tailwind.config.js         # Configuración Tailwind CSS
├── nuxt.config.ts
├── package.json
└── README.md
```

## 🛠️ Instalación y Ejecución

### Requisitos Previos
- Node.js 20.x o superior
- npm 10.x o superior

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/Emmory/taskmaster-pro.git

# Entrar al directorio
cd taskmaster-pro

# Instalar dependencias
npm install
```

### Desarrollo
```bash
# Iniciar servidor de desarrollo
npm run dev

# Acceder a http://localhost:3000
```

### Credenciales de Acceso
Puedes usar **cualquier email y contraseña** para acceder:
- Email: `test@test.com`
- Contraseña: `123456`

## 📊 Características Técnicas Destacadas

### 1. Tipado TypeScript Riguroso
Todos los modelos de datos están completamente tipados:
```typescript
export interface Task {
  id: string
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  createdAt: string
  userId: string
}

export type TaskCreate = Omit<Task, 'id' | 'createdAt'>
```

### 2. Composables Reutilizables
Estado global manejado con composables personalizados:
```typescript
const { user, login, logout, checkAuth } = useAuth()
const { tasks, addTask, updateTask, deleteTask } = useTasks()
```

### 3. Middleware de Autenticación
Protección de rutas privadas con redirección automática:
```typescript
export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated.value && to.path !== '/login') {
    return navigateTo('/login')
  }
})
```

### 4. Geolocalización Integrada
Uso de la API de Geolocalización del navegador:
```typescript
navigator.geolocation.getCurrentPosition(
  (position) => {
    location.value = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
  }
)
```

### 5. Diseño con Tailwind CSS
Utilidades CSS modernas para desarrollo rápido:
```vue
<div class="rounded-xl shadow-lg p-6 transition-colors" 
     :class="isDark ? 'bg-gray-800' : 'bg-white'">
  <h3 class="text-xl font-semibold mb-4">Total de Tareas</h3>
  <p class="text-4xl font-bold text-blue-600">{{ tasks.length }}</p>
</div>
```

## 📈 Gráficas y Visualizaciones

- **Gráfica de Dona**: Distribución de tareas por estado
- **Gráfica de Barras**: Tareas por nivel de prioridad
- **Estadísticas en Tiempo Real**: Contadores dinámicos

## 🎨 Diseño y UX

- **Interfaz Moderna**: Diseño limpio y profesional con Tailwind
- **Responsivo**: Grid system y breakpoints de Tailwind
- **Dark Mode**: Tema oscuro/claro con clases condicionales
- **Feedback Visual**: Transiciones y estados de hover con Tailwind
- **Navbar Responsive**: Menú hamburguesa en móvil con animaciones

## 📝 Documentación Técnica

### Caso Real
El archivo `CASO-REAL.md` documenta un proyecto real de desarrollo completo: un sistema web de gestión de tickets para una microempresa de reparación de computadoras. Incluye:
- Arquitectura cliente-servidor (Spring Boot + MySQL)
- Sistema de roles y autenticación
- Pruebas automatizadas (Selenium) y de carga (Locust)
- Desarrollo individual completado en 2 meses
- Proyecto de cierre de ingeniería entregado exitosamente

### Arquitectura Monorepo
El archivo `ARQUITECTURA-MONOREPO.md` presenta el diseño teórico de un monorepo escalable con Nx, detallando:
- Estructura de 4 paquetes principales (ui, utils, interfaces, settings)
- Justificación técnica: Nx vs Turborepo
- Configuración y flujo de trabajo
- Ejemplo de implementación completo

**Implementación práctica:**  
Se desarrolló un monorepo funcional con Nx que demuestra la arquitectura propuesta.

🔗 **Repositorio:** [github.com/Emmory/monorepo-demo](https://github.com/Emmory/monorepo-demo)  
🔗 **Demo en vivo:** [monorepo-demo-ui-zeta.vercel.app](https://monorepo-demo-ui-zeta.vercel.app)

Este repositorio incluye:
- ✅ 4 paquetes compilados y funcionando (ui, utils, interfaces, settings)
- ✅ Aplicación demo que integra todos los paquetes
- ✅ Configuración completa de Nx
- ✅ README con instrucciones de instalación

## 🔧 Tecnologías Utilizadas

- **Nuxt 3** - Meta-framework de Vue
- **Vue 3** - Framework JavaScript progresivo
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de utilidades CSS
- **Chart.js** - Visualización de datos
- **date-fns** - Manipulación de fechas
- **PostCSS** - Procesamiento de CSS

## 📦 Scripts Disponibles
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
```

## 🚀 Despliegue

La aplicación está desplegada en Vercel y optimizada para:
- Vercel
- Netlify
- Cloudflare Pages
```bash
npm run build    # Genera la carpeta .output/
```

## 👤 Autor

**Emmory Carias Gonzalez**
- Candidato para: Desarrollador Senior Frontend
- GitHub: [@Emmory](https://github.com/Emmory)
- Fecha: Enero 2026

---

## 📄 Licencia

Este proyecto fue desarrollado como prueba técnica para una evaluación de empleo.