import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { firestore } from "@app/firebase/firebase-config";
import { menuConverter } from '../../../lib/firebase/converters/config/menu-entity-converter';
import { MenuEntity } from '../data/entities/menu.entity';
import { mapCollection } from '../../../common/utils/map-collection';
import { UpdateMenuDto } from '../data/dto/menu/update-menu.dto';
import { CreateMenuDto } from '../data/dto/menu/create-menu.dto';
import { PermissionService } from './permission.service';

@Injectable()
export class MenuService {
  private collection              = firestore.collection('menus');
  private collectionWithConverter = this.collection.withConverter(menuConverter);
  constructor(private readonly permissionService: PermissionService) {}

  async getAllMenus(): Promise<MenuEntity[]> {
    const menus = await mapCollection<MenuEntity>(this.collectionWithConverter);
    return await this.populatePermissionsRecursively(menus);
  }

  async createMenu(dto: CreateMenuDto): Promise<boolean> {
    const permisoExists = await this.permissionService.exists(dto.id_permiso);
    if (!permisoExists) throw new BadRequestException(`El permiso del menú "${dto.titulo}" no existe`);

    // Validar permisos de todos los niveles (recursivo)
    const validateSubmenuPermissions = async (submenus?: CreateMenuDto[]) => {
      if (!submenus) return;
      for (const sub of submenus) {
        const subPermisoExists = await this.permissionService.exists(sub.id_permiso);
        if (!subPermisoExists) throw new BadRequestException(`El permiso del submenú "${sub.titulo}" no existe`);
        await validateSubmenuPermissions(sub.submenus);
      }
    };
    await validateSubmenuPermissions(dto.submenus);

    const existing = await this.getMenuByTitle(dto.titulo);
    if (existing) throw new ConflictException('El menú ya existe');

    const nowString = new Date().toISOString();

    // 🌀 Función recursiva que convierte DTO a entidad
    const mapMenuRecursive = (menuDto: CreateMenuDto): MenuEntity => ({
      id         : firestore.collection('menus').doc().id,
      titulo     : menuDto.titulo,
      url        : menuDto.url,
      icono      : menuDto.icono,
      estado     : menuDto.estado ?? true,
      id_permiso : menuDto.id_permiso,
      created    : nowString,
      updated    : nowString,
      submenus   : menuDto.submenus?.map(mapMenuRecursive) ?? [],
    });

    // Crear el menú raíz
    const newMenuRef = this.collection.doc();
    const newMenu: MenuEntity = {
      ...mapMenuRecursive(dto),
      id: newMenuRef.id, // sobrescribimos el ID raíz
    };

    await newMenuRef.withConverter(menuConverter).set(newMenu);
    return true;
  }

  async updateMenu(dto: UpdateMenuDto): Promise<boolean> {
    const menuRef = this.collection.doc(dto.id);
    const snapshot = await menuRef.get();
    if (!snapshot.exists) throw new NotFoundException('Menú no encontrado');
    const permisoExists = await this.permissionService.exists(dto.id_permiso);
    if (!permisoExists) throw new BadRequestException(`El permiso del menu "${dto.titulo}" no existe`);

    if (dto.submenus && dto.submenus.length > 0)
      for (const sub of dto.submenus) {
        const subPermisoExists = await this.permissionService.exists(sub.id_permiso);
        if (!subPermisoExists) throw new BadRequestException(`El permiso del submenu "${sub.titulo}" no existe`);
      }

    const submenus = dto.submenus?.map(sub => ({
      id         : firestore.collection('menus').doc().id,
      titulo     : sub.titulo,
      url        : sub.url,
      icono      : sub.icono,
      estado     : sub.estado ?? true,
      id_permiso : sub.id_permiso,
      updated    : new Date().toISOString(),
      submenus   : [], // si quieres sub-submenús, puedes hacerlo recursivo
    })) ?? [];
    // Actualizar menú principal
    const updatedMenu: MenuEntity = {
      ...snapshot.data() as MenuEntity,
      titulo     : dto.titulo,
      url        : dto.url,
      icono      : dto.icono,
      estado     : dto.estado ?? true,
      id_permiso : dto.id_permiso,
      updated    : new Date().toISOString(),
      submenus,
    };
    await menuRef.withConverter(menuConverter).set(updatedMenu);
    return true;
  }

  async deleteMenu(id: string): Promise<boolean> {
    const menuRef = this.collection.doc(id);
    const snapshot = await menuRef.get();

    if (!snapshot.exists) throw new NotFoundException('Menú no encontrado');

    await menuRef.delete();
    return true;
  }

  // Helpers
  private async getMenuByTitle(titulo: string): Promise<MenuEntity | null> {
    const snapshot = await this.collection
      .where('titulo', '==', titulo)
      .limit(1).get();

    if (snapshot.empty) return null;
    return snapshot.docs[0].data() as MenuEntity;
  }

  private async populatePermissionsRecursively(menus: MenuEntity[]): Promise<MenuEntity[]> {
    return Promise.all(
      menus.map(async menu => {
        menu.permiso = await this.permissionService.getById(menu.id_permiso, false);
        if (menu.submenus && menu.submenus.length > 0) menu.submenus = await this.populatePermissionsRecursively(menu.submenus);
        return menu;
      })
    );
  }
}