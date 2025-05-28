import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto{
  @ApiProperty({ name: 'userId', example: 1 })
  userId          : string;

  @ApiProperty({ name: 'appointmentDate', example: new Date() })
  appointmentDate : Date;

  @ApiProperty({ name: 'description', example: 'description example' })
  description     : string;
}
