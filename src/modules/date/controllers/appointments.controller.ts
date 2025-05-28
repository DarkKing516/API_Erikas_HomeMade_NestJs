import { Controller, Get, Post, Body, HttpException, HttpStatus, Put, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiResponse} from '@nestjs/swagger';
import { ResponseApi } from 'src/common/dto/response-api.dto';
import { AppointmentService } from '../services/appointment.service';
import { AppointmentsEntity } from '../data/entities/appointments.entity';
import { CreateAppointmentDto } from '../data/dto/create-appoiment.dto';
import { UpdateAppointmentDto } from '../data/dto/update-appoiment.dto';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentService) { }

  @Get('get-all')
  @ApiResponse({ status: 200, description: 'Lista de citas.', type: ResponseApi<AppointmentsEntity[]> })
  @ApiResponse({ status: 204, description: 'No hay citas disponibles.', type: ResponseApi })
  async getAllAppointments(): Promise<ResponseApi<AppointmentsEntity[]>> {
    const appointments = await this.appointmentsService.getAll();
    const statusCode = appointments.length > 0 ? 200 : 204;
    const message = appointments.length > 0 ? 'Citas obtenidas correctamente.' : 'No hay citas disponibles.';
    return new ResponseApi<AppointmentsEntity[]>(statusCode, message, appointments);
  }

  @Post('create')
  @ApiResponse({ status: 201, description: 'Cita creada correctamente', type: ResponseApi<AppointmentsEntity> })
  @ApiResponse({ status: 409, description: 'No está disponible la fecha seleccionada', type: ResponseApi })
  async createAppointment(@Body() createData: CreateAppointmentDto): Promise<ResponseApi<AppointmentsEntity>> {
    const newData = await this.appointmentsService.createAppointment(createData);
    return new ResponseApi<AppointmentsEntity>(201, 'La cita fue creada correctamente', newData);
  }

  @Put('update')
  @ApiResponse({ status: 200, description: 'Cita actualizada con éxito', type: ResponseApi<AppointmentsEntity> })
  @ApiResponse({ status: 404, description: 'Cita no encontrada', type: ResponseApi })
  @ApiResponse({ status: 409, description: 'Ya hay una cita asignada a esta hora', type: ResponseApi })
  async update(@Body() updateData: UpdateAppointmentDto): Promise<ResponseApi<AppointmentsEntity>> {
    const updated = await this.appointmentsService.updateAppointment(updateData);
    return new ResponseApi<AppointmentsEntity>(200, 'Cita actualizada con éxito', updated);
  }

  @Delete('delete/:id')
  @ApiResponse({ status: 200, description: 'Cita eliminada correctamente', type: ResponseApi })
  @ApiResponse({ status: 404, description: 'Cita no encontrada :p', type: ResponseApi })
  async delete(@Param('id') id: string): Promise<ResponseApi<boolean>> {
    const deleted = await this.appointmentsService.deleteAppointment(id);
    if (!deleted) throw new HttpException(new ResponseApi(404, 'Cita no encontrada :p'), HttpStatus.NOT_FOUND);
    return new ResponseApi<boolean>(200, 'Cita eliminada correctamente', true);
  }

}