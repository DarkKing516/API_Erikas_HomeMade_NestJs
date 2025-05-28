import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { firestore } from 'src/lib/firebase/firebase-config';
import { Timestamp } from 'firebase-admin/firestore';
import { AppointmentsEntity } from '../data/entities/appointments.entity';
import { CreateAppointmentDto } from '../data/dto/create-appoiment.dto';
import { UpdateAppointmentDto } from '../data/dto/update-appoiment.dto';
import { AppointmentsEnum } from '../../../common/enum/appointmentsEnum';
import { AppointmentConverter } from '../../../lib/firebase/converters/date/appointment-converter';

@Injectable()
export class AppointmentService {
  private collection = firestore.collection('appointments').withConverter(AppointmentConverter);

  async getAll(): Promise<AppointmentsEntity[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(doc => doc.data());
  }

  async createAppointment(dataCreate: CreateAppointmentDto): Promise<AppointmentsEntity> {
    const conflict = await this.hasConflict(dataCreate.appointmentDate);
    if (conflict) throw new ConflictException('No está disponible la fecha que seleccionaste.');

    const newAppointmentRef = this.collection.doc();
    const newAppointment: AppointmentsEntity = {
      ...dataCreate,
      id              : newAppointmentRef.id,
      dateCreate      : Timestamp.fromDate(new Date()),
      appointmentDate : Timestamp.fromDate(new Date(dataCreate.appointmentDate)),
      status          : AppointmentsEnum.POR_ACEPTAR,
      created         : new Date(),
    };

    await newAppointmentRef.set(newAppointment);
    return newAppointment;
  }

  async updateAppointment(updateData: Partial<UpdateAppointmentDto>): Promise<AppointmentsEntity> {
    const appointmentRef = this.collection.doc(updateData.id ?? '');
    const snapshot = await appointmentRef.get();
    if (!snapshot.exists) throw new NotFoundException('Cita no encontrada');

    const conflict = await this.hasConflict(updateData.appointmentDate ?? new Date(), updateData.id);
    if (conflict) throw new ConflictException('Ya hay una cita asignada a esta hora.');

    await appointmentRef.update(updateData);
    return {
      id              : appointmentRef.id,
      ...updateData,
      appointmentDate : Timestamp.fromDate(new Date(updateData.appointmentDate ?? new Date())),
    } as AppointmentsEntity;
  }

  async deleteAppointment(id: string): Promise<boolean> {
    const appointmentRef = this.collection.doc(id);
    const appointmentSnapshot = await appointmentRef.get();
    if (!appointmentSnapshot.exists) return false;

    await appointmentRef.delete();
    return true;
  }

  private async hasConflict(appointmentDate: Date, excludeId?: string): Promise<boolean> {
    const appointmentDateObj = new Date(appointmentDate);

    const minTime = new Date(appointmentDateObj);
    minTime.setMinutes(minTime.getMinutes() - 30);

    const maxTime = new Date(appointmentDateObj);
    maxTime.setMinutes(maxTime.getMinutes() + 30);

    const minTimestamp = Timestamp.fromDate(minTime);
    const maxTimestamp = Timestamp.fromDate(maxTime);

    let query = this.collection
      .where('appointmentDate', '>=', minTimestamp)
      .where('appointmentDate', '<=', maxTimestamp);

    if (excludeId) {
      query = query.where('id', '!=', excludeId); // Evita conflicto consigo mismo en update
    }

    const conflictingAppointments = await query.get();
    return !conflictingAppointments.empty;
  }
}

