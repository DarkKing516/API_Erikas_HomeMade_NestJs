import { Injectable } from '@nestjs/common';
import { firestore } from 'src/lib/firebase/firebase-config';
import { UsersEntity } from '../data/entities/users.entity';
import { CreateUserDto } from '../data/dto/create-user.dto';
@Injectable()
export class UserService {
  private collection = firestore.collection('users');
  private collectionRoles = firestore.collection('roles');

  async getAll(): Promise<UsersEntity[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as UsersEntity,
    );
  }

  async createUser(dataCreate: CreateUserDto): Promise<UsersEntity | null> {
    const newUserRef = this.collection.doc();
    let roleDefault = await this.collectionRoles.doc("cliente").get();
    if (!dataCreate.roleId) {
    const roleSnapshot = await this.collectionRoles.doc(dataCreate.roleId).get();
    if (roleSnapshot.exists) roleDefault= roleSnapshot;
    }
    const newUser: UsersEntity = {
      ...dataCreate,
      id: newUserRef.id,
      status: true,
      created: new Date(),
      role: roleDefault,
    };
    await newUserRef.set(newUser);
    return newUser;
  }
}