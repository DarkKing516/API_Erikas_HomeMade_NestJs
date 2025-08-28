import { MenuEntity } from "../../../../modules/config/data/entities/menu.entity";

export const menuConverter = {
  toFirestore(menu: MenuEntity): FirebaseFirestore.DocumentData {
    const { id, permiso, submenus, id_permiso, ...rest } = menu;

    return {
      ...rest,
      id_permiso, // obligatorio
      submenus: submenus?.map(sub => menuConverter.toFirestore(sub)) ?? [],
    };
  },

  fromFirestore(snapshot: FirebaseFirestore.DocumentSnapshot): MenuEntity {
    const data = snapshot.data();
    if (!data) throw new Error("Documento vacío");

    return {
      id         : snapshot.id,
      titulo     : data.titulo,
      url        : data.url,
      icono      : data.icono,
      estado     : data.estado,
      id_permiso : data.id_permiso, // lo que realmente guardaste
      // permiso se llena luego haciendo el populate contra la colección de permisos
      created    : data.created,
      updated    : data.updated,
      submenus   : (data.submenus ?? []).map((sub: any, idx: number) => ({
        id         : sub.id ?? `submenu-${idx}`,
        titulo     : sub.titulo,
        url        : sub.url,
        icono      : sub.icono,
        estado     : sub.estado,
        id_permiso : sub.id_permiso,
        created    : sub.created ?? new Date().toISOString(),
        updated    : sub.updated ?? new Date().toISOString(),
        submenus   : sub.submenus ?? [],
      })),
    };
  }
};
