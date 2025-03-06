import { Module } from '@nestjs/common';
import { RolController } from './controllers/rol/rol.controller';
import { RolService } from './services/rol/rol.service';

@Module({
  controllers: [RolController],
  providers: [RolService],
})
export class ConfigModule {}