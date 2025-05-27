import { ApiProperty } from '@nestjs/swagger';
import { Timestamp } from 'firebase-admin/firestore';
import { BaseEntity } from '../../../../data/entities/baseEntity.entity';
import { AppointmentsEnum } from '../../../../common/enum/appointmentsEnum';

export class AppointmentsEntity extends BaseEntity {
  @ApiProperty({ example: 1 })
  userId            : string;

  @ApiProperty({ example: new Date().toISOString() })
  dateCreate        : Timestamp;

  @ApiProperty({ example: new Date().toISOString() })
  appointmentDate   : Timestamp; // También Timestamp para Firestore

  @ApiProperty({ example: 'description example' })
  description       : string;

  @ApiProperty({ example: AppointmentsEnum.POR_ACEPTAR, enum: AppointmentsEnum })
  status            : AppointmentsEnum;
}
