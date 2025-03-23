// src/roles/roles.service.ts
import { Injectable } from '@nestjs/common';
import { firestore } from 'src/lib/firebase/firebase-config';
import { RolesEntity } from '../../data/entities/roles.entity';
import { RoleCreateDto } from '../../data/dto/role-create.dto';
import { RoleUpdateDto } from '../../data/dto/role-update.dto';
import { RoleDeleteDto } from '../../data/dto/role-delete.dto';

@Injectable()
export class RolService {
  private collection = firestore.collection('roles');

  async getAllRoles(): Promise<RolesEntity[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as RolesEntity,
    );
  }

  async getRoleByName(roleName: string): Promise<RolesEntity | null> {
    const roleSnapshot = await this.collection
      .doc(roleName.toLowerCase())
      .get();
    if (!roleSnapshot.exists) {
      return null;
    }
    return { id: roleSnapshot.id, ...roleSnapshot.data() } as RolesEntity;
  }

  async createRole(createRoleDto: RoleCreateDto): Promise<RolesEntity | null> {
    const existingRole = await this.getRoleByName(
      createRoleDto.role.toLowerCase(),
    );
    if (existingRole) return null;

    // const newRoleRef = this.collection.doc(createRoleDto.role.toLowerCase());
    const newRoleRef = this.collection.doc();
    const newRole: RolesEntity = {
      ...createRoleDto,
      id     : newRoleRef.id,
      status : true,
    };

    await newRoleRef.set(newRole);
    return newRole;
  }

  async updateRole(updateData: Partial<RoleUpdateDto>): Promise<RolesEntity | null> {
    const roleRef = this.collection.doc((updateData.id ?? "").toLowerCase());
    const roleSnapshot = await roleRef.get();

    if (!roleSnapshot.exists) return null;

    await roleRef.update(updateData);
    return { id: roleRef.id, ...updateData } as RolesEntity;
  }

  async deleteRole(deleteRole: RoleDeleteDto): Promise<boolean> {
    const roleRef = this.collection.doc(deleteRole.id);
    const roleSnapshot = await roleRef.get();

    if (!roleSnapshot.exists) return false;

    await roleRef.delete();
    return true;
  }
}

