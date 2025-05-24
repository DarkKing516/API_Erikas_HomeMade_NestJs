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

## 📊 Soporte y Contribuciones al Proyecto

Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos. Si deseas contribuir al proyecto, por favor haz un **fork** y abre un **pull request** con las modificaciones.

![GitHub Contributors](https://img.shields.io/github/contributors/DarkKing516/API_Erikas_HomeMade_NestJs?style=for-the-badge)
![GitHub Last Commit](https://img.shields.io/github/last-commit/DarkKing516/API_Erikas_HomeMade_NestJs?style=for-the-badge)
![GitHub Commits](https://img.shields.io/github/commit-activity/y/DarkKing516/API_Erikas_HomeMade_NestJs?style=for-the-badge)
![GitHub PRs](https://img.shields.io/github/issues-pr/DarkKing516/API_Erikas_HomeMade_NestJs?style=for-the-badge)
![GitHub PRs Merged](https://img.shields.io/github/issues-pr-closed/DarkKing516/API_Erikas_HomeMade_NestJs?style=for-the-badge)

## 🚀 Tecnologías y Lenguajes

Este proyecto ha sido desarrollado con **NestJS**, un framework progresivo para Node.js que utiliza TypeScript y sigue principios de arquitectura modular.

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

![GitHub Languages](https://img.shields.io/github/languages/top/DarkKing516/API_Erikas_HomeMade_NestJs?style=for-the-badge)
![GitHub Languages Count](https://img.shields.io/github/languages/count/DarkKing516/API_Erikas_HomeMade_NestJs?style=for-the-badge)
![GitHub Repo Size](https://img.shields.io/github/repo-size/DarkKing516/API_Erikas_HomeMade_NestJs?style=for-the-badge)


## 👥 Colaboradores
- [![DarkKing516](https://github.com/DarkKing516.png?size=50)](https://github.com/DarkKing516)
- [![Dan2572](https://github.com/Dan2572.png?size=50)](https://github.com/Dan2572)
- [![Ikaedso](https://github.com/Ikaedso.png?size=50)](https://github.com/Ikaedso)
