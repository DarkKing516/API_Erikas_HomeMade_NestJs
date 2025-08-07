import { Injectable, NotFoundException } from '@nestjs/common';
import { firestore } from 'src/lib/firebase/firebase-config';
import { CreateUserDto } from '../data/dto/user/create-user.dto';
import { roleConverter } from '../../../lib/firebase/converters/config/role-converter';
import { UserConverter } from '../../../lib/firebase/converters/config/user-converter';
import {Users} from "../data/entities/users.entity";

@Injectable()
export class UserService {
  private collection = firestore.collection('users').withConverter(UserConverter);
  private collectionRoles = firestore.collection('roles').withConverter(roleConverter);

  async getAll(): Promise<Users[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(doc => doc.data());
  }

  async createUser(dataCreate: CreateUserDto): Promise<Users> {
    const newUserRef = this.collection.doc();

    const roleIdSearch = (dataCreate.roleId ?? 'cliente').toLowerCase();
    const roleSnapshot = await this.collectionRoles.doc(roleIdSearch).get();

    if (!roleSnapshot.exists) throw new NotFoundException(`Rol no encontrado`);
    const role = roleSnapshot.data()!;

    const newUser: Users = {
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