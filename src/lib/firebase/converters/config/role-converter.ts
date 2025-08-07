import {Roles} from '../../../../modules/config/data/entities/roles.entity';

export const roleConverter = {
  toFirestore(role: Roles): FirebaseFirestore.DocumentData {
    const { id, ...data } = role;
    return data;
  },
  fromFirestore(snapshot: FirebaseFirestore.DocumentSnapshot): Roles {
    const data = snapshot.data();
    if (!data) throw new Error("Documento vacío");

    return { id: snapshot.id, ...data } as Roles;
  }
};