import { PatientRepository } from '../repositories/patient.repository';
import { NotFoundError } from '../utils/errors';
import { IPatient } from '../types';

export class PatientService {
  private readonly patientRepository = new PatientRepository();

  async createPatient(data: any): Promise<IPatient> {
    return this.patientRepository.create(data);
  }

  async getAllPatients(): Promise<IPatient[]> {
    return this.patientRepository.find();
  }

  async getPatientById(id: string): Promise<IPatient> {
    const patient = await this.patientRepository.findById(id);
    if (!patient) {
      throw new NotFoundError('Patient medical record not found.');
    }
    return patient;
  }

  async updatePatient(id: string, data: any): Promise<IPatient> {
    const patient = await this.patientRepository.update(id, data);
    if (!patient) {
      throw new NotFoundError('Patient medical record not found.');
    }
    return patient;
  }

  async deletePatient(id: string): Promise<void> {
    const patient = await this.patientRepository.delete(id);
    if (!patient) {
      throw new NotFoundError('Patient medical record not found.');
    }
  }
}
export default PatientService;
