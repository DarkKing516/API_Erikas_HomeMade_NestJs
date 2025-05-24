// src/roles/roles.service.ts
import { Injectable } from '@nestjs/common';
import { firestore } from 'src/lib/firebase/firebase-config';
import { Timestamp } from 'firebase-admin/firestore';
import { AppointmentsEntity } from '../data/entities/appointments.entity';
import { CreateAppointmentDto } from '../data/dto/create-appoiment.dto';
import { UpdateAppointmentDto } from '../data/dto/update-appoiment.dto';

@Injectable()
export class AppointmentService {
  private collection = firestore.collection('appointments');

  async getAll(): Promise<AppointmentsEntity[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as AppointmentsEntity,
    );
  }

  async createAppointment(dataCreate: CreateAppointmentDto): Promise<AppointmentsEntity | null> {
    const { appointmentDate } = dataCreate;

    const appointmentDateObj = new Date(appointmentDate);

    const minTime = new Date(appointmentDateObj);
    minTime.setMinutes(minTime.getMinutes() - 30);

    const maxTime = new Date(appointmentDateObj);
    maxTime.setMinutes(maxTime.getMinutes() + 30);

    const minTimestamp = Timestamp.fromDate(minTime);
    const maxTimestamp = Timestamp.fromDate(maxTime);

    const conflictingAppointments = await this.collection
      .where('appointmentDate', '>=', minTimestamp)
      .where('appointmentDate', '<=', maxTimestamp)
      .get();

    if (!conflictingAppointments.empty) return null;

    const newAppointmentRef = this.collection.doc();
    const newAppointment: AppointmentsEntity = {
      ...dataCreate,
      id: newAppointmentRef.id,
      dateCreate : Timestamp.fromDate(new Date()), // Guarda como Timestamp
      appointmentDate : Timestamp.fromDate(new Date(dataCreate.appointmentDate)),
      status: 'Por aceptar',
    };

    await newAppointmentRef.set(newAppointment);
    return newAppointment;
  }

  async updateAppointment(
    updateData: Partial<UpdateAppointmentDto>,
  ): Promise<AppointmentsEntity | number> {
    const appointmentRef = this.collection.doc(updateData.id ?? '');
    const appointmentSnapshot = await appointmentRef.get();

    if (!appointmentSnapshot.exists) return 1;

    const appointmentDateObj = new Date(updateData.appointmentDate ?? '');

    const minTime = new Date(appointmentDateObj);
    minTime.setMinutes(minTime.getMinutes() - 30);

    const maxTime = new Date(appointmentDateObj);
    maxTime.setMinutes(maxTime.getMinutes() + 30);

    const minTimestamp = Timestamp.fromDate(minTime);
    const maxTimestamp = Timestamp.fromDate(maxTime);

    const conflictingAppointments = await this.collection
      .where('appointmentDate', '>=', minTimestamp)
      .where('appointmentDate', '<=', maxTimestamp)
      .get();

    if (!conflictingAppointments.empty) return 2;

    await appointmentRef.update(updateData);

    return { id: appointmentRef.id, ...updateData, appointmentDate : Timestamp.fromDate(new Date(updateData.appointmentDate ?? '')), } as AppointmentsEntity;
  }

  async deleteAppointment(id: string): Promise<boolean> {
    const appointmentRef = this.collection.doc(id);
    const appointmentSnapshot = await appointmentRef.get();

    if (!appointmentSnapshot.exists) return false;

    await appointmentRef.delete();
    return true;
  }
}

