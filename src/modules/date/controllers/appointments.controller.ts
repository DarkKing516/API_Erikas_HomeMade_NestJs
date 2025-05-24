import { Controller, Get, Post, Body, HttpException, HttpStatus, Put, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiResponse} from '@nestjs/swagger';
import { ResponseApi } from 'src/common/dto/response-api.dto';
import { AppointmentsService } from '../services/appointments.service';
import { AppointmentsEntity } from '../data/entities/appointments.entity';
import { CreateAppointmentDto } from '../data/dto/create_appoiment.dto';
import { UpdateAppointmentDto } from '../data/dto/update-appoiment.dto';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) { }

  @Get('getAppointments')
  @ApiResponse({ status: 200, description: 'Lista de citas.', type: ResponseApi<AppointmentsEntity[]> })
  @ApiResponse({ status: 204, description: 'No hay citas disponibles.', type: ResponseApi })
  async getAllAppointments(): Promise<ResponseApi<AppointmentsEntity[]>> {
    const appointments = await this.appointmentsService.getAll();
    const statusCode = appointments.length > 0 ? 200 : 204;
    const message = appointments.length > 0 ? 'Citas obtenidas correctamente.' : 'No hay citas disponibles.';
    return new ResponseApi<AppointmentsEntity[]>(statusCode, message, appointments);
  }

  @Post('CreateAppointment')
  @ApiResponse({ status: 201, description: 'Tipo de producto creado', type: ResponseApi<AppointmentsEntity[]> })
  @ApiResponse({ status: 409, description: 'El tipo de producto ya existe', type: ResponseApi })
  async createAppointment(@Body() createData: CreateAppointmentDto): Promise<ResponseApi<AppointmentsEntity>> {
    const newData = await this.appointmentsService.createAppointment(createData);
    if (!newData) {
      throw new HttpException(
        new ResponseApi(409, 'No está disponible la fecha que seleccionaste.'),
        HttpStatus.CONFLICT
      );
    }
    return new ResponseApi<AppointmentsEntity>(201, 'La cita fue creada correctamente', newData);
  }

  @Put('update')
  @ApiResponse({ status: 200, description: 'Cita actualizada con éxito', type: ResponseApi<AppointmentsEntity> })
  @ApiResponse({ status: 404, description: 'Cita no encontrada', type: ResponseApi })
  @ApiResponse({ status: 409, description: 'Ya hay una cita asignada a esta hora', type: ResponseApi })
  async update(@Body() updateData: UpdateAppointmentDto): Promise<ResponseApi<AppointmentsEntity>> {
    const newData = await this.appointmentsService.updateAppointment(updateData);
    if (newData == 1)
      throw new HttpException(new ResponseApi(404, 'Cita no encontrada'), HttpStatus.NOT_FOUND);
    if (newData == 2)
      throw new HttpException(new ResponseApi(409, 'Ya hay una cita asignada a esta hora.'), HttpStatus.CONFLICT);
    return new ResponseApi<AppointmentsEntity>(200, 'Cita actualizada con éxito', newData as AppointmentsEntity);

  }

  @Delete('delete/:id')
  @ApiResponse({ status: 200, description: 'Cita eliminada correctamente', type: ResponseApi })
  @ApiResponse({ status: 404, description: 'Cita no encontrada :p', type: ResponseApi })
  async delete(@Param('id') id: string): Promise<ResponseApi<null>> {
    const deleted = await this.appointmentsService.deleteAppointment(id);
    if (!deleted)
      throw new HttpException(new ResponseApi(404, 'Cita no encontrada :p'), HttpStatus.NOT_FOUND);
    return new ResponseApi<null>(200, 'Cita eliminada correctamente', null);
  }

}