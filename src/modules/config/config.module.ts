import { Module } from '@nestjs/common';
import { RolesController } from './controllers/roles.controller';
import { RolService } from './services/rol.service';
import { UserService } from './services/user.service';

@Module({
  controllers : [RolesController],
  providers   : [RolService, UserService],
})
export class ConfigModule {}