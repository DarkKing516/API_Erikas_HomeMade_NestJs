import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { permissionConverter } from "../../../lib/firebase/converters/config/permission-converter";
import { firestore } from "@app/firebase/firebase-config";
import { Permissions } from "../data/entities/permissions.entity";
import { CreatePermissionDto } from "../data/dto/permission/create-permission.dto";
import { UpdatePermissionDto } from "../data/dto/permission/update-permission.dto";
import { DEFAULT_PERMISSIONS } from '../../../common/enum/permissions.constant';

@Injectable()
export class PermissionService {
  private collection = firestore.collection('permissions');
  private collectionWithConverter = this.collection.withConverter(permissionConverter);

  async getAllPermissions(): Promise<Permissions[]> {
    return await this.mapCollection<Permissions>(this.collectionWithConverter);
  }

  async createPermission(createPermissionDto: CreatePermissionDto): Promise<boolean> {
    const existing = await this.exists(createPermissionDto.id);
    if (existing) throw new ConflictException(`El permiso ${createPermissionDto.id} ya existe`);

    const newPermissionRef = this.collection.doc(createPermissionDto.id);
    const nowString = new Date().toISOString();

    const newPermission: Permissions = {
      ...createPermissionDto,
      created: nowString,
      updated: nowString,
      status: true,
    };

    await newPermissionRef.withConverter(permissionConverter).set(newPermission);
    return true;
  }

  async updatePermission(updateData: UpdatePermissionDto): Promise<boolean> {
    const permissionRef = this.collectionWithConverter.doc(updateData.id);
    const snapshot = await permissionRef.get();

    if (!snapshot.exists) throw new NotFoundException('Permiso no encontrado');

    // Solo permitimos editar el nombre (permission)
    await permissionRef.update({
      permission: updateData.permission,
      updated: new Date().toISOString()
    });

    return true;
  }

  async deletePermission(id: string): Promise<boolean> {
    const permissionRef = this.collection.doc(id);
    const snapshot = await permissionRef.get();

    if (!snapshot.exists) throw new NotFoundException('Permiso no encontrado');

    await permissionRef.delete();
    return true;
  }

  async deleteAllPermissions(): Promise<boolean> {
    const snapshot = await this.collection.get();
    const batch = firestore.batch();

    snapshot.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();

    return true;
  }

  async syncPermissions(): Promise<boolean> {
    const batch = firestore.batch();
    const now = new Date().toISOString();

    for (const def of DEFAULT_PERMISSIONS) {
      const ref = this.collectionWithConverter.doc(def.id);
      const snapshot = await ref.get();

      if (!snapshot.exists) {
        batch.set(ref, {
          id: def.id,
          permission: def.permission,
          status: true,
          created: now,
          updated: now,
        } as Permissions);
      } else {
        const currentData = snapshot.data();
        if (currentData && currentData.permission !== def.permission) {
          batch.update(ref, {
            permission: def.permission,
            updated: now
          });
        }
      }
    }

    await batch.commit();
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

  async exists(id: string): Promise<boolean> {
    const doc = await this.collection.doc(id).get();
    return doc.exists;
  }

  async getById(id: string, throwIfNotFound = true): Promise<Permissions> {
    const doc = await this.collectionWithConverter.doc(id).get();

    if (!doc.exists) {
      if (throwIfNotFound) throw new NotFoundException(`Permiso con id ${id} no encontrado`);
      return {} as Permissions;
    }

    return doc.data()!;
  }
}
