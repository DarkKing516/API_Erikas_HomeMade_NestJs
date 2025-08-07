import { Users } from '../../../../modules/config/data/entities/users.entity';

export const UserConverter = {
  toFirestore(role: Users): FirebaseFirestore.DocumentData {
    const { id, ...data } = role;
    return data;
  },
  fromFirestore(snapshot: FirebaseFirestore.DocumentSnapshot): Users {
    const data = snapshot.data();
    if (!data) throw new Error('Documento vacío');

    return { id: snapshot.id, ...data } as Users;
  },
};