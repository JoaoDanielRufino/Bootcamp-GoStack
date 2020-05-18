import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

// Dependency Inversion (SOLID)
class CreateAppointmentService {
  public async execute({ provider, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentSameDate) {
      throw Error('This appintment is already booked');
    }

    const appointment = appointmentsRepository.create({ provider, date: appointmentDate });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;