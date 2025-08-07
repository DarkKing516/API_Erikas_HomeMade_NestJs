import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {permissionConverter} from "../../../lib/firebase/converters/config/permission-converter";
import {firestore} from 'src/lib/firebase/firebase-config';
import {Permissions} from "../data/entities/permissions.entity";
import {CreatePermissionDto} from "../data/dto/permission/create-permission.dto";
import {UpdatePermissionDto} from "../data/dto/permission/update-permission.dto";

@Injectable()
export class PermissionService {
  private collection = firestore.collection('permissions');
  private collectionWithConverter = this.collection.withConverter(permissionConverter);

  async getAllPermissions(): Promise<Permissions[]> {
    // Ejemplo con Redis cache (puedes activar o desactivar)
    // const cached = await this.redisService.get('permissions:all');
    // if (cached) return JSON.parse(cached);

    // await this.redisService.set('permissions:all', JSON.stringify(permissions));

    return await this.mapCollection<Permissions>(this.collectionWithConverter);
  }

  async createPermission(createPermissionDto: CreatePermissionDto): Promise<boolean> {
    const existing = await this.getPermissionByName(createPermissionDto.permission);
    if (existing) throw new ConflictException('El permiso ya existe');

    const newPermissionRef = this.collection.doc();
    const nowString = new Date().toISOString();

    const newPermission: Permissions = {
      ...createPermissionDto,
      id      : newPermissionRef.id,
      created : nowString,
      updated : nowString,
      status  : true,
    } as Permissions;

    await newPermissionRef.withConverter(permissionConverter).set(newPermission);
    return true;
  }

  async updatePermission(updateData: UpdatePermissionDto): Promise<boolean> {
    const permissionRef = this.collectionWithConverter.doc(updateData.id);
    const snapshot = await permissionRef.get();

    if (!snapshot.exists) throw new NotFoundException('Permiso no encontrado');

    const { id, ...dataToUpdate } = updateData;
    await permissionRef.update({ ...dataToUpdate, updated: new Date().toISOString() });

    const updatedSnapshot = await permissionRef.get();
    const updatedPermission = updatedSnapshot.data();
    if (!updatedPermission) throw new NotFoundException('Error al recuperar el permiso actualizado');

    return true;
  }

  async deletePermission(id: string): Promise<boolean> {
    const permissionRef = this.collection.doc(id);
    const snapshot = await permissionRef.get();

    if (!snapshot.exists) throw new NotFoundException('Permiso no encontrado');

    await permissionRef.delete();
    return true;
  }

  private async getPermissionByName(name: string): Promise<Permissions | null> {
    const snapshot = await this.collection.doc(name.toLowerCase()).get();
    if (!snapshot.exists) return null;
    return permissionConverter.fromFirestore(snapshot);
  }

  private async mapCollection<T>(ref: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>): Promise<T[]> {
    const snapshot = await ref.get();
    return snapshot.docs.map((doc) => doc.data() as T);
  }
}
