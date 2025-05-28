import { ApiProperty } from '@nestjs/swagger';
import { CreateAppointmentDto } from './create-appoiment.dto';
import { exampleAppointment } from '../../../../common/utils/faker-examples';

export class UpdateAppointmentDto extends CreateAppointmentDto {
  @ApiProperty({ example: exampleAppointment.id })
  id: string;
}
