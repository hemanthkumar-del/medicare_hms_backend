import { AppointmentRepository } from '../repositories/appointment.repository';
import { PatientRepository } from '../repositories/patient.repository';
import { DoctorRepository } from '../repositories/doctor.repository';
import { BadRequestError, NotFoundError } from '../utils/errors';
import { IAppointment } from '../types';

export class AppointmentService {
  private readonly appointmentRepository = new AppointmentRepository();
  private readonly patientRepository = new PatientRepository();
  private readonly doctorRepository = new DoctorRepository();

  async bookAppointment(data: any): Promise<IAppointment> {
    const patient = await this.patientRepository.findById(data.patient);
    if (!patient) {
      throw new BadRequestError('Invalid patient ID.');
    }

    const doctor = await this.doctorRepository.findById(data.doctor);
    if (!doctor) {
      throw new BadRequestError('Invalid doctor ID.');
    }

    // Capture dynamic names to simplify querying
    const appointmentData = {
      ...data,
      patientName: patient.name,
      doctorName: doctor.name,
      doctorSpecialization: doctor.specialization,
    };

    return this.appointmentRepository.create(appointmentData);
  }

  async getAllAppointments(): Promise<IAppointment[]> {
    return this.appointmentRepository.find();
  }

  async getAppointmentById(id: string): Promise<IAppointment> {
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment) {
      throw new NotFoundError('Appointment not found.');
    }
    return appointment;
  }

  async updateAppointmentStatus(id: string, status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed'): Promise<IAppointment> {
    const appointment = await this.appointmentRepository.update(id, { status });
    if (!appointment) {
      throw new NotFoundError('Appointment not found.');
    }
    return appointment;
  }

  async deleteAppointment(id: string): Promise<void> {
    const appointment = await this.appointmentRepository.delete(id);
    if (!appointment) {
      throw new NotFoundError('Appointment not found.');
    }
  }
}
export default AppointmentService;
