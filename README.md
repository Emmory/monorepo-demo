# 🏢 Mi Empresa - Monorepo

Monorepo empresarial construido con **Nx**, **Vue 3**, **TypeScript** y **Vite**.

Este proyecto demuestra arquitectura escalable con código compartido entre múltiples aplicaciones.

---
En el archivo Documentacion de creacion de mono repo.docx se documenta la creacion del monorepo
## 📦 Estructura del Proyecto
```
mi-empresa/
├── packages/              # Código compartido
│   ├── ui/               # Componentes Vue reutilizables
│   ├── utils/            # Funciones utilitarias
│   ├── interfaces/       # Tipos TypeScript compartidos
│   └── settings/         # Configuraciones y constantes
│
└── apps/                 # Aplicaciones deployables
    └── demo-app/         # Aplicación de demostración
```

---

## 🎯 Paquetes

### 1. `@mi-empresa/ui`

**Propósito:** Biblioteca de componentes de UI reutilizables.

**Exporta:**
- `Button` - Componente de botón con 3 variantes (primary, secondary, danger)
- `Card` - Componente de tarjeta con header, body y footer

**Tecnologías:**
- Vue 3.4
- TypeScript
- Vite (para compilación)

**Consumido por:**
- `apps/demo-app`

**Comandos:**
```bash
cd packages/ui
npm install
npm run build
```

---

### 2. `@mi-empresa/utils`

**Propósito:** Funciones de utilidad comunes.

**Exporta:**
- `formatDate(date: Date): string` - Formatea fechas a DD/MM/YYYY
- `validateEmail(email: string): boolean` - Valida formato de email

**Tecnologías:**
- TypeScript

**Consumido por:**
- `apps/demo-app`

**Comandos:**
```bash
cd packages/utils
npm install
npm run build
```

---

### 3. `@mi-empresa/interfaces`

**Propósito:** Definiciones de tipos e interfaces compartidas para tipado de datos.

**Exporta:**
- `User` - Interface para usuarios del sistema
- `Task` - Interface para tareas
- `TaskStatus` - Enum de estados de tareas
- `TaskPriority` - Enum de prioridades
- `ApiResponse<T>` - Respuesta estándar de API
- `Pagination` - Interface de paginación

**Tecnologías:**
- TypeScript

**Consumido por:**
- Todos los paquetes y aplicaciones que necesiten tipado

**Comandos:**
```bash
cd packages/interfaces
npm install
npm run build
```

---

### 4. `@mi-empresa/settings`

**Propósito:** Configuraciones compartidas (variables de entorno, constantes, feature flags).

**Exporta:**
- `APP_NAME`, `APP_VERSION` - Constantes de aplicación
- `API_ENDPOINTS` - Rutas de API centralizadas
- `THEME` - Colores y breakpoints del tema
- `FEATURES` - Feature flags para activar/desactivar funcionalidades
- `ENV` - Configuración de entorno
- `validateEnv()` - Validación de variables requeridas

**Tecnologías:**
- TypeScript
- @types/node

**Consumido por:**
- Todas las aplicaciones del monorepo

**Comandos:**
```bash
cd packages/settings
npm install
npm run build
```

---

## 🚀 Aplicaciones

### `demo-app`

Aplicación de demostración que integra todos los paquetes del monorepo.

**Características:**
- ✅ Usa componentes de `@mi-empresa/ui`
- ✅ Usa funciones de `@mi-empresa/utils`
- ✅ Tipado con `@mi-empresa/interfaces`
- ✅ Configurado con `@mi-empresa/settings`

**Ejecutar:**
```bash
cd apps/demo-app
npm install
npm run dev
```

Abre http://localhost:5173

---

## 🛠️ Tecnologías

- **Gestor de Monorepo:** Nx 22.3.3
- **Framework:** Vue 3.4
- **Build Tool:** Vite 5.0
- **Lenguaje:** TypeScript 5.3
- **Package Manager:** npm

---

## 📋 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/Emmory/monorepo-demo.git
cd monorepo-demo
```

### 2. Compilar todos los paquetes
```bash
# Compilar utils
cd packages/utils && npm install && npm run build && cd ../..

# Compilar interfaces
cd packages/interfaces && npm install && npm run build && cd ../..

# Compilar settings
cd packages/settings && npm install && npm run build && cd ../..

# Compilar ui
cd packages/ui && npm install && npm run build && cd ../..
```

### 3. Instalar y ejecutar la app
```bash
cd apps/demo-app
npm install
npm run dev
```

---

## 🎨 Ventajas del Monorepo

### ✅ Código Compartido
- Un cambio en `Button.vue` se refleja en todas las apps
- Evita duplicación de código

### ✅ Tipado Consistente
- Types compartidos garantizan contratos de datos uniformes
- IntelliSense completo en toda la codebase

### ✅ Refactorización Segura
- TypeScript alerta cuando un cambio afecta múltiples apps
- Imposible romper contratos sin saberlo

### ✅ Desarrollo Eficiente
- Nuevas apps arrancan con componentes existentes
- Menos código que escribir y mantener

---

## 📚 Comandos Útiles

### Compilar todo
```bash
npm run build --workspace=packages/utils
npm run build --workspace=packages/ui
npm run build --workspace=packages/interfaces
npm run build --workspace=packages/settings
```

### Agregar dependencia a un paquete
```bash
npm install <package> --workspace=packages/ui
```

### Ver estructura
```bash
npx nx graph
```

---

## 👨‍💻 Autor

**Emory Carias Gonzalez**

- GitHub: [@Emmory](https://github.com/Emmory)

---



## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-feature`)
3. Commit tus cambios (`git commit -m 'Agregar nueva feature'`)
4. Push a la rama (`git push origin feature/nueva-feature`)
5. Abre un Pull Request
