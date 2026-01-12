# Sistema Web de Gestión de Tickets – Microempresa de Reparación de Computadoras

## 📌 Descripción General

Este proyecto consiste en el **desarrollo e implementación de un sistema web de gestión de tickets** para una **microempresa dedicada a la reparación y mantenimiento de computadoras**.  
El sistema fue desarrollado como **proyecto de cierre de ingeniería**, con el objetivo de digitalizar y optimizar el control de clientes, equipos, diagnósticos y seguimiento de reparaciones.

El proyecto fue realizado **de manera individual**, con una duración total de **dos meses**, incluyendo el desarrollo del sistema y la elaboración paralela de la documentación técnica.

---

## 🎯 Objetivos del Sistema

- Digitalizar el proceso de atención técnica
- Centralizar la información de clientes y equipos
- Permitir el seguimiento completo del estado de reparación
- Implementar control de acceso mediante roles
- Garantizar persistencia y seguridad de la información
- Aplicar buenas prácticas de desarrollo y pruebas

---

## 🧱 Arquitectura del Sistema

El sistema fue desarrollado bajo una arquitectura **cliente-servidor**, separando claramente frontend, backend y base de datos.

Frontend (HTML + JavaScript)
│
▼
Backend (Spring Boot - APIs REST)
│
▼
Base de Datos (MySQL en Docker)

yaml
Copiar código

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- HTML5
- JavaScript puro

### Backend
- Java
- Spring Boot
- APIs REST

### Base de Datos
- MySQL
- DBMS: DBeaver

### Contenedores
- Docker (base de datos)

### Pruebas
- Selenium (pruebas automatizadas)
- Locust (pruebas de carga)

---

## 🗄️ Modelo de Datos

El sistema está compuesto por **cinco tablas principales**:

- **Clientes**
- **Tickets**
- **Usuarios**
- **Roles**
- **Relación Usuario–Rol**

Este modelo permite una correcta gestión de accesos y trazabilidad de la información.

---

## 🔐 Seguridad y Roles

El sistema implementa **autenticación y autorización basada en roles**.

### 👤 Rol Administrador
- Registrar y gestionar clientes
- Crear y asignar tickets
- Registrar estado del equipo
- Cargar imágenes del estado de la computadora
- Dar seguimiento completo al proceso de reparación
- Acceso total al sistema

### 🛠️ Rol Técnico
- Visualizar tickets asignados
- Cambiar el estado del ticket
- Registrar comentarios técnicos
- Acceso restringido a funciones administrativas

---

## 🧪 Pruebas y Validación

### Pruebas Automatizadas
- Se implementaron pruebas funcionales utilizando **Selenium**
- La configuración inicial presentó dificultades técnicas
- Tras múltiples iteraciones, se logró la ejecución exitosa de las pruebas automatizadas

### Pruebas de Carga
- Se realizaron pruebas de carga con **Locust**
- Se validó el comportamiento del sistema bajo múltiples solicitudes concurrentes

---

## ⚠️ Retos Técnicos Enfrentados

- Falta de experiencia inicial con Docker
- Dificultad en la creación y consumo de APIs REST
- Configuración compleja de pruebas automatizadas
- Bugs funcionales durante las primeras iteraciones

Todos los retos fueron superados mediante investigación, prueba y error, y validación continua.

---

## ✅ Resultados Obtenidos

- Sistema funcional conforme a los requerimientos
- Documentación técnica completada
- Entrega exitosa del sistema:
  - A la microempresa cliente
  - Al docente evaluador
- Proyecto aprobado satisfactoriamente como cierre de ingeniería

---

## 📚 Lecciones Aprendidas

- El aprendizaje autodidacta es clave en proyectos reales
- Docker facilita la gestión de entornos una vez comprendido
- Las pruebas automatizadas requieren constancia y paciencia
- La definición clara de roles mejora la seguridad del sistema
- La documentación es una parte fundamental del desarrollo

---

## 🏁 Conclusión

Este proyecto permitió consolidar conocimientos en desarrollo web, APIs REST, bases de datos, contenedores y pruebas, demostrando la capacidad de enfrentar retos técnicos reales y entregar una solución funcional, documentada y alineada a las necesidades de una empresa real.

---

## 👩‍💻 Autora

Proyecto desarrollado de manera individual como cierre de ingeniería.