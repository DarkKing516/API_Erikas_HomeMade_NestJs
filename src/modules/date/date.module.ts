import { Module } from '@nestjs/common';
import { AppointmentsController } from './controllers/appointments.controller';
import { AppointmentService } from './services/appointment.service';

@Module({
  controllers : [AppointmentsController],
  providers : [AppointmentService],
})
export class DateModule {}