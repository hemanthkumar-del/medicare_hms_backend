import { BaseRepository } from './base.repository';
import { Patient } from '../models/patient.model';
import { IPatient } from '../types';

export class PatientRepository extends BaseRepository<IPatient> {
  constructor() {
    super(Patient);
  }

  async findByUserId(userId: string): Promise<IPatient | null> {
    return this.model.findOne({ user: userId }).exec();
  }
}
export default PatientRepository;
