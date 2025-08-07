import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { firestore } from 'src/lib/firebase/firebase-config';
import { Roles } from '../data/entities/roles.entity';
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
  constructor(private readonly redisService: RedisService) {} // TODO: usar caché para actaulizar en tiempo real

  async getAllRoles(): Promise<Roles[]> {
    return await this.mapCollection<Roles>(this.collection);
  }

/*  async getAllRoles(): Promise<Roles[]> {
    const cached = await this.redisService.get('roles:all');
    if (cached) return JSON.parse(cached);

    const roles = await this.mapCollection<Roles>(this.collection);
    await this.redisService.set('roles:all', JSON.stringify(roles));
    return roles;
  }*/

  async createRole(createRoleDto: CreateRoleDto): Promise<Roles> {
    const existingRole = await this.getRoleByName(createRoleDto.role.toLowerCase());
    if (existingRole) throw new ConflictException('El rol ya existe');

    const newRoleRef = this.collection.doc();
    const nowString = new Date().toISOString();
    const newRole: Roles = {
      ...createRoleDto,
      id      : newRoleRef.id,
      created : nowString,
      updated : nowString,
      status  : true,
    };

    await newRoleRef.set(newRole);
    return newRole;
  }

  async updateRole(updateData: UpdateRoleDto): Promise<Roles> {
    const roleRef = this.collectionWithConverter.doc(updateData.id.toLowerCase());
    const roleSnapshot = await roleRef.get();

    if (!roleSnapshot.exists) throw new NotFoundException('Rol no encontrado');

    const { id, ...dataToUpdate } = updateData;
    await roleRef.update({ ...dataToUpdate, updated: new Date().toISOString() });

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

  private async getRoleByName(roleName: string): Promise<Roles | null> {
    const roleSnapshot = await this.collection.doc(roleName.toLowerCase()).get();
    if (!roleSnapshot.exists) return null;
    return fromSnapshot<Roles>(roleSnapshot);
  }

  private async mapCollection<T>(ref: FirebaseFirestore.CollectionReference): Promise<T[]> {
    const snapshot = await ref.get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as T));
  }
}

