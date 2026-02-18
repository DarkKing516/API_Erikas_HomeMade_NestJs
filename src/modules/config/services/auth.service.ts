import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
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
  private collectionRol = firestore.collection("roles").withConverter(roleConverter);

  constructor(
    private readonly rolService: RolService,
    private readonly jwtService: JwtService,
  ) { }

  async login(model: LoginUserDto): Promise<{ user: ReturnUserDto, accessToken: string }> {
    const normalizedEmail = model.email.trim().toLowerCase();

    // Buscar usuario por correo
    const snap = await this.collectionUser.where("email", "==", normalizedEmail).limit(1).get();
    if (snap.empty) throw new NotFoundException(`Usuario no encontrado`);

    const userDoc = snap.docs[0];
    const user = userDoc.data() as Users;

    const decryptedPassword = CryptoUtil.decrypt(model.password);
    const decryptedPasswordUser = CryptoUtil.decrypt(user.password);
    // console.log(decryptedPassword);

    if (decryptedPasswordUser !== decryptedPassword) throw new ConflictException(`Credenciales inválidas`);

    const userWithRoles = await this.getUserPermissions(normalizedEmail);

    const payload = { email: userWithRoles.email, sub: userWithRoles.id };

    return {
      user: userWithRoles,
      accessToken: this.jwtService.sign(payload)
    };
  }

  async getUserPermissions(email: string): Promise<ReturnUserDto> {
    const snap = await this.collectionUser.where("email", "==", email).limit(1).get();
    if (snap.empty) throw new NotFoundException(`Usuario no encontrado`);

    const user = snap.docs[0].data() as Users;
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