import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { firestore } from "@app/firebase/firebase-config";
import { roleConverter } from "../../../lib/firebase/converters/config/role-converter";
import { UserConverter } from "../../../lib/firebase/converters/config/user-converter";
import { Users } from "../data/entities/users.entity";
import { ReturnUserDto } from "../data/dto/user/return-user.dto";
import { ReturnRoleDto } from "../data/dto/role/return-role.dto";
import { RolService } from "./rol.service";
import { LoginUserDto } from "../data/dto/login-user.dto";
import { CryptoUtil } from "../../../common/utils/crypto.util";

@Injectable()
export class AuthService {
  private collectionUser = firestore.collection('users').withConverter(UserConverter);
  private collectionRol  = firestore.collection("roles").withConverter(roleConverter);
  constructor(private readonly rolService: RolService) {}

  async login(model: LoginUserDto): Promise<ReturnUserDto> {
    const normalizedEmail = model.email.trim().toLowerCase();

    console.log(CryptoUtil.decrypt(model.password))
    // Buscar usuario por correo
    const snap = await this.collectionUser.where("email", "==", normalizedEmail).limit(1).get();
    if (snap.empty) throw new NotFoundException(`Credenciales inválidas`);

    const userDoc = snap.docs[0];
    const user = userDoc.data() as Users;

    const decryptedPassword = CryptoUtil.decrypt(model.password);
    const decryptedPasswordUser = CryptoUtil.decrypt(user.password);
    console.log(decryptedPassword);

    if (decryptedPasswordUser !== decryptedPassword) throw new ConflictException(`Credenciales inválidas`);

    // Reutilizamos la misma lógica de enriquecimiento de roles
    const roleIds = user.roles || [];
    if (roleIds.length === 0) return { ...user, roles: [] };

    const enrichedRoles = await Promise.all(
      roleIds.map(async roleId => {
        const snap = await this.collectionRol.doc(roleId).get();
        return snap.exists ? await this.rolService.buildReturnRole(snap.data()!) : null;
      })
    );

    const userRoles = enrichedRoles.filter((r): r is ReturnRoleDto => !!r);

    return { ...user, roles: userRoles };
  }
}