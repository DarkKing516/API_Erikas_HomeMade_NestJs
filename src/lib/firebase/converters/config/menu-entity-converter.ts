import { MenuEntity } from "../../../../modules/config/data/entities/menu.entity";

export const menuConverter = {
  toFirestore(menu: MenuEntity): FirebaseFirestore.DocumentData {
    const { id, ...data } = menu;

    return {
      ...data,
      permiso : menu.permiso?.id || null,
      submenus: menu.submenus?.map(sub => menuConverter.toFirestore(sub)) ?? [], // Recursividad
    };
  },

  fromFirestore(snapshot: FirebaseFirestore.DocumentSnapshot): MenuEntity {
    const data = snapshot.data();
    if (!data) throw new Error("Documento vacío");

    return {
      id      : snapshot.id,
      titulo  : data.titulo,
      url     : data.url,
      icono   : data.icono,
      estado  : data.estado,
      permiso : data.permiso,
      submenus: (data.submenus ?? []).map((sub: any, idx: number) => ({
        id      : sub.id ?? `submenu-${idx}`, // Asigna un ID temporal si no hay
        titulo  : sub.titulo,
        url     : sub.url,
        icono   : sub.icono,
        estado  : sub.estado,
        permiso : sub.permiso ? { id: sub.permiso } : null,
        submenus: sub.submenus ?? [],
      })),
    };
  }
};
