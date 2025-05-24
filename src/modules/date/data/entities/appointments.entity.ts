import { ApiProperty } from '@nestjs/swagger';
import { Timestamp } from 'firebase-admin/firestore';
import { BaseEntityEnum } from '../../../../data/entities/baseEntityEnum';

export class AppointmentsEntity extends BaseEntityEnum {
  @ApiProperty({ name: 'userId', example: 1 })
  userId          : number;

  @ApiProperty({ name: 'dateCreate', example: new Date().toISOString() })
  dateCreate: Timestamp;  // Ahora es Timestamp en lugar de Date

  @ApiProperty({ name: 'appointmentDate', example: new Date().toISOString() })
  appointmentDate: Timestamp;  // También Timestamp para Firestore

  @ApiProperty({ name: 'description', example:"description example"})
  description     : string;
}
