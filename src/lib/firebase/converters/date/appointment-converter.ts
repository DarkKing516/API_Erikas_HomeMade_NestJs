import { AppointmentsEntity } from '../../../../modules/date/data/entities/appointments.entity';

export const AppointmentConverter = {
  toFirestore(role: AppointmentsEntity): FirebaseFirestore.DocumentData {
    const { id, ...data } = role;
    return data;
  },
  fromFirestore(
    snapshot: FirebaseFirestore.DocumentSnapshot,
  ): AppointmentsEntity {
    const data = snapshot.data();
    if (!data) throw new Error('Documento vacío');

    return { id: snapshot.id, ...data } as AppointmentsEntity;
  },
};