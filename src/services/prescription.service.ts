import { PrescriptionRepository } from '../repositories/prescription.repository';
import { PatientRepository } from '../repositories/patient.repository';
import { DoctorRepository } from '../repositories/doctor.repository';
import { BadRequestError, NotFoundError } from '../utils/errors';
import { IPrescription } from '../types';

export class PrescriptionService {
  private readonly prescriptionRepository = new PrescriptionRepository();
  private readonly patientRepository = new PatientRepository();
  private readonly doctorRepository = new DoctorRepository();

  async createPrescription(data: any): Promise<IPrescription> {
    const patient = await this.patientRepository.findById(data.patient);
    if (!patient) {
      throw new BadRequestError('Invalid patient ID.');
    }

    const doctor = await this.doctorRepository.findById(data.doctor);
    if (!doctor) {
      throw new BadRequestError('Invalid doctor ID.');
    }

    const prescriptionData = {
      ...data,
      patientName: patient.name,
      doctorName: doctor.name,
    };

    return this.prescriptionRepository.create(prescriptionData);
  }

  async getAllPrescriptions(): Promise<IPrescription[]> {
    return this.prescriptionRepository.find();
  }

  async getPrescriptionById(id: string): Promise<IPrescription> {
    const prescription = await this.prescriptionRepository.findById(id);
    if (!prescription) {
      throw new NotFoundError('Prescription record not found.');
    }
    return prescription;
  }

  async updatePrescription(id: string, data: any): Promise<IPrescription> {
    const prescription = await this.prescriptionRepository.update(id, data);
    if (!prescription) {
      throw new NotFoundError('Prescription record not found.');
    }
    return prescription;
  }

  async deletePrescription(id: string): Promise<void> {
    const prescription = await this.prescriptionRepository.delete(id);
    if (!prescription) {
      throw new NotFoundError('Prescription record not found.');
    }
  }
}
export default PrescriptionService;
