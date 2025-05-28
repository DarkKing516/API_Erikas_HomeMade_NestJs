import { ApiProperty } from '@nestjs/swagger';
import { exampleAppointment } from '../../../../common/utils/faker-examples';

export class CreateAppointmentDto{
  @ApiProperty({ example: exampleAppointment.userId })
  userId          : string;

  @ApiProperty({ example: exampleAppointment.appointmentDate })
  appointmentDate : Date;

  @ApiProperty({ example: exampleAppointment.description })
  description     : string;
}
