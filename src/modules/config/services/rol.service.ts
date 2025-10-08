import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { firestore } from 'src/lib/firebase/firebase-config';
import { Roles } from '../data/entities/roles.entity';
import { CreateRoleDto } from '../data/dto/role/create-role.dto';
import { UpdateRoleDto } from '../data/dto/role/update-role.dto';
import { fromSnapshot } from '../../../common/utils/functions';
import { roleConverter } from '../../../lib/firebase/converters/config/role-converter';
import { RedisService } from '../../../lib/services/redis.service';
import { permissionConverter } from '../../../lib/firebase/converters/config/permission-converter';
import { ReturnRoleDto } from '../data/dto/role/return-role.dto';
import { Permissions } from '../data/entities/permissions.entity';

@Injectable()
export class RolService {
  private collection = firestore.collection('roles');
  private collectionWithConverter = firestore.collection('roles').withConverter(roleConverter);
  constructor(private readonly redisService: RedisService) {} // TODO: usar caché para actualizar en tiempo real

  async getAllRoles(): Promise<ReturnRoleDto[]> {
    const rawRoles = await this.mapCollection<Roles>(this.collection);
    return await Promise.all(rawRoles.map(role => this.buildReturnRole(role)));
  }

  async getAllRolesRedis(): Promise<ReturnRoleDto[]> {
    const cached = await this.redisService.get('roles:all');
    if (cached) return JSON.parse(cached);

    const rawRoles = await this.mapCollection<Roles>(this.collection);
    const formatRoles = await Promise.all(rawRoles.map(role => this.buildReturnRole(role)));

    await this.redisService.set('roles:all', JSON.stringify(formatRoles));
    return formatRoles;
  }

  async createRole(createRoleDto: CreateRoleDto): Promise<boolean> {
    const existingRole = await this.getRoleByName(createRoleDto.role.toLowerCase());
    if (existingRole) throw new ConflictException('El rol ya existe');

    if (createRoleDto.permissions?.length) await this.validatePermissionIds(createRoleDto.permissions);

    const newRoleRef = this.collection.doc();
    const nowString = new Date().toISOString();
    const newRole: Roles = {
      ...createRoleDto,
      id      : newRoleRef.id,
      created : nowString,
      updated : nowString,
      status  : true,
    };

    await newRoleRef.withConverter(roleConverter).set(newRole);
    return true;
  }

  async updateRole(updateData: UpdateRoleDto): Promise<boolean> {
    const roleRef = this.collectionWithConverter.doc(updateData.id.toLowerCase());
    const roleSnapshot = await roleRef.get();

    if (!roleSnapshot.exists) throw new NotFoundException('Rol no encontrado');

    if (updateData.permissions?.length) {
      await this.validatePermissionIds(updateData.permissions);
    }

    const { id, ...dataToUpdate } = updateData;
    await roleRef.update({ ...dataToUpdate, updated: new Date().toISOString() });

    const updatedSnapshot = await roleRef.get();
    const updatedRole = updatedSnapshot.data();
    if (!updatedRole) throw new NotFoundException('Error al recuperar el rol actualizado');

    return true;
  }

  async deleteRole(idRol: string): Promise<boolean> {
    const roleRef = this.collection.doc(idRol);
    const roleSnapshot = await roleRef.get();
    if (!roleSnapshot.exists) throw new NotFoundException('Rol no encontrado');
    await roleRef.delete();
    return true;
  }

  async buildReturnRole(role: Roles): Promise<ReturnRoleDto> {
    const permissions = role.permissions ? await this.populatePermissions(role.permissions) : [];
    return { ...role, permissions, };
  }

  private async validatePermissionIds(permissionIds: string[]): Promise<void> {
    const permissionsRef = firestore.collection('permissions').withConverter(permissionConverter);

    const permissionSnapshots = await Promise.all(
      permissionIds.map(id => permissionsRef.doc(id).get())
    );

    const invalidIds = permissionIds.filter((_, index) => !permissionSnapshots[index].exists);
    if (invalidIds.length > 0) throw new NotFoundException(`Permisos no encontrados: ${invalidIds.join(', ')}`);
  }

  private async populatePermissions(permissionIds: string[]): Promise<Permissions[]> {
    const permissionsRef = firestore.collection('permissions').withConverter(permissionConverter);
    const permissionSnapshots = await Promise.all(
      permissionIds.map(id => permissionsRef.doc(id).get())
    );

    return permissionSnapshots
      .filter(snap => snap.exists)
      .map(snap => snap.data() as Permissions);
  }

  private async getRoleByName(roleName: string): Promise<Roles | null> {
    const roleSnapshot = await this.collection.doc(roleName.toLowerCase()).get();
    if (!roleSnapshot.exists) return null;
    return fromSnapshot<Roles>(roleSnapshot);
  }

  private async mapCollection<T>(ref: FirebaseFirestore.CollectionReference): Promise<T[]> {
    const snapshot = await ref.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), } as T));
  }
}

