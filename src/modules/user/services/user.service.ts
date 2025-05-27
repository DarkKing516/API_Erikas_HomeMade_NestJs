import { Injectable } from '@nestjs/common';
import { firestore } from 'src/lib/firebase/firebase-config';
import { UsersEntity } from '../data/entities/users.entity';
import { CreateUserDto } from '../data/dto/create-user.dto';
import { RolesEntity } from '../../config/data/entities/roles.entity';
import { roleConverter } from '../../../lib/firebase/converters/config/role-converter';

@Injectable()
export class UserService {
  private collection = firestore.collection('users');
  private collectionRoles = firestore.collection('roles').withConverter(roleConverter);

  async getAll(): Promise<UsersEntity[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as UsersEntity,
    );
  }

  async createUser(dataCreate: CreateUserDto): Promise<UsersEntity | null> {
    const newUserRef = this.collection.doc();

    const roleIdSearch = dataCreate.roleId || 'cliente';
    const roleSnapshot: FirebaseFirestore.DocumentSnapshot<RolesEntity> = await this.collectionRoles.doc(roleIdSearch).get();

    if (!roleSnapshot.exists) return null;
    const role = roleSnapshot.data()!;

    const newUser: UsersEntity = {
      ...dataCreate,
      id      : newUserRef.id,
      created : new Date(),
      status  : true,
      role    : role,
    };
    await newUserRef.set(newUser);
    return newUser;
  }
}