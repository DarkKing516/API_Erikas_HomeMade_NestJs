import { TypeProductsEntity } from '../../../../modules/product/data/entities/product-types.entity';

export const ProductTypeConverter = {
  toFirestore(role: TypeProductsEntity): FirebaseFirestore.DocumentData {
    const { id, ...data } = role;
    return data;
  },
  fromFirestore(
    snapshot: FirebaseFirestore.DocumentSnapshot,
  ): TypeProductsEntity {
    const data = snapshot.data();
    if (!data) throw new Error('Documento vacío');

    return { id: snapshot.id, ...data } as TypeProductsEntity;
  },
};