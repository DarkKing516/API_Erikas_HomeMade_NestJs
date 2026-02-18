export const DEFAULT_PERMISSIONS = [
    // Usuarios
    { id: 'view:config:users', permission: 'Ver lista de usuarios' },
    { id: 'view:config:user-detail', permission: 'Ver detalle de usuario' },
    { id: 'create:config:user', permission: 'Crear nuevos usuarios' },
    { id: 'update:config:user', permission: 'Editar usuarios existentes' },
    { id: 'delete:config:user', permission: 'Eliminar usuarios' },

    // Roles
    { id: 'view:config:roles', permission: 'Ver lista de roles' },
    { id: 'create:config:role', permission: 'Crear nuevos roles' },
    { id: 'update:config:role', permission: 'Editar roles existentes' },
    { id: 'delete:config:role', permission: 'Eliminar roles' },

    // Permisos
    { id: 'view:config:all-permissions', permission: 'Ver lista de todos los permisos' },
    { id: 'create:config:permission', permission: 'Crear nuevos permisos' },
    { id: 'update:config:permission', permission: 'Editar permisos existentes' },
    { id: 'delete:config:permission', permission: 'Eliminar permisos individuales' },
    { id: 'delete:config:all-permissions', permission: 'Eliminar todos los permisos' },
    { id: 'sync:config:permissions', permission: 'Sincronizar permisos del sistema' },

    // Menús
    { id: 'view:config:menus', permission: 'Ver configuración de menús' },
    { id: 'create:config:menu', permission: 'Crear ítems de menú' },
    { id: 'update:config:menu', permission: 'Editar ítems de menú' },
    { id: 'delete:config:menu', permission: 'Eliminar ítems de menú' },

    // Aplicación
    { id: 'view:menu', permission: 'Ver todo el menú' },
] as const;

export type PermissionType = typeof DEFAULT_PERMISSIONS[number]['id'];
