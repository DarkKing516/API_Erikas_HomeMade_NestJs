import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { firestore } from 'src/lib/firebase/firebase-config';
import { RolesEntity } from '../data/entities/roles.entity';
import { CreateRoleDto } from '../data/dto/role/create-role.dto';
import { UpdateRoleDto } from '../data/dto/role/update-role.dto';
import { DeleteRoleDto } from '../data/dto/role/delete-role.dto';
import { fromSnapshot } from '../../../common/utils/functions';
import { roleConverter } from '../../../lib/firebase/converters/config/role-converter';
import { RedisService } from '../../../lib/services/redis.service';

@Injectable()
export class RolService {
  private collection = firestore.collection('roles');
  private collectionWithConverter = firestore.collection('roles').withConverter(roleConverter);
  constructor(private readonly redisService: RedisService) {}

  async getAllRoles(): Promise<RolesEntity[]> {
    return await this.mapCollection<RolesEntity>(this.collection);
  }

/*  async getAllRoles(): Promise<RolesEntity[]> {
    const cached = await this.redisService.get('roles:all');
    if (cached) return JSON.parse(cached);

    const roles = await this.mapCollection<RolesEntity>(this.collection);
    await this.redisService.set('roles:all', JSON.stringify(roles));
    return roles;
  }*/

  async getRoleByName(roleName: string): Promise<RolesEntity | null> {
    const roleSnapshot = await this.collection.doc(roleName.toLowerCase()).get();
    if (!roleSnapshot.exists) return null;
    return fromSnapshot<RolesEntity>(roleSnapshot);
  }

  async getRoleByNameWithConverter(roleName: string): Promise<RolesEntity> {
    const doc = await this.collectionWithConverter.doc(roleName.toLowerCase()).get();
    if (!doc.exists) throw new NotFoundException('Rol no encontrado');
    return doc.data()!;
  }

  async createRole(createRoleDto: CreateRoleDto): Promise<RolesEntity> {
    const existingRole = await this.getRoleByName(createRoleDto.role.toLowerCase());
    if (existingRole) throw new ConflictException('El rol ya existe');

    const newRoleRef = this.collection.doc();
    const newRole: RolesEntity = {
      ...createRoleDto,
      id      : newRoleRef.id,
      created : new Date(),
      status  : true,
    };

    await newRoleRef.set(newRole);
    return newRole;
  }

  async updateRole(updateData: UpdateRoleDto): Promise<RolesEntity> {
    const roleRef = this.collectionWithConverter.doc(updateData.id.toLowerCase());
    const roleSnapshot = await roleRef.get();

    if (!roleSnapshot.exists) throw new NotFoundException('Rol no encontrado');

    const { id, ...dataToUpdate } = updateData;
    await roleRef.update({ ...dataToUpdate, updated: new Date() });

    const updatedSnapshot = await roleRef.get();
    const updatedRole = updatedSnapshot.data();
    if (!updatedRole) throw new NotFoundException('Error al recuperar el rol actualizado');

    return updatedRole;
  }


  async deleteRole(deleteRole: DeleteRoleDto): Promise<boolean> {
    const roleRef = this.collection.doc(deleteRole.id);
    const roleSnapshot = await roleRef.get();

    if (!roleSnapshot.exists) throw new NotFoundException('Rol no encontrado');

    await roleRef.delete();
    return true;
  }

  private async mapCollection<T>(ref: FirebaseFirestore.CollectionReference): Promise<T[]> {
    const snapshot = await ref.get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as T));
  }
}

