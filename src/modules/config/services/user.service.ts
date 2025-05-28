import { Injectable, NotFoundException } from '@nestjs/common';
import { firestore } from 'src/lib/firebase/firebase-config';
import { UsersEntity } from '../data/entities/users.entity';
import { CreateUserDto } from '../data/dto/user/create-user.dto';
import { roleConverter } from '../../../lib/firebase/converters/config/role-converter';
import { UserConverter } from '../../../lib/firebase/converters/config/user-converter';

@Injectable()
export class UserService {
  private collection = firestore.collection('users').withConverter(UserConverter);
  private collectionRoles = firestore.collection('roles').withConverter(roleConverter);

  async getAll(): Promise<UsersEntity[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(doc => doc.data());
  }

  async createUser(dataCreate: CreateUserDto): Promise<UsersEntity> {
    const newUserRef = this.collection.doc();

    const roleIdSearch = (dataCreate.roleId ?? 'cliente').toLowerCase();
    const roleSnapshot = await this.collectionRoles.doc(roleIdSearch).get();

    if (!roleSnapshot.exists) throw new NotFoundException(`Rol no encontrado`);
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