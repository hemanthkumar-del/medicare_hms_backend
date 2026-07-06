import { BaseRepository } from './base.repository';
import { Medicine } from '../models/medicine.model';
import { IMedicine } from '../types';

export class MedicineRepository extends BaseRepository<IMedicine> {
  constructor() {
    super(Medicine);
  }

  async findByName(name: string): Promise<IMedicine | null> {
    return this.model.findOne({ name }).exec();
  }
}
export default MedicineRepository;
