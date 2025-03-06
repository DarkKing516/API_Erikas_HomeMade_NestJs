# Erika's Homemade API

Este proyecto es la API backend para **Erika's Homemade**, una aplicación que gestiona los roles, usuarios, productos, reservas y otros servicios para un negocio de modistería. Originalmente, un monolito, este proyecto se migró a una arquitectura de API usando **NestJS** y se conecta con **Firebase** para gestionar datos.

La API utiliza **Swagger** para la documentación interactiva y **Firebase** como base de datos. Esta API también soporta operaciones CRUD sobre los roles y servicios del sistema.

[Visita la WEB aquí](https://erikas-homemade.onrender.com/).

[Visita la API aquí](https://erikas-homemade-api.com/).

[localhost:3001/api](http://localhost:3000/api)

## Configuración del Proyecto

### Requisitos

Asegúrate de tener **Node.js** y **npm** instalados. Si no los tienes, puedes descargarlos desde [Node.js](https://nodejs.org/) 
NOTA: se recomienda el uso de [NVM](https://github.com/coreybutler/nvm-windows.git) en lugar de instalar Node.js convencional.

### Instalación de Dependencias

Para instalar las dependencias del proyecto, ejecuta el siguiente comando en la raíz del proyecto:

```bash
$ npm install
```

### Generar Módulos, Controladores y Servicios

Para generar nuevos módulos, controladores o servicios en NestJS, puedes usar los siguientes comandos:

```bash
$ nest generate module nombre_del_modulo
$ nest generate controller nombre_del_controlador
$ nest generate service nombre_del_servicio
```

## Ejecutar el Proyecto

### Modos de Ejecución

1. **Modo Desarrollo:**
   Ejecuta el proyecto en modo desarrollo:

   ```bash
   $ npm run start:dev
   ```

2. **Modo Desarrollo con Nodemon:**
   Si deseas que el proyecto se reinicie automáticamente en cambios de código:

   ```bash
   $ npm run nodemon:dev
   ```

3. **Modo Producción:**
   Para ejecutar el proyecto en modo producción:

   ```bash
   $ npm run start:prod
   ```

### Compilación

Si necesitas compilar el proyecto, usa el siguiente comando:

```bash
$ npm run build
```

---

## Testing

Para ejecutar los tests del proyecto:

1. **Tests Unitarios:**

   ```bash
   $ npm run test
   ```

2. **Tests E2E (End to End):**

   ```bash
   $ npm run test:e2e
   ```

3. **Cobertura de Tests:**

   ```bash
   $ npm run test:cov
   ```

---

## Conexión con Firebase

Este proyecto está conectado a **Firebase** para gestionar datos en tiempo real. Asegúrate de configurar las credenciales de Firebase correctamente en el archivo de configuración `firebase-config.ts` (o el que utilices) antes de iniciar el proyecto.

---

## Swagger UI

La API está documentada y puedes acceder a la interfaz de Swagger para ver y probar los endpoints directamente desde el navegador. Una vez que la API esté en ejecución, accede a:

```
http://localhost:3000/api
```

---

## Soporte y Contribuciones

Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos. Si deseas contribuir al proyecto, por favor haz un **fork** y abre un **pull request** con las modificaciones.
