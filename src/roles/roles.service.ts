// src/roles/roles.service.ts
import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './dto/role.dto';
import { firestore } from 'src/lib/firebase-config';

@Injectable()
export class RolesService {
    private collection = firestore.collection('roles');

    private roles: Role[] = []; // Usamos la interfaz Role para definir el tipo del array

    async getAllRoles(): Promise<Role[]> {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Role));
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
