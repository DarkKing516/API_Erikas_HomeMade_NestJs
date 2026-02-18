# 🏗️ Arquitectura y Reglas de Desarrollo - Erika's Homemade API

Este documento es la **Fuente de la Verdad** para el desarrollo del proyecto. Cualquier nueva funcionalidad o refactorización debe alinearse con estos principios para garantizar un crecimiento modular, mantenible y profesional.

---

## 🔝 Principios Fundamentales

1.  **Cero `any`**: Está prohibido el uso de `any`. Todo debe estar estrictamente tipado.
2.  **Modularidad Estricta**: Cada dominio de negocio vive en `src/modules`.
3.  **Desacoplamiento**: Comunicación vía servicios inyectados; evitar dependencias circulares.
4.  **Validación y Documentación**: Toda petición HTTP se valida vía DTOs y se documenta con Swagger.
5.  **Single Responsibility Principle (SRP)**: Cada clase tiene una única responsabilidad clara.

---

## �️ Reglas del Desarrollador (Developer Truths)

### 1. Antes de Crear
Antes de usar el CLI o crear archivos manualmente, **SIEMPRE** revisa el [nest-cli.json](file:///c:/Users/Usuario/Documents/ERIKAS/API_Erikas_HomeMade_NestJs/nest-cli.json).
- Asegúrate de estar en el contexto correcto (app o library).
- El proyecto actual usa una estructura de librería para `firebase`.

### 2. Estética y Formato (Clean & Aligned)
Valoramos la legibilidad visual ("Clean and pleasant to the eye").
- **Alineación Visual**: Alinea las inyecciones de dependencias y definiciones de tipos para crear tablas visuales limpias.
- **Simplificación**: Evita llaves innecesarias para sentencias de una línea y usa ternarios para retornos simples.

```typescript
// ✅ BIEN (Alineado y ordenado)
constructor(
    @InjectRepository(LogsEntity, 'sqliteConnection') private logRepository : Repository<LogsEntity>,
    private readonly menuService                                            : MenuService,
    private readonly authService                                            : AuthService,
) {}

// ✅ BIEN (Simplificado)
if (!isValid) return null;
const result = check ? 'A' : 'B';
```

### 3. DTOs (Contratos de Verdad)
Los DTOs son obligatorios para entrada/salida y **DEBEN** incluir siempre:
1. Decoradores de validación (`class-validator`).
2. Decorador `@ApiProperty()` de `@nestjs/swagger` para la documentación.

```typescript
export class CreateProductDto {
  @ApiProperty({ description: 'Nombre del producto', example: 'Vestido de Gala' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Precio unitario' })
  @IsNumber()
  @Min(0)
  price: number;
}
```

---

## 📁 Estructura del Proyecto (Encarpetado)

### `src/modules/[module-name]/`
- `controllers/`: Manejo de peticiones/respuestas HTTP.
- `services/`: Lógica de negocio pura.
- `data/`:
    - `dto/`: Contratos de entrada/salida (con `@ApiProperty`).
    - `entities/`: Definición de datos del dominio.

### `libs/`
Contiene lógica compartida y componentes pesados (ej. `firebase`).
- **CRÍTICO**: El mapeo entre Firestore y la app debe usar `Converters` en `libs/firebase/src/converters`.

---

## 💾 Gestión de Datos y Transacciones

### Base de Datos Principal (Firebase)
- Nada se deja "a la deriva". Todo documento de Firestore debe mapearse a una entidad tipada.
- **Transacciones**: Para operaciones que involucren múltiples escrituras (ej: Pedido + Inventario), usa transacciones de Firestore para garantizar la atomicidad.

### Sistema de Logs (SQLite)
- Auditoría y errores críticos se persisten en `logs.sqlite` vía `LogService`.

---

## 🛡️ Seguridad y Permisos
 
 ### 1. Declaración de Permisos
 El sistema de permisos es **estrictamente tipado**. Cada vez que se cree un endpoint se debe usar el decorador `@RequirePermissions()`, se debe:
 1. Validar si el permiso existe en [permissions.constant.ts](file:///c:/Users/Usuario/Documents/ERIKAS/API_Erikas_HomeMade_NestJs/src/common/enum/permissions.constant.ts).
 2. Si no existe, agregarlo al array `DEFAULT_PERMISSIONS` usando la sintaxis correcta.
 
 ### 2. Convención de Naming (Sintaxis)
 Los permisos deben seguir la estructura `accion:modulo` o `accion:modulo:submodulo`:
 - **Acciones comunes**: `view`, `create`, `update`, `delete`, `manage`.
 - **Ejemplo Simple**: `create:user`
 - **Ejemplo Jerárquico**: `view:config:all-permissions`
 
 ---
 
 ## 🚀 Cómo Escalar
Para añadir una funcionalidad (ej. "Ventas"):
1. Verifica `nest-cli.json`.
2. Crea el módulo: `nest generate module modules/sales`.
3. Define DTOs tipados y documentados en `@ApiProperty`.
4. Implementa la lógica aplicando el estilo "Clean & Aligned".

---
*Este documento es dinámico. Si encuentras un patrón mejor que cumpla con los principios de modularidad y tipado, actualízalo aquí primero.*
