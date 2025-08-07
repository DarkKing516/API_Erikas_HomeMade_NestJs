import {Permissions} from "../../../../modules/config/data/entities/permissions.entity";

export const permissionConverter = {
  toFirestore(permission: Permissions): FirebaseFirestore.DocumentData {
    const { id, ...data } = permission;
    return data;
  },
  fromFirestore(snapshot: FirebaseFirestore.DocumentSnapshot): Permissions {
    const data = snapshot.data();
    if (!data) throw new Error("Documento vacío");

    return { id: snapshot.id, ...data } as Permissions;
  }
};
