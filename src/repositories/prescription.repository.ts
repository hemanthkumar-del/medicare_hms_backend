import { BaseRepository } from './base.repository';
import { Prescription } from '../models/prescription.model';
import { IPrescription } from '../types';

export class PrescriptionRepository extends BaseRepository<IPrescription> {
  constructor() {
    super(Prescription);
  }

  async findByPatientId(patientId: string): Promise<IPrescription[]> {
    return this.model.find({ patient: patientId }).exec();
  }

  async findByDoctorId(doctorId: string): Promise<IPrescription[]> {
    return this.model.find({ doctor: doctorId }).exec();
  }
}
export default PrescriptionRepository;
