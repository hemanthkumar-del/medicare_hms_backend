import { BaseRepository } from './base.repository';
import { Appointment } from '../models/appointment.model';
import { IAppointment } from '../types';

export class AppointmentRepository extends BaseRepository<IAppointment> {
  constructor() {
    super(Appointment);
  }

  async findByPatientId(patientId: string): Promise<IAppointment[]> {
    return this.model.find({ patient: patientId }).exec();
  }

  async findByDoctorId(doctorId: string): Promise<IAppointment[]> {
    return this.model.find({ doctor: doctorId }).exec();
  }
}
export default AppointmentRepository;
