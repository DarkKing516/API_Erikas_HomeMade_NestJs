import { ApiProperty } from '@nestjs/swagger';
import { CreateAppointmentDto } from './create_appoiment.dto';

export class UpdateAppointmentDto extends CreateAppointmentDto {
  @ApiProperty({ name: 'id', example: '1' })
  id: string;
}
