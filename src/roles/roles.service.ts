// src/roles/roles.service.ts
import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './dto/role.dto';
import { firestore } from 'src/lib/firebase-config';

@Injectable()
export class RolesService {
    private collection = firestore.collection('roles');

    async getAllRoles(): Promise<Role[]> {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Role));
    }

    async getRoleByName(name: string): Promise<Role | null> {
        const roleSnapshot = await this.collection.doc(name.toLowerCase()).get();
        if (!roleSnapshot.exists) {
            return null;
        }
        return { id: roleSnapshot.id, ...roleSnapshot.data() } as Role;
    }

    async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
        const newRoleRef = this.collection.doc(createRoleDto.name.toLowerCase());

        const newRole: Role = {
            ...createRoleDto,
            id: newRoleRef.id,
        };

        await newRoleRef.set(newRole);
        return newRole;
    }

}
