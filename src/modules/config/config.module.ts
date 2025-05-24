import { Module } from '@nestjs/common';
import { RolesController } from './controllers/roles.controller';
import { RolService } from './services/rol.service';

@Module({
  controllers : [RolesController],
  providers   : [RolService],
})
export class ConfigModule {}