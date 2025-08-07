import { faker } from '@faker-js/faker';
import { AppointmentsEnum } from '../enum/appointmentsEnum';

export const exampleUser = {
  id       : faker.string.uuid(),
  name     : faker.person.fullName(),
  email    : faker.internet.email(),
  password : faker.internet.password({ length: 12 }),
  phone    : faker.phone.number(),
  status   : faker.datatype.boolean(),
};

export const exampleProduct = {
  id            : faker.string.uuid(),
  productName   : faker.commerce.productName(),
  booleanStatus : faker.datatype.boolean(),
};

export const exampleAppointment = {
  id              : faker.string.uuid(),
  userId          : faker.string.uuid(),
  dateCreate      : faker.date.recent().toISOString(),
  appointmentDate : faker.date.future().toISOString(),
  description     : faker.lorem.sentence(),
  status          : faker.helpers.arrayElement(Object.values(AppointmentsEnum)),
};

export const exampleRole = {
  id              : faker.string.uuid(),
  role            : faker.helpers.arrayElement(['Admin', 'Cliente', 'User']),
  status          : faker.datatype.boolean(),
};

export const examplePermission = {
  id          : faker.string.uuid(),
  permission  : faker.helpers.arrayElement(['read', 'write', 'delete', 'update', 'manage']),
  description : faker.lorem.sentence(),
  status      : faker.datatype.boolean(),
  created     : faker.date.recent().toISOString(),
  updated     : faker.date.recent().toISOString(),
};