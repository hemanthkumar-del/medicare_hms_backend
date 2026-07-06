import { DoctorRepository } from '../repositories/doctor.repository';
import { NotFoundError } from '../utils/errors';
import { IDoctor } from '../types';

export class DoctorService {
  private readonly doctorRepository = new DoctorRepository();

  async createDoctor(data: any): Promise<IDoctor> {
    return this.doctorRepository.create(data);
  }

  async getAllDoctors(): Promise<IDoctor[]> {
    return this.doctorRepository.find();
  }

  async getDoctorById(id: string): Promise<IDoctor> {
    const doctor = await this.doctorRepository.findById(id);
    if (!doctor) {
      throw new NotFoundError('Doctor record not found.');
    }
    return doctor;
  }

  async updateDoctor(id: string, data: any): Promise<IDoctor> {
    const doctor = await this.doctorRepository.update(id, data);
    if (!doctor) {
      throw new NotFoundError('Doctor record not found.');
    }
    return doctor;
  }

  async deleteDoctor(id: string): Promise<void> {
    const doctor = await this.doctorRepository.delete(id);
    if (!doctor) {
      throw new NotFoundError('Doctor record not found.');
    }
  }
}
export default DoctorService;
