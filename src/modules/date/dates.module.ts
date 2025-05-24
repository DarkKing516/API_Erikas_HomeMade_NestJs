import { Module } from '@nestjs/common';
import { AppointmentsController } from './controllers/appointments.controller';
import { AppointmentsService } from './services/appointments.service';

@Module({
  controllers : [AppointmentsController],
  providers : [AppointmentsService],
})
export class DatesModule {}