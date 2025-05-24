import { ApiProperty } from '@nestjs/swagger';
import { Timestamp } from 'firebase-admin/firestore';
import { BaseEntityEnum } from '../../../../data/entities/baseEntityEnum';

export class AppointmentsEntity extends BaseEntityEnum {
  @ApiProperty({ example: 1 })
  userId            : number;

  @ApiProperty({ example: new Date().toISOString() })
  dateCreate        : Timestamp;

  @ApiProperty({ example: new Date().toISOString() })
  appointmentDate   : Timestamp; // También Timestamp para Firestore

  @ApiProperty({ example: 'description example' })
  description       : string;
}
