<template>
  <div style="padding: 2rem; max-width: 800px; margin: 0 auto; font-family: system-ui;">
    <h1 style="margin-bottom: 2rem; color: #1f2937;">
      🎉 ¡Monorepo Funcionando!
    </h1>
    
    <!-- Card 1: Componentes de @mi-empresa/ui -->
    <Card style="margin-bottom: 2rem;">
      <template #header>
        <h2 style="margin: 0;">📦 Componentes de @mi-empresa/ui</h2>
      </template>
      
      <p style="margin-bottom: 1rem; color: #6b7280;">
        Estos botones vienen del paquete <code>@mi-empresa/ui</code>:
      </p>
      
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <Button variant="primary" @click="handleClick('Primary')">
          Botón Primary
        </Button>
        
        <Button variant="secondary" @click="handleClick('Secondary')">
          Botón Secondary
        </Button>
        
        <Button variant="danger" @click="handleClick('Danger')">
          Botón Danger
        </Button>
      </div>
      
      <p v-if="lastClick" style="margin-top: 1rem; padding: 0.75rem; background: #f3f4f6; border-radius: 0.375rem;">
        {{ lastClick }}
      </p>
      
      <template #footer>
        <small style="color: #6b7280;">
          Importados desde: <code>packages/ui/src/components/</code>
        </small>
      </template>
    </Card>
    
    <!-- Card 2: Funciones de @mi-empresa/utils -->
    <Card>
      <template #header>
        <h2 style="margin: 0;">🛠️ Funciones de @mi-empresa/utils</h2>
      </template>
      
      <div style="margin-bottom: 1.5rem;">
        <h3 style="margin-bottom: 0.5rem; font-size: 1rem;">formatDate()</h3>
        <p style="color: #6b7280; margin-bottom: 0.5rem;">
          Fecha actual formateada:
        </p>
        <div style="padding: 0.75rem; background: #f3f4f6; border-radius: 0.375rem; font-weight: 600;">
          {{ formattedDate }}
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 0.5rem; font-size: 1rem;">validateEmail()</h3>
        <p style="color: #6b7280; margin-bottom: 0.5rem;">
          Escribe un email para validarlo:
        </p>
        <input
          v-model="email"
          type="text"
          placeholder="ejemplo@correo.com"
          style="width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 0.375rem; font-size: 1rem; margin-bottom: 0.5rem;"
        />
        <div
          :style="{
            padding: '0.75rem',
            borderRadius: '0.375rem',
            fontWeight: '600',
            background: isEmailValid ? '#d1fae5' : '#fee2e2',
            color: isEmailValid ? '#065f46' : '#991b1b'
          }"
        >
          {{ isEmailValid ? '✅ Email válido' : '❌ Email inválido' }}
        </div>
      </div>
      
      <template #footer>
        <small style="color: #6b7280;">
          Importadas desde: <code>packages/utils/src/</code>
        </small>

        
      </template>
    </Card>
    <!-- Card 3: Tipos de @mi-empresa/interfaces -->
    <Card style="margin-top: 2rem;">
      <template #header>
        <h2 style="margin: 0;">📋 Tipos de @mi-empresa/interfaces</h2>
      </template>
      
      <p style="color: #6b7280; margin-bottom: 1rem;">
        Ejemplo de tipos TypeScript compartidos:
      </p>
      
      <pre style="background: #f3f4f6; padding: 1rem; border-radius: 0.375rem; overflow-x: auto; font-size: 0.875rem;"><code>{{ sampleUser }}</code></pre>
      
      <template #footer>
        <small style="color: #6b7280;">
          Tipos desde: <code>packages/interfaces/src/</code>
        </small>
      </template>
    </Card>
    
    <!-- Card 4: Configuraciones de @mi-empresa/settings -->
    <Card style="margin-top: 2rem;">
      <template #header>
        <h2 style="margin: 0;">⚙️ Configuraciones de @mi-empresa/settings</h2>
      </template>
      
      <div style="margin-bottom: 1rem;">
        <h3 style="margin-bottom: 0.5rem; font-size: 1rem;">Constantes:</h3>
        <div style="padding: 0.75rem; background: #f3f4f6; border-radius: 0.375rem;">
          <p style="margin: 0.25rem 0;"><strong>App:</strong> {{ APP_NAME }} v{{ APP_VERSION }}</p>
          <p style="margin: 0.25rem 0;"><strong>Color Primary:</strong> <span :style="`color: ${THEME.COLORS.PRIMARY}`">{{ THEME.COLORS.PRIMARY }}</span></p>
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 0.5rem; font-size: 1rem;">Feature Flags:</h3>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <span v-for="(value, key) in FEATURES" :key="key" 
                :style="`padding: 0.25rem 0.75rem; border-radius: 0.25rem; font-size: 0.875rem; background: ${value ? '#d1fae5' : '#fee2e2'}; color: ${value ? '#065f46' : '#991b1b'}`">
            {{ key }}: {{ value ? '✅' : '❌' }}
          </span>
        </div>
      </div>
      
      <template #footer>
        <small style="color: #6b7280;">
          Configuraciones desde: <code>packages/settings/src/</code>
        </small>
      </template>
    </Card>
    
    <!-- Mensaje final -->
    <div style="margin-top: 2rem; padding: 1.5rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 0.5rem; color: white; text-align: center;">
      <h3 style="margin: 0 0 0.5rem 0;">🎊 ¡Genial!</h3>
      <p style="margin: 0;">
        Emmory: Mi primer MONOREPO! 
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button, Card } from '../../../packages/ui/src/index'
import { formatDate, validateEmail } from '../../../packages/utils/src/index'
import { APP_NAME, APP_VERSION, THEME, FEATURES } from '../../../packages/settings/src/index'
import type { User } from '../../../packages/interfaces/src/index'

// Estado
const lastClick = ref('')
const email = ref('')

// Computeds
const formattedDate = computed(() => formatDate(new Date()))
const isEmailValid = computed(() => validateEmail(email.value))

// Métodos
const handleClick = (variant: string) => {
  lastClick.value = `Botón ${variant} clickeado a las ${new Date().toLocaleTimeString()}`
}

const sampleUser: User = {
  id: '1',
  email: 'demo@ejemplo.com',
  name: 'Usuario Demo',
  role: 'admin',
  createdAt: '2026-01-10'
}
</script>