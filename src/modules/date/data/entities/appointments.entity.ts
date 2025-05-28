import { ApiProperty } from '@nestjs/swagger';
import { Timestamp } from 'firebase-admin/firestore';
import { BaseEntity } from '../../../../data/entities/baseEntity.entity';
import { AppointmentsEnum } from '../../../../common/enum/appointmentsEnum';
import { exampleAppointment } from '../../../../common/utils/faker-examples';

export class AppointmentsEntity extends BaseEntity {
  @ApiProperty({ example: exampleAppointment.userId })
  userId            : string;

  @ApiProperty({ example: new Date().toISOString() })
  dateCreate        : Timestamp;

  @ApiProperty({ example: exampleAppointment.appointmentDate })
  appointmentDate   : Timestamp; // También Timestamp para Firestore

  @ApiProperty({ example: exampleAppointment.description })
  description       : string;

  @ApiProperty({ example: exampleAppointment.status, enum: AppointmentsEnum })
  status            : AppointmentsEnum;
}
