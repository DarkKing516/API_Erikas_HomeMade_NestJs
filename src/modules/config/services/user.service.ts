import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { firestore } from "@app/firebase/firebase-config";
import { CreateUserDto } from "../data/dto/user/create-user.dto";
import { roleConverter } from "../../../lib/firebase/converters/config/role-converter";
import { UserConverter } from "../../../lib/firebase/converters/config/user-converter";
import { Users } from "../data/entities/users.entity";
import { mapCollection } from "../../../common/utils/map-collection";
import { ReturnUserDto } from "../data/dto/user/return-user.dto";
import { Roles } from "../data/entities/roles.entity";
import { ReturnRoleDto } from "../data/dto/role/return-role.dto";
import { RolService } from "./rol.service";

@Injectable()
export class UserService {
  private collectionUser = firestore.collection('users').withConverter(UserConverter);
  private collectionRol = firestore.collection('roles').withConverter(roleConverter);
  constructor(private readonly rolService: RolService) {}

  async getAll(): Promise<Users[]> {
    return await mapCollection<Users>(this.collectionUser);
  }

  async getAllWithRoles(): Promise<ReturnUserDto[]> {
    const users: Users[] = await mapCollection<Users>(this.collectionUser);

    // obtener todos los roles planos
    const allRoleIds = users.flatMap(u => u.roles || []);
    const uniqueRoleIds = Array.from(new Set(allRoleIds));
    const rolesSnapshots = await Promise.all(
      uniqueRoleIds.map(roleId => this.collectionRol.doc(roleId).get())
    );

    // convertir snapshots a roles planos
    const rolesMap = new Map<string, Roles>();
    rolesSnapshots.forEach(snap => {
      if (snap.exists) rolesMap.set(snap.id, snap.data()!);
    });

    // enriquecer cada rol plano con permisos
    const enrichedRolesMap = new Map<string, ReturnRoleDto>();
    for (const [id, role] of rolesMap.entries()) {
      const enrichedRole = await this.rolService.buildReturnRole(role);
      enrichedRolesMap.set(id, enrichedRole);
    }

    // mapear cada usuario con roles enriquecidos
    return users.map(user => {
      const userRoles: ReturnRoleDto[] = (user.roles || [])
        .map(roleId => enrichedRolesMap.get(roleId))
        .filter((r): r is ReturnRoleDto => !!r);

      return { ...user, roles: userRoles };
    });
  }

  async getUserWithRoles(userId: string): Promise<ReturnUserDto> {
    const userData = (await this.collectionUser.doc(userId).get()).data();
    if (!userData) throw new NotFoundException(`Usuario no encontrado`);

    const roleIds = userData.roles || [];
    if (roleIds.length === 0) return { ...userData, roles: [] };

    const enrichedRoles = await Promise.all(
      roleIds.map(async roleId => {
        const snap = await this.collectionRol.doc(roleId).get();
        return snap.exists ? await this.rolService.buildReturnRole(snap.data()!) : null;
      })
    );

    const userRoles = enrichedRoles.filter((r): r is ReturnRoleDto => !!r);

    return { ...userData, roles: userRoles };
  }

  async createUser(dataCreate: CreateUserDto): Promise<boolean> {
    const newUserRef = this.collectionUser.doc();
    const normalizedEmail = dataCreate.email.trim().toLowerCase();

    const existing = await this.collectionUser.where('email', '==', normalizedEmail).limit(1).get();
    if (!existing.empty) throw new ConflictException(`Ya existe un usuario registrado con el correo ${dataCreate.email}`);

    // Si no se mandó ningún rol, usamos "cliente"
    const roleIds = (dataCreate.roleId && dataCreate.roleId.length > 0) ? dataCreate.roleId.map(role => role.toLowerCase()) : ['cliente'];

    // Validamos que todos los roles existan
    const roleChecks = await Promise.all(roleIds.map(async (roleId) => {
        const snapshot = await this.collectionRol.doc(roleId).get();
        if (!snapshot.exists) throw new NotFoundException(`Rol no encontrado: ${roleId}`);
        return snapshot.id;
      }));

    const nowString = new Date().toISOString();
    const newUser: Users = {
      id       : newUserRef.id,
      created  : nowString,
      updated  : nowString,
      ...dataCreate,
      email   : normalizedEmail,
      status  : true,
      roles   : roleChecks,
    };

    await newUserRef.withConverter(UserConverter).set(newUser);
    return true;
  }
}