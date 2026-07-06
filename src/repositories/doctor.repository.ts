import { BaseRepository } from './base.repository';
import { Doctor } from '../models/doctor.model';
import { IDoctor } from '../types';

export class DoctorRepository extends BaseRepository<IDoctor> {
  constructor() {
    super(Doctor);
  }

  async findByUserId(userId: string): Promise<IDoctor | null> {
    return this.model.findOne({ user: userId }).exec();
  }
}
export default DoctorRepository;
